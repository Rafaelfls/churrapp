import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActionButton, SafeAreaView, FlatList, Modal, Picker, Image, TextInput, RefreshControl } from 'react-native';
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
import { set } from 'react-native-reanimated';

export default function Perfil() {
    const route = useRoute();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [perfil, setPerfil] = useState([]);
    const [id, setId] = useState(USUARIOLOGADO.id);
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
    const [pontoCarne, setPontoCarne] = useState([]);
    const [quantidadeCome, setQuantidadeCome] = useState([]);
    const [cadastro, setCadastro] = useState(perfil.cadastrado);
    const [page, setPage] = useState(1);
    const [refreshPerfil, setRefreshPerfil] = useState([]);



    async function loadPerfil() {
        if (loading) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/usuarios/${id}`,{
            params: { page }
        });

        setPerfil([...perfil, ...response.data]);
        setPage(1);
        setLoading(false);

    }
    async function onRefresh() {
        setLoading(true);

        const response = await api.get(`/usuarios/${id}`,{
            params: { page }
        });

 

        setPerfil([...refreshPerfil, ...response.data]);
        setPage(1);
        setLoading(false);

    }

    useEffect(() => {
        loadPerfil();
        carregarPonto();
        carregarQuantidadeCome();
    }, []);

    async function carregarPonto() {
        const response = await api.get(`/pontoCarne`)

        setPontoCarne([...pontoCarne, ...response.data]);
    }

    async function carregarQuantidadeCome() {
        const response = await api.get(`/quantidadecome`)

        setQuantidadeCome([...quantidadeCome, ...response.data]);
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
            foto_id: 0,
            apelido: apelido,
            pontoCarne_id: pontoCarne_id,
            carnePreferida_id: carnePreferida_id,
            quantidadeCome_id: quantidadeCome_id,
            bebidaPreferida_id: bebidaPreferida_id,
            acompanhamentoPreferido_id: acompanhamentoPreferido_id,
            cadastrado: cadastro
            
        })
    }

    return (
        <View style={style.container}>

            <FlatList
                data={perfil}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                extraData={perfil.apelido}
                keyExtractor={perfil => String(perfil.id)}
                refreshControl={<RefreshControl refreshing={loading} onRefresh={() => onRefresh()}/>}
                renderItem={({ item: perfil }) => (

                    <View>
                        <View style={style.backgroundProfile}>
                            <TouchableOpacity style={style.editarContainer} onPress={() => setIsVisivel(true)}>
                                <IconFea name="edit" size={25} color={'white'} />
                            </TouchableOpacity>
                            <View style={style.containerProfile}>
                                <View style={style.background} />
                                <Image source={profileImg} style={style.profileImg} />
                                <Text style={style.profileName}>{perfil.apelido}</Text>
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
                                    <Text style={styles.infos}>{perfil.ponto}</Text>
                                </View>
                                <View style={styles.containerInfos}>
                                    <IconMCI name="silverware-fork-knife" size={18} />
                                    <Text style={styles.infos}>{perfil.nomeQuantidadeCome}</Text>
                                </View>
                            </View >
                            <View style={style.containerDir}>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Carne preferida</Text>
                                    <IconMCI name="pig" size={18} />
                                </View>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Acompanhamento preferido</Text>
                                    <IconFA5 name="bread-slice" size={18} />
                                </View>
                                <View style={styles.containerInfos}>
                                    <Text style={styles.infos}>Bebida Preferida</Text>
                                    <IconFA5 name="beer" size={18} />
                                </View>
                            </View>
                        </View>


                    </View>

                )}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <View style={style.editLine}>
                            <Text style={style.modalText}>Qual seu novo apelido?</Text>
                            <TextInput
                                style={style.inputStandard}
                                onChangeText={text => setApelido(text)}
                                placeholder={'john'}
                            />
                        </View>
                        <View style={style.editLine}>
                            <Text style={style.modalText}>Qual sua nova cidade?</Text>
                            <TextInput
                                style={style.inputStandard}
                                onChangeText={text => setCidade(text)}
                                placeholder={'Campinas'}
                            />
                        </View>
                        <View style={style.editLine}>
                            <Text style={style.modalText}>Qual seu novo uf?</Text>
                            <TextInput
                                style={style.inputStandard}
                                onChangeText={text => setUf(text)}
                                maxLength={2}
                                autoCapitalize={"characters"}
                                placeholder={'SP'}
                            />
                        </View>
                        <View style={style.editLine}>
                            <Text style={style.modalText}>Qual seu novo ponto?</Text>
                            <Picker
                                mode="dropdown"
                                style={style.inputStandard}
                                selectedValue={pontoCarne_id}
                                onValueChange={pontoCarne_id => setPontoCarne_id(pontoCarne_id)}
                            >
                                {pontoCarne.map(ponto => (
                                    <Picker.Item label={ponto.ponto} value={ponto.id} />
                                ))}

                            </Picker>
                        </View>
                        <View style={style.editLine}>
                            <Text style={style.modalText}>Quantidade que come?</Text>
                            <Picker
                                mode="dropdown"
                                style={style.inputStandard}
                                selectedValue={quantidadeCome_id}
                                onValueChange={quantidadeCome_id => setQuantidadeCome_id(quantidadeCome_id)}
                            >
                                {quantidadeCome.map(quantidadeCome => (
                                    <Picker.Item label={quantidadeCome.nomeQuantidadeCome + " (" + quantidadeCome.quantidade + "g)"} value={quantidadeCome.id} />
                                ))}

                            </Picker>
                        </View>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => setIsVisivel(false)}>
                                <Icon style={style.iconSalvarBtn} name="times" size={15} />
                                <Text style={style.iconSalvarBtn}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.salvarBtn} onPress={updatePerfil}>
                                <Icon style={style.iconSalvarBtn} name="check" size={15}  />
                                <Text style={style.iconSalvarBtn}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}