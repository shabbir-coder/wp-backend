const SetModel = require('../models/setModel')
const {clearCache} = require('../middlewares/cache')
// setController.js
const dataKey = 'activeSet';

exports.addSet = async (req, res) => {
  try {
    const newSetData = req.body;
    console.log(req.user)
    newSetData['createdBy']=req.user.userId
    const savedSet = await SetModel.create(newSetData);
    clearCache(dataKey)
    return res.json(savedSet);

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.validatekeywords = async(req,res)=>{
  try {
    const createdBy = req.user.userId;
    const keyword = req.body.keyword;
    const existingSet = await SetModel.find().lean();
    // const existingSet = await SetModel.find({ createdBy });
    const usedKeywords = existingSet.flatMap((set) => {
      return set.setData.flatMap((data) => {
        return data.keywords;
      });
    });
    if(usedKeywords.includes(keyword)){
      return res.status(200).json({status: false, message: 'Keyword already in use'});
    }
    return res.status(200).json({status: true, message: 'Keyword is available'});
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}

exports.updateSet = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.StartingTime
    req.body.EndingTime
    const updatedSet = await SetModel.findByIdAndUpdate(id, req.body, { new: true });
    clearCache(dataKey)
    res.json(updatedSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSetById = async (req, res) => {
  try {
    const { id } = req.params;
    const set = await SetModel.findById(id);
    res.json(set);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteSet = async (req, res) => {
  try {
    const { id } = req.params;
    await SetModel.findByIdAndDelete(id);
    clearCache(dataKey)
    res.json({ message: 'Set deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateSetStatus = async (req, res) => {

  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check if the new status is 'active'
    if (status === 'active') {
      // Find the currently active set and set it to pending
      await SetModel.updateMany({ isActive: true }, { $set: {status: 'pending', updatedAt: new Date()  } });
    }

    // Update the specified set
    const updatedSet = await SetModel.findByIdAndUpdate(id, { status , updatedAt: new Date()  }, { new: true });
    clearCache(dataKey)
    res.json(updatedSet);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getSetsList = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const sets = await SetModel.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const count = await SetModel.countDocuments()
    return res.status(200).json({data:sets, total: count});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
