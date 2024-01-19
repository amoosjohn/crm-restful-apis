import { addNewContact, 
         getContacts, 
         getContactById, 
         updateContact, 
         deleteContact } from "../controllers/crmController";
import {login, 
        register, 
        verifyToken,
        logout} from "../controllers/userController";

const routes = (app) => {
    app.route('/contact')
    .get(verifyToken, getContacts)

    .post(verifyToken, addNewContact);

    app.route('/contact/:contactId')
    //get specific contact
    .get(verifyToken, getContactById)

    //update a contact
    .put(verifyToken, updateContact)
    
    .delete(verifyToken, deleteContact);

    //login route
    app.route('/login')
        .post(login);

    //register route
    app.route('/auth/register')
        .post(register);

        //login route
    app.route('/logout')
    .get(verifyToken, logout);
}

export default routes;