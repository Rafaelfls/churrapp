import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactList() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
        });

        if (data.length > 0) {
            for(let i = 0 ; i <data.length; i++){
                const contact = data[i];
                console.log(contact.name +  contact.phoneNumbers[0].number);
            }
        }
      }
    })();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text></Text>
    </View>
  );
}