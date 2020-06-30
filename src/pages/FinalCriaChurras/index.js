import React from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView ,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import style from './styles';

export default function FinalCriaChurras(){
    
    const navigation = useNavigation();

    function next() {
        navigation.replace('Tabs');
    }

    return(
        <View style={style.container}>
            <View style={style.textContainer}>
                <Text style={style.textHeader10}>Pronto!</Text>                          
                <Text style={style.textHeader2}>Seu churrasco foi criado!</Text>
                <Text style={style.textHeader2}>Foi fácil, né?</Text>
            </View>
            <View style={style.btnContainer}>
                <Text style={style.textHeader3}>Aproveita!</Text>
                <TouchableOpacity style = {style.continueBtn} onPress={() => next()}>
                    <Text style={style.textBtn}>Concluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}