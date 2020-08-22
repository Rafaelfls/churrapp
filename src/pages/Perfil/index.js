import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Modal, Picker, Image, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'
import api from '../../services/api';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from '@expo/vector-icons/MaterialCommunityIcons';
import IconFea from '@expo/vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';

import style from './styles';
import { useChurrasCount, useLoadingModal, createLoadingModal } from '../../context/churrasContext';


export default function Perfil() {
    const route = useRoute();
    const navigation = useNavigation();
    const [perfil, setPerfil] = useState([]);
    const [id, setId] = useState(USUARIOLOGADO.id);
    const [visivel, setIsVisivel] = React.useState(false);
    const [page, setPage] = useState(1);
    const [refreshPerfil, setRefreshPerfil] = useState(false);
    const [pontoCarneLista, setPontoCarneLista] = useState([]);
    const [quantidadeComeLista, setQuantidadeComeLista] = useState([]);
    const [isBirthday, setIsBirthday] = useState(false);

    // Dados do usuario
    const [usuario, setUsuario] = useState([]);
    const [usuarioUpdate, setUsuarioUpdate] = useState([]);
    const [idadeAtual, setIdadeAtual] = useState();

    // Dados a serem atualizados pelo usuario
    const [apelidoNovo, setApelidoNovo] = useState(null);
    const [cidadeNova, setCidadeNova] = useState(null);
    const [ufNovo, setUfNovo] = useState(null);
    const [emailNovo, setEmailNovo] = useState();
    const [celularNovo, setCelularNovo] = useState();
    const [pontoCarneNovo_id, setPontoCarneNovo_id] = useState(null);
    const [quantidadeComeNovo_id, setQuantidadeComeNovo_id] = useState(null);
    // foto ainda nao em uso
    // const [fotoNova, setFotoNova] = useState(null);

    const { churrasCount, setChurrasCount } = useChurrasCount();
    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);

    async function loadPerfil() {
        setLoading(true)
        setIsVisivel(false)

        const response = await api.get(`/usuarios/${id}`).then(function (response) {
            setUsuario(response.data)
            setUsuarioUpdate(response.data[0])

            //converter data de nascimento para idade
            formatData(response.data[0].idade)
        }).then(function () {
            setLoading(false)
        });
        setLoading(false);
    }

    function formatData(data) {
        var dataAtual = new Date();
        var anoAtual = dataAtual.getFullYear();
        var diaNasc = new Date(data).getDate() + 1
        var mesNasc = new Date(data).getMonth() + 1
        var anoNasc = new Date(data).getFullYear()
        var idade = anoAtual - anoNasc;
        var mesAtual = dataAtual.getMonth() + 1;
        //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
        if (mesAtual < mesNasc) {
            idade--;
        } else {
            //Se estiver no mes do nascimento, verificar o dia
            if (mesAtual == mesNasc) {
                if (new Date().getDate() < diaNasc) {
                    //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                    idade--;
                }
            }
        }

        //adiciona icone de bolo de aniversario ao lado da idade caso seja aniversario da pessoa
        if (mesAtual == mesNasc && new Date().getDate() == diaNasc) {
            setIsBirthday(true)
        } else {
            setIsBirthday(false)
        }

        setIdadeAtual(idade)
    }

    useEffect(() => {
        loadPerfil();
        carregarPonto();
        carregarQuantidadeCome();
    }, [refreshPerfil]);

    async function carregarPonto() {
        const response = await api.get(`/pontoCarne`)

        setPontoCarneLista(response.data);
    }

    async function carregarQuantidadeCome() {
        const response = await api.get(`/quantidadecome`)

        setQuantidadeComeLista([...quantidadeComeLista, ...response.data]);
    }

    async function updatePerfil() {
        setLoading(true)

        return api.patch(`/usuarios/${id}`, {
            nome: usuarioUpdate.nome,
            sobrenome: usuarioUpdate.sobrenome,
            email: usuarioUpdate.email,
            cidade: usuarioUpdate.cidade,
            uf: usuarioUpdate.uf,
            idade: usuarioUpdate.idade,
            joined: usuarioUpdate.joined,
            senha: usuarioUpdate.senha,
            fotoUrlU: usuarioUpdate.fotoUrlU,
            celular: usuarioUpdate.celular,
            apelido: usuarioUpdate.apelido,
            pontoCarne_id: usuarioUpdate.pontoCarne_id,
            carnePreferida_id: usuarioUpdate.carnePreferida_id,
            quantidadeCome_id: usuarioUpdate.quantidadeCome_id,
            bebidaPreferida_id: usuarioUpdate.bebidaPreferida_id,
            acompanhamentoPreferido_id: usuarioUpdate.acompanhamentoPreferido_id,
            cadastrado: usuarioUpdate.cadastrado,
        }).then(function (response) {
            if (response.status == 200) {
                setRefreshPerfil(!refreshPerfil)
            }
        })
    }

    return (
        <View style={style.container}>
            <FlatList
                data={usuario}
                keyExtractor={item => usuario.id}
                showsVerticalScrollIndicator={false}
                style={style.churrasList}
                renderItem={({ item: usuario }) => (
                    <View>
                        <View style={style.backgroundProfile}>
                            <TouchableOpacity style={style.editarContainer} onPress={() => setIsVisivel(true)}>
                                <IconFea name="edit" size={25} color={'white'} />
                            </TouchableOpacity>
                            <View style={style.containerProfile}>
                                <View style={style.background} />
                                <Image source={{ uri: usuario.fotoUrlU }} style={style.profileImg} />
                                <Text style={style.profileName}>{usuario.apelido}</Text>
                                <Text style={style.profileLocal}>{usuario.cidade} - {usuario.uf}</Text>
                                <View style={style.containerIdade}>
                                    {isBirthday ? <Icon name="birthday-cake" style={style.birthdayCake} size={20} color={'white'} /> : null}
                                    <Text style={style.profileIdade}>{idadeAtual} anos</Text>
                                </View>
                            </View>
                        </View>
                        <View style={style.containerMyChurras}>
                            <View style={style.containerOrg}>
                                <IconMCI name="grill" size={28} />
                                <Text style={style.profileOrg}>Organizou</Text>
                                <Text style={style.profileOrgNumber}>{churrasCount}</Text>
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
                                <View style={style.containerInfos}>
                                    <IconMCI name="cow" size={18} />
                                    <Text style={style.infosLeft}>{usuario.ponto}</Text>
                                </View>
                                <View style={style.containerInfos}>
                                    <IconMCI name="silverware-fork-knife" size={18} />
                                    <Text style={style.infosLeft}>{usuario.nomeQuantidadeCome}</Text>
                                </View>
                            </View >
                            <View style={style.linhaSeparaçãoHor}></View>
                            <View style={style.containerDir}>
                                <View style={style.containerInfos}>
                                    <Text style={style.infosRight}>{usuario.carnePreferida}</Text>
                                    <IconMCI name="pig" size={18} />
                                </View>
                                <View style={style.containerInfos}>
                                    <Text style={style.infosRight}>{usuario.acompanhamentoPreferido}</Text>
                                    <IconFA5 name="bread-slice" size={18} />
                                </View>
                                <View style={style.containerInfos}>
                                    <Text style={style.infosRight}>{usuario.bebidaPreferida}</Text>
                                    <IconFA5 name="beer" size={18} />
                                </View>
                            </View>
                        </View>
                    </View>
                )} />
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
                                    onChangeText={text => {usuarioUpdate.apelido = text}}
                                    placeholder={'john'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual sua nova cidade?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => {usuarioUpdate.cidade = text}}
                                    placeholder={'Campinas'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo uf?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => {usuarioUpdate.uf = text}}
                                    maxLength={2}
                                    autoCapitalize={"characters"}
                                    placeholder={'SP'}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo email?</Text>
                                <TextInput
                                    style={style.inputStandard}
                                    onChangeText={text => {usuarioUpdate.email = text}}
                                    autoCapitalize={"none"}
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
                                    onChangeText={(text, rawText) => {usuarioUpdate.celular = rawText}}
                                />
                            </View>
                            <View style={style.editLine}>
                                <Text style={style.modalText}>Qual seu novo ponto?</Text>
                                <Picker
                                    mode="dropdown"
                                    style={style.inputStandard}
                                    selectedValue={pontoCarneNovo_id}
                                    onValueChange={pontoCarne_id => {usuarioUpdate.pontoCarne_id = pontoCarne_id}}
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
                                    selectedValue={quantidadeComeNovo_id}
                                    onValueChange={quantidadeCome_id => {usuarioUpdate.quantidadeCome_id = quantidadeCome_id}}
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
            {criarModal}
        </View>
    )
}