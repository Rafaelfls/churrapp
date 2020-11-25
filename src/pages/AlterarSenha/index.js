import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import style from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'
import * as Crypto from 'expo-crypto';
import api from '../../services/api';

// import { Container } from './styles';

const AlterarSenha = () => {
    const navigation = useNavigation();
    const [senhaUser, setSenhaUser] = useState('');
    const [senhaUserUncrpt1, setSenhaUserUncrpt1] = useState('')
    const [senhaUserUncrpt2, setSenhaUserUncrpt2] = useState('')
    const [confirmaSenhaUser, setConfirmaSenhaUser] = useState('');
    const [borderColor1, setBorderColor1] = useState(style.formOk);
    const [borderColor2, setBorderColor2] = useState(style.formOk);
    const [info, setInfo] = useState(false)

    async function criptoSenha1(senha) {
        setSenhaUserUncrpt1(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUser(criptoSenha)
    }
    async function criptoSenha2(senha) {
        setSenhaUserUncrpt2(senha)
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setConfirmaSenhaUser(criptoSenha)
    }

    async function validarSenha() {
        if (senhaUserUncrpt1 === '') {
            setBorderColor1(style.formNok)
        } if (senhaUserUncrpt2 === '') {
            setBorderColor2(style.formNok)
        } else {
            if (senhaUserUncrpt1 === senhaUserUncrpt2) {
                await api.put(`/usuarios/${USUARIOLOGADO.id}`, {
                    nome: USUARIOLOGADO.nome,
                    sobrenome: USUARIOLOGADO.sobrenome,
                    email: USUARIOLOGADO.email,
                    cidade: USUARIOLOGADO.cidade,
                    uf: USUARIOLOGADO.uf,
                    idade: USUARIOLOGADO.idade,
                    joined: USUARIOLOGADO.joined,
                    celular: USUARIOLOGADO.celular,
                    apelido: USUARIOLOGADO.apelido,
                    senha: senhaUser,

                }).then(function (res) {
                    setBorderColor1(style.formOk)
                    setBorderColor2(style.formOk)
                    setInfo(false)
                    navigation.replace('LoginCelular')
                })
            } else {
                setInfo(true)
                setBorderColor1(style.formNok)
                setBorderColor2(style.formNok)
            }
        }

    }
    function back() {
        navigation.replace('EsqueciSenha');
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity style={style.exitBtn} onPress={() => back()}>
                    <Icon style={style.iconHeaderBtn} name="arrow-left" size={22} />
                </TouchableOpacity>
            </View>
            <Text style={style.title}>Vamos lá!</Text>
            <Text style={style.subtitle}>Digite sua nova senha</Text>
            <View style={style.inputArea}>
                <Text style={style.textLabel}>Nova senha:</Text>
                <View>
                    <TextInput
                        style={[style.inputStandard, borderColor1]}
                        autoFocus={true}
                        placeholder={'xxxxxxx'}
                        secureTextEntry={true}
                        value={senhaUserUncrpt1}
                        onChangeText={(rawText) => { criptoSenha1(rawText); }}
                    />
                    <TouchableOpacity onPress={() => { setSenhaUserUncrpt1('') }} style={style.cleanInput}>
                        <Text style={style.mudarSenha}>X</Text>
                    </TouchableOpacity>
                </View>
                <Text style={style.textLabel}>Confirmar senha:</Text>
                <View>
                    <TextInput
                        style={[style.inputStandard, borderColor2]}
                        placeholder={'xxxxxxx'}
                        secureTextEntry={true}
                        value={senhaUserUncrpt2}
                        onChangeText={(rawText) => { criptoSenha2(rawText); }}
                    />
                    {info
                        ? <Text style={style.textInfo}>As senhas não coincidem</Text>
                        : null
                    }

                    <TouchableOpacity onPress={() => { setSenhaUserUncrpt2('') }} style={style.cleanInput}>
                        <Text style={style.mudarSenha}>X</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={style.continueBtn} onPress={() => validarSenha()}>
                    <Text style={style.textBtn}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default AlterarSenha;