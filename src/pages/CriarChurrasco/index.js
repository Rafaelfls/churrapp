import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Modal, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-date-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

import style from './styles';
import { useLoadingModal, createLoadingModal, useChurrasCount } from '../../context/churrasContext';

import MapView, { Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { KEY_GOOGLE } from '../../../key.js'

export default function CriarChurrasco() {

  const { churrasCount, setChurrasCount } = useChurrasCount();
  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
  const navigation = useNavigation();
  const [nomeChurras, setNomeChurras] = useState('');
  const [local, setlocal] = useState('');
  const [hrInicio, sethrInicio] = useState();
  const [hrFim, sethrFim] = useState();
  const [descricao, setdescricao] = useState();
  const [date, setDate] = useState();
  const [dataFormatada, setDataFormatada] = useState('')
  const [dataFormatadaLimite, setDataFormatadaLimite] = useState('')
  const [limiteConfirmacao, setLimiteConfirmacao] = useState();
  const [image, setImage] = useState({ cancelled: true });
  const [churrasCodeCriado, setChurrasCodeCriado] = useState('')
  const [visivel, setVisivel] = useState(false)
  const [modalSair, setModalSair] = useState(false)
  const [url] = useState("https://churrappuploadteste.s3.amazonaws.com/default/churrapp_default.png")

  const [switchData, setSwitchData] = useState(false)
  const [switchDataLimite, setSwitchDataLimite] = useState(false)
  const [switchComponentDataLimite, setSwitchComponentDataLimite] = useState(false)
  const [switchComponentHrFim, setSwitchComponentHrFim] = useState(false)
  const [switchHrInicio, setSwitchHrInicio] = useState(false)
  const [switchHrFim, setSwitchHrFim] = useState(false)
  const [liberado, setLiberado] = useState(true)

  const [ativado, setAtivado] = useState(false);

  //Maps
  const [regiao, setRegiao] = useState({
    latitude: -22.9329252,
    longitude: -47.073845,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  const [endereco, setEndereco] = useState('')
  const [searchText, setSearchText] = useState()
  const [modalMap, setModalMap] = useState(false)
  const [mapView, setMapView] = useState()
  const [latAtual, setLatAtual] = useState()
  const [lgnAtual, setLgnAtual] = useState()
  //Fim Maps

  const [borderColorRed1, setBorderColorRed1] = useState(style.formOk);
  const [borderColorRed2, setBorderColorRed2] = useState(style.formOk);
  const [borderColorRed3, setBorderColorRed3] = useState('darkgray');
  const [borderColorRed4, setBorderColorRed4] = useState('darkgray');
  var newChurrasCriados;


  const config = {
    headers: { 'Authorization': USUARIOLOGADO.id }
  };

  async function next() {

    if (nomeChurras == '') {
      setBorderColorRed1(style.formNok)
    } else {
      setBorderColorRed1(style.formOk)
    }
    if (endereco == '') {
      setBorderColorRed2(style.formNok)
    } else {
      setBorderColorRed2(style.formOk)
    }
    if (dataFormatada == '') {
      setBorderColorRed3(style.formNok)
    } else {
      setBorderColorRed3(style.formOk)
    }
    if (hrInicio == undefined) {
      setBorderColorRed4(style.formNok)
    } else {
      setBorderColorRed4(style.formOk)
    }

    if (nomeChurras == '' ||
      endereco == '' ||
      date == '' ||
      hrInicio == '') {
      return setVisivel(true)
    } else {
      await criarChurras()
    }

  }

  function backHome() {
    newChurrasCriados = churrasCount - 1;
    api.put(`/usuariosQntCriado/${USUARIOLOGADO.id}`, { churrasCriados: newChurrasCriados });
    navigation.replace('Tabs');
    setModalSair(false)

  }

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (status == 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result);
      }
    }
  };

  async function ulpoadImagem() {
    if (!image.cancelled) {
      let apiUrl = 'https://pure-island-99817.herokuapp.com/fotosChurras';
      let uriParts = image.uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
      let uri = image.uri

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
      const response = await res.json();

      return response.location
    } else {
      return url
    }
  }

  async function criarChurras() {

    setLoading(true)
    const novaUrl = await ulpoadImagem()

    await api.post('/churras', {
      nomeChurras: nomeChurras,
      local: endereco,
      hrInicio: hrInicio,
      hrFim: hrFim,
      descricao: descricao,
      data: date,
      fotoUrlC: novaUrl,
      limiteConfirmacao: limiteConfirmacao,
      latitude: latAtual,
      longitude: lgnAtual
    }, config).then(function (response) {
      setLoading(false)
      navigation.navigate('AdicionaConvidados', {
        nomeContato: null,
        sobrenomeContato: null,
        telefoneContato: null,
        churrasAtual: {
          churrasCode: response.data.id,
          nomeChurras: nomeChurras,
          local: endereco,
          hrInicio: hrInicio,
          hrFim: hrFim,
          descricao: descricao,
          data: dataFormatada,
          limiteConfirmacao: limiteConfirmacao,
          latitude: latAtual,
          longitude: lgnAtual
        },
      });
    })
  }
  function formatData(data) {
    var date = new Date(data).getDate()
    var month = new Date(data).getMonth() + 1
    var year = new Date(data).getFullYear()
    if (date === 32) {
      date = "01"
      month = month + 1
      if (month === 13) {
        month = 1
        year += 1
      }
    }
    if (month < 10) {
      month = "0" + month
    }
    setDataFormatada(date + '/' + month + '/' + year)
    console.log(dataFormatada)
  }
  function formatDataLimite(data) {
    var date = new Date(data).getDate()
    var month = new Date(data).getMonth() + 1
    var year = new Date(data).getFullYear()
    if (date === 32) {
      date = "01"
      month = month + 1
      if (month === 13) {
        month = 1
        year += 1
      }
    }
    if (month < 10) {
      month = "0" + month
    }
    setDataFormatadaLimite(date + '/' + month + '/' + year)
    console.log(dataFormatadaLimite)
  }
  function formatDataInicio(data) {
    var hours = data.getHours();
    var min = data.getMinutes();
    console.log(hours)
    if (hours < 10) {
      if (min < 10) {
        sethrInicio("0" + hours + ':' + '0' + min)
      } else {
        sethrInicio("0" + hours + ':' + min)
      }
    } else {
      sethrInicio(hours + ':' + min)
    }
    console.log(hrInicio)
  }
  function formatDataFim(data) {
    var hours = data.getHours();
    var min = data.getMinutes();
    var sec = data.getSeconds();
    if (hours < 10) {
      if (min < 10) {
        sethrInicio("0" + hours + ':' + '0' + min)
      } else {
        sethrInicio("0" + hours + ':' + min)
      }
    } else {
      sethrInicio(hours + ':' + min)
    }
  }

  function pegarEndereco() {
    //function to get address using current lat and lng
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + regiao.latitude + "," + regiao.longitude + "&key=" + KEY_GOOGLE).then((response) => response.json()).then((responseJson) => {
      console.log("ADDRESS GEOCODE is BACK!! => " +
        JSON.stringify(responseJson));
      setEndereco(JSON.stringify(responseJson.results[0].formatted_address).replace(/"/g, ""));
    });
  }

  function irParaLocalInicial(regiao) {
    let initialRegion = Object.assign({}, regiao);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    mapView.animateToRegion(initialRegion, 2000)
  }
  function mudarRegiao(regiao) {
    setRegiao(regiao)
    // pegarEndereco()
  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <View>
            <Text style={style.textHeader}>Vamos começar!</Text>
            <Text style={style.textSubHeader}>Insira as informações principais</Text>
          </View>
          <TouchableOpacity style={style.exitBtn} onPress={() => setModalSair(true)}>
            <Icon style={style.iconHeaderBtn} name="md-close" size={22} />
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scrollView}>
          <View style={style.formGroup}>
            <Text style={style.textLabel}>Nome do churras</Text>
            <View>
              <TextInput
                style={[style.inputStandard, borderColorRed1]}
                onChangeText={text => setNomeChurras(text)}
                value={nomeChurras}
                placeholder={'Nome do churrasco'}
              />
            </View>
            <View>
              <Text style={style.textLabel}>Local</Text>
              <TouchableOpacity onPress={() => setModalMap(true)} style={{ position: 'absolute', right: 0 }}>
                <IconFA5 name="map-marked-alt" size={20} style={style.icons} />
              </TouchableOpacity>
            </View>
            <Text
              style={[style.inputStandard, borderColorRed2, { height: 40 }]}
              multiline
              onPress={() => setModalMap(true)}
            >{endereco == '' ? "Local do churrasco" : endereco}</Text>

            <Text style={style.textLabel}>Descrição</Text>
            <View>
              <TextInput
                style={[style.inputStandard, style.formOk]}
                multiline={true}
                numberOfLines={3}
                value={descricao}
                placeholder={"Descrição do churrasco (opcional)"}
                onChangeText={text => setdescricao(text)}
              />
            </View>
            <Text style={style.textLabel}>Data</Text>
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
                    style={{ marginBottom: 10 }}
                    date={date}
                    mode="date"
                    locale="pt"
                    format="DD/MM/YYYY"
                    minimumDate={new Date()}
                    onDateChange={(date) => { setDate(date); formatData(date); setLiberado(false) }}
                  />
                  <View style={style.footerModal}>
                    <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn} onPress={() => { setSwitchData(false); setLiberado(true) }}>
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
            <View>
              <Text
                style={[style.inputStandard, borderColorRed3, { height: 40 }]}
                onPress={() => setSwitchData(true)}
              >{dataFormatada != '' ? dataFormatada : "DD/MM/AAAA"}</Text>
            </View>
            <Text style={style.textLabel}>Início</Text>
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
                    style={{ marginBottom: 10 }}
                    date={hrInicio}
                    mode="time"
                    onDateChange={(hrInicio) => { formatDataInicio(hrInicio);; setLiberado(false) }}
                  />
                  <View style={style.footerModal}>
                    <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn} onPress={() => { setSwitchHrInicio(false); setLiberado(true) }}>
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
            <Text
              style={[style.inputStandard, borderColorRed4, { height: 40 }]}
              onPress={() => setSwitchHrInicio(true)}
            >{hrInicio != undefined ? hrInicio : "HH:MM"}</Text>
            <View>
              <Text style={style.textLabel}>Término</Text>
              <Switch
                trackColor={{ false: "gray", true: "green" }}
                thumbColor={switchComponentHrFim ? "lightgray" : "lightgray"}
                style={{ position: 'absolute', right: 0 }}
                value={switchComponentHrFim}
                onValueChange={() => { setSwitchComponentHrFim(!switchComponentHrFim); if (!switchComponentHrFim) { setSwitchHrFim(true) } }} />
            </View>
            {switchComponentHrFim == false
              ? null
              : (<Text
                style={[style.inputStandard, { height: 40 }]}
                onPress={() => setSwitchHrFim(true)}
              >{hrFim != undefined ? hrFim : "HH:MM"}</Text>)
            }
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
                    style={{ marginBottom: 10 }}
                    date={hrFim}
                    mode="time"
                    onDateChange={(hrFim) => { formatDataFim(hrFim); setLiberado(false) }}
                  />
                  <View style={style.footerModal}>
                    <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn} onPress={() => { setSwitchHrFim(false); setLiberado(true) }}>
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

            <View>
              <Text style={style.textLabel}>Confirmação de presença até</Text>
              <Switch
                trackColor={{ false: "gray", true: "green" }}
                thumbColor={switchComponentDataLimite ? "lightgray" : "lightgray"}
                style={{ position: 'absolute', right: 0 }}
                value={switchComponentDataLimite}
                onValueChange={() => { setSwitchComponentDataLimite(!switchComponentDataLimite); if (!switchComponentDataLimite) { setSwitchDataLimite(true) } }} />
            </View>
            {switchComponentDataLimite == false
              ? null
              : (<Text
                style={[style.inputStandard, { height: 40 }]}
                onPress={() => setSwitchDataLimite(true)}
              >{dataFormatadaLimite != '' ? dataFormatadaLimite : "DD/MM/AAAA"}</Text>)
            }
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
                    style={{ marginBottom: 10 }}
                    date={limiteConfirmacao}
                    mode="date"
                    locale='pt'
                    format="DD/MM/YYYY"
                    minimumDate={new Date()}
                    maximumDate={date}
                    onDateChange={(date) => { setLimiteConfirmacao(date); formatDataLimite(date); setLiberado(false) }}
                  />
                  <View style={style.footerModal}>
                    <TouchableOpacity disabled={liberado} style={liberado ? style.continueBtnDisabled : style.continueBtn} onPress={() => { setSwitchDataLimite(false); setLiberado(true) }}>
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

            <View style={{ marginVertical: 10 }}>
              <Text style={style.textLabel}>Foto do churras</Text>
              <View style={style.imagePicker}>
                <TouchableOpacity style={style.inputDisplay} onPress={pickImage} >
                  <IconFA style={style.addImgIcon} name="image" size={100} />
                  {image && <Image source={{ uri: image.uri }} style={{ width: 170, height: 170, paddingVertical: 10 }} />}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={style.footer}>
          <TouchableOpacity style={style.continueBtn2} onPress={next}>
            <Text style={style.textBtn}>Criar churras</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visivel}
        >
          <View style={style.centeredView}>
            <View style={style.modalView}>
              <Text style={style.modalTitle}>Ops!</Text>
              <Text style={style.modalText}>Faltaram algumas informações!</Text>
              <View style={style.footerModal}>
                <TouchableOpacity style={style.continueBtn} onPress={() => setVisivel(false)}>
                  <Text style={style.textBtn}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
          visible={modalMap}
        >
          <View style={style.centeredView2}>
            <View style={style.modalView2}>
              <Text style={[style.modalTitle,{fontSize:23}]}>Encontre o endereço!</Text>
              <TouchableOpacity style={{ backgroundColor: 'maroon', width: 16, height: 16, alignItems: 'center', borderRadius: 15, position: 'absolute', top: 10, right: 10, zIndex: 2 }} onPress={() => setModalMap(false)}>
                <Text style={{ fontFamily: 'poppins-bold', fontSize: 10, color: 'white' }}>X</Text>
              </TouchableOpacity>
                <View style={{ width: '100%', height: '90%' }}>
                  <MapView
                    ref={(ref) => setMapView(ref)}
                    onMapReady={() => irParaLocalInicial(regiao)}
                    onRegionChangeComplete={() => mudarRegiao(regiao)}
                    style={style.map}
                    initialRegion={regiao}
                  >
                    <Marker
                      coordinate={regiao}
                    />
                  </MapView>
                  <GooglePlacesAutocomplete
                    currentLocation={false}
                    fetchDetails={true}
                    placeholder={"Procurar"}
                    renderDescription={(row) => row.description}
                    returnKeyType={"search"}
                    enablePoweredByContainer={false}
                    nearbyPlacesAPI='GooglePlacesSearch'
                    textInputProps={{
                      onChangeText: (text) => {
                        console.log(text)
                      }
                    }}
                    onPress={(data, details) => {
                      // 'details' is provided when fetchDetails = true
                      setRegiao({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: regiao.latitudeDelta,
                        longitudeDelta: regiao.longitudeDelta
                      })
                      setEndereco(data.description)
                      irParaLocalInicial({
                        latitude: details.geometry.location.lat,
                        longitude: details.geometry.location.lng,
                        latitudeDelta: regiao.latitudeDelta,
                        longitudeDelta: regiao.longitudeDelta
                      })
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
                        color: "black",
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
        {criarModal}
      </SafeAreaView>
    </View>
  )
}