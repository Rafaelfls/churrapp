import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/Ionicons';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';


import style from './styles';

export default function AdicionarExtras() {

    const navigation = useNavigation();
    const [sugestaoList, setSugestao] = React.useState([])

    async function carregaSugestao() {
        const response = await api.get('/sugestao');

        setSugestao([...sugestaoList, ...response.data]);

    }

    useEffect(() => {
        carregaSugestao();
    }, []);

    function next() {
        navigation.navigate('FinalCriaChurras');
    }

    function escolherPratoPrincipal() {
        navigation.push('EscolherNovosItens4')
    }

    function backHome() {
        navigation.replace('Tabs');
    }

    function onChangeVar(text, varivael) {
        varivael = text;
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Escolha outros itens</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                        <Icon style={style.iconHeaderBtn} name="md-exit" size={22} />
                    </TouchableOpacity>
                </View>

                    <FlatList
                        data={sugestaoList}
                        keyExtractor={sugestaoList => String(sugestaoList.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: sugestaoList }) => (
                            <View>
                                {sugestaoList.tipo_id >= 9 && sugestaoList.tipo_id <= 13 ? (
                                    <View style={style.componentPicker}>
                                        <View style={style.textIcon}>
                                            <IconMCI style={style.iconTipo} name="silverware-fork" size={20} />
                                            <Text style={style.textLabel}>{sugestaoList.nomeItem + " (" + sugestaoList.unidade + ")"}</Text>
                                        </View>
                                        <View style={style.picker}>
                                            <NumericInput
                                                onChange={text => onChangeVar(text, sugestaoList.quantidade)}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={120}
                                                totalHeight={40}
                                                iconSize={18}
                                                initValue={updateValue(sugestaoList.quantidade)}
                                                step={5}
                                                valueType='real'
                                                rounded
                                                textColor='brown'
                                                iconStyle={{ color: 'brown' }}
                                                style={style.quantidadeInput} />
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