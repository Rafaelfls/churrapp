import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import api from '../../services/api';

import style from './styles';

export default function ParticiparChurrasco() {

    const navigation = useNavigation();

    function backHome() {
        navigation.replace('Tabs')
    }

    function LerQR() {
        navigation.replace('QRCodeLeitor');
    }

    return (

        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={backHome}>
                    <IconOct name="chevron-left" size={25} style={style.backBtn} />
                </TouchableOpacity>
                <Text style={style.titulo}>Participar do churras</Text>
            </View>
            <View style={style.conteudo}>
                <Text style={style.inserirText}>Insira o código do churras</Text>
                <TextInput
                    style={style.inputStandard}
                    onChangeText={text => onChangeText(text)}
                    placeholder={'#XXXXXX'}
                />
                <TouchableOpacity style={style.enterBtn} onPress={backHome}>
                    <Text style={style.textBtn}>Entrar</Text>
                </TouchableOpacity>
                <Text style={style.ou}>ou</Text>
                <TouchableOpacity style={style.enterBtn} onPress={LerQR}>
                    <IconFA name="qrcode" size={40} style={style.qrBtn} />
                    <Text style={style.textBtn}>Ler QR Code</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}