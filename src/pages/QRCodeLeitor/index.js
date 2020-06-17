import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import api from '../../services/api';

import style from './styles';

export default function QRCodeLeitor() {

    const navigation = useNavigation();

    function backHome() {
        navigation.replace('Tabs')
    }

    return (

        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity onPress={backHome}>
                    <IconOct name="chevron-left" size={25} style={style.backBtn} />
                </TouchableOpacity>
                <Text style={style.titulo}>Ler QR</Text>
            </View>
        </View>

        

    )
}