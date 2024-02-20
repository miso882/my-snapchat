import * as React from 'react';
import {
  Button,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

export const NavBar = ({navigation}) => {
  return (
    <View style={styles.nav}>
       <TouchableHighlight
        style={styles.btn}>
        <Button
          color="#69a197"
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.btn}>
        <Button
        color='#4aa77c'
          title="Signup"
          onPress={() => navigation.navigate('Register')}
        />
      </TouchableHighlight>
    </View>
  );
};
const styles = StyleSheet.create({
  nav: {
    zIndex: 1,
    backgroundColor: '#fff75e',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  btn:{
    height: 50,
    width: 180,
    borderRadius: 40,
    marginTop: '5%'
  }
});
