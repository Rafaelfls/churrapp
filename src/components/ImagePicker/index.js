import React, { useState, useEffect } from 'react';
import { Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


import style from './styles';


export default function ImagePickerExample()   {
  const [image, setImage] = useState(null);

  async function checkMultiPermissions() {
    const { status, expires, permissions } = await Permissions.askAsync(
      ImagePicker.CAMERA_ROLL,
    );
    if (status !== 'granted') { 
      alert('Hey! You have not enabled selected permissions');
    }else{
      pickImage()

    }
  }

  async function getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
     
      return ;
    } else {
      throw new Error('Location permission not granted');
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });    

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    
    <TouchableOpacity style={style.inputDisplay} onPress={checkMultiPermissions} >
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingVertical: 10 }} />}
    </TouchableOpacity>
  );
}