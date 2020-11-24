import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, SafeAreaView, Linking, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation, useRoute } from '@react-navigation/native';
import { EmailSender } from './EmailSender.js'
import { TextInputMask } from 'react-native-masked-text'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '../services/api.js'
import style from '../styles';

import { useLoadingModal, useEdicao } from '../context/churrasContext'

//Criando Icone Customizável
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
import { TouchableHighlight } from 'react-native-gesture-handler';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'zondicon-icon', 'icomoon.ttf');
//Fim

const CustomSideBarMenu = (props) => {
    const navigation = useNavigation();
    const { loading, setLoading } = useLoadingModal()
    const { edicao, setEdicao } = useEdicao()
    const [usuario, setUsuario] = useState();

    function logout() {
        USUARIOLOGADO = null
        navigation.replace('Login');
    }

    async function loadPerfil() {

        const response = await api.get(`/usuarios/${USUARIOLOGADO.id}`).then((response) => {
            setUsuario(response.data)

        })
    }

    useEffect(() => {
        setEdicao(false)
        loadPerfil()
    }, [loading]);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                {usuario == undefined
                    ? <Text></Text>
                    : <View>
                        <TouchableOpacity style={style.sideMenuProfileIcon} onPress={() => {setEdicao(false);navigation.navigate('Tabs', { screen: 'Perfil' })}}>
                            <Image
                                source={{ uri: usuario[0].fotoUrlU }}
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100 / 2,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                }

                <View style={style.perfilInfo}>
                    {usuario == undefined
                        ? <Text></Text>
                        : <View>
                            {usuario[0].apelido === null
                                ? <Text style={{ fontFamily: 'poppins-bold' }}>{usuario[0].nome}</Text>
                                : <Text style={{ fontFamily: 'poppins-bold' }}>{usuario[0].apelido}</Text>
                            }
                        </View>
                    }

                    {usuario == undefined
                        ? <Text></Text>
                        : <View>
                            <Text style={{ textAlign: 'center', fontFamily: 'poppins-black', marginTop: 5 }}>Histórico</Text>
                            <View style={style.perfilChurrasInfo}>
                                <View style={style.perfilChurrasInfoBox}>
                                    <Icon name="barbeque" size={25} />
                                    <Text style={style.perfilTxtInfo}>Criou</Text>
                                    <Text style={style.perfilTxtInfo}>{usuario[0].churrasCriados}</Text>
                                </View>
                                <View style={style.perfilChurrasInfoBox}>
                                    <Icon name="eating" size={25} />
                                    <Text style={style.perfilTxtInfo}>Participou</Text>
                                    <Text style={style.perfilTxtInfo}>{usuario[0].churrasParticipados}</Text>
                                </View>
                            </View>
                        </View>
                    }

                </View>
                <View style={style.linha}></View>
            </View>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}>
                <DrawerItemList {...props} />
                {/* <DrawerItem
                    label="Nosso Insta"
                    onPress={() => Linking.openURL('https://www.instagram.com/churrappbrasil/')}
                /> */}
                <View style={style.contatoLabel}>
                    <View style={style.linha}></View>
                    <Icon
                        name='information-solid'
                        style={style.iconStyle}
                    />
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: 'center',
                            color: 'maroon',
                            fontFamily: 'poppins-black',
                            marginRight: 4
                        }}
                    >
                        Contato
                    </Text>
                    <View style={style.linha}></View>
                </View>
                <View style={style.customItem}>
                    <Image
                        source={require('../../assets/instaIcon.png')}
                        style={style.iconStyle}
                    />
                    <Text
                        style={{
                            fontSize: 14,
                            textAlign: 'center',
                            color: 'gray',
                            fontFamily: 'poppins-bold'
                        }}
                        onPress={() => Linking.openURL('https://www.instagram.com/churrappbrasil/')}>
                        @churrappbrasil
                    </Text>
                </View>
                <View style={style.customItem}>
                    <Icon
                        name="envelope"
                        style={style.iconStyle}
                    />
                    <Text
                        style={{
                            fontSize: 14,
                            textAlign: 'center',
                            color: 'gray',
                            fontFamily: 'poppins-bold'
                        }}
                        onPress={() => { EmailSender('contato@churrapp.com', "", ""); }}>
                        contato@churrapp.com
                    </Text>
                </View>
            </DrawerContentScrollView>
            <View style={style.linha}></View>

            <View style={style.signOutBtn}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: 5 }} onPress={() => logout()} >
                    <IconMCI style={style.signOutIcon} name="logout" size={25} />
                    <Text style={{ fontFamily: 'poppins-medium' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

}

export default CustomSideBarMenu;