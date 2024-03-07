const {getIO} = require('../../connection/socket')
const axios = require('axios');
const Instance = require('../models/instanceModel')
const {Message, Contact, ChatLogs} = require('../models/chatModel');
const User = require('../models/user');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs')
const { getCachedData } = require('../middlewares/cache');

const dataKey = 'activeSet';

const saveContact = async(req, res)=>{
    try {
      const {name , ITS, number} = req.body
      const existingContact = await Contact.findOne({
        $or: [
          { name },
          { ITS }
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
      const { page, limit, searchtext} = req.query;
      if (searchtext) {
        query = {
          $or: [
            { name: { $regex: new RegExp(searchtext, 'i') } },
            { ITS: { $regex: new RegExp(searchtext, 'i') } },
            { number: { $regex: new RegExp(searchtext, 'i') } }
          ]
        };
      }
      console.log('query', query)
      const Contacts = await Contact.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
      const count = await Contact.countDocuments(query)

      return res.status(200).json({data: Contacts, total: count});

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
    const activeSet = await getCachedData(dataKey)
    console.log('activeSet', JSON.stringify(activeSet))
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
      console.log('senderId', senderId)
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

      if(['verify'].includes(message.toLowerCase())){
        console.log('verify')
        const response =  await sendMessageFunc({...sendMessageObj,message: activeSet.NumberVerifiedMessage });
        return res.send(true)

      }else if(/^\d{8}$/.test(message)){
        console.log('ITS')
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
          // await sendMessageFunc({...sendMessageObj,message: 'Your ITS verified !  '})
          // responseText = 'Apne aaj raat na jaman nu izan araz kare che , Reply yes/no for confirmation'
          responseText = activeSet.ITSverificationMessage.replace('${name}', ITSmatched.name );
        } else {
          responseText = activeSet.ITSverificationFailed;
        }
        const response = await sendMessageFunc({...sendMessageObj,message: responseText});
        return res.send(true);

      }else if(['yes','ok','okay','no'].includes(message.toLowerCase())){
        console.log('accept')
        const response = await sendMessageFunc({...sendMessageObj,message:message.toLowerCase()!='no'? activeSet.AcceptanceMessage : activeSet.RejectionMessage })
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
        return res.send(true);

      } else {
        const reply = processUserMessage(message, activeSet);
        if(reply) {
          console.log('other')
          const reply = processUserMessage(message, activeSet);
          const response = await sendMessageFunc({...sendMessageObj,message:reply });
  
          return res.send(true);
        }
        return res.send(true);
      }
    }else{
      return res.send(true);

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

function processUserMessage(message, setConfig) {
  // Iterate through setData array to find matching keywords
  console.log(setConfig.setData)
  for (const data of setConfig.setData) {
      for (const keyword of data.keywords) {
          if (message.toLowerCase().includes(keyword.toLowerCase())) {
              return data.answer.message;
          }
      }
  }
  return null; // Return default message if no matching keyword is found
}

const getReport = async (req, res)=>{
  const { fromDate, toDate } = req.query;
  
  if (fromDate && toDate) {
    startDate = new Date(fromDate);
    endDate = new Date(toDate);
}


  let dateFilter = {};
  if (startDate && endDate) { // If both startDate and endDate are defined, add a date range filter
    dateFilter = {
        "updatedAt": {
            $gte: startDate,
            $lt: endDate
        }
    };
}

  let query =[
    {$match: { instance_id:req.params.id ,...dateFilter } },
    {$lookup : {
      from: 'contacts',
      localField: 'requestedITS',
      foreignField: 'ITS',
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
