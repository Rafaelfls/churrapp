import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-date-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import style from './styles';
import { useLoadingModal, createLoadingModal, useChurrasCount } from '../../context/churrasContext';

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
  const [dataFormatada, setDataFormatada] = useState()
  const [limiteConfirmacao, setLimiteConfirmacao] = useState();
  const [image, setImage] = useState({ cancelled: true });
  const [churrasCodeCriado, setChurrasCodeCriado] = useState('')
  const [visivel, setVisivel] = useState(false)
  const [modalSair, setModalSair] = useState(false)
  const [url] = useState("https://churrappuploadteste.s3.amazonaws.com/default/churrapp_default.png")

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
    if (local == '') {
      setBorderColorRed2(style.formNok)
    } else {
      setBorderColorRed2(style.formOk)
    }
    if (date == '') {
      setBorderColorRed3('red')
    } else {
      setBorderColorRed3('darkgray')
    }
    if (hrInicio == '') {
      setBorderColorRed4('red')
    } else {
      setBorderColorRed4('darkgray')
    }

    if (nomeChurras == '' ||
      local == '' ||
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
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
      local: local,
      hrInicio: hrInicio,
      hrFim: hrFim,
      descricao: descricao,
      data: date,
      fotoUrlC: novaUrl,
      limiteConfirmacao: limiteConfirmacao,
    }, config).then(function (response) {
      setLoading(false)
      navigation.navigate('AdicionaConvidados', {
        nomeContato: null,
        sobrenomeContato: null,
        telefoneContato: null,
        churrasAtual: {
          churrasCode: response.data.id,
          nomeChurras: nomeChurras,
          local: local,
          hrInicio: hrInicio,
          hrFim: hrFim,
          descricao: descricao,
          data: dataFormatada,
          limiteConfirmacao: limiteConfirmacao,
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
  function formatDataInicio(data) {
    var hours = data.getHours();
    var min = data.getMinutes();
    var sec = data.getSeconds();
    console.log(hours)
    if (hours == 0) {
      hours = "00"
      sethrInicio(hours + ':' + min + ':' + sec)
    } else {
      sethrInicio(hours + ':' + min + ':' + sec)
    }
    console.log(hrInicio)
  }
  function formatDataFim(data) {
    var hours = data.getHours();
    var min = data.getMinutes();
    var sec = data.getSeconds();

    sethrFim(hours + ':' + min + ':' + sec)
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
            <Text style={style.textLabel}>Local</Text>
            <View>
              <TextInput
                style={[style.inputStandard, borderColorRed2]}
                placeholder={"Local do churrasco"}
                onChangeText={text => setlocal(text)}
                value={local}
              />
            </View>
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
            <DatePicker
              style={{ marginBottom: 10 }}
              date={date}
              mode="date"
              locale="pt"
              format="DD/MM/YYYY"
              minimumDate={new Date()}
              onDateChange={(date) => { setDate(date); formatData(date); console.log(date) }}
            />
            <Text style={style.textLabel}>Início</Text>
            <DatePicker
              style={{ marginBottom: 10 }}
              date={hrInicio}
              mode="time"
              placeholder="00:00"
              onDateChange={(hrInicio) => { formatDataInicio(hrInicio); }}
            />
            <Text style={style.textLabel}>Término</Text>
            <DatePicker
              style={{ marginBottom: 10 }}
              date={hrFim}
              mode="time"
              onDateChange={(hrFim) => { formatDataFim(hrFim) }}
            />
            <Text style={style.textLabel}>Confirmação de presença até</Text>
            <DatePicker
              style={{ marginBottom: 10 }}
              date={limiteConfirmacao}
              mode="date"
              locale='pt'
              format="DD/MM/YYYY"
              minimumDate={new Date()}
              maximumDate={date}
              onDateChange={(date) => { setLimiteConfirmacao(date) }}
            />
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
        {criarModal}
      </SafeAreaView>
    </View>
  )
}