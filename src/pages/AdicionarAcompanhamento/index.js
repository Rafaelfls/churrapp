import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import api from '../../services/api';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';

import style from './styles';

export default function AdicionarAcompanhamento({ route }) {

    const navigation = useNavigation();
    const [itemList, setItemList] = React.useState([])
    const { convidadosQtd } = route.params;
    const { churrascode } = route.params;
    
    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };


    async function carregaMinhaLista() {
        console.log("carregaMinhaLista")
        await api.get(`/listadochurras/subTipo/${churrascode}/${2}`)
            .then(async function (response) {
                setItemList([])
                console.log("listadochurras", response.data)
                if (response.data == 0) {
                    console.log("carregaSugestao")
                    await api.get(`/sugestao/${2}`).then(function (response) {
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
        navigation.navigate('AdicionarBebidas', { churrascode, convidadosQtd });
    }

    function escolherAcompanhamentos() {
        navigation.push('EscolherNovosItens2', { churrascode })
    }

    function backHome() {
        api.delete(`/churras/${churrascode}`, config)
        .then(function(response){
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
                        <Text style={style.textHeader}>Escolha os acompanhamentos</Text>
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
                                    step={5}
                                    valueType='real'
                                    rounded
                                    textColor='maroon'
                                    iconStyle={{ color: 'black' }}
                                    style={style.quantidadeInput} />
                            </View>
                        </View>
                    )}
                    style={style.listStyle} />

                <ActionButton offsetX={10} offsetY={100} onPress={() => escolherAcompanhamentos()} />

                <View style={style.footer}>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}