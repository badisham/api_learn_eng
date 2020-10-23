module.exports = (app) => {
    const member = require('../controllers/member.controller.js');

    // Create a new member
    app.post('/member', member.create);

    // Get all member
    app.get('/member', member.findAll);

    // Get a single member with id
    app.get('/member/:id', member.findOne);

    // Update
    app.put('/member/:id', member.update);

    // Delete
    app.delete('/member/:id', member.delete);

    // Delete all
    app.delete('/member', member.deleteAll);
};
