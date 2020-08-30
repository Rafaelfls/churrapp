import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, Picker, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { TextInputMask } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function CadastroUsuario() {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const navigation = useNavigation();

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [celularUsuario, setCelularUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [senhaUsuarioUncrpt, setSenhaUsuarioUncrpt] = useState('');
    const [visivel, setVisivel] = useState(false)
    const [modalText, setModalText] = useState('Faltaram algumas informações!');
    const [url, setUrl] = useState("https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png")
    const [erroMsg, setErroMsg] = useState('');
    const [erroVisivel, setErroVisivel] = useState('');
    const [borderColorRed1, setBorderColorRed1] = useState(style.formOk);
    const [borderColorRed2, setBorderColorRed2] = useState(style.formOk);
    const [borderColorRed3, setBorderColorRed3] = useState(style.formOk);

    global.USUARIOLOGADO = null;

    function backHome() {
        navigation.replace('Login');
    }

    useEffect(() => { }, []);

    async function criptoSenha(senha) {
        setSenhaUsuarioUncrpt(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUsuario(criptoSenha)
    }

    async function enviaNotificacao(convidId) {
        console.log("enviaNotify", convidId)
        await api.post(`/notificacoesGeral/${convidId}`, {
            mensagem: `Seja bem vind@ ao Churrapp, nós estamos muito felizes com a sua chegada!`,
            negar: null,
            confirmar: "Legal"
        })
    }

    async function navigateToResumo() {

        if (nomeUsuario == '') {
            setBorderColorRed1(style.formNok)
        } else {
            setBorderColorRed1(style.formOk)
        }
        if (senhaUsuario == '') {
            setBorderColorRed2(style.formNok)
        } else {
            setBorderColorRed2(style.formOk)
        }
        if (celularUsuario == '') {
            setBorderColorRed3(style.formNok)
        } else {
            setBorderColorRed3(style.formOk)
        }


        if (nomeUsuario == '' ||
            celularUsuario == '') {
            setModalText("Faltaram algumas informações!");
            return setVisivel(true)
        }
        if (senhaUsuarioUncrpt.length < 8) {
            setModalText("A senha deve ter no mínimo 8 caracteres!");
            return setVisivel(true)
        } else {

            setLoading(true)
            await api.post('/usuarios', {
                nome: nomeUsuario,
                sobrenome: 'sobrenome',
                email: `${celularUsuario}@churrapp.com`,
                cidade: "cidade",
                uf: "uf",
                idade: "20/12/2020",
                fotoUrlU: url,
                celular: celularUsuario,
                cadastrado: true,
                apelido: nomeUsuario,
                senha: senhaUsuario,
                pontoCarne_id: 0,
                carnePreferida_id: 0,
                quantidadeCome_id: 0,
                bebidaPreferida_id: 0,
                acompanhamentoPreferido_id: 0,
                sobremesaPreferida_id: 0,
            }).then(async function (response) {
                if (response.data.mensagem != undefined) {
                    setLoading(false)
                    setErroMsg(response.data.mensagem)
                    setErroVisivel(true)
                } else {
                    USUARIOLOGADO = response.data.usuario[0]
                    await enviaNotificacao(USUARIOLOGADO.id)
                    setLoading(false)
                    navigation.replace('Tabs');
                }
            })
        }
    }
    return (
        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                    <Icon style={style.iconHeaderBtn} name="arrow-left" size={22} />
                </TouchableOpacity>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Cadastro</Text>
                </View>
            </View>

            <ScrollView style={style.scrollView}>
                <View style={style.formGroup}>
                    <Text style={style.textLabel}>Primeiro nome:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed1]}
                        onChangeText={text => setNomeUsuario(text)}
                        placeholder={'Nome'}
                    />
                    <Text style={style.textLabel}>Celular:</Text>
                    <TextInputMask
                        style={[style.inputStandard, borderColorRed3]}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        keyboardType={"phone-pad"}
                        placeholder={'(xx)xxxxx-xxxx'}
                        value={celularUsuario}
                        includeRawValueInChangeText={true}
                        onChangeText={(text, rawText) => setCelularUsuario(rawText)}
                    />
                    <Text style={style.textLabel}>Senha:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed2]}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        onChangeText={text => criptoSenha(text)}
                    />
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
                        <Text style={style.modalText}>{modalText}</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => setVisivel(false)}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={erroVisivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>{erroMsg}</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => setErroVisivel(false)}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={style.footer}>
                <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                    <Text style={style.textBtn}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
            {criarModal}
        </View >
    );
}