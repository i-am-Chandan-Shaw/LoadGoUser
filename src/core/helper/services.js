

const apiString='https://loadgo.in/loadgo/'



export const post = (payload, type) => new Promise((resolve, reject) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };
    console.log('payload',payload);
    fetch(apiString + type + '.php', requestOptions)
        .then(response => {
            if (response.ok) {
                console.log(response);
                // If the response is successful 
                response.json()
                    .then(response => {
                        resolve(response);
                    })
                    .catch(error => {
                        reject(new Error('JSON Parse error=>', error)); // Handle JSON parsing error
                    });
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


export const del = (type,queryParam) => new Promise((resolve, reject) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      };
    let query = apiString + type + '.php'+queryParam;
    fetch(query,requestOptions)
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