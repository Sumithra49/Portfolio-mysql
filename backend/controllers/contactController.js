const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ message: 'Message sent successfully', data: newContact });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};
