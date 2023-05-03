const { getReply } = require('./src/reply.js');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.get("/", function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end("<h1>this is gg</h1>")

})

app.post("/get-message", function (req, res) {
    const body = req.body;
    const rep = getReply(body.msg);
    res.status(200)
    res.json({ msg: rep })

})
app.listen(6969, function (err) {
    if (err) {
        console.log("server fucked up")
    } else {
        console.log("server started at port 6969")
    }
})



