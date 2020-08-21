import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';


import style from './styles';

export default function ParticiparChurrasco() {

    const navigation = useNavigation();

    const [text, onChangeText] = useState();
    const [churras_id, setChurras_id] = useState();

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };


    function backHome() {
        navigation.replace('Tabs')
    }

    function LerQR() {
        navigation.push('QRCodeLeitor');
    }


    function entrarChurrasco() {
        api.post(`/convidadosChurras/${USUARIOLOGADO.id}`, {
            valorPagar: 30,
            churras_id: churras_id
        });
        console.log("POSTADO " + USUARIOLOGADO.id + " - " + churras_id)

        return navigation.replace('Tabs')
    }

    return (

        <View style={style.container}>
            <View style={style.header}>
                <View style={style.exitBtn}>
                    <TouchableOpacity onPress={() => backHome()}>
                        <Icon name="arrow-left" size={25}/>
                    </TouchableOpacity>
                </View>
                <Text style={style.titulo}>Participar do churras</Text>
                <TouchableOpacity style={style.qrBtn} onPress={LerQR}>
                    <IconFA name="qrcode" size={30} style={style.qrIcon} />
                </TouchableOpacity>
            </View>
            <View style={style.conteudo}>
                <Text style={style.inserirText}>Insira o código do churras</Text>
                <TextInput
                    style={style.inputStandard}
                    onChangeText={text => setChurras_id(text)}
                    placeholder={'000000000000000'}
                />
            </View>
            <View style={style.btnsContainer}>
                <TouchableOpacity style={style.enterBtn} onPress={entrarChurrasco}>
                    <Text style={style.textBtn}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}