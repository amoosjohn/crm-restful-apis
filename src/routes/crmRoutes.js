import { addNewContact, 
         getContacts, 
         getContactById, 
         updateContact, 
         deleteContact } from "../controllers/crmController";
import {login, 
        register, 
        loginRequired} from "../controllers/userController";

const routes = (app) => {
    app.route('/contact')
    .get(loginRequired, getContacts)

    .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
    //get specific contact
    .get(loginRequired, getContactById)

    //update a contact
    .put(loginRequired, updateContact)
    
    .delete(loginRequired, deleteContact);

    //login route
    app.route('/login')
        .post(login);

    //register route
    app.route('/auth/register')
        .post(register);
}

export default routes;