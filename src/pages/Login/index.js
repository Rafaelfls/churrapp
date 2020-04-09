import React from 'react';
import {View, Image, Text} from 'react-native';

import style from './styles';

import logo from '../../assets/logo.jpg'

export default function Calculadora(){
    return(
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logo}/>
                <Text style={style.titulo}>Churrapp</Text>
            </View>
        </View>
    );
}