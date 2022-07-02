const displayMediaOptions = {
  video: { cursor: "always" },
  audio: false
};

// RATE OF CHANGE
const EFFECT_DELAY = 10;

// SIZE
const INITIAL_VIDEO_SIZE = 100;
const MAX_VIDEO_SIZE = 1000;
const MIN_VIDEO_SIZE = 100;
const VIDEO_SIZE_INCREMENT = 0;

// ROTATION
const INITIAL_ROTATION = 45;
const ROTATE_INCREMENT = 0;
const MAX_ROTATION = 360;
const MIN_ROTATION = -360;


let intervalRef;

let currSize = INITIAL_VIDEO_SIZE;
let currSizeIncrement = VIDEO_SIZE_INCREMENT;

let currRotation = INITIAL_ROTATION;
let currRotationIncrement = ROTATE_INCREMENT;



const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const buttons = document.getElementsByClassName("buttons").item(0);
const startElem = document.getElementById("start");


// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function(evt) {
  startCapture();
}, false);

document.addEventListener("keydown", function(evt) {
  if (evt.key === " ") {
    stopCapture();
  }
  if (evt.key === "Enter") {
    startCapture();
  }
}
, false);


async function startCapture() {
  buttons.classList.add("hide");
  videoElem.classList.remove("hide");
  document.body.classList.add("custom-cursor");
  
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    intervalRef = setInterval(intervalEffects, EFFECT_DELAY);
    // dumpOptionsInfo();
  } catch(err) {
    console.error("Error: " + err);
    buttons.classList.remove("hide");
    videoElem.classList.add("hide");
    document.body.classList.remove("custom-cursor");
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject?.getTracks();
  tracks.forEach(track => track?.stop());

  videoElem.srcObject = null;

  buttons.classList.remove("hide");
  videoElem.classList.add("hide");
  document.body.classList.remove("custom-cursor");
  
  clearInterval(intervalRef);
}

function resizeVideo() {
  currSize += currSizeIncrement;
  videoElem.style.height = `${currSize}%`;
  videoElem.style.width = `${currSize}%`;

  // Reverse the change direction when the max or min size is reached
  if (
    currSize >= MAX_VIDEO_SIZE ||
    currSize <= MIN_VIDEO_SIZE
  ) {
    currSizeIncrement = -currSizeIncrement;
  }
}

function rotateVideo() {
  currRotation += currRotationIncrement;
  videoElem.style.transform = `rotate(${currRotation}deg)`;

  // Reverse the rotation direction when the max or min size is reached
  // if (
  //   currRotation >= MAX_ROTATION ||
  //   currRotation <= MIN_ROTATION
  // ) {
  //   currRotationIncrement = -currRotationIncrement;
  // }
  // Reset the rotation when the max is reached
  if (Math.abs(currRotation) === 360) {
    currRotation = 0;
  }
}

function scrollToCenter() {
  const videoWidth = videoElem.scrollWidth;
  const windowWidth = window.innerWidth;
  const videoHeight = videoElem.scrollHeight;
  const windowHeight = window.innerHeight;

  const diffWidth = videoWidth - windowWidth;
  const diffHeight = videoHeight - windowHeight;

  const scrollX = diffWidth > 0 ? diffWidth / 2 : 0;
  const scrollY = diffHeight > 0 ? diffHeight / 2 : 0;

  window.scrollTo(scrollX, scrollY);
}

function intervalEffects() {
  resizeVideo();
  rotateVideo();
  scrollToCenter();
}

console.log("hello world");