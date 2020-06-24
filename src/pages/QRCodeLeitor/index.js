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
    const [qrCodeValue, setQrCodeValue] = React.useState('');

    function goback() {
        navigation.goBack();
    }


    function participarDoChurras(modal,churrasId){
        setIsVisivel(modal);
        console.log(churrasId+ "    " + USUARIOLOGADO)

        api.post(`/convidadosChurras/${USUARIOLOGADO}`, {
            churras_id: churrasId,
            valorPagar: "20,00",
        })

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
            <View style={style.header}>
                <TouchableOpacity onPress={goback}>
                    <IconOct name="chevron-left" size={25} style={style.backBtn} />
                </TouchableOpacity>
                <Text style={style.titulo}>Ler QR</Text>
            </View>
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
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
                            <TouchableOpacity style={style.salvarBtn} onPress={() => participarDoChurras(false,qrCodeValue)}>
                                <Text style={style.textSalvarBtn}>Participar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>



    )
}