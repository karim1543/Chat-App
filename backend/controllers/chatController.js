const Chat = require('../models/Chat');

exports.createOrGetChat = async (req, res) => {
  const { userId } = req.body;
  const currentUserId = req.user._id;

  try {
    let chat = await Chat.findOne({
      members: { $all: [currentUserId, userId] }
    }).populate('members', '-password').populate('lastMessage');

    if (!chat) {
      chat = await Chat.create({ members: [currentUserId, userId] });
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserChats = async (req, res) => {
  try {
    const chats = await Chat.find({ members: req.user._id })
      .populate('members', '-password')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
