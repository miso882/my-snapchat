import axios from 'axios';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import RNFS from 'react-native-fs';

export const ListUser = ({navigateur}) => {
  const [user, setUser] = useState([]);
  const [snapbase, Setsnapbase] = useState('');
  const styles = StyleSheet.create({
    border: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 20,
      borderColor: 'black',
      borderWidth: 1,
      padding: 20,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 10,
      margin: 10,
    },
  });
  //to display all the friend list
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key');
        if (value !== null) {
          try {
            const response = await axios.get(
              'https://za3n0ne7q4.execute-api.eu-west-3.amazonaws.com/prod/user',
              {
                headers: {
                  Authorization: `token ${value}`,
                },
              },
            );
            setUser(response.data.data);
          } catch (error) {
            // console.log('erreur', error);
          }
        }
      } catch (e) {
        // console.log('Erreur', e);
      }
    };
    getsnapurl();
    getData();
  }, []);

  const getsnapurl = async () => {
    try {
      const snap_url = await AsyncStorage.getItem('url');
      RNFS.readFile(`'${snap_url}`, 'base64')
        .then(res => {
          Setsnapbase(res);
        })
        .catch(err => {
          // console.log(err);
        });
    } catch (e) {
      //  console.log(e);
    }
  };

  const send_snap_user = async id => {
    const data = {
      to: id,
      duration: 5,
      image: `data:image/png;base64,${snapbase}`,
    };
    try {
      const value = await AsyncStorage.getItem('@storage_Key');
      if (value !== null) {
        try {
          const response = await axios.post(
            'https://za3n0ne7q4.execute-api.eu-west-3.amazonaws.com/prod/snap',
            data,
            {
              headers: {
                Authorization: `token ${value}`,
              },
            },
          );
          navigateur.navigate('Camera');
        } catch (error) {
          console.log(data);
          //          console.log('erreur', error);
        }
      }
    } catch (e) {
      // console.log('Erreur', e);
    }
  };

  /************************************/
  return (
    <View>
      <ScrollView>
        {user.map(item => (
          <TouchableOpacity
            onPress={() => {
              send_snap_user(item._id);
            }}>
            <Text style={styles.border} key={item._id}>
              <Image style={styles.image} source={{uri: item.profilePicture}} />
              {item.username}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
