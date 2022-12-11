let express = require('express');
let app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Create
app.post('/', function (req, res) {
    //res.send(`your name ${req.name}`)
    res.json(req.body.name)
})


//Read
app.get('/', function (req, res) {
    res.send("hello world")
})

//Update
app.put('/', function (req, res) {
    res.send(`have you updated the ${req.body.age}`)
})

//Delete
app.delete('/users', function (req, res) {
    res.send(`have you deleted the register ${req.query.user}`)
})

let server = app.listen(8080, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Server is listening in http://%s:%s", host, port);
    
})