const User = require("../models/user");

exports.getAppointment = (req, res, next) => {
    User.findAll().then((user) => {
        return res.status(200).json(user);
    }).catch(err => {
        res.status(404).json({ error: err });
    });
};

exports.addAppointment = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const date = req.body.date;
    const time = req.body.time;

    User.create({
        name: name,
        email: email,
        phone: phone,
        date: date,
        time: time,
    }).then((user) => {
        res.status(201).json(user);
    }).catch(err => {
        res.status(404).json({ error: err });
    });
}

exports.getEditAppointment = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId).then((user) => {
        res.status(200).json(user);
    }).catch(err => {
        res.status(404).json({ error: err });
    })
}

exports.updateAppointment = (req, res, next) => {
    const userId = req.params.id;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedPhone = req.body.phone;
    const updatedDate = req.body.date;
    const updatedTime = req.body.time;

    User.findByPk(userId).then((user) => {
        user.name = updatedName;
        user.email = updatedEmail;
        user.phone = updatedPhone;
        user.date = updatedDate;
        user.time = updatedTime;
        user.save();
        res.status(200).json(user);
    }).catch(err => {
        res.status(404).json({ error: err });
    });
}

exports.deleteAppointment = (req, res, next) => {
    const userId = req.params.id;
    User.findByPk(userId).then((user) => {
        user.destroy();
        res.status(200).json(user);
    }).catch(err => {
        res.status(404).json({ error: err });
    });
}