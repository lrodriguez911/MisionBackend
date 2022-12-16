document.addEventListener("DOMContentLoaded", () => {
  const userGrid = document.querySelector(".grid-user");
  const cpuGrid = document.querySelector(".grid-cpu");
  const displayGrid = document.querySelector(".grid-display");
  const ships = document.querySelectorAll(".ship");
  const destroyer = document.querySelector(".destroyer-container");
  const submarine = document.querySelector(".submarine-container");
  const cruiser = document.querySelector(".cruiser-container");
  const battleship = document.querySelector(".battleship-container");
  const carrier = document.querySelector(".carrier-container");
  const startButton = document.querySelector("#start");
  const rotateButton = document.querySelector("#rotate");
  const turnDisplay = document.querySelector("#whose-go");
  const infoDisplay = document.querySelector("#info");
  const setupButtons = document.getElementById("setup-buttons");
  const width = 10;
  const userSquares = [];
  const cpuSquares = [];

  let isGameOver = false;
  let ready = false;
  let enemyReady = false;
  let allShipsPlaced = false;
  let playerNum = 0;
  let shotFired = -1;
  let currentPlayer = "user";
  let isHorizontal = true;

  //the boats
  const shipsArray = [
    {
      name: "destroyer",
      directions: [
        [0, 1],
        [0, width],
      ],
    },
    {
      name: "submarine",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "cruiser",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "battleship",
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: "carrier",
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ];

  createBoard(userGrid, userSquares);
  createBoard(cpuGrid, cpuSquares);

  //slecting game mode
  if (gameMode === "singlePlayer") {
    startSinglePlayer();
  } else {
    startMultiplayer();
  }

  //Creating the board's game
  function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      squares.push(square);
    }
  }

  //show which turn is playing
  function playGameSingle() {
    if (isGameOver) return;
    if (currentPlayer === "user") {
      turnDisplay.innerHTML = "Your go";
      cpuSquares.forEach((square) =>
        square.addEventListener("click", function (e) {
          shotFired = square.dataset.id;
          revealSquare(square, classList);
        }),
      );
    }
    if (currentPlayer === "enemy") {
      turnDisplay.innerHTML = "Enemy Turn";
      setTimeout(enemyGo, 1000);
    }
  }

  let destroyerCount = 0;
  let submarineCount = 0;
  let cruiserCount = 0;
  let battleshipCount = 0;
  let carrierCount = 0;

  function revealSquare(classList) {
    const enemySquare = cpuGrid.querySelector(`div[data-id ='${shotFired}]`);
    const obj = Object.values(classList)
    if (!enemySquare.classList.contains("boom") && currentPlayer === "user" && !isGameOver) {
      if(obj.includes("destroyer")) destroyerCount++;
      if(obj.includes("submarine")) submarineCount++;
      if(obj.includes("cruiser")) cruiserCount++;
      if(obj.includes("battleship")) battleshipCount++;
      if(obj.includes("carrier")) carrierCount++;
    }
    if(obj.includes("taken")){
      enemySquare.classList.add("boom")
    } else {
      enemySquare.classList.add("miss")
    }
    checkForWins();
    currentPlayer = "enemy";
    if(gamMode === "singlePlayer") playGameSingle();
  }

  let cpuDestroyerCount = 0;
  let cpuSubmarineCount = 0;
  let cpuCruiserCount = 0;
  let cpuBattleshipCount = 0;
  let cpuCarrierCount = 0;

  function enemyGo(square) {
    if (gameMode === "singlePlayer") square = Math.floor(Math.random() * userSquares.length);
    if (!userSquares[square].classList.contains("boom")) {
      const hit = userSquares[square].classList.contains("taken");
      userSquares[square].classList.add(hit ? "boom" : "miss")
      if(userSquares[square].classList.contains("destroyer"))cpuDestroyerCount++;
      if(userSquares[square].classList.contains("submarine"))cpuSubmarineCount++;
      if(userSquares[square].classList.contains("cruiser"))cpuCruiserCount++;
      if(userSquares[square].classList.contains("battleship"))cpuBattleshipCount++;
      if(userSquares[square].classList.contains("carrier"))cpuCarrierCount++;
      checkForWins()
    } else if (gameMode === "singlePlayer") enemyGo();
    currentPlayer= "user";
    turnDisplay.innerHTML = "Your Turn"
  }

  function checkForWins() {
    let enemy = "computer";
    if(gamMode === "multiPlayer") enemy = "enemy";
    if(destroyerCount === 2) {
      infoDisplay.innerHTML = `you sunk ${enemy}'s destroyer`;
      destroyerCount = 10;
    }
    if(submarineCount === 3) {
      infoDisplay.innerHTML = `you sunk ${enemy}'s submarine`;
      submarineCount = 10;
    }
    if(cruiserCount === 3) {
      infoDisplay.innerHTML = `you sunk ${enemy}'s cruiser`;
      cruiserCount = 10;
    }
    if(battleshipCount === 4) {
      infoDisplay.innerHTML = `you sunk ${enemy}'s battleship`;
      battleshipCount = 10;
    }
    if(carrierCount === 5) {
      infoDisplay.innerHTML = `you sunk ${enemy}'s carrier`;
      carrierCount = 10;
    }
    if(cpuDestroyerCount === 2) {
      infoDisplay.innerHTML = `${enemy} sank your destroyer`
      cpuDestroyerCount = 10;
    }
    if(cpuSubmarineCount === 3) {
      infoDisplay.innerHTML = `${enemy} sank your submarine`
      cpuSubmarineCount = 10;
    }
    if(cpuCruiserCount === 3) {
      infoDisplay.innerHTML = `${enemy} sank your submarine`
      cpuSubmarineCount = 10;
    }
    if(cpuBattleshipCount === 4) {
      infoDisplay.innerHTML = `${enemy} sank your battleship`
      cpuBattleshipCount = 10;
    }
    if(cpuCarrierCount === 5) {
      infoDisplay.innerHTML = `${enemy} sank your carrier`
      cpuCarrierCount = 10;
    }
    if(destroyerCount +submarineCount + cruiserCount + battleshipCount + carrierCount === 50){
      infoDisplay.innerHTML = "You WIN";
      gameOver();
    }
    if(cpuDestroyerCount +cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount === 50){
      infoDisplay.innerHTML = `${enemy.toUpperCase()} WIN`;
      gameOver();
    }
  }
  function gameOver() {
    isGameOver = true;
    startButton.removeEventListener('click', playGameSingle)
  }
  //draw the boats from cpus in places random
  function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * cpuSquares.length -
          ship.directions[0].length * direction,
      ),
    );
    const isTaken = current.some((i) =>
      cpuSquares[randomStart + i].classList.contains("taken"),
    );
    const isAtRightEdge = current.some(
      (i) => (randomStart + i) % width === width - 1,
    );
    const isAtLeftEdge = current.some((i) => (randomStart + i) % width === 0);

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((i) =>
        cpuSquares[randomStart + i].classList.add("taken", ship.name),
      );
    else generate(ship);
  }
  //rotate the boats
  function rotate() {
    if (isHorizontal) {
      destroyer.classList.toggle("destroyer-container-vertical");
      submarine.classList.toggle("submarine-container-vertical");
      cruiser.classList.toggle("cruiser-container-vertical");
      battleship.classList.toggle("battleship-container-vertical");
      carrier.classList.toggle("carrier-container-vertical");
      isHorizontal = false;

      return;
    }
  }
  rotateButton.addEventListener("click", rotate);

  //moves on boat's player
  ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
  userSquares.forEach((square) =>
    square.addEventListener("dragstart", dragStart),
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragover", dragOver),
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragenter", dragEnter),
  );
  userSquares.forEach((square) =>
    square.addEventListener("dragleave", dragLeave),
  );
  userSquares.forEach((square) => square.addEventListener("drop", dragDrop));
  userSquares.forEach((square) => square.addEventListener("dragend", dragEnd));

  let selectShipNameWithIndex;
  let draggedShip;
  let draggedShipLength;

  ships.forEach((ship) =>
    ship.addEventListener("mousedown", (e) => {
      selectShipNameWithIndex = e.target.id;
      //console.log(selectShipNameWithIndex);
    }),
  );

  function dragStart() {
    draggedShip = this;
    draggedShipLength = this.childNodes.length;
  }

  function dragOver(e) {
    e.preventDefault();
  }
  function dragEnter(e) {
    e.preventDefault();
  }
  function dragLeave(e) {}
  function dragDrop() {
    let shipNameWithLastId = draggedShip.lastChild.id;
    let shipClass = shipNameWithLastId.slice(0, -2);

    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
    let shipLastId = lastShipIndex + parseInt(this.dataset.id);
    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81,
      91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83,
      93];
    const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82,
      81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64,
      63, 62, 61, 60];
    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 *lastShipIndex)
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 *lastShipIndex)
    selectedShipIndex = parseInt(selectShipNameWithIndex.substr(-1));

    shipLastId = shipLastId - selectedShipIndex;

    if(isHorizontal && !newNotAllowedHorizontal.includes(shipLastId)){
      for (let i = 0; i < draggedShipLength; i++) {
        let directionClass;
        if(i === 0) directionClass = 'start';
        if(i === draggedShipLength - 1) directionClass = 'end';
        userSquares[parseInt(this.dataset.id)- selectedShipIndex + i].classList.add("taken", "horizontal", directionClass, shipClass)
      } 
      // always that index of draging ship's not includes in matrix newNotAllowedVertical. 
      //this mean that sometimes if drag the boat on your index - 1, or index - 2 and that succesly, the bpat go back to displayGrid
    }else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastId)){
      for (let i = 0; i < draggedShipLength; i++) {
        let directionClass;
        if(i === 0) directionClass = 'start';
        if(i === draggedShipLength - 1) directionClass = 'end';
        userSquares[parseInt(this.dataset.id)- selectedShipIndex + width * i].classList.add("taken", "vertical", directionClass, shipClass)
        
      }
    } else return;

    //validate to all ship placed to can shot
    displayGrid.removeChild(draggedShip);
    if(!displayGrid.querySelector(".ship")) allShipsPlaced = true;
  }

  function dragEnd() {
    //console.log('dragend');
  }

  function playGameMulti(socket) {
    setupButtons.style.display = "none";
    if(isGameOver) return;
    if(!ready){
      socket.emit("player-ready")
      ready = true;
      playerReady(playerNum)
    }

    if(enemyReady){
      if(currentPlayer === 'user') {
        turnDisplay.innerHTML = "Your Turn"
      }
      if (currentPlayer === 'enemy') {
        turnDisplay.innerHTML = "Enemy's Turn"
      }
    }
  }
  //Multiplayer
  function startMultiplayer() {
    const socket = io();
    //get numbers of players from server
    socket.on("player-number", (num) => {
      if (num === -1) {
        infoDisplay.innerHTML = "Server full";
      } else {
        playerNum = parseInt(num);
        if (playerNum === 1) currentPlayer = "enemy";
        console.log(playerNum);

        //check status of anothers players
        socket.emit("check-players");
      }
    });

    //if the other players has connected or not
    socket.on("player-connection", (num) => {
      console.log(`Player ${num} has been disconnected`);
      playerConnectedOrNot(num);
    });

    //when enemy is ready
    socket.on("enemy-ready", (num) => {
      enemyReady = true;
      playerReady(num);
      if (ready) {
        playGameMulti(socket);
        setupButtons.style.display = "none";
      }
    });

    //check player's status
    socket.on("check-players", (players) => {
      players.forEach((p, i) => {
        if (p.connected) playerConnectedOrNot(i);
        if (p.ready) {
          playerReady(i);
          if (i !== playerReady) enemyReady === true;
        }
      });
    });

    //when timed out
    socket.on("timeout", () => {
      infoDisplay.innerHTML = "Still there? Timed Out ";
    });

    //click to button ready
    startButton.addEventListener("click", () => {
      if (allShipsPlaced) {
        console.log("start game");
        playGameMulti(socket);
      } else {
        infoDisplay.innerHTML = "Please placed ALL ships before start game";
      }
    });

    //config listeners to shot
    cpuSquares.forEach((square) => {
      square.addEventListener("click", () => {
        if (currentPlayer === "user" && ready && enemyReady) {
          shotFired = square.dataset.id;
          socket.emit("fired", shotFired);
        }
      });
    });

    //when shot on you
    socket.on("fire", (id) => {
      enemyGo(id);
      const square = userSquares[id];
      socket.emit("fire-reply", square.classList);
      playGameMulti(socket);
    });

    socket.on("fire-reply", (classList) => {
      revealSquare(classList);
      playGameMulti(socket);
    });
    function playerConnectedOrNot(num) {
      let player = `.p${parseInt(num) + 1}`;
      document.querySelector(`${player} .connected`).classList.toggle("active");
      if (parseInt(num) === player)
        document.querySelector(player).style.fonWeight = "bold";
    }
  }
  //Mode to single player
  function startSinglePlayer(params) {
    generate(shipsArray[0]);
    generate(shipsArray[1]);
    generate(shipsArray[2]);
    generate(shipsArray[3]);
    generate(shipsArray[4]);

    startButton.addEventListener("click", () => {
      setupButtons.style.display = "none";
      playGameSingle();
    });
  }

  function playerReady(num) {
    let player = `.p${parseInt(num) + 1}`;
    document.querySelector(`${player} .ready`).classList.toggle("active");
  }
});
