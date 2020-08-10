import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

import style from './styles';

export default function CriarChurrasco() {

  const navigation = useNavigation();
  const [nomeChurras, setNomeChurras] = useState('');
  const [local, setlocal] = useState('');
  const [hrInicio, sethrInicio] = useState('');
  const [hrFim, sethrFim] = useState();
  const [descricao, setdescricao] = useState();
  const [date, setDate] = useState('');
  const [image, setImage] = useState({cancelled:true});
  const [churrasCodeCriado, setChurrasCodeCriado] = useState()
  const [visivel, setVisivel] = useState(false)
  const [url, setUrl] = useState('https://churrappuploadteste.s3.amazonaws.com/default/churrasco_default.png')

  const [borderColorRed1, setBorderColorRed1] = useState(style.formOk);
  const [borderColorRed2, setBorderColorRed2] = useState(style.formOk);
  const [borderColorRed3, setBorderColorRed3] = useState('darkgray');
  const [borderColorRed4, setBorderColorRed4] = useState('darkgray');

  const config = {
    headers: { 'Authorization': USUARIOLOGADO.id }
  };


  function next() {

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
      criarChurras()
      console.log("AQUI2 " + churrasCodeCriado);
      navigation.navigate('AdicionaConvidados', {
        nomeContato: null,
        sobrenomeContato: null,
        telefoneContato: null,
        churrasAtual: {
          churrasCode: churrasCodeCriado,
          nomeChurras: nomeChurras,
          local: local,
          hrInicio: hrInicio,
          hrFim: hrFim,
          descricao: descricao,
          data: date,
          foto_id: 0,
        },
      });
    }

  }

  function backHome() {
    navigation.replace('Tabs');
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  async function criarChurras() {

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
      setUrl(response.location)
      console.log(response.location)
    }

    const response = await api.post('/churras', {
      nomeChurras: nomeChurras,
      local: local,
      hrInicio: hrInicio,
      hrFim: hrFim,
      descricao: descricao,
      data: date,
      fotoUrlC: url,
    }, config)

    setChurrasCodeCriado(response.data);



  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <View>
            <Text style={style.textHeader}>Vamos começar!</Text>
            <Text style={style.textSubHeader}>Insira as informações principais</Text>
          </View>
          <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
            <Icon style={style.iconHeaderBtn} name="md-exit" size={22} />
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scrollView}>
          <View style={style.formGroup}>
            <Text style={style.textLabel}>Nome do churras</Text>
            <TextInput
              style={[style.inputStandard, borderColorRed1]}
              onChangeText={text => setNomeChurras(text)}
              placeholder={'Churrasbom'}
            />
            <Text style={style.textLabel}>Local</Text>
            <TextInput
              style={[style.inputStandard, borderColorRed2]}
              placeholder={"Alameda santos, 202"}
              onChangeText={text => setlocal(text)}
            />
            <Text style={style.textLabel}>Descrição</Text>
            <TextInput
              style={[style.inputStandard, style.formOk]}
              multiline={true}
              numberOfLines={3}
              placeholder={"O melhor churras do ano"}
              onChangeText={text => setdescricao(text)}
            />
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Data</Text>
              <View style={style.picker}>
                <DatePicker
                  style={{ width: 200 }}
                  date={date}
                  mode="date"
                  placeholder="DD/MM/AAAA"
                  format="DD/MM/YYYY"
                  minDate="01/05/2020"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      borderBottomWidth: 1,
                      borderWidth: 0,
                      marginLeft: 36,
                      borderBottomColor: borderColorRed3,
                      fontFamily: 'poppins-regular',
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => { setDate(date) }}
                />
              </View>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Início</Text>
              <View style={style.picker}>
                <DatePicker
                  style={{ width: 200 }}
                  date={hrInicio}
                  mode="time"
                  placeholder="00:00"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      borderBottomWidth: 1,
                      borderWidth: 0,
                      marginLeft: 36,
                      borderBottomColor: borderColorRed4,
                      fontFamily: 'poppins-regular',
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(hrInicio) => { sethrInicio(hrInicio) }}
                />
              </View>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Término</Text>
              <View style={style.picker}>
                <DatePicker
                  style={{ width: 200 }}
                  date={hrFim}
                  mode="time"
                  placeholder="00:00"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      borderBottomWidth: 1,
                      borderWidth: 0,
                      marginLeft: 36,
                      borderBottomColor: 'darkgray',
                      fontFamily: 'poppins-regular',
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(hrFim) => { sethrFim(hrFim) }}
                />
              </View>
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
            <View style={style.imagePicker}>
              <TouchableOpacity style={style.inputDisplay} onPress={pickImage} >
                <IconFA style={style.addImgIcon} name="image" size={100} />
                {image && <Image source={{ uri: image.uri }} style={{ width: 170, height: 170, paddingVertical: 10 }} />}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <View style={style.footer}>
          <TouchableOpacity style={style.continueBtn} onPress={next}>
            <Text style={style.textBtn}>Criar churras</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}