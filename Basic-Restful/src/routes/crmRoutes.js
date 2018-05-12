import {addNewContact, getAllContacts, getContactId, editContact, removeBasedId} from '../controllers/crmControllers';

const routes = (app) => {
    app.route('/contacts')
    .get(getAllContacts)
    .post(addNewContact);

    app.route('/contacts/:contactId')
    .get(getContactId)
    .put(editContact)
    .delete(removeBasedId);
}

export default routes;