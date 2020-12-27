import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity, SafeAreaView, TextInput, ActivityIndicator } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native'

import IconFea from 'react-native-vector-icons/Feather';

import style from './styles';

export default function OpenContactListCompartilhar() {

  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [valueSearch, setValueSearch] = useState('');
  const [contactsMemory, setContactsMemory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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


  return (
    <View style={style.container}>
      <SafeAreaView style={style.body}>
        <View style={{ flexDirection: "row", marginLeft: 10, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('CompartilharConvidados', {
              nomeContato: null,
              telefoneContato: null,
              churrasCodeAtual: null
            })
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
                      <TouchableOpacity onPress={() => navigation.navigate('CompartilharConvidados', {
                        nomeContato: contacts.nome,
                        telefoneContato: contacts.celular,
                        churrasCodeAtual: null
                      })} style={{ minHeight: 70, padding: 5, paddingHorizontal: 20 }}>
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
    </View>
  );
}