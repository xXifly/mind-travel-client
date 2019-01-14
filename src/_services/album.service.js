import {
    authHeader
} from '../_helpers';

export const albumService = {
    getAll
};

//to refactor
const apiUrl = 'http://127.0.0.1:10010';

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${apiUrl}/album/all`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             window.location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });

    return [{
            id: "1",
            name: "album1"
        },
        {
            id: "2",
            name: "album2"
        },
        {
            id: "3",
            name: "album3"
        },
        {
            id: "4",
            name: "album4"
        }
    ]

}