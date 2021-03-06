import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Modal, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFat from 'react-native-vector-icons/Feather';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import * as Crypto from 'expo-crypto';
import CheckBox from '@react-native-community/checkbox';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';
var convidadosList = [];

export default function CompartilharConvidados({ route, navigation }) {

  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
  const [convite, onChangeText] = React.useState('');
  const [updatePage, setUpdatePage] = React.useState(false)

  const config = {
    headers: { 'Authorization': USUARIOLOGADO.id }
  };

  const { nomeContato } = route.params;
  const { telefoneContato } = route.params;
  const { churrasAtual } = route.params;
  var $val0 = `Olá, estou te convidando para o churrasco ${churrasAtual.nomeChurras}${churrasAtual.descricao == undefined ? '' : `, ${churrasAtual.descricao}`}`
  var $val1 = `, no local ${churrasAtual.local}`
  var $val2 = `, no dia ${churrasAtual.data}`
  var $val3 = `, com início às ${churrasAtual.hrInicio}${churrasAtual.hrFim == undefined ? "" : ` e término ${churrasAtual.hrFim}`}`
  var $val4 = `, o valor do churrasco por pessoa ficou R$XX,XX`
  var $val5 = `. Acesse o Churrapp para confirmar a sua presença${churrasAtual.limiteConfirmacao == null ? "" : ` até o dia ${churrasAtual.limiteConfirmacao}`}`

  //convite [mensagem, local, data, horarios, valor por pessoa, limite de confirmação de presença]
  const [convite2, setConvite2] = React.useState($val2);
  const [convite3, setConvite3] = React.useState($val3);
  const [convite1, setConvite1] = React.useState($val1);
  const [convite4, setConvite4] = React.useState($val4);
  const [convite5, setConvite5] = React.useState($val5);
  const [convite0, setConvite0] = React.useState($val0);
  const [editaConvite, setEditaConvite] = React.useState(false);
  const [isSelected1, setSelection1] = useState(true);
  const [isSelected2, setSelection2] = useState(true);
  const [isSelected3, setSelection3] = useState(true);
  const [isSelected4, setSelection4] = useState(true);
  const [isSelected5, setSelection5] = useState(true);

  useEffect(() => {
    if (telefoneContato != null) {
      setConvidadosList(nomeContato, telefoneContato)
    }
  }, [telefoneContato]);

  useEffect(() => { }, [updatePage])
  useEffect(() => { }, [editaConvite])

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
    
    var conviteFinal2 = convite0 + convite1 + convite2 + convite3 + convite4 + convite5 +".";
    convid.telefone = convid.telefone.replace("+55", "").replace(/-/g, "").replace(/\s/g, "").replace(/[()]/g, "");


    if (convid.telefone.length > 11) {
      convid.telefone = convid.telefone.substring(convid.telefone.length - 11)
    }

    let senhaProvisoria = convid.telefone.substring(convid.telefone.length - 9)
    await criaSenha(convid, senhaProvisoria)
console.log(convid)
    const response = await api.post('/usuarios', {
      nome: convid.nome,
      sobrenome: "sobrenome",
      email: convid.telefone + "@churrapp",
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
      console.log(response.data.usuario[0].id)
      await api.post(`/convidadosChurrasCriado/${response.data.usuario[0].id}`, {
        churras_id: churrasAtual.churrasCode
      }).then(res =>{
        console.log(res)
      })
      enviaMensagens(convid, conviteFinal2)
      enviaNotificacao(response.data.usuario[0])
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
    var conviteFinal2 = convite0 + convite1 + convite2 + convite3 + convite4 + convite5 +".";
    setLoading(true)
    await convidadosList.map(convid => criaListaConvidados(convid))
    await convidadosList.map(convid => enviaMensagens(convid, conviteFinal2))

    var churrascode = churrasAtual.churrasCode
    setLoading(false)
    navigation.navigate('CompartilharChurrasco', { convidadosQtd, churrascode });

    convidadosList = []
  }

  async function enviaNotificacao(convid) {
    if(churrasAtual.limiteConfirmacao == null){
      await api.post(`/notificacoes/${convid.id}/${churrasAtual.churrasCode}`, {
        mensagem: `${USUARIOLOGADO.nome} está te convidando para o churras ${churrasAtual.nomeChurras}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
        negar: "Não vou",
        confirmar: "Vou",
        validade: churrasAtual.data,
      })
    }else{
      await api.post(`/notificacoes/${convid.id}/${churrasAtual.churrasCode}`, {
        mensagem: `${USUARIOLOGADO.nome} está te convidando para o churras ${churrasAtual.nomeChurras}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
        negar: "Não vou",
        confirmar: "Vou",
        validade: churrasAtual.limiteConfirmacao,
      })
    }
  }

  function backHome() {
    convidadosList = []
    navigation.navigate('CompartilharChurrasco');
  }

  function openContactList() {
    navigation.push('OpenContactListCompartilhar')
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

  async function enviaMensagens(convid, convite) {
    var valorFinal = 0;
    await api.get(`/convidadosPorCelular/${churrasAtual.churrasCode}/${convid.telefone}`)
    .then((res) =>{
      valorFinal = (res.data[0].valorPagar).toFixed(2);
    })
    console.log(convid.telefone)
    var cvt = convite.replace('R$XX,XX.','R$'+valorFinal+".")
    
    Linking.canOpenURL(`whatsapp://send?text=${cvt}`).then(supported => {
      if (supported) {
        if (cvt === '') {
          cvt = inviteStandard;
        }
        return Linking.openURL(`whatsapp://send?text=${cvt}&phone=+55${convid.telefone}`);
      } else {
        return Linking.openURL(`https://api.whatsapp.com/send?phone=+55${convid.telefone}&text=${cvt}`)
      }
    })
  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <TouchableOpacity onPress={() => backHome()}>
            <IconFat style={style.iconHeaderBtn} name="chevron-left" size={22} />
          </TouchableOpacity>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
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
            value={convite0 + convite1 + convite2 + convite3 + convite4 + convite5 +"."}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={(convidadosList) => convidadosList.id}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={setConvidadosList}
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
                <TouchableOpacity style={style.exitBtn} onPress={() => setEditaConvite(false)}>
                  <Text style={style.iconExitBtn}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.sairBtn} onPress={()=>{defineConvite();defineConvite()}}>
                  <Text style={style.textBtn}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal >
        {criarModal}
      </SafeAreaView>
    </View>
  )
}