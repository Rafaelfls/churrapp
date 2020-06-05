import React from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import style from './styles';

export default function AdicionaConvidados(){
  const [onChangeText] = React.useState('');
  
  const navigation = useNavigation();

  function next() {
      navigation.replace('CriarChurrasco');
    }
    return(
      <View style={style.container}>
        <SafeAreaView>
          <ScrollView style={style.scrollView}>
            <Text style={style.textHeader}>Vamos começar?</Text>
            
            <View style={style.footer}>
              <Text style={style.textFooter}>Etapa 2/4</Text>
              <TouchableOpacity style = {style.continueBtn} onPress={next}>
                <Icon style={style.iconBtn} name  = "check" size = {20}/>
                <Text style={style.textBtn}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
}