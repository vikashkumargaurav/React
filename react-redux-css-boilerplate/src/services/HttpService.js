import Axios from "axios";

// This is a reusable module
// handling unexpected response error message globally

Axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        // showing un-expected error here for every response globally and throwing rejected promise so expected error will be handled in respected try & catch block in respected catch block
        console.log('Logging the error', error);
    }

    return Promise.reject(error);

});

export default {
    get: Axios.get,
    post: Axios.post,
    put: Axios.put,
    delete: Axios.delete,
}
