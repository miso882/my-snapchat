import * as React from 'react';
import {MyCamera} from '../components/camera_component';
export const CameraScreen = ({navigation}) => {
    return (
     <MyCamera navigation={navigation}/>
    );
  };