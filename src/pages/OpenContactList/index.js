import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator, Modal, ToastAndroid } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native'
import IconFea from 'react-native-vector-icons/Feather';
import * as Crypto from 'expo-crypto';
import api from '../../services/api';

import style from './styles';

export default function OpenContactList({ route }) {

  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [contactsMemory, setContactsMemory] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adicionado, setAdicionado] = useState(false);
  const [DDD, setDDD] = useState([false])
  const [ddd, setddd] = useState('')
  const { churrasCode } = route.params;
  const { churrasAtual } = route.params;

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          var contactList = []
          data.map(user => {
            if (user.phoneNumbers) {
              contactList.push({ nome: user.name, celular: user.phoneNumbers[0].number })
            }
          })
          setContacts(contactList)
          setContactsMemory(contactList)
          setIsLoading(false)
        }
      }
    })();
  }, []);

  function searchContacts(value) {
    const filteredContacts = contactsMemory.filter(contact => {
      let contactLowercase = (
        contact.nome
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    setContacts(filteredContacts)
  };

  async function criaSenha($senha) {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      $senha
    );
  }

  async function addContactFinal($nome, $celular) {
    setDDD([false])
    let senhaProvisoria = $celular.substring($celular.length - 9)
    var senhaFinal = await criaSenha(senhaProvisoria)

    const response = await api.post('/usuarios', {
      nome: $nome,
      sobrenome: 'sobrenome',
      email: $celular + "@churrapp",
      cidade: "cidade",
      uf: "uf",
      idade: "02/01/1900",
      fotoUrlU: "https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png",
      celular: $celular,
      cadastrado: false,
      apelido: $nome,
      senha: senhaFinal,
      pontoCarne_id: 0,
      carnePreferida_id: 0,
      quantidadeCome_id: 0,
      bebidaPreferida_id: 0,
      acompanhamentoPreferido_id: 0
    }).then(async function (response) {
      await api.post(`/convidadosChurras/${response.data.usuario[0].id}`, {
        valorPagar: "00",
        churras_id: churrasCode
      }).then(() => {
        showToast()
      })
    })
  }

  function showToast() {
    ToastAndroid.showWithGravityAndOffset(
      "Contato adicionado!", ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      150
    );
    searchContacts('');
    setValueSearch('');
  }

  async function addContact($nome, $celular) {
    $celular = $celular
      .replace("+55", "")
      .replace(/-/g, "")
      .replace(/\s/g, "")
      .replace(/[()]/g, "");

    if ($celular.length > 11) {
      $celular = $celular.substring($celular.length - 11)
    }

    if ($celular.length == 9) {
      setDDD([true, $nome, $celular])
    } else {
      addContactFinal($nome, $celular)
    }
  }


  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={{ flexDirection: "row", marginLeft: 10, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.replace('AdicionaConvidados', { churrasAtual })
            }
          >
            <IconFea style={style.iconHeaderBtn} name="chevron-left" size={22} />
          </TouchableOpacity>
          <Text style={style.textHeader}>Adicione os seus convidados!</Text>
        </View>
        <TextInput
          placeholder="Buscar"
          placeholderTextColor="gray"
          style={{
            backgroundColor: 'white',
            height: 45,
            fontFamily: 'poppins-medium',
            fontSize: 15,
            paddingLeft: 5,
            marginHorizontal: 20,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
          }}
          value={valueSearch}
          onChangeText={value => { searchContacts(value); setValueSearch(value) }}
        />
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {isLoading
            ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 30,
                }}
              >
                <ActivityIndicator size="large" color="maroon" />
              </View>
            ) : null}
          <FlatList
            data={contacts}
            keyExtractor={(item, idx) => contacts.celular}
            showsVerticalScrollIndicator={false}
            style={style.churrasList}
            renderItem={({ item: contacts }) => (
              <View>
                {contacts.celular == 55 + USUARIOLOGADO.celular
                  ? null
                  : contacts.celular === '055' + USUARIOLOGADO.celular
                    ? null
                    : contacts.celular === USUARIOLOGADO.celular
                      ? null
                      :
                      <TouchableOpacity onPress={() => addContact(contacts.nome, contacts.celular)}
                        style={{ minHeight: 70, padding: 5, paddingHorizontal: 20 }}>
                        <Text style={{ color: 'black', fontFamily: 'poppins-semi-bold', fontSize: 18 }}>
                          {contacts.nome}
                        </Text>
                        <Text style={{ color: 'gray', fontFamily: 'poppins-medium' }}>
                          {contacts.celular}
                        </Text>
                      </TouchableOpacity>
                }
              </View>
            )}
          />

        </View>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={adicionado}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalTitle}>Adicionado!</Text>
            <Text style={style.modalText}>Convidado adicionado com sucesso!</Text>
            <View style={style.footerModal}>
              <TouchableOpacity style={style.salvarBtn} onPress={() => { setAdicionado(false), searchContacts(''); setValueSearch('') }}>
                <Text style={style.textBtn}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={DDD[0]}
      >
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalTitle}>Ops!</Text>
            <Text style={style.modalText}>Esta faltando o DDD do seu contato!</Text>
            <Text style={style.textLabel}>DDD:</Text>
            <TextInput
              style={style.inputStandard}
              value={ddd}
              placeholder={"19"}
              onChangeText={text => setddd(text)}
            />
            <TouchableOpacity onPress={() => { setdescricao('') }} style={style.cleanInput}>
              <Text style={style.mudarSenha}>X</Text>
            </TouchableOpacity>
            <View style={style.footerModal}>
              <TouchableOpacity style={style.sairBtn} onPress={() => setDDD([false])}>
                <Text style={style.iconExitBtn}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.salvarBtn} onPress={() => addContactFinal(DDD[1], DDD[2])}>
                <Text style={style.textBtn}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}