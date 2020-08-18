import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import * as Crypto from 'expo-crypto';
import api from '../../services/api';

import style from './styles';

export default function LoginCelular() {

    const navigation = useNavigation();
    const [celularUser, setCelularUser] = useState();
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [visivel, setVisivel] = useState(false)

    async function navigateToResumo() {
        await api.get(`/usuariosCel/${celularUser}/${senhaUsuario}`)
        .then(function(response){
            if(response.data[0] == undefined){
                console.log(response)
                return setVisivel(true)
            }else{
                USUARIOLOGADO = response.data[0]
                navigation.replace('Tabs');  
            }
        }) 
    }

    async function criptoSenha(senha) {
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        console.log(criptoSenha)
        setSenhaUsuario(criptoSenha)
    }

    function okModal() {
        setVisivel(false)
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
                    onChangeText={(text, rawText) => setCelularUser(rawText)}
                />
                <Text style={style.textLabel}>Senha:</Text>                
                <TextInput
                        style={style.inputStandard}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        onChangeText={text => criptoSenha(text)}
                    />
                <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                    <Text style={style.textBtn}>Entrar</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>Informações incorretas!</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={okModal}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={style.cadastreSe}>
                <Text>Novo no Churrapp?</Text>
                <TouchableOpacity onPress={() => { navigation.replace('CadastroUsuario'); }}><Text style={style.cadastreSeBtn}>Cadastre-se.</Text></TouchableOpacity>
            </View>
        </View>
    );
}