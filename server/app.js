const express = require('express');
const bodyParser = require('body-parser');
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
    console.log('params:', params);
    res.json({msg: 'success'});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
