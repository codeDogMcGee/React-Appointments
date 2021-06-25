import axios from "axios";

const BASE_DOMAIN = "http://127.0.0.1:8000/";

// const makeApiGetRequest = async (requstType, endpoint, onSuccess, onError, ) => {
//     const url = `${BASE_DOMAIN}${endpoint}`
//     axios
//         .get(url, {
//             method: "GET",
//             headers: {
//                 Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
//             },
//         })
//         .then(({ data }) => onSuccess(data))
//         .catch((err) => onError(err));
//     }

const makeApiRequest = async (requstType, endpoint, onSuccess, onError, data=null) => {
    const url = `${BASE_DOMAIN}${endpoint}`
    requstType = requstType.toUpperCase()

    if (requstType === "POST") {
        if (data){
            axios
            .post(url, data, {
                method: requstType,
                headers: {
                    Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
                },
            })
            .then(({ data }) => onSuccess(data))
            .catch((err) => onError(err));
        } else {
            throw Error(`Must supply a data object with a POST request.`);
        }
    } 
    else if (requstType === "GET") 
    {
        axios
        .get(url, {
            method: requstType,
            headers: {
                Authorization: `token ${process.env.REACT_APP_API_TOKEN}`,
            },
        })
        .then(({ data }) => onSuccess(data))
        .catch((err) => onError(err));
    }
    else {
        throw Error(`Invalid requestType "${requstType}". Must be "GET" or "POST".`);
    }
}

    
    



export default makeApiRequest;
