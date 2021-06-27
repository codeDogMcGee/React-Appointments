import axios from "axios";

const BASE_DOMAIN = "http://127.0.0.1:8000/";


const makeApiRequest = async (requstType, endpoint, onSuccess, onError, includeApiToken=true, data=null) => {
    const url = `${BASE_DOMAIN}${endpoint}`
    requstType = requstType.toUpperCase()

    let headersObject = {}
    if (includeApiToken) headersObject = { Authorization: `token ${sessionStorage.getItem('ApiToken')}`, };

    if (requstType === "POST") {
        // if (data){
        axios
        .post(url, data, {
            method: requstType,
            headers: headersObject,
        })
        .then(({ data }) => onSuccess(data))
        .catch((err) => onError(err));
        // } else {
        //     throw Error(`Must supply a data object with a POST request.`);
        // }
    } 
    else if (requstType === "GET") 
    {
        axios
        .get(url, {
            method: requstType,
            headers: headersObject,
        })
        .then(({ data }) => onSuccess(data))
        .catch((err) => onError(err));
    }
    else {
        throw Error(`Invalid requestType "${requstType}". Must be "GET" or "POST".`);
    }
}

    
    



export default makeApiRequest;
