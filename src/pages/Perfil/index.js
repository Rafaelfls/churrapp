import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import IconOct from 'react-native-vector-icons/Octicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from '@expo/vector-icons/MaterialCommunityIcons';
import IconFea from '@expo/vector-icons/Feather';

// Variaveis: {id, nome, email, cidade, uf, idade, pontoCarne, carnePreferida, quantidadeCome, bebidaFavorita, acompanhamentoFavorito}

import backgroundImg from '../../assets/fundoDescricao.jpg';
import profileImg from '../../assets/Perfil.jpg';

import style from './styles';
import { Container } from 'native-base';
import styles from './styles';

export default function Perfil() {
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [perfil, setPerfil] = useState([]);
    const [id, setId] = useState('99d8830296d7c838');

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
                        <View style={style.backgroundProfile}>
                            <View style={style.editarContainer}>
                                <TouchableOpacity>
                                    <IconFea name="edit" size={25} style={style.editIcon}/>
                                </TouchableOpacity>
                            </View>
                            <View style={style.containerProfile}>
                                <View style={style.background} />
                                <Image source={profileImg} style={style.profileImg} />
                                <Text style={style.profileName}>{perfil.nome}</Text>
                                <Text style={style.profileLocal}>{perfil.cidade} - {perfil.uf}</Text>
                                <Text style={style.profileIdade}>{perfil.idade} anos</Text>
                            </View>
                        </View>
                            <View style={style.containerMyChurras}>
                                <View style={style.containerOrg}>
                                    <IconMCI name="grill" size={28} />
                                    <Text style={style.profileOrg}>Organizou</Text>
                                    <Text style={style.profileOrgNumber}>3</Text>
                                </View>
                                <View style={style.linhaSeparaçãoHor}></View>
                                <View style={style.containerPart}>
                                    <IconMCI name="grill" size={28} />
                                    <Text style={style.profilePart}>Participou</Text>
                                    <Text style={style.profilePartNumber}>7</Text>
                                </View>
                            
                        </View>
                        <View style={style.containerGeral}>
                            <View style={style.containerEsq}>
                                <View style={styles.containerInfos}>
                                    <IconMCI name="cow" size={18} />
                                    <Text style={styles.infos}>Mal Passada</Text>
                                </View>
                                <View style={styles.containerInfos}>
                                    <IconMCI name="silverware-fork-knife" size={18} />
                                    <Text style={styles.infos}>Pedreiro</Text>
                                </View>
                                <View style={styles.containerInfos}>
                                    <IconEnt name="drink" size={18} />
                                    <Text style={styles.infos}>Pinguço</Text>
                                </View>
                            </View >
                            <View style={style.containerDir}>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Panceta</Text>
                                    <IconMCI name="pig" size={18} />
                                </View>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Pão de Alho</Text>
                                    <IconFA5 name="bread-slice" size={18} />
                                </View>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Heineken</Text>
                                    <IconFA5 name="beer" size={18} />
                                </View>
                            </View>
                        </View>


                    </View>

                )}
            />

        </View>
    )
}