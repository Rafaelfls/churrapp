import React from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';

import logoImg from '../../assets/logo.jpg';

import style from './styles';

const churras= [
    {
        id: 1,
        data: "10/06/2020",
        nome: "Matheus Torres",

    }
]

export default function ResumoChurras(){
    const navigation = useNavigation();

    function logout() {
        navigation.replace('Login');
      }
      
      function criarChurras() {
        navigation.replace('CriarChurrasco');
      }

    return(

        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.textHeader}>Churrapp</Text>
                <TouchableOpacity onPress={logout}>
                    <Icon             name  = "sign-out-alt" size = {25}/>
                </TouchableOpacity>
            </View>

            <FlatList
                data={churras}
                style={style.churrasList}
                keyExtractor={churras => String(churras)}
                renderItem={({item: churras}) => (
                    <View style={style.churras}>
                        <Text>{churras.data}</Text>

                    </View>
                )}
            />
            
            <ActionButton>
                <ActionButton.Item  title="Criar Churras" onPress={criarChurras}>
                    <Icon name="plus" style={style.fabBtn}/>
                </ActionButton.Item>
                <ActionButton.Item  title="Participar do Churras" onPress={() => {}}>
                    <Icon name="users" style={style.fabBtn}/>
                </ActionButton.Item>
            </ActionButton>
            
        </View>

    )
}