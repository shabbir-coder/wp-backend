const {getIO} = require('../../connection/socket')
const axios = require('axios');
const Instance = require('../models/instanceModel')
const {Message, Contact, ChatLogs} = require('../models/chatModel');
const User = require('../models/user');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs')

const saveContact = async(req, res)=>{
    try {
      const {name , ITS, number} = req.body
      const existingContact = await Contact.findOne({
        $or: [
          { name },
          { ITS },
          { number }
          ]
        });
  
        if (existingContact) {
          let errorMessage = 'Contact already exists with the same ';
          const errors = [];
          if (existingContact.name === name) errors.push('name');
          if (existingContact.ITS === ITS) errors.push('ITS');
          if (existingContact.number === number) errors.push('number');

          errorMessage += errors.join(' or ') + '.';

          return res.status(400).send({ error: errorMessage });
        } 
        const contact = new Contact(req.body);
        await contact.save();
        return res.status(201).send(contact);
      } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message });
      }
}

const getContact = async(req, res)=>{
    try {
      let query = {};
      if (req.query.searchText) {
        query = {
          $or: [
            { name: { $regex: new RegExp(req.query.searchText, 'i') } },
            { ITS: { $regex: new RegExp(req.query.searchText, 'i') } },
            { number: { $regex: new RegExp(req.query.searchText, 'i') } }
          ]
        };
      }
        const contacts = await Contact.find(query);
        res.status(200).json({data:contacts});
      } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message });
      }
}

const updateContacts = async(req, res)=>{
    try {
        const { id } = req.params;
        const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!contact) {
          return res.status(404).send({ message: 'Contact not found' });
        }
        res.status(200).send(contact);
      } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message });
      }
}

const getMessages = async (req, res)=>{
    try {
        const { recieverId, instance_id} = req.body;
        const senderId = req.user.userId;
        const messages = await Message.find({ 
          $or: [
            { recieverId, senderId}, // Both ids are the same
            { recieverId: senderId, senderId: recieverId },
            { senderId: recieverId, instance_id },
            { recieverId, instance_id } // Ids are reversed
          ]
         }).sort({ createdAt: 1 });
        res.status(200).send(messages);
      } catch (error) {
        console.log(error)
        return res.status(500).send({ error: error.message });
      }
}

const sendMessages = async (req, res)=>{
  try {
    const io = getIO();

    const { recieverId, recieverNumber, type , text, instance_id } = req.body;

    const senderId = req.user.userId
    // Save the message to the database
    const newMessage = new Message({ senderId, instance_id,  recieverId, text, type });
    await newMessage.save();

    const url = process.env.LOGIN_CB_API
    const access_token = process.env.ACCESS_TOKEN_CB
    const params = {
      number: recieverNumber,
      type,
      message: text
    };

    const response = await axios.get(`${url}/send`,{params:{...params, instance_id, access_token}})

    console.log('response', response.data)
    
    // Emit the message to all clients in the conversation room
    io.emit(instance_id.toString() , newMessage);

    return res.status(201).send(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.data });
  }
}

const recieveMessages = async (req, res)=>{
  try {
    const io = getIO();
    const messageObject = req.body;
    console.log('request')
    if(messageObject.data?.data?.messages?.[0]?.key?.fromMe === true) return res.send()
    if(req.body?.data?.event === "messages.upsert"){
      console.log(messageObject.data.data.messages?.[0]?.message)
      let message;
      message = messageObject.data.data.messages?.[0]?.message?.extendedTextMessage?.text || messageObject.data.data.messages?.[0]?.message?.conversation || '';
      
      let remoteId = messageObject.data.data.messages?.[0]?.key.remoteJid.split('@')[0];
      console.log('instance_id', messageObject?.instance_id)
      const senderId = await Contact.findOne({number: remoteId})
      if(!senderId) return res.send({message:'Account not found'})
      const recieverId = await Instance.findOne({instance_id: messageObject.instance_id})
      const newMessage = {
        recieverId : recieverId?._id,
        senderId: senderId?._id,
        instance_id: messageObject?.instance_id,
        text: message,
        type: 'text'
      }
      const savedMessage = new Message(newMessage);
      // console.log('savedMessage', savedMessage)
      await savedMessage.save();
      const sendMessageObj={
        number: remoteId,
        type: 'text',
        instance_id: messageObject?.instance_id,
      }
      io.emit(messageObject?.instance_id.toString() , savedMessage);
      let start = new Date();
      start.setHours(0,0,0,0);

      let end = new Date();
      end.setHours(23,59,59,999);

      if(['hy','hi','hii','hey','hello','slm','salam','hyy','salaam'].includes(message.toLowerCase())){
        const response =  await sendMessageFunc({...sendMessageObj,message:'Salam Alaikum'})
        return res.json(response);

      }else if(/^\d{8}$/.test(message)){
        const ITSmatched = await Contact.findOne({number: remoteId, ITS:message})
        let responseText= '';
        if(ITSmatched){
            await ChatLogs.findOneAndUpdate(
              {
                senderId: senderId?._id,
                instance_id: messageObject?.instance_id,
                requestedITS: message, // Ensure there is a registeredId
                updatedAt: { $gte: start, $lt: end } // Documents updated today
              },
              {
                $set: {
                  updatedAt: Date.now() // Update updatedAt field only
                }
              },
              {
                upsert: true, // Create if not found, update if found
                new: true // Return the modified document rather than the original
              }
            )
          responseText = 'Apne aaj raat na jaman nu izan araz kare che , Reply yes/no for confirmation'
        }else{
          responseText = 'Sorry , your ITS is not registered with us yet !'
        }
        const response = await sendMessageFunc({...sendMessageObj,message: responseText})
        return res.json(response);

      }else if(['yes','no'].includes(message.toLowerCase())){
        const response = await sendMessageFunc({...sendMessageObj,message:'Thank you'})
        await ChatLogs.findOneAndUpdate(  
            {
              senderId: senderId?._id,
              instance_id: messageObject?.instance_id,
              updatedAt: { $gte: start, $lt: end }
            },
            {
              $set: {
                finalResponse: message.toLowerCase()
              }
            },
            {
              new: true,
              sort: { updatedAt: -1 }
            }
          )
        return res.json(response);

      }else{
        return res.send(true)

      }
    }else{
      return res.send(true)

    }
    // Save the message to the database

    // // Emit the message to all clients in the conversation room

  } catch (error) {
    console.error(error);

    res.status(500).json({ error: 'Internal server error' });
  } 
}

const sendMessageFunc = async (message)=>{
  const url = process.env.LOGIN_CB_API
  const access_token = process.env.ACCESS_TOKEN_CB
  console.log('paramsObj',message)
  const response = await axios.get(`${url}/send`,{params:{...message,access_token}})
  // console.log(response)
  // const response = 'message send'
  return response;
}

const getReport = async (req, res)=>{
  let query =[
    {$match: { instance_id:req.params.id } },
    {$lookup : {
      from: 'contacts',
      localField: 'senderId',
      foreignField: '_id',
      as: 'contact'
    }},
    {$lookup : {
      from: 'instances',
      localField: 'instance_id',
      foreignField: 'instance_id',
      as: 'instance'
    }},
    {$unwind:{
      path: '$instance',
      preserveNullAndEmptyArrays: true
    }},
    {$unwind:{
      path: '$contact',
      preserveNullAndEmptyArrays: true
    }},
    { $addFields: {
      PhoneNumber: { $toString: '$contact.number' } // Convert to string
  }},
    {
      $project: {
        _id: 0,
        Name: '$contact.name',
        PhoneNumber: 1,
        ITS: '$contact.ITS',
        Time: '$updatedAt',
        Response: '$finalResponse',
        ReceivedTo: '$instance.name'
      }
    }
  ]
  const data = await ChatLogs.aggregate(query);
  const csvWriter = createCsvWriter({
    path: './download.csv',
    header: [
      { id: 'Name', title: 'Name' },
      { id: 'PhoneNumber', title: 'Phone Number', stringQuote: '"' },
      { id: 'ITS', title: 'ITS' },
      { id: 'Response', title: 'Response' },
      { id: 'RecievedTo', title: 'Recieved To' },
    ]
  });

  await csvWriter.writeRecords(data);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=report.csv');

  const fileStream = fs.createReadStream('./download.csv');
  fileStream.pipe(res);
}

module.exports = {
  saveContact,
  getContact,
  updateContacts,
  getMessages,
  sendMessages,
  recieveMessages,
  getReport
};
