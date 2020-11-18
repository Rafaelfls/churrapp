import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import IconMI from 'react-native-vector-icons/MaterialIcons';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function OutrosChurras() {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const [churrasPassado, setChurrasPassados] = useState([]);
    const [churrasFuturo, setChurrasFuturo] = useState([]);
    const [total, setTotal] = useState(0);


    const navigation = useNavigation();

    async function loadChurrasPassados() {
        if (loading) {
            return;
        }

        if (total > 0 && churrasPassado.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`churraspassados/${USUARIOLOGADO.id}`);

        setChurrasPassados(response.data);
        setTotal(response.headers['x-total-count']);
        setLoading(false);
    }

    async function loadChurrasFuturos() {
        if (loading) {
            return;
        }

        if (total > 0 && churrasFuturo.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`churrasfuturo/${USUARIOLOGADO.id}`);

        setChurrasFuturo(response.data);
        setTotal(response.headers['x-total-count']);
        setLoading(false);
    }

    function formatData(data) {
        var date = new Date(data).getDate()+1
        var month = new Date(data).getMonth()+1
        var year = new Date(data).getFullYear()
        return date + '/' + month + '/' + year
    }

    useEffect(() => {
        loadChurrasPassados();
        loadChurrasFuturos();
    }, []);

    function detalheChurras(churras) {
        navigation.navigate('DetalheChurras', { churras, allowShare: false, editavel: false});
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Outros churras</Text>
                </View>
            </View>

            <ScrollableTabView
                style={style.tabView}
                tabBarPosition="top" tabBarActiveTextColor="maroon" tabBarInactiveTextColor="dimgray"
                tabBarTextStyle={{ fontWeight: 'normal', fontFamily: 'poppins-semi-bold', fontSize: 15 }}
                tabBarBackgroundColor='white'
                tabBarUnderlineStyle={{ backgroundColor: 'maroon', height: 2 }}
                renderTabBar={() => <DefaultTabBar />}
                ref={(tabView) => { tabView = tabView; }}
                initialPage={1}
            >

                <FlatList
                    tabLabel='Churras Passados'
                    data={churrasPassado}
                    style={style.churrasList}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={loadChurrasPassados}
                    keyExtractor={churras => String(churras.id)}
                    renderItem={({ item: churras }) => (

                        <View>
                            <TouchableOpacity onPress={() => detalheChurras(churras.id)}>
                                <View style={style.churras}>
                                    <View style={style.churrasDescricao}>
                                        <View style={style.slideBtn}>
                                            <Image source={{ uri: churras.fotoUrlC }} style={style.churrasFoto} />
                                            <View style={style.churrasInfosView}>
                                                <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                                                <Text style={style.churrasDono}>{churras.nome} </Text>
                                                <View style={style.churrasLocDat}>
                                                    <IconFea style={style.dataIcon} name="calendar" size={15} />
                                                    <Text style={style.churrasData}> {formatData(churras.data)}</Text>
                                                    <Text style={style.locDatSeparator}>  |  </Text>
                                                    <IconMI style={style.localIcon} name="access-time" size={15} />
                                                    <Text style={style.churrasLocal}> {churras.hrInicio}{churras.hrFim != null ? " - "+churras.hrFim: ''}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )}
                />
                <FlatList
                    tabLabel='Próximos Churras'
                    data={churrasFuturo}
                    style={style.churrasList}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={loadChurrasFuturos}
                    keyExtractor={churras => String(churras.id)}
                    renderItem={({ item: churras }) => (

                        <View>
                            <TouchableOpacity onPress={() => detalheChurras(churras.id)}>
                                <View style={style.churras}>
                                    <View style={style.churrasDescricao}>
                                        <View style={style.slideBtn}>
                                            <Image source={{ uri: churras.fotoUrlC }} style={style.churrasFoto} />
                                            <View style={style.churrasInfosView}>
                                                <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                                                <Text style={style.churrasDono}>{churras.nome} </Text>
                                                <View style={style.churrasLocDat}>
                                                <IconFea style={style.dataIcon} name="calendar" size={15} />
                                                    <Text style={style.churrasData}> {formatData(churras.data)}</Text>
                                                    <Text style={style.locDatSeparator}>  |  </Text>
                                                    <IconMI style={style.localIcon} name="access-time" size={15} />
                                                    <Text style={style.churrasLocal}> {churras.hrInicio}{churras.hrFim != null ? " - "+churras.hrFim: ''}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>

                    )}
                />
            </ScrollableTabView>

            {criarModal}
        </View>

    )
}