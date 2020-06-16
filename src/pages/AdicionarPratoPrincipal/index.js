import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input'

import style from './styles';

const pratoPrincipal = [
    {
        id:'1',
        item:'picanha',
        qtd: 100,
        unidade: 'g',
        tipo:'1'
    },
    {
        id:'2',
        item:'coração',
        qtd:50,
        unidade: 'g',
        tipo:'3'
    },
    {
        id:'3',
        item:'tulipa',
        qtd:50,
        unidade: 'g',
        tipo:'3'
    },
    {
        id:'4',
        item:'costela',
        qtd:100,
        unidade: 'g',
        tipo:'2'
    },

]

export default function AdicionarPratoPrincipal() {

    const navigation = useNavigation();

    function next() {
        navigation.push('CriarChurrasco');
    }

    function escolherPratoPrincipal(){
        navigation.push('EscolherPratoPrincipal')
    }

    function backHome(){
        navigation.replace('Tabs')
    }

    const [value, onChangeText] = React.useState('');


    return(
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Vamos escolher as</Text>
                        <Text style={style.textHeader}>carnes?</Text>
                    </View>
                <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                    <Icon style={style.iconHeaderBtn} name="times-circle" size={20} />
                    <Text style={style.textHeaderBtn}>Sair</Text>
                </TouchableOpacity>
                </View>

                <ScrollView style={style.scrollView}>
                    <View style={style.formGroup}>
                    <FlatList 
                        data = {pratoPrincipal}
                        keyExtractor={pratoPrincipal => String(pratoPrincipal.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item: pratoPrincipal})=>(  
                            <View style={style.componentPicker}>
                                <Text style={style.textLabel}>{pratoPrincipal.item +" ("+pratoPrincipal.unidade+")"}</Text>
                                <View style={style.picker}>
                                <NumericInput 
                                    onChange = { text => onChangeText(text) }
                                    onLimitReached={(isMax,msg) => console.log(isMax,msg)}
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
                        )}
                        style={style.listStyle}/>                        
                    </View>
                </ScrollView>

                <ActionButton offsetX={10} offsetY={90} onPress={escolherPratoPrincipal}/>  

                <View style={style.footer}>
                    <Text style={style.textFooter}>Etapa 3/4</Text>
                    <TouchableOpacity style = {style.continueBtn} onPress={next}>
                        <Icon style={style.iconBtn} name  = "angle-double-right" size = {20}/>
                        <Text style={style.textBtn}>Continuar</Text>
                    </TouchableOpacity>
                </View>   
            </SafeAreaView>
        </View>
    )
}