const { User } = require("../models")

exports.index = (req, res) => {
  User.find().then((users) => res.json(users))
}

exports.create = (req, res) => {
  User.create(req.body).then((user) => res.json(user))
}

exports.show = (req, res) => {
  User.findById(req.params.id).then((user) => res.json(user))
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then((user) =>
    res.json(user)
  )
}

exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id).then(() =>
    res.json({ message: "User deleted" })
  )
}
