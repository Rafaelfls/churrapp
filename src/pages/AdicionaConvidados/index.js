import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import * as Crypto from 'expo-crypto';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

var convidadosList = [];

export default function AdicionaConvidados({ route, navigation }) {

  const { nomeContato } = route.params;
  const { telefoneContato } = route.params;
  const { churrasAtual } = route.params;

  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
  const [value, onChangeValue] = React.useState(20.50);
  const [convite, onChangeText] = React.useState(`Olá, estou te convidando para o churrasco ${churrasAtual.nomeChurras}, no dia ${churrasAtual.data} as ${churrasAtual.hrInicio} no local ${churrasAtual.local} o valor do churrasco por pessoa ficou R$${value}. Acesse o Churrapp para confirmar a sua presença${churrasAtual.limiteConfirmacao == null ? "" : ` até o dia ${churrasAtual.limiteConfirmacao}`}.`);
  const [updatePage, setUpdatePage] = React.useState(false)
  const [modalSair, setModalSair] = useState(false)


  const config = {
    headers: { 'Authorization': USUARIOLOGADO.id }
  };


  useEffect(() => {
    if (telefoneContato != null) {
      setConvidadosList(nomeContato, telefoneContato)
    }
  }, [telefoneContato]);

  useEffect(() => { }, [updatePage])

  function setConvidadosList($nome, $telefone) {
    convidadosList.push({
      id: convidadosList.length,
      nome: $nome,
      senha: null,
      telefone: $telefone,
    })
    setUpdatePage(!updatePage)
  }

  async function criaSenha(convid, telefone) {
    convid.senha = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      telefone
    );
  }

  async function criaListaConvidados(convid) {
    convid.telefone = convid.telefone.replace("+55", "").replace(/-/g, "").replace(/\s/g, "").replace(/[()]/g, "");

    if (convid.telefone.length > 11) {
      convid.telefone = convid.telefone.substring(convid.telefone.length - 11)
    }

    let senhaProvisoria = convid.telefone.substring(convid.telefone.length - 9)
    await criaSenha(convid, senhaProvisoria)

    const response = await api.post('/usuarios', {
      nome: convid.nome,
      sobrenome: 'sobrenome',
      email: convid.nome + "@churrapp",
      cidade: "cidade",
      uf: "uf",
      idade: "02/01/1900",
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
    LISTADECONVIDADOS = convidadosList;
    CONVITE = convite;

    setLoading(true)
    await convidadosList.map(convid => criaListaConvidados(convid))
    setLoading(false)
    var churrascode = churrasAtual.churrasCode
    navigation.navigate('AdicionarPratoPrincipal', { convidadosQtd, churrascode, primeiroAcesso: true });

    convidadosList = []
  }

  function backHome(sair, ficar) {
    if(sair === true) {
      convidadosList = []
      LISTADECONVIDADOS = null;
      CONVITE = null;
      setLoading(true)
      api.delete(`/churras/${churrasAtual.churrasCode}`, config)
      .then(function (response) {
        setLoading(false)
        navigation.replace('Tabs');
      })
      setModalSair(false)
    }
    if(ficar === true){
      setModalSair(false)
    }
   }

   function backOnePage(){
    setLoading(true)
    api.delete(`/churras/${churrasAtual.churrasCode}`, config)
    .then(function (response) {
      setLoading(false)
      navigation.goBack()
    })
     
   }

  const inviteStandard = `Olá, estou te convidando para o churrasco ${churrasAtual.nomeChurras}, no dia ${churrasAtual.data} as ${churrasAtual.hrInicio} no local ${churrasAtual.local} o valor do churrasco por pessoa ficou R$${value}. Acesse o Churrapp para confirmar a sua presença.`

  function openContactList() {
    navigation.push('OpenContactList')
  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
        <TouchableOpacity style={style.exitBtn} onPress={() => backOnePage()}>
            <Icon style={style.iconHeaderBtn} name="md-arrow-back" size={22} />
          </TouchableOpacity>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => setModalSair(true)}>
            <Icon style={style.iconHeaderBtn} name="md-close" size={22} />
          </TouchableOpacity>
        </View>
        <View style={style.formGroup}>
          <Text style={style.textLabel}>Mensagem</Text>
          <TextInput
            style={[style.inputStandard, { height: 70 }]}
            multiline={true}
            numberOfLines={3}
            onChange={text => onChangeText(text)}
            value={convite}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={(convidadosList) => convidadosList.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: convidadosList }) => (
            <TouchableOpacity style={style.listaConvidados} onPress={() => apagaConvidado(convidadosList.id)}>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>{convidadosList.nome}</Text>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSair}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalTitle}>Quer sair?</Text>
              <Text style={style.modalText}>Você deseja mesmo desfazer este churras?</Text>
              <Text style={style.confirmarSairSubTitle}>(Ele sera completamente perdido, mas nunca esquecido)</Text>
              <View style={style.footerModal}>
                 <TouchableOpacity style={style.sairBtn} onPress={() => backHome(false, true)}>
                  <Text style={style.textBtn}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.sairBtn} onPress={() => backHome(true, false)}>
                  <Text style={style.textBtn}>Claro</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {criarModal}
      </SafeAreaView>
    </View>
  )
}