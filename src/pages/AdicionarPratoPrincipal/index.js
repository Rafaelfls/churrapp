import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';
import api from '../../services/api';


//Icones imports
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import style from './styles';

export default function AdicionarPratoPrincipal({ route, navigation }) {

    const { convidadosQtd } = route.params;
    const [itemList, setItemList] = React.useState([])
    const { churrascode } = route.params;
    const [jaCarreguei, setJaCarreguei] = React.useState(false);
    const [reload, setReload] = React.useState(false);

    async function carregaSugestao() {
        const response = await api.get('/sugestao');
        setItemList([...itemList, ...response.data]);
    }

    async function carregaMinhaLista() {
        await api.get(`/listadochurras/${churrascode}`).then(
            function (res) {
                console.log(res)
                setItemList([...itemList, ...res.data]);
                setReload(!reload)
            }
        )
    }

    useEffect(() => { }, [reload])

    useEffect(() => {
            carregaMinhaLista();
    }, []);

    function next() {
        navigation.push('AdicionarAcompanhamento');
    }

    function escolherPratoPrincipal() {
        navigation.push('EscolherNovosItens', { churrascode })
    }

    function backHome() {
        navigation.replace('Tabs');
    }

    function updateValue(qtdSugestao) {
        return (qtdSugestao * convidadosQtd)
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
                            {itemList.tipo_id >= 1 && itemList.tipo_id <= 5 ? (
                                <View style={style.componentPicker}>
                                    <View style={style.textIcon}>
                                        <IconMCI style={style.iconTipo} name="silverware-fork" size={20} />
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
                                            step={5}
                                            valueType='real'
                                            rounded
                                            textColor='maroon'
                                            iconStyle={{ color: 'black' }}
                                            style={style.quantidadeInput}
                                        />
                                    </View>
                                </View>
                            ) : null}
                        </View>
                    )}
                    style={style.listStyle} />

                <ActionButton offsetX={10} offsetY={100} onPress={() => escolherPratoPrincipal()} />

                <View style={style.footer}>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}