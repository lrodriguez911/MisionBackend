// whit Promises

function readCard(card) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(card.split("").reverse().join(""));
        }, 2000);
    });
  }
  
  function constructToy(instruccion) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
            const toy = instruccion.split("").reverse().join("");
            if (toy.includes("wood")) return resolve(`${toy} of fine wood`);
            else if (toy.includes("xbox")) return resolve(`I cant send your ${toy}`);
            else return resolve(`here you have the ${toy}`);
  
          }, 5000);
      });
  }
  
  
  function giftWrap(toy) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(`${toy} wrap`)
          }, 3000);
      })
  }
  
  readCard("xbox one")
  .then((instruccion) =>{
      return constructToy(instruccion)
  })
  .then((toy)=>{
     return giftWrap(toy)
  })
  .then(console.log);