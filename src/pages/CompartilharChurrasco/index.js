import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import api from '../../services/api';

import qrCode from '../../assets/qrCode.jpg';

import style from './styles';
import styles from '../DetalheChurras/styles';

export default function CompartilharChurrasco() {
    const route = useRoute();
    const churras = route.params.churras;

    const navigation = useNavigation();

    function goBack() {
        navigation.goBack()
    }

    return (

        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity onPress={goBack}>
                    <IconOct name="chevron-left" size={25} style={style.backBtn} />
                </TouchableOpacity>
                <Text style={style.titulo}>Compartilhar</Text>
            </View>

            <View style={style.conteudoContainer}>
                <Text style={style.nomeChurras} >{churras.nomeChurras}</Text>
                <View style={style.churrasLocalContainer}>
                    <IconFA name="map-o" size={20} style={style.localIcon} />
                    <Text style={style.churrasLocal}>{churras.local}</Text>
                </View>
                <View style={style.churrasDataContainer}>
                    <IconEnt name="calendar" size={22} style={style.dataIcon} />
                    <Text style={style.churrasData}>{churras.data} - {churras.hrInicio}</Text>
                </View>
                <Text style={style.codigo}>{churras.churrasCode}</Text>
                <Image source={qrCode} style={style.qrCode}/>
                <TouchableOpacity onPress={goBack} style={style.shareBtn}>
                    <Text style={style.shareText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>

        </View>

    )
}