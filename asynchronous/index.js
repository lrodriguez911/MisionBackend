//asynchornus process
/* http = require('http');

console.log("hi");

http.get('http://httpstat.us/200', async (res) => {
    await console.log(`the API return : ${res.statusCode}`);
})

console.log("bye"); */

setTimeout(() => {
    console.log("you were waiting for me");
}, 2000);