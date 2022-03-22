const fs = require('fs');
const FormData = require('form-data');

function addMultipartFormData(requestParams, context, ee, next) {
    const form = new FormData();
    form.append('resume', fs.createReadStream(__dirname + '/data/' + context.vars.filename));
    requestParams.body = form;
    return next(); 
}

module.exports = {
    addMultipartFormData
}