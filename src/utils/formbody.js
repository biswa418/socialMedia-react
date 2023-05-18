export const getFormBody = (params) => {
    let formBody = [];

    console.log(params);

    for (let prop in params) {
        let encodedKey = encodeURIComponent(prop); //removes spaces with url friendly string
        let encodedValue = encodeURIComponent(params[prop]);

        formBody.push(encodedKey + '=' + encodedValue);
    }


    return formBody.join('&');
}