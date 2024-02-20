import React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import axios from 'axios';
export const UseForm = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      username: '',
      profilePicture: '',
      password: '',
    },
  });

  const onSubmit = data => {
    axios
      .post(
        'https://za3n0ne7q4.execute-api.eu-west-3.amazonaws.com/prod/user',
        data,
      )
      .then(res => {
        console.log(res.data);
        Alert.alert('Amazing', 'your account has been created');
        navigation.navigate('Camera');
      })
      .catch(err => console.warn(err));
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
            placeholder="Username"
          />
        )}
        name="username"
        rules={{required: true}}
      />
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="Email"
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
            placeholder="Password"
          />
        )}
        name="password"
        rules={{required: true}}
      />

      <View>
        <Button
          title="Signup"
          color="#4aa77c"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
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
});
