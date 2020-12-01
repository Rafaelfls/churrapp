import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFat from 'react-native-vector-icons/Feather';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import CheckBox from '@react-native-community/checkbox';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function AdicionaConvidados({ route, navigation }) {

  const { churrasAtual } = route.params;

  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
  var $val0 = `Olá, estou te convidando para o churrasco ${churrasAtual.nomeChurras}${churrasAtual.descricao == undefined ? '' : `, ${churrasAtual.descricao}`}`
  var $val1 = `, no local ${churrasAtual.local}`
  var $val2 = `, no dia ${churrasAtual.data}`
  var $val3 = `, com início às ${churrasAtual.hrInicio}${churrasAtual.hrFim == undefined ? "" : ` e término ${churrasAtual.hrFim}`}`
  var $val4 = `, o valor do churrasco por pessoa ficou R$XX,XX`
  var $val5 = `. Acesse o Churrapp para confirmar a sua presença${churrasAtual.limiteConfirmacao == null ? "" : ` até o dia ${churrasAtual.limiteConfirmacao}`}.`

  //convite [mensagem, local, data, horarios, valor por pessoa, limite de confirmação de presença]
  const [convite2, setConvite2] = React.useState($val2);
  const [convite3, setConvite3] = React.useState($val3);
  const [convite1, setConvite1] = React.useState($val1);
  const [convite4, setConvite4] = React.useState($val4);
  const [convite5, setConvite5] = React.useState($val5);
  const [convite0, setConvite0] = React.useState($val0);
  const [editaConvite, setEditaConvite] = React.useState(false);
  const [updatePage, setUpdatePage] = React.useState(false)
  const [modalSair, setModalSair] = useState(false)
  const [isSelected1, setSelection1] = useState(true);
  const [isSelected2, setSelection2] = useState(true);
  const [isSelected3, setSelection3] = useState(true);
  const [isSelected4, setSelection4] = useState(true);
  const [isSelected5, setSelection5] = useState(true);
  const [isDisabled, setDisabled] = useState(true)
  const [convidadosList, setConvidadosList] = useState()

  const config = {
    headers: { 'Authorization': USUARIOLOGADO.id }
  };

  async function loadConvidados(){
    api.get(`/convidados/${churrasAtual.churrasCode}`)
    .then(res => {
      setConvidadosList(res.data)
      if (res.data.length > 0) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    })
  }

  useEffect(() => {
    loadConvidados()
  }, [])

  useEffect(() => {
    loadConvidados()
  }, [updatePage])

  useEffect(() => { }, [editaConvite])

  async function apagaConvidado(convidado) {
    await api.delete(`/deletarConvite/${convidado}/${churrasAtual.churrasCode}`)
    setUpdatePage(!updatePage)
  }

  async function next() {
    const convidadosQtd = convidadosList.length + 1
    LISTADECONVIDADOS = convidadosList;
    CONVITE = convite0 + convite1 + convite2 + convite3 + convite4 + convite5 + ".";
    var churrascode = churrasAtual.churrasCode
    navigation.navigate('AdicionarPratoPrincipal', { convidadosQtd, churrascode, primeiroAcesso: true });
  }

  function backHome() {
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

  function backOnePage() {
    setLoading(true)
    api.delete(`/churras/${churrasAtual.churrasCode}`, config)
      .then(function (response) {
        setLoading(false)
        navigation.goBack()
      })

  }

  function defineConvite() {
    if (!isSelected1) {
      setConvite1('')
    } else {
      setConvite1($val1)
    }
    if (!isSelected2) {
      setConvite2('')
    } else {
      setConvite2($val2)
    }
    if (!isSelected3) {
      setConvite3('')
    } else {
      setConvite3($val3)
    }
    if (!isSelected4) {
      setConvite4('')
    } else {
      setConvite4($val4)
    }
    if (!isSelected5) {
      setConvite5('')
    } else {
      setConvite5($val5)
    }
    setEditaConvite(false)
  }

  function openContactList() {
    navigation.navigate('OpenContactList', { churrasCode: churrasAtual.churrasCode, churrasAtual })
  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <TouchableOpacity style={style.exitBtn} onPress={() => backOnePage()}>
            <IconFat style={style.iconHeaderBtn} name="chevron-left" size={22} />
          </TouchableOpacity>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => setModalSair(true)}>
            <Icon style={style.iconHeaderBtn} name="md-close" size={22} />
          </TouchableOpacity>
        </View>
        <View style={style.formGroup}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={style.textLabel}>Convite:</Text>
            <TouchableOpacity style={{ justifyContent: 'center', alignContent: 'center' }} onPress={() => setEditaConvite(true)}><Text style={style.editarConvite}>Editar convite</Text></TouchableOpacity>
          </View>
          <TextInput
            style={[style.inputStandard, { marginTop: 5, height: 70 }]}
            multiline={true}
            numberOfLines={1}
            value={convite0 + convite1 + convite2 + convite3 + convite4 + convite5 + "."}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={(convidadosList) => convidadosList.id}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={() => setUpdatePage(!updatePage)}
          renderItem={({ item: convidadosList }) => (
            <TouchableOpacity style={style.listaConvidados} onPress={() => apagaConvidado(convidadosList.usuario_id)}>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>{convidadosList.nome}</Text>
              </View>
              <View style={style.listaConvidadosItem}>
                <IconFA style={style.phoneIcon} name="phone" size={16} />
                <Text style={style.listaConvidadosLabelNum}>{convidadosList.celular}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={style.listStyle} />

        <ActionButton offsetX={10} offsetY={95} onPress={openContactList} />

        <View style={style.footer}>
          {isDisabled
            ? (<TouchableOpacity style={[style.continueBtn, { backgroundColor: 'gray' }]} disabled>
              <Text style={style.textBtn}>Convidar</Text>
            </TouchableOpacity>)
            : (<TouchableOpacity style={style.continueBtn} onPress={next}>
              <Text style={style.textBtn}>Convidar</Text>
            </TouchableOpacity>)
          }

        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalSair}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalTitle}>Quer sair?</Text>
              <Text style={style.modalText}>Você deseja mesmo cancelar este churrasco?</Text>
              <Text style={style.confirmarSairSubTitle}>(Tudo que fez até aqui sera perdido)</Text>
              <View style={style.footerModal}>
                <TouchableOpacity style={style.sairBtn} onPress={() => setModalSair(false)}>
                  <Text style={style.iconExitBtn}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.salvarBtn} onPress={() => backHome()}>
                  <Text style={style.textBtn}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={editaConvite}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalTitleConvite}>Editar convite</Text>
              <Text style={style.subTitleConvite}>(Nós montamos um padrão, edite a vontade!)</Text>
              <View style={style.formGroupConvite}>
                <Text style={style.modalTextConvite}>Qual mensagem deseja colocar?</Text>
                <TextInput
                  style={[style.inputStandardConvite, { marginTop: 5, height: 40, }]}
                  multiline={true}
                  onChangeText={text => setConvite0(text)}
                  placeholder={'Mensagem'}
                  numberOfLines={1}
                  value={convite0}
                />
                <TouchableOpacity onPress={() => setSelection1(!isSelected1)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={isSelected1}
                    onValueChange={setSelection1}
                    tintColors={{ true: 'maroon' }}
                    style={style.checkbox}
                  />
                  <Text style={style.modalTextConvite}>Adicionar o local?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelection2(!isSelected2)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={isSelected2}
                    onValueChange={setSelection2}
                    tintColors={{ true: 'maroon' }}
                    style={style.checkbox}
                  />
                  <Text style={style.modalTextConvite}>Adicionar a Data?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelection3(!isSelected3)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={isSelected3}
                    onValueChange={setSelection3}
                    tintColors={{ true: 'maroon' }}
                    style={style.checkbox}
                  />
                  <Text style={style.modalTextConvite}>Adicionar o Horario?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelection4(!isSelected4)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={isSelected4}
                    onValueChange={setSelection4}
                    tintColors={{ true: 'maroon' }}
                    style={style.checkbox}
                  />
                  <Text style={style.modalTextConvite}>Adicionar o valor por pessoa?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelection5(!isSelected5)} style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    value={isSelected5}
                    onValueChange={setSelection5}
                    tintColors={{ true: 'maroon' }}
                    style={style.checkbox}
                  />
                  <Text style={style.modalTextConvite}>Adicionar data limite de confirmação?</Text>
                </TouchableOpacity>
              </View>
              <View style={style.footerModal}>
                <TouchableOpacity style={style.sairBtn} onPress={() => setEditaConvite(false)}>
                  <Text style={style.iconExitBtn}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.salvarBtn} onPress={defineConvite}>
                  <Text style={style.textBtn}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal >
        {criarModal}
      </SafeAreaView >
    </View >
  )
}