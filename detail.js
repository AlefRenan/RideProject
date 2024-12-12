const params = new URLSearchParams(window.location.search);
const rideId = params.get("id");
const ride = getRideRecord(rideId);

document.addEventListener("DOMContentLoaded", async () => {
  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );

  const dataElement = document.createElement("div");
  dataElement.className = "flex-fill d-flex flex-column";

  const cityDiv = document.createElement("div");
  cityDiv.innerText = `${firstLocationData.city} - ${firstLocationData.countryCode}`;
  cityDiv.className = "text-primary mb-2";

  const maxSpeedDiv = document.createElement("div");
  maxSpeedDiv.innerText = `Max Speed: ${getMaxSpeed(ride.data)} Km/h`;
  maxSpeedDiv.className = "h5";

  const distanceDiv = document.createElement("div");
  distanceDiv.innerText = `Distancia: ${getDistance(ride.data)} Km`;

  const durationdiv = document.createElement("div");
  durationdiv.innerText = `Duração: ${getDuration(ride)}`;

  const date = document.createElement("div");
  date.innerText = `${getStartDate(ride)}`;
  date.className = "text-secondary mt-2";

  dataElement.appendChild(cityDiv);
  dataElement.appendChild(maxSpeedDiv);
  dataElement.appendChild(distanceDiv);
  dataElement.appendChild(durationdiv);
  dataElement.appendChild(date);

  document.querySelector("#data").appendChild(dataElement);

  const map = L.map("mapDetail");
  map.setView([firstPosition.latitude, firstPosition.longitude], 14);
  var OPNVKarte = L.tileLayer(
    "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
    {
      minZoom: 10,
      maxZoom: 15,
    }
  ).addTo(map);

  const positionArray = ride.data.map((position) => {
    return position.latitude, position.longitude;
  });

  const polyline = L.polyline(positionArray, { color: "red" }).addTo(map);
});
