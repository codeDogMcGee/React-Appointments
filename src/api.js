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
        .catch((err) => onError(err));
};
    
const makeApiPostRequest = (endpoint, setLoading, onSuccess, onError, data, includeApiToken=true) => {
    setLoading(true);

    axios
        .post(getUrl(endpoint), data, {
            method: "POST",
            headers: includeApiToken ? { Authorization: `token ${sessionStorage.getItem('ApiToken')}`, } : {},
        })
        .then(({ data }) => onSuccess(data))
        .catch((err) => onError(err));
};  

const makeApiDeleteRequest = (endpoint, setLoading, onSuccess, onError, includeApiToken=true) => {
    setLoading(true);
    axios
        .delete(getUrl(endpoint), {
            method: "DELETE",
            headers: includeApiToken ? { Authorization: `token ${sessionStorage.getItem('ApiToken')}`, } : {},
        })
        .then((response) => onSuccess(response))
        .catch((err) => onError(err));
};

export { makeApiPostRequest, makeApiGetRequest, makeApiDeleteRequest }
