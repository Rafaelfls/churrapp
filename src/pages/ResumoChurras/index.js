import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert, Vibration, ToastAndroid } from 'react-native';
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
    const login1 = route.params.loginFranca;
    const login = route.params.login;
    const [churras, setChurras] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [usuario_id, setUsuarioId] = useState(login);
    const config = {
        headers: { 'Authorization': login }
    };

    const navigation = useNavigation();

    function deletar(churras) {
        Alert.alert(
            `Churras deletado`,
            churras.nomeChurras,
            [
                {
                    text: "Beleza"
                }
            ]
        );
        Vibration.vibrate(60);
        api.delete(`/churras/${churras.id}`, config);       

    }

    function logout() {
        navigation.replace('Login');
    }

    function inicioCriarChurras(login) {
        navigation.replace('InicioCriaChurras', {login});
    }

    function ParticiparChurras() {
        navigation.replace('ParticiparChurrasco');
    }

    function detalheChurras(churras, login) {
        navigation.navigate('DetalheChurras', { churras, login});
    }


    async function loadChurras() {
        if (loading) {
            return;
        }

        if (total > 0 && churras.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/churras/${usuario_id}`, {
            params: { page }
        });

        setChurras([...churras, ...response.data]);
        setTotal(response.headers['total-meu']);
        setPage(page + 1);
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
                renderItem={({ item: churras }) => (
                    <View>
                        <TouchableOpacity onPress={() => detalheChurras(churras, login)}>
                            <View style={style.churras}>
                                <View style={style.churrasDescricao}>
                                    <RNSlidingButton
                                        style={{ backgroundColor: 'white', width: "100%" }}
                                        height={90}
                                        onSlidingSuccess={() => deletar(churras)}
                                        slideDirection={SlideDirection.LEFT}>
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
                                    </RNSlidingButton>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <ActionButton style={style.fabBtn} onPress={() => Vibration.vibrate(50)}>
                <ActionButton.Item title="Criar Churras" style={style.fabBtn} onPress={() => inicioCriarChurras(login2)}>
                    <Icon name="plus" style={style.fabBtnIcon} />
                </ActionButton.Item>
                <ActionButton.Item title="Participar do Churras" style={style.fabBtn} onPress={ParticiparChurras}>
                    <Icon name="users" style={style.fabBtnIcon} />
                </ActionButton.Item>
            </ActionButton>

        </View>

    )
}