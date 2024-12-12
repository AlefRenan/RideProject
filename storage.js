function createNewRide() {
  const rideId = Date.now();
  const rideRecord = {
    data: [],
    startTime: rideId,
    stopTime: null,
  };
  saveRideRecord(rideId, rideRecord);
  return rideId;
}

function getAllRides() {
  return Object.entries(localStorage);
}

function getRideRecord(rideId) {
  return JSON.parse(localStorage.getItem(rideId));
}

function saveRideRecord(rideId, rideRecord) {
  localStorage.setItem(rideId, JSON.stringify(rideRecord));
}

function addPosition(rideId, position) {
  const rideRecord = getRideRecord(rideId);
  const newData = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    altitude: position.coords.altitude,
    accuracy: position.coords.accuracy,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    timestamp: position.timestamp,
    heading: position.coords.heading,
    speed: position.coords.speed,
  };
  rideRecord.data.push(newData);

  localStorage.setItem(rideId, JSON.stringify(rideRecord));
}

function updateStopTime(rideId) {
  const rideRecord = getRideRecord(rideId);
  rideRecord.stopTime = Date.now();
  saveRideRecord(rideId, rideRecord);
}
