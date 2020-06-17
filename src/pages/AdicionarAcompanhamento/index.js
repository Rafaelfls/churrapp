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
        id: '1',
        item: 'picanha',
        qtd: 100,
        unidade: 'kg',
        tipo: '1'
    },
    {
        id: '2',
        item: 'coração',
        qtd: 50,
        unidade: 'kg',
        tipo: '3'
    },
    {
        id: '3',
        item: 'tulipa',
        qtd: 50,
        unidade: 'kg',
        tipo: '3'
    },
    {
        id: '4',
        item: 'costela',
        qtd: 100,
        unidade: 'kg',
        tipo: '2'
    },
    {
        id: '5',
        item: 'Arroz',
        qtd: 0.5,
        unidade: 'copos',
        tipo: '6'
    },
    {
        id: '6',
        item: 'Farofa',
        qtd: 50,
        unidade: 'g',
        tipo: '6'
    },
    {
        id: '7',
        item: 'Salpicão',
        qtd: 20,
        unidade: 'g',
        tipo: '6'
    },

]

export default function AdicionarAcompanhamento() {

    const navigation = useNavigation();
    const loginFranca = "0516f9fb26e6be70";
    const loginJoao = "bdadea9527f65f1f";

    function next() {
        navigation.push('AdicionarBebidas');
    }

    function escolherAcompanhamentos() {
        navigation.push('EscolherPratoPrincipal')
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
                        <Text style={style.textHeader}>Vamos escolher os</Text>
                        <Text style={style.textHeader}>acompanhamentos?</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backHome(loginJoao)}>
                        <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
                        <Text style={style.textHeaderBtn}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={style.scrollView}>
                    <View style={style.formGroup}>
                        <FlatList
                            data={pratoPrincipal}
                            keyExtractor={pratoPrincipal => String(pratoPrincipal.id)}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item: pratoPrincipal }) => (
                                <View>
                                    {pratoPrincipal.tipo == 6 &&
                                        <View style={style.componentPicker}>                                    
                                            <MaterialCommunityIcons style={style.iconTipo}  name="rice"/>
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
                </ScrollView>

                <ActionButton offsetX={10} offsetY={90} onPress={escolherAcompanhamentos} />

                <View style={style.footer}>
                    <Text style={style.textFooter}>Etapa 4/6</Text>
                    <TouchableOpacity style={style.continueBtn} onPress={next}>
                        <Icon style={style.iconBtn} name="angle-double-right" size={20} />
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}