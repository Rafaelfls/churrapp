import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';

import style from './styles';

var convidadosList = []

export default function AdicionaConvidados({ route, navigation }) {

  const [value, onChangeText] = React.useState(20.50);
  const [novoUsuario, setNovoUsuario] = React.useState([]);
  const [encontrou, setEncontrou] = React.useState(false)

  const { nomeContato } = route.params;
  const { sobrenomeContato } = route.params;
  const { telefoneContato } = route.params;
  const { churrasCodeAtual } = route.params;

  if (nomeContato != null) {
    if (sobrenomeContato != undefined) {
      convidadosList.push({
        nome: nomeContato,
        sobrenome: sobrenomeContato,
        telefone: telefoneContato,
        
      })
    } else {
      convidadosList.push({
        nome: nomeContato,
        sobrenome: "",
        telefone: telefoneContato,
        
      })
    }
  }

  const inviteStandard = `Ola, Rafael esta te convidadando para o churrasco *Top dos 100*, o valor do churrasco por pessoa ficou ${value} reais. Acesso o Churrapp para confirmar a sua presença.`

  async function criaListaConvidados(convid) {
    console.log(convid)

    const response = await api.post('/usuario', {
      nome: convid.nome,
      sobrenome: convid.sobrenome,
      email: "email@email.com",
      cidade: "cidade",
      uf: "uf",
      idade: 0,
      foto: null,
      joined: '00/00/00',
      celular: convid.telefone,
      apelido: convid.nome,
      cadastrado: false,
      pontoCarne_id:false,
      carnePreferida_id:false,
      quantidadeCome_id:false,
      bebidaPreferida_id:false,
      acompanhamentoPreferido_id:false
    })
    setNovoUsuario([...novoUsuario, ...response.data]);

    await api.post(`/convidadosChurras?usuario_id=${novoUsuario.id}`, {
      valorPagar: value,
      churras_id: churrasCodeAtual
    })

  }

  function next() {
    const convidadosQtd = convidadosList.length

    //convidadosList.map(convid => criaListaConvidados(convid))

    navigation.navigate('AdicionarPratoPrincipal', { convidadosQtd });


    convidadosList = []
  }

  function backHome() {
    convidadosList = []
    navigation.replace('Tabs');
  }

  function openContactList() {
    navigation.push('OpenContactList')
  }



  /*WhatsApp = (invite, telefoneContato) => {
    Linking.canOpenURL(`whatsapp://send?text=${invite}`).then(supported => {
      if (supported) {
        if (invite === '') {
          invite = inviteStandard;
        }
        return Linking.openURL(`whatsapp://send?text=${invite}&phone=${telefoneContato}`);
      } else {
        return Linking.openURL(`https://api.whatsapp.com/send?phone=${telefoneContato}&text=${invite}`)
      }
    })
  }*/


  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
            <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
            <Text style={style.textHeaderBtn}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={style.formGroup}>
          <Text style={style.textLabel}>Convite:</Text>
          <TextInput
            style={style.inputStandard}
            onChange={text => onChangeText('')}
            onChangeText={text => onChangeText(text)}
            placeholder={inviteStandard}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={convidadosList => String(convidadosList.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: convidadosList }) => (
            <View style={style.listaConvidados}>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>Nome: </Text>
                <Text style={style.listaConvidadosLabel}>{convidadosList.nome} {convidadosList.sobrenome}</Text>
              </View>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>Telefone:</Text>
                <Text style={style.listaConvidadosLabel}>{convidadosList.telefone}</Text>
              </View>
            </View>
          )}
          style={style.listStyle} />

        <ActionButton offsetX={10} offsetY={90} onPress={openContactList} />

        <View style={style.footer}>
          <TouchableOpacity style={style.continueBtn} onPress={next}>
            <Text style={style.textBtn}>Convidar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
