const express = require('express');
const app = express();

const port = 3000;

const fs = require('fs');

app.get('/', (req, res) => {
    const files = fs.readdir("./", (error, files) => {
        const filesList = [];
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            for (const file of files) {
                // Is a file if has name and extension both
                let fileDetails;
                if (file.split('.').length > 1) {
                    fileDetails = {
                        name: file.split('.')[0],
                        type: 'file',
                        extension: file.split('.').splice(-1),
                    };
                } else {
                    // foldersdo not have extension
                    fileDetails = {
                        name: file,
                        type: 'folder',
                    };
                }
                filesList.push(fileDetails);
            }
            res.send(`<pre>
                ${JSON.stringify(filesList, undefined, 4)}
            </pre>`);
        }
    });
});

app.listen(port, () => {
    console.log(`App is running at ${port}`);
});