const Member = require('../models/Member.model.js');

// Create and Save a new Member
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    // Create a Member
    const member = new Member({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        sex: req.body.sex,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        level_ID: '1000',
        role: req.body.role,
        national_ID: req.body.national_ID,
        bank_account_num: '',
    });

    // Save Member in the database
    Member.create(member, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the Member.',
            });
        else res.send(data);
    });
};

// Retrieve all Members from the database.
exports.findAll = (req, res) => {
    Member.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving Members.',
            });
        else res.send(data);
    });
};

// Find a single Member with a id
exports.findOne = (req, res) => {
    Member.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: 'Error retrieving Member with id ' + req.params.id,
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    console.log(req.body);

    Member.updateById(req.params.id, new Member(req.body), (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: 'Error updating Member with id ' + req.params.id,
                });
            }
        } else res.send(data);
    });
};

// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
    Member.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Member with id ${req.params.id}.`,
                });
            } else {
                res.status(500).send({
                    message: 'Could not delete Member with id ' + req.params.id,
                });
            }
        } else res.send({ message: `Member was deleted successfully!` });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
    Member.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || 'Some error occurred while removing all Members.',
            });
        else res.send({ message: `All Members were deleted successfully!` });
    });
};

