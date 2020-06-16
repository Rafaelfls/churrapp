import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import IconOct from 'react-native-vector-icons/Octicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from '@expo/vector-icons/MaterialCommunityIcons'; 

// Variaveis: {id, nome, email, cidade, uf, idade, pontoCarne, carnePreferida, quantidadeCome, bebidaFavorita, acompanhamentoFavorito}

import backgroundImg from '../../assets/fundoDescricao.jpg';
import profileImg from '../../assets/rafaelPerfil.jpg';

import style from './styles';
import { Container } from 'native-base';
import styles from './styles';

export default function Perfil() {
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

    return (
        <View style={style.container}>
            <FlatList
                data={perfil}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={perfil => String(perfil.id)}
                renderItem={({ item: perfil }) => (

                    <View>
                        <View style={style.containerProfile}>
                            <View style={style.background} />
                            <Image source={profileImg} style={style.profileImg} />
                            <Text style={style.profileName}>{perfil.nome}</Text>
                            <Text style={style.profileLocal}>{perfil.cidade} - {perfil.uf}</Text>
                            <Text style={style.profileIdade}>{perfil.idade} anos</Text>
                            <Text style={style.profileOrg}>Organizou 3 churrascos</Text>
                            <Text style={style.profilePart}>Participou de 7 churrascos</Text>
                        </View>

                        <View style={style.containerGeral}>
                            <View style={style.containerEsq}>
                                <View style={styles.containerInfos}> 
                                    <IconMCI name = "cow" size={18} />
                                    <Text style={styles.infos}>Mal Passada</Text>
                                </View>
                                <View style={styles.containerInfos}>
                                    <IconMCI name = "silverware-fork-knife" size={18} />
                                    <Text style={styles.infos}>Pedreiro</Text>
                                </View>
                                <View style={styles.containerInfos}>
                                    <IconEnt name = "drink" size={18} />
                                    <Text style={styles.infos}>Pinguço</Text>
                                </View>
                            </View >
                            <View style={style.containerDir}>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Panceta</Text>
                                    <IconMCI name = "pig" size={18} />
                                </View>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Pão de Alho</Text>
                                    <IconFA5 name = "bread-slice" size={18} />
                                </View>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Heineken</Text>
                                    <IconFA5 name = "beer" size={18} />
                                </View>
                            </View>
                        </View>

                        <View style = {style.editarContainer}>
                            <TouchableOpacity>
                            <Text style = {style.editar}>editar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
            />

        </View>
    )
}