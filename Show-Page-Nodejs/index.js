const { urlencoded } = require('express');
const express = require('express')

const app = express()

const path = require('path')

const router = express.Router();

app.use(express.urlencoded({extended: true}))

app.use(express.json())

const PORT = process.env.PORT || 8080

app.use("/", router);


app.set("views", path.join(__dirname, "views"));

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/index.html'))
})

router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/contact.html'))
})

router.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname + '/templates/profile.html'))
})

router.post("/", (req, res) => {
    const {name, email} = req.body
    res.send(`the user: ${name} and email: ${email} has been registered`)
 
})

app.listen(PORT)

console.log(`Server is listening in port: ${PORT}`);