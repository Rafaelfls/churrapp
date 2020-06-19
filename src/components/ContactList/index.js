import React from 'react';
import {StyleSheet,Text,View,TextInput,SafeAreaView,FlatList,ActivityIndicator} from 'react-native';
import * as Contacts from 'expo-contacts';

export default class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      contacts: []
    };
  }

  loadContacts = async () => {
    console.log("loadContacts")
    const { data } = await Contacts.getContactsAsync();

    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    console.log("componentDidMount")
    this.setState({ isLoading: true });
    this.loadContacts();
  }

  renderItem = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: 'brown', fontWeight: 'bold', fontSize: 26 }}>
        {item.firstName + ' '}
        {item.lastName}
      </Text>
      <Text style={{ color: 'gold', fontWeight: 'bold' }}>
        {item.phoneNumbers[0].number}
      </Text>
    </View>
  );

  searchContacts = value => {
    console.log("searchContacts")
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
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: 'white' }} />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});