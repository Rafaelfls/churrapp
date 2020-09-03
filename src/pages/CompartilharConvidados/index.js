import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, RefreshControl, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import * as Crypto from 'expo-crypto';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

var convidadosList = [];

export default function CompartilharConvidados({ route, navigation }) {

  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
  const [value, onChangeValue] = React.useState(20.50);
  const [convite, onChangeText] = React.useState('');
  const [maxChar, setMaxChar] = React.useState(190);
  const [updatePage, setUpdatePage] = React.useState(false)

  const config = {
    headers: { 'Authorization': USUARIOLOGADO.id }
  };

  const { nomeContato } = route.params;
  const { sobrenomeContato } = route.params;
  const { telefoneContato } = route.params;
  const { churrasAtual } = route.params;

  useEffect(() => {
    if (telefoneContato != null) {
      setConvidadosList(nomeContato, sobrenomeContato, telefoneContato)
    }
  }, [telefoneContato]);

  useEffect(() => { }, [updatePage])

  function setConvidadosList($nome, $sobrenome, $telefone) {
    if ($sobrenome == undefined) {
      $sobrenome = '';
    }
    convidadosList.push({
      id: convidadosList.length,
      nome: $nome,
      sobrenome: $sobrenome,
      senha: null,
      telefone: $telefone,
    })
    setUpdatePage(!updatePage)
  }

  const inviteStandard = `Olá, estou te convidando para o churrasco ${churrasAtual.nomeChurras}, no dia ${churrasAtual.data} as ${churrasAtual.hrInicio} no local ${churrasAtual.local} o valor do churrasco por pessoa ficou R$${value}. Acesse o Churrapp para confirmar a sua presença.`

  function updateMsg(text) {
    onChangeText(text)
    var atual = 190 - text.length
    setMaxChar(atual)
  }


  async function criaSenha(convid,telefone) {
    convid.senha = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
       telefone
    );
  }

  async function criaListaConvidados(convid) {
    convid.telefone = convid.telefone.replace("+55", "").replace(/-/g, "").replace(/\s/g, "").replace(/[()]/g, "");


    if(convid.telefone.length > 11){
      convid.telefone = convid.telefone.substring(convid.telefone.length-11)
    }
    
    let senhaProvisoria = convid.telefone.substring(convid.telefone.length-9)
    await criaSenha(convid, senhaProvisoria)
    
    const response = await api.post('/usuarios', {
      nome: convid.nome,
      sobrenome: convid.sobrenome,
      email: convid.nome + "@churrapp",
      cidade: "cidade",
      uf: "uf",
      idade: "20/02/2002",
      fotoUrlU: "https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png",
      celular: convid.telefone,
      cadastrado: false,
      apelido: convid.nome,
      senha: convid.senha,
      pontoCarne_id: 0,
      carnePreferida_id: 0,
      quantidadeCome_id: 0,
      bebidaPreferida_id: 0,
      acompanhamentoPreferido_id: 0
    }).then(async function (response) {
      await api.post(`/convidadosChurras/${response.data.usuario[0].id}`, {
        valorPagar: value,
        churras_id: churrasAtual.churrasCode
      })
    })

  }

  function apagaConvidado(convidado) {
    convidadosList = convidadosList.filter(oldState => oldState.id !== convidado)
    setUpdatePage(!updatePage)
    // setConvidadosList(prevState => {
    //   return prevState.filter(oldState => oldState.id !== joao.id);
    // });
  }

  async function next() {
    const convidadosQtd = convidadosList.length

    setLoading(true)
    await convidadosList.map(convid => criaListaConvidados(convid))
    await convidadosList.map(convid => enviaMensagens(convid.telefone, convite))
    await convidadosList.map(convid => enviaNotificacao(convid.usuario_id))

    var churrascode = churrasAtual.churrasCode
    setLoading(false)
    navigation.navigate('CompartilharChurrasco', { convidadosQtd, churrascode });

    convidadosList = []
  }
console.log(convidadosList)
  async function enviaNotificacao(convidId){
    await api.post(`/notificacoes/${convidId}/${churrasAtual.churrasCode}`,{
        mensagem:`${USUARIOLOGADO.nome} está te convidando para o churras ${churrasAtual.nomeChurras}. Para mais informações acesse o churrasco na pagina de churras futuros. `, 
        negar:"Não vou", 
        confirmar:"Vou"
    })
}

  function backHome() {
    convidadosList = []
    navigation.navigate('CompartilharChurrasco');
  }

  function openContactList() {
    navigation.push('OpenContactListCompartilhar')
  }

  function enviaMensagens(telefone, convite) {
    Linking.canOpenURL(`whatsapp://send?text=${convite}`).then(supported => {
      if (supported) {
        if (convite === '') {
          convite = inviteStandard;
        }
        return Linking.openURL(`whatsapp://send?text=${convite}&phone=+55${telefone}`);
      } else {
        return Linking.openURL(`https://api.whatsapp.com/send?phone=+55${telefone}&text=${convite}`)
      }
    })

  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
            <Icon style={style.iconHeaderBtn} name="md-exit" size={22} />
          </TouchableOpacity>
        </View>
        <View style={style.formGroup}>
          <Text style={style.textLabel}>Mensagem ({maxChar})</Text>
          <TextInput
            style={[style.inputStandard, { height: 100 }]}
            multiline={true}
            numberOfLines={2}
            maxLength={190}
            onChange={text => onChangeText('')}
            onChangeText={text => updateMsg(text)}
            placeholder={inviteStandard}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={(convidadosList) => convidadosList.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: convidadosList }) => (
            <TouchableOpacity style={style.listaConvidados} onPress={() => apagaConvidado(convidadosList.id)}>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>{convidadosList.nome} {convidadosList.sobrenome}</Text>
              </View>
              <View style={style.listaConvidadosItem}>
                <IconFA style={style.phoneIcon} name="phone" size={16} />
                <Text style={style.listaConvidadosLabelNum}>{convidadosList.telefone}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={style.listStyle} />

        <ActionButton offsetX={10} offsetY={95} onPress={openContactList} />

        <View style={style.footer}>
          <TouchableOpacity style={style.continueBtn} onPress={next}>
            <Text style={style.textBtn}>Convidar</Text>
          </TouchableOpacity>
        </View>
        {criarModal}
      </SafeAreaView>
    </View>
  )
}