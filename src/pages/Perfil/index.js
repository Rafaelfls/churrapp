import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActionButton, SafeAreaView, FlatList, Modal, Picker, Image, TextInput } from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import IconOct from 'react-native-vector-icons/Octicons';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from '@expo/vector-icons/MaterialCommunityIcons';
import IconFea from '@expo/vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Variaveis: {id, nome, email, cidade, uf, idade, pontoCarne, carnePreferida, quantidadeCome, bebidaFavorita, acompanhamentoFavorito}

import backgroundImg from '../../assets/fundoDescricao.jpg';
import profileImg from '../../assets/Perfil.jpg';

import style from './styles';
import { Container } from 'native-base';
import styles from './styles';

export default function Perfil() {
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [perfil, setPerfil] = useState([]);
    const [id, setId] = useState('dcca00a6fb1c45a8');
    const [visivel, setIsVisivel] = React.useState(false);
    const [nome, setNome] = useState(perfil.nome);
    const [sobrenome, setSobrenome] = useState(perfil.sobrenome);
    const [email, setEmail] = useState(perfil.email);
    const [cidade, setCidade] = useState(perfil.cidade);
    const [uf, setUf] = useState(perfil.uf);
    const [idade, setIdade] = useState(perfil.idade);
    const [joined, setJoined] = useState(perfil.joined);
    const [celular, setCelular] = useState(perfil.celular);
    const [foto, setFoto] = useState(perfil.foto);
    const [apelido, setApelido] = useState(perfil.apelido);
    const [pontoCarne_id, setPontoCarne_id] = useState(perfil.pontoCarne_id);
    const [carnePreferida_id, setCarnePreferida_id] = useState(perfil.carnePreferida_id);
    const [quantidadeCome_id, setQuantidadeCome_id] = useState(perfil.quantidadeCome_id);
    const [bebidaPreferida_id, setBebidaPreferida_id] = useState(perfil.bebidaPreferida_id);
    const [acompanhamentoPreferido_id, setAcompanhamentoPreferido_id] = useState(perfil.acompanhamentoPreferido_id);



    async function loadPerfil() {
        if (loading) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/usuarios/${id}`);

        setPerfil([...perfil, ...response.data]);
        setLoading(false);

    }

    useEffect(() => {
        loadPerfil();
    }, []);

    function confirmar() {
        updatePerfil();        
    }


    async function updatePerfil() {

        return api.put(`/usuarios/${id}`, {
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            cidade: cidade,
            uf: uf,
            idade: idade,
            joined: joined,
            celular: celular,
            foto: foto,
            apelido: apelido,
            pontoCarne_id: pontoCarne_id,
            carnePreferida_id: carnePreferida_id,
            quantidadeCome_id: quantidadeCome_id,
            bebidaPreferida_id: bebidaPreferida_id,
            acompanhamentoPreferido_id: acompanhamentoPreferido_id
        });
    }

  

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
                                    <IconFea name="edit" size={25} style={style.editIcon} onPress={() => setIsVisivel(true)}/>
                                </TouchableOpacity>
                            </View>
                            <View style={style.containerProfile}>
                                <View style={style.background} />
                                <Image source={profileImg} style={style.profileImg} />
                                <Text style={style.profileName}>{perfil.nome}</Text>
                                <Text style={style.profileLocal}>{perfil.cidade} - {perfil.uf}</Text>
                                <Text style={style.profileIdade}>{perfil.idade} anos</Text>
                                <Text style={style.profileIdade}>Mais conhecido como: {perfil.apelido}</Text>
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
                                    <Text style={styles.infos}>{perfil.ponto}</Text>
                                </View>
                                <View style={styles.containerInfos}>
                                    <IconMCI name="silverware-fork-knife" size={18} />
                                    <Text style={styles.infos}>{perfil.nomeQuantidadeCome}</Text>
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
            <Modal
                    animationType="slide"
                    transparent={false}
                    visible={visivel}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => setIsVisivel(false)}>
                                <Icon style={style.iconHeaderBtn} name="times" size={20} />
                            </TouchableOpacity>
                            <Text style={style.modalText}>Qual seu novo apelido?</Text>
                            <TextInput
                            style={style.inputStandard}
                            onChangeText={text => setApelido(text)}
                            placeholder={'Sadocco'}
                            />
                            <Text style={style.modalText}>Qual seu novo nome?</Text>
                            <TextInput
                            style={style.inputStandard}
                            onChangeText={text => setNome(text)}
                            placeholder={'Sadocco'}
                            />
                            <Text style={style.modalText}>Qual seu novo ponto?</Text>
                            <TextInput
                            style={style.inputStandard}
                            onChangeText={text => setPontoCarne_id(text)}
                            placeholder={'Sadocco'}
                            />
                            <View style={style.selectionForm}>
                            </View>
                            <TouchableOpacity style={style.salvarBtn}>
                                <Icon style={style.iconSalvarBtn} name="check" size={20} onPress={confirmar}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

        </View>
    )
}