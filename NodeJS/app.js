const http = require('http')

console.log(http);

const hola = "Hola Mundo";

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
res.statusCode("200").send(hola)
})

server.listen("/", port)