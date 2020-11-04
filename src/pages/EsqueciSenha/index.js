import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import style from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import SMSVerifyCode from 'react-native-sms-verifycode';
import api from '../../services/api';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'; //yarn add react-native-confirmation-code-field
// import RNOtpVerify from 'react-native-otp-verify';

import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

// import { Container } from './styles';

const EsqueciSenha = () => {

    const navigation = useNavigation();
    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const [borderColor1, setBorderColor1] = useState(style.formOk)

    function backToLogin() {
        navigation.replace('LoginCelular')
    }

    const [visivel, setVisivel] = useState(false)
    const [celularUser, setCelularUser] = useState('');
    const [verified, setVerified] = useState('');
    

    const CELL_COUNT = 5;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    function onInputCompleted(text) {
        Alert.alert(text)
    }
    function celVerify() {
        RNOtpVerify.getOtp()
            .then(p => RNOtpVerify.addListener(this.otpHandler))
            .catch(p => console.log(p));
    }

    async function alterarSenha() {
        setLoading(true)
        if(value === verified) {
            await api.get(`/usuariosLoginCel/${celularUser}`).then(function (res) {
                USUARIOLOGADO = res.data[0]
                console.log(USUARIOLOGADO)
                navigation.navigate('AlterarSenha');
            })
        } else {

        }
        setVisivel(!visivel);
        setLoading(false)
        setValue('')
    }
    function checkCelInput() {
        if(celularUser === "" || celularUser.length < 11){
            setBorderColor1(style.formNok)
        } else {
            setVisivel(!visivel);
        }
    }

    useEffect(() => {
        // celVerify();
        setVerified('99999'); // Código de Verificação
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
                            cellCount={CELL_COUNT}
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
                        <Text>{value}</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => {alterarSenha()}}>
                                <Text style={style.textBtn}>Confirmar</Text>
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