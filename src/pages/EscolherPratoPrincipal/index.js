import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import style from './styles';

export default function EscolherPratoPrincipal({navigation}){

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    
    async function carregarItem() {
        if (loading) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/item`);

        setItem([...item, ...response.data]);
        setLoading(false);

    }

    useEffect(() => {
        carregarItem();
    }, []);

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

                <FlatList
                data={item}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => String(item.id)}
                renderItem={({ item: item }) => (
                        <View>
                            <TouchableOpacity style={style.card} onPress={() => nextFiltering(item.tipo)}>
                                <MaterialCommunityIcons style={style.iconTipo} name="cow"/>
                                <Text style={style.textCard}>{item.nomeItem}</Text>
                            </TouchableOpacity>
                        </View>
                        )}
                    />

            </SafeAreaView>
        </View>
    )

}