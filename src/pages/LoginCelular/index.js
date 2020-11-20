import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Modal, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import * as Crypto from 'expo-crypto';
import api from '../../services/api';

import style from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function LoginCelular() {
    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);

    // Dev apagar em produção
    const [usuarioSelecionado, setUsuarioSelecionado] = useState()
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        carregarUsuarios();
    }, []);

    async function carregarUsuarios() {
        const response = await api.get(`/usuarios`);

        setUsuarios(response.data);
    }
    // Apagar acima em produção

    const navigation = useNavigation();
    const [celularUser, setCelularUser] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [valueCelular, setValueCelular] = useState('');
    const [visivel, setVisivel] = useState(false)

    async function navigateToResumo() {
        global.USUARIOLOGADO = null;
        setLoading(true)
        let criptoSenhaVar = await criptoSenha(senhaUsuario)
        if (celularUser == '') {
            console.log(usuarioSelecionado)
            await api.get(`/usuariosCel/${usuarioSelecionado.celular}/${usuarioSelecionado.senha}`)
                .then(function (response) {
                    if (response.data[0] == undefined) {
                        setLoading(false)
                        return setVisivel(true)
                    } else {
                        USUARIOLOGADO = response.data[0]
                        setLoading(false)
                        navigation.replace('Tabs');
                    }
                })
        } else {
            await api.get(`/usuariosCel/${celularUser}/${criptoSenhaVar}`)
                .then(function (response) {
                    if (response.data[0] == undefined) {
                        setLoading(false)
                        return setVisivel(true)
                    } else {
                        USUARIOLOGADO = response.data[0]
                        setLoading(false)
                        navigation.replace('Tabs');
                    }
                })
        }
    }

    function esqueciSenha() {
        navigation.replace('EsqueciSenha');
    }

    async function criptoSenha(senha) {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
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
            <ScrollView>
                <View style={style.inputArea}>
                    <Picker
                        mode="dropdown"
                        selectedValue={usuarioSelecionado}
                        onValueChange={usuarioSelecionado => setUsuarioSelecionado(usuarioSelecionado)}
                    >
                        {usuarios.map((users, idx) => (
                            <Picker.Item label={users.nome} value={users} key={idx} />
                        ))}
                    </Picker>
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
                        value={valueCelular}
                        includeRawValueInChangeText={true}
                        onChangeText={(text, rawText) => { setCelularUser(rawText); setValueCelular(text) }}
                    />
                    <Text style={style.textLabel}>Senha:</Text>
                    <TextInput
                        style={style.inputStandard}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        secureTextEntry={true}
                        onChangeText={text => setSenhaUsuario(text)}
                    />
                    <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                        <Text style={style.textBtn}>Entrar</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.esqueciSenha}>
                    <TouchableOpacity onPress={esqueciSenha}><Text style={style.esqueciSenhaBtn}>Esqueci minha senha</Text></TouchableOpacity>
                </View>
            </ScrollView>
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
                            <TouchableOpacity style={style.continueBtn2} onPress={okModal}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {criarModal}
        </View>
    );
}