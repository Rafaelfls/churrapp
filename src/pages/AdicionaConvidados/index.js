import React, {Component} from 'react';
import {View, Text, TouchableOpacity, TextInput, SafeAreaView, ScrollView, FlatList, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

import style from './styles';



const convidadosList = [
  {
    id: '1',
    nome: "Matheus Torres",
    telefone: "19996071004",
    status: '1',
  },
  {
    id: '2',
    nome: "Rafael França",
    telefone: "12996281340",
    status: '2',
  },
  {
    id: '3',
    nome: "Joao Gabriel",
    telefone: "11974374042",
    status: '1',    
  },
  {
    id: '4',
    nome: "Joao Gabriel",
    telefone: "11974374042",
    status: '1',    
  },
  {
    id: '5',
    nome: "Joao Gabriel",
    telefone: "11974374042",
    status: '1',    
  },
]

export default function AdicionaConvidados(){

  const [value, onChangeText] = React.useState('');
  const loginFranca = "0516f9fb26e6be70";
  const loginJoao = "99d8830296d7c838";
  const navigation = useNavigation();

  const inviteStandard = "Ola, Rafael esta te convidadando para o churrasco *Top dos 100*, o valor do churrasco por pessoa ficou 25 reais. Pague pelo app do Churrapp ou para ele pessoalmente."
  const phone = "12996281340";

  function next() {
      navigation.navigate('AdicionarPratoPrincipal');
    }
    
  function backHome(){
    navigation.replace('Tabs', {
      screen: 'Meu Churras', 
      params: {loginFranca, loginJoao}});
  }

  function openContactList(){
    navigation.push('OpenContactList')
  }
  
    WhatsApp = (invite, phone) =>  {
      Linking.canOpenURL(`whatsapp://send?text=${invite}`).then(supported => {
        if (supported) {
          if(invite === ''){
            invite = inviteStandard;
          }
          return Linking.openURL(`whatsapp://send?text=${invite}&phone=+55${phone}`);
        }else{
          return Linking.openURL(`https://api.whatsapp.com/send?phone=+55${phone}&text=${invite}`)
        }
      })
    }

    return(
      <View style={style.container}>
        <SafeAreaView style={style.body}>
            <View style={style.headerGroup}>
            <Text style={style.textHeader}>Convide seus amigos!</Text>
              <TouchableOpacity style={style.exitBtn} onPress={() => backHome(loginJoao)}>
                <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
                <Text style={style.textHeaderBtn}>Sair</Text>
              </TouchableOpacity>
            </View>
            <View style={style.formGroup}>
                <Text style={style.textLabel}>Convite:</Text>
                <TextInput
                  style={style.inputStandard}
                  onChange = { text => onChangeText('') }
                  onChangeText={text => onChangeText(text)}
                  placeholder={inviteStandard}
                />
            </View>

            <FlatList 
            data = {convidadosList}
            keyExtractor={convidadosList => String(convidadosList.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item: convidadosList})=>(  
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
                    <Icon  style={style.listaConvidadosLabelOK} name  = "check"  size = {20}/>
                    }
                    {convidadosList.status == 2 &&
                    <Text style={style.listaConvidadosLabelNOK}>Aguardando confirmação</Text>
                    }                    
                    {convidadosList.status == 2 &&
                    <Icon  style={style.listaConvidadosLabelNOK} name  = "exclamation"  size = {20}/>
                    }
                  </View>
                </View>
              </View> 
            )}
            style={style.listStyle}/>
            
          <ActionButton offsetX={10} offsetY={90} onPress={openContactList}/>  

          <View style={style.footer}>
              <Text style={style.textFooter}>Etapa 2/6</Text>
              <TouchableOpacity style = {style.continueBtn} onPress={next}>
                <Icon style={style.iconBtn} name  = "angle-double-right" size = {20}/>
                <Text style={style.textBtn}>Continuar</Text>
              </TouchableOpacity>
            </View>             
        </SafeAreaView>    
      </View>
    )
}