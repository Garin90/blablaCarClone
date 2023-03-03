const Message = require('../models/message.model')

module.exports.list = (req, res, next) => {
  Message.find({
    $or: [
      { from: req.user._id, to: req.params.id },
      { to: req.user._id, from: req.params.id }

    ]
  })
  .populate('from')
  .populate('to')
  .then((messages) => {
    res.render('messages/chat', { messages, userId: req.params.id });
  })
  .catch(next)

}
module.exports.doCreate = (req, res, next) => {
  Message.create({
    message: req.body.message,
    to: req.params.id,
    from: req.user.id
  })
  .then(() => {
    res.redirect(`/users/chat/${req.params.id}`)
  })
  .catch(next)
}

module.exports.inbox = (req, res, next) => {
  res.render('messages/inbox')
}