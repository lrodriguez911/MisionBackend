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
  const turnDisplay = document.querySelector("#turn");
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
  let shotsFired = -1;
  let currentPlayer = "user";
  let isHorizontal = true;

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

  if (gameMode === "singlePlayer") {
    startSinglePlayer();
  } else {
    startMultiplayer();
  }

  function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.dataset.id = i;
      grid.appendChild(square);
      square.push(square);
    }
  }

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
  function generate(ship) {
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    if (randomDirection === 0) direction = 1;
    if (randomDirection === 1) direction = 10;
    let randomStart = Math.abs(
      Math.floor(
        Math.random() * cpuSquares.length -
          ship.directions[0].length * directions,
      ),
    );
    const isTaken = current.some((i) =>
      cpuSquares[randomStart + i].classList.contains("taken"),
    );

    const isAtRightEdge = current.some(
      (i) => (randomStart + 1) % width === width - 1,
    );
    const isAtLeftEdge = current.some(
      (i) => (randomStart + 1) % width === width,
    );

    if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
      current.forEach((i) =>
        cpuSquares[randomStart + i].classList.add("taken", ship.name),
      );
    else generate(ship);
  }
  function startMultiplayer() {
    const socket = io();

    socket.on("player-number", (num) => {
      if (num === -1) {
        infoDisplay.innerHTML = "Server full";
      } else {
        playerNum = parseInt(num);
        if (playerNum === 1) currentPlayer = "enemy";
        console.log(playerNum);

        socket.emit("check-players");
      }
    });

    socket.on("player-connection", (num) => {
      console.log(`Player ${num} has been connected`);

      playerIsConnected(num);
    });

    socket.on("enemy-ready", (num) => {
      enemyReady = true;
      playerReady(num);
      if (ready) {
        //playGameMulti(socket);
        setupButtons.style.display = "none";
      }
    });

    socket.on("check-players", (players) => {
      players.forEach((p, i) => {
        if (p.connected) playerIsConnected(i);
        if (p.ready) {
          playerReady(i);
          if (i !== playerReady) enemyReady === true;
        }
      });
    });
    socket.on('timeout', () => {
      infoDisplay.innerHTML = "Timed Out "
    });

    startButton.addEventListener('click', ()=> {
      if(allShipsPlaced) {
        console.log("start game");
        //playGameMulti(socket)
      }else {
        infoDisplay.innerHTML = "Please placed ALL ships before start game"
      }
    });

    cpuSquares.forEach(square => {
      square.addEventListener('click',() => {
        if (currentPlayer === 'user' && ready && enemyReady) {
          shotsFired = square.dataset.id;
          socket.emit('fired', shotsFired)
        }
      });
    });
    socket.on('fire', id => {
      enemyGo(id);
      const square = userSquares[id];
      socket.emit('fire-reply', square.classList);
      //playGameMulti(socket)
    })

    socket.on('fire-reply', classList => {
      //funciotn to reveal the square
      //playGameMulti(socket)
    })
  }

  function playerReady(num) {
    let player = `.p${parseInt(num) + 1}`;
    document.querySelector(`${player} .ready`).classList.toggle("active");
  }

  function playerIsConnected(num) {
    let player = `.p${parseInt(num) + 1}`;
    document.querySelector(`${player} .connected`).classList.toggle("active");
    if (parseInt(num) === player)
      document.querySelector(player).style.fonWeight = "bold";
  }
});
