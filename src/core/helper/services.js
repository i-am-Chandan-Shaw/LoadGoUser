

const apiString='https://loadgo.in/loadgo/'



export const post = (payload, type) => new Promise((resolve, reject) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    fetch(apiString + type + '.php', requestOptions)
        .then(response => {
            if (response.status === 200) {
                // If the response is successful (status code 200)
                response.json()
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(new Error('JSON Parse error=>', error)); // Handle JSON parsing error
                    });
            } else if (response.status === 404) {
                // If the response status is 404 (Not Found)
                reject(new Error('Data not found'));
            } else {
                // Handle other status codes as needed
                reject(new Error('Unexpected response status: ' + response.status));
            }
        }).catch(error => {
            reject(error);
        });
});

export const patch = (payload,reqType) => new Promise((resolve, reject) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    fetch(apiString+reqType+'.php',requestOptions)
    .then(response => {
        response.json()
            .then(response => {
                resolve(response);
            });
    }).catch(error => {
        reject(error);
    });
});


export const get = (reqType, queryParam) => new Promise((resolve, reject) => {
    let api = apiString + reqType +'.php'
    api = queryParam ? api+queryParam : api;
    fetch(api)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error.message);
        });
});