async function getLocationData(latitude, longitude) {
  const url = `https://api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
  const response = await fetch(url);
  return await response.json();
}

function getMaxSpeed(position) {
  let maxSpeed = 0;
  position.forEach((position) => {
    if (position.speed != null && position.speed > maxSpeed)
      maxSpeed = position.speed;
  });

  return (maxSpeed * 3.6).toFixed(0);
}

function getDistance(positions) {
  const earthRadiusKm = 6371;

  let totalDistance = 0;

  for (let i = 0; i < positions.length - 1; i++) {
    const p1 = {
      latitude: positions[i].latitude,
      longitude: positions[i].longitude,
    };
    const p2 = {
      latitude: positions[i + 1].latitude,
      longitude: positions[i + 1].longitude,
    };

    const deltaLatitude = toRad(p2.latitude - p1.latitude);
    const deltaLongitude = toRad(p2.longitude - p1.longitude);

    const a =
      Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
      Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2) *
        Math.cos(toRad(p1.latitude)) *
        Math.cos(toRad(p2.latitude));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    totalDistance += distance;
  }

  function toRad(degree) {
    return (degree * Math.PI) / 180;
  }

  return totalDistance.toFixed(2);
}

function getDuration(ride) {
  const timeSeg = Math.trunc((ride.stopTime - ride.startTime) / 1000);
  const timeMin = Math.floor(timeSeg / 60);
  const timeHours = Math.floor(timeMin / 60);

  if (timeMin > 60) {
    const timeMinRes = timeMin % 60;

    return `${String(timeHours).padStart(2, "0")}:${String(timeMinRes).padStart(
      2,
      "0"
    )}:${String(timeSeg).padStart(2, "0")}`;
  } else
    return `${String(timeHours).padStart(2, "0")}:${String(timeMin).padStart(
      2,
      "0"
    )}:${String(timeSeg).padStart(2, "0")}`;
}

function getStartDate(ride) {
  const d = new Date(ride.startTime);

  const day = d.toLocaleDateString("en-US", { day: "numeric" });
  const month = d.toLocaleDateString("en-US", { month: "numeric" });
  const year = d.toLocaleDateString("en-US", { year: "numeric" });
  const hour = d.toLocaleTimeString("pt-BR", { hour: "2-digit" });
  const minute = d.toLocaleTimeString("pt-BR", { minute: "2-digit" });

  return ` ${hour}:${minute} -  ${day}/${month}/${year}`;
}
