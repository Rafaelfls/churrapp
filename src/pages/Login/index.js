import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, Alert, TouchableOpacity, FlatList, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import api from '../../services/api';

import style from './styles';

import logo from '../../assets/splash.png'

export default function Calculadora() {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState()
  global.USUARIOLOGADO = null;

  function navigateToResumo() {
    USUARIOLOGADO = usuarioSelecionado
    navigation.replace('Tabs');
  }
  async function carregarUsuarios() {
    const response = await api.get(`/usuarios`);

    setUsuarios([...usuarios, ...response.data]);
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  

  return (
    <View style={style.container}>
      <Text style={style.appName}>Churrapp</Text>
      <View style={style.imageContainer}>
        <Image style={style.logo} source={logo} />
      </View>
      <Text style={style.title}>Bora armar um churras?</Text>
      <Text style={style.subtitle}>Como você prefere se conectar?</Text>
      <View style={style.allBtn}>
        <View style={style.loginBtn}>
          <Picker
            mode="dropdown"
            selectedValue={usuarioSelecionado}
            onValueChange={usuarioSelecionado => setUsuarioSelecionado(usuarioSelecionado)}
          >
            {usuarios.map(users => (
              <Picker.Item label={users.nome} value={users} />
            ))}

          </Picker>
          <TouchableOpacity style={style.fbBtn} onPress={navigateToResumo}>
            <Icon name="facebook" size={35} />
            <Text style={style.textBtn}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.googleBtn} onPress={navigateToResumo}>
            <Icon name="google" size={35} />
            <Text style={style.textBtnGoogle}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.celularBtn} onPress={navigateToResumo}>
            <Icon name="phone" size={35} />
            <Text style={style.textBtn}>Celular</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}