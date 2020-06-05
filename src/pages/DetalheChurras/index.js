import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';

import logoImg from '../../assets/logo.jpg';

import style from './styles';

export default function DetalheChurras () {
  const route = useRoute();

  const churras = route.params.churras;

  return(
    <View style={style.container}>
      <Text style={style.churrasTitle}>Organizador: <Text style={style.churrasData}>{churras.nome}</Text></Text>
      <Text style={style.churrasSubTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
      <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
      <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
      <Text style={style.churrasData}>Número de convidados: {churras.convidados} </Text>
      <Text style={style.churrasData}>Local: {churras.local}</Text>
    </View>
  )
}