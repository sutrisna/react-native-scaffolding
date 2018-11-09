import { ENDPOINT, KEY } from "../variables/const-global";

const http = {
    getUsers: () => {
        return fetch(`${ENDPOINT}/users`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                alert("Failed load !");
            });
    },
    setPosts: (data) => {
        return fetch(`${ENDPOINT}/posts`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => {
                return res.json();
            })
            .catch(err => {
                alert("Failed post !");
            });
    },
};

export default http;
