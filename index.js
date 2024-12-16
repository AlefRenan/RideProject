const rideListElement = document.querySelector("#rideList");
const allRides = getAllRides();

allRides.forEach(async ([id, value]) => {
  const ride = JSON.parse(value);

  ride.id = id;

  const itemElement = document.createElement("li");
  itemElement.id = ride.id;
  itemElement.className =
    "d-flex p-1 align-items-center justify-content-between shadow-sm gap-3";
  rideListElement.appendChild(itemElement);

  itemElement.addEventListener("click", () => {
    window.location.href = `./detail.html?id=${ride.id}`;
  });

  const firstPosition = ride.data[0];
  const firstLocationData = await getLocationData(
    firstPosition.latitude,
    firstPosition.longitude
  );
  const mapId = `map${ride.id}`;
  const mapElement = document.createElement("div");
  mapElement.id = mapId;
  mapElement.style = "width:100px;height:100px";
  mapElement.classList.add("bg-secondary");
  mapElement.classList.add("rounded-4");

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

  itemElement.appendChild(mapElement);
  itemElement.appendChild(dataElement);

  const map = L.map(`${mapId}`, {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
  });
  map.setView([firstPosition.latitude, firstPosition.longitude], 14);
  var OPNVKarte = L.tileLayer(
    "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png",
    {
      minZoom: 10,
      maxZoom: 15,
    }
  ).addTo(map);

  L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map);
});
