import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Vibration, ActivityIndicator, Modal, RefreshControl, AppState, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import { useIsDrawerOpen } from '@react-navigation/drawer'

import api from '../../services/api';

import semChurras from '../../assets/semChurras.png'
import Component1 from '../../assets/Component1.png'
import Component2 from '../../assets/Component2.png'

import style from './styles';

import { useChurrasCount, useChurrasParticipado, useAppState } from '../../context/churrasContext';
import { ScrollView } from 'react-native-gesture-handler';

export default function ResumoChurras() {
    const { churrasCount, setChurrasCount } = useChurrasCount();
    const { churrasParticipado, setChurrasParticipado } = useChurrasParticipado();
    const [contadorCriado, setContadorCriado] = useState(USUARIOLOGADO.churrasCriados);

    const route = useRoute();
    const [churras, setChurras] = useState([]);
    const [notificacoes, setnotificacoes] = useState([]);
    const [isNotificacoesOpen, setIsNotificacoesOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visivel, setVisivel] = useState(false)
    const [churrasDeletar, setChurrasDeletar] = useState([]);
    const [refreshChurras, setRefreshChurras] = useState(true);
    const [test, setTest] = useState([]);
    var newChurrasCriados;
    const [direcao, setDirecao] = useState();

    const isDrawerOpen = useIsDrawerOpen();

    //Começo Ouvir Estado do App
    const appState = useRef(AppState.currentState);
    const { appStateVisible, setAppStateVisible } = useAppState(appState.current);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);
        if (Platform.OS == "android") {
            AppState.addEventListener("blur", _handleBlurState);
        }
        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
            if (Platform.OS == "android") {
                AppState.removeEventListener("blur", _handleBlurState);
            }

        };
    }, []);

    const _handleBlurState = (nextAppState) => {
        if (appState.current.match(/active/) && nextAppState === "active") {
            console.log("Blur");
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    }

    const _handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            console.log("App ativo novamente!");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };
    // Fim Ouvir Estado do App


    const btns = [
        {
            text: "Criar Churras",
            name: "criaChurras",
            color: '#800000',
            icon: <Icon name="plus" style={style.fabBtnIcon} />,
            position: 1
        },
        {
            text: "Participar do Churras",
            name: "participaChurras",
            color: '#800000',
            icon: <Icon name="users" style={style.fabBtnIcon} />,
            position: 2
        },
    ]

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    const navigation = useNavigation();

    function deletar(churrass) {
        setLoading(true)
        api.delete(`/churras/${churrass.id}`, config).then(function () {
            setVisivel(!visivel)
            setLoading(false)
            setChurrasCount(churrasCount - 1)
            setContadorCriado(contadorCriado - 1)
            api.put(`/usuariosQntCriado/${USUARIOLOGADO.id}`, { churrasCriados: contadorCriado });
            setRefreshChurras(!refreshChurras)

        });

    }

    function apertaFabBtn(btn) {
        console.log(btn)
        if (btn == "criaChurras") {
            inicioCriarChurras();
        }
        if (btn == 'participaChurras') {
            ParticiparChurras()
        }
    }


    function inicioCriarChurras() {
        setRefreshChurras(!refreshChurras);
        newChurrasCriados = churrasCount + 1;
        api.put(`/usuariosQntCriado/${USUARIOLOGADO.id}`, { churrasCriados: newChurrasCriados });
        navigation.navigate('InicioCriaChurras', { appStateVisible: appStateVisible });

    }

    function ParticiparChurras() {
        navigation.push('ParticiparChurrasco');
    }

    function detalheChurras(churras) {
        navigation.navigate('DetalheChurras', { churras, editavel: true, initialPage:0 });
    }


    async function loadChurras() {
        setLoading(true);
        const user = await api.get(`/usuarios/${USUARIOLOGADO.id}`);
        const response = await api.get(`/churras/${USUARIOLOGADO.id}`)
        setChurras(response.data);
        setChurrasCount(user.data[0].churrasCriados)
        setContadorCriado(response.data.length);
        setChurrasParticipado(USUARIOLOGADO.churrasParticipados)
        setLoading(false);
    }

    function formatData(data) {
        var date = new Date(data).getDate() + 1
        var month = new Date(data).getMonth() + 1
        var year = new Date(data).getFullYear()
        if (date < 10) {
            date = "0" + date
        }
        if (month < 10) {
            month = "0" + month
        }
        return date + '/' + month + '/' + year
    }

    useEffect(() => {
        loadChurras();
        loadNotificacoes();
    }, [refreshChurras]);

    async function loadNotificacoes() {
        await api.get(`/notificacoes/${USUARIOLOGADO.id}`).then(function (res) {
            setnotificacoes(res.data)
        })
    }
    function notificacao() {
        setIsNotificacoesOpen(true);
    }

    async function clicknegar(notificacao) {
        if (notificacao.churras_id == null) {
            await api.delete(`/notificacoes/${notificacao.id}`)
            setIsNotificacoesOpen(false)
            console.log("DOIDERA")
            setRefreshChurras(!refreshChurras);
        } else {
            await api.put(`/negarPresenca/${notificacao.usuario_id}/${notificacao.churras_id}`)
            await api.delete(`/notificacoes/${notificacao.id}`)
            setIsNotificacoesOpen(false)
            console.log("DOIDERA")
            setRefreshChurras(!refreshChurras);
        }
    }

    async function clickconfirmar(notificacao) {
        if (notificacao.churras_id == null) {
            await api.delete(`/notificacoes/${notificacao.id}`)
            setIsNotificacoesOpen(false)
            setRefreshChurras(!refreshChurras);
        } else if (notificacao.confirmar == 'Vou') {
            var churrasId = notificacao.churras_id;
            await api.put(`/confirmaPresenca/${notificacao.usuario_id}/${notificacao.churras_id}`)
            await api.delete(`/notificacoes/${notificacao.id}`)
            setChurrasParticipado(churrasParticipado + 1)
            api.put(`/usuariosQntParticipado/${USUARIOLOGADO.id}`, { churrasParticipados: churrasParticipado + 1 });
            setIsNotificacoesOpen(false)
            navigation.navigate('DetalheChurras', { churras: churrasId, editavel: false, initialPage:0 })
        }
    }
    function abrirDrawer() {
        navigation.toggleDrawer()
    }


    return (
        <View style={style.container}>

            <View style={style.header}>
                <View style={style.menuBtn}>
                    <View style={style.centeredViewNotificacaoQtd}>
                        <TouchableOpacity onPress={abrirDrawer}>
                            {notificacoes.length > 0
                                ? <View style={style.modalViewNotificacaoQtd}>
                                    <Text style={style.textBtnNotificacaoQtd}>{notificacoes.length}</Text>
                                </View>
                                : null}
                        </TouchableOpacity>
                    </View>
                    <TouchableWithoutFeedback onPressIn={() => abrirDrawer()} >
                        <IconMI name='menu' size={30} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Meus churras</Text>

                    <Text style={style.textSubHeader}>Você tem {contadorCriado} eventos criados</Text>
                </View>
            </View>

            {churras.length == 0
                ? (<View style={style.semChurrasbg1}><Image style={style.semChurras1} source={Component1} /></View>)
                : null
            }
            {churras.length == 0
                ? (<View style={style.semChurrasbg2}><Image style={style.semChurras2} source={Component2} /></View>)
                : null
            }

            <FlatList
                data={churras}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={churras => String(churras.id)}
                refreshing={loading}
                onRefresh={loadChurras}
                renderItem={({ item: churras }) => (
                    <View style={style.churras}>
                        <View style={style.churrasDescricao}>
                            <RNSlidingButton
                                style={style.slidingCard}
                                height={100}
                                onSlidingSuccessLeft={() => { setVisivel(true); setChurrasDeletar(churras) }}
                                onSlidingSuccessRight={() => { detalheChurras(churras.id) }}
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
                                                <IconMI style={style.localIcon} name="access-time" size={15} />
                                                <Text style={style.churrasLocal}> {churras.hrInicio}{churras.hrFim != null ? " - " + churras.hrFim : ''}</Text>
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
                )}
            />

            <FloatingAction
                actions={btns}
                color='#800000'
                overlayColor='rgba(68, 68, 68, 0)'
                onPress={() => Vibration.vibrate(50)}
                onPressItem={name => {
                    apertaFabBtn(name)
                }} />

            <Modal
                animationType="fade"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitleCont}>Cancelar churras!</Text>
                        <Text style={style.modalText}>Deseja cancelar o churras <Text style={{ fontWeight: 'bold' }}>{churrasDeletar.nomeChurras}</Text>? </Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => setVisivel(false)}>
                                <Text style={style.iconExitBtn}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.salvarBtn} onPress={() => deletar(churrasDeletar)}>
                                <Text style={style.iconSalvarBtn}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isNotificacoesOpen}
            >
                <View style={style.centeredViewNotf}>
                    <View style={style.modalViewNotf}>
                        <TouchableOpacity style={style.closeNotf} onPress={() => setIsNotificacoesOpen(false)}><IconMCI size={25} name="close-circle-outline" /></TouchableOpacity>
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
                </View>
            </Modal>

        </View>

    )
}