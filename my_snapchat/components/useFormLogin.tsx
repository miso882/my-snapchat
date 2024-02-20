import React from 'react';
import {Text, View, TextInput, Button, StyleSheet, Alert, Image,  TouchableOpacity} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const LoginForm = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async d => {
    try {
      const {data} = await axios.put(
        'https://za3n0ne7q4.execute-api.eu-west-3.amazonaws.com/prod/user',
        d,
        {
          headers: {
            Authorization: ` ${d.token}`,
          },
        },
      );
      storeData(data.data.token);
      navigation.navigate('Camera');
    } catch (error) {
      Alert.alert('somthing went wrong', 'wrong password or email');
    }
  };

  return (
    <View style={styles.container}>
       <Image source={require('../assets/snapchat.png')} style={{top: '-2%'}} />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder='Email'
          />
        )}
        name="email"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            secureTextEntry={true}
            placeholder='Password'
          />
        )}
        name="password"
        rules={{required: true}}
      />
          <Button title="Login" color='#4aa77c' onPress={handleSubmit(onSubmit)} />
        

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff75e',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1
    
  },
  input: {
    padding: 10,
    backgroundColor: '#ff9951',
    width: 230,
    height: 40,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  button: {
    height: 40,
    width: 130,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  Button:{
    backgroundColor: '#FFFFFF',
  }
});
