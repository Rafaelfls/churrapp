import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import style from './styles';


// Prato principal
// 1 -> Vaca
// 2 -> Porco
// 3 -> Frango
// 4 -> Peixe
// 5 -> Exótico

// Acompanhamentos
// 6 -> Acompanhamentos

// Bebidas
// 7 -> Bebidas
// 8 -> Bebidas Alcoólicas

// Extras
// 9 -> Descartáveis
// 10 -> Utensílios
// 11 -> Utensílios Consumíveis
// 12 -> Diversão
// 13 -> Temperos

var pratoPrincipal = [
    {
        id: '11',
        item: 'Coca Cola',
        qtd: 20,
        unidade: 'garrafa',
        tipo: '7'
    },
    {
        id: '12',
        item: 'Copo 200ml',
        qtd: 100,
        unidade: 'unidades',
        tipo: '9'
    },
    {
        id: '13',
        item: 'Narguile',
        qtd: 1,
        unidade: 'unidades',
        tipo: '12'
    },
    {
        id: '14',
        item: 'Sal grosso',
        qtd: 100,
        unidade: 'unidades',
        tipo: '13'
    },

]

export default function AdicionarExtras() {

    const navigation = useNavigation();
    const loginFranca = "0516f9fb26e6be70";
    const loginJoao = "bdadea9527f65f1f";

    function next() {
        navigation.push('FinalCriaChurras');
    }

    function escolherPratoPrincipal(tela) {
        navigation.push('EscolherNovosItens',{tela})
    }

    function backHome() {
        navigation.replace('Tabs', {
            screen: 'Meu Churras',
            params: { loginFranca, loginJoao }
        });
    }

    function onChangeVar(text, varivael) {
        console.log("Var " + varivael + " text " + text)
        varivael = text;
        console.log("Var " + varivael + " text " + text)
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Vamos escolher </Text>
                        <Text style={style.textHeader}>outros itens?</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backHome(loginJoao)}>
                        <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
                        <Text style={style.textHeaderBtn}>Sair</Text>
                    </TouchableOpacity>
                </View>

                    <View style={style.formGroup}>
                        <FlatList
                            data={pratoPrincipal}
                            keyExtractor={pratoPrincipal => String(pratoPrincipal.id)}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: pratoPrincipal }) => (
                                <View>
                                    {pratoPrincipal.tipo >= 9 &&
                                        <View style={style.componentPicker}>
                                            <MaterialCommunityIcons style={style.iconTipo} name="silverware-fork-knife"/>
                                            <Text style={style.textLabel}>{pratoPrincipal.item + " (" + pratoPrincipal.unidade + ")"}</Text>
                                            <View style={style.picker}>
                                                <NumericInput
                                                    onChange={text => onChangeVar(text, pratoPrincipal.qtd)}
                                                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                    totalWidth={150}
                                                    totalHeight={30}
                                                    iconSize={15}
                                                    initValue={pratoPrincipal.qtd}
                                                    step={5}
                                                    valueType='real'
                                                    rounded
                                                    textColor='brown'
                                                    iconStyle={{ color: 'brown' }}
                                                    style={style.quantidadeInput} />
                                            </View>
                                        </View>
                                    }
                                </View>
                            )}
                            style={style.listStyle} />
                    </View>

                <ActionButton offsetX={10} offsetY={90} onPress={()=>escolherPratoPrincipal(4)} />

                <View style={style.footer}>
                    <Text style={style.textFooter}>Etapa 6/6</Text>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Icon style={style.iconBtn} name="angle-double-right" size={20} />
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}