import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, Modal, Picker, Image, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text'
import api from '../../services/api';
import IconMCI from '@expo/vector-icons/MaterialCommunityIcons';
import IconMI from '@expo/vector-icons/MaterialIcons';
import IconFea from '@expo/vector-icons/Feather';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import { FloatingAction } from "react-native-floating-action";
import * as Crypto from 'expo-crypto';
import { useIsDrawerOpen } from '@react-navigation/drawer'


//Criando Icone Customizável
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../../../selection.json';
import { TouchableHighlight } from 'react-native-gesture-handler';
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'zondicon-icon', 'icomoon.ttf');
//Fim
import style from './styles';
import { useLoadingModal, createLoadingModal, useEditavel } from '../../context/churrasContext';


export default function Perfil() {
    const route = useRoute();
    const navigation = useNavigation();
    const [id, setId] = useState(USUARIOLOGADO.id);
    const [visivel, setIsVisivel] = React.useState(false);
    const [refreshPerfil, setRefreshPerfil] = useState(false);
    const [pontoCarneLista, setPontoCarneLista] = useState([]);
    const [quantidadeComeLista, setQuantidadeComeLista] = useState([]);
    const [isBirthday, setIsBirthday] = useState(false);


    const [search, setSearchCarne] = useState('');
    const [tipo, setTipo] = useState([]);
    const [dadoFiltrado, setDadoFiltrado] = useState(null);

    const [searchAcompanhamento, setSearchAcompanhamento] = useState('');
    const [tipoAcompanhamento, setTipoAcompanhamento] = useState([]);
    const [dadoFiltradoAcompanhamento, setDadoFiltradoAcompanhamento] = useState(null);
    const [acompanhamentoPreferidoNovo, setAcompanhamentoPreferidoNovo] = useState(0);

    const [searchBebida, setSearchBebida] = useState('');
    const [tipoBebida, setTipoBebida] = useState([]);
    const [dadoFiltradoBebida, setDadoFiltradoBebida] = useState(null);
    const [bebidaPreferidaNovo, setBebidaPreferidaNovo] = useState(0)

    const [searchSobremesa, setSearchSobremesa] = useState('');
    const [tipoSobremesa, setTipoSobremesa] = useState([]);
    const [dadoFiltradoSobremesa, setDadoFiltradoSobremesa] = useState(null);
    const [sobremesaPreferidaNovo, setSobremesaPreferidaNovo] = useState(0)


    // Dados do usuario
    const [usuario, setUsuario] = useState([]);
    const [image, setImage] = useState({ cancelled: true, uri: null });
    const [idadeAtual, setIdadeAtual] = useState();

    //editar perfil
    const [allowEditing, setAllowEditing] = useState([false, 'darkgray'])
    const [returnVisivel, setReturnVisivel] = useState([false])
    const [nomeNovo, setNomeNovo] = useState('')
    const [sobrenomeNovo, setSobrenomeNovo] = useState('')
    const [emailNovo, setEmailNovo] = useState('')
    const [cidadeNovo, setCidadeNovo] = useState('')
    const [ufNovo, setUfNovo] = useState('')
    const [senhaNova, setSenhaNova] = useState([false])
    const [senhaUpdate, setSenhaUpdate] = useState('')
    const [apelidoNovo, setApelidoNovo] = useState('')
    const [idadeNovo, setIdadeNovo] = useState('')
    const [celularNovo, setCelularNovo] = useState('')
    const [celularNovoFormat, setCelularNovoFormat] = useState('')
    const [fotoUrlUNovo, setFotoUrlUNovo] = useState('https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png')
    const [pontoCarneNovo_id, setPontoCarneNovo_id] = useState(null);
    const [quantidadeComeNovo_id, setQuantidadeComeNovo_id] = useState(null);
    const [idadeformatada, setIdadeFormatada] = useState(null);
    const [pickImageOptions, setPickImageOptions] = useState([false]);
    const [carnePreferidaNovo, setCarnePreferidaNovo] = useState(0);
    //Fim editar perfil
    const [churrasParticipados, setChurrasParticipados] = useState(0);


    const { loading, setLoading } = useLoadingModal();
    const { editavel, setEditavel } = useEditavel();
    const criarModal = createLoadingModal(loading);

    const isDrawerOpen = useIsDrawerOpen()

    async function pegarItemPorTipo(carneVisivel, acompanhamentoVisivel, bebidaVisivel, sobremesaVisivel) {
        // setLoading(true)
        //Carnes
        if (carneVisivel === true) {
            await api.get(`/listItem?subTipo=${1}`)
                .then(function (response) {
                    setTipo(response.data);
                    setDadoFiltrado(response.data)
                    setLoading(false)
                });
        } else if (carneVisivel === false) {
            setDadoFiltrado(null)
        }
        //Acompanhamento
        if (acompanhamentoVisivel) {
            await api.get(`/listItem?subTipo=${2}`)
                .then(function (response) {
                    setTipoAcompanhamento(response.data);
                    setDadoFiltradoAcompanhamento(response.data)
                    setLoading(false)
                });
        } else if (acompanhamentoVisivel === false) {
            setDadoFiltradoAcompanhamento(null)
        }
        //Bebidas
        if (bebidaVisivel) {
            await api.get(`/listItem?subTipo=${3}`)
                .then(function (response) {
                    setTipoBebida(response.data);
                    setDadoFiltradoBebida(response.data)
                    setLoading(false)
                });
        } else if (bebidaVisivel === false) {
            setDadoFiltradoBebida(null)
        }
        //Sobremesas
        if (sobremesaVisivel) {
            await api.get(`/listItem?subTipo=${5}`)
                .then(function (response) {
                    setTipoSobremesa(response.data);
                    setDadoFiltradoSobremesa(response.data)
                    setLoading(false)
                });
        } else if (sobremesaVisivel === false) {
            setDadoFiltradoSobremesa(null)
        }
    }

    function getItem(item) {
        if (item.subTipo_id === 1) {
            setSearchCarne(item.nomeItem)
            setCarnePreferidaNovo(item.id)
            pegarItemPorTipo(false, false, false, false)
        }
        if (item.subTipo_id === 2) {
            setSearchAcompanhamento(item.nomeItem)
            setAcompanhamentoPreferidoNovo(item.id)
            pegarItemPorTipo(false, false, false, false)
        }
        if (item.subTipo_id === 3) {
            setSearchBebida(item.nomeItem)
            setBebidaPreferidaNovo(item.id)
            pegarItemPorTipo(false, false, false, false)
        }
        if (item.subTipo_id === 5) {
            setSearchSobremesa(item.nomeItem)
            setSobremesaPreferidaNovo(item.id)
            pegarItemPorTipo(false, false, false, false)
        }
    }

    const searchFilterFunction = (text, id) => {
        if (id === 1) {
            if (text) {
                const newData = tipo.filter(
                    function (item) {
                        const itemData = item.nomeItem
                            ? item.nomeItem.toUpperCase()
                            : ''.toUpperCase();
                        const itemDataType = item.tipo
                            ? item.tipo.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        const result = itemDataType + itemData
                        return result.indexOf(textData) > -1;
                    });
                setDadoFiltrado(newData);
                setSearchCarne(text);
            } else {
                setDadoFiltrado(tipo);
                setSearchCarne(text);
            }
        }
        if (id === 2) {
            if (text) {
                const newDataAcompanhamento = tipoAcompanhamento.filter(
                    function (item) {
                        const itemData = item.nomeItem
                            ? item.nomeItem.toUpperCase()
                            : ''.toUpperCase();
                        const itemDataType = item.tipo
                            ? item.tipo.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        const result = itemDataType + itemData
                        return result.indexOf(textData) > -1;
                    });
                setDadoFiltradoAcompanhamento(newDataAcompanhamento)
                setSearchAcompanhamento(text);
            } else {
                setDadoFiltradoAcompanhamento(tipoAcompanhamento);
                setSearchAcompanhamento(text);
            }
        }
        if (id === 3) {
            if (text) {
                const newDataBebida = tipoBebida.filter(
                    function (item) {
                        const itemData = item.nomeItem
                            ? item.nomeItem.toUpperCase()
                            : ''.toUpperCase();
                        const itemDataType = item.tipo
                            ? item.tipo.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        const result = itemDataType + itemData
                        return result.indexOf(textData) > -1;
                    });
                setDadoFiltradoBebida(newDataBebida);
                setSearchBebida(text);
            } else {
                setDadoFiltradoBebida(tipoBebida);
                setSearchBebida(text);
            }
        }
        if (id === 5) {
            if (text) {
                const newDataSobremesa = tipoSobremesa.filter(
                    function (item) {
                        const itemData = item.nomeItem
                            ? item.nomeItem.toUpperCase()
                            : ''.toUpperCase();
                        const itemDataType = item.tipo
                            ? item.tipo.toUpperCase()
                            : ''.toUpperCase();
                        const textData = text.toUpperCase();
                        const result = itemDataType + itemData
                        return result.indexOf(textData) > -1;
                    });
                setDadoFiltradoSobremesa(newDataSobremesa);
                setSearchSobremesa(text);
            } else {
                setDadoFiltradoSobremesa(tipoSobremesa);
                setSearchSobremesa(text);
            }
        }
    };

    async function loadPerfil() {
        setLoading(true)
        setIsVisivel(false)

        const response = await api.get(`/usuarios/${id}`).then(function (response) {
            setUsuario(response.data)
            //info para editar perfil
            setNomeNovo(response.data[0].nome)
            setApelidoNovo(response.data[0].apelido)
            setIdadeFormatada(formatDataNascimento(response.data[0].idade))
            setCelularNovo(response.data[0].celular)
            setCelularNovoFormat(response.data[0].celular)
            setFotoUrlUNovo(response.data[0].fotoUrlU)
            setQuantidadeComeNovo_id(response.data[0].quantidadeCome_id)
            setSenhaUpdate(response.data[0].senha)
            setPontoCarneNovo_id(response.data[0].pontoCarne_id)
            setCarnePreferidaNovo(response.data[0].carnePreferida_id)
            setAcompanhamentoPreferidoNovo(response.data[0].acompanhamentoPreferido_id)
            setBebidaPreferidaNovo(response.data[0].bebidaPreferida_id)
            setSobremesaPreferidaNovo(response.data[0].sobremesaPreferida_id)
            if (idadeformatada != "02/01/1900") {
                setIdadeNovo(idadeformatada)
            }
            if (response.data[0].sobrenome == "sobrenome") {
                setSobrenomeNovo("")
            } else {
                setSobrenomeNovo(response.data[0].sobrenome)
            }
            if (response.data[0].cidade == "cidade") {
                setCidadeNovo("")
            } else {
                setCidadeNovo(response.data[0].cidade)
            }
            if (response.data[0].uf == "uf") {
                setUfNovo("")
            } else {
                setUfNovo(response.data[0].uf)
            }
            if (response.data[0].email.includes("@churrapp.com", 11)) {
                setEmailNovo("")
            } else {
                setEmailNovo(response.data[0].email)
            }
            //fim info para editar
            setChurrasParticipados(response.data[0].churrasParticipados)

            //converter data de nascimento para idade
            setImage({ uri: response.data[0].fotoUrlU })
            formatDataIdade(response.data[0].idade)
        }).then(function () {
            setLoading(false)
        });
        setLoading(false);
    }
    function formatDataNascimento(data) {
        var date = new Date(data).getDate() + 1
        var month = new Date(data).getMonth() + 1
        var year = new Date(data).getFullYear()
        if (date < 10) {
            date = "0" + date
        }
        if (month < 10) {
            month = "0" + month
        }
        return date + '/' + month + '/' + year
    }

    function formatDataIdade(data) {
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


    function editPerfil() {
        if (idadeformatada != "02/01/1900") {
            setIdadeNovo(idadeformatada)
        }
        setSearchCarne("");
        setSearchAcompanhamento("");
        setSearchBebida("");
        setSearchSobremesa("");
        setAllowEditing([true, 'black']);
        setEditavel(true);
    }

    async function savePerfil() {
        if (editavel == false) {
            setAllowEditing([false, 'darkgray']);
            setEditavel(false)

        } else {
            setLoading(true)
            setAllowEditing([false, 'darkgray']);
            if (image.uri != null) {
                var novaUrl = await uploadImage(image);
            } else {
                var novaUrl = fotoUrlUNovo;
            }

            if (search === "") {
                setSearchCarne(usuario.carnePreferida);
                setCarnePreferidaNovo(usuario.carnePreferida_id);
            }
            if (searchAcompanhamento === "") {
                setSearchAcompanhamento(usuario.acompanhamentoPreferido);
                setAcompanhamentoPreferidoNovo(usuario.acompanhamentoPreferido_id);
            }
            if (searchBebida === "") {
                setSearchBebida(usuario.bebidaPreferida);
                setBebidaPreferidaNovo(usuario.bebidaPreferida_id);
            }
            if (searchSobremesa === "") {
                setSearchSobremesa(usuario.sobremesaPreferida);
                setSobremesaPreferidaNovo(usuario.sobremesaPreferida_id);
            }
            console.log("SOBREMESA ID " + sobremesaPreferidaNovo)
            console.log(idadeNovo)
            api.put(`/usuarios/${id}`, {
                nome: nomeNovo,
                sobrenome: sobrenomeNovo,
                email: emailNovo,
                cidade: cidadeNovo,
                uf: ufNovo,
                idade: idadeNovo,
                senha: senhaUpdate,
                fotoUrlU: fotoUrlUNovo,
                celular: celularNovo,
                apelido: apelidoNovo,
                pontoCarne_id: pontoCarneNovo_id,
                carnePreferida_id: carnePreferidaNovo,
                quantidadeCome_id: quantidadeComeNovo_id,
                bebidaPreferida_id: bebidaPreferidaNovo,
                acompanhamentoPreferido_id: acompanhamentoPreferidoNovo,
                sobremesaPreferida_id: sobremesaPreferidaNovo
            }).then(function (response) {
                setReturnVisivel([true, response.data.mensagem, "Editar perfil!"])
                setRefreshPerfil(!refreshPerfil)
                setEditavel(false)
            })
        }
    }

    async function alterarSenha() {

        var senha1 = await criptoSenha(senhaNova[1])
        var senha2 = await criptoSenha(senhaNova[2])
        var senha3 = await criptoSenha(senhaNova[3])

        if (usuario[0].senha == senha1) {
            if (senhaNova[2].length >= 8 && senhaNova[3].length >= 8) {
                if (senha2 == senha3) {
                    setSenhaUpdate(senha2)
                    return setSenhaNova([false])
                } else {
                    return setReturnVisivel([true, "Novas senhas não conferem.", "Alterar senha!"])
                }
            } else {
                return setReturnVisivel([true, "A senha deve ter no minimo 8 caracteres.", "Alterar senha!"])
            }
        } else {
            return setReturnVisivel([true, "Senha atual incorreta.", "Alterar senha!"])
        }
    }

    async function criptoSenha(senha) {
        return await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
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

        setQuantidadeComeLista(response.data);
    }

    const pickImage = async () => {
        setLoading(true)
        setPickImageOptions([false])
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status == 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
            });

            if (!result.cancelled) {
                setFotoUrlUNovo(result.uri);
                setImage(result);
            }
        }
        setLoading(false)
    };

    async function uploadImage(imagem) {
        let apiUrl = 'https://pure-island-99817.herokuapp.com/fotosUsuarios';
        let uriParts = imagem.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let uri = imagem.uri

        let formData = new FormData();
        formData.append('file', {
            uri,
            name: `photo.${fileType}`,
            type: `image/${fileType}`,
        });

        let options = {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        };

        const res = await fetch(apiUrl, options);
        const response = await res.json()
        setFotoUrlUNovo(response.location)
        return response.location;
    }

    function abrirDrawer() {
        setEditavel(false)
        navigation.toggleDrawer()
        setAllowEditing([false, 'darkgray']);

    }
    useEffect(()=>{
        setEditavel(false)
        setAllowEditing([false, 'darkgray']);
    },[isDrawerOpen])

    return (
        <View style={style.container}>
            <FlatList
                data={usuario}
                keyExtractor={item => usuario.id}
                showsVerticalScrollIndicator={false}
                style={style.churrasList}
                renderItem={({ item: usuario }) => (
                    <View style={{ backgroundColor: 'white' }}>
                        <View style={style.backgroundProfile}>
                            <View style={style.menuBtn}>
                                {/* <View style={style.centeredViewNotificacaoQtd}>
                        <TouchableOpacity onPress={abrirDrawer}>
                            {notificacoes.length > 0
                                ? <View style={style.modalViewNotificacaoQtd}>
                                    <Text style={style.textBtnNotificacaoQtd}>{notificacoes.length}</Text>
                                </View>
                                : null}
                        </TouchableOpacity>
                    </View> */}
                                <TouchableWithoutFeedback onPressIn={() => abrirDrawer()} >
                                    <IconMI name='menu' size={30} />
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={style.containerProfile}>
                                {allowEditing[0]
                                    ? <TouchableOpacity activeOpacity={0.5} onPress={() => setPickImageOptions([true])} style={style.centeredViewFotoPerfil}>
                                        <View style={style.modalViewFotoPerfil}>
                                            <View style={style.continueBtnFotoPerfil}>
                                                <IconMI name="edit" size={22} color={"white"} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    : null}
                                <Image source={{ uri: fotoUrlUNovo }} style={style.profileImg} />

                                <Text style={style.profileName}>{usuario.apelido}</Text>
                                {usuario.uf != 'uf' && usuario.cidade != 'cidade' ? (
                                    <View style={{ alignItems: 'center', }}>
                                        <Text style={style.profileLocal}>{usuario.cidade} - {usuario.uf}</Text>
                                        <View style={style.containerIdade}>
                                            {isBirthday ? <Icon name="birthday-cake" style={style.birthdayCake} size={20} color={'white'} /> : null}
                                            <Text style={style.profileIdade}>{idadeAtual} {image.ur} anos</Text>
                                        </View>
                                    </View>) : null}
                            </View>
                        </View>
                        <View style={style.containerMyChurras}>
                            <View style={style.containerOrg}>
                                <CustomIcon name="barbeque" size={28} />
                                <Text style={style.profileOrg}>Organizou</Text>
                                <Text style={style.profileOrgNumber}>{usuario.churrasCriados}</Text>
                            </View>
                            <View style={style.linhaSeparaçãoHor}></View>
                            <View style={style.containerPart}>
                                <CustomIcon name="eating" size={28} />
                                <Text style={style.profilePart}>Participou</Text>
                                <Text style={style.profilePartNumber}>{usuario.churrasParticipados}</Text>
                            </View>
                        </View>
                        {allowEditing[0]
                            ? <View>
                                <Text style={style.preferenciasTitulo}>Informações:</Text>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMI name="person" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Nome:</Text>
                                    </View>
                                    <TextInput
                                        style={[style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray' }]}
                                        editable={false}
                                        value={nomeNovo}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMI name="people" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Sobrenome:</Text>
                                    </View>
                                    {usuario.sobrenome == "sobrenome"
                                        ? (<View>
                                            <TextInput
                                                style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                                editable={allowEditing[0]}
                                                onChangeText={text => { setSobrenomeNovo(text) }}
                                                value={sobrenomeNovo}
                                            />
                                        </View>)
                                        : <TextInput
                                            style={[style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray' }]}
                                            editable={false}
                                            value={sobrenomeNovo}
                                        />}
                                </View>

                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="baby" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Data de nascimento:</Text>
                                    </View>
                                    {idadeformatada == "02/01/1900"
                                        ? <TextInputMask
                                            style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                            type={'datetime'}
                                            options={{
                                                format: 'DD/MM/YYYY'
                                            }}
                                            placeholder="DD/MM/AAAA"
                                            value={idadeNovo}
                                            onChangeText={text => { setIdadeNovo(text) }}
                                        />

                                        : <TextInputMask
                                            style={[style.inputStandard, { borderBottomColor: 'darkgray', color: 'darkgray', }]}
                                            type={'datetime'}
                                            editable={false}
                                            options={{
                                                format: 'DD/MM/YYYY'
                                            }}
                                            value={idadeformatada}
                                        />}
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMCI name="cowboy" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Apelido:</Text>
                                    </View>
                                    <TextInput
                                        style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                        editable={allowEditing[0]}
                                        onChangeText={text => { setApelidoNovo(text) }}
                                        value={apelidoNovo}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMI name="location-city" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Cidade em que mora:</Text>
                                    </View>
                                    <TextInput
                                        style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                        editable={allowEditing[0]}
                                        onChangeText={text => { setCidadeNovo(text) }}
                                        value={cidadeNovo}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMI name="location-on" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Uf em que mora:</Text>
                                    </View>
                                    <TextInput
                                        style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                        editable={allowEditing[0]}
                                        onChangeText={text => { setUfNovo(text) }}
                                        value={ufNovo}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMCI name="email" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Email:</Text>
                                    </View>
                                    <TextInput
                                        style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                        editable={allowEditing[0]}
                                        onChangeText={text => { setEmailNovo(text) }}
                                        value={emailNovo}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMCI name="cellphone-android" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Celular:</Text>
                                    </View>
                                    <TextInputMask
                                        style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                        editable={allowEditing[0]}
                                        type={'cel-phone'}
                                        options={{
                                            maskType: 'BRL',
                                            withDDD: true,
                                            dddMask: '(99) '
                                        }}
                                        keyboardType={"phone-pad"}
                                        placeholder={'(xx)xxxxx-xxxx'}
                                        value={celularNovoFormat}
                                        includeRawValueInChangeText={true}
                                        onChangeText={(text, rawText) => { setCelularNovo(rawText); setCelularNovoFormat(text) }}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <IconMCI name="email" size={18} style={style.icons} />
                                        <Text style={style.textoItem}>Senha:</Text>
                                    </View>
                                    <TextInput
                                        style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                        editable={false}
                                        secureTextEntry={true}
                                        value={'1234567890'}
                                    />
                                    <TouchableOpacity onPress={() => setSenhaNova([true])} style={style.mudarSenhaTO}>
                                        <Text style={style.mudarSenha}>Alterar senha</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>
                            : null}
                        <Text style={style.preferenciasTitulo}>Preferencias:</Text>
                        <View style={style.formGroup}>
                            <View style={{ flexDirection: 'row' }}>
                                <IconMCI name="cow" size={18} style={style.icons} />
                                <Text style={style.textoItem}>Ponto preferido:</Text>
                            </View>
                            <Picker
                                mode="dropdown"
                                style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                enabled={allowEditing[0]}
                                selectedValue={pontoCarneNovo_id}
                                onValueChange={pontoCarne_id => { setPontoCarneNovo_id(pontoCarne_id) }}
                            >
                                {pontoCarneLista.map((pontoLista, idx) => (
                                    <Picker.Item label={pontoLista.ponto} key={idx} value={pontoLista.id} />
                                ))}

                            </Picker>
                        </View>
                        <View style={style.formGroup}>
                            <View style={{ flexDirection: 'row' }}>
                                <IconMCI name="silverware-fork-knife" size={18} style={style.icons} />
                                <Text style={style.textoItem}>Tamanho da fome:</Text>
                            </View>
                            <Picker
                                mode="dropdown"
                                style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                enabled={allowEditing[0]}
                                selectedValue={quantidadeComeNovo_id}
                                onValueChange={quantidadeCome_id => { setQuantidadeComeNovo_id(quantidadeCome_id) }}
                            >
                                {quantidadeComeLista.map((quantidadeComeLista, idx) => (
                                    <Picker.Item label={quantidadeComeLista.nomeQuantidadeCome + " (" + quantidadeComeLista.quantidade + "g)"} key={idx} value={quantidadeComeLista.id} />
                                ))}

                            </Picker>
                        </View>
                        <View style={style.formGroup}>
                            <View style={{ flexDirection: 'row' }}>
                                <IconMCI name="pig" size={18} style={style.icons} />
                                <Text style={style.textoItem}>Carne preferida:</Text>
                            </View>
                            {allowEditing[0]
                                ? <View style={{ flex: 1 }}>
                                     <TextInput
                                            style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                            editable={allowEditing[0]}
                                            onChangeText={(text) => { searchFilterFunction(text, 1) }}
                                            onFocus={() => pegarItemPorTipo(true, false, false, false)}
                                            placeholder={usuario.carnePreferida}
                                            value={search}
                                        />
                                    

                                    {dadoFiltrado === null
                                        ? null
                                        : <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => pegarItemPorTipo(false, false, false, false)}>
                                            <Text style={style.flatCloseBtn} >Fechar</Text>
                                        </TouchableOpacity>
                                    }
                                    <View style={style.viewDadosFiltrados}>
                                        <FlatList
                                            showsVerticalScrollIndicator={true}
                                            style={style.flatDadosFiltrados}
                                            scrollEnabled={true}
                                            data={dadoFiltrado}
                                            keyExtractor={todosItens => String(todosItens.id)}
                                            renderItem={({ item: todosItens }) => (
                                                <View style={style.flatItemDadosFiltrados}>
                                                    <Text
                                                        style={style.textoDadosFiltrados}
                                                        onPress={() => getItem(todosItens)}
                                                    >
                                                        {todosItens.tipo} {"-"} {todosItens.nomeItem.toUpperCase()}
                                                    </Text>
                                                    <View style={style.linha}></View>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>

                                : <TextInput
                                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                    editable={allowEditing[0]}
                                    onChangeText={(text) => searchFilterFunction(text)}
                                    value={usuario.carnePreferida} />
                            }

                        </View>
                        <View style={style.formGroup}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="bread-slice" size={18} style={style.icons} />
                                <Text style={style.textoItem}>Acompanhamento preferido:</Text>
                            </View>
                            {allowEditing[0]
                                ? <View>
                                    <TextInput
                                            style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                            editable={allowEditing[0]}
                                            onChangeText={(text) => { searchFilterFunction(text, 2) }}
                                            onFocus={() => pegarItemPorTipo(false, true, false, false)}
                                            value={searchAcompanhamento}
                                            placeholder={usuario.acompanhamentoPreferido}
                                        />

                                    {dadoFiltradoAcompanhamento === null
                                        ? null
                                        : <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => pegarItemPorTipo(false, false, false, false)}>
                                            <Text style={style.flatCloseBtn}>Fechar</Text>
                                        </TouchableOpacity>
                                    }
                                    <View style={style.viewDadosFiltrados}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            style={style.flatDadosFiltrados}
                                            data={dadoFiltradoAcompanhamento}
                                            keyExtractor={todosItens => String(todosItens.id)}
                                            renderItem={({ item: todosItens }) => (
                                                <View style={style.flatItemDadosFiltrados}>
                                                    <Text
                                                        style={style.textoDadosFiltrados}
                                                        onPress={() => getItem(todosItens)}
                                                    >
                                                        {todosItens.nomeItem.toUpperCase()}
                                                    </Text>
                                                    <View style={style.linha}></View>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>

                                : <TextInput
                                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                    editable={allowEditing[0]}
                                    value={usuario.acompanhamentoPreferido}
                                />
                            }

                        </View>
                        <View style={style.formGroup}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="beer" size={18} style={style.icons} />
                                <Text style={style.textoItem}>Bebida preferida:</Text>
                            </View>
                            {allowEditing[0]
                                ? <View>
                                     <TextInput
                                            style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                            editable={allowEditing[0]}
                                            onChangeText={(text) => { searchFilterFunction(text, 3) }}
                                            onFocus={() => pegarItemPorTipo(false, false, true, false)}
                                            value={searchBebida}
                                            placeholder={usuario.bebidaPreferida}
                                        />

                                    {dadoFiltradoBebida === null
                                        ? null
                                        : <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => pegarItemPorTipo(false, false, false, false)}>
                                            <Text style={style.flatCloseBtn}>Fechar</Text>
                                        </TouchableOpacity>
                                    }

                                    <View style={style.viewDadosFiltrados}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            style={style.flatDadosFiltrados}
                                            data={dadoFiltradoBebida}
                                            keyExtractor={todosItens => String(todosItens.id)}
                                            renderItem={({ item: todosItens }) => (
                                                <View style={style.flatItemDadosFiltrados}>
                                                    <Text
                                                        style={style.textoDadosFiltrados}
                                                        onPress={() => getItem(todosItens)}
                                                    >
                                                        {todosItens.tipo} {"-"} {todosItens.nomeItem.toUpperCase()}
                                                    </Text>
                                                    <View style={style.linha}></View>

                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>

                                : <TextInput
                                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                    editable={allowEditing[0]}
                                    value={usuario.bebidaPreferida}
                                />
                            }

                        </View>
                        <View style={style.formGroup}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="birthday-cake" size={18} style={style.icons} />
                                <Text style={style.textoItem}>Sobremesa preferida:</Text>
                            </View>
                            {allowEditing[0]
                                ? <View>
                                     <TextInput
                                            style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                            editable={allowEditing[0]}
                                            onChangeText={(text) => { searchFilterFunction(text, 5) }}
                                            onFocus={() => pegarItemPorTipo(false, false, false, true)}
                                            value={searchSobremesa}
                                            placeholder={usuario.sobremesaPreferida}
                                        />

                                    {dadoFiltradoSobremesa === null
                                        ? null
                                        : <TouchableOpacity style={{ alignItems: 'flex-end' }} onPress={() => pegarItemPorTipo(false, false, false, false)}>
                                            <Text style={style.flatCloseBtn}>Fechar</Text>
                                        </TouchableOpacity>
                                    }
                                    <View style={style.viewDadosFiltrados}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            style={style.flatDadosFiltrados}
                                            data={dadoFiltradoSobremesa}
                                            keyExtractor={todosItens => String(todosItens.id)}
                                            renderItem={({ item: todosItens }) => (
                                                <View style={style.flatItemDadosFiltrados}>
                                                    <Text
                                                        style={style.textoDadosFiltrados}
                                                        onPress={() => getItem(todosItens)}
                                                    >
                                                        {todosItens.nomeItem.toUpperCase()}
                                                    </Text>
                                                    <View style={style.linha}></View>
                                                </View>
                                            )}
                                        />
                                    </View>
                                </View>

                                : <TextInput
                                    style={[style.inputStandard, { borderBottomColor: allowEditing[1], color: allowEditing[1] }]}
                                    editable={allowEditing[0]}
                                    value={usuario.sobremesaPreferida}
                                />
                            }

                        </View>
                    </View>
                )} />

            {allowEditing[0]
                ? <FloatingAction
                    color='rgba(0,0,0,0.9)'
                    showBackground={false}
                    onPressMain={() => { savePerfil() }}
                    floatingIcon={<IconMI name="save" size={22} color={"white"} />}
                />
                : <FloatingAction
                    color='rgba(0,0,0,0.9)'
                    showBackground={false}
                    onPressMain={() => { editPerfil() }}
                    floatingIcon={<IconMI name="edit" size={22} color={"white"} />}
                />}

            <Modal
                animationType="slide"
                transparent={true}
                visible={returnVisivel[0]}
            >
                <View style={style.centeredViewContactar}>
                    <View style={style.modalViewContactar}>
                        <Text style={style.modalTitleCont}>{returnVisivel[2]}</Text>
                        <Text style={style.modalTextCont}>{returnVisivel[1]}</Text>
                        <View style={style.footerModalCont}>
                            <TouchableOpacity style={style.continueBtnCont} onPress={() => setReturnVisivel([false])}>
                                <Text style={style.textBtnCont}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={senhaNova[0]}
            >
                <View style={style.centeredViewContactar}>
                    <View style={style.modalViewContactar}>
                        <Text style={style.modalTitleCont}>Alterar senha!</Text>
                        <View style={[style.formGroup, { width: '100%' }]}>
                            <Text style={style.textoItem}>Senha atual:</Text>
                            <TextInput
                                style={[style.inputStandard]}
                                secureTextEntry={true}
                                onChangeText={text => { setSenhaNova([senhaNova[0], text, senhaNova[2], senhaNova[3]]) }}
                                value={senhaNova[1]}
                            />
                        </View>
                        <View style={[style.formGroup, { width: '100%' }]}>
                            <Text style={style.textoItem}>Nova senha:</Text>
                            <TextInput
                                style={[style.inputStandard]}
                                secureTextEntry={true}
                                onChangeText={text => { setSenhaNova([senhaNova[0], senhaNova[1], text, senhaNova[3]]) }}
                                value={senhaNova[2]}
                            />
                        </View>
                        <View style={[style.formGroup, { width: '100%' }]}>
                            <Text style={style.textoItem}>Confirmar nova senha:</Text>
                            <TextInput
                                style={[style.inputStandard]}
                                secureTextEntry={true}
                                onChangeText={text => { setSenhaNova([senhaNova[0], senhaNova[1], senhaNova[2], text]) }}
                                value={senhaNova[3]}
                            />
                        </View>
                        <View style={style.footerModalCont}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => setSenhaNova([false])}>
                                <Text style={style.iconExitBtn}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.continueBtnCont} onPress={alterarSenha}>
                                <Text style={style.textBtnCont}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={pickImageOptions[0]}
            >
                <View style={style.centeredViewContactar}>
                    <View style={style.modalViewContactar}>
                        <Text style={style.modalTitleCont}>Foto de perfil!</Text>
                        <Text style={style.modalTextCont}>Deseja escolher uma foto ou remover atual?</Text>
                        <View style={style.footerModalCont}>
                            <TouchableOpacity style={style.exitBtn} onPress={() => {
                                setFotoUrlUNovo("https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png");
                                setImage({ cancelled: true, uri: "https://churrappuploadteste.s3.amazonaws.com/default/usuario_default.png" });
                                setPickImageOptions([false])
                            }}>
                                <Text style={style.iconExitBtn}>Remover</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.continueBtnCont} onPress={pickImage}>
                                <Text style={style.textBtnCont}>Escolher</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {criarModal}
        </View>
    )
}
