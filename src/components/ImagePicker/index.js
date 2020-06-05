import React, { useState, useEffect } from 'react';
import { Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


import style from './styles';


export default function ImagePickerExample()   {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    
    <TouchableOpacity style={style.inputDisplay} onPress={pickImage} >
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingVertical: 10 }} />}
    </TouchableOpacity>
  );
}