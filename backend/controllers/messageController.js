const Message = require('../models/Message');
const Chat = require('../models/Chat');

exports.sendMessage = async (req, res) => {
  const { chatId, text } = req.body;

  try {
    const message = await Message.create({
      sender: req.user._id,
      chat: chatId,
      text,
    });

    await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

    const populatedMessage = await message.populate('sender', 'username');
    res.status(201).json(populatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chat: chatId })
      .populate('sender', 'username')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};