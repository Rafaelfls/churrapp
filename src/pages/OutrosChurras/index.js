import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome5';

import logoImg from '../../assets/logo.jpg';

import style from './styles';

export default function OutrosChurras() {
    const [churrasPassado, setChurrasPassados] = useState([]);
    const [churrasFuturo, setChurrasFuturo] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [dataPassado, setDataPassado] = useState('22/07/2020');
    const [dataFuturo, setDataFuturo] = useState('2020-06-20');

    const navigation = useNavigation();

    async function loadChurrasPassados() {
        if (loading) {
            return;
        }

        if (total > 0 && churras.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`churraspassados?data=${dataPassado}`, {
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

        if (total > 0 && churras.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`churrasfuturo?data=${dataFuturo}`, {
            params: { page }
        });

        setChurrasFuturo([...churrasFuturo, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadChurrasPassados();
        loadChurrasFuturos();
    }, []);

    function detalheChurras(churras) {
        navigation.push('DetalheChurras', { churras });
    }



    return (
        <ScrollableTabView
            style={style.container}
            tabBarPosition="top" tabBarActiveTextColor="black" tabBarInactiveTextColor="gray"
            tabBarTextStyle={{ fontWeight: 'bold' }}
            tabBarBackgroundColor='white'
            renderTabBar={() => <DefaultTabBar />}
            ref={(tabView) => { this.tabView = tabView; }}
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

                    <View style={style.churras}>
                        <View style={style.churrasTitleView}>
                            <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                        </View>
                        <View style={style.churrasDescricao}>
                            <Image source={logoImg} style={style.churrasFoto} />
                            <View style={style.churrasInfosView}>
                                <Text style={style.churrasLocal}>{churras.local}</Text>
                                <Text style={style.churrasData}>{churras.data} - {churras.hrFim} às {churras.hrFim}</Text>
                                <Text style={style.churrasDono}>{churras.nome} </Text>
                            </View>
                        </View>
                        <View style={style.verMaisView}>
                            <TouchableOpacity onPress={() => detalheChurras(churras)}>
                                <Text style={style.verMais} >ver mais</Text>
                            </TouchableOpacity>
                        </View>
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

                    <View style={style.churras}>
                        <View style={style.churrasTitleView}>
                            <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                        </View>
                        <View style={style.churrasDescricao}>
                            <Image source={logoImg} style={style.churrasFoto} />
                            <View style={style.churrasInfosView}>
                                <Text style={style.churrasLocal}>{churras.local}</Text>
                                <Text style={style.churrasData}>{churras.data} - {churras.hrFim} às {churras.hrFim}</Text>
                                <Text style={style.churrasDono}>{churras.nome} </Text>
                            </View>
                        </View>
                        <View style={style.verMaisView}>
                            <TouchableOpacity onPress={() => detalheChurras(churras)}>
                                <Text style={style.verMais} >ver mais</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
            />
        </ScrollableTabView>
    )
}