import axios from "axios";
import {toast} from 'react-toastify'


// This is a reusable module
// handling unexpected response error message globally

axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) {
        // showing un-expected error here for every response globally and throwing rejected promise so expected error will be handled in respected try & catch block in respected catch block
        console.log('Logging the error', error);
        toast.error('An unexpected error occurred...');
    }

    return Promise.reject(error);

});

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
