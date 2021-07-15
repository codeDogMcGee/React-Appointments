import { useState } from "react";
import { makeApiPostRequest } from "../../api";
import { LOGIN_ENDPOINT } from "../../util/endpoints";
import { formatErrors } from "../../util/stringFormatting";
import "./Login.css";

const Login = ({ setView, setLoading }) => {   

    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(null);

    const loginOnSuccess = (data) => {
        document.loginForm.password.value = ""

        if (data.token) {
            sessionStorage.setItem('ApiToken', data.token);
        
            document.loginForm.email.value = ""
            
            setView("");
        }
        else {
            setErrors(["Error logging in. Please try again later."])
        }
    }

    const submitLogin = (e) => {
        e.preventDefault();
        
        const emailValidation = validateEmail();
      
        if (emailValidation.errors) setErrors([emailValidation.errors])

        const loginObject = {
            email:document.loginForm.email.value,
            password: document.loginForm.password.value
        }

        if (emailValidation.errors === null) makeApiPostRequest(LOGIN_ENDPOINT, setLoading, loginOnSuccess, setErrors, loginObject, false)
    };

    const validateEmail = () => {
        let errorList = [];
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(email).toLowerCase()) === false) errorList.push("Not a valid email address.");
        return {
            email: email,
            errors: errorList.length === 0 ? null : errorList
        }
    };

    const emailOnChange = (e) => {
        setEmail(e.target.value);
    };

    const onRegisterClick = () => {
        setView("request-email-verification");
    };

    const responseMessage = errors ? formatErrors(errors) : "";

    return (
        <div id="login-container">
        <h2>Login</h2>
        <form name="loginForm" id="login-form" onSubmit={submitLogin}>
            
            <label>Email:</label>
            <input id="email" name="email" type="text" value={email} onChange={emailOnChange}/>

            <label>Password:</label>
            <input id="password-input" name="password" type="password" />
            
            <input type="submit" value="Login" className="btn" />
        </form>

        <div className="register-container">
            <p>Don't have an account yet? Click below to create one!</p>
            <button className="btn register-btn" name="register" onClick={onRegisterClick}>Create New Account</button>
        </div>
        
        {responseMessage}

    </div>
          );
}

export default Login;