// =============================
// GET ELEMENTS
// =============================
let content = document.querySelector(".content");
let track = document.getElementById("track");
let winnerText = document.getElementById("winner");

let raceMusic = document.getElementById("raceMusic");
let startSound = document.getElementById("startSound");
let winSound = document.getElementById("winSound");

let runners = [];
let raceInterval = null;

// =============================
// WORLD SETTINGS
// =============================
let worldLength = 6000;   // total race distance (px)
let cameraX = 0;

// =============================
// PRELOAD CHARACTER GIFS
// =============================
let characterImages = [];

for (let i = 0; i <= 26; i++) {
  let img = new Image();
  img.src = "media/" + i + ".gif";
  characterImages.push(img);
}

function shuffleArray(array) {
  let copy = array.slice();

  for (let i = copy.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
// =============================
// GENERATE RACERS
// =============================
document.getElementById("generateBtn").addEventListener("click", function () {

  track.innerHTML = "";
  runners = [];
  winnerText.textContent = "";

  let names = document.getElementById("namesInput").value
    .split("\n")
    .map(n => n.trim())
    .filter(n => n !== "");

  // create shuffled pool once
  let imagePool = shuffleArray(characterImages);

  for (let i = 0; i < names.length; i++) {

    let runnerDiv = document.createElement("div");
    runnerDiv.classList.add("runner");
    runnerDiv.playerName = names[i];

    // If pool empty, reshuffle
    if (imagePool.length === 0) {
      imagePool = shuffleArray(characterImages);
    }

    let img = imagePool.pop().cloneNode();
    img.classList.add("runner-img");
    runnerDiv.appendChild(img);

    // spacing logic stays same
    let maxVerticalSpace = 320;
    let laneSpacing = maxVerticalSpace / names.length;
    runnerDiv.style.bottom =
      (laneSpacing * i + 20) + "px";

    runnerDiv.position = 0;
    runnerDiv.speedFactor = 0.8 + Math.random() * 0.4;

    track.appendChild(runnerDiv);
    runners.push(runnerDiv);
  }
});

// =============================
// START RACE
// =============================
document.getElementById("startBtn").addEventListener("click", function () {

  if (runners.length === 0) {
    alert("Generate racers first!");
    return;
  }

  if (raceInterval) clearInterval(raceInterval);

  cameraX = 0;

  // reset runner positions
  for (let runner of runners) {
    runner.position = 0;
  }

  raceMusic.currentTime = 0;
  raceMusic.play();

  content.style.display = "none";
  winnerText.textContent = "READY...";

  setTimeout(() => {

    winnerText.textContent = "GO!";
    setTimeout(() => winnerText.textContent = "", 1500);

    startSound.play();let finishLine = worldLength;

raceInterval = setInterval(() => {

  // MOVE RUNNERS BY VELOCITY
  for (let runner of runners) {

    // small consistent speed difference
    let baseSpeed = 7; 

    runner.position += baseSpeed * runner.speedFactor;
  }

  // FIND LEADER
  let leader = runners.reduce((a, b) =>
    a.position > b.position ? a : b
  );

  // CAMERA FOLLOW
  cameraX = leader.position - window.innerWidth * 0.3;

  if (cameraX < 0) cameraX = 0;
  if (cameraX > worldLength - window.innerWidth)
    cameraX = worldLength - window.innerWidth;

  track.style.backgroundPosition =
    (-cameraX) + "px bottom";

  // POSITION RUNNERS
  for (let runner of runners) {
    runner.style.transform =
      "translateX(" + (runner.position - cameraX) + "px)";
  }

  // CHECK FOR WINNER
  if (leader.position >= finishLine) {

    clearInterval(raceInterval);

    raceMusic.pause(); // stop music immediately
    winSound.play();

    winnerText.textContent =
      leader.playerName + " wins!";

    // DO NOT move anyone else
    // Everyone freezes exactly where they are

  }

}, 50);

  }, 2000);


  // =============================
  // END EXACTLY WHEN MUSIC ENDS
  // =============================
  raceMusic.onended = function () {

    clearInterval(raceInterval);

    let leader = runners.reduce((a, b) =>
      a.position > b.position ? a : b
    );

    winSound.play();
    winnerText.textContent =
      leader.playerName + " wins!";
  };

});


/*testing racers
ThisIsPlayer1
ThisIsPlayer2
ThisIsPlayer3
ThisIsPlayer4
ThisIsPlayer5
ThisIsPlayer6
ThisIsPlayer7
ThisIsPlayer8
ThisIsPlayer9
ThisIsPlayer10
ThisIsPlayer11
ThisIsPlayer12
ThisIsPlayer13
ThisIsPlayer14
ThisIsPlayer15
ThisIsPlayer16
ThisIsPlayer17
ThisIsPlayer18
ThisIsPlayer19
ThisIsPlayer20
ThisIsPlayer1
ThisIsPlayer2
ThisIsPlayer3
ThisIsPlayer4
ThisIsPlayer5
ThisIsPlayer6
ThisIsPlayer7
ThisIsPlayer8
ThisIsPlayer9
ThisIsPlayer10
ThisIsPlayer11
ThisIsPlayer12
ThisIsPlayer13
ThisIsPlayer14
ThisIsPlayer15
ThisIsPlayer16
ThisIsPlayer17
ThisIsPlayer18
*/