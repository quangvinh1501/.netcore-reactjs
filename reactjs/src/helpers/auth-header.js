export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 
            'Authorization': 'Bearer ' + user.token,
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin': "*",
            'Accept': 'application/json'
        };
    } else {
        return {};
    }
}