import Contacts from '../models/crmContacts';

export const addNewContact = (req, res) => {
    let newContact = new Contacts(req.body);

    newContact.save(err => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'You saved successfully'});
    });
}

export const getAllContacts = (req, res) => {
    Contacts.find({}, (err, contacts) => {
        if (err) {
            res.send(err);
        }
        res.json(contacts);
    })
}

// in params req.params.(this must same with path paramaters)
// if /user/:userId, so in findById must be req.params.userId
export const getContactId = (req, res) => {
    Contacts.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    })
}

export const editContact = (req, res) => {
    Contacts.findByIdAndUpdate(req.params.contactId, req.body, {new: true}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Your Update is Success'});
    })
}

export const removeBasedId = (req, res) => {
    Contacts.remove({_id: req.params.contactId}, (err) => {
        if(err) {
            res.send(err);
        }
        res.json({message : 'Remove was Success'})
    })
}
