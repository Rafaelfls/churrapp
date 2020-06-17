import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'
import ImagePicker from '../../components/ImagePicker'

import style from './styles';

export default function CriarChurrasco() {
  const [value, onChangeText] = React.useState('Useless Placeholder');
  const loginFranca = "0516f9fb26e6be70";
  const loginJoao = "bdadea9527f65f1f";
  const navigation = useNavigation();

  function next() {
    navigation.replace('AdicionaConvidados');
  }

  function backHome(){
    navigation.replace('Tabs', {
      screen: 'Meu Churras', 
      params: {loginFranca, loginJoao}});
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
              onChangeText={text => onChangeText(text)}
              placeholder={'Churrasbom'}
            />
            <Text style={style.textLabel}>Local do churrasco:</Text>
            <TextInput
              style={style.inputStandard}
              placeholder={"Alameda santos, 202"}
              onChangeText={text => onChangeText(text)}
            />
            <Text style={style.textLabel}>Descrição:</Text>
            <TextInput
              style={style.inputStandard}
              multiline={true}
              numberOfLines={3}
              placeholder={"O melhor churras do ano"}
              onChangeText={text => onChangeText(text)}
            />
            <View style={style.imagePicker}>
              <ImagePicker />
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Data:</Text>
              <View style={style.picker}>
                <DatePicker />
              </View>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Início:</Text>
              <View style={style.picker}>
                <TimePicker />
              </View>
            </View>
            <View style={style.componentPicker}>
              <Text style={style.textLabel}>Término:</Text>
              <View style={style.picker}>
                <TimePicker />
              </View>
            </View>
          </View>


          <View style={style.footer}>
            <Text style={style.textFooter}>Etapa 1/4</Text>
            <TouchableOpacity style={style.continueBtn} onPress={next}>
              <Icon style={style.iconBtn} name="angle-double-right" size={20} />
              <Text style={style.textBtn}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}