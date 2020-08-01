import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActionButton, ScrollView, FlatList, Modal, Picker, Image, TextInput, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'
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
    const [perfil, setPerfil] = useState(null);
    const [id, setId] = useState(USUARIOLOGADO.id);
    const [visivel, setIsVisivel] = React.useState(false);
    const [page, setPage] = useState(1);
    const [refreshPerfil, setRefreshPerfil] = useState(null);
    const [pontoCarneLista, setPontoCarneLista] = useState([]);
    const [quantidadeComeLista, setQuantidadeComeLista] = useState([]);

    // Dados do usuario
    const [cidade, setCidade] = useState(null);
    const [uf, setUf] = useState(null);
    const [idade, setIdade] = useState(null);
    const [foto, setFoto] = useState(null);
    const [apelido, setApelido] = useState(null);
    const [pontoCarne_id, setPontoCarne_id] = useState(null);
    const [carnePreferida_id, setCarnePreferida_id] = useState(null);
    const [quantidadeCome_id, setQuantidadeCome_id] = useState(null);
    const [bebidaPreferida_id, setBebidaPreferida_id] = useState(null);
    const [acompanhamentoPreferido_id, setAcompanhamentoPreferido_id] = useState(null);
    const [pontoCarne, setPontoCarne] = useState(null);
    const [quantidadeCome, setQuantidadeCome] = useState(null);

    // Dados a serem atualizados pelo usuario
    const [apelidoNovo, setApelidoNovo] = useState(null);
    const [cidadeNova, setCidadeNova] = useState(null);
    const [ufNovo, setUfNovo] = useState(null);
    const [emailNovo, setEmailNovo] = useState(null);
    const [celularNovo, setCelularNovo] = useState(null);
    const [pontoCarneNovo_id, setPontoCarneNovo_id] = useState(null);
    const [quantidadeComeNovo_id, setQuantidadeComeNovo_id] = useState(null);
    // foto ainda nao em uso
    // const [fotoNova, setFotoNova] = useState(null);




    async function loadPerfil() {
        console.log("load perfil "+id)
        setIsVisivel(false)

        setLoading(true);

        const response = await api.get(`/usuarios/${id}`, {
            params: { page }
        }).then(function (response) {
            setCidade(response.data[0].cidade)
            setUf(response.data[0].uf)
            setIdade(response.data[0].idade)
            setFoto(response.data[0].url)
            setApelido(response.data[0].apelido)
            setPontoCarne_id(response.data[0].pontoCarne_id)
            setCarnePreferida_id(response.data[0].carnePreferida_id)
            setQuantidadeCome_id(response.data[0].quantidadeCome_id)
            setBebidaPreferida_id(response.data[0].bebidaPreferida_id)
            setAcompanhamentoPreferido_id(response.data[0].acompanhamentoPreferido_id)
            setPontoCarne(response.data[0].ponto)
            setQuantidadeCome(response.data[0].nomeQuantidadeCome)
        });

        setPerfil(response.data[0]);
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

        setPontoCarneLista([...pontoCarneLista, ...response.data]);
    }

    async function carregarQuantidadeCome() {
        const response = await api.get(`/quantidadecome`)

        setQuantidadeComeLista([...quantidadeComeLista, ...response.data]);
    }

    async function updatePerfil() {

        setLoading(true)

        return api.put(`/usuarios/${id}`, {
            email: emailNovo,
            cidade: cidadeNova,
            uf: ufNovo,
            celular: celularNovo,
            foto_id: 1,
            apelido: apelidoNovo,
            pontoCarne_id: pontoCarneNovo_id,
            quantidadeComeNovo_id: quantidadeComeNovo_id,

        }).then(function (response) {
            if (response.status == 200) {
                loadPerfil()
            }
        })
    }

    return (
        <View style={style.container}>
            <ScrollView style={style.churrasList}>
                <View style={style.backgroundProfile}>
                    <TouchableOpacity style={style.editarContainer} onPress={() => setIsVisivel(true)}>
                        <IconFea name="edit" size={25} color={'white'} />
                    </TouchableOpacity>
                    <View style={style.containerProfile}>
                        <View style={style.background} />
                        <Image source={{ uri: foto }} style={style.profileImg} />
                        <Text style={style.profileName}>{apelido}</Text>
                        <Text style={style.profileLocal}>{cidade} - {uf}</Text>
                        <Text style={style.profileIdade}> {idade} anos</Text>
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
                            <Text style={styles.infosLeft}>{pontoCarne}</Text>
                        </View>
                        <View style={styles.containerInfos}>
                            <IconMCI name="silverware-fork-knife" size={18} />
                            <Text style={styles.infosLeft}>{quantidadeCome}</Text>
                        </View>
                    </View >
                    <View style={style.linhaSeparaçãoHor}></View>
                    <View style={style.containerDir}>
                        <View style={styles.containerInfos}>
                            <Text style={styles.infosRight}>Carne preferida</Text>
                            <IconMCI name="pig" size={18} />
                        </View>
                        <View style={styles.containerInfos}>
                            <Text style={styles.infosRight}>Acompanhamento preferido</Text>
                            <IconFA5 name="bread-slice" size={18} />
                        </View>
                        <View style={styles.containerInfos}>
                            <Text style={styles.infosRight}>Bebida Preferida</Text>
                            <IconFA5 name="beer" size={18} />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <ScrollView>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo apelido?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => setApelidoNovo(text)}
                                    placeholder={'john'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual sua nova cidade?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => setCidadeNova(text)}
                                    placeholder={'Campinas'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo uf?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => setUfNovo(text)}
                                    maxLength={2}
                                    autoCapitalize={"characters"}
                                    placeholder={'SP'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo email?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => setEmailNovo(text)}
                                    maxLength={2}
                                    autoCapitalize={"characters"}
                                    placeholder={'email@123.com'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo celular?</Text>
                                <TextInputMask
                                    style={style.inputStandard}
                                    type={'cel-phone'}
                                    options={{
                                        maskType: 'BRL',
                                        withDDD: true,
                                        dddMask: '(99) '
                                    }}
                                    keyboardType={"phone-pad"}
                                    placeholder={'(xx)xxxxx-xxxx'}
                                    value={celularNovo}
                                    includeRawValueInChangeText={true}
                                    onChangeText={(text, rawText) => setCelularNovo(rawText)}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo ponto?</Text>
                                <Picker
                                    mode="dropdown"
                                    style={style.inputStandard}
                                    selectedValue={pontoCarne_id}
                                    onValueChange={pontoCarne_id => setPontoCarneNovo_id(pontoCarne_id)}
                                >
                                    {pontoCarneLista.map(pontoLista => (
                                        <Picker.Item label={pontoLista.ponto} value={pontoLista.id} />
                                    ))}

                                </Picker>
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Quantidade que come?</Text>
                                <Picker
                                    mode="dropdown"
                                    style={style.inputStandard}
                                    selectedValue={quantidadeCome_id}
                                    onValueChange={quantidadeCome_id => setQuantidadeComeNovo_id(quantidadeCome_id)}
                                >
                                    {quantidadeComeLista.map(quantidadeComeLista => (
                                        <Picker.Item label={quantidadeComeLista.nomeQuantidadeCome + " (" + quantidadeComeLista.quantidade + "g)"} value={quantidadeComeLista.id} />
                                    ))}

                                </Picker>
                            </View>
                        </ScrollView>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => setIsVisivel(false)}>
                                <Icon style={style.iconSalvarBtn} name="times" size={15} />
                                <Text style={style.iconSalvarBtn}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.salvarBtn} onPress={updatePerfil}>
                                <Icon style={style.iconSalvarBtn} name="check" size={15} />
                                <Text style={style.iconSalvarBtn}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}