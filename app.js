let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let highest_Score = 0;

let h2 = document.querySelector("h2");
let instructions = document.querySelector(".instructions");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    // Hide instructions once game starts
    if (instructions) {
        instructions.style.display = "none";
    }
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 300);
}

function levelUp() {
  userSeq = [];
  level++;
  highest_Score++;
  h2.innerHTML = `Level ${level} & <b>Highest : ${highest_Score - 1}</b>`;

  let randInx = Math.floor(Math.random() * 4);
  let randColor = btns[randInx];
  let randbtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `❌ Game Over! Your score was <b>${level - 1}</b><br> Press any key to restart.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
