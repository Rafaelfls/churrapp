import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';


import style from './styles';

export default function ParticiparChurrasco() {

    const navigation = useNavigation();

    const [text, onChangeText] = useState();
    const [churras_id, setChurras_id] = useState(null);
    const [visivel, setVisivel] = useState(false);

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };


    function backHome() {
        navigation.replace('Tabs')
    }

    function LerQR() {
        navigation.navigate('QRCodeLeitor');
    }


    async function entrarChurrasco() {
        if (churras_id != null) {
            await api.get(`/churrasPeloId/${churras_id}`)
                .then(async function (res) {
                    if (res.data[0] != undefined) {
                        await api.post(`/convidadosChurras/${USUARIOLOGADO.id}`, {
                            valorPagar: 30,
                            churras_id: churras_id
                        }).then(async function (res) {
                            console.log(res.data)
                            await api.post(`/notificacoes/${USUARIOLOGADO.id}/${churras_id}`, {
                                mensagem: `${res.data[0].nome} está te convidando para o churras ${res.data[0].nomeChurras}, e o valor por pessoa é de ${res.data[0].valorPagar}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                                negar: "Não vou",
                                confirmar: "Vou"
                            })
                        });
                        navigation.replace('Tabs')
                    } else {
                        setVisivel(true)
                    }
                })
        } else {
            setVisivel(true)
        }
    }

    return (

        <View style={style.container}>
            <View style={style.header}>
                <TouchableOpacity style={style.qrBtn} onPress={backHome}>
                    <IconOct name="chevron-left" size={25} style={style.backIcon} />
                </TouchableOpacity>
                <Text style={style.titulo}>Entrar no churras</Text>
                <TouchableOpacity style={style.qrBtn} onPress={LerQR}>
                    <IconMCI name="qrcode-scan" size={25} style={style.qrIcon} />
                </TouchableOpacity>
            </View>
            <View style={style.conteudo}>
                <Text style={style.inserirText}>Insira o código do churras</Text>
                <TextInput
                    style={style.inputStandard}
                    autoCapitalize={"none"}
                    onChangeText={text => setChurras_id(text)}
                    placeholder={'000000000000000'}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>Este churrasco não existe!</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtnModal} onPress={() => setVisivel(false)}>
                                <Text style={style.textBtnModal}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={style.btnsContainer}>
                <TouchableOpacity style={style.enterBtn} onPress={entrarChurrasco}>
                    <Text style={style.textBtn}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}