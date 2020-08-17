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
                    });
                }else{
                console.log("carregaLista",response.data.length)
                setItemList(response.data);
                }
            })        
    }

    useEffect(() => {
        carregaMinhaLista();
    }, []);

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
                        <View style={style.componentPicker}>
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