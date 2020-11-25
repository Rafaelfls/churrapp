import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Vibration, ActivityIndicator, Modal, RefreshControl, AppState, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import style from './styles';

import { useChurrasCount, useChurrasParticipado, useLoadingModal } from '../../context/churrasContext';

const Notificacoes = () => {
    const { churrasParticipado, setChurrasParticipado } = useChurrasParticipado();
    const { loading, setLoading } = useLoadingModal()

    const navigation = useNavigation();

    const [notificacoes, setnotificacoes] = useState([]);
    const [refreshNotificacao, setRefreshNotificacao] = useState(true);

    async function loadNotificacoes() {
        await api.get(`/notificacoes/${USUARIOLOGADO.id}`).then(function (res) {
            setnotificacoes(res.data)
        })
    }

    function abrirDrawer() {
        navigation.openDrawer();
    }

    async function clicknegar(notificacao) {
        setLoading(true)
        if (notificacao.churras_id == null) {
            await api.delete(`/notificacoes/${notificacao.id}`)
            setRefreshNotificacao(!refreshNotificacao);
        } else {
            await api.put(`/negarPresenca/${notificacao.usuario_id}/${notificacao.churras_id}`)
            await api.delete(`/notificacoes/${notificacao.id}`)
            setRefreshNotificacao(!refreshNotificacao);
        }
        setLoading(false)
    }

    async function clickconfirmar(notificacao) {
        setLoading(true)
        if (notificacao.churras_id == null) {
            await api.delete(`/notificacoes/${notificacao.id}`)
            setRefreshNotificacao(!refreshNotificacao);
        } else if (notificacao.confirmar == 'Vou') {
            var churrasId = notificacao.churras_id;
            await api.put(`/confirmaPresenca/${notificacao.usuario_id}/${notificacao.churras_id}`)
            await api.delete(`/notificacoes/${notificacao.id}`)
            setChurrasParticipado(churrasParticipado + 1)
            api.put(`/usuariosQntParticipado/${USUARIOLOGADO.id}`, { churrasParticipados: churrasParticipado + 1 });
            navigation.navigate('DetalheChurras', { churras: churrasId, editavel: false, initialPage: 0 })
        }
        setLoading(false)
    }

    useEffect(() => {
        loadNotificacoes();
    }, [refreshNotificacao]);

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View style={style.menuBtn}>
                    <TouchableOpacity onPress={() => abrirDrawer()}>
                        <IconMI name='menu' size={30} />
                    </TouchableOpacity>
                </View>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Notificações</Text>
                    {notificacoes.length == 1
                        ? <Text style={style.textSubHeader}>Você tem {notificacoes.length} notificação</Text>
                        : <Text style={style.textSubHeader}>Você tem {notificacoes.length} notificações</Text>
                    }
                </View>
            </View>
            <FlatList
                data={notificacoes}
                style={style.notificacoesList}
                showsVerticalScrollIndicator={false}
                keyExtractor={notificacoes => String(notificacoes.id)}
                renderItem={({ item: notificacoes }) => (
                    <View style={style.cardNotf}>
                        <Text style={style.cardTextNotf}>{notificacoes.mensagem}</Text>
                        <View style={style.cardFooterNotf}>
                            {notificacoes.negar != null
                                ? <TouchableOpacity style={style.cardBtnNotf1} onPress={() => clicknegar(notificacoes)}><Text style={style.cardBtnTextNotf1}>{notificacoes.negar}</Text></TouchableOpacity>
                                : null}
                            {notificacoes.confirmar != null
                                ? <TouchableOpacity style={style.cardBtnNotf} onPress={() => clickconfirmar(notificacoes)}><Text style={style.cardBtnTextNotf}>{notificacoes.confirmar}</Text></TouchableOpacity>
                                : null}
                        </View>
                    </View>
                )} />
        </View>

    );
}

export default Notificacoes;