import * as React from 'react';
import {View} from 'react-native';
import {NavBar} from '../components/navbar';
import {UseForm} from '../components/useForm';

export const Register = ({navigation}) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <UseForm navigation={navigation} />
    </View>
  );
};
