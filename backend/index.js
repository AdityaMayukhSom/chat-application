const { getReply } = require('./src/reply.js');
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http')
const { Server } = require('socket.io');
dotenv.config()
const clientURL = process.env.clientURL
console.log(clientURL)
const app = express();
app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.get("/", function (req, res) {
    console.log(clientURL)
    res.redirect(301, clientURL)

})

app.post("/get-message", function (req, res) {
    const body = req.body;
    const rep = getReply(body.msg);
    res.status(200)
    res.json({ msg: rep })

})

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*'
    },
    connectionStateRecovery: {
        // the backup duration of the sessions and the packets
        maxDisconnectionDuration: 2 * 60 * 1000,
    }
});

io.on('connection', (socket) => {
    socket.on("new-message", (message) => {
        socket.broadcast.emit("broadcast-message", { text: message.text })
    })
})



httpServer.listen(6969, function (err) {
    if (err) {
        console.log("server fucked up")
    } else {
        console.log("server started at port 6969")
    }
})







