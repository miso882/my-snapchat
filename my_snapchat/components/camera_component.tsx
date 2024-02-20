import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import GestureRecognizer from 'react-native-swipe-gestures';
export const MyCamera = ({navigation}) => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const [snapdata, setSnapdata] = useState('');
  const [tokedsnap, setTokedsnap] = useState(false);

  const device = devices.back;

  const getData = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    console.log('got into');
    const newCameraPermission = await Camera.requestCameraPermission();
    const newMicrophonePermission = await Camera.requestMicrophonePermission();
  };
  if (device == null) return <ActivityIndicator />;

  const takesnap = async () => {
    if (camera != null) {
      const snap = await camera.current.takePhoto();
      setSnapdata(snap.path);
      setTokedsnap(true);
    }
  };

  const sendsnap = async () => {
    console.log(snapdata);
    navigation.navigate('List');
    await AsyncStorage.setItem('url', snapdata);
  };

  const selectFromGallery = async () => {
    const result = await launchImageLibrary();
    const url = result.assets[0].uri;
    setSnapdata(url);
    setTokedsnap(true);
  };

  const left = () => {
    console.log('left');
    navigation.navigate('Receive');
  };
  return (
    <View style={{flex: 1}}>
      <Button
        title="deconexion"
        onPress={() => {
          getData();
        }}
      />

      {/* <TouchableOpacity  onPress={() => {getData()}}>
        <Image source={require('../assets/logout.png')} style={styles.logout_btn} />
      </TouchableOpacity> */}

      {tokedsnap ? (
        //picture
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.shootsnap}
            onPress={() => {
              setTokedsnap(false);
            }}></TouchableOpacity>

          <TouchableOpacity
            style={styles.sendbtn}
            onPress={() => {
              sendsnap();
            }}>
            <Image source={require('../assets/sendinside.png')} style={{}} />
          </TouchableOpacity>
          {snapdata !== '' && (
            <Image
              style={StyleSheet.absoluteFill}
              source={{uri: `file://${snapdata}`}}
            />
          )}
        </View>
      ) : (
        //camera
        <GestureRecognizer
          onSwipeLeft={() => {
            left();
          }}
          // onSwipeRight={()=>{right()}}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          style={{flex: 1, height: '100%', width: '100%'}}>
          <Camera
            ref={camera}
            // video={true}
            // audio={true}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            preset="medium"
          />
          <TouchableOpacity
            style={styles.shootsnap}
            onPress={() => {
              takesnap();
            }}></TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              selectFromGallery();
            }}>
            <Image
              source={require('../assets/gallery.png')}
              style={styles.gallery_btn}
            />
          </TouchableOpacity>
        </GestureRecognizer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imagesnap: {
    height: '70%',
    width: '70%',
    left: '15%',
    bottom: '10%',
  },
  shootsnap: {
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    width: 100,
    height: 100,
    borderRadius: 50,
    top: '80%',
    left: '38%',
    zIndex: 1,
  },
  sendbtn: {
    marginLeft: '2%',
    zIndex: 1,
    left: '75%',
    top: '70%',
  },
  gallery_btn: {
    width: '20%',
    height: '30%',
    top: '-30%',
  },
  logout_btn: {
    width: '10%',
    height: '10%',
  },
});
