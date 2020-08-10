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

import churrasPhoto from '../../assets/fundoDescricao.jpg';

import style from './styles';

export default function ResumoChurras() {
    const route = useRoute();
    const [churras, setChurras] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [visivel, setVisivel] = useState(false)
    const [churrasDeletar, setChurrasDeletar] = useState([]);
    const [refreshChurras, setRefreshChurras] = useState([]);
    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    const navigation = useNavigation();

    function deletar(churrass) {
        setLoading(true)
        churras.length = total - 1;
        api.delete(`/churras/${churrass.id}`, config).then(
            setVisivel(!visivel)
        );

        setLoading(false)
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
        navigation.navigate('DetalheChurras', { churras, allowShare: true });
    }


    async function loadChurras() {
        setLoading(true);

        if (total > 0 && churras.length === total) {
            return;
        }


        const response = await api.get(`/churras/${USUARIOLOGADO.id}`, {
            params: { page }
        });

        setChurras([...churras, ...response.data]);
        setTotal(churras.length);
        setPage(page + 1);
        setLoading(false);
    }
    async function onRefresh() {
        setLoading(true);

        if (total > 0 && churras.length === total) {
            return;
        }


        const response = await api.get(`/churras/${USUARIOLOGADO.id}`, {
            params: { page }
        });

        setChurras([...refreshChurras, ...response.data]);
        setTotal(churras.length);
        setPage(1);
        setLoading(false);
    }

    useEffect(() => {
        loadChurras();
    }, []);

    return (

        <View style={style.container}>

            <View style={style.header}>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Meus churras</Text>
                    <Text style={style.textSubHeader}>Você tem {total} churras criados</Text>
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
                onEndReached={loadChurras}
                onEndReachedThreshold={0.2}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => onRefresh()} />}
                renderItem={({ item: churras }) => (
                    <View>
                        <View style={style.churras}>
                            <View style={style.churrasDescricao}>
                                <RNSlidingButton
                                    style={{ backgroundColor: 'white', width: "95%"}}
                                    height={100}
                                    onSlidingSuccessLeft={() => { setVisivel(true); setChurrasDeletar(churras) }}
                                    onSlidingSuccessRight={() => detalheChurras(churras)}
                                    slideDirection={SlideDirection.ANY}>
                                    <View style={{flexDirection:"row", width:'100%'}}>
                                        <View style={style.detalheSlide}>
                                            <Icon name="info" size={24} color="white" />
                                        </View>
                                        <View style={style.slideBtn}>
                                            <Image source={churrasPhoto} style={style.churrasFoto} />
                                            <View style={style.churrasInfosView}>
                                                <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                                                <Text style={style.churrasDono}>{churras.nome} </Text>
                                                <View style={style.churrasLocDat}>
                                                    <IconEnt style={style.localIcon} name="location-pin" size={15} />
                                                    <Text style={style.churrasLocal}> {churras.local}</Text>
                                                    <Text style={style.locDatSeparator}>  |  </Text>
                                                    <IconFea style={style.dataIcon} name="calendar" size={15} />
                                                    <Text style={style.churrasData}> {churras.data}</Text>
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
                        <Text style={style.modalText}>Desistiu de armar o churras <Text style={{fontWeight:'bold'}}>{churrasDeletar.nomeChurras}</Text>? </Text>
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