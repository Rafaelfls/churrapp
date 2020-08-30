import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';
import api from '../../services/api';


//Icones imports
import Icon from 'react-native-vector-icons/Ionicons';
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function AdicionarPratoPrincipal({ route, navigation }) {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const { convidadosQtd } = route.params;
    const { churrascode } = route.params;
    const { primeiroAcesso } = route.params;
    const [itemList, setItemList] = React.useState([])
    const [reload, setReload] = React.useState(false);
    const [itemDeletar, setItemDeletar] = useState([]);
    const [isVisible, setIsVisible] = React.useState(false);
    const [isSugestao, setIsSugestao] = React.useState(false);
    const [isFirstTime, setIsFirstTime] = React.useState(primeiroAcesso);

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    async function carregaMinhaLista() {
        setLoading(true)
        await api.get(`/listadochurras/subTipo/${churrascode}/${1}`)
            .then(async function (response) {
                setItemList([])
                if (response.data == 0) {
                    await api.get(`/sugestao/${1}`).then(function (response) {
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
        if (isSugestao) {
            setLoading(true)
            itemList.map(async item => {
                await api.post('/listadochurras', {
                    quantidade: item.quantidade,
                    churras_id: churrascode,
                    unidade_id: item.unidade_id,
                    item_id: item.item_id,
                    formato_id: 2
                })
            })
        }
        setLoading(false)
        navigation.push('AdicionarAcompanhamento', { churrascode, convidadosQtd });
    }

    function escolherNovosItens() {
        navigation.push('EscolherNovosItens', { churrascode })
    }

    function backHome() {
        LISTADECONVIDADOS = null;
        CONVITE = null;
        setLoading(true)
        api.delete(`/churras/${churrascode}`, config)
            .then(function () {
                setLoading(false)
                navigation.replace('Tabs');
            })
    }

    function updateValue(qtdSugestao) {
        if (isSugestao) {
            if (convidadosQtd == 0 || convidadosQtd == undefined || convidadosQtd == null) {
                return (qtdSugestao)
            } else {
                return (qtdSugestao * convidadosQtd)
            }
        }
        return qtdSugestao
    }

    async function deleteItem(item) {
        setLoading(true)
        await api.delete(`/listadochurras/${item.id}`)
            .then(function () {
                setReload(!reload)
                setIsVisible(false)
                setLoading(false)
            })
    }

    function onChangeVar(text, varivael) {
        varivael = text;
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Carnes:</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                        <Icon style={style.iconHeaderBtn} name="md-exit" size={22} />
                    </TouchableOpacity>
                </View>

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
                            <Text style={style.modalText}>Deseja remover <Text style={{ fontWeight: 'bold' }}>{itemDeletar.nomeItem}</Text> do seu churras? </Text>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.exitBtnModal} onPress={() => setIsVisible(false)}>
                                    <IconF5 style={style.iconSalvarBtnModal} name="times" size={20} />
                                    <Text style={style.iconSalvarBtnModal}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.salvarBtnModal} onPress={() => deleteItem(itemDeletar)}>
                                    <IconF5 style={style.iconSalvarBtnModal} name="check" size={20} />
                                    <Text style={style.iconSalvarBtnModal}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isFirstTime}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitleText}>Info</Text>
                            <Text style={style.modalText}>A seguir o Churrapp preparou para vocês uma sugestão de itens para seu churrasco.</Text>
                            <Text style={style.modalText}>Essa sugestão leva em conta quantos convidados você convidou para seu churras.</Text>
                            <Text style={style.modalText}>Se não gostar da sugestão é so adicionar itens de sua preferencia com as quantidades que preferir.</Text>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.salvarBtnModal} onPress={() => setIsFirstTime(false)}>
                                    <Text style={style.iconSalvarBtnModal}>Ok</Text>
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
                {criarModal}
            </SafeAreaView>
        </View>
    )
}