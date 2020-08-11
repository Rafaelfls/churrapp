import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, FlatList, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';

import style from './styles';
import { max } from 'react-native-reanimated';

export default function AdicionaConvidados({ route, navigation }) {

  const [value, onChangeValue] = React.useState("20,50");
  const [convite, onChangeText] = React.useState('');
  const [novoUsuario, setNovoUsuario] = React.useState([]);
  const [maxChar, setMaxChar]=React.useState(190);
  var convidadosList = new FormData();

  const { data } = route.params;
  const { churrasAtual } = route.params;

console.log(data)

  // useEffect(() => {
  //   if (nomeContato != null) {
  //     if (sobrenomeContato != undefined) {
  //       convidadosList.push({
  //         id: convidadosList.length,
  //         nome: nomeContato,
  //         sobrenome: sobrenomeContato,
  //         telefone: telefoneContato,
  
  //       })
  //     } else {
  //       convidadosList.push({
  //         id: convidadosList.length,
  //         nome: nomeContato,
  //         sobrenome: "",
  //         telefone: telefoneContato,
  
  //       })
  //     }
  //   }  
  // }, [nomeContato]); 

  const inviteStandard = `Olá, estou te convidadando para o churrasco ${churrasAtual.nomeChurras}, no dia ${churrasAtual.data} as ${churrasAtual.hrInicio} no local ${churrasAtual.local} o valor do churrasco por pessoa ficou R$${value}. Acesse o Churrapp para confirmar a sua presença.`
  
  function updateMsg(text){
    onChangeText(text)
    var atual = 190-text.length
    setMaxChar(atual)
  }

  async function criaListaConvidados(convid) {
    console.log(convid)

    const response = await api.post('/usuario', {
      nome: convid.nome,
      sobrenome: convid.sobrenome,
      email: "email@email.com",
      cidade: "cidade",
      uf: "uf",
      idade: 0,
      joined: '00/00/00',
      celular: convid.telefone,
      apelido: convid.nome,
      cadastrado: false,
      pontoCarne_id: false,
      carnePreferida_id: false,
      quantidadeCome_id: false,
      bebidaPreferida_id: false,
      acompanhamentoPreferido_id: false
    })
    setNovoUsuario([...novoUsuario, ...response.data]);

    console.log(novoUsuario.id)

    /*await api.post(`/convidadosChurras?usuario_id=${novoUsuario.id}`, {
      valorPagar: value,
      churras_id: churrasCodeAtual
    })*/

  }

  function apagaConvidado(convidado){
    var valueConvidado = convidadosList.indexOf(convidado.nome)
    convidadosList = convidadosList.splice(1,1)
  }

  function next() {
    const convidadosQtd = convidadosList.length

    convidadosList.map(convid => enviaMensagens(convid.telefone,convite))

    navigation.navigate('AdicionarPratoPrincipal', { convidadosQtd });

    convidadosList = []
  }

  function backHome() {
    convidadosList = []
    navigation.replace('Tabs');
  }

  function openContactList() {
    navigation.push('OpenContactList')
  }

  function enviaMensagens(telefone, convite) {
    console.log("Telefone: "+ telefone + " convite: "+convite)
    Linking.canOpenURL(`whatsapp://send?text=${convite}`).then(supported => {
      if (supported) {
        if (convite === '') {
          convite = inviteStandard;
        }
        return Linking.openURL(`whatsapp://send?text=${convite}&phone=${telefone}`);
      } else {
        return Linking.openURL(`https://api.whatsapp.com/send?phone=${telefone}&text=${convite}`)
      }
    })
  }

  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={style.headerGroup}>
          <Text style={style.textHeader}>Convide seus amigos!</Text>
          <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
            <Icon style={style.iconHeaderBtn} name="md-exit" size={22} />
          </TouchableOpacity>
        </View>
        <View style={style.formGroup}>
          <Text style={style.textLabel}>Mensagem ({maxChar})</Text>
          <TextInput
            style={[style.inputStandard,{height:100}]}
            multiline={true}
            numberOfLines= {2}
            maxLength= {190}
            onChange={text => onChangeText('')}
            onChangeText={text => updateMsg(text)}
            placeholder={inviteStandard}
          />
        </View>

        <FlatList
          data={convidadosList}
          keyExtractor={convidadosList => String(convidadosList.id)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: convidadosList }) => (
            <TouchableOpacity style={style.listaConvidados} onPress={() => apagaConvidado(convidadosList)}>
              <View style={style.listaConvidadosItem}>
                <Text style={style.listaConvidadosLabel}>{convidadosList.nome} {convidadosList.sobrenome}</Text>
              </View>
              <View style={style.listaConvidadosItem}>
                <IconFA style={style.phoneIcon} name="phone" size={16} />
                <Text style={style.listaConvidadosLabelNum}>{convidadosList.telefone}</Text>
              </View>
            </TouchableOpacity>
          )}
          style={style.listStyle} />

        <ActionButton offsetX={10} offsetY={95} onPress={openContactList} />

        <View style={style.footer}>
          <TouchableOpacity style={style.continueBtn} onPress={next}>
            <Text style={style.textBtn}>Convidar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
