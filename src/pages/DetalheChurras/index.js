import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, HorizontalScrollView, Modal, TouchableHighlight, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import ActionButton from 'react-native-action-button';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import api from '../../services/api';

import backgroundImg from '../../assets/fundoDescricao.jpg';
import profileImg from '../../assets/Perfil.jpg';
import donoImg from '../../assets/rafaelPerfil.jpg';
import frango from '../../assets/frango.jpg';
import linguica from '../../assets/linguica.jpg';
import fraldinha from '../../assets/fraldinha.jpg';
import pao from '../../assets/pao.jpg';

import style from './styles';
import { Container } from 'native-base';

export default function DetalheChurras() {
  const route = useRoute();
  const loginFranca = "0516f9fb26e6be70";
  const loginJoao = "99d8830296d7c838";
  const [itens, setItens] = useState([]);

  const churras = route.params.churras;
  const [modalVisivel, setModalVisivel] = useState(false);
  const [churrasCode , setChurrasCode] = useState(churras.churrasCode)

  console.log(churrasCode)
  const navigation = useNavigation();

  function CompartilharChurras(churrasCode) {
    navigation.push('CompartilharChurrasco',{churrasCode});
  }

  function backHome() {
    navigation.replace('Tabs',  {
      screen: 'Meu Churras', 
      params: {loginFranca, loginJoao}});
  }
  
  async function carregarItens() {
    const response = await api.get(`/itemdochurras?churras_code=${churras.churrasCode}`);

    setItens([...itens, ...response.data]);
  }

  useEffect(() => {
        carregarItens();
    }, []);

  return (
    <View style={style.container}>
      <View style={style.containerImg}>
        <Image source={backgroundImg} style={style.backgroundImg} />
        <Container style={style.cabecalho}>
            <IconOct name="chevron-left" size={25} style={style.backBtn} onPress={backHome} />
          <Text style={style.detalheTitle}>{churras.nomeChurras}</Text>
            <IconEnt name="share" size={25} style={style.shareBtn} onPress={() => CompartilharChurras(churras.churrasCode)}/>            
        </Container>
        <Text>{churras.churrasCode}</Text>
      </View>

      <ScrollView nestedScrollEnabled={true} style={style.scroll}>

        <View style={style.infosPrincipais}>
          <View style={style.infosLocDat}>
            <View style={style.churrasLocalContainer}>
              <IconFA name="map-o" size={20} style={style.localIcon} />
              <Text style={style.churrasLocal}>{churras.local}</Text>
            </View>
            <View style={style.churrasDataContainer}>
              <IconEnt name="calendar" size={22} style={style.dataIcon} />
              <Text style={style.churrasData}>{churras.data} - {churras.hrInicio}</Text>
            </View>
          </View>
          <View style={style.churrasDonoContainer}>
            <Image source={donoImg} style={style.donoImg} />
            <Text style={style.churrasDono}>{churras.nome}</Text>
          </View>
        </View>

        <View style={style.linhaDeSeparacao} />

        <View style={style.cabecalhoConvidados}>
          <View style={style.containerTituloConvidados}>
            <Text style={style.tituloConvidados}>Convidados</Text>
            <Text style={style.subtituloConvidados}>6 pessoas</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisivel(true)}>
            <Text style={style.verTodos}>ver todos</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal={true} nestedScrollEnabled={true} style={style.containerConvidados}>
          <View style={style.convidado}>
            <Image source={donoImg} style={style.profileImg} />
            <Text style={style.nomeConvidado}>Rafael</Text>
          </View>
          <View style={style.convidado}>
            <Image source={profileImg} style={style.profileImg} />
            <Text style={style.nomeConvidado}>Julio</Text>
          </View>
          <View style={style.convidado}>
            <Image source={profileImg} style={style.profileImg} />
            <Text style={style.nomeConvidado}>Jefferson</Text>
          </View>
          <View style={style.convidado}>
            <Image source={profileImg} style={style.profileImg} />
            <Text style={style.nomeConvidado}>Josicleiton</Text>
          </View>
          <View style={style.convidado}>
            <Image source={profileImg} style={style.profileImg} />
            <Text style={style.nomeConvidado}>Juremo</Text>
          </View>
          <View style={style.convidado}>
            <Image source={profileImg} style={style.profileImg} />
            <Text style={style.nomeConvidado}>Jerson</Text>
          </View>
        </ScrollView>

        <View style={style.linhaDeSeparacao} />

        <View style={style.cabecalhoItens}>
          <View style={style.containerTituloItens}>
            <Text style={style.tituloItens}>Itens</Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisivel(true)}>
            <Text style={style.verTodos}>ver todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
                data={itens}
                horizontal
                pagingEnabled={true}
                style={{height: 200, width: 400}}
                showsVerticalScrollIndicator={false}
                keyExtractor={itens => String(itens.id)}
                renderItem={({ item: itens }) => (

                    <View style = {{ width: 140, height: 'auto', flexDirection:'row'}}>
                      <TouchableOpacity>
                          <View style={style.item}>
                            <Image source={frango} style={style.itemImg} />
                            <Text style={style.nomeItem}>{itens.nomeItem}</Text>
                            <Text style={style.qtdItem}>{itens.quantidade}{itens.unidade}</Text>
                          </View> 
                        </TouchableOpacity>
                    </View>

                )}
            />

      </ScrollView>

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