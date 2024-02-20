import * as React from 'react';
import {View} from 'react-native';
import {NavBar} from '../components/navbar';
import {LoginForm} from '../components/useFormLogin';
export const Login = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <NavBar navigation={navigation} />
      <LoginForm navigation={navigation} />
    </View>
  );
};
