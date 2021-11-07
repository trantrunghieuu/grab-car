import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
class Setting extends React.Component {
    
    navigateDetails(navigation)  {
        navigation.navigate('Setting');
   };
   constructor(props) {
    super(props);
    // console.log(this.props);
    // this.state = { hover: false };
}
    render(){
        const {navigation} = this.props
return (
      <View style={styles.container}>
          <Text>Setting</Text>
      </View>
  );

        }
        
}
export default function (props) {
    const navigation = useNavigation();
    return <Setting {...props} navigation={navigation} />;
}
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
