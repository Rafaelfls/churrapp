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

  function getStatus (convidado){
    if(convidado == 1){
        return 'Presença confirmada'
    }else if(convidado == 2){
        return'Aguardando confirmação'
    }

  }

  const [value, onChangeText] = React.useState('');
  
  const navigation = useNavigation();

  const inviteStandard = "Ola, Rafael esta te convidadando para o churrasco *Top dos 100*, o valor do churrasco por pessoa ficou 25 reais. Pague pelo app do Churrapp ou para ele pessoalmente."
  const phone = "19983282931";

  function next() {
      navigation.navigate('AdicionarPratoPrincipal');
    }
    
  function backHome(){
    navigation.replace('Tabs')
  }

  function openContactList(){
    navigation.push('OpenContactList')
  }
  
    WhatsApp = (invite, phone) =>  {
      console.log(invite, phone)
      if(invite === ''){
        invite = inviteStandard;
      }
      Linking.openURL(`whatsapp://send?text=${invite}&phone=+55${phone}`);
    }

    return(
      <View style={style.container}>
        <SafeAreaView style={style.body}>
            <View style={style.headerGroup}>
            <Text style={style.textHeader}>Convide seus amigos!</Text>
              <TouchableOpacity style={style.exitBtn} onPress={backHome}>
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
                    <Icon  style={style.listaConvidadosLabel} name  = "exclamation" size = {20}/>
                    <Text style={style.listaConvidadosLabel}>{getStatus(convidadosList.status)}</Text>
                  </View>
                </View>
              </View> 
            )}
            style={style.listStyle}/>
            
          <ActionButton offsetX={10} offsetY={90} onPress={openContactList}/>  

          <View style={style.footer}>
              <Text style={style.textFooter}>Etapa 2/4</Text>
              <TouchableOpacity style = {style.continueBtn} onPress={next}>
                <Icon style={style.iconBtn} name  = "angle-double-right" size = {20}/>
                <Text style={style.textBtn}>Continuar</Text>
              </TouchableOpacity>
            </View>             
        </SafeAreaView>    
      </View>
    )
}