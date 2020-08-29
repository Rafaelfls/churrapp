import React, { useState, useEffect } from 'react';
import { View, Text, Clipboard, Alert, TextInput, TouchableOpacity, } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';

import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import { QRCode } from 'react-native-custom-qr-codes-expo';

import style from './styles';


export default function CompartilharChurrasco({ route, navigation }) {
    const rota = useRoute();
    const churras = rota.params.churras
    const [churrasDateFormatted, setChurrasDateFormatted] = useState();

    function goBack() {
        navigation.navigate('DetalheChurras')
    }

    function compartilhar() {
        navigation.navigate('CompartilharConvidados', {
            nomeContato: null,
            sobrenomeContato: null,
            telefoneContato: null,
            churrasAtual: {
              churrasCode: churras.id,
              nomeChurras: churras.nomeChurras,
              local: churras.local,
              hrInicio: churras.hrInicio,
              hrFim: churras.hrFim,
              descricao: churras.descricao,
              data: churrasDateFormatted,
            },
          });
    }

    const copyToClipboard = () => {
        Clipboard.setString(`${churras.id}`)
    }

    useEffect(() => {
        formatData();
    }, []);

    function formatData() {
        var date = new Date(churras.data).getDate() + 1
        var month = new Date(churras.data).getMonth() + 1
        var year = new Date(churras.data).getFullYear()
        setChurrasDateFormatted(date + '/' + month + '/' + year)
    }


    return (

        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity onPress={goBack} style={style.backBtn}>
                    <IconOct name="chevron-left" size={25} color={'white'} />
                </TouchableOpacity>
                <View>
                    <Text style={style.titulo}>Compartilhar</Text>
                </View>
            </View>

            <View style={style.conteudoContainer}>
                <Text style={style.nomeChurras} >{churras.nomeChurras}</Text>
                <View style={style.churrasLocalContainer}>
                    <IconFA name="map-o" size={20} style={style.localIcon} />
                    <Text style={style.churrasLocal}>{churras.local}</Text>
                </View>
                <View style={style.churrasDataContainer}>
                    <IconEnt name="calendar" size={22} style={style.dataIcon} />
                    <Text style={style.churrasData}>{churrasDateFormatted}</Text>
                </View>
                <View style={style.churrasDataContainer}>
                    <IconEnt name="clock" size={22} style={style.dataIcon} />
                    <Text style={style.churrasData}>{churras.hrInicio}{churras.hrFim == null ? null : " - " + churras.hrFim}</Text>
                </View>

                <TouchableOpacity style={style.codigoTO} onPress={() => copyToClipboard()}><Text style={style.codigo}>{churras.id}</Text><IconFA name="copy" size={13} style={style.copyIcon} /></TouchableOpacity>
                <View style={style.qrCode}>
                    <QRCode size={180} logo={{ uri: churras.fotoUrlC }} logoSize={60} content={churras.id} />
                </View>
            </View>

            <View style={style.footer}>
                <TouchableOpacity onPress={compartilhar} style={style.shareBtn}>
                    <Text style={style.shareText}>Compartilhar</Text>
                </TouchableOpacity>
            </View>
        </View>

    )
}