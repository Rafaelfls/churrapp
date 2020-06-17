import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import style from './styles';

export default function EscolherPratoPrincipal({navigation}){
    
    function backHome(){
        navigation.navigate('AdicionarPratoPrincipal')
    }

    function nextFiltering(tipo){
        navigation.push('TodosOsItensAdicionar', {tipo})
    }

    return(
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Quais carnes quer</Text>
                        <Text style={style.textHeader}>adicionar?</Text>
                    </View>
                <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                    <Icon style={style.iconHeaderBtn} name="arrow-alt-circle-left" size={20} />
                    <Text style={style.textHeaderBtn}>Voltar</Text>
                </TouchableOpacity>
                </View>                 

                <ScrollView>
                        <TouchableOpacity style={style.card} onPress={() => nextFiltering(1)}>
                            <MaterialCommunityIcons style={style.iconTipo} name="cow"/>
                            <Text style={style.textCard}>Bovino</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.card} onPress={() => nextFiltering(2)}>
                            <Icon style={style.iconTipo} name  = "piggy-bank"/>
                            <Text style={style.textCard}>Suino</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.card} onPress={() => nextFiltering(3)}>
                            <Icon style={style.iconTipo} name  = "feather"/>
                            <Text style={style.textCard}>Frango</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.card} onPress={() => nextFiltering(4)}>
                            <Icon style={style.iconTipo} name="fish" />
                            <Text style={style.textCard}>Peixe</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.card} onPress={() => nextFiltering(5)}>
                            <MaterialCommunityIcons style={style.iconTipo} name="rabbit" />
                            <Text style={style.textCard}>Exoticas</Text>
                        </TouchableOpacity>
                    </ScrollView>

            </SafeAreaView>
        </View>
    )

}