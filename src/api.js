import axios from "axios";

const BASE_DOMAIN = "http://127.0.0.1:8000/";

const getUrl = endpoint => `${BASE_DOMAIN}${endpoint}`;

const makeApiGetRequest = (endpoint, setLoading, onSuccess, onError, includeApiToken=true) => {
    setLoading(true);

    axios
        .get(getUrl(endpoint), {
            method: "GET",
            headers: includeApiToken ? { Authorization: `token ${sessionStorage.getItem('ApiToken')}`, } : {},
        })
        .then(({ data }) => onSuccess(data))
        // .catch((err) => onError(err));
        .catch((err) => onApiError(err, onError, setLoading))
};
    
const makeApiPostRequest = (endpoint, setLoading, onSuccess, onError, data, includeApiToken=true) => {
    setLoading(true);

    axios
        .post(getUrl(endpoint), data, {
            method: "POST",
            headers: includeApiToken ? { Authorization: `token ${sessionStorage.getItem('ApiToken')}`, } : {},
        })
        .then(({ data }) => onSuccess(data))
        .catch((err) => onApiError(err, onError, setLoading))
};  

const makeApiDeleteRequest = (endpoint, setLoading, onSuccess, onError, includeApiToken=true) => {
    setLoading(true);
    axios
        .delete(getUrl(endpoint), {
            method: "DELETE",
            headers: includeApiToken ? { Authorization: `token ${sessionStorage.getItem('ApiToken')}`, } : {},
        })
        .then((response) => onSuccess(response))
        // .catch((err) => onError(err));
        .catch((err) => onApiError(err, onError, setLoading))
};

const onApiError = (errorObject, setErrorsCallback, setLoading) => {
    setLoading(false);
    let output = []

    if (errorObject.response.data) {

        if (Array.isArray(errorObject.response.data)) {
            
            output = errorObject.response.data;
        }
        else if (typeof(errorObject.response.data) === "string") {
            output = [errorObject.response.data];
        } else {

            for (const [key, value] of Object.entries(errorObject.response.data)) {

                if (key === "non_field_errors" || key === "detail") output.push(value)
                else output.push(`${key}: ${value}`);

            }
        }
    }
    else {

        if (Array.isArray(errorObject)) {
            output = errorObject
        } 
        else output = [errorObject.toString()]
    }

    setErrorsCallback(output);

}

export { makeApiPostRequest, makeApiGetRequest, makeApiDeleteRequest }
