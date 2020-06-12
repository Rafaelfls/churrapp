import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, ScrollView, Modal, TouchableHighlight, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';

import logoImg from '../../assets/logo.jpg';

import style from './styles';

export default function DetalheChurras () {
  const route = useRoute();

  const churras = route.params.churras;
  const [modalVisivel, setModalVisivel] = useState(false);
 
  return(
    <View style={style.container}>
      <View>
        <Text style={style.detalheTitle}>{churras.nomeChurras}</Text>
      </View>
      <ScrollView style={{marginBottom: 45}}>
      <Text style={style.detalheDescricao}>{churras.descricao}</Text>
      </ScrollView>
      <View style={style.detalheBtnView}>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <Icon size={30} name="angle-up"/>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisivel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
      <View style={style.detalheChurras}>
        <Text style={style.churrasTitle}>Organizador: <Text style={style.churrasData}>{churras.nome}</Text></Text>
        <Text style={style.churrasSubTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
        <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
        <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
        <Text style={style.churrasData}>Número de convidados: {churras.convidados} </Text>
        <Text style={style.churrasData}>Local: {churras.local}</Text>
      </View>
          <View>
            <TouchableHighlight
              onPress={() => {
                setModalVisivel(!modalVisivel);
              }}>
              <Text>Fechar</Text>
            </TouchableHighlight>
          </View>
      </Modal>
    </View>
  )
}