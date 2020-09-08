import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Vibration, ActivityIndicator, Modal, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import { RNSlidingButton, SlideDirection } from 'rn-sliding-button';

import api from '../../services/api';

import style from './styles';

import { useChurrasCount, useChurrasParticipado } from '../../context/churrasContext';

export default function ResumoChurras() {
    const { churrasCount, setChurrasCount } = useChurrasCount();
    const { churrasParticipado, setChurrasParticipado } = useChurrasParticipado();
    const [ contadorCriado, setContadorCriado ] = useState(USUARIOLOGADO.churrasCriados);

    const route = useRoute();
    const [churras, setChurras] = useState([]);
    const [notificacoes, setnotificacoes] = useState([]);
    const [isNotificacoesOpen, setIsNotificacoesOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visivel, setVisivel] = useState(false)
    const [churrasDeletar, setChurrasDeletar] = useState([]);
    const [refreshChurras, setRefreshChurras] = useState(true);

    const btns = [
        {
            text: "Criar Churras",
            name: "criaChurras",
            color:'#800000',            
            icon: <Icon name="plus" style={style.fabBtnIcon} />,
            position: 1
        },
        {
            text: "Participar do Churras",
            name: "participaChurras",
            color:'#800000',
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
            setRefreshChurras(!refreshChurras)
            api.put(`/usuariosQntCriado/${USUARIOLOGADO.id}`, { churrasCriados: setChurrasCount(churrasCount - 1) });

        });

    }

    function logout() {
        navigation.replace('Login');
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
        navigation.navigate('InicioCriaChurras');
    }

    function ParticiparChurras() {
        navigation.push('ParticiparChurrasco');
    }

    function detalheChurras(churras) {
        navigation.navigate('DetalheChurras', { churras, editavel: true, churrasid: churras.id });
    }


    async function loadChurras() {
        setLoading(true);
        
        const response = await api.get(`/churras/${USUARIOLOGADO.id}`)
        setChurras(response.data);
        setContadorCriado(USUARIOLOGADO.churrasCriados)
        setChurrasCount(contadorCriado);
        setChurrasParticipado(USUARIOLOGADO.churrasParticipados)
        if(response.data.length === contadorCriado){
            console.log("AQUI" + response.data.length )
            api.put(`/usuariosQntCriado/${USUARIOLOGADO.id}`, { churrasCriados: contadorCriado });
        } else if(USUARIOLOGADO.churrasCriados != response.data.length ) {
            if(USUARIOLOGADO.churrasCriados < response.data.length ){
                setContadorCriado(response.data.length )
                setChurrasCount(USUARIOLOGADO.churrasCriados + response.data.length)
                console.log("AQUI2 " + response.data.length + " " + contadorCriado)
            } else if(USUARIOLOGADO.churrasCriados > response.data.length ){
                console.log("AQUI3 " + response.data.length )
                setChurrasCount(response.data.length)
                setContadorCriado(USUARIOLOGADO.churrasCriados)
            }
            console.log("AQUI4 " + response.data.length + " " + contadorCriado + " " + churrasCount)
            api.put(`/usuariosQntCriado/${USUARIOLOGADO.id}`, { churrasCriados: contadorCriado });
        }
        setLoading(false);
    }

    function formatData(data) {
        var date = new Date(data).getDate() + 1
        var month = new Date(data).getMonth() + 1
        var year = new Date(data).getFullYear()
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
            await api.put(`/confirmaPresenca/${notificacao.usuario_id}/${notificacao.churras_id}`)
            await api.delete(`/notificacoes/${notificacao.id}`)
            setChurrasParticipado(churrasParticipado + 1)
            api.put(`/usuariosQntParticipado/${USUARIOLOGADO.id}`, { churrasParticipados: churrasParticipado + 1 });
            setIsNotificacoesOpen(false)
            setRefreshChurras(!refreshChurras);
        }
    }

    return (
        <View style={style.container}>

            <View style={style.header}>
                <View style={style.menuBtn}>
                    {notificacoes.length > 0
                        ? (<TouchableOpacity onPress={notificacao}>
                            <IconMI style={[style.menuIcon, { color: "#800000" }]} name="notifications-active" size={30} />
                        </TouchableOpacity>)
                        : <IconMI style={style.menuIcon} name="notifications-none" size={30} />
                    }
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