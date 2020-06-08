import React from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import * as Permissions from 'expo-permissions';

import style from './styles';

export default function AdicionaConvidados(){

  const [onChangeText] = React.useState('');
  
  const navigation = useNavigation();

  async function askPermission(){
    const { status, permissions } = await Permissions.askAsync(Permissions.CONTACTS);
  }
  
  function next() {
      navigation.replace('CriarChurrasco');
    }


    return(
      <View style={style.container}>
        <SafeAreaView>
          <ScrollView style={style.scrollView}>
            <Text style={style.textHeader}>Convide seus amigos!</Text>

            <FlatList></FlatList>

            
            
            <View style={style.footer}>
              <Text style={style.textFooter}>Etapa 2/4</Text>
              <TouchableOpacity style = {style.continueBtn} onPress={next}>
                <Icon style={style.iconBtn} name  = "check" size = {20}/>
                <Text style={style.textBtn}>Continuar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
        
        <ActionButton onPress={askPermission} />
      </View>
    )
}