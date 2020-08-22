import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';

import churrasPhoto from '../../assets/fundoDescricao.jpg';

import style from './styles';

export default function OutrosChurras() {

    const [churrasPassado, setChurrasPassados] = useState([]);
    const [churrasFuturo, setChurrasFuturo] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();

    async function loadChurrasPassados() {
        if (loading) {
            return;
        }

        if (total > 0 && churrasPassado.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`churraspassados`, {
            params: { page }
        });

        setChurrasPassados([...churrasPassado, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
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

        const response = await api.get(`churrasfuturo`, {
            params: { page }
        });

        setChurrasFuturo([...churrasFuturo, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
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
        navigation.navigate('DetalheChurras', { churras, allowShare: false, editavel: false });
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
                    keyExtractor={churras => String(churras.id)}
                    onEndReached={loadChurrasPassados}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: churras }) => (

                        <View>
                            <TouchableOpacity onPress={() => detalheChurras(churras)}>
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
                                                    <IconEnt style={style.localIcon} name="location-pin" size={15} />
                                                    <Text style={style.churrasLocal}> {churras.local}</Text>
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
                    keyExtractor={churras => String(churras.id)}
                    onEndReached={loadChurrasFuturos}
                    onEndReachedThreshold={0.2}
                    renderItem={({ item: churras }) => (

                        <View>
                            <TouchableOpacity onPress={() => detalheChurras(churras)}>
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
                                                    <IconEnt style={style.localIcon} name="location-pin" size={15} />
                                                    <Text style={style.churrasLocal}> {churras.local}</Text>
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

        </View>

    )
}