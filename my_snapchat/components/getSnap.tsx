import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
    width: 100,
    height: 100,
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
});

export const GetSnap = () => {
  const [snap, setSnap] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [snapId, setSnapId] = useState('');

  useEffect(() => {
    const getSnapData = async () => {
      try {
        const token = await AsyncStorage.getItem('@storage_Key');
        const response = await axios.get(
          'https://za3n0ne7q4.execute-api.eu-west-3.amazonaws.com/prod/snap',
          {
            headers: {
              Authorization: `token ${token}`,
            },
          },
        );
        setSnap(response.data.data);
      } catch (error) {
        console.error('Error retrieving snap data:', error);
      }
    };

    getSnapData();
  }, []);

  const openImageModal = imageUri => {
    setCurrentImage(imageUri);
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);

      const updateSeenStatus = async () => {
        try {
          const token = await AsyncStorage.getItem('@storage_Key');
          console.log(snapId);
          await axios.put(
            `https://za3n0ne7q4.execute-api.eu-west-3.amazonaws.com/prod/snap/seen/${snapId}`,
            {},
            {
              headers: {
                Authorization: `token ${token}`,
              },
            },
          );
        } catch (error) {
          console.error('fais un deuxieme essai');
        }
      };

      updateSeenStatus();
    }, 5000);
  };

  return (
    <View>
      <ScrollView>
        <Text style={styles.border}>Snap Receive</Text>
        {snap.map(item => (
          <TouchableOpacity
            style={styles.border}
            key={item._id}
            onPress={() => {
              setSnapId(item._id);
              openImageModal(item.image);
            }}>
            <Text style={styles.border}>Username: {item.from.username}</Text>
            <Image style={styles.image} source={{uri: item.image}} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Image style={styles.modalImage} source={{uri: currentImage}} />
        </View>
      </Modal>
    </View>
  );
};
