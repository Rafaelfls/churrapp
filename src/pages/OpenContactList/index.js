import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import ContacList from '../../components/ContactList'

import style from './styles';


export default function OpenContactList(){
  const navigation = useNavigation();

  function next() {
      navigation.replace('CriarChurrasco');
    }
    
  function backHome(){
    navigation.replace('Tabs')
  }
  
    return(
      <View style={style.container}>
        <SafeAreaView style={style.body}>
            <Text style={style.textHeader}>Adicione os seus convidados!</Text>

            <ContacList/>          
        </SafeAreaView>    
      </View>
    )
}