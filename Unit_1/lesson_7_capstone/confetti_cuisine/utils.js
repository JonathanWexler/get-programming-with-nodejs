const fs = require('fs'),
httpStatus = require('http-status-codes');

module.exports = {
    // File Loading
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (errors, data) => {
            if (errors) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html);
                getFile('views/error.html', res);
            }
            res.end(data);
        });
    }
};