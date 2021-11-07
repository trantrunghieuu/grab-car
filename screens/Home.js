import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MapView, { Marker,Callout,Circle } from 'react-native-maps';
import { StyleSheet, Text, View,Button, SafeAreaView,Dimensions,Alert,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Constants } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
 class Home extends React.Component {
  constructor(props) {
    id=1;
    super(props);
}
   choice = () =>
    Alert.alert(
      "Lat : " +JSON.stringify(this.state.markers.coordinate.latitude),
      "Long : "+JSON.stringify(this.state.markers.coordinate.longitude),
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    setSatellite = () => {
      this.setState({ mapType: this.state.mapType === 'satellite' ? 'standard' : 'satellite' });
      this.setState({ name: this.state.name === 'Satellite' ? 'Standard' : 'Satellite' });
    }

    onMapPress(e) {
        this.setState({
           markers: 
           {
              coordinate: e.nativeEvent.coordinate,
              key: id++,
              color: 'red',
           },
           
        });
        console.log(JSON.stringify(this.state.markers.coordinate.latitude))
        console.log(JSON.stringify(this.state.markers.coordinate.longitude))

    }

    

     state = {
      mapRegion: null,
      hasLocationPermissions: false,
      locationResult: null,

      currentLocation: null,
      markers: {
        coordinate: {
          latitude:0,
          longitude:0

          },
        key: id,
        color: 'red',
      },
      mapType: 'standard',
      name: 'Standard'
      
     };

     componentDidMount() {
      this._getLocationAsync();
    }
  
    _handleMapRegionChange = mapRegion => {
      this.setState({ mapRegion });
    };
  
    _getLocationAsync = async () => {
     let { status } = await Permissions.askAsync(Permissions.LOCATION);
     if (status !== 'granted') {
       this.setState({
         locationResult: 'Permission to access location was denied',
       });
     } else {
       this.setState({ hasLocationPermissions: true });
     }
  
     let location = await Location.getCurrentPositionAsync({});
     this.setState({ locationResult: JSON.stringify(location) });
     
     // Center the map on the location we just fetched.
      this.setState({mapRegion: { latitude: location.coords.latitude, 
                                  longitude: location.coords.longitude, 
                                  latitudeDelta: 0.0222, 
                                  longitudeDelta: 0.0121 }});
      this.setState({currentLocation: { latitude: location.coords.latitude, 
                                        longitude: location.coords.longitude, 
                                        latitudeDelta: 0.0222, 
                                        longitudeDelta: 0.0121 }});
    };

    
//    constructor(props) {
//     super(props);
//     console.log(this.props);
//     this.state = { hover: false };
// }
    render(){
        const {navigation} = this.props
return (
    <SafeAreaView>
    <View style={styles.multiButtonContainer}>
    <Text style={styles.grab}>GRAB</Text>
    <Pressable style={styles.satellite} onPress={this.setSatellite}>
        <Text style={styles.text}> {this.state.name}</Text>
    </Pressable>
    </View>
    {/* <Text>{JSON.stringify(this.state.markers.coordinate.latitude)}</Text>
    <Text>{JSON.stringify(this.state.markers.coordinate.longitude)}</Text> */}


    {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView
              provider={this.props.provider}
              style={styles.map}
              //  initialRegion={this.state.region}
              initialRegion={this.state.mapRegion}
              onRegionChange={this._handleMapRegionChange}

              onPress={e => this.onMapPress(e)}
              showsUserLocation={true}
              mapType={this.state.mapType}>

<Marker
 key={this.state.markers.key}
 coordinate={this.state.markers.coordinate}
 pinColor={this.state.markers.color}
>
 
   {/* <View style={styles.marker}>
   <Text style={styles.text}> 
   {JSON.stringify(this.state.markers.coordinate.latitude)}</Text>
 </View> */}
</Marker>
</MapView>
        }
<Pressable style={styles.button} onPress={() => {
            this.props.navigation.navigate('Detail', {
              ori_latitude: this.state.currentLocation.latitude,
              ori_longitude:this.state.currentLocation.longitude,
              des_latitude: JSON.stringify(this.state.markers.coordinate.latitude),
              des_longitude:JSON.stringify(this.state.markers.coordinate.longitude)
            });
          }}>
<Text style={styles.text}> Chọn </Text>
</Pressable>
  </SafeAreaView>
  );

        }
        
}
export default function (props) {
    const navigation = useNavigation();
    return <Home {...props} navigation={navigation} />;
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width: Dimensions.get('window').width,
    height: 630,
    paddingTop:20,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    paddingTop:20,
    backgroundColor: '#e32f45',
},
grab: {
    fontSize:45,
    color:'#e32f45',
    paddingLeft:5,
    
},
button: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  elevation: 3,
  paddingTop:4,
  backgroundColor: '#e32f45',
  height:45
},
satellite:{
  paddingTop:5,
  marginTop:7,
  alignItems: 'center',
  justifyContent:'center',
  width:100,
  height:40,
  backgroundColor: '#e32f45',
},
text: {
  fontSize: 16,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
  borderRadius: 10,
  elevation: 3,
  
},
multiButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop:10,
  marginRight:10,
  marginLeft:5
}
});
