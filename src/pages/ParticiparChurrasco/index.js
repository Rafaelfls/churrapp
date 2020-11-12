import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../../services/api';


import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function ParticiparChurrasco() {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const navigation = useNavigation();
    const [confirm, setConfirm] = useState([false])


    const [text, onChangeText] = useState();
    const [churras_id, setChurras_id] = useState(null);
    const [visivel, setVisivel] = useState(false);

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };


    function backHome() {
        navigation.replace('Tabs')
    }

    async function LerQR() {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if (status === 'granted') {
            navigation.navigate('QRCodeLeitor');
        }
    }


    async function showModal(){
        if (churras_id != null) {
            setLoading(true)
            await api.get(`/churrasPeloId/${churras_id}`)
            .then((res) => {
                if (res.data[0] != undefined) {
                    setLoading(false)
                    setConfirm([true,res.data[0].nomeChurras])
                }else{
                    setLoading(false)
                    setVisivel(true)
                }
            })
        }
    }

    async function entrarChurrasco() {
        if (churras_id != null) {
            setLoading(true)
            await api.get(`/churrasPeloId/${churras_id}`)
                .then(async function (res) {
                    if (res.data[0] != undefined) {
                        await api.post(`/convidadosChurrasCriado/${USUARIOLOGADO.id}`, {
                            churras_id: churras_id
                        }).then(async function (res) {
                            if (res.data[0].limiteConfirmacao == null) {
                                await api.post(`/notificacoes/${USUARIOLOGADO.id}/${churras_id}`, {
                                    mensagem: `${res.data[0].nome} está te convidando para o churras ${res.data[0].nomeChurras}, e o valor por pessoa é de ${res.data[0].valorPagar}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                                    negar: "Não vou",
                                    confirmar: "Vou",
                                    validade: res.data[0].data,
                                })
                            } else {
                                await api.post(`/notificacoes/${USUARIOLOGADO.id}/${churras_id}`, {
                                    mensagem: `${res.data[0].nome} está te convidando para o churras ${res.data[0].nomeChurras}, e o valor por pessoa é de ${res.data[0].valorPagar}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                                    negar: "Não vou",
                                    confirmar: "Vou",
                                    validade: res.data[0].limiteConfirmacao,
                                })
                            }
                        });
                        setLoading(false)
                        navigation.replace('Tabs')
                    } else {
                        setLoading(false)
                        setVisivel(true)
                    }
                })
        } else {
            setLoading(false)
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
                    value ={churras_id}
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

            
            <Modal
                animationType="slide"
                transparent={true}
                visible={confirm[0]}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Participar!</Text>
                        <Text style={style.modalText}>Deseja participar do churras {confirm[1]}?</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.otherBtnModal} onPress={() => {setConfirm([false]), setChurras_id(null)}}>
                                <Text style={style.textBtnModal}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.otherBtnModal} onPress={entrarChurrasco}>
                                <Text style={style.textBtnModal}>Participar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={style.btnsContainer}>
                <TouchableOpacity style={style.enterBtn} onPress={showModal}>
                    <Text style={style.textBtn}>Buscar</Text>
                </TouchableOpacity>
            </View>
            {criarModal}
        </View>

    )
}