import { Dimensions, StyleSheet, View } from 'react-native'
import MapView, { Circle, Heatmap } from 'react-native-maps'
import { mapStyle } from '../../../styles/mapStyle'

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.000001, // Smaller value for closer zoom
          longitudeDelta: 0.0000001, // Smaller value for closer zoom

        }}
        showsUserLocation
        showsCompass={true}
        zoomEnabled
        showsMyLocationButton={true}
        showsIndoors={false}
        showsBuildings={false}
        showsTraffic={false}

      >
        {/* Area vulnerability Heatmap */}
        {/*Todo: put real data*/}
        <Heatmap
          points={
            [
              { latitude: 37.782, longitude: -122.447, weight: 1 },
              { latitude: 37.782, longitude: -122.445, weight: 2 },
              { latitude: 37.782, longitude: -122.443, weight: 1 },
              { latitude: 37.782, longitude: -122.441, weight: 1 },
              { latitude: 37.782, longitude: -122.439, weight: 6 },
              { latitude: 37.782, longitude: -122.437, weight: 4 },
              { latitude: 37.782, longitude: -122.435, weight: 1 },
              { latitude: 37.785, longitude: -122.447, weight: 2 },
              { latitude: 37.785, longitude: -122.445, weight: 4 },
              { latitude: 37.785, longitude: -122.443, weight: 1 },
              { latitude: 37.785, longitude: -122.441, weight: 1 }
            ]
          }
          radius={50}
          opacity={0.7}
          gradient={{
            colors: ['#00FF00', '#FFFF00', '#FFA500', '#FF0000', '#8B0000'],
            startPoints: [0.01, 0.25, 0.5, 0.75, 1],
            colorMapSize: 256,
          }}
        />
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