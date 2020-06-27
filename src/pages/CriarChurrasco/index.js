import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';
import IconFea from 'react-native-vector-icons/Feather';
import IconFA from 'react-native-vector-icons/FontAwesome';

import style from './styles';

export default function CriarChurrasco() {
  
  const navigation = useNavigation();
  const [nomeChurras, setNomeChurras] = useState();
  const [local, setlocal] = useState();
  const [hrInicio, sethrInicio] = useState();
  const [hrFim, sethrFim] = useState();
  const [descricao, setdescricao] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState(null);
  const [churrasCodeCriado, setChurrasCodeCriado] = useState()

  const config = {
    headers: { 'Authorization': USUARIOLOGADO }
  };
  

  function next() {
    if (nomeChurras != null && hrInicio != null && date != null && local != null) {
      criarChurras()
      console.log("AQUI2 " + churrasCodeCriado);
      navigation.navigate('AdicionaConvidados',{
        nomeContato:null ,
        sobrenomeContato:null,
        telefoneContato: null,
        churrasCodeAtual:churrasCodeCriado,
      });
    } else {
      Alert.alert(
        'Digite todos os campos obrigatórios por favor!'
      )
    }

  }

  function backHome() {
    navigation.replace('Tabs');
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function criarChurras() {


    const response = await api.post('/churras', {
      nomeChurras: nomeChurras,
      local: local,
      hrInicio: hrInicio,
      hrFim: hrFim,
      descricao: descricao,
      data: date,
      foto: image,
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
            <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
            <Text style={style.textHeaderBtn}>Sair</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scrollView}>
          <View style={style.formGroup}>
            <Text style={style.textLabel}>Nome do churras</Text>
            <TextInput
              style={style.inputStandard}
              onChangeText={text => setNomeChurras(text)}
              placeholder={'Churrasbom'}
            />
            <Text style={style.textLabel}>Local</Text>
            <TextInput
              style={style.inputStandard}
              placeholder={"Alameda santos, 202"}
              onChangeText={text => setlocal(text)}
            />
            <Text style={style.textLabel}>Descrição</Text>
            <TextInput
              style={style.inputStandard}
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
                      fontFamily: 'poppins-regular',
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(hrFim) => { sethrFim(hrFim) }}
                />
              </View>
            </View>
            <View style={style.imagePicker}>
              <TouchableOpacity style={style.inputDisplay} onPress={pickImage} >
                <IconFA style={style.addImgIcon} name="image" size={100} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingVertical: 10 }} />}
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