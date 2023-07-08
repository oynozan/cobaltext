const fs = require('fs');

class File {
    read(dir) {
        return new Promise((resolve, reject) => {
            fs.readFile(dir, 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return reject();
                }
                else return resolve(data);
            })
        })
    }

    write(dir, content) {

    }
}

module.exports = File;