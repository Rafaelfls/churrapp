import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking , Modal, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';
import api from '../../services/api';

//Icones imports
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';


import style from './styles';

export default function AdicionarExtras({ route, navigation }) {

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
        await api.get(`/listadochurras/subTipo/${churrascode}/${4}`)
            .then(async function (response) {
                setItemList([])
                if (response.data == 0) {
                    await api.get(`/sugestao/${4}`).then(function (response) {
                        setItemList(response.data);
                        setIsSugestao(true)
                    });
                } else {
                    setItemList(response.data);
                    setIsSugestao(false)
                }
            })
    }

    useEffect(() => {
        carregaMinhaLista();
    }, [reload]);

    function enviaMensagens(telefone, CONVITE) {
        Linking.canOpenURL(`whatsapp://send?text=${CONVITE}`).then(supported => {
            if (supported) {
                return Linking.openURL(`whatsapp://send?text=${CONVITE}&phone=+55${telefone}`);
            } else {
                return Linking.openURL(`https://api.whatsapp.com/send?phone=+55${telefone}&text=${CONVITE}`)
            }
        })

    }

    async function next() {
        if (isSugestao) {
            itemList.map(async item => {
                await api.post('/listadochurras', {
                    quantidade: item.quantidade,
                    churras_id: churrascode,
                    unidade_id: item.unidade_id,
                    item_id: item.item_id,
                })
            })
        }

        await LISTADECONVIDADOS.map(convid => enviaMensagens(convid.telefone, CONVITE))

        navigation.navigate('FinalCriaChurras');
    }

    function escolherNovosItens() {
        navigation.push('EscolherNovosItens4', { churrascode })
    }

    function backHome() {
        LISTADECONVIDADOS=null;
        CONVITE = null;
        api.delete(`/churras/${churrascode}`, config)
            .then(function (response) {
                navigation.replace('Tabs');
            })
    }

    async function deleteItem(item) {
        await api.delete(`/listadochurras/${item.id}`)
            .then(function () {
                setReload(!reload)
                setIsVisible(false)
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

    function onChangeVar(text, varivael) {
        varivael = text;
    }

    console.log(LISTADECONVIDADOS,CONVITE)


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Outros itens:</Text>
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
                <View style={style.footer}>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}