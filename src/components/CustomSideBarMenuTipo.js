import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, SafeAreaView, Linking, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation, useRoute } from '@react-navigation/native';
import { EmailSender } from './EmailSender.js'
import { TextInputMask } from 'react-native-masked-text'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../services/api.js'
import style from '../styles';

import { useLoadingModal, useChurras } from '../context/churrasContext'

//Criando Icone Customizável
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
import { TouchableHighlight } from 'react-native-gesture-handler';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'zondicon-icon', 'icomoon.ttf');
//Fim

const CustomSideBarMenuTipo = (props) => {
    const navigation = useNavigation();
    const { loading, setLoading } = useLoadingModal()
    const { newChurras, setNewChurras } = useChurras();
    const [usuario, setUsuario] = useState();
    const [subTipos, setSubTipos] = useState([]);
    const [subTipoUrlU, setSubTipoUrlU] = useState('https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png')

    function logout() {
        USUARIOLOGADO = null
        navigation.replace('Login');
    }

    async function carregarSubTipos() {
        // setLoading(true)
        const response = await api.get(`/subtipos`);
        response.data.shift()
        setSubTipos(response.data);
        // setLoading(false)
    }

    useEffect(() => {
        carregarSubTipos()
    }, [loading]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={style.sideMenuSubTipo}>
                <Text style={style.tituloSubTipo}>Qual o tipo do item que deseja adicionar?</Text>
            </View>
            <View style={style.linhaSubTipo}></View>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                <View style={{ marginHorizontal: 15, top: -20 }}>
                    <FlatList
                        data={subTipos}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={subTipos => String(subTipos.id)}
                        style={{ height: '100%' }}
                        renderItem={({ item: subTipos }) => (
                            <View >
                                <TouchableOpacity style={style.churrasImgContainer} onPress={() => {
                                    switch (subTipos.id) {
                                        case 1:
                                            navigation.replace('EscolherNovosItens', { subTipo: 1, churrascode: newChurras })
                                            break;
                                        case 2:
                                            navigation.replace('EscolherNovosItens2', { subTipo: 2, churrascode: newChurras })
                                            break;
                                        case 3:
                                            navigation.replace('EscolherNovosItens3', { subTipo: 3, churrascode: newChurras })
                                            break;
                                        case 4:
                                            navigation.replace('EscolherNovosItens4', { subTipo: 4, churrascode: newChurras })
                                            break;
                                        case 5:
                                            navigation.replace('EscolherNovosItens5', { subTipo: 5, churrascode: newChurras })
                                            break;
                                        default:
                                            break;
                                    }
                                }}>
                                    <View style={style.churrasItemContainer}>
                                        <Image source={{ uri: subTipoUrlU }} style={style.itemImg} />
                                        <Text style={style.churrasItem}>{subTipos.subTipo}</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        )}
                    />
                </View>
            </DrawerContentScrollView>

        </SafeAreaView>
    );

}

export default CustomSideBarMenuTipo;