import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

import style from './styles';

export default function InicioCriaChurras() {

    const navigation = useNavigation();

    function next() {
        navigation.navigate('CriarChurrasco');
    }

    return (
        <View style={style.container}>
            <View style={style.textContainer}>
                <Text style={style.textHeader10}>Vamos marcar um churrasco?</Text>
                <Text style={style.textHeader2}>Estamos aqui para te ajudar.</Text>
            </View>
            <View style={style.btnContainer}>
                <Text style={style.textHeader3}>São apenas 6 etapas!</Text>
                <TouchableOpacity style={style.continueBtn} onPress={() => next()}>
                    <Text style={style.textBtn}>Começar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}