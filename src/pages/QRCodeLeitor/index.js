import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconOct from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BarCodeScanner } from 'expo-barcode-scanner';

import api from '../../services/api';

import style from './styles';

export default function QRCodeLeitor() {

    const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [visivel, setIsVisivel] = React.useState(false);
    const [qrCode, setQrCode] = useState(true);
    const [qrCodeValue, setQrCodeValue] = React.useState('');

    function goBack() {
        setQrCode(false)
        navigation.replace('ParticiparChurrasco')
    }


    function participarDoChurras() {
        setIsVisivel(false);
        console.log(qrCodeValue + "    " + USUARIOLOGADO.id)

        api.post(`/convidadosChurras/${USUARIOLOGADO.id}`, {
            valorPagar: 20.50,
            churras_id: churrasId
        });
        setQrCode(false)
        return navigation.replace('Tabs');
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setIsVisivel(true)
        setScanned(false);
        setQrCodeValue(data)
    };

    return (

        <View style={style.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={[StyleSheet.absoluteFill, style.cameraContainer]}
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
                        <Text style={style.modalText}>Deseja participar do churras {qrCodeValue}?</Text>
                        <View style={style.footer}>
                            <TouchableOpacity style={style.salvarBtn} onPress={() => setIsVisivel(false)}>
                                <Text style={style.textSalvarBtn}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.salvarBtn} onPress={participarDoChurras}>
                                <Text style={style.textSalvarBtn}>Participar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>



    )
}