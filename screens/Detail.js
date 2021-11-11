import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView,Dimensions, StyleSheet, Text, View,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker,Callout,Circle } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from "expo-location";
export class Detail extends React.Component {
    
    navigateDetails(navigation)  {
        navigation.navigate('Setting');
   };
   constructor(props) {
     id=0;
    super(props);
}

    render(){
      const { navigation } = this.props;
      const { route } = this.props;
      const coordinates = [
        { latitude: Number(route.params.ori_latitude) , longitude: Number(route.params.ori_longitude) },
        { latitude: Number(route.params.des_latitude), longitude: Number(route.params.des_longitude)}
      ];
return (
  <SafeAreaView>
    <View style={styles.container}>
      <MapView style={styles.map_detail}
      initialRegion={{
        latitude: Number(route.params.ori_latitude),
        longitude: Number(route.params.ori_longitude),
        latitudeDelta: 0.0222, 
        longitudeDelta: 0.0121
      }}>
        <MapView.Polyline
          coordinates={coordinates}
          strokeColor="#000"
          fillColor="rgba(255,255,0,0.5)"
          showsUserLocation={true}
          strokeWidth={1}/>
        </MapView>
        <Marker>
        coordinate={{latitude: Number(route.params.des_latitude),
                    longitude: Number(route.params.des_longitude),}}
        pinColor='red'
        </Marker>
    </View>
  </SafeAreaView>
  
  );

        }
        
}
export default function (props) {
    const navigation = useNavigation(); 
    const route = useRoute();
    return <Detail {...props} navigation={navigation} route={route}/>;
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map_detail: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
