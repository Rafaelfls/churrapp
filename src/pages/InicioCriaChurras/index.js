import React from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView ,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'
import ImagePicker from '../../components/ImagePicker'

import style from './styles';

export default function CriarChurrasco(){
    const [onChangeText] = React.useState('');
    
    const navigation = useNavigation();

    function next() {
        navigation.replace('CriarChurrasco');
      }

    return(
        <View style={style.container}>
            <View style={style.textContainer}>
                <Text style={style.textHeader10}>Vamos marcar</Text>
                <Text style={style.textHeader01}>um churrasco?</Text>
            </View>
            <Text style={style.textHeader2}>Estamos aqui para te ajudar.</Text>
            <Text style={style.textHeader3}>São apenas 4 etapas!</Text>
            
            
            <TouchableOpacity style = {style.continueBtn} onPress={next}>
                <Icon style={style.iconBtn} name  = "angle-double-right" size = {30}/>
                <Text style={style.textBtn}>Começar</Text>
            </TouchableOpacity>
        </View>
    )
}