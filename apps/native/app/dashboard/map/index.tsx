import { Dimensions, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps'

export default function MapScreen() {
  return (
    <View style={styles.container}>

      <MapView
        style={styles.map}

        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
        showsIndoors={false}
        showsBuildings={false}
        showsTraffic={false}
      />

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