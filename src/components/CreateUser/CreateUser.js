import { useState } from "react";
import { formatErrors } from "../../util/stringFormatting";
import { makeApiPostRequest } from "../../api";
import { CREATE_NEW_CUSTOMER } from "../../util/endpoints";

import "./CreateUser.css";

const CreateUser = ({setLoading, setView, email}) => {   

    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [emailKey, setEmailKey] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState(null);

    const newUserSucess = (user) => {
        console.log("new user")
        console.log(user)
        setLoading(false);
        setView("");
    }

    const submitNewUser = (e) => {
        e.preventDefault();

        if (password1 !== password2) setErrors(["Passwords do not match"])
        else { 
            
            const userObject = {
                email: email,
                phone: phone,
                name: name,
                password_submitted: password1
            };

            makeApiPostRequest(CREATE_NEW_CUSTOMER + emailKey + '/', setLoading, newUserSucess, setErrors, userObject, false);
        }
    }

    const responseMessage = errors ? formatErrors(errors) : "";

    return (
        <div id="new-user-container">
        <h2>Create New Account</h2>
        <form name="newUserForm" id="new-user-form" onSubmit={submitNewUser}>
            
            <label>Name:</label>
            <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>

            <label>Phone:</label>
            <input id="phone" name="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>

            <label>Password1:</label>
            <input className="password-input" name="password1" type="password" onChange={(e) => setPassword1(e.target.value)}/>

            <label>Password2:</label>
            <input className="password-input" name="password2" type="password" onChange={(e) => setPassword2(e.target.value)} />

            <label>Verification Key:</label>
            <input id="email-key" name="emailKey" type="text" value={emailKey} onChange={(e) => setEmailKey(e.target.value)}/>
            <p id="key-message">* Sent to email</p>
            
            <input type="submit" value="Create Account" className="btn" />
        </form>
        
        {responseMessage}

    </div>
          );
};

export default CreateUser;