import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconOct from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarCodeScanner } from 'expo-barcode-scanner';

import api from '../../services/api';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function QRCodeLeitor() {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const navigation = useNavigation();
    const [scanned, setScanned] = useState(false);
    const [visivel, setIsVisivel] = React.useState(false);
    const [qrCode, setQrCode] = useState(true);
    const [qrCodeValue, setQrCodeValue] = React.useState('');
    const [scanError, setScanError] = useState([false])

    function goBack() {
        setQrCode(false)
        navigation.replace('ParticiparChurrasco')
    }


    async function participarDoChurras() {
        setIsVisivel(false);
        setLoading(true)
        await api.post(`/convidadosChurrasCriado/${USUARIOLOGADO.id}`, {
            churras_id: qrCodeValue.id
        }).then(async function (res) {
            if (res.data[0].limiteConfirmacao == null) {
                await api.post(`/notificacoes/${USUARIOLOGADO.id}/${qrCodeValue.id}`, {
                    mensagem: `${res.data[0].nome} está te convidando para o churras ${res.data[0].nomeChurras}, e o valor por pessoa é de R$${(res.data[0].valorPagar).toFixed(2)}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                    negar: "Não vou",
                    confirmar: "Vou",
                    validade: res.data[0].data,
                })
            } else {
                await api.post(`/notificacoes/${USUARIOLOGADO.id}/${qrCodeValue.id}`, {
                    mensagem: `${res.data[0].nome} está te convidando para o churras ${res.data[0].nomeChurras}, e o valor por pessoa é de R$${(res.data[0].valorPagar).toFixed(2)}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                    negar: "Não vou",
                    confirmar: "Vou",
                    validade: res.data[0].limiteConfirmacao,
                })
            }
            setLoading(false)
            setScanned(false);
        });
        setQrCode(false);
        setLoading(false);
        setScanned(false);
        return navigation.replace('Tabs');
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true)
        loadChurras(data)
    };

    async function loadChurras(id) {
        try {
            await api.get(`churrasPeloId/${id}`)
                .then(function (res) {
                    console.log('res')
                    console.log(res.data[0])
                    if(res.data[0]){
                        setQrCodeValue(res.data[0])
                        setIsVisivel(true)
                    }else{                        
                        setScanError([true,'', "escaneado"])
                    }
                })
        } catch (error) {
            setScanError([true, id,''])
        }

        setLoading(false)
    }

    return (

        <View style={style.container}>
            <View style={style.top}></View>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={StyleSheet.absoluteFillObject}
            />
            <Modal
                animationType="none"
                transparent={true}
                visible={qrCode}
            >

                <View style={style.header}>
                    <Text style={style.titulo}>Ler QR code</Text>
                    <TouchableOpacity onPress={() => goBack()} style={style.backBtnTo}>
                        <IconOct name="chevron-left" size={25} style={style.backBtn} />
                    </TouchableOpacity>
                </View>
                <View style={style.centeredViewQr}>
                    <View style={style.modalViewQr}>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Participar!</Text>
                        <Text style={style.modalText}>Deseja participar do churras {qrCodeValue.nomeChurras}?</Text>
                        <View style={style.footer}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => {setIsVisivel(false), setScanned(false)}}>
                                <Text style={style.iconExitBtn}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.salvarBtn} onPress={participarDoChurras}>
                                <Text style={style.textSalvarBtn}>Participar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={scanError[0]}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>Não encontramos churrasco com o codigo <Text style={{ fontWeight: 'bold' }}>{scanError[1]}</Text><Text>{scanError[2]}</Text>!</Text>
                        <View style={style.footer}>
                            <TouchableOpacity style={style.salvarBtn} onPress={() => { setScanError([false]), setScanned(false) }}>
                                <Text style={style.textSalvarBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {criarModal}
        </View>



    )
}