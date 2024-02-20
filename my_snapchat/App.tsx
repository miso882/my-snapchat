/**
 * @format
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Register} from './views/register';
import {Login} from './views/login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CameraScreen} from './views/camera';
import {ListUserView} from './views/listUserView';
import {Snap} from './views/snap';

const Stack = createNativeStackNavigator();

const App = () => {
  const [value, setValue] = React.useState(null);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('@storage_Key');
        setValue(token);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {value === null ? (
          <Stack.Screen
            name="Register"
            options={{header: () => <></>}}
            component={Register}
          />
        ) : (
          <Stack.Screen
            name="Camera2"
            options={{header: () => <></>}}
            component={CameraScreen}
          />
        )}
        {value === null ? (
          <Stack.Screen
            name="Login"
            options={{header: () => <></>}}
            component={Login}
          />
        ) : (
          <Stack.Screen
            name="Camera3"
            options={{header: () => <></>}}
            component={CameraScreen}
          />
        )}
        <Stack.Screen
          name="Camera"
          options={{header: () => <></>}}
          component={CameraScreen}
        />
        <Stack.Screen name="List" component={ListUserView} />
        <Stack.Screen name="Receive" component={Snap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
