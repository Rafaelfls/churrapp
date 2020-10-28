import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, Modal, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconFat from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function AdicionarAcompanhamento({ route, navigation }) {
    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const { convidadosQtd } = route.params;
    const [itemList, setItemList] = React.useState([])
    const [reload, setReload] = React.useState(false);
    const [isSugestao, setIsSugestao] = React.useState(false);
    const [itemDeletar, setItemDeletar] = useState([]);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalSair, setModalSair] = useState(false)
    const { churrascode } = route.params;

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    async function carregaMinhaLista() {
        setLoading(true)
        await api.get(`/listadochurras/subTipo/${churrascode}/${2}`)
            .then(async function (response) {
                setItemList([])
                if (response.data == 0) {
                    await api.get(`/sugestao/${2}`).then(function (response) {
                        setItemList(response.data);
                        setIsSugestao(true)
                        setLoading(false)
                    });
                } else {
                    setItemList(response.data);
                    setIsSugestao(false)
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        carregaMinhaLista();
    }, [reload]);

    function next() {
        navigation.navigate('AdicionarBebidas', { churrascode, convidadosQtd });
    }

    function escolherNovosItens() {
        navigation.push('EscolherNovosItens2', { churrascode })
    }

    function backHome() {
        LISTADECONVIDADOS = null;
        CONVITE = null;
        setLoading(true)
        api.delete(`/churras/${churrascode}`, config)
            .then(function (response) {
                navigation.replace('Tabs');
                setLoading(false)
            })
        setModalSair(false)
    }

    function backOnePage() {
        setLoading(true)
        setItemList([])
        setLoading(false)
        navigation.goBack()
    }

    function updateValue(qtdSugestao) {
        if (isSugestao) {
            if (convidadosQtd == 0 || convidadosQtd == undefined || convidadosQtd == null) {
                return (qtdSugestao).toFixed(2)
            } else {
                return (qtdSugestao * (convidadosQtd)).toFixed(2)
            }
        }
        var val = qtdSugestao.toFixed(2)
        return val
    }

    function onChangeVar(text, varivael) {
        varivael = text;
    }

    async function deleteItem(item) {
        setLoading(true)
        var precoFinalTotal = item.precoItem * item.quantidade;
        await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
            valorTotal: -precoFinalTotal
        }).then(async function(){
            await api.delete(`/listadochurras/${item.id}`)
            .then(function (res) {
                setIsEnabled(false)
                setIsVisible(false)
                setReload(!reload)
                setLoading(false)
            })
        }) 
    }

    async function adicionarSugestao() {
        setLoading(true)
        setIsEnabled(previousState => !previousState)
        if (!isEnabled) {
            if (isSugestao) {
                setLoading(true)
                itemList.map(async item => {
                    var quantidadeFinal = item.quantidade * convidadosQtd
                    await api.post('/listadochurras', {
                        quantidade: quantidadeFinal,
                        churras_id: churrascode,
                        unidade_id: item.unidade_id,
                        item_id: item.item_id,
                        formato_id: 7,
                        precoItem: item.precoMedio,
                    }).then(async function (res) {
                        var precoFinalTotal = item.precoMedio * quantidadeFinal;
                        await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
                            valorTotal: precoFinalTotal
                        })
                    })
                })
            }
            setIsSugestao(false)
            setReload(!reload)
            setLoading(false)
        } else {
            await api.get(`/sugestao/${1}`).then(function (response) {
                response.data.map(async item => {
                    var quantidadeFinal = item.quantidade * convidadosQtd
                    await api.post('/listadochurras', {
                        quantidade: -quantidadeFinal,
                        churras_id: churrascode,
                        unidade_id: item.unidade_id,
                        item_id: item.item_id,
                        formato_id: 7,
                        precoItem: item.precoMedio,
                    }).then(async function (res) {
                        var precoFinalTotal = item.precoMedio * item.quantidade;
                        await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
                            valorTotal: -precoFinalTotal
                        })
                    })
                })
                setReload(!reload)
            });
        }
        setLoading(false)
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backOnePage()}>
                        <IconFat style={style.iconHeaderBtn} name="chevron-left" size={22} />
                    </TouchableOpacity>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Acompanhamentos</Text>
                    </View>

                    <TouchableOpacity style={style.exitBtn} onPress={() => setModalSair(true)}>
                        <Icon style={style.iconHeaderBtn} name="md-close" size={22} />
                    </TouchableOpacity>
                </View>
                {isSugestao
                    ? <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: "center", alignItems: "center" }}>
                        {isEnabled
                            ? <Text style={style.textLabel}>Apagar sugestão?</Text>
                            : <Text style={style.textLabel}>Manter sugestão?</Text>
                        }

                        <Switch
                            trackColor={{ false: "gray", true: "maroon" }}
                            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={adicionarSugestao}
                            value={isEnabled}
                        />
                    </View>
                    : null
                }

                <FlatList
                    data={itemList}
                    keyExtractor={itemList => itemList.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: itemList }) => (
                        <View>
                            {isSugestao == true
                                // Caso seja seja sujestão o item não pode ser deletado
                                ? (<View style={style.componentPicker}>
                                    <View style={style.textIcon}>
                                        <Text style={style.textLabel}>{itemList.nomeItem}</Text>
                                    </View>
                                    <View style={style.picker}>
                                        <Text style={style.textLabel}>{updateValue(itemList.quantidade) + " " + itemList.unidade}</Text>
                                    </View>
                                </View>)
                                // Caso nao seja sujestão o item pode ser deletado
                                : (<TouchableOpacity style={style.componentPicker} onPress={() => { setIsVisible(true); setItemDeletar(itemList) }}>
                                    <View style={style.textIcon}>
                                        <Text style={style.textLabel}>{itemList.nomeItem}</Text>
                                    </View>
                                    <View style={style.picker}>
                                        <Text style={style.textLabel}>{updateValue(itemList.quantidade) + " " + itemList.unidade}</Text>
                                    </View>
                                </TouchableOpacity>)}
                        </View>
                    )}
                    style={style.listStyle} />

                <ActionButton offsetX={10} offsetY={100} onPress={() => escolherNovosItens()} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitleText}>Deletar</Text>
                            <Text style={style.modalText}>Deseja remover <Text style={{ fontFamily: 'poppins-medium' }}>{itemDeletar.nomeItem}</Text> do seu churras? </Text>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.exitBtnModal} onPress={() => setIsVisible(false)}>
                                    <Text style={style.iconSalvarBtnModal}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.exitBtnModal} onPress={() => deleteItem(itemDeletar)}>
                                    <Text style={style.iconSalvarBtnModal}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={style.footer}>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSair}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitle}>Quer sair?</Text>
                            <Text style={style.modalTextSair}>Você deseja mesmo cancelar este churrasco?</Text>
                            <Text style={style.confirmarSairSubTitle}>(Tudo que fez até aqui sera perdido)</Text>
                            <View style={style.footerModalSair}>
                                <TouchableOpacity style={style.sairBtn} onPress={() => setModalSair(false)}>
                                    <Text style={style.textBtn}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.sairBtn} onPress={() => backHome()}>
                                    <Text style={style.textBtn}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {criarModal}
            </SafeAreaView>
        </View>
    )
}