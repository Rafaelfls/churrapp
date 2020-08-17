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

export default function AdicionarPratoPrincipal({ route, navigation }) {

    const { convidadosQtd } = route.params;
    const [itemList, setItemList] = React.useState([])
    const [reload, setReload] = React.useState(false);
    const [itemDeletar, setItemDeletar] = useState([]);
    const [isSugestao, setIsSugestao] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const { churrascode } = route.params;

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    async function carregaMinhaLista() {
        console.log("carregaMinhaLista")
        await api.get(`/listadochurras/subTipo/${churrascode}/${1}`)
            .then(async function (response) {
                setItemList([])
                console.log("listadochurras", response.data)
                if (response.data == 0) {
                    console.log("carregaSugestao")
                    await api.get(`/sugestao/${1}`).then(function (response) {
                        setItemList(response.data);
                        setIsSugestao(true)
                    });
                } else {
                    console.log("carregaLista", response.data.length)
                    setItemList(response.data);
                    setIsSugestao(false)
                }
            })
    }

    useEffect(() => {
        carregaMinhaLista();
    }, [reload]);

    function next() {
        navigation.push('AdicionarAcompanhamento', { churrascode, convidadosQtd });
    }

    function escolherPratoPrincipal() {
        navigation.push('EscolherNovosItens', { churrascode })
    }

    function backHome() {
        api.delete(`/churras/${churrascode}`, config)
            .then(function () {
                navigation.replace('Tabs');
            })
    }

    function updateValue(qtdSugestao) {
        console.log(qtdSugestao, convidadosQtd)
        if (convidadosQtd == 0 || convidadosQtd == undefined || convidadosQtd == null) {
            return (qtdSugestao)
        } else {
            return (qtdSugestao * convidadosQtd)
        }
    }

    async function deleteItem(item) {
        await api.delete(`/listadochurras/${item.id}`)
            .then(function () {
                setReload(!reload)
                setIsVisible(false)
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
                        <Text style={style.textHeader}>Escolha as carnes</Text>
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
                                        <Text style={style.textLabel}>{itemList.nomeItem + " (" + itemList.unidade + ")"}</Text>
                                    </View>
                                    <View style={style.picker}>
                                        <NumericInput
                                            onChange={text => onChangeVar(text, itemList.quantidade)}
                                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                            totalWidth={120}
                                            totalHeight={40}
                                            iconSize={18}
                                            initValue={updateValue(itemList.quantidade)}
                                            valueType='real'
                                            rounded
                                            textColor='maroon'
                                            iconStyle={{ color: 'black' }}
                                            style={style.quantidadeInput}
                                        />
                                    </View>
                                </View>)
                                // Caso nao seja sujestão o item pode ser deletado
                                : (<TouchableOpacity style={style.componentPicker} onPress={() => { setIsVisible(true); setItemDeletar(itemList) }}>
                                    <View style={style.textIcon}>
                                        <Text style={style.textLabel}>{itemList.nomeItem + " (" + itemList.unidade + ")"}</Text>
                                    </View>
                                    <View style={style.picker}>
                                        <NumericInput
                                            onChange={text => onChangeVar(text, itemList.quantidade)}
                                            onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                            totalWidth={120}
                                            totalHeight={40}
                                            iconSize={18}
                                            initValue={updateValue(itemList.quantidade)}
                                            valueType='real'
                                            rounded
                                            textColor='maroon'
                                            iconStyle={{ color: 'black' }}
                                            style={style.quantidadeInput}
                                        />
                                    </View>
                                </TouchableOpacity>)}
                        </View>
                    )}
                    style={style.listStyle} />

                <ActionButton offsetX={10} offsetY={100} onPress={() => escolherPratoPrincipal()} />

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
                <View style={style.footer}>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}