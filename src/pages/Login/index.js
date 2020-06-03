import React from 'react';
import {View, Image, Text, Button, Alert, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import style from './styles';

import logo from '../../assets/logo.jpg'

export default function Calculadora(){
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  function navigateToResumo() {
    navigation.replace('Tabs');
  }

  return(
  <View  style = {style.container}>
    <Text  style = {style.appName}>Churrapp</Text>
    <View  style = {style.imageContainer}>
      <Image style = {style.logo} source = {logo}/>
    </View>
    <Text   style = {style.title}>Bora armar um churras?</Text>
    <Text   style = {style.subtitle}>Como você prefere se conectar?</Text>
    <View   style = {style.allBtn}>
        <View style = {style.loginBtn}>
        
            <TouchableOpacity style = {{padding: 6, backgroundColor: '#0068d6', borderRadius: 10, marginBottom: 10, flexDirection: 'row'}} onPress={navigateToResumo}>
              <Icon             name  = "facebook" size = {35}/>
              <Text style={style.textBtn}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{padding: 6, backgroundColor: '#ffe366', borderRadius: 10, marginBottom: 10, flexDirection: 'row'}}>
              <Icon             name  = "google" size = {35}/>
              <Text style={style.textBtn}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {{padding: 6, backgroundColor: '#a3a29b', borderRadius: 10, flexDirection: 'row'}}>
              <Icon             name  = "phone" size = {35}/>
              <Text style={style.textBtn}>Celular</Text>
            </TouchableOpacity>
            
        </View>
    </View>
  </View>
  );
}