import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, ActivityIndicator,TouchableOpacity } from 'react-native';
import * as Contacts from 'expo-contacts';

import Icon from 'react-native-vector-icons/FontAwesome5';
import style from './styles';

export default class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  loadContacts = async () => {
    const { data } = await Contacts.getContactsAsync();

    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('AdicionaConvidados',{
      nomeContato:item.firstName ,
      sobrenomeContato:item.lastName ,
      telefoneContato: item.phoneNumbers[0].number,
      churrasCodeAtual:null
    })} style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: 'brown', fontWeight: 'bold', fontSize: 26 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      <Text style={{ color: 'gold', fontWeight: 'bold' }}>
        {item.phoneNumbers[0].number}
      </Text>
    </TouchableOpacity>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        ' ' +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={style.container}>
        <SafeAreaView style={style.body}>
          <Text style={style.textHeader}>Adicione os seus convidados!</Text>
          <TextInput
            placeholder="Buscar"
            placeholderTextColor="gold"
            style={{
              backgroundColor: 'brown',
              height: 60,
              fontSize: 25,
              padding: 5,
              paddingLeft: 10,
              color: 'gold',
              borderBottomWidth: 3,
              borderBottomColor: 'gold',
              borderTopWidth: 3,
              borderTopColor: 'gold',
            }}
            onChangeText={value => this.searchContacts(value)}
          />
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            {this.state.isLoading ? (
              <View
                style={{
                  ...StyleSheet.absoluteFill,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ActivityIndicator size="large" color="brown" />
              </View>
            ) : null}
            <FlatList
              data={this.state.contacts}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={() => (
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 50
                  }}
                >
                  <Text style={{ color: 'brown' }}>No Contacts Found</Text>
                </View>
              )}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
