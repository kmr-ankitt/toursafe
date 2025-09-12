import type { LocationObject } from 'expo-location';

export default function coords(location: LocationObject) {
  const points = [];
  const baseLat = location.coords.latitude;
  const baseLng = location.coords.longitude;

  const deltas = [
    0, 0.001, -0.001, 0.002, -0.002, 0.0015, -0.0015, 0.003, -0.003, 0.0025, -0.0025, 0.004, -0.004,
    0.005, -0.005, 0.006, -0.006, 0.007, -0.007, 0.008, -0.008, 0.009, -0.009, 0.01, -0.01
  ];

  for (let i = 0; i < deltas.length; i++) {
    for (let j = 0; j < deltas.length; j++) {
      if (i === 0 && j === 0) continue;
      const isCenter = i === Math.floor(deltas.length / 2) && j === Math.floor(deltas.length / 2);
      points.push({
        latitude: baseLat + deltas[i],
        longitude: baseLng + deltas[j],
        weight: isCenter ? 1 : (Math.random() < 0.85 ? 1 : Math.floor(Math.random() * 5) + 2) // center most is 1
      });
    }
  }

  points.push({
    latitude: baseLat,
    longitude: baseLng,
    weight: 1 // safe zone at current location
  });

  return points;
}