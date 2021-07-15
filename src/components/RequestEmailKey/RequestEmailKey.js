import { useState } from "react";

import { EMAIL_VERIFICATION_TOKEN } from "../../util/endpoints";
import { makeApiPostRequest } from "../../api"
import { formatErrors } from "../../util/stringFormatting";
import CreateUser from "../CreateUser/CreateUser";
import "./RequestEmailKey.css";


const RequestEmailKey = ({ setLoading, setView }) => {
    /*
        User can submit an email address, and an email verification link is sent to the user.
    */
    const [requestEmailView, setRequestEmailView] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(null);
    
    const onSubmitSuccess = (response) => {
        setLoading(false);
        setRequestEmailView("create-customer")
    };

    const submitEmailVerification = (e) => {
        e.preventDefault();

        setErrors(null);
      
        makeApiPostRequest(EMAIL_VERIFICATION_TOKEN, setLoading, onSubmitSuccess, setErrors, { email } , false);
    };

    const responseMessage = errors ? formatErrors(errors) : "";


    if (requestEmailView === "create-customer") {
        return <CreateUser setLoading={setLoading} setView={setView} email={email}/>
    }
    else {
        return (
            <div id="email-ver-container">
                <h2>Request Email Verification Link</h2>
                <form name="emailVerRequestForm" id="email-ver-form" onSubmit={submitEmailVerification}>
                    
                    <label>Email:</label>
                    <input id="email" name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>

                    <input type="submit" value="Send Email" className="btn" />
                </form>

                {responseMessage}

                <p id="instructions">
                    Email verification is required to create a new account, or to change your password. Once you've submitted
                    your email look for a message from us containing a key to enter on the next page.
                </p>
            
            </div>
        );
    }
};

export default RequestEmailKey;