import { authHeader } from '../_helpers';
import {loginUserMutation} from './../mutations/LoginUserMutation'
import {client} from './../client/client';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};
const createId = () => {
    let id = '';
    let chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 15; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
};
const usersList = [{
    id:createId(),
    number: 21,
    name:'Liceo Infantil Britanico.',
    usr:'liceo2021',
    pass:'yosoyliceo'
},{
    id:createId(),
    number: 22,
    name:'Instituto Patria.',
    usr:'patria2021',
    pass:'yosoypatria'
},{
    id:createId(),
    number: 23,
    name:'Universidad Hotelera Suiza',
    usr:'suiza2021',
    pass:'yosoysuiza'
},{
    id:createId(),
    number: 24,
    name:'Kids Center Acapulco',
    usr:'kidscenteracapulco2021',
    pass:'yosoykidscenterac'
},{
    id:createId(),
    number: 25,
    name:'Kids Center',
    usr:'kidcenter2021',
    pass:'yosoykidcenter'
}];

function token() {
    let rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };
    return rand() + rand();
}
//const loguearse = useMutation(LOGIN);
function login(email, password) {
    debugger;

    let user = usersList.find(u => u.usr === email && u.pass === password);

    if (user)
    {
        user.token = token();
        localStorage.setItem('user', JSON.stringify(user));
        return Promise.resolve(user);
    }
    return Promise.reject('Error to connect');
    // .mutate({
    //     mutation: loginUserMutation,
    //     variables:{
    //         username: email, password: password
    //     }
    // })
    // .then(handleResponse)
    // .then(user => {
    //     localStorage.setItem('user', JSON.stringify(user));
    //     return user;
    // });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://ec2-3-122-104-154.eu-central-1.compute.amazonaws.com/api/v1/auth/profile`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://restservices.itcodesolutions.com/api/v1/auth/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://restservices.itcodesolutions.com/api/v1/auth/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://restservices.itcodesolutions.com/api/v1/auth/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://restservices.itcodesolutions.com/api/v1/auth/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(result) {

    if(result && result.data){
        let userDetails = {
            id: result.data.login.user.id,
            firstName: result.data.login.user.first_name,
            lastName: result.data.login.user.last_name,
            username: result.data.login.user.email,
            token: result.data.login.access_token

        }
        return userDetails;
    }
    return Promise.reject('Error to connect');
}
