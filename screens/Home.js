import { StatusBar } from 'expo-status-bar';
import React from 'react';
import MapView, { Marker,Callout,Circle } from 'react-native-maps';
import { StyleSheet, Text, View,Button, SafeAreaView,Dimensions,Alert,Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
 class Home extends React.Component {
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
    
  constructor(props) {
    id=1
    super(props);

     this.state = {
      region: {
        latitude: 20.52805159271981,
        longitude:106.56061405107464,
       latitudeDelta: 0.02,
       longitudeDelta:0.01,
      },
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
    <MapView
   provider={this.props.provider}
   style={styles.map}
   initialRegion={this.state.region}
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
<Pressable style={styles.button} onPress={() => {
            this.props.navigation.navigate('Detail', {
              latitude: JSON.stringify(this.state.markers.coordinate.latitude),
              longitude:JSON.stringify(this.state.markers.coordinate.longitude)
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
  marginTop:10
}
});
