const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
const port = 2222;

app.post('/send-client-info', (req, res) => {
    let params = req.body;
    let filename = __dirname + '/logs/logs.json';
    fs.readFile(filename, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log(err);
        } else {
            let logList = JSON.parse(data); //now it an object
            logList.push(params);
            logList = JSON.stringify(logList); //convert it back to json
            fs.writeFile(filename, logList, 'utf8', () => {
                res.json({msg: 'success'});
            }); // write it back
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
