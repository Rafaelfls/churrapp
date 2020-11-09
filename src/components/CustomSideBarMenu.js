import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation, useRoute } from '@react-navigation/native';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


import style from '../styles';

//Criando Icone Customizável
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../selection.json';
const Icon = createIconSetFromIcoMoon(icoMoonConfig, 'zondicon-icon', 'icomoon.ttf');
//Fim

const CustomSideBarMenu = (props) => {
    const navigation = useNavigation();

    function logout() {
        USUARIOLOGADO = null
        navigation.replace('Login');
    }
    const BASE_PATH =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/*Top Large Image */}
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
            <DrawerContentScrollView {...props}>
                <View style={style.linha}></View>
                <DrawerItemList {...props} />
                <View style={style.linha}></View>
                {/* <DrawerItem
                    label="Nosso Insta"
                    onPress={() => Linking.openURL('https://www.instagram.com/churrappbrasil/')}
                /> */}
                <View style={style.customItem}>
                    <Image
                        source={require('../../assets/instaIcon.png')}
                        style={style.iconStyle}
                    />
                    <Text
                        onPress={() => Linking.openURL('https://www.instagram.com/churrappbrasil/')}>
                        @churrappbrasil
                    </Text>
                </View>
            </DrawerContentScrollView>
            <View style={style.signOutBtn}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => logout()} >
                    <IconMCI style={style.signOutIcon} name="logout" size={25} />
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
            <Text
                style={{
                    fontSize: 14,
                    textAlign: 'center',
                    color: 'grey'
                }}>
                contato.churrapp@churrapp.com
            </Text>
        </SafeAreaView>
    );
}

export default CustomSideBarMenu;