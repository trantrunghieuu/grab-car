import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
export class Detail extends React.Component {
    
    navigateDetails(navigation)  {
        navigation.navigate('Setting');
   };
   constructor(props) {
    super(props);
}
    render(){
      const { navigation } = this.props;
      const { route } = this.props;
return (
      <View style={styles.container}>
          <Text>Detail</Text>
          <Text>ori_latitude:{route.params.ori_latitude}</Text>
          <Text>ori_longitude:{route.params.ori_longitude}</Text>
          <Text>des_latitude:{route.params.des_latitude}</Text>
          <Text>des_longitude:{route.params.des_longitude}</Text>
          <Button onPress={()=>this.props.navigation.navigate('Setting')} title="Go to Setting"/>
      </View>
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
});
