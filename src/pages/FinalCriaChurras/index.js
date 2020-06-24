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
            </View>
            <Text style={style.textHeader2}>Você acabou de organizar um churrasco.</Text>
            <Text style={style.textHeader3}>Foi facil né.</Text>
            <Text style={style.textHeader4}>Boa curtição</Text>
            
            
            <TouchableOpacity style = {style.continueBtn} onPress={next}>
                <Icon style={style.iconBtn} name  = "angle-double-right" size = {30}/>
                <Text style={style.textBtn}>Concluir</Text>
            </TouchableOpacity>
        </View>
    )
}