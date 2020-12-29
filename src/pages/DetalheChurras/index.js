import React, { useState, useEffect } from 'react';
import {
  View, Text, Image, FlatList, TouchableOpacity, Linking,
  Picker, ScrollView, Modal, TextInput, TouchableHighlight, Switch,
  AppState, StatusBar, PermissionsAndroid, Platform
} from 'react-native';
import { useNavigation, useRoute, TabActions } from '@react-navigation/native'
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
import DatePicker from 'react-native-date-picker';

//Maps
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { showLocation, Popup } from 'react-native-map-link'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KEY_GOOGLE } from '../../../key.js'
import Geolocation from 'react-native-geolocation-service'
// import { Rating, AirbnbRating } from 'react-native-elements'


import style from './styles';
import { Container } from 'native-base';

import { useConvidadosCount, useLoadingModal, createLoadingModal, useChurras, useEditavel, useInitialPage } from '../../context/churrasContext';

export default function DetalheChurras() {
  const route = useRoute();
  const { convidadosCount, setConvidadosCount } = useConvidadosCount();
  const { newChurras, setNewChurras } = useChurras();
  const { editavel, setEditavel } = useEditavel();
  const { initialPage } = useInitialPage();
  //Map
  const [modalMap, setModalMap] = useState(false)// Modal ver mapa 
  const [mapVisible, setMapVisible] = useState(false) // Abrir modal de app de mapa
  const [modalEditMap, setModalEditMap] = useState(false) //Modal edição de mapa
  const [regiao, setRegiao] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  const [mapView, setMapView] = useState()
  const [mapViewEdit, setMapViewEdit] = useState()
  const [mapMode, setMapMode] = useState('standard')
  const [endereco, setEndereco] = useState('')
  const [latAtual, setLatAtual] = useState()
  const [lgnAtual, setLgnAtual] = useState()
  navigator.geolocation = require('react-native-geolocation-service');
  const [mapReady, setMapReady] = useState(false)
  //Fim Map

  const [liberado, setLiberado] = useState(true)

  //Switchs data
  const [switchData, setSwitchData] = useState(false)
  const [switchDataLimite, setSwitchDataLimite] = useState(false)
  const [dataNovaModal, setDataNovaModal] = useState()
  const [dataLimiteNovaModal, setDataLimiteNovaModal] = useState()
  const [switchHrInicio, setSwitchHrInicio] = useState(false)
  const [switchHrFim, setSwitchHrFim] = useState(false)
  const [hrInicioNova, setHrInicioNova] = useState()
  const [hrFimNova, setHrFimNova] = useState()
  //fim
  const [page, setPage] = useState(0)
  // const churras = route.params.churras;
  // const editavel = route.params.editavel;
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
  const [visivel2, setVisibility2] = useState([false])
  const [editChurrasNome, setEditChurrasNome] = useState('')
  const [editChurrasNomeUsuario, setEditChurrasNomeUsuario] = useState('')
  const [editChurrasLocal, setEditChurrasLocal] = useState('')
  const [editChurrasData, setEditChurrasData] = useState('')
  const [editChurrasDataLimite, setEditChurrasDataLimite] = useState('')
  const [editChurrasInicio, setEditChurrasInicio] = useState('')
  const [editChurrasFim, setEditChurrasFim] = useState('')
  const [editChurrasDescricao, setEditChurrasDescricao] = useState('')
  const [editChurrasFotoUrlC, setEditChurrasFotoUrlC] = useState('https://churrappuploadteste.s3.amazonaws.com/default/churrapp_default.png')
  const [editChurrasFotoUrlU, setEditChurrasFotoUrlU] = useState('https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png')
  const [editChurrasValorTotal, setEditChurrasValorTotal] = useState(0)
  const [editChurrasValorPago, setEditChurrasValorPago] = useState(0)

  const [editChurrasDataPicker, setEditChurrasDataPicker] = useState('')
  const [editChurrasDataLimitePicker, setEditChurrasDataLimitePicker] = useState('')
  const [hrComeco, setHrComeco] = useState()
  const [hrFim, setHrFim] = useState()

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
  const [nomeUnidadeSelecionada, setNomeUnidadeSelecionada] = useState('Unidade de medida')
  const [precoModal, setPrecoModal] = useState(0)
  const [precoMedioModal, setPrecoMedioModal] = useState(0);
  const [dataComparar, setDataComparar] = useState()
  const [convidadosFiltro, setConvidadosFiltro] = useState("")
  const [itensFiltro, setItensFiltro] = useState("")
  const [tipos, setTipos] = useState([])
  const convidadosNome = [].concat(convidados)
    .sort((a, b) => a.nome > b.nome ? 1 : -1)
    .map((convidados, i) =>
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
    );

  const convidadosNomeDono = [].concat(convidados)
    .sort((a, b) => a.nome > b.nome ? 1 : -1)
    .map((convidados, i) =>
      <View style={style.containerConvidados} key={i}>
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
    );


  //editar newChurras
  const [allowEditing, setAllowEditing] = useState([false, 'darkgray'])
  const [returnVisivel, setReturnVisivel] = useState([false])
  const [image, setImage] = useState({ cancelled: true, uri: null });
  //Fim editar newChurras

  //Convidado Alterar presença
  const [isEnabled, setIsEnabled] = useState(false);
  const [convidadoAtual, setConvidadoAtual] = useState(null)
  //fim convidado alterar presença 

  function CompartilharChurras(newChurras) {
    navigation.push('CompartilharChurrasco', { churras: newChurras });

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

  function backHome() {
    if (editavel) {
      navigation.replace('Tabs')
      savePerfil(false)
    } else {
      navigation.replace('Tabs')
      savePerfil(false)
    }
  }

  async function carregarItens() {
    const response = await api.get(`/listadochurras/${newChurras}`);
    setItens(response.data);
    setItensTotal(response.data.length);

    carregarTipos(response.data)
  }
  async function carregarSubTipos() {
    setLoading(true)
    const response = await api.get(`/subtipos`);
    response.data.shift()
    setSubTipos(response.data);
    setLoading(false)
  }

  async function carregarTipos(item) {
    var tipoid = []
    var id = 0
    var tiposFiltrado = []
    await api.get(`/tipo`).then((res) => {
      item.map((obj) => {
        res.data.map((ind, indx) => {
          tipoid[indx] = ind.id
          if (tipoid[indx] == obj.tipo_id) {
            tiposFiltrado[id] = obj.subTipo
            id++
          }
        })
      })
    })
    var ola = removeDups(tiposFiltrado)

    setTipos(ola)
  }

  function removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }
  async function carregarTodosTipos(subTipo) {
    switch (subTipo.id) {
      case 1:
        navigation.replace('EscolherNovosItens', { subTipo, churrascode: newChurras })
        break;
      case 2:
        navigation.replace('EscolherNovosItens2', { subTipo, churrascode: newChurras })
        break;
      case 3:
        navigation.replace('EscolherNovosItens3', { subTipo, churrascode: newChurras })
        break;
      case 4:
        navigation.replace('EscolherNovosItens4', { subTipo, churrascode: newChurras })
        break;
      case 5:
        navigation.replace('EscolherNovosItens5', { subTipo, churrascode: newChurras })
        break;
      default:
        break;
    }
  }

  function editPerfil() {
    formatarDataPicker(editChurrasData)
    formatarDataPickerLimite(editChurrasDataLimite)
    // formatDataInicio(hrComeco)
    // formatDataFim(editChurrasFim)
    setAllowEditing([true, 'black']);
  }


  async function savePerfil(sair) {
    var dataNova
    var dataLimiteNova
    if (dataNovaModal == null) {
      dataNova = new Date(editChurrasData)
    } else {
      var dataSave = formatNovaData(dataNovaModal)
      dataNova = new Date(dataSave)
    }
    if (dataLimiteNovaModal == null) {
      dataLimiteNova = new Date(editChurrasDataLimite)
    } else {
      var dataLimiteSave = formatNovaData(dataLimiteNovaModal)
      dataLimiteNova = new Date(dataLimiteSave)
    }
    if (sair) {
      setLoading(true)
      setAllowEditing([false, 'darkgray']);
      if (image.uri != null) {
        var novaUrl = await uploadImage(image);
      } else {
        var novaUrl = editChurrasFotoUrlC;
      }
      await api.put(`/churrasUpdate/${newChurras}`, {
        nomeChurras: editChurrasNome,
        data: dataNova,
        limiteConfirmacao: dataLimiteNova,
        hrInicio: editChurrasInicio,
        hrFim: editChurrasFim,
        local: editChurrasLocal,
        descricao: editChurrasDescricao,
        fotoUrlC: novaUrl,
        latitude: latAtual,
        longitude: lgnAtual
      }).then(function (res) {
        setReturnVisivel([true, res.data.mensagem])
        setRefresh(!refresh)
      })
    } else {
      setAllowEditing([false, 'darkgray']);
    }
  }

  async function carregarConvidados() {
    const response = await api.get(`/convidados/${newChurras}`);
    const res = await api.get(`convidadosVai/${newChurras}`)
    setConvidados(response.data);
    setConvidadosCount(res.data.length);
    setConvidadosConfirmados(response.data);
    if (!editavel) {
      response.data.map(convid => {
        if (convid.usuario_id == USUARIOLOGADO.id) {
          setConvidadoAtual(convid)
          setIsEnabled(convid.confirmado)
        }
      })
    }
  }

  async function atualizaPresença() {
    setLoading(true)
    setIsEnabled(previousState => !previousState)
    if (!isEnabled) {
      await api.put(`/confirmaPresenca/${convidadoAtual.usuario_id}/${convidadoAtual.churras_id}`)
      setRefresh(!refresh)
    } else {
      await api.put(`/negarPresenca/${convidadoAtual.usuario_id}/${convidadoAtual.churras_id}`)
      setRefresh(!refresh)
    }
    setLoading(false)
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

  async function updateItem(item, quantidade, unidade, formato, precoModal, itemTodo) {
    var form = formato;
    var precoFinal;

    if (form == 1) { form = 7 }

    if (precoModal == 0) {
      precoFinal = itemTodo.precoMedio
    } else {
      precoFinal = precoModal
    }

    setLoading(true)
    if (typeof unidade == 'string' || unidade == 0) {
      setLoading(false)
      setUnidadeInvalidaVisivel(true)
    } else {
      await api.put(`/listadochurras/${item}`, {
        quantidade: quantidade,
        unidade_id: unidade,
        formato_id: form,
        precoItem: precoFinal,
      }).then(async function (res) {
        if (res.data.antigo) {
          var sub = res.data.antigo[0].quantidade * res.data.antigo[0].precoItem;
          var sum = precoFinal * (quantidade + res.data.antigo[0].quantidade);
          var precoFinalTotal = sum - sub;
        } else {
          var precoFinalTotal = (precoFinal * quantidade).toFixed(2);
        }
        await api.put(`/churrasUpdate/valorTotal/${newChurras}`, {
          valorTotal: precoFinalTotal,
        })
        setSelectedFormato(1)
        setSelectedUnidade(0)
        setRefresh(!refresh)
        setQuantidadeModal(0)
        setLoading(false)
        setVisibility2([false])
        setOpcaoItensVisible([false])
        setRefresh(!refresh)
      })
    }
  }

  function passouDoLimite() {
    var dataLimite = new Date(churrasAtual.limiteConfirmacao)
    if (dataLimite == 0) {
      return false
    } else {
      var msDiff = new Date(churrasAtual.limiteConfirmacao).getTime() - new Date().getTime();
      var pastDays = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      if (new Date(dataLimite).getTime() === 0) {
        var dataAtual = Math.floor((new Date(churrasAtual.data).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        if (dataAtual < -1) {
          return true
        } else {
          return false
        }
      } else if (pastDays < -1) {
        return true
      } else {
        return false
      }
    }
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

  async function deleteItem(itens) {
    setLoading(true)
    var precoFinalTotal = itens.precoItem * itens.quantidade;
    await api.put(`/churrasUpdate/valorTotal/${newChurras}`, {
      valorTotal: -precoFinalTotal,
    }).then(async function () {
      await api.delete(`/listadochurras/${itens.id}`)
        .then(function (response) {
          setLoading(false)
          setOpcaoItensVisible([false])
          setRefresh(!refresh);
        })
    })
  }

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Churrapp quer utilizar sua localização",
          message:
            "Churrapp quer utilizar sua localização para marcar seus churrascos.",
          buttonNeutral: "Me pergunte depois",
          buttonNegative: "Cancelar",
          buttonPositive: "Confirmar"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Pode usar a localização");
      } else {
        console.log("Não pode usar a localização");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function hasLocationPermission() {
    // if (Platform.OS === 'ios') {
    //   const hasPermission = await this.hasLocationPermissionIOS();
    //   return hasPermission;
    // }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  function pegarRegiao(regiao, isEditable) {
    if (isEditable) {
      let initialRegion = Object.assign({}, regiao);
      initialRegion["latitudeDelta"] = 0.005;
      initialRegion["longitudeDelta"] = 0.005;
      mapViewEdit.animateToRegion(initialRegion, 2000)
      setRegiao(initialRegion)
      console.log(regiao)
    } else {
      let initialRegion = Object.assign({}, regiao);
      initialRegion["latitudeDelta"] = 0.005;
      initialRegion["longitudeDelta"] = 0.005;
      mapView.animateToRegion(initialRegion, 2000)
      setRegiao(initialRegion)
      console.log(regiao)
    }


  }
  function pegarEndereco(regiao) {
    //function to get address using current lat and lng
    console.log("Entrou")
    pegarRegiao(regiao, true);
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + regiao.latitude + "," + regiao.longitude + "&key=" + KEY_GOOGLE)
      .then((response) => response.json()).then((responseJson) => {
        console.log("ADDRESS GEOCODE is BACK!! => " +
          JSON.stringify(responseJson));
        setEditChurrasLocal(JSON.stringify(responseJson.results[0].formatted_address).replace(/"/g, ""));
      });
    setLatAtual(regiao.latitude)
    setLgnAtual(regiao.longitude)
  }
  function mudarRegiao(regiao) {
    setRegiao(regiao)
  }
  async function carregaChurras() {
    const res = await api.get(`churrasPeloId/${newChurras}`)

    // console.log(res)
    setRegiao({
      latitude: res.data[0].latitude,
      longitude: res.data[0].longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121
    })
    setChurrasAtual(res.data[0])
    setEditChurrasNome(res.data[0].nomeChurras)
    setEditChurrasNomeUsuario(res.data[0].nome)
    setEditChurrasLocal(res.data[0].local)
    const dataFormatada = formatData(res.data[0].data)
    if (res.data[0].limiteConfirmacao === null) {
      setEditChurrasDataLimite(res.data[0].data)
      setEditChurrasDataLimitePicker(dataFormatada)
    } else {
      const dataFormatadaLimite = formatData(res.data[0].limiteConfirmacao)
      var dataLimite = (new Date(res.data[0].limiteConfirmacao).getMonth() + 1) + "/" + (new Date(res.data[0].limiteConfirmacao).getDate() + 1) + "/" + new Date(res.data[0].limiteConfirmacao).getFullYear()
      setEditChurrasDataLimite(new Date(dataLimite))
      setEditChurrasDataLimitePicker(dataFormatadaLimite)

    }
    setDataComparar(Date.parse(res.data[0].data))
    setEditChurrasDataPicker(dataFormatada)
    setEditChurrasData(res.data[0].data)
    setEditChurrasInicio(res.data[0].hrInicio)
    setEditChurrasFim(res.data[0].hrFim)
    setEditChurrasDescricao(res.data[0].descricao)
    setEditChurrasFotoUrlC(res.data[0].fotoUrlC)
    setEditChurrasFotoUrlU(res.data[0].fotoUrlU)
    setEditChurrasValorTotal(res.data[0].valorTotal)
    setEditChurrasValorPago(res.data[0].valorPago)
  }

  function formatData(data) {
    var date = new Date(data).getDate() + 1
    var month = new Date(data).getMonth() + 1
    var year = new Date(data).getFullYear()
    if ((month === 4 || month === 6 || month === 9 || month === 11) && date === 31) {
      date = "01"
      month += 1
      console.log("MESES")
    }
    if (date === 32) {
      date = "01"
      month = month + 1
      if (month === 13) {
        month = 1
        year += 1
      }
    }
    return date + '/' + month + '/' + year
  }
  function formatNovaData(data) {
    var date = new Date(data).getDate()
    var month = new Date(data).getMonth() + 1
    var year = new Date(data).getFullYear()
    if ((month === 4 || month === 6 || month === 9 || month === 11) && date === 31) {
      date = "01"
      month += 1
      console.log("MESES")
    }
    if (date === 32) {
      date = "01"
      month = month + 1
      if (month === 13) {
        month = 1
        year += 1
      }
    }
    return date + '/' + month + '/' + year
  }

  const pickImage = async () => {
    setLoading(true)

    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status == 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancelled) {
        setEditChurrasFotoUrlC(result.uri);
        setImage(result);
      }
    }
    setLoading(false)
  };

  async function uploadImage(imagem) {
    let apiUrl = 'https://pure-island-99817.herokuapp.com/fotosChurras';
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

  function formatarDataPicker(data) {
    var dataInicio = new Date(data).getDate() + 1
    var mesInicio = new Date(data).getMonth() + 1
    var anoInicio = new Date(data).getFullYear()
    setEditChurrasData(mesInicio + "/" + dataInicio + "/" + anoInicio)
  }

  function formatarDataPickerLimite(dataLimite) {
    var dataConfirmacao = new Date(dataLimite).getDate()
    var mesConfirmacao = new Date(dataLimite).getMonth() + 1
    var anoConfirmacao = new Date(dataLimite).getFullYear()
    setEditChurrasDataLimite(mesConfirmacao + "/" + dataConfirmacao + "/" + anoConfirmacao)

  }
  function formatDataInicio(data) {
    var hours = new Date(data).getHours();
    var min = new Date(data).getMinutes();
    var sec = new Date(data).getSeconds();
    setEditChurrasInicio(hours + ':' + min)
    setHrComeco(data)
  }
  function formatDataFim(data) {
    var hours = new Date(data).getHours();
    var min = new Date(data).getMinutes();
    var sec = new Date(data).getSeconds();

    setEditChurrasFim(hours + ':' + min)
    setHrFim(data)
  }

  function abrirMapApp() {
    showLocation({
      latitude: regiao.latitude,
      longitude: regiao.longitude,
      dialogTitle: "Local " + editChurrasLocal,
      dialogMessage: "Quall app gostaria de utilizar?",
      cancelText: "Fechar",
      appsWhiteList: ['google-maps', 'waze']
    })
  }

  function mudarRegiao(regiao) {
    setRegiao(regiao)
  }

  function pegarLocalizacaoAtual() {
    if (hasLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          pegarRegiao({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: regiao.latitudeDelta,
            longitudeDelta: regiao.longitudeDelta
          }, true)
          pegarEndereco({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: regiao.latitudeDelta,
            longitudeDelta: regiao.longitudeDelta
          })
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }

  function mapaPronto() {
    setMapReady(true)
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
      <StatusBar backgroundColor='maroon' />
      <View style={style.containerHeader}>
        <TouchableOpacity style={style.backBtn} onPress={() => backHome()} >
          <IconOct name="chevron-left" size={25} color={"white"} />
        </TouchableOpacity>
        <View style={style.title}>
          <Text style={style.detalheTitle}>{editChurrasNome}</Text>
        </View>
        {editavel
          ? <TouchableOpacity style={style.shareBtn} onPress={() => CompartilharChurras(churrasAtual)} >
            <IconEnt name="share" size={25} color={"white"} />
          </TouchableOpacity>
          : <View style={style.participateBtn}>
            {isEnabled
              ? <Text style={style.textSwitch}>Vou</Text>
              : <Text style={style.textSwitch}>Não Vou</Text>
            }
            <Switch
              trackColor={{ false: "gray", true: "green" }}
              thumbColor={passouDoLimite() ? isEnabled ? "gray" : "gray" : isEnabled ? "white" : "white"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={atualizaPresença}
              disabled={passouDoLimite()}
              value={isEnabled}
            />
          </View>
        }
      </View>






      <ScrollableTabView
        style={style.tabView}
        tabBarPosition="top"
        tabBarActiveTextColor="maroon"
        tabBarInactiveTextColor="dimgray"
        tabBarTextStyle={{ fontWeight: 'normal', marginTop: 10, fontFamily: 'poppins-semi-bold', fontSize: 15 }}
        tabBarBackgroundColor='white'
        tabBarUnderlineStyle={{ backgroundColor: 'maroon', height: 2 }}
        renderTabBar={() => <DefaultTabBar />}
        ref={(tabView) => { tabView = tabView; }}
      >
        <View tabLabel="Info" >
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
              <Image source={{ uri: editChurrasFotoUrlC }} style={style.churrasImg} />
              <View style={style.churrasDonoContainer}>
                <Image source={{ uri: editChurrasFotoUrlU }} style={style.donoImg} />
                <Text style={style.churrasDono}>{editChurrasNomeUsuario}</Text>
              </View>
            </View>
            {editavel
              ? null
              : <View style={style.formGroup}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="coins" size={22} style={style.icons} />
                  <Text style={style.churrasNome}>Valor por pessoa: </Text>
                </View>
                <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}>{editChurrasValorTotal == null ? "R$ 00.00" : "R$ " + (editChurrasValorTotal / (convidadosCount + 1)).toFixed(2)}</Text>
              </View>}
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
              {allowEditing[0]
                ? <View>
                  <View style={{ flexDirection: 'row' }}>
                    <IconFA name="map-o" size={20} style={style.icons} />
                    <Text style={style.churrasNome}>Local: </Text>
                    <TouchableOpacity style={{ position: 'absolute', right: -10, zIndex: 20 }} onPress={() => { setModalEditMap(true); requestLocationPermission() }}>
                      <Icon name="map-marked-alt" size={20} style={style.icons} />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}
                    editable={allowEditing[0]}
                    multiline={true}
                    onChangeText={text => setEditChurrasLocal(text)}
                    value={editChurrasLocal}
                  />
                </View>
                : <View>
                  <View style={{ flexDirection: 'row' }}>
                    <IconFA name="map-o" size={20} style={style.icons} />
                    <Text style={style.churrasNome}>Local: </Text>
                    <TouchableOpacity style={{ position: 'absolute', right: -10 }} onPress={() => setModalMap(true)}>
                      <Icon name="map-marked-alt" size={20} style={style.icons} />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}
                    editable={allowEditing[0]}
                    multiline={true}
                    onChangeText={text => setEditChurrasLocal(text)}
                    value={editChurrasLocal}
                  />
                </View>
              }

            </View>
            {allowEditing[0]
              ? <View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="calendar" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Data: </Text>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent
                    visible={switchData}
                  >
                    <View style={style.centeredView2}>
                      <View style={style.modalView2}>
                        <Text style={style.modalTitle}>Data do churrasco!</Text>
                        <Text style={style.confirmarSairSubTitle}>(Escolha a data do seu churrasco)</Text>
                        <DatePicker
                          // style={{ width: '100%' }}
                          date={editChurrasData}
                          mode="date"
                          locale='pt'
                          disabled={!allowEditing[0]}
                          placeholder="DD/MM/AAAA"
                          format="DD/MM/YYYY"
                          minimumDate={new Date()}
                          onDateChange={(date) => { setEditChurrasData(date); console.log(date); setLiberado(false) }}
                        />
                        <View style={style.footerModal2}>
                          <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn}
                            onPress={() => { setSwitchData(false); setDataNovaModal(formatNovaData(editChurrasData)); setLiberado(true) }}>
                            <Text style={style.textBtn}>Selecionar</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={style.closeBtnModal}>
                          <TouchableOpacity onPress={() => setSwitchData(false)}>
                            <Text style={{ fontFamily: 'poppins-bold', fontSize: 20, color: 'white' }}>X</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  {dataNovaModal == null
                    ? <Text onPress={() => setSwitchData(true)} style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasDataPicker}</Text>
                    : <Text onPress={() => setSwitchData(true)} style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{dataNovaModal}</Text>
                  }
                </View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="calendar" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Data limite confirmação: </Text>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent
                    visible={switchDataLimite}
                  >
                    <View style={style.centeredView2}>
                      <View style={style.modalView2}>
                        <Text style={style.modalTitle}>Confirmar presença?</Text>
                        <Text style={style.confirmarSairSubTitle}>(Escolha a data limite para os convidados confirmarem presença no churrasco)</Text>
                        <DatePicker
                          // style={{ width: '100%' }}
                          date={editChurrasDataLimite}
                          mode="date"
                          locale='pt'
                          disabled={!allowEditing[0]}
                          placeholder="DD/MM/AAAA"
                          format="DD/MM/YYYY"
                          minimumDate={new Date()}
                          maximumDate={editChurrasData}
                          onDateChange={(date) => { setEditChurrasDataLimite(date); console.log(date); setLiberado(false) }}
                        />
                        <View style={style.footerModal2}>
                          <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn}
                            onPress={() => { setSwitchDataLimite(false); setDataLimiteNovaModal(formatNovaData(editChurrasDataLimite)); setLiberado(true) }}>
                            <Text style={style.textBtn}>Selecionar</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={style.closeBtnModal}>
                          <TouchableOpacity onPress={() => setSwitchDataLimite(false)}>
                            <Text style={{ fontFamily: 'poppins-bold', fontSize: 20, color: 'white' }}>X</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  {dataLimiteNovaModal == null
                    ? <Text onPress={() => setSwitchDataLimite(true)} style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasDataLimitePicker}</Text>
                    : <Text onPress={() => setSwitchDataLimite(true)} style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{dataLimiteNovaModal}</Text>
                  }
                </View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="clock" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Horário de início: </Text>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent
                    visible={switchHrInicio}
                  >
                    <View style={style.centeredView2}>
                      <View style={style.modalView2}>
                        <Text style={style.modalTitle}>Início do churrasco!</Text>
                        <Text style={style.confirmarSairSubTitle}>(Escolha a hora de início do churrasco)</Text>
                        <DatePicker
                          // style={{ width: '100%' }}
                          date={hrComeco}
                          mode="time"
                          disabled={!allowEditing[0]}
                          onDateChange={(hrInicio) => { formatDataInicio(hrInicio); console.log(hrInicio); setLiberado(false) }}
                        />
                        <View style={style.footerModal2}>
                          <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn}
                            onPress={() => { setSwitchHrInicio(false); setHrInicioNova(editChurrasInicio); setLiberado(true) }}>
                            <Text style={style.textBtn}>Selecionar</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={style.closeBtnModal}>
                          <TouchableOpacity onPress={() => setSwitchHrInicio(false)}>
                            <Text style={{ fontFamily: 'poppins-bold', fontSize: 20, color: 'white' }}>X</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Text onPress={() => setSwitchHrInicio(true)} style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasInicio}</Text>
                </View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="clock" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Horário de Fim: </Text>
                  </View>
                  <Modal
                    animationType="slide"
                    transparent
                    visible={switchHrFim}
                  >
                    <View style={style.centeredView2}>
                      <View style={style.modalView2}>
                        <Text style={style.modalTitle}>Final do churrasco!</Text>
                        <Text style={style.confirmarSairSubTitle}>(Escolha a hora de termino do churrasco)</Text>
                        <DatePicker
                          // style={{ width: '100%' }}
                          date={hrFim}
                          mode="time"
                          disabled={!allowEditing[0]}
                          onDateChange={(hrFim) => { formatDataFim(hrFim); setLiberado(false) }}
                        />
                        <View style={style.footerModal2}>
                          <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn}
                            onPress={() => { setSwitchHrFim(false); setHrFimNova(editChurrasFim); setLiberado(true) }}>
                            <Text style={style.textBtn}>Selecionar</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={style.closeBtnModal}>
                          <TouchableOpacity onPress={() => setSwitchHrFim(false)}>
                            <Text style={{ fontFamily: 'poppins-bold', fontSize: 20, color: 'white' }}>X</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                  <Text onPress={() => setSwitchHrFim(true)}
                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasFim}</Text>
                </View>
              </View>
              :
              <View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="calendar" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Data: </Text>
                  </View>
                  <Text style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasDataPicker}</Text>
                </View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="calendar" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Data limite confirmação: </Text>
                  </View>
                  <Text style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasDataLimitePicker}</Text>
                </View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="clock" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Horário de início: </Text>
                  </View>
                  <Text style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasInicio}</Text>
                </View>
                <View style={style.formGroup}>
                  <View style={{ flexDirection: 'row' }}>
                    <IconEnt name="clock" size={22} style={style.icons} />
                    <Text style={style.churrasNome}>Horário de Fim: </Text>
                  </View>
                  <Text style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}>{editChurrasFim}</Text>
                </View>
              </View>
            }

            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconMa name="description" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Descrição: </Text>
              </View>
              <TextInput
                style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto' }]}
                editable={allowEditing[0]}
                multiline={true}
                onChangeText={text => setEditChurrasDescricao(text)}
                value={editChurrasDescricao == null ? "-" : editChurrasDescricao}
              />
            </View>
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <IconMa name="attach-money" size={22} style={style.icons} />
                <Text style={style.churrasNome}>Valor total: </Text>
              </View>
              <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}>{editChurrasValorTotal == null ? "R$ 00.00" : "R$ " + (editChurrasValorTotal).toFixed(2)}</Text>
            </View>
            {editavel
              ? <View style={style.formGroup}>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="coins" size={22} style={style.icons} />
                  <Text style={style.churrasNome}>Valor por pessoa: </Text>
                </View>
                <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}>{editChurrasValorTotal == null ? "R$ 00.00" : "R$ " + (editChurrasValorTotal / (convidadosCount + 1)).toFixed(2)}</Text>
              </View>
              : null}
            <View style={style.formGroup}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="money-bill-wave" size={17} style={style.icons} />
                <Text style={style.churrasNome}>Valor recebido: </Text>
              </View>
              <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}>{editChurrasValorPago == null ? "R$ 00.00" : "R$ " + (editChurrasValorPago).toFixed(2)}</Text>
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
                onPressMain={() => { savePerfil(true) }}
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
          ? (<View tabLabel='Convidados' style={{ height: '100%', width: "100%" }}>

            {churrasAtual.limiteConfirmacao != null
              ? <View style={style.formGroup}>
                <Text style={[style.churrasNome, { textAlign: 'center' }]}>Data limite confirmação: </Text>
                <Text style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto', textAlign: 'center' }]}>{editChurrasDataLimitePicker}</Text>
              </View>
              : null}
            <Picker
              mode="dropdown"
              style={style.pickerDropdownFiltro}
              itemStyle={{ fontFamily: 'poppins-bold' }}
              selectedValue={convidadosFiltro}
              onValueChange={convidadosFiltro => setConvidadosFiltro(convidadosFiltro)}
            >
              <Picker.Item label={"Sem Filtro"} value={""} key={0} />
              <Picker.Item label={"Vou"} value={"true"} key={1} />
              <Picker.Item label={"Não Vou"} value={"false"} key={2} />
              <Picker.Item label={"Nome"} value={"nome"} key={3} />
              <Picker.Item label={"Aguardando Resposta"} value={"null"} key={4} />
              <Picker.Item label={"Pagou"} value={"pago"} key={5} />
              <Picker.Item label={"Não Pagou"} value={"naoPago"} key={6} />
            </Picker>
            {/* Sem filto */}
            {convidadosFiltro == "" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
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
              />
            )}
            {/* Filtro vou */}
            {convidadosFiltro == "true" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.confirmado == true && (
                      (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoPresente}>
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
                    )}
                  </View>
                )}
              />
            )}
            {/* Filtro não vou */}
            {convidadosFiltro == "false" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.confirmado == false && (
                      (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoAusente}>
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
                    )}
                  </View>

                )}
              />
            )}
            {/* Filtro por nome */}
            {convidadosFiltro == "nome" && (
              <ScrollView>
                {convidadosNomeDono}
              </ScrollView>
            )}
            {/* Filtro aguardando resposta */}
            {convidadosFiltro == "null" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.confirmado == null && (
                      (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoNaoConfirm}>
                        <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgNaoConfirm} />
                        <View>
                          <Text style={style.nomeConvidadoNaoConfirm}>{convidados.nome}</Text>
                          <Text style={style.foneConvidadoNaoConfirm}>{formataNumeroCelular(convidados.celular)}</Text>
                          <Text style={style.statusConvidadoNaoConfirm}>Aguardando resposta</Text>
                        </View>
                        {convidados.pagou
                          ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                          : null}
                      </TouchableOpacity>)
                    )}
                  </View>

                )}
              />
            )}
            {convidadosFiltro == "pago" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.pagou == true && (
                      (<TouchableOpacity onPress={() => setContactar([true, convidados.confirmado, convidados.nome, convidados.celular, convidados.pagou, convidados.id])} style={style.convidadoNaoConfirm}>
                        <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgNaoConfirm} />
                        <View>
                          <Text style={style.nomeConvidadoNaoConfirm}>{convidados.nome}</Text>
                          <Text style={style.foneConvidadoNaoConfirm}>{formataNumeroCelular(convidados.celular)}</Text>
                          <Text style={style.statusConvidadoNaoConfirm}>Aguardando resposta</Text>
                        </View>
                        {convidados.pagou
                          ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                          : null}
                      </TouchableOpacity>)
                    )}
                  </View>

                )}
              />
            )}
            {convidadosFiltro == "naoPago" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.pagou == false
                      ? convidados.confirmado == true
                        ? <View style={style.convidadoPresente}>
                          <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImg} />
                          <View>
                            <Text style={style.nomeConvidado}>{convidados.nome}</Text>
                            <Text style={style.foneConvidado}>{formataNumeroCelular(convidados.celular)}</Text>
                            <Text style={style.statusConvidado}>Vou comparecer</Text>
                          </View>
                          {convidados.pagou
                            ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                            : null}
                        </View>
                        : <View style={style.convidadoNaoConfirm}>
                          <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgNaoConfirm} />
                          <View>
                            <Text style={style.nomeConvidadoNaoConfirm}>{convidados.nome}</Text>
                            <Text style={style.foneConvidadoNaoConfirm}>{formataNumeroCelular(convidados.celular)}</Text>
                            <Text style={style.statusConvidadoNaoConfirm}>Aguardando resposta</Text>
                          </View>
                          {convidados.pagou
                            ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                            : null}
                        </View>
                      : null
                    }
                  </View>

                )}
              />
            )}
          </View>)
          : (<View tabLabel='Convidados' style={{ height: '100%', width: "100%" }}>

            {churrasAtual.limiteConfirmacao != null
              ? <View style={style.formGroup}>
                <Text style={[style.churrasNome, { textAlign: 'center' }]}>Data limite confirmação: </Text>
                <Text style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1], height: 'auto', textAlign: 'center' }]}>{editChurrasDataLimitePicker}</Text>
              </View>
              : null}
            <Picker
              mode="dropdown"
              style={style.pickerDropdownFiltro}
              itemStyle={{ fontFamily: 'poppins-bold' }}
              selectedValue={convidadosFiltro}
              onValueChange={convidadosFiltro => setConvidadosFiltro(convidadosFiltro)}
            >
              <Picker.Item label={"Sem Filtro"} value={""} key={0} />
              <Picker.Item label={"Vou"} value={"true"} key={1} />
              <Picker.Item label={"Não Vou"} value={"false"} key={2} />
              <Picker.Item label={"Nome"} value={"nome"} key={3} />
              <Picker.Item label={"Aguardando Resposta"} value={"null"} key={4} />
              <Picker.Item label={"Pagou"} value={"pago"} key={5} />
              <Picker.Item label={"Não Pagou"} value={"naoPago"} key={6} />
            </Picker>
            {/* Sem filto */}
            {convidadosFiltro == "" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
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
              />
            )}
            {/* Filtro vou */}
            {convidadosFiltro == "true" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.confirmado == true && (
                      (<View style={style.convidadoPresente}>
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
                    )}
                  </View>
                )}
              />
            )}
            {/* Filtro não vou */}
            {convidadosFiltro == "false" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.confirmado == false && (
                      (<View style={style.convidadoAusente}>
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
                    )}
                  </View>

                )}
              />
            )}
            {/* Filtro por nome */}
            {convidadosFiltro == "nome" && (
              <ScrollView>
                {convidadosNome}
              </ScrollView>
            )}
            {/* Filtro aguardando resposta */}
            {convidadosFiltro == "null" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.confirmado == null && (
                      (<View style={style.convidadoNaoConfirm}>
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
                    )}
                  </View>

                )}
              />
            )}
            {convidadosFiltro == "pago" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.pagou == true && (
                      (convidados.confirmado == true
                        ? <View style={style.convidadoPresente}>
                          <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImg} />
                          <View>
                            <Text style={style.nomeConvidado}>{convidados.nome}</Text>
                            <Text style={style.foneConvidado}>{formataNumeroCelular(convidados.celular)}</Text>
                            <Text style={style.statusConvidado}>Vou comparecer</Text>
                          </View>
                          {convidados.pagou
                            ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                            : null}
                        </View>
                        : null)
                    )}
                  </View>

                )}
              />
            )}
            {convidadosFiltro == "naoPago" && (
              <FlatList
                data={convidados}
                style={{ height: 170, width: "100%" }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                onRefresh={carregarConvidados}
                keyExtractor={convidados => String(convidados.id)}
                renderItem={({ item: convidados }) => (
                  <View style={style.containerConvidados}>
                    {convidados.pagou == false
                      ? convidados.confirmado == true
                        ? <View style={style.convidadoPresente}>
                          <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImg} />
                          <View>
                            <Text style={style.nomeConvidado}>{convidados.nome}</Text>
                            <Text style={style.foneConvidado}>{formataNumeroCelular(convidados.celular)}</Text>
                            <Text style={style.statusConvidado}>Vou comparecer</Text>
                          </View>
                          {convidados.pagou
                            ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                            : null}
                        </View>
                        : <View style={style.convidadoNaoConfirm}>
                          <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImgNaoConfirm} />
                          <View>
                            <Text style={style.nomeConvidadoNaoConfirm}>{convidados.nome}</Text>
                            <Text style={style.foneConvidadoNaoConfirm}>{formataNumeroCelular(convidados.celular)}</Text>
                            <Text style={style.statusConvidadoNaoConfirm}>Aguardando resposta</Text>
                          </View>
                          {convidados.pagou
                            ? <Icon style={style.convidadoPago} name="money-bill-wave" size={20} />
                            : null}
                        </View>
                      : null
                    }
                  </View>

                )}
              />
            )}
          </View>)}

        {editavel
          ? (
            <View tabLabel='Itens'>
              <Picker
                mode="dropdown"
                style={style.pickerDropdownFiltro}
                selectedValue={itensFiltro}
                onValueChange={itensFiltro => setItensFiltro(itensFiltro)}
              >
                <Picker.Item label={"Sem Filtro"} key={500} value={""} />
                {tipos.map((unity, idx) => (
                  <Picker.Item label={unity} key={idx} value={unity} />
                ))}
              </Picker>
              {itensFiltro == ""
                ? <FlatList
                  data={itens}
                  showsVerticalScrollIndicator={false}
                  refreshing={loading}
                  onRefresh={carregarItens}
                  keyExtractor={itens => String(itens.id)}
                  refreshing={loading}
                  onRefresh={carregarItens}
                  style={{ height: '90%' }}
                  renderItem={({ item: itens }) => (
                    <View>
                      <TouchableOpacity style={style.cardItemAdicionado} onPress={() => { setOpcaoItensVisible([true, itens.nomeItem, itens.id, itens.subTipo, itens]) }}>
                        <Image source={{ uri: itens.fotoUrlT }} style={style.churrasFotoModal} />
                        <View style={style.churrasInfosViewModal}>
                          <Text style={style.churrasTitleModal}>{itens.nomeItem}</Text>
                          <Text style={style.churrasDonoModal}>{itens.formato == "Não aplica" ? "" : "Opção: " + itens.formato} </Text>
                          <View style={style.churrasLocDatModal}>
                            <Icon style={style.dataIconModal} name="weight-hanging" size={15} />
                            <Text style={style.qtdItemAdc}>{(itens.quantidade).toFixed(2)} {itens.unidade}</Text>
                            <Text style={style.locDatSeparatorModal}>  |  </Text>
                            <Icon style={style.localIconModal} name="coins" size={15} />
                            <Text style={style.churrasLocalModal}> {itens.precoItem == null ? '-' : "R$ " + (itens.precoItem * itens.quantidade).toFixed(2)}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                />
                :
                <FlatList
                  data={itens}
                  showsVerticalScrollIndicator={false}
                  refreshing={loading}
                  onRefresh={carregarItens}
                  keyExtractor={itens => String(itens.id)}
                  refreshing={loading}
                  onRefresh={carregarItens}
                  style={{ height: '90%' }}
                  renderItem={({ item: itens }) => (
                    <View>
                      {itens.subTipo == itensFiltro
                        ? <TouchableOpacity style={style.cardItemAdicionado} onPress={() => { setOpcaoItensVisible([true, itens.nomeItem, itens.id, itens.subTipo, itens]) }}>
                          <Image source={{ uri: itens.fotoUrlT }} style={style.churrasFotoModal} />
                          <View style={style.churrasInfosViewModal}>
                            <Text style={style.churrasTitleModal}>{itens.nomeItem}</Text>
                            <Text style={style.churrasDonoModal}>{itens.formato == "Não aplica" ? "" : "Opção: " + itens.formato} </Text>
                            <View style={style.churrasLocDatModal}>
                              <Icon style={style.dataIconModal} name="weight-hanging" size={15} />
                              <Text style={style.qtdItemAdc}>{(itens.quantidade).toFixed(2)} {itens.unidade}</Text>
                              <Text style={style.locDatSeparatorModal}>  |  </Text>
                              <Icon style={style.localIconModal} name="coins" size={15} />
                              <Text style={style.churrasLocalModal}> {itens.precoItem == null ? '-' : "R$ " + (itens.precoItem * itens.quantidade).toFixed(2)}</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                        : null
                      }
                    </View>
                  )}
                />
              }
              <ActionButton offsetX={10} style={{ opacity: 0.85 }} offsetY={10} onPress={() => { navigation.openDrawer() }} />

            </View>)
          : (
            <View tabLabel='Itens'><View style={style.formGroup}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={style.churrasNome}>Valor por pessoa: </Text>
              </View>
              <Text style={[style.churrasInfo, style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', textAlign: 'center' }]}>{editChurrasValorTotal == null ? "R$ 00.00" : "R$ " + (editChurrasValorTotal / (convidadosCount + 1)).toFixed(2)}</Text>
            </View>
              <Picker
                mode="dropdown"
                style={style.pickerDropdownFiltro}
                selectedValue={itensFiltro}
                onValueChange={itensFiltro => setItensFiltro(itensFiltro)}
              >
                <Picker.Item label={"Sem Filtro"} key={500} value={""} />
                {tipos.map((unity, idx) => (
                  <Picker.Item label={unity} key={idx} value={unity} />
                ))}
              </Picker>
              {itensFiltro == ""
                ? <FlatList
                  data={itens}
                  showsVerticalScrollIndicator={false}
                  refreshing={loading}
                  onRefresh={carregarItens}
                  keyExtractor={itens => String(itens.id)}
                  style={{ marginBottom: 150 }}
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
                            <Text style={style.churrasLocalModal}> {itens.precoItem == null ? '-' : "R$ " + (itens.precoItem * itens.quantidade).toFixed(2)}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
                : <FlatList
                  data={itens}
                  showsVerticalScrollIndicator={false}
                  refreshing={loading}
                  onRefresh={carregarItens}
                  keyExtractor={itens => String(itens.id)}
                  style={{ marginBottom: 150 }}
                  renderItem={({ item: itens }) => (
                    <View>
                      {itens.subTipo == itensFiltro
                        ? <View style={style.cardItemAdicionado}>
                          <Image source={{ uri: itens.fotoUrlT }} style={style.churrasFotoModal} />
                          <View style={style.churrasInfosViewModal}>
                            <Text style={style.churrasTitleModal}>{itens.nomeItem}</Text>
                            <Text style={style.churrasDonoModal}>{itens.descricao} </Text>
                            <View style={style.churrasLocDatModal}>
                              <Icon style={style.dataIconModal} name="weight-hanging" size={15} />
                              <Text style={style.qtdItemAdc}>{itens.quantidade}{itens.unidade}</Text>
                              <Text style={style.locDatSeparatorModal}>  |  </Text>
                              <Icon style={style.localIconModal} name="coins" size={15} />
                              <Text style={style.churrasLocalModal}> {itens.precoItem == null ? '-' : "R$ " + (itens.precoItem * itens.quantidade).toFixed(2)}</Text>
                            </View>
                          </View>
                        </View>
                        : null
                      }

                    </View>
                  )}
                />
              }

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
        visible={modalItemVisivel}>
        <View style={style.centeredViewItens}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Qual deseja adicionar?</Text>
            <FlatList
              data={todosItens}
              keyExtractor={todosItens => String(todosItens.id)}
              renderItem={({ item: todosItens }) => (
                <View>
                  <TouchableOpacity style={style.card} onPress={() => setVisibility(true, todosItens.nomeItem, todosItens.unidade_id, todosItens.id, todosItens.precoMedio)}>
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
              <TouchableOpacity style={style.exitBtn} onPress={() => deleteItem(opcaoItensVisible[4])}>
                <Text style={style.iconExitBtn}>Remover</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.continueBtnCont} onPress={() => {
                setVisibility2([true, opcaoItensVisible[1], opcaoItensVisible[2], opcaoItensVisible[3], opcaoItensVisible[4]]);
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
                onValueChange={itemValue => { setSelectedUnidade(itemValue); setNomeUnidadeSelecionada(unidades[itemValue].unidade) }}
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
            <View style={style.selectionFormQtd}>
              <Text style={style.modalTextLabel}>Preço por {nomeUnidadeSelecionada}:</Text>
              <NumericInput
                value={precoModal}
                onChange={precoNova => setPrecoModal(precoNova)}
                totalWidth={150}
                totalHeight={30}
                iconSize={15}
                minValue={0}
                initValue={precoModal}
                valueType='real'
                rounded
                textColor='black'
                iconStyle={{ color: 'maroon' }} />
            </View>
            <View style={style.footerModalQtd}>
              <TouchableOpacity style={style.exitBtnFooterQtd} onPress={() => setVisibility2([false])}>
                <Text style={style.iconExitBtn}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.salvarBtnQtd} onPress={() => updateItem(visivel2[2], quantidadeModal, selectedUnidade, selectedFormato, precoModal, visivel2[4])}>
                <Text style={style.iconSalvarBtnQtd}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalMap}
      >
        <View style={style.centeredView2}>
          <View style={style.modalView2}>
            <Text style={[style.modalTitle, { fontSize: 23 }]}>Local do churras!</Text>
            <TouchableOpacity style={{
              backgroundColor: 'maroon', width: 25, height: 25,
              alignItems: 'center', borderRadius: 15, position: 'absolute',
              top: 10, right: 10, zIndex: 2
            }} onPress={() => setModalMap(false)}>
              <Text style={{ fontFamily: 'poppins-bold', fontSize: 16, color: 'white' }}>X</Text>
            </TouchableOpacity>
            <View style={{ width: '100%', height: '90%' }}>
              <MapView
                ref={(ref) => setMapView(ref)}
                onMapReady={() => { pegarRegiao(regiao, false); setRefresh(!refresh);}}
                onRegionChangeComplete={() => mudarRegiao(regiao)}
                provider={PROVIDER_GOOGLE}
                style={style.map}
                initialRegion={regiao}
                loadingEnabled
                mapType={mapMode}
                onLayout={mapaPronto}
              >
                {mapReady && <Marker
                    coordinate={regiao}
                    title={editChurrasLocal}
                    description={editChurrasDescricao}
                    onPress={() => setMapVisible(true)}
                  />
                }

              </MapView>
              <Popup
                isVisible={mapVisible}
                onCancelPressed={() => setMapVisible(false)}
                onAppPressed={() => setMapVisible(false)}
                onBackButtonPressed={() => setMapVisible(false)}
                options={{
                  latitude: regiao.latitude,
                  longitude: regiao.longitude,
                  dialogTitle: "Local: " + editChurrasLocal,
                  dialogMessage: "Qual app gostaria de utilizar?",
                  cancelText: "Fechar"
                }}
                appsWhiteList={['google-maps', 'waze']}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditMap}
      >
        <View style={style.centeredView2}>
          <View style={style.modalView2}>
            <Text style={[style.modalTitle, { fontSize: 23 }]}>Encontre o endereço!</Text>
            <TouchableOpacity style={{ backgroundColor: 'maroon', width: 25, height: 25, alignItems: 'center', borderRadius: 15, position: 'absolute', top: 10, right: 10, zIndex: 2 }} onPress={() => setModalEditMap(false)}>
              <Text style={{ fontFamily: 'poppins-bold', fontSize: 16, color: 'white' }}>X</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: 'maroon', padding: 5,
              alignItems: 'center', borderRadius: 50, position: 'absolute',
              bottom: 50, right: 50, zIndex: 2
            }} onPress={() => pegarLocalizacaoAtual()}>
              <IconMa name="my-location" size={25} color="white" />
            </TouchableOpacity>
            <View style={{ width: '100%', height: '90%' }}>
              <MapView
                ref={(ref) => setMapViewEdit(ref)}
                onMapReady={() => pegarRegiao(regiao, true)}
                onRegionChangeComplete={() => mudarRegiao(regiao)}
                style={style.map}
                initialRegion={regiao}
              >
                <Marker
                  draggable
                  coordinate={regiao}
                  onDragEnd={(e) => {
                    pegarEndereco(e.nativeEvent.coordinate);
                  }}
                />
              </MapView>
              <GooglePlacesAutocomplete
                multiline={true}
                fetchDetails={true}
                placeholder={"Procurar"}
                renderDescription={(row) => row.description}
                returnKeyType={"search"}
                enablePoweredByContainer={false}
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={200}
                textInputProps={{
                  onChangeText: (text) => {
                    if (text == "") {
                      setEditChurrasLocal(editChurrasLocal)
                    }
                  },
                  style: { backgroundColor: 'rgba(228, 233, 237, 1)', borderRadius: 8, fontFamily: 'poppins-medium', width: '100%' },
                  defaultValue: editChurrasLocal
                }}
                onPress={(data, details) => {
                  // 'details' is provided when fetchDetails = true
                  setRegiao({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: regiao.latitudeDelta,
                    longitudeDelta: regiao.longitudeDelta
                  })
                  // setEditChurrasLocal(data.description)
                  setEditChurrasLocal(details.formatted_address)
                  pegarRegiao({
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: regiao.latitudeDelta,
                    longitudeDelta: regiao.longitudeDelta
                  }, true)
                  setLatAtual(details.geometry.location.lat)
                  setLgnAtual(details.geometry.location.lng)
                }}
                query={{
                  key: KEY_GOOGLE,
                  language: 'pt-br',
                  components: 'country:br'
                }}
                styles={{
                  description: {
                    fontFamily: "poppins-light",
                    color: "maroon",
                    fontSize: 12,
                  },
                  predefinedPlacesDescription: {
                    color: "black",
                  },
                  listView: {
                    position: "absolute",
                    marginTop: 44,
                    backgroundColor: "white",
                    borderBottomEndRadius: 15,
                    elevation: 2,
                  },
                }}

              />

            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={unidadeInvalidaVisivel}
      >
        <View style={style.centeredView3}>
          <View style={style.modalView3}>
            <Text style={style.modalTitle3}>Ops!</Text>
            <Text style={style.modalText3}>Escolha a unidade de medida do seu item!</Text>
            <View style={style.footerModal3}>
              <TouchableOpacity style={style.continueBtn3} onPress={() => setUnidadeInvalidaVisivel(false)}>
                <Text style={style.textBtn2}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {criarModal}
    </View>
  )
}