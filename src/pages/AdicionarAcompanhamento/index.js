import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import style from './styles';

export default function AdicionarAcompanhamento() {

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
        navigation.navigate('AdicionarBebidas');
    }

    function escolherAcompanhamentos() {
        navigation.push('EscolherNovosItens2')
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
                        <Text style={style.textHeader}>Vamos escolher os</Text>
                        <Text style={style.textHeader}>acompanhamentos?</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                        <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
                        <Text style={style.textHeaderBtn}>Sair</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.formGroup}>
                    <FlatList
                        data={sugestaoList}
                        keyExtractor={sugestaoList => String(sugestaoList.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: sugestaoList }) => (
                            <View>
                                {sugestaoList.tipo_id >= 6 && sugestaoList.tipo_id <= 6 ? (
                                    <View style={style.componentPicker}>
                                        <Icon style={style.iconTipo} name="feather" size={15} />
                                        <Text style={style.textLabel}>{sugestaoList.nomeItem + " (" + sugestaoList.unidade + ")"}</Text>
                                        <View style={style.picker}>
                                            <NumericInput
                                                onChange={text => onChangeVar(text, sugestaoList.quantidade)}
                                                onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                                totalWidth={150}
                                                totalHeight={30}
                                                iconSize={15}
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
                </View>

                <ActionButton offsetX={10} offsetY={90} onPress={() => escolherAcompanhamentos()} />

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