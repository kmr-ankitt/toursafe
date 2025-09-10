import { Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { Circle, Heatmap, Marker } from 'react-native-maps'
import { mapStyle } from '../../../styles/mapStyle'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import colors from '../../../styles/colors';

export default function MapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  console.log(location)

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 37.78825,
          longitude: location ? location.coords.longitude : -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        zoomControlEnabled
        showsUserLocation
        showsCompass={true}
        zoomEnabled
        showsMyLocationButton={true}
      >
        {/* Area vulnerability Heatmap */}
        {location && (
          <Marker
            title="You"
            description={`Lat: ${location.coords.latitude}, Lng: ${location.coords.longitude}`}
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <FontAwesome6 name="person" size={32} color={colors["red-400"]} />
          </Marker>
        )}

        {/**todo: real lat, long**/}
        {location && (
          <Heatmap
            points={[
              { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude + 0.001, weight: 1 },
              { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude - 0.001, weight: 2 },
              { latitude: location.coords.latitude - 0.001, longitude: location.coords.longitude + 0.001, weight: 1 },
              { latitude: location.coords.latitude - 0.001, longitude: location.coords.longitude - 0.001, weight: 1 },
              { latitude: location.coords.latitude, longitude: location.coords.longitude, weight: 1 },
              { latitude: location.coords.latitude + 0.002, longitude: location.coords.longitude, weight: 4 },
              { latitude: location.coords.latitude, longitude: location.coords.longitude + 0.002, weight: 6 },
              { latitude: location.coords.latitude - 0.002, longitude: location.coords.longitude, weight: 2 },
              { latitude: location.coords.latitude, longitude: location.coords.longitude - 0.002, weight: 4 },
              { latitude: location.coords.latitude + 0.0015, longitude: location.coords.longitude - 0.0015, weight: 1 },
              { latitude: location.coords.latitude - 0.0015, longitude: location.coords.longitude + 0.0015, weight: 1 }
            ]}
            radius={50} 
            opacity={0.7}
            gradient={{
              colors: ['#00FF00', '#FFFF00', '#FFA500', '#FF0000', '#8B0000'],
              startPoints: [0.01, 0.25, 0.5, 0.75, 1],
              colorMapSize: 256,
            }}
          />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
  },
})