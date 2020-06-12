import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, HorizontalScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import ActionButton from 'react-native-action-button';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import api from '../../services/api';

import logoImg from '../../assets/logo.jpg';
import backgroundImg from '../../assets/fundoDescricao.jpg';
import profileImg from '../../assets/Perfil.jpg';

import style from './styles';
import { Container } from 'native-base';

export default function DetalheChurras() {
  const route = useRoute();

  const churras = route.params.churras;
  const [modalVisivel, setModalVisivel] = useState(false);

 
  return(
    <View style={style.container}>
      <View style={style.containerImg}>
        <Image source={backgroundImg} style={style.backgroundImg} />
        <Container style={style.cabecalho}>
          <IconOct name="chevron-left" size={25} style={style.backBtn} />
          <Text style={style.detalheTitle}>{churras.nomeChurras}</Text>
          <IconEnt name="share" size={25} style={style.shareBtn} />
        </Container>
      </View>

      <View style={style.infosPrincipais}>
        <View style={style.churrasLocalContainer}>
          <IconFA name="map-o" size={20} style={style.localIcon} />
          <Text style={style.churrasLocal}>{churras.local}</Text>
        </View>
        <View style={style.churrasDataContainer}>
          <IconEnt name="calendar" size={22} style={style.dataIcon} />
          <Text style={style.churrasData}>{churras.data} - {churras.hrInicio}</Text>
        </View>
        <View style={style.churrasDonoContainer}>
          <IconOct name="person" size={28} style={style.donoIcon} />
          <Text style={style.churrasDono}>{churras.nome}</Text>
        </View>
      </View>

      <View style={style.linhaDeSeparacao}/>

      <View style={style.cabecalhoConvidados}>
        <View style={style.containerTituloConvidados}>
          <Text style={style.tituloConvidados}>Convidados</Text>
          <Text style={style.subtituloConvidados}>6 pessoas</Text>
        </View>
          <Text style={style.verTodos}>ver todos</Text>
      </View>

      <ScrollView horizontal={true} style={style.containerConvidados}>
        <View style={style.convidado}>
          <Image source={profileImg} style={style.profileImg}/>
          <Text style={style.nomeConvidado}>Jorge</Text>
        </View>
        <View style={style.convidado}>
          <Image source={profileImg} style={style.profileImg}/>
          <Text style={style.nomeConvidado}>Julio</Text>
        </View>
        <View style={style.convidado}>
          <Image source={profileImg} style={style.profileImg}/>
          <Text style={style.nomeConvidado}>Jefferson</Text>
        </View>
        <View style={style.convidado}>
          <Image source={profileImg} style={style.profileImg}/>
          <Text style={style.nomeConvidado}>Josicleiton</Text>
        </View>
        <View style={style.convidado}>
          <Image source={profileImg} style={style.profileImg}/>
          <Text style={style.nomeConvidado}>Juremo</Text>
        </View>
        <View style={style.convidado}>
          <Image source={profileImg} style={style.profileImg}/>
          <Text style={style.nomeConvidado}>Jerson</Text>
        </View>
      </ScrollView>

      
      <View style={style.detalheBtnView}>
        <TouchableOpacity onPress={() => setModalVisivel(true)}>
          <IconFA5 size={30} name="angle-up" />
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