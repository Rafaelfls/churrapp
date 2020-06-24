import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

import style from './styles';

export default function AdicionaConvidados({ route, navigation }) {

  const [value, onChangeText] = React.useState('');
  const convidadosList = []

  const { nomeContato } = route.params;
  const { telefoneContato } = route.params;

  if (nomeContato != null) {
    convidadosList.push({
      nome: nomeContato,
      telefone: telefoneContato,
      status: 2
    })
  }
  const inviteStandard = "Ola, Rafael esta te convidadando para o churrasco *Top dos 100*, o valor do churrasco por pessoa ficou 25 reais. Pague pelo app do Churrapp ou para ele pessoalmente."



  function next() {
    const convidadosQtd = convidadosList.length
    navigation.navigate('AdicionarPratoPrincipal', { convidadosQtd });
  }

  function backHome() {
    navigation.replace('Tabs');
  }

  function openContactList() {
    navigation.push('OpenContactList')
  }

    return(
      <View style={style.container}>
        <SafeAreaView style={style.body}>
            <View style={style.headerGroup}>
            <Text style={style.textHeader}>Convide a galera!</Text>
              <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
                <Text style={style.textHeaderBtn}>Sair</Text>
              </TouchableOpacity>
            </View>
            <View style={style.formGroup}>
                <Text style={style.textLabel}>Mensagem</Text>
                <TextInput
                  style={style.inputStandard}
                  onChange = { text => onChangeText('') }
                  onChangeText={text => onChangeText(text)}
                  placeholder={inviteStandard}
                />
            </View>

  /* WhatsApp = (invite, telefoneContato) => {
     Linking.canOpenURL(`whatsapp://send?text=${invite}`).then(supported => {
       if (supported) {
         if (invite === '') {
           invite = inviteStandard;
         }
         return Linking.openURL(`whatsapp://send?text=${invite}&phone=${telefoneContato}`);
       } else {
         return Linking.openURL(`https://api.whatsapp.com/send?phone=${telefoneContato}&text=${invite}`)
       }
     })
   }*/


  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
            <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
            <Text style={style.textHeaderBtn}>Sair</Text>
          </TouchableOpacity>
        </View>
        <View style={style.formGroup}>
          <Text style={style.textLabel}>Convite:</Text>
          <TextInput
            style={style.inputStandard}
            onChange={text => onChangeText('')}
            onChangeText={text => onChangeText(text)}
            placeholder={inviteStandard}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={convidadosList => String(convidadosList.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: convidadosList }) => (
            <View style={style.listaConvidados}>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>Nome:</Text>
                <Text style={style.listaConvidadosLabel}>{convidadosList.nome}</Text>
              </View>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>Telefone:</Text>
                <Text style={style.listaConvidadosLabel}>{convidadosList.telefone}</Text>
              </View>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>Status:</Text>
                <View style={style.listaConvidadosItem}>
                  {convidadosList.status == 1 &&
                    <Text style={style.listaConvidadosLabelOK}>Presença confirmada</Text>
                  }
                  {convidadosList.status == 1 &&
                    <Icon style={style.listaConvidadosLabelOK} name="check" size={20} />
                  }
                  {convidadosList.status == 2 &&
                    <Text style={style.listaConvidadosLabelNOK}>Aguardando confirmação</Text>
                  }
                  {convidadosList.status == 2 &&
                    <Icon style={style.listaConvidadosLabelNOK} name="exclamation" size={20} />
                  }
                </View>
              </View>
            </View>
          )}
          style={style.listStyle} />

        <ActionButton offsetX={10} offsetY={90} onPress={openContactList} />

          <View style={style.footer}>
          <TouchableOpacity style={style.continueBtn} onPress={next}>
            <Text style={style.textBtn}>Convidar</Text>
          </TouchableOpacity>
        </View>            
        </SafeAreaView>    
      </View>
    )
