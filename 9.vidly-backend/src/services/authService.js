import http from './httpService';
import {apiUrl} from '../config.json';

const apiEndPoint = apiUrl + '/auth';

export function login(credentails) {
    return http.post(apiEndPoint, credentails);
}