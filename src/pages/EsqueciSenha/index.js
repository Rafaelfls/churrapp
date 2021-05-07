import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import style from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import SMSVerifyCode from 'react-native-sms-verifycode';
import api from '../../services/api';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'; //yarn add react-native-confirmation-code-field
import RNOtpVerify from 'react-native-otp-verify';
import SendSMS from 'react-native-sms'

import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

// import { Container } from './styles';

const EsqueciSenha = () => {


    const navigation = useNavigation();
    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const [borderColor1, setBorderColor1] = useState(style.formOk)
    const [refresh, setRefresh] = useState(false)

    function backToLogin() {
        navigation.replace('LoginCelular')
    }

    const [visivel, setVisivel] = useState(false)
    const [alertModal, setAlertModal] = useState(false)
    const [celularUser, setCelularUser] = useState('');
    const [pin, setPin] = useState('');
    const [info, setInfo] = useState(false);
    const [newPin, setNewPin] = useState('')

    // Input do código verificação SMS
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: 5 });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    // Termina aqui

    // Verificação SMS
    // function onInputCompleted(text) {
    //     Alert.alert(text)
    // }
    // function celVerify() {
    //     RNOtpVerify.getOtp()
    //         .then(p => RNOtpVerify.addListener(otpHandler))
    //         .catch(p => console.log(p));
    // }

    // function otpHandler(message) {
    //     const otp = /(\d{4})/g.exec(message)[1];
    //     this.setState({ otp });
    //     RNOtpVerify.removeListener();
    //     Keyboard.dismiss();
    // }
    // Termina aqui

    async function alterarSenha() {
        if (value == pin) {
            sendPIN(null)
            navigation.replace('AlterarSenha');
        } else {

        }
        setVisivel(!visivel);
        setValue('')
    }

    async function checkCelInput() {
        if (celularUser === "" || celularUser.length < 11) {
            setInfo(true)
            setBorderColor1(style.formNok)
        } else {
            var msgBody = ''
            setLoading(true)
            await api.get(`/usuariosLoginCel/${celularUser}`)
                .then(async function (res) {
                    USUARIOLOGADO = res.data[0]
                    console.log(USUARIOLOGADO)
                    if (USUARIOLOGADO != undefined) {
                        // await pegarPIN(res.data[0].id);
                        if (pin === null || pin === '') {
                            await sendPIN(makeOTP(5));
                            console.log("ENTREI")
                            await pegarPIN(res.data[0].id)
                            msgBody = ' ' + newPin
                        }
                        setVisivel(!visivel);
                    } else {
                        setAlertModal(!alertModal)
                        setVisivel(false);
                    }
                })
            setBorderColor1(style.formOk)
            setInfo(false)
            setLoading(false);
        }
    }
    async function pegarPIN(id) {
        await api.get(`/getPIN/${id}`)
            .then((res) => {
                setPin(res.data[0].pin)
                setNewPin(() => 'PIN é ' + res.data[0].pin)
                setNewPin((state) => {
                    console.log(state);
                    setNewPin(state)
                    return state;
                })
            })
    }

    function makeOTP(length) {
        var result = '';
        var characters = '123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    async function requestReadSmsPermission() {
        try {
            await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_SMS,
                {
                    title: "(...)",
                    message: "Why you're asking for..."
                }
            );
        } catch (err) { }
    }

    async function sendPIN($pin) {
        setPin($pin)
        // await api.put(`/usuarios/${USUARIOLOGADO.id}`, {
        //     nome: USUARIOLOGADO.nome,
        //     sobrenome: USUARIOLOGADO.sobrenome,
        //     email: USUARIOLOGADO.email,
        //     cidade: USUARIOLOGADO.cidade,
        //     uf: USUARIOLOGADO.uf,
        //     idade: USUARIOLOGADO.idade,
        //     joined: USUARIOLOGADO.joined,
        //     celular: USUARIOLOGADO.celular,
        //     apelido: USUARIOLOGADO.apelido,
        //     senha: USUARIOLOGADO.senha,
        //     pin: $pin

        // })
        await api.put(`/atualizaPin/${USUARIOLOGADO.id}`, {
            celular: USUARIOLOGADO.celular,
            pin: $pin
        })
    }

    useEffect(() => {
        // celVerify();
        requestReadSmsPermission();
        // pegarPIN();
    }, []);

    return (
        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity style={style.exitBtn} onPress={() => backToLogin()}>
                    <Icon style={style.iconHeaderBtn} name="arrow-left" size={22} />
                </TouchableOpacity>
            </View>
            <Text style={style.title}>Esqueceu sua senha?!</Text>
            <Text style={style.subtitle}>Não tem problema, vamos recuperar</Text>
            <View style={style.inputArea}>
                <Text style={style.textLabel}>Celular:</Text>
                <TextInputMask
                    style={[style.inputStandard, borderColor1]}
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
                    onChangeText={(text, rawText) => { setCelularUser(rawText); }}
                />
                <TouchableOpacity onPress={() => { setCelularUser('') }} style={style.cleanInput2}>
                    <Text style={style.mudarSenha}>X</Text>
                </TouchableOpacity>
                {info
                    ? <Text style={style.textInfo}>Número inválido</Text>
                    : null
                }
                <TouchableOpacity style={style.continueBtn} onPress={() => checkCelInput()}>
                    <Text style={style.textBtn}>Enviar</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Código de confirmação!</Text>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={5}
                            rootStyle={style.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <View>
                                    <Text
                                        key={index}
                                        style={[style.cell, isFocused && style.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Text></Text> : null)}
                                    </Text>
                                </View>
                            )}
                        />
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => { alterarSenha() }}>
                                <Text style={style.textBtn}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={alertModal}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Número inexistente!</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => { setAlertModal(!alertModal) }}>
                                <Text style={style.textBtn}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {criarModal}
        </View>
    );
}

export default EsqueciSenha;