const express = require("express");
const path = require("path");
const http = require("http");
const PORT = process.env.PORT || 3000;
const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "public")));

server.listen(PORT, () => {
  console.log(`the server is litening in port: ${PORT}`);
});

const connections = [null, null];

io.on("connection", (socket) => {
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
      break;
    }
  }

  socket.emit("player-number", playerIndex);

  console.log(`Player ${playerIndex} has been conected`);

  if (playerIndex === -1) return;
  connections[playerIndex] = false;

  socket.broadcast.emit("player-connection", playerIndex);

  socket.on("disconnect", () => {
    console.log(`Player ${playerIndex} has been disconected`);
    connections[playerIndex] = null;
    socket.broadcast.emit("player-connection", playerIndex);
  });

  socket.on('player-ready', ()=>{
    socket.broadcast.emit('enemy-ready', playerIndex);
    connections[playerIndex] = true;
  })

  socket.on('check-players', ()=> {
    const player = [];
    for (const i in connections) {
        connections[i] === null ? player.push({connected : false, ready: false}) : 
        player.push({connected : true, ready: connections[i]});
    }
    socket.emit('check-players', players)

    socket.on('fire', id => {
        console.log(`Shoot from ${playerIndex}`, id);
        socket.broadcast.emit('fire', id);
    })
    socket.on('fire-reply', square => {
        console.log(square);
        socket.broadcast.emit('fire-reply', square)
    })

    setTimeout(() => {
        connections[playerIndex] = null;
        socket.emit('timeout');
        socket.disconnect()
    }, 100000);
  })
});
