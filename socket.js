var express = require('express');
const app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);

server.listen(3000, () => {
    console.log("Server started on port 3000")
});

io.on("connect",(client) => {
    console.log("A client has connected...")
    client.on("msg", (data) => {
        console.log(data);
    })

    client.on("disconnect", () => {
        console.log("A client disconeected");
    })

    client.on("login", (data) => {
        console.log(data);
        var message = "account exists!";
        var package = {"response" : message};
        console.log(`sent: ${package} | ${typeof(package)}`);
        client.emit('loginRes', package);
    })
})
