import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Linking, Picker, ScrollView, Modal, TextInput, TouchableHighlight } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import NumericInput from 'react-native-numeric-input';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMa from 'react-native-vector-icons/MaterialIcons';
import IconOct from 'react-native-vector-icons/Octicons';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import * as ImagePicker from 'expo-image-picker';
import { FloatingAction } from "react-native-floating-action";
import DatePicker from 'react-native-datepicker';


import style from './styles';
import { Container } from 'native-base';

import { useConvidadosCount, useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function DetalheChurras() {
  const route = useRoute();
  const { convidadosCount, setConvidadosCount } = useConvidadosCount();

  const churras = route.params.churras;
  const editavel = route.params.editavel;
  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
  const [itens, setItens] = useState([]);
  const [itensTotal, setItensTotal] = useState(0);
  const [convidados, setConvidados] = useState([]);
  const [convidadosConfirmados, setConfirmados] = useState(0);
  const [todosItens, setTodosItens] = useState([]);
  const [pagoVisivel, setPagoVisivel] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [todosTipos, setTodosTipos] = useState([]);
  const [subTipos, setSubTipos] = useState([]);
  const [contactar, setContactar] = useState([false, null, null, null]);
  const [churrasDateFormatted, setChurrasDateFormatted] = useState();
  const [visivel2, setVisibility2] = useState([false])
  const [editChurrasNome, setEditChurrasNome] = useState(churras.nomeChurras)
  const [editChurrasLocal, setEditChurrasLocal] = useState(churras.local)
  const [editChurrasData, setEditChurrasData] = useState(churrasDateFormatted)
  const [editChurrasInicio, setEditChurrasInicio] = useState(churras.hrInicio)
  const [editChurrasFim, setEditChurrasFim] = useState(churras.hrFim)
  const [editChurrasDescricao, setEditChurrasDescricao] = useState(churras.descricao)

  const [modalTipoVisivel, setModalTipoVisivel] = useState(false);
  const [modalItemVisivel, setModalItemVisivel] = useState(false);
  const [modalSubTipoVisivel, setModalSubTipoVisivel] = useState(false);
  const [quantidadeModal, setQuantidadeModal] = useState(0)
  const [idItem, setIdItem] = useState(null)
  const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
  const [selectedFormato, setSelectedFormato] = useState(1);
  const [formatoPicker, setFormatoPicker] = useState(false)
  const [unidades, setUnidades] = useState([]);
  const [itemModal, setItemModal] = React.useState('');
  const [visivel, setIsVisivel] = React.useState(false);
  const [formato, setFormato] = useState([]);
  const [unidadeInvalidaVisivel, setUnidadeInvalidaVisivel] = useState(false)
  const [opcaoItensVisible, setOpcaoItensVisible] = useState([false])
  const navigation = useNavigation();
  const [churrasAtual, setChurrasAtual] = useState([])


  //editar Churras
  const [allowEditing, setAllowEditing] = useState([false, 'darkgray'])
  const [returnVisivel, setReturnVisivel] = useState([false])
  const [image, setImage] = useState({ cancelled: true, uri: null });
  //Fim editar Churras

  function CompartilharChurras(churras) {
    navigation.push('CompartilharChurrasco', { churras });

  }

  async function loadUnidadeFormato() {
    const responseUnidade = await api.get(`/unidade`);
    const responseFormato = await api.get(`/formatos`);

    responseUnidade.data.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      return 0;
    })
    setUnidades(responseUnidade.data);
    setFormato(responseFormato.data);
  }

  async function setVisibility(isVisible, item, unidade, id) {
    setLoading(true)
    setQuantidadeModal(0)
    setIsVisivel(isVisible)
    setItemModal(item)
    setIdItem(id)
    setLoading(false)
  }

  // function formatData() {
  //   var date = new Date(churras.data).getDate() + 1
  //   var month = new Date(churras.data).getMonth() + 1
  //   var year = new Date(churras.data).getFullYear()
  //   setChurrasDateFormatted(date + '/' + month + '/' + year)
  //   setEditChurrasData(date + '/' + month + '/' + year)
  // }

  function backHome() {
    navigation.goBack()
  }

  async function carregarItens() {
    const response = await api.get(`/listadochurras/${churras.id}`);

    setItens(response.data);
    setItensTotal(response.data.length);
  }
  async function carregarSubTipos() {
    setLoading(true)
    const response = await api.get(`/subtipos`);
    response.data.shift()
    setSubTipos(response.data);
    setLoading(false)
  }

  async function carregarTodosTipos(subTipo) {
    if (subTipo.id == 2) {
      return pegarItemPorTipo({ id: 6 })
    } else if (subTipo.id == 5) {
      return pegarItemPorTipo({ id: 14 })
    } else {
      setLoading(true)
      const response = await api.get(`/tipoSubTipo?subTipo=${subTipo.id}`).then(function (response) {
        setTodosTipos(response.data);
        setModalSubTipoVisivel(false);
        setModalTipoVisivel(true);
        setLoading(false)
      });
      if (subTipo.subTipo == "Carnes") {
        setFormatoPicker(true)
      } else {
        setSelectedFormato(0);
      }

    }
  }

  function editPerfil() {
    setAllowEditing([true, 'black']);
  }


  async function savePerfil() {
    setLoading(true)
    setAllowEditing([false, 'darkgray']);
    if (image.uri != null) {
      var novaUrl = await uploadImage(image);
    } else {
      var novaUrl = churras.fotoUrlC;
    }
    await api.put(`/churrasUpdate/${churras.id}`, {
      nomeChurras: editChurrasNome,
      data: editChurrasData,
      hrInicio: editChurrasInicio,
      hrFim: editChurrasFim,
      local: editChurrasLocal,
      descricao: editChurrasDescricao,
      fotoUrlC: novaUrl,
    }).then(function (res) {
      setReturnVisivel([true, res.data.mensagem])
      setRefresh(!refresh)
    })
  }

  async function carregarConvidados() {
    const response = await api.get(`/convidados/${churras.id}`);

    setConvidados(response.data);
    setConvidadosCount(response.data.length);
    setConvidadosConfirmados(response.data);
  }

  function setConvidadosConfirmados(convid) {
    var qtd = 0;
    convid.forEach(pessoa => {
      if (pessoa.confirmado) {
        qtd++;
      }
    });
    return setConfirmados(qtd);
  }

  async function addItem(isVisible, item, unidadeDrop, qtdNova, formato) {
    var form = formato;
    if (form == 1) { form = 7 }
    if (unidadeDrop == 'Selecione...' || unidadeDrop == 0) {
      return setUnidadeInvalidaVisivel(true);
    }
    setIsVisivel(isVisible)
    setLoading(true)
    await api.post('/listadochurras', {
      quantidade: qtdNova,
      churras_id: churras.id,
      unidade_id: unidadeDrop,
      item_id: item,
      formato_id: form
    }).then(function (res) {
      setSelectedFormato(1)
      setSelectedUnidade(0)
      setQuantidadeModal(0)
      setModalSubTipoVisivel(false)
      setModalTipoVisivel(false)
      setLoading(false)
    })
  }

  async function updateItem(item, quantidade, unidade, formato) {
    console.log(item, quantidade, unidade, formato)
    var form = formato;
    if (form == 1) { form = 7 }
    if (unidade == 'Selecione...' || unidade == 0) {
      return setUnidadeInvalidaVisivel(true);
    }
    setLoading(true)
    await api.put(`/listadochurras/${item}`, {
      quantidade: quantidade,
      unidade_id: unidade,
      formato_id: form
    }).then(function (res) {
      setSelectedFormato(1)
      setSelectedUnidade(0)
      setRefresh(!refresh)
      setQuantidadeModal(0)
      setLoading(false)
      setVisibility2([false])
      opcaoItensVisible([false])
      setRefresh(!refresh)
    })
  }

  async function entrarEmContato(modal, celular) {
    setContactar([modal, null, null, null])
    Linking.canOpenURL(`whatsapp://send`).then(supported => {
      if (supported) {
        return Linking.openURL(`whatsapp://send?phone=+55${celular}`);
      } else {
        return Linking.openURL(`https://api.whatsapp.com/send?phone=+55${celular}`)
      }
    })
  }

  async function confirmarPagamento(id, isPago) {
    setLoading(true)
    if (isPago) {
      return setPagoVisivel(true)
    }
    await api.put(`/confirmaPagamento/${id}`)
      .then(function () {
        setContactar([false])
        setRefresh(!refresh)
        setLoading(false)
      })
  }

  function ativarFormatoPicker() {
    if (formatoPicker) {
      return (
        <View style={style.selectionFormQtd}>
          <Text style={style.modalTextLabel}>Opções:</Text>
          <Picker
            selectedValue={selectedFormato}
            style={style.boxDropdownQtd}
            itemStyle={style.itemDropdown}
            mode="dropdown"
            onValueChange={itemValue => setSelectedFormato(itemValue)}
          >

            {formato.map((formato, idx) => (
              <Picker.Item label={formato.formato} key={idx} value={formato.id} />
            ))}
          </Picker>
        </View>
      )
    } else {
      return null
    }
  }

  function formataNumeroCelular(celular) {
    var celFormatado = []
    if (celular.length == 11) {
      for (let i = 0; i < celular.length; i++) {
        if (i == 0) {
          celFormatado.push('(', celular[i])
        } else if (i == 1) {
          celFormatado.push(celular[i], ')')
        } else {
          celFormatado.push(celular[i])
        }
      }
      return celFormatado;
    } else {
      return celular
    }
  }

  async function pegarItemPorTipo(tipo) {
    setLoading(true)
    await api.get(`/items?tipo=${tipo.id}`)
      .then(function (response) {
        setTodosItens(response.data);
        setModalSubTipoVisivel(false);
        setModalTipoVisivel(false);
        setModalItemVisivel(true);
        setLoading(false)
      });
  }

  async function deleteItem(itens) {
    setLoading(true)
    await api.delete(`/listadochurras/${itens}`)
      .then(function (response) {
        setLoading(false)
        setOpcaoItensVisible([false])
        setRefresh(!refresh);
      })
  }

  async function carregaChurras() {
    const res = await api.get(`churrasPeloId/${churras.id}`)

    setChurrasAtual(res.data[0])
    setEditChurrasNome(res.data[0].nomeChurras)
    setEditChurrasLocal(res.data[0].local)
    const dataFormatada = formatData(res.data[0].data)
    setEditChurrasData(dataFormatada)
    setEditChurrasInicio(res.data[0].hrInicio)
    setEditChurrasFim(res.data[0].hrFim)
    setEditChurrasDescricao(res.data[0].descricao)
  }

  function formatData(data) {
    var date = new Date(data).getDate() + 1
    var month = new Date(data).getMonth() + 1
    var year = new Date(data).getFullYear()
    setChurrasDateFormatted(date + '/' + month + '/' + year)
    return date + '/' + month + '/' + year
  }

  const pickImage = async () => {
    setLoading(true)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      churras.fotoUrlC = result.uri;
      setImage(result);
    }
    setLoading(false)
  };

  async function uploadImage(imagem) {
    let apiUrl = 'https://pure-island-99817.herokuapp.com/fotosUsuarios';
    let uriParts = imagem.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let uri = imagem.uri

    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    const res = await fetch(apiUrl, options);
    const response = await res.json()

    return response.location;
  }

  useEffect(() => {
    carregaChurras();
    carregarItens();
    carregarConvidados();
    carregarSubTipos();
    loadUnidadeFormato();
  }, [refresh]);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <TouchableOpacity style={style.backBtn} onPress={() => backHome()} >
          <IconOct name="chevron-left" size={25} color={"white"} />
        </TouchableOpacity>
        <View style={style.title}>
          <Text style={style.detalheTitle}>{editChurrasNome}</Text>
        </View>
        {editavel &&
          <TouchableOpacity style={style.shareBtn} onPress={() => CompartilharChurras(churrasAtual)} >
            <IconEnt name="share" size={25} color={"white"} />
          </TouchableOpacity>
        }
      </View>






      <ScrollableTabView
        style={style.tabView}
        tabBarPosition="top" tabBarActiveTextColor="maroon" tabBarInactiveTextColor="dimgray"
        tabBarTextStyle={{ fontWeight: 'normal', marginTop: 10, fontFamily: 'poppins-semi-bold', fontSize: 15 }}
        tabBarBackgroundColor='white'
        tabBarUnderlineStyle={{ backgroundColor: 'maroon', height: 2 }}
        renderTabBar={() => <DefaultTabBar />}
        ref={(tabView) => { tabView = tabView; }}
        initialPage={0}
      >
        <View tabLabel="Info">
          <ScrollView>
            <View style={style.churrasImgContainer}>
              {allowEditing[0]
                ? <TouchableOpacity activeOpacity={0.5} onPress={pickImage} style={style.centeredViewFotoChurras}>
                  <View style={style.modalViewFotoChurras}>
                    <View style={style.continueBtnFotoChurras}>
                      <IconMa name="edit" size={22} color={"white"} />
                    </View>
                  </View>
                </TouchableOpacity>
                : null}
              <Image source={{ uri: churras.fotoUrlC }} style={style.churrasImg} />
              <View style={style.churrasDonoContainer}>
                <Image source={{ uri: churras.fotoUrlU }} style={style.donoImg} />
                <Text style={style.churrasDono}>{churras.nome}</Text>
              </View>
            </View>
            {allowEditing[0]
              ? <View style={style.formGroup}>
                <View style={{ flexDirection: 'row' }}>
                  <IconMat name="cowboy" size={20} style={style.icons} />
                  <Text style={style.churrasNome}>Nome do churras: </Text>
                </View>
                <TextInput
                  style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                  editable={allowEditing[0]}
                  onChangeText={text => setEditChurrasNome(text)}
                  value={editChurrasNome}
                />
              </View>
              : null}
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconFA name="map-o" size={20} style={style.icons} />
                <Text style={style.churrasNome}>Local: </Text>
              </View>
              <TextInput
                style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                editable={allowEditing[0]}
                onChangeText={text => setEditChurrasLocal(text)}
                value={editChurrasLocal}
              />
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconEnt name="calendar" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Data: </Text>
              </View>
              <DatePicker
                style={{ width: '100%' }}
                date={editChurrasData}
                mode="date"
                disabled={!allowEditing[0]}
                placeholder="DD/MM/AAAA"
                format="DD/MM/YYYY"
                minDate="01/05/2020"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: 'none'
                  },
                  dateText: {
                    color: allowEditing[1],
                    fontSize: 16,
                    position: 'absolute',
                    fontFamily: 'poppins-light',
                  },
                  disabled: {
                    backgroundColor: 'transparent',
                  },
                  dateInput: {
                    borderBottomWidth: 1,
                    borderWidth: 0,
                    borderBottomColor: allowEditing[1],
                  }
                }}
                onDateChange={(date) => { setEditChurrasData(date) }}
              />
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconEnt name="clock" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Horário de início: </Text>
              </View>
              <DatePicker
                style={{ width: '100%' }}
                date={editChurrasInicio}
                mode="time"
                placeholder="00:00"
                disabled={!allowEditing[0]}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: 'none'
                  },
                  dateText: {
                    color: allowEditing[1],
                    fontSize: 16,
                    position: 'absolute',
                    fontFamily: 'poppins-light',
                  },
                  disabled: {
                    backgroundColor: 'transparent',
                  },
                  dateInput: {
                    borderBottomWidth: 1,
                    borderWidth: 0,
                    borderBottomColor: allowEditing[1],
                  }
                }}
                onDateChange={(date) => { setEditChurrasInicio(date) }}
              />
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconEnt name="clock" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Horário de Fim: </Text>
              </View>
              <DatePicker
                style={{ width: '100%' }}
                date={editChurrasFim}
                mode="time"
                placeholder="00:00"
                confirmBtnText="Confirm"
                disabled={!allowEditing[0]}
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    display: 'none'
                  },
                  disabled: {
                    backgroundColor: 'transparent',
                  },
                  dateText: {
                    color: allowEditing[1],
                    fontSize: 16,
                    position: 'absolute',
                    fontFamily: 'poppins-light',
                  },
                  dateInput: {
                    borderBottomWidth: 1,
                    borderWidth: 0,
                    borderBottomColor: allowEditing[1],
                  }
                }}
                onDateChange={(date) => { setEditChurrasFim(date) }}
              />
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconMa name="description" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Descrição: </Text>
              </View>
              <TextInput
                style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                editable={allowEditing[0]}
                onChangeText={text => setEditChurrasDescricao(text)}
                value={editChurrasDescricao == null ? "-" : editChurrasDescricao}
              />
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconMa name="attach-money" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Valor total: </Text>
              </View>
              <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}>{churras.valorTotal == null ? "R$ 00.00" : churras.valorTotal}</Text>
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="money-bill-wave" size={17} style={style.icons} />
                <Text style={style.churrasNome}>Valor recebido: </Text>
              </View>
              <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}>{churras.valorPago == null ? "R$ 00.00" : churras.valorPago}</Text>
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconMa name="people" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Convidados: </Text>
              </View>
              <View style={[style.inputStandard, { borderBottomColor: 'darkgray', }]}>
                {convidadosCount == 1
                  ? <Text style={[style.churrasInfo, { color: 'darkgray', }]}>{convidadosConfirmados} confirmado</Text>
                  : <Text style={[style.churrasInfo, { color: 'darkgray', }]}>{convidadosConfirmados} confirmados</Text>}
              </View>
            </View>
          </ScrollView>
          {editavel
            ? allowEditing[0]
              ? <FloatingAction
                color='rgba(0,0,0,0.9)'
                showBackground={false}
                onPressMain={() => savePerfil()}
                floatingIcon={<IconMa name="save" size={22} color={"white"} />}
              />
              : <FloatingAction
                color='rgba(0,0,0,0.9)'
                showBackground={false}
                onPressMain={() => editPerfil()}
                floatingIcon={<IconMa name="edit" size={22} color={"white"} />}
              />

            : null
          }


        </View>
        {editavel
          ? (<FlatList
            tabLabel='Convidados'
            data={convidados}
            style={{ height: 170, width: "100%" }}
            showsVerticalScrollIndicator={false}
            keyExtractor={convidados => String(convidados.id)}
            renderItem={({ item: convidados }) => (

              <View style={style.containerConvidados}>
                {convidados.confirmado
                  ? (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoPresente}>
                    <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImg} />
                    <View>
                      <Text style={style.nomeConvidado}>{convidados.nome}</Text>
                      <Text style={style.foneConvidado}>{formataNumeroCelular(convidados.celular)}</Text>
                      <Text style={style.statusConvidado}>Vou comparecer</Text>
                    </View>
                    {convidados.pagou
                      ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                      : null}
                  </TouchableOpacity>)
                  : convidados.confirmado == false
                    ? (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoAusente}>
                      <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgAusente} />
                      <View>
                        <Text style={style.nomeConvidadoAusente}>{convidados.nome}</Text>
                        <Text style={style.foneConvidadoAusente}>{formataNumeroCelular(convidados.celular)}</Text>
                        <Text style={style.statusConvidadoAusente}>Não vou comparecer</Text>
                      </View>
                      {convidados.pagou
                        ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                        : null}
                    </TouchableOpacity>)
                    : convidados.confirmado == null
                      ? (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoNaoConfirm}>
                        <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgNaoConfirm} />
                        <View>
                          <Text style={style.nomeConvidadoNaoConfirm}>{convidados.nome}</Text>
                          <Text style={style.foneConvidadoNaoConfirm}>{formataNumeroCelular(convidados.celular)}</Text>
                          <Text style={style.statusConvidadoNaoConfirm}>Aguardando resposta</Text>
                        </View>
                        {convidados.pagou
                          ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                          : null}
                      </TouchableOpacity>) : null}
              </View>
            )}
          />)
          : (<FlatList
            tabLabel='Convidados'
            data={convidados}
            style={{ height: 170, width: "100%" }}
            showsVerticalScrollIndicator={false}
            keyExtractor={convidados => String(convidados.id)}
            renderItem={({ item: convidados }) => (

              <View style={style.containerConvidados}>
                {convidados.confirmado
                  ? (<View style={style.convidadoPresente}>
                    <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImg} />
                    <View>
                      <Text style={style.nomeConvidado}>{convidados.nome}</Text>
                      <Text style={style.foneConvidado}>{formataNumeroCelular(convidados.celular)}</Text>
                      <Text style={style.statusConvidado}>Vou comparecer</Text>
                    </View>
                    {convidados.pagou
                      ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                      : null}
                  </View>)
                  : convidados.confirmado == false
                    ? (<View style={style.convidadoAusente}>
                      <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgAusente} />
                      <View>
                        <Text style={style.nomeConvidadoAusente}>{convidados.nome}</Text>
                        <Text style={style.foneConvidadoAusente}>{formataNumeroCelular(convidados.celular)}</Text>
                        <Text style={style.statusConvidadoAusente}>Não vou comparecer</Text>
                      </View>
                      {convidados.pagou
                        ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                        : null}
                    </View>)
                    : convidados.confirmado == null
                      ? (<View style={style.convidadoNaoConfirm}>
                        <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgNaoConfirm} />
                        <View>
                          <Text style={style.nomeConvidadoNaoConfirm}>{convidados.nome}</Text>
                          <Text style={style.foneConvidadoNaoConfirm}>{formataNumeroCelular(convidados.celular)}</Text>
                          <Text style={style.statusConvidadoNaoConfirm}>Aguardando resposta</Text>
                        </View>
                        {convidados.pagou
                          ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                          : null}
                      </View>)
                      : null}
              </View>

            )}
          />)}

        {editavel
          ? (
            <View tabLabel='Itens'>
              <FlatList
                data={itens}
                showsVerticalScrollIndicator={false}
                keyExtractor={itens => String(itens.id)}
                style={{ height: '100%' }}
                renderItem={({ item: itens }) => (
                  <View>
                    <TouchableOpacity style={style.cardItemAdicionado} onPress={() => { setOpcaoItensVisible([true, itens.nomeItem, itens.id, itens.subTipo]) }}>
                      <Image source={{ uri: itens.fotoUrlT }} style={style.churrasFotoModal} />
                      <View style={style.churrasInfosViewModal}>
                        <Text style={style.churrasTitleModal}>{itens.nomeItem}</Text>
                        <Text style={style.churrasDonoModal}>{itens.formato == "Não aplica" ? "" : "Opção: " + itens.formato} </Text>
                        <View style={style.churrasLocDatModal}>
                          <Icon style={style.dataIconModal} name="weight-hanging" size={15} />
                          <Text style={style.qtdItemAdc}>{itens.quantidade} {itens.unidade}</Text>
                          <Text style={style.locDatSeparatorModal}>  |  </Text>
                          <Icon style={style.localIconModal} name="coins" size={15} />
                          <Text style={style.churrasLocalModal}> {itens.precoMedio == null ? '-' : "R$ " + itens.precoMedio}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              />

              <ActionButton offsetX={10} style={{ opacity: 0.85 }} offsetY={10} onPress={() => setModalSubTipoVisivel(true)} />

            </View>)
          : (<View tabLabel='Itens'>
            <FlatList
              data={itens}
              showsVerticalScrollIndicator={false}
              keyExtractor={itens => String(itens.id)}
              style={{ marginBottom: 30 }}
              renderItem={({ item: itens }) => (
                <View>
                  <View style={style.cardItemAdicionado}>
                    <Image source={{ uri: itens.fotoUrlT }} style={style.churrasFotoModal} />
                    <View style={style.churrasInfosViewModal}>
                      <Text style={style.churrasTitleModal}>{itens.nomeItem}</Text>
                      <Text style={style.churrasDonoModal}>{itens.descricao} </Text>
                      <View style={style.churrasLocDatModal}>
                        <Icon style={style.dataIconModal} name="weight-hanging" size={15} />
                        <Text style={style.qtdItemAdc}>{itens.quantidade}{itens.unidade}</Text>
                        <Text style={style.locDatSeparatorModal}>  |  </Text>
                        <Icon style={style.localIconModal} name="coins" size={15} />
                        <Text style={style.churrasLocalModal}> {itens.precoMedio == null ? '-' : "R$ " + itens.precoMedio}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>)}

      </ScrollableTabView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSubTipoVisivel}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Escolha uma categoria</Text>
            <FlatList
              data={subTipos}
              style={{ width: "100%" }}
              keyExtractor={subTipos => String(subTipos.id)}
              renderItem={({ item: subTipos }) => (

                <View >
                  <TouchableOpacity style={style.subTiposDesign} onPress={() => {
                    carregarTodosTipos(subTipos)
                  }}>
                    <Text style={style.nomeItem}>{subTipos.subTipo}</Text>
                  </TouchableOpacity>
                </View>

              )}
            />
            <View style={style.footerModal}>
              <TouchableHighlight style={style.exitBtn} onPress={() => {
                setModalSubTipoVisivel(!modalSubTipoVisivel);
              }}>
                {/* <Icon style={style.iconSalvarBtn} name="times" size={15} /> */}
                <Text style={style.iconSalvarBtn}>Fechar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTipoVisivel}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Qual tipo?</Text>
            <FlatList
              data={todosTipos}
              keyExtractor={todosTipos => String(todosTipos.id)}
              renderItem={({ item: todosTipos }) => (

                <View>
                  <TouchableOpacity style={style.tiposDesign} onPress={() => pegarItemPorTipo(todosTipos)}>
                    <Text style={style.nomeItem}>{todosTipos.tipo}</Text>
                  </TouchableOpacity>
                </View>

              )}
            />
            <View style={style.footerModal}>
              <TouchableHighlight style={style.exitBtn} onPress={() => {
                setModalTipoVisivel(!modalTipoVisivel);
                setTodosTipos([]);
                setFormatoPicker(false);
              }}>
                <Text style={style.iconSalvarBtn}>Fechar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalItemVisivel}>
        <View style={style.centeredViewItens}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Qual deseja adicionar?</Text>
            <FlatList
              data={todosItens}
              keyExtractor={todosItens => String(todosItens.id)}
              renderItem={({ item: todosItens }) => (
                <View>
                  <TouchableOpacity style={style.card} onPress={() => setVisibility(true, todosItens.nomeItem, todosItens.unidade_id, todosItens.id)}>
                    {todosItens.fotoUrlI == null
                      ? <Image source={{ uri: "https://churrappuploadteste.s3.amazonaws.com/default/tipo_" + todosItens.tipo_id + ".jpg" }} style={style.churrasFotoModal} />
                      : <Image source={{ uri: todosItens.fotoUrlI }} style={style.churrasFotoModal} />}
                    <View style={style.churrasInfosViewModal}>
                      <Text style={style.churrasTitleModal}>{todosItens.nomeItem}</Text>
                      <Text style={style.churrasDonoModal}>{todosItens.descricao} </Text>
                      <View style={style.churrasLocDatModal}>
                        <IconMat style={style.dataIconModal} name="cow" size={15} />
                        <Text style={style.churrasDataModal}> {todosItens.tipo}</Text>
                        <Text style={style.locDatSeparatorModal}>  |  </Text>
                        <Icon style={style.localIconModal} name="coins" size={15} />
                        <Text style={style.churrasLocalModal}> {todosItens.precoMedio == null ? '  -  ' : "  R$" + todosItens.precoMedio}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

              )}
            />
            <View style={style.footerModal}>
              <TouchableHighlight style={style.exitBtn} onPress={() => {
                setModalItemVisivel(!modalItemVisivel);
                setTodosItens([]);
                setRefresh(!refresh);
                setFormatoPicker(false);
              }}>
                <Text style={style.iconSalvarBtn}>Fechar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={visivel}
      >
        <View style={style.centeredViewQtd}>
          <View style={style.modalViewQtd}>
            <Text style={style.titleSubTipoModal}>Quanto de
              <Text style={{ fontFamily: 'poppins-medium', }}> {itemModal} </Text>
              deseja adicionar?</Text>
            <View style={style.selectionFormQtd}>
              <Text style={style.modalTextLabel}>Quantidade:</Text>
              <NumericInput
                value={quantidadeModal}
                onChange={quantNova => setQuantidadeModal(quantNova)}
                totalWidth={150}
                totalHeight={30}
                iconSize={15}
                initValue={quantidadeModal}
                valueType='real'
                rounded
                textColor='black'
                iconStyle={{ color: 'maroon' }}
                style={style.quantidadeInputQtd} />
            </View>
            <View style={style.selectionFormQtd}>
              <Text style={style.modalTextLabel}>Unidade:</Text>
              <Picker
                selectedValue={selectedUnidade}
                style={style.boxDropdownQtd}
                itemStyle={style.itemDropdown}
                mode="dropdown"
                onValueChange={itemValue => setSelectedUnidade(itemValue)}
              >
                {unidades.map((unity, idx) => (
                  <Picker.Item label={unity.unidade} key={idx} value={unity.id} />
                ))}
              </Picker>
            </View>
            {ativarFormatoPicker()}
            <View style={style.footerModalQtd}>
              <TouchableOpacity style={style.exitBtnFooterQtd} onPress={() => setVisibility(false, "", '', '')}>
                <Icon style={style.iconSalvarBtnQtd} name="times" size={15} />
                <Text style={style.iconSalvarBtnQtd}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.salvarBtnQtd} onPress={() => addItem(false, idItem, selectedUnidade, quantidadeModal, selectedFormato)}>
                <Icon style={style.iconSalvarBtnQtd} name="check" size={15} />
                <Text style={style.iconSalvarBtnQtd}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={contactar[0]}
      >
        <View style={style.centeredViewContactar}>
          <View style={style.modalViewContactar}>
            <Text style={style.modalTitleCont}>{contactar[2]}</Text>
            <TouchableOpacity style={style.closeBtnCont} onPress={() => setContactar([false, null, null, null])}><IconMat name="close" size={20} color="black" /></TouchableOpacity>

            {contactar[1]
              ? (<View>
                <Text style={style.modalTextCont}>Confirmou a presença
                {contactar[4]
                    ? <Text>, e ja pagou o churrasco.</Text>
                    : <Text>, e ainda não pagou o churrasco.</Text>
                  }</Text></View>)
              : null}
            {contactar[1] == false
              ? <Text style={style.modalTextCont}>Não vai poder vir no churras.</Text>
              : null}
            {contactar[1] == null
              ? (<View>
                <Text style={style.modalTextCont}>Ainda não confirmou a presença
                {contactar[4]
                    ? <Text>, e ja pagou o churrasco.</Text>
                    : <Text>, e ainda não pagou o churrasco.</Text>
                  }</Text></View>)
              : null}

            {contactar[1] && contactar[4]
              ? null
              : (<View>
                <Text style={style.modalSubCont}>Deseja entrar em contato
                {contactar[1] == false
                    ? null
                    : contactar[4]
                      ? null
                      : <Text> ou confirmar pagamento?</Text>
                  }

                </Text>

                <View style={style.footerModalCont}>
                  {contactar[1] == false
                    ? null
                    : contactar[4]
                      ? null
                      : <TouchableOpacity style={style.continueBtnCont} onPress={() => confirmarPagamento(contactar[5], contactar[4])}><Text style={style.textBtnCont}>Pagamento</Text></TouchableOpacity>

                  }
                  <TouchableOpacity style={style.continueBtnCont} onPress={() => entrarEmContato(false, contactar[3])}><Text style={style.textBtnCont}>Contato</Text></TouchableOpacity>
                </View>
              </View>)
            }

          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={pagoVisivel}
      >
        <View style={style.centeredViewContactar}>
          <View style={style.modalViewContactar}>
            <Text style={style.modalTitleCont}>Ops!</Text>
            <Text style={style.modalTextCont}>Este convidado já pagou o churras!</Text>
            <View style={style.footerModalCont}>
              <TouchableOpacity style={style.continueBtnCont} onPress={() => setPagoVisivel(false)}><Text style={style.textBtnCont}>Ok</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={unidadeInvalidaVisivel}
      >
        <View style={style.centeredViewContactar}>
          <View style={style.modalViewContactar}>
            <Text style={style.modalTitleCont}>Ops!</Text>
            <Text style={style.modalTextCont}>Selecione uma unidade de medida!</Text>
            <View style={style.footerModalCont}>
              <TouchableOpacity style={style.continueBtnCont} onPress={() => setUnidadeInvalidaVisivel(false)}><Text style={style.textBtnCont}>Ok</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={returnVisivel[0]}
      >
        <View style={style.centeredViewContactar}>
          <View style={style.modalViewContactar}>
            <Text style={style.modalTitleCont}>Editar churras!</Text>
            <Text style={style.modalTextCont}>{returnVisivel[1]}</Text>
            <View style={style.footerModalCont}>
              <TouchableOpacity style={style.continueBtnCont} onPress={() => setReturnVisivel([false])}>
                <Text style={style.textBtnCont}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={opcaoItensVisible[0]}
      >
        <View style={style.centeredViewContactar}>
          <View style={style.modalViewContactar}>
            <TouchableOpacity style={style.continueExitCont} onPress={() => setOpcaoItensVisible([false])}><IconMat name="close" size={20} /></TouchableOpacity>
            <Text style={style.modalTitleOpt}>{opcaoItensVisible[1]}</Text>
            <Text style={style.modalTextCont}>Deseja remover ou editar?</Text>
            <View style={style.footerModalCont}>
              <TouchableOpacity style={style.continueBtnCont} onPress={() => deleteItem(opcaoItensVisible[2])}><Text style={style.textBtnCont}>Remover</Text></TouchableOpacity>
              <TouchableOpacity style={style.continueBtnCont} onPress={() => {
                setVisibility2([true, opcaoItensVisible[1], opcaoItensVisible[2], opcaoItensVisible[3]]);
                setOpcaoItensVisible([false])
              }}><Text style={style.textBtnCont}>Editar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visivel2[0]}
      >
        <View style={style.centeredViewQtd}>
          <View style={style.modalViewQtd}>
            <Text style={style.titleSubTipoModal}>Quanto de
              <Text style={{ fontFamily: 'poppins-medium', }}> {visivel2[1]} </Text>
              deseja adicionar?</Text>
            <View style={style.selectionFormQtd}>
              <Text style={style.modalTextLabel}>Quantidade:</Text>
              <NumericInput
                value={quantidadeModal}
                onChange={quantNova => setQuantidadeModal(quantNova)}
                totalWidth={150}
                totalHeight={30}
                iconSize={15}
                initValue={quantidadeModal}
                valueType='real'
                rounded
                textColor='black'
                iconStyle={{ color: 'maroon' }}
                style={style.quantidadeInputQtd} />
            </View>
            <View style={style.selectionFormQtd}>
              <Text style={style.modalTextLabel}>Unidade:</Text>
              <Picker
                selectedValue={selectedUnidade}
                style={style.boxDropdownQtd}
                itemStyle={style.itemDropdown}
                mode="dropdown"
                onValueChange={itemValue => setSelectedUnidade(itemValue)}
              >
                {unidades.map((unity, idx) => (
                  <Picker.Item label={unity.unidade} key={idx} value={unity.id} />
                ))}
              </Picker>
            </View>
            {visivel2[3] == "Carnes"
              ? <View style={style.selectionFormQtd}>
                <Text style={style.modalTextLabel}>Opções:</Text>
                <Picker
                  selectedValue={selectedFormato}
                  style={style.boxDropdownQtd}
                  itemStyle={style.itemDropdown}
                  mode="dropdown"
                  onValueChange={itemValue => setSelectedFormato(itemValue)}
                >

                  {formato.map((formato, idx) => (
                    <Picker.Item label={formato.formato} key={idx} value={formato.id} />
                  ))}
                </Picker>
              </View>
              : null}
            <View style={style.footerModalQtd}>
              <TouchableOpacity style={style.exitBtnFooterQtd} onPress={() => setVisibility2([false])}>
                <Icon style={style.iconSalvarBtnQtd} name="times" size={15} />
                <Text style={style.iconSalvarBtnQtd}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.salvarBtnQtd} onPress={() => updateItem(visivel2[2], quantidadeModal, selectedUnidade, selectedFormato)}>
                <Icon style={style.iconSalvarBtnQtd} name="check" size={15} />
                <Text style={style.iconSalvarBtnQtd}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {criarModal}
    </View>
  )
}