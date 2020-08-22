import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Vibration, ActivityIndicator, Modal, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';

import api from '../../services/api';

import style from './styles';

import { useChurrasCount } from '../../context/churrasContext';

export default function ResumoChurras() {
    const { churrasCount, setChurrasCount } = useChurrasCount();

    const route = useRoute();
    const [churras, setChurras] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [visivel, setVisivel] = useState(false)
    const [churrasDeletar, setChurrasDeletar] = useState([]);
    const [refreshChurras, setRefreshChurras] = useState(true);
    
    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    const navigation = useNavigation();

    function deletar(churrass) {
        setLoading(true)
        setChurrasCount(churrasCount - 1)
        api.delete(`/churras/${churrass.id}`, config).then(function () {
            setVisivel(!visivel)
            setLoading(false)
            setRefreshChurras(!refreshChurras)
        });

    }

    function logout() {
        navigation.replace('Login');
    }

    function inicioCriarChurras() {
        navigation.navigate('InicioCriaChurras');
    }

    function ParticiparChurras() {
        navigation.push('ParticiparChurrasco');
    }

    function detalheChurras(churras) {
        navigation.navigate('DetalheChurras', { churras, allowShare: true, editavel: true });
    }


    async function loadChurras() {
        setLoading(true);



        const response = await api.get(`/churras/${USUARIOLOGADO.id}`);

        setChurras(response.data);
        setChurrasCount(response.data.length);
        setLoading(false);
    }

    function formatData(data) {
        var date = new Date(data).getDate()+1
        var month = new Date(data).getMonth()+1
        var year = new Date(data).getFullYear()
        return date + '/' + month + '/' + year
    }

    useEffect(() => {
        loadChurras();
    }, [refreshChurras]);

    function menu(){
        console.log("abre menu lateral")
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                <View style={style.menuBtn}>
                    <TouchableOpacity onPress={menu}>
                        <IconMCI style={style.menuIcon} name="menu" size={25} />
                    </TouchableOpacity>
                </View>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Meus churras</Text>
                    <Text style={style.textSubHeader}>Você tem {churrasCount} churras criados</Text>
                </View>
                <View style={style.signOutBtn}>
                    <TouchableOpacity onPress={logout}>
                        <IconMCI style={style.signOutIcon} name="logout" size={25} />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={churras}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={churras => String(churras.id)}
                onEndReachedThreshold={0.2}
                renderItem={({ item: churras }) => (
                    <View>
                        <View style={style.churras}>
                            <View style={style.churrasDescricao}>
                                <RNSlidingButton
                                    style={{ backgroundColor: 'white', width: "95%" }}
                                    height={100}
                                    onSlidingSuccessLeft={() => { setVisivel(true); setChurrasDeletar(churras) }}
                                    onSlidingSuccessRight={() => detalheChurras(churras)}
                                    slideDirection={SlideDirection.ANY}>
                                    <View style={{ flexDirection: "row", width: '100%' }}>
                                        <View style={style.detalheSlide}>
                                            <Icon name="info" size={24} color="white" />
                                        </View>
                                        <View style={style.slideBtn}>
                                            <Image source={{ uri: churras.fotoUrlC }} style={style.churrasFoto} />
                                            <View style={style.churrasInfosView}>
                                                <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                                                <Text style={style.churrasDono}>{churras.nome} </Text>
                                                <View style={style.churrasLocDat}>
                                                <IconFea style={style.dataIcon} name="calendar" size={15} />
                                                    <Text style={style.churrasData}> {formatData(churras.data)}</Text>
                                                    <Text style={style.locDatSeparator}>  |  </Text>
                                                    <IconEnt style={style.localIcon} name="location-pin" size={15} />
                                                    <Text style={style.churrasLocal}> {churras.local}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={style.deletarSlide}>
                                            <Icon name="trash-alt" size={24} color="white" />
                                        </View>
                                    </View>
                                </RNSlidingButton>
                            </View>
                        </View>
                    </View>
                )}
            />

            <ActionButton style={style.fabBtn} onPress={() => Vibration.vibrate(50)}>
                <ActionButton.Item title="Criar Churras" style={style.fabBtn} onPress={inicioCriarChurras}>
                    <Icon name="plus" style={style.fabBtnIcon} />
                </ActionButton.Item>
                <ActionButton.Item title="Participar do Churras" style={style.fabBtn} onPress={ParticiparChurras}>
                    <Icon name="users" style={style.fabBtnIcon} />
                </ActionButton.Item>
            </ActionButton>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalText}>Desistiu de armar o churras <Text style={{ fontWeight: 'bold' }}>{churrasDeletar.nomeChurras}</Text>? </Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => setVisivel(false)}>
                                <Icon style={style.iconSalvarBtn} name="times" size={20} />
                                <Text style={style.iconSalvarBtn}>Nunca</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.salvarBtn} onPress={() => deletar(churrasDeletar)}>
                                <Icon style={style.iconSalvarBtn} name="check" size={20} />
                                <Text style={style.iconSalvarBtn}>Desisti</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
            >
                <View
                    style={style.loadingBackground}
                >
                    <ActivityIndicator size="large" color="maroon" />
                    <Text style={style.textLoading}>Carregando ...</Text>
                </View>
            </Modal> */}

        </View>

    )
}