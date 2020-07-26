import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import api from '../../services/api';

import style from './styles';

export default function LoginCelular() {

    const navigation = useNavigation();
    const [celularUser, setCelularUser] = useState();
    const [usuarioLogado, setUsuarioLogado] = useState();
    global.USUARIOLOGADO = null;

    async function navigateToResumo() {
        var celular = "0" + celularUser;
        console.log(celular)
        const response = await api.get(`/usuarios/${celular}`);

        setUsuarioLogado(response.data);
        
        USUARIOLOGADO = usuarioLogado
        console.log(response)
        //navigation.replace('Tabs');
    }

    function backHome() {
        navigation.goBack();
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                    <Icon style={style.iconHeaderBtn} name="arrow-left" size={22} />
                </TouchableOpacity>
            </View>
            <Text style={style.title}>Seja bem vindo de volta!</Text>
            <Text style={style.subtitle}>Entre com seu celular para começar a festa.</Text>

            <View style={style.inputArea}>
                <Text style={style.textLabel}>Celular:</Text>
                <TextInputMask
                    style={style.inputStandard}
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                    }}
                    autoFocus={true}
                    keyboardType={"phone-pad"}
                    placeholder={'(xx)xxxxx-xxxx'}
                    value={celularUser}
                    includeRawValueInChangeText={true}
                    onChangeText={(text, rawText )=> setCelularUser(rawText)}
                />
                <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                    <Text style={style.textBtn}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <View style={style.cadastreSe}>
                <Text>Novo no Churrapp?</Text>
                <TouchableOpacity><Text style={style.cadastreSeBtn}>Cadastre-se.</Text></TouchableOpacity>
            </View>
        </View>
    );
}