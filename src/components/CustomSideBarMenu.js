import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, SafeAreaView, Linking, TouchableOpacity, Modal, TextInput } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation, useRoute } from '@react-navigation/native';
import { EmailSender } from './EmailSender.js'
import { TextInputMask } from 'react-native-masked-text'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


import style from '../styles';

import { useLoadingModal } from '../context/churrasContext'

//Criando Icone Customizável
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
import { TouchableHighlight } from 'react-native-gesture-handler';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'zondicon-icon', 'icomoon.ttf');
//Fim

const CustomSideBarMenu = (props) => {
    const navigation = useNavigation();
    const [modalEmail, setModalEmail] = useState(false)
    const [assunto, setAssunto] = useState('')
    const [msg, setMsg] = useState('')
    const { loading, setLoading } = useLoadingModal()

    function logout() {
        USUARIOLOGADO = null
        navigation.replace('Login');
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <TouchableOpacity style={style.sideMenuProfileIcon} onPress={() => navigation.navigate('Tabs', { screen: 'Perfil' })}>
                    <Image
                        source={{ uri: USUARIOLOGADO.fotoUrlU }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100 / 2,
                        }}
                    />
                </TouchableOpacity>
                <View style={style.perfilInfo}>
                    {USUARIOLOGADO.apelido === null
                        ? <Text style={{ fontFamily: 'poppins-bold' }}>{USUARIOLOGADO.nome}</Text>
                        : <Text style={{ fontFamily: 'poppins-bold' }}>{USUARIOLOGADO.apelido}</Text>
                    }
                    <View>
                        <Text style={{ textAlign: 'center', fontFamily: 'poppins-black', marginTop: 5 }}>Histórico</Text>
                        <View style={style.perfilChurrasInfo}>
                            <View style={style.perfilChurrasInfoBox}>
                                <Icon name="barbeque" size={25} />
                                <Text style={style.perfilTxtInfo}>Criou</Text>
                                <Text style={style.perfilTxtInfo}>{USUARIOLOGADO.churrasCriados}</Text>
                            </View>
                            <View style={style.perfilChurrasInfoBox}>
                                <Icon name="eating" size={25} />
                                <Text style={style.perfilTxtInfo}>Participou</Text>
                                <Text style={style.perfilTxtInfo}>{USUARIOLOGADO.churrasParticipados}</Text>
                            </View>
                        </View>
                    </View>
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
                        onPress={() => { setModalEmail(true); }}>
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalEmail}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Enviar email!</Text>
                        <TouchableOpacity style={{ position: 'absolute', right: 20, top: 20 }} onPress={() => { setModalEmail(!modalEmail); setAssunto(''); setMsg('') }}><Icon name="close" size={25} /></TouchableOpacity>
                        <View style={style.inputArea}>
                            <Text style={style.textLabel}>Assunto:</Text>
                            <TextInput
                                style={[style.inputStandardAssunto]}
                                keyboardType="default"
                                value={assunto}
                                multiline={true}
                                numberOfLines={5}
                                onChangeText={(text) => { setAssunto(text); }}
                            />
                        </View>
                        <View style={style.inputArea}>
                            <Text style={style.textLabel}>Mensagem:</Text>
                            <TextInput
                                style={[style.inputStandard]}
                                keyboardType="default"
                                value={msg}
                                onChangeText={(text) => { setMsg(text); }}
                            />
                        </View>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => { setModalEmail(!modalEmail); EmailSender('contato@churrapp.com', assunto, msg) }}>
                                <Text style={style.textBtn}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );

}

export default CustomSideBarMenu;