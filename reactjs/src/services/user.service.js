import { useLocation } from 'react-router-dom';
import { message } from 'antd';

export const userService = {
    login,
    logout
};
//function location(){ 
  //  window.location.reload(); 
  //}
function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(process.env.REACT_APP_API_URI+`Security/Login`, requestOptions)
         .then(handleResponse)
         .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
         });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                useLocation.reload(true);
                //location(true);
            }else if(response.status === 400){
                message.error('Username or password is incorrect');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}