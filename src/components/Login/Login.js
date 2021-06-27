import { useState } from "react";
import makeApiRequest from "../../api";
import { LOGIN_ENDPOINT } from "../../util/endpoints";

import "./Login.css";

const Login = ({ setView }) => {   
    const [areaCode, setAreaCode] = useState("");
    const [prefix, setPrefix] = useState("");
    const [suffix, setSuffix] = useState("");

    const [errors, setErrors] = useState(<ul />);

    const loginOnSuccess = (data) => {
        document.loginForm.password.value = ""

        if (data.token) {
            sessionStorage.setItem('ApiToken', data.token);
            sessionStorage.setItem('UserGroup', data.user_group)

            document.loginForm.areaCode.value = ""
            document.loginForm.prefix.value = ""
            document.loginForm.suffix.value = ""

            setView("make-appointment");
            // setLoggedInUser(null);
        }
        else {
            loginError(data)
        }
    }

    const loginError = (err) => {
        document.loginForm.password.value = ""

        let errorsList = []
        for (const [key, value] of Object.entries(err.response.data)) {
            if (key === "non_field_errors" || key === "detail") errorsList.push(value)
            else errorsList.push(`${key}: ${value}`);
        }
        
        setErrors(
            <ul className="errors errors-ul">
                {errorsList.map( (error, i) => <li key={i}>{ error }</li> )}
            </ul>
        )
    };

    const submitLogin = (e) => {
        e.preventDefault();
        
        let errorsList = []

        const phoneNumberValidation = validatePhoneNumber();
        if (phoneNumberValidation.errors) errorsList = [...phoneNumberValidation.errors]

        setErrors(
            <ul className="errors errors-ul">
                {errorsList.map( (error, i) => <li key={i}>{ error }</li> )}
            </ul>
        )

        const loginObject = {
            phone: phoneNumberValidation.phoneNumber,
            password: document.loginForm.password.value
        }

        if (errorsList.length === 0) makeApiRequest("POST", LOGIN_ENDPOINT, loginOnSuccess, loginError, false, loginObject)
    };


    const validatePhoneNumber = () => {
        const phoneNumber = areaCode + prefix + suffix;

        let errorList = [];
        if (phoneNumber.length !== 10) errorList.push("Phone number must have 10 digits.");

        if (/^\d+$/.test(phoneNumber) === false) errorList.push("Phone number contains non-numerical values.");

        return {
            phoneNumber: phoneNumber,
            errors: errorList.length === 0 ? null : errorList 
        }
    };

    const areaCodeOnChange = (e) => {
        if (e.target.value.length.toString() === e.target.getAttribute("maxlength")) {
            document.loginForm.prefix.focus();
        }
        setAreaCode(e.target.value);
    };

    const prefixOnChange = (e) => {
        if (e.target.value.length.toString() === e.target.getAttribute("maxlength")) {
            document.loginForm.suffix.focus();
        }
        setPrefix(e.target.value);
    };
    const suffixOnChange = (e) => {
        if (e.target.value.length.toString() === e.target.getAttribute("maxlength")) {
            document.loginForm.password.focus();
        }
        setSuffix(e.target.value);
    };

    return (
        <div id="login-container">
        <h2>Login</h2>
        <form name="loginForm" id="login-form" onSubmit={submitLogin}>
            <label>Phone:</label>
            <div id="phone-inputs">
                <input id="area-code" name="areaCode" type="text" maxLength="3" value={areaCode} onChange={ areaCodeOnChange } /> 
                <input id="prefix" name="prefix"  type="text" maxLength="3" value={prefix} onChange={ prefixOnChange } /> 
                <input id="suffix" name="suffix" type="text"  maxLength="4" value={suffix} onChange={ suffixOnChange } />
            </div>
            
            <label>Password:</label>
            <input name="password" type="password" />
            
            <input type="submit" value="Login" className="btn" />
        </form>
        
        {errors}

    </div>
          );
}

export default Login;