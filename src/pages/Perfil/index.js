import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Variaveis: {id, nome, email, cidade, uf, idade, pontoCarne, carnePreferida, quantidadeCome, bebidaFavorita, acompanhamentoFavorito}

import style from './styles';

export default function Perfil(){
    const [loading, setLoading] = useState(false);
    const [perfil, setPerfil] = useState([]);
    const [id, setId] = useState('0516f9fb26e6be70');

    async function loadPerfil() {
        if (loading) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/usuarios?id=${id}`);

        setPerfil([...perfil, ...response.data]);
        setLoading(false);

    }

    useEffect(() => {
        loadPerfil();
    }, []);

    return(
        <View style={style.container}>
            <FlatList
                data={perfil}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={perfil => String(perfil.id)}
                renderItem={({ item: perfil }) => (

                    <View style={style.perfil}>
                        <View style={style.churrasTitleView}>
                            <Text style={style.churrasTitle}>{perfil.nome}</Text>
                        </View>
                        <View style={style.churrasDescricao}>
                            
                            <View style={style.churrasInfosView}>
                                <Text style={style.churrasLocal}>{perfil.email}</Text>
                                <Text style={style.churrasData}>{perfil.cidade} - {perfil.uf} </Text>
                                <Text>{perfil.idade} anos</Text>
                            </View>
                        </View>
                    </View>

                )}
            />

        </View>
    )
}