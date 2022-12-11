// whit setTimeout

function readCard(card, cb) {
  return setTimeout(() => {
    cb(card.split("").reverse().join(""));
  }, 2000);
}

function constructToy(instruccion, cb) {
  return setTimeout(() => {
    const toy = instruccion.split("").reverse().join("");
    if (toy.includes("wood")) return cb(`${toy} of fine wood`);
    else if (toy.includes("xbox")) return cb(`I cant send your ${toy}`);
    else return cb(`here you have the ${toy}`);
  }, 5000);
}


function giftWrap(toy, cb) {
    return setTimeout(() => {
        cb(`${toy} wrap`)
    }, 3000);
}

//callback hell
/* readCard("card s wood", (instruccion) => {
    constructToy(instruccion, (toy) =>{
        giftWrap(toy, console.log)
    })
}) */

//modularize the callbacks cb
//make functions separate for calls
function constructT(toy) {
    giftWrap(toy, console.log);
}


function readC(instruccion) {
    constructToy(instruccion, constructT);
}

readCard("card of wood", readC);


