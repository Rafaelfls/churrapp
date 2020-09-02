import React from 'react';
import { View, Image, Text,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import style from './styles';

import logo from '../../assets/splash.png'

export default function Login() {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();

  global.USUARIOLOGADO = null;
  global.LISTADECONVIDADOS = null;
  global.CONVITE = null;
  
  function navigateToCadastro() {
    navigation.replace('CadastroUsuario');
  }

  function navigateToCelular(){
    navigation.push('LoginCelular');
  }

  return (
    <View style={style.container}>
      <Text style={style.appName}>Churrapp</Text>
      <View style={style.imageContainer}>
        <Image style={style.logo} source={logo} />
      </View>
      <Text style={style.title}>Bora fazer um churras?</Text>
      <Text style={style.subtitle}>Como você prefere se conectar?</Text>
      <View style={style.allBtn}>
        <View style={style.loginBtn}>          
          <TouchableOpacity style={style.entrarBtn} onPress={navigateToCelular}>
            <Text style={style.textBtn}>Entrar</Text>
          </TouchableOpacity>          
          <TouchableOpacity style={style.entrarBtn} onPress={navigateToCadastro}>
            <Text style={style.textBtn}>Primeiro acesso</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}