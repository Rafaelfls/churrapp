import React,{useEffect} from 'react';
import { View, Image, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Crypto from 'expo-crypto';
import api from '../../services/api';
import SplashScreen from 'react-native-splash-screen';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

import logo from '../../assets/splash.png'

export default function Login() {
  const navigation = useNavigation();
  const Tab = createBottomTabNavigator();
  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);

  global.LISTADECONVIDADOS = null;
  global.CONVITE = null;

  function navigateToCadastro() {
    navigation.replace('CadastroUsuario');
  }

  function navigateToCelular() {
    navigation.push('LoginCelular');
  }

  useEffect(() => {
    SplashScreen.hide();
    getUsuarioLogado();
  }, []);

  async function getUsuarioLogado() {
    var celular = await AsyncStorage.getItem('phone')
    var senha = await AsyncStorage.getItem('password')
    if (celular && senha) {
      setLoading(true)
      let criptoSenhaVar = await criptoSenha(senha)
      global.USUARIOLOGADO = null;
      try {
        await api.get(`/usuariosCel/${celular}/${criptoSenhaVar}`)
          .then(async function (response) {
            if (response.data[0] == undefined) {
              setLoading(false)
              return setVisivel(true)
            } else {
              USUARIOLOGADO = response.data[0]
              setLoading(false)
              navigation.replace('Tabs');
            }
          })
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  }

  async function criptoSenha(senha) {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      senha
    );
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
      {criarModal}
    </View>
  );
}