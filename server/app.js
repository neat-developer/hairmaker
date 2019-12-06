const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
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


                fs.readFile(__dirname + '/config/mail.json', 'utf8', function readFileCallback(err, user) { // Почта
                    if (err) {
                        console.log(err);
                    } else {
                        user = JSON.parse(user); //now it an object
                        let transport = nodemailer.createTransport({
                            service: "Yandex",
                            auth: {
                                user: user.name,  // to be replaced by actual username and password
                                pass: user.password
                            }
                        });

                        transport.sendMail({
                            from: 'beauty@hairmaker.club',
                            to: ['beauty@hairmaker.club', 'webangulardeveloper@gmail.com'],
                            subject: 'Регистрация на сайте "hairmaker"',
                            text: 'Пользователь оставил свой номер',
                            html: '<!DOCTYPE html><html lang="ru"><head> <meta charset="UTF-8"> <title>Пользователь хочет записаться</title>' +
                                '</head><body>' +
                                '<h1>Пользователь оставил свой номер</h1>' +
                                '<p>Имя: <b>' +params.name + '</b></p>' +
                                '<p>Номер телефона: <b>' + params.phone + '</b></p>' +
                                '</body></html>'
                        })
                    }
                });

                res.json({msg: 'success'});
            }); // write it back
        }
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
