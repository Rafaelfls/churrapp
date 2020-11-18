import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, Picker, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { TextInputMask } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';
import CheckBox from '@react-native-community/checkbox';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';
import { FlatList } from 'react-native-gesture-handler';


//Documentos
import TermoDeUso from '../../docs/TermoDeUso/TermoDeUso'
import PoliticasDePrivacidade from '../../docs/PoliticasDePrivacidade/PoliticasDePrivacidade'

export default function CadastroUsuario() {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const navigation = useNavigation();

    const [nomeUsuario, setNomeUsuario] = useState('');
    const [celularUsuario, setCelularUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [senhaUsuario2, setSenhaUsuario2] = useState('');
    const [senhaUsuarioUncrpt, setSenhaUsuarioUncrpt] = useState('');
    const [senhaUsuarioUncrpt2, setSenhaUsuarioUncrpt2] = useState('');
    const [visivel, setVisivel] = useState(false)
    const [modalText, setModalText] = useState('Faltaram algumas informações!');
    const [url, setUrl] = useState("https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png")
    const [erroMsg, setErroMsg] = useState('');
    const [erroVisivel, setErroVisivel] = useState('');
    const [borderColorRed1, setBorderColorRed1] = useState(style.formOk);
    const [borderColorRed2, setBorderColorRed2] = useState(style.formOk);
    const [borderColorRed3, setBorderColorRed3] = useState(style.formOk);
    const [borderColorRed4, setBorderColorRed4] = useState(style.formOk);
    const [termoModal, setTermoModal] = useState(false)
    const [termoLido, setTermoLido] = useState(false)
    const [politicaModal, setPoliticaModal] = useState(false)
    const [idadeCheck, setIdadeCheck] = useState(false)

    function backHome() {
        navigation.replace('Login');
    }

    useEffect(() => { }, []);

    async function criptoSenha1(senha) {
        setSenhaUsuarioUncrpt(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUsuario(criptoSenha)
    }
    async function criptoSenha2(senha) {
        setSenhaUsuarioUncrpt2(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUsuario2(criptoSenha)
    }

    async function enviaNotificacao(convidId) {
        await api.post(`/notificacoesGeral/${convidId}`, {
            mensagem: `Seja bem vind@ ao Churrapp, nós estamos muito felizes com a sua chegada!`,
            negar: null,
            confirmar: "Legal",
            validade: null
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
        if (senhaUsuario2 == '') {
            setBorderColorRed4(style.formNok)
        } else {
            setBorderColorRed4(style.formOk)
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
            setBorderColorRed2(style.formNok)
            setBorderColorRed4(style.formNok)
            setModalText("A senha deve ter no mínimo 8 caracteres!");
            return setVisivel(true)
        } else {
            if (senhaUsuarioUncrpt == senhaUsuarioUncrpt2) {
                setLoading(true)
                await api.post('/usuarios', {
                    nome: nomeUsuario,
                    sobrenome: 'sobrenome',
                    email: `${celularUsuario}@churrapp.com`,
                    cidade: "cidade",
                    uf: "uf",
                    idade: "02/01/1900",
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
            } else {
                setBorderColorRed2(style.formNok)
                setBorderColorRed4(style.formNok)
                setModalText("As senhas não são iguais!");
                return setVisivel(true)
            }
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
                        secureTextEntry={true}
                        onChangeText={text => criptoSenha1(text)}
                    />
                    <Text style={style.textLabel}>Confirmar senha:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed4]}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        secureTextEntry={true}
                        onChangeText={text => criptoSenha2(text)}
                    />
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <CheckBox value={idadeCheck} onValueChange={(idadeCheck) => setIdadeCheck(idadeCheck)} tintColors={{ true: 'maroon', false: 'maroon' }} />
                        <Text style={{ textDecorationLine: 'underline', color: 'maroon' }}>Confirmo ter <Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>13 anos</Text> ou mais</Text>
                    </View> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <CheckBox value={termoLido} onValueChange={(termoLido) => setTermoLido(termoLido)} tintColors={{ true: 'maroon', false: 'maroon' }} />

                        <Text style={{ color: 'black' }}>Aceito os <Text onPress={() => setTermoModal(!termoModal)} style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text> e as <Text onPress={() => setPoliticaModal(!politicaModal)}style={{ color: 'maroon', textDecorationLine: 'underline' }}>Políticas de Privacidade</Text></Text>

                    </View>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={termoModal}
            >
                <View style={style.centeredView}>
                    <View style={style.modalTermoView}>
                        {/* <Text style={style.modalTitle}><Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text></Text>
                        <ScrollView>
                            <TermoDeUso />
                        </ScrollView> */}
                        <TermoDeUso />
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => { setTermoModal(false); }}>
                                <Text style={style.textBtn}>Já li</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={politicaModal}
            >
                <View style={style.centeredView}>
                    <View style={style.modalTermoView}>
                        {/* <Text style={style.modalTitle}><Text style={{ color: 'maroon', textDecorationLine: 'underline' }}>Termos de Uso</Text></Text>
                        <ScrollView>
                            <TermoDeUso />
                        </ScrollView> */}
                        <PoliticasDePrivacidade />
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => { setPoliticaModal(false); }}>
                                <Text style={style.textBtn}>Já li</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={style.footer}>
                {termoLido && idadeCheck
                    ? <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                        <Text style={style.textBtn}>Cadastrar</Text>
                    </TouchableOpacity>
                    : <TouchableOpacity style={style.continueBtnDisabled} onPress={navigateToResumo} disabled>
                        <Text style={style.textBtn}>Cadastrar</Text>
                    </TouchableOpacity>
                }

            </View>
            {criarModal}
        </View >
    );
}