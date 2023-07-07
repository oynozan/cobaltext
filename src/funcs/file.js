const fs = require('fs');

class File {
    read(location) {
        return new Promise((resolve, reject) => {
            fs.readFile(location, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return reject();
                }
                else return resolve(data);
            })
        })
    }

    write() {

    }
}

module.exports = File;