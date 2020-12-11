import React, { useState, useEffect, useRef } from 'react';
import {
    View, Text, Image, FlatList, TouchableOpacity, Vibration, ActivityIndicator, Modal,
    RefreshControl, AppState, Platform, TouchableWithoutFeedback, StatusBar, Pressable, ToastAndroid, Animated
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';
import { useIsDrawerOpen } from '@react-navigation/drawer'
import DatePicker from 'react-native-date-picker';
import ActionButton from 'react-native-action-button';
import { Fab } from 'native-base';


import api from '../../services/api';

import semChurras from '../../assets/semChurras.png'
import Component1 from '../../assets/Component1.png'
import Component2 from '../../assets/Component2.png'

import style from './styles';

import { useChurrasCount, useChurrasParticipado, useAppState, useChurras, useEditavel, useLoadingModal, useInitialPage } from '../../context/churrasContext';

import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'native-base';

export default function ResumoChurras() {
    const { churrasCount, setChurrasCount } = useChurrasCount();
    const { churrasParticipado, setChurrasParticipado } = useChurrasParticipado();
    const { loading, setLoading } = useLoadingModal();
    const { setInitialPage } = useInitialPage()
    const { newChurras, setNewChurras } = useChurras();
    const { editavel, setEditavel } = useEditavel();

    const [contadorCriado, setContadorCriado] = useState(USUARIOLOGADO.churrasCriados);

    const route = useRoute();
    const [churras, setChurras] = useState([]);
    const [notificacoes, setnotificacoes] = useState([]);
    const [isNotificacoesOpen, setIsNotificacoesOpen] = useState(false);
    const [visivel, setVisivel] = useState(false)
    const [churrasDeletar, setChurrasDeletar] = useState([]);
    const [refreshChurras, setRefreshChurras] = useState(true);
    const [test, setTest] = useState([]);
    var newChurrasCriados;
    const [ativado, setAtivado] = useState(false);


    const isDrawerOpen = useIsDrawerOpen();


    const [dots, setDots] = useState(false);
    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [rotation, setRotation] = useState(new Animated.Value(0));
    const [dotsAnimation, setDotsAnimation] = useState(new Animated.Value(0));
    const [indexToAnimate, setIndexToanimate] = useState()
    const [dotsMenu, setDotsMenu] = useState(new Animated.Value(0))
    const [contador, setContador] = useState(false)

    //Começo Ouvir Estado do App
    // const appState = useRef(AppState.currentState);
    // const { appStateVisible, setAppStateVisible } = useAppState(appState.current);

    // useEffect(() => {
    //     AppState.addEventListener("change", _handleAppStateChange);
    //     if (Platform.OS == "android") {
    //         AppState.addEventListener("blur", _handleBlurState);
    //     }
    //     return () => {
    //         AppState.removeEventListener("change", _handleAppStateChange);
    //         if (Platform.OS == "android") {
    //             AppState.removeEventListener("blur", _handleBlurState);
    //         }

    //     };
    // }, []);

    // const _handleBlurState = (nextAppState) => {
    //     if (appState.current.match(/active/) && nextAppState === "active") {
    //         console.log("Blur");
    //     }
    //     appState.current = nextAppState;
    //     console.log("AppState", appState.current);
    // }

    // const _handleAppStateChange = (nextAppState) => {
    //     if (appState.current.match(/inactive|background/) && nextAppState === "active") {
    //         console.log("App ativo novamente!");
    //     }

    //     appState.current = nextAppState;
    //     console.log("AppState", appState.current);
    // };
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

    function showToast(churrasToast) {
        ToastAndroid.showWithGravityAndOffset(
            "Churras " + churrasToast.nomeChurras + " foi deletado!", ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            200
        );
    }
    function deletar(churrass) {
        showToast(churrass)
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
        navigation.navigate('InicioCriaChurras');

    }

    function ParticiparChurras() {
        navigation.push('ParticiparChurrasco');
    }

    function detalheChurras(churras) {
        navigation.replace('DetalheChurras', { churras });
        setInitialPage(0);
        setEditavel(true);
        setNewChurras(churras);
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
        if (date === 32) {
            date = "01"
            month = month + 1
            if (month === 13) {
                month = 1
                year += 1
            }
        }
        if (month < 10) {
            month = "0" + month
        }
        return date + '/' + month + '/' + year
    }

    useEffect(() => {
        loadChurras();
    }, [refreshChurras]);
    useEffect(() => {
        loadNotificacoes();
    }, [loading]);

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
            setRefreshChurras(!refreshChurras);
        } else {
            await api.put(`/negarPresenca/${notificacao.usuario_id}/${notificacao.churras_id}`)
            await api.delete(`/notificacoes/${notificacao.id}`)
            setIsNotificacoesOpen(false)
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
            navigation.navigate('DetalheChurras', { churras: churrasId })
            setInitialPage(0);
            setEditavel(false)
        }
    }
    function abrirDrawer() {
        navigation.toggleDrawer()
    }

    const animatedStyles = {
        rotate: {
            transform: [
                {
                    rotate: rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-45deg']
                    })
                }
            ]
        },
        rotateBack: {
            transform: [
                {
                    rotate: rotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '-45deg']
                    })
                }
            ]
        },
        plusMove: {
            transform: [
                {
                    translateY: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-20, 0]
                    })
                }
            ],
            // height: animation.interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [-20, 20]
            // })
        },
        dotMove1: {
            transform: [
                {
                    translateX: dotsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -50]
                    })
                },
                {
                    translateY: dotsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 13]
                    })
                }
            ]
        },
        dotMove2: {
            transform: [
                {
                    translateX: dotsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -25]
                    })
                },
                {
                    translateY: dotsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 5]
                    })
                }
            ]
        },
        dotMove3: {
            transform: [
                {
                    translateX: dotsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0]
                    })
                },
                {
                    translateY: dotsAnimation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -3]
                    })
                }
            ]
        },
        dotMenu: {
            transform: [

                {
                    translateY: dotsMenu.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-40, -8]
                    })
                },
                {
                    translateX: dotsMenu.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 0]
                    })
                },
                {
                    scaleY: dotsMenu.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]
                    })
                }
            ]
        },
        cardExpand: {
            marginBottom: dotsMenu.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 20]
            })
        }
    }

    function rotateFab() {
        const toValue = ativado ? 0 : 1
        setAtivado(!ativado)
        Animated.spring(rotation, {
            toValue,
            friction: 50,
            tension: 140,
            useNativeDriver: true
        }).start()
        Animated.spring(animation, {
            toValue,
            friction: 5,
            tension: 140,
            useNativeDriver: true
        }).start()
    }
    function moveDots() {
        const toValue = dots ? 0 : 1
        setDots(!dots)
        Animated.parallel([
            Animated.spring(dotsAnimation, {
                toValue,
                friction: 50,
                tension: 140,
                useNativeDriver: true
            }),
            Animated.spring(dotsMenu, {
                toValue,
                friction: 50,
                tension: 140,
                delay: 100,
                useNativeDriver: false
            })
        ]).start()

    }
    return (
        <View style={style.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
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
                <View style={{ left: 110, top: 30 }}>
                    <Fab
                        active={ativado}
                        onPress={() => rotateFab()}
                        direction="down"
                        containerStyle={{}}
                        style={{ backgroundColor: 'maroon', zIndex: 4 }}
                    // position="topRight"
                    >
                        <View style={style.fab}>
                            <Animated.View style={[style.plus1, animatedStyles.rotate]} />
                            <Animated.View style={[style.plus2, animatedStyles.rotateBack]} />
                        </View>
                        <Button onPress={() => inicioCriarChurras()} style={{ backgroundColor: 'maroon', zIndex: 3 }}>
                            <Animated.View style={[animatedStyles.plusMove]}>
                                <Text style={{ position: "absolute", color: 'black', left: -125, fontSize: 15, width: '1000%', fontFamily: 'poppins-medium' }}>Criar Churras</Text>
                                <Icon name="plus" style={style.fabBtnIcon} />
                            </Animated.View>
                        </Button>
                        <Button onPress={() => ParticiparChurras()} style={{ backgroundColor: 'maroon', zIndex: 3 }}>
                            <Animated.View style={[animatedStyles.plusMove]}>
                                <Text style={{ position: "absolute", color: 'black', left: -180, fontSize: 15, width: '1000%', fontFamily: 'poppins-medium' }}>Participar do Churras</Text>
                                <Icon name="users" style={style.fabBtnIcon} />
                            </Animated.View>
                        </Button>
                    </Fab>
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
                    <View style={[style.churras]}>
                        <Pressable
                            style={({ pressed }) => [pressed ? style.pressedCard : style.unpressedCard]}
                            delayLongPress={300}
                            onPress={() => { detalheChurras(churras.id); setEditavel(true) }}
                            onLongPress={() => { setVisivel(true); setChurrasDeletar(churras) }}>
                            <View style={[style.slideBtn]}>
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
                        </Pressable>
                        <TouchableOpacity style={[style.extraIconTO]} onPressIn={() => { setIndexToanimate(churras.id); setContador(true) }} onPress={() => { moveDots(); }}>
                            {churras.id == indexToAnimate
                                ?
                                <View>
                                    <View>
                                        <Animated.View style={[style.dot, animatedStyles.dotMove1]} />
                                        <Animated.View style={[style.dot, animatedStyles.dotMove2]} />
                                        <Animated.View style={[style.dot, animatedStyles.dotMove3]} />
                                    </View>
                                    <Animated.View style={[{ top: 8, width: 80, right: 10, backgroundColor: 'rgba(211,211,211,0.8 )', borderRadius: 15, padding: 10 }, animatedStyles.dotMenu]}>
                                        <View>
                                            <TouchableOpacity style={{ borderRadius: 8, backgroundColor: 'rgba(128,128,128 ,0.9)', margin: 2, padding: 1 }} onPress={() => { detalheChurras(churras.id); setEditavel(true) }}>
                                                <Text style={{ color: 'black', fontSize: 12, textAlign: 'center', fontFamily: 'poppins-bold' }}>Editar</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <TouchableOpacity style={{ borderRadius: 8, backgroundColor: 'rgba(128,128,128 ,0.9)', margin: 2, padding: 1 }} onPress={() => { setVisivel(true); setChurrasDeletar(churras) }}>
                                                <Text style={{ color: 'maroon', fontSize: 12, textAlign: 'center', fontFamily: 'poppins-bold' }}>Excluir</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Animated.View>
                                </View>
                                :
                                <View>
                                    <Animated.View style={[style.dot]} />
                                    <Animated.View style={[style.dot]} />
                                    <Animated.View style={[style.dot]} />
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={{ marginBottom: 5 }} />



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