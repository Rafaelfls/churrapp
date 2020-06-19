import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import DatePicker from 'react-native-datepicker';
import * as ImagePicker from 'expo-image-picker';

import style from './styles';

export default function CriarChurrasco() {
  const [value, onChangeText] = React.useState('Useless Placeholder');
  const loginFranca = "0516f9fb26e6be70";
  const loginJoao = "99d8830296d7c838";
  const navigation = useNavigation();
  const [nomeChurras, setNomeChurras] = useState();
  const [local, setlocal] = useState();
  const [hrInicio, sethrInicio] = useState();
  const [hrFim, sethrFim] = useState();
  const [descricao, setdescricao] = useState();
  const [date, setDate] = useState();
  const [image, setImage] = useState(null);

  const config= {
    headers: {'Authorization': loginJoao}
  };

  function next() {
    if(nomeChurras != null && hrInicio != null && date != null && local != null) {
      criarChurras()
      navigation.replace('AdicionaConvidados');
    } else {
      Alert.alert(
        'Digite todos os campos obrigatórios por favor!'
      )
    }
    
  }

  function backHome(){
    navigation.replace('Tabs', {
      screen: 'Meu Churras', 
      params: {loginFranca, loginJoao}});
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
  
   function criarChurras() {
    
    
    return  api.post('/churras', {
      nomeChurras: nomeChurras,
      local: local,
      hrInicio: hrInicio,
      hrFim: hrFim,
      descricao: descricao,
      data: date,
    }, config);

  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <Text style={style.textHeader}>Vamos começar!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => backHome(loginFranca)}>
            <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
            <Text style={style.textHeaderBtn}>Sair</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={style.scrollView}>
          <View style={style.formGroup}>
            <Text style={style.textLabel}>Nome do churrasco:</Text>
            <TextInput
              style={style.inputStandard}
              onChangeText={text => setNomeChurras(text)}
              placeholder={'Churrasbom'}
            />
            <Text style={style.textLabel}>Local do churrasco:</Text>
            <TextInput
              style={style.inputStandard}
              placeholder={"Alameda santos, 202"}
              onChangeText={text => setlocal(text)}
            />
            <Text style={style.textLabel}>Descrição:</Text>
            <TextInput
              style={style.inputStandard}
              multiline={true}
              numberOfLines={3}
              placeholder={"O melhor churras do ano"}
              onChangeText={text => setdescricao(text)}
            />
            <View style={style.imagePicker}>
              <TouchableOpacity style={style.inputDisplay} onPress={pickImage} >
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, paddingVertical: 10 }} />}
              </TouchableOpacity>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Data:</Text>
              <View style={style.picker}>
                <DatePicker
                  style={{width: 200}}
                  date={date}
                  mode="date"
                  placeholder="Escolha a data"
                  format="DD/MM/YYYY"
                  minDate="01/05/2020"
                  maxDate="01/05/2025"
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
                      borderRadius:8,
                      marginLeft: 36
                    },
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {setDate(date)}}
                />
              </View>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Início:</Text>
              <View style={style.picker}>
                <DatePicker
                    style={{width: 200}}
                    date={hrInicio}
                    mode="time"
                    placeholder="Hora de Início"
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
                        borderRadius:8,
                        marginLeft: 36
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(hrInicio) => {sethrInicio(hrInicio)}}
                  />
              </View>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Término:</Text>
              <View style={style.picker}>
                <DatePicker
                    style={{width: 200}}
                    date={hrFim}
                    mode="time"
                    placeholder="Hora de Início"
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
                        borderRadius:8,
                        marginLeft: 36
                      },
                      // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(hrFim) => {sethrFim(hrFim)}}
                  />
              </View>
            </View>
          </View>          
        </ScrollView>
        <View style={style.footer}>
            <Text style={style.textFooter}>Etapa 1/6</Text>
            <TouchableOpacity style={style.continueBtn} onPress={next}>
              <Icon style={style.iconBtn} name="angle-double-right" size={20} />
              <Text style={style.textBtn}>Continuar</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </View>
  )
}