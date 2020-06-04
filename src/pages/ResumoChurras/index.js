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
        local: "Alphaville",
        hrInicio: "16:00h",
        hrFim: "21:00h",
        numConvidados: "19"
    },
    {
        id: 2,
        data: "05/09/2020",
        nome: "Rafael França",
        local: "St. Antonio de Jesus",
        hrInicio: "12:00h",
        hrFim: "17:30h",
        numConvidados: "6"
    },
    {
        id: 3,
        data: "25/06/2020",
        nome: "João Chioda",
        local: "Jaboticabal",
        hrInicio: "11:00h",
        hrFim: "21:00h",
        numConvidados: "4"
    },
    {
        id: 4,
        data: "01/07/2020",
        nome: "Marcus Brocaneli",
        local: "Sumaré",
        hrInicio: "18:00h",
        hrFim: "01:00h",
        numConvidados: "8"
    },
    {
        id: 5,
        data: "10/06/2020",
        nome: "Tacio Barreto",
        local: "Fora do Brasil",
        hrInicio: "09:00h",
        hrFim: "23:59h",
        numConvidados: "89"
    },
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
                <View style={style.signOutBtn}>
                    <TouchableOpacity onPress={logout}>
                        <Icon             name  = "sign-out-alt" size = {25}/>
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={churras}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={churras => String(churras)}
                renderItem={({item: churras}) => (
                    <View style={style.churras}>
                        <Text style={style.churrasTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
                        <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
                        <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
                        <Text style={style.churrasData}>Número de convidados: {churras.numConvidados} </Text>
                        <Text style={style.churrasData}>Local: {churras.local}</Text>

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