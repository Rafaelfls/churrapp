import React, { useEffect, useState } from 'react';
import {View, Image, Text, Button, Alert, TouchableOpacity, FlatList, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dropdown } from 'react-native-material-dropdown';
import api from '../../services/api';



import style from './styles';

import logo from '../../assets/logo.jpg'

export default function Calculadora(){
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const login = "dcca00a6fb1c45a8";
  const [usuarios, setUsuarios] = useState([]);

  function navigateToResumo() {
    navigation.replace('Tabs', {
      screen: 'Meu Churras', 
      params: {login}});
  }
  function navegarParaResumo() {
    navigation.replace('Tabs', {
      screen: 'Meu Churras',
      params: {login}});
  }
  async function carregarUsuarios() {
    const response = await api.get(`/usuarios`);

    setUsuarios([...usuarios, ...response.data]);
  }
  
  useEffect(() => {
    carregarUsuarios();
    }, []);

    listadeUsuario = usuarios.map(users => (
      <Picker.Item label={users.nome} value={users.id} />
    ));
  
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
        <Picker
            selectedValue={usuarios}
            mode="dropdown"
        >
          {listadeUsuario}
            
        </Picker>
            <TouchableOpacity style = {style.fbBtn} onPress={navigateToResumo}>
              <Icon             name  = "facebook" size = {35}/>
              <Text style={style.textBtn}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {style.googleBtn} onPress={() => navegarParaResumo(login)}>
              <Icon             name  = "google" size = {35}/>
              <Text style={style.textBtnGoogle}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {style.celularBtn}>
              <Icon             name  = "phone" size = {35}/>
              <Text style={style.textBtn}>Celular</Text>
            </TouchableOpacity>
            
        </View>
    </View>
  </View>
  );
}