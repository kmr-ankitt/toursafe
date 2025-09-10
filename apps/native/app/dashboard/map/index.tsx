import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native'
import MapView, { Heatmap, Marker } from 'react-native-maps'
import { mapStyle } from '../../../styles/mapStyle'
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import colors from '../../../styles/colors';
import coords from '../../../constants/coords';

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

  // Check if user is inside a danger zone
  useEffect(() => {
    if (location) {
      const points = coords(location);

      // weight 4 and above considered dangerous
      const dangerThreshold = 4;
      const dangerZone = points.find(p => {
        const distLat = Math.abs(p.latitude - location.coords.latitude);
        const distLng = Math.abs(p.longitude - location.coords.longitude);
        return distLat < 0.0005 && distLng < 0.0005 && p.weight >= dangerThreshold;
      });

      if (dangerZone) {
        Alert.alert("⚠️ Danger Zone", "You are currently in a danger zone. Stay safe!");
      }
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.coords.latitude : 20.2234975,
          longitude: location ? location.coords.longitude : 85.7373971,
          latitudeDelta: 0.0001,
          longitudeDelta: 0.0001,
        }}
        zoomControlEnabled
        showsUserLocation
        showsCompass={true}
        zoomEnabled
        mapPadding={{ top: 50, right: 5, bottom: 5, left: 5 }}
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
            <FontAwesome6 name="person" size={32} color={colors["blue-800"]} />
          </Marker>
        )}

        {/**todo: real lat, long**/}
        {location && (
          <Heatmap
            points={coords(location)}
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