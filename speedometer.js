const speedElement = document.querySelector("#speed");
const distanceElement = document.querySelector("#distance");
const startBnt = document.querySelector("#start");
const stopBnt = document.querySelector("#stop");
let watchID = null;

let currentRide = null;

startBnt.addEventListener("click", () => {
  if (watchID) return;
  function handleSuccess(position) {
    addPosition(currentRide, position);
    speedElement.innerText = position.coords.speed
      ? (position.coords.speed * 3.6).toFixed(1)
      : 0;
  }
  function handleError(error) {
    console.log(error.msg);
  }
  const options = { enableHighAccuracy: true };
  currentRide = createNewRide();
  watchID = navigator.geolocation.watchPosition(
    handleSuccess,
    handleError,
    options
  );
  startBnt.classList.add("d-none");
  stopBnt.classList.remove("d-none");
});

stopBnt.addEventListener("click", () => {
  if (!watchID) return;
  navigator.geolocation.clearWatch(watchID);
  watchID = null;
  updateStopTime(currentRide);
  startBnt.classList.remove("d-none");
  stopBnt.classList.add("d-none");
  window.location.href = "index.html";
});
