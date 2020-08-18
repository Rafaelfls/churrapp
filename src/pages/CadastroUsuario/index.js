import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView, Picker, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { TextInputMask } from 'react-native-masked-text'
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';

import style from './styles';

export default function CadastroUsuario() {

    const navigation = useNavigation();

    const [apelidoUsuario, setApelidoUsuario] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [sobrenomeUsuario, setSobrenomeUsuario] = useState('');
    const [idadeUsuario, setIdadeUsuario] = useState('');
    const [ufUsuario, setUfUsuario] = useState('');
    const [cidadeUsuario, setCidadeUsuario] = useState('');
    const [emailUsuario, setEmailUsuario] = useState('');
    const [celularUsuario, setCelularUsuario] = useState('');
    const [senhaUsuario, setSenhaUsuario] = useState('');
    const [pontoCarne, setPontoCarne] = useState([]);
    const [quantidadeCome, setQuantidadeCome] = useState([]);
    const [pontoCarne_id, setPontoCarne_id] = useState(0);
    const [quantidadeCome_id, setQuantidadeCome_id] = useState(0);
    const [visivel, setVisivel] = useState(false)
    const [url, setUrl] = useState(null)
    const [image, setImage] = useState({ cancelled: true });

    const [borderColorRed1, setBorderColorRed1] = useState(style.formOk);
    const [borderColorRed2, setBorderColorRed2] = useState(style.formOk);
    const [borderColorRed3, setBorderColorRed3] = useState(style.formOk);
    const [borderColorRed4, setBorderColorRed4] = useState(style.formOk);
    const [borderColorRed5, setBorderColorRed5] = useState(style.formOk);
    const [borderColorRed6, setBorderColorRed6] = useState(style.formOk);
    const [borderColorRed7, setBorderColorRed7] = useState(style.formOk);
    const [borderColorRed8, setBorderColorRed8] = useState(style.formOk);
    const [borderColorRed9, setBorderColorRed9] = useState(style.formOk);

    global.USUARIOLOGADO = null;

    function backHome() {
        navigation.replace('Login');
    }

    useEffect(() => {
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

    async function criptoSenha(senha) {
        const criptoSenha = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            senha
        );
        setSenhaUsuario(criptoSenha)
    }

    async function uploadImage(){
        if (!image.cancelled) {
            let apiUrl = 'https://pure-island-99817.herokuapp.com/fotosUsuarios';
            let uriParts = image.uri.split('.');
            let fileType = uriParts[uriParts.length - 1];
            let uri = image.uri

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
            const response = await res.json();
            console.log(response.location)
            return response.location
        } else {
            return url
        }
    }
    async function navigateToResumo() {

        if (nomeUsuario == '') {
            setBorderColorRed1(style.formNok)
        } else {
            setBorderColorRed1(style.formOk)
        }
        if (sobrenomeUsuario == '') {
            setBorderColorRed2(style.formNok)
        } else {
            setBorderColorRed2(style.formOk)
        }
        if (emailUsuario == '') {
            setBorderColorRed3(style.formNok)
        } else {
            setBorderColorRed3(style.formOk)
        }
        if (cidadeUsuario == '') {
            setBorderColorRed4(style.formNok)
        } else {
            setBorderColorRed4(style.formOk)
        }
        if (ufUsuario == '') {
            setBorderColorRed5(style.formNok)
        } else {
            setBorderColorRed5(style.formOk)
        }
        if (idadeUsuario == '') {
            setBorderColorRed6(style.formNok)
        } else {
            setBorderColorRed6(style.formOk)
        }
        if (celularUsuario == '') {
            setBorderColorRed7(style.formNok)
        } else {
            setBorderColorRed7(style.formOk)
        }
        if (apelidoUsuario == '') {
            setBorderColorRed8(style.formNok)
        } else {
            setBorderColorRed8(style.formOk)
        }
        if (senhaUsuario == '') {
            setBorderColorRed9(style.formNok)
        } else {
            setBorderColorRed9(style.formOk)
        }

        if (nomeUsuario == '' ||
            sobrenomeUsuario == '' ||
            emailUsuario == '' ||
            cidadeUsuario == '' ||
            ufUsuario == '' ||
            idadeUsuario == '' ||
            celularUsuario == '' ||
            senhaUsuario == '' ||
            apelidoUsuario == '') {
            return setVisivel(true)
        } else {

            const newUrl = await uploadImage()

            await api.post('/usuarios', {
                nome: nomeUsuario,
                sobrenome: sobrenomeUsuario,
                email: emailUsuario,
                cidade: cidadeUsuario,
                uf: ufUsuario,
                idade: idadeUsuario,
                fotoUrlU: newUrl,
                celular: celularUsuario,
                cadastrado: true,
                apelido: apelidoUsuario,
                senha: senhaUsuario,
                pontoCarne_id: pontoCarne_id,
                carnePreferida_id: 0,
                quantidadeCome_id: quantidadeCome_id,
                bebidaPreferida_id: 0,
                acompanhamentoPreferido_id: 0
            }).then(function (response) {
                USUARIOLOGADO = response.data
                navigation.replace('Tabs');

            })
        }

    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
        });

        console.log("res", result);

        if (!result.cancelled) {
            setImage(result);
        }
    };

    return (
        <View style={style.container}>

            <View style={style.header}>
                <TouchableOpacity style={style.exitBtn} onPress={() => backHome()}>
                    <Icon style={style.iconHeaderBtn} name="arrow-left" size={22} />
                </TouchableOpacity>
                <View style={style.titulo}>
                    <Text style={style.textHeader}>Cadastro</Text>
                </View>
            </View>

            <ScrollView style={style.scrollView}>
                <View style={style.formGroup}>
                    <View style={style.imagePicker}>
                        <TouchableOpacity style={style.inputDisplay} onPress={pickImage} >
                            <Icon style={style.addImgIcon} name="image" size={100} />
                            {image && <Image source={{ uri: image.uri }} style={{ width: 170, height: 170, paddingVertical: 10 }} />}
                        </TouchableOpacity>
                    </View>
                    <Text style={style.textLabel}>Apelido</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed8]}
                        onChangeText={text => setApelidoUsuario(text)}
                        placeholder={'Churrasbom'}
                    />
                    <Text style={style.textLabel}>Nome</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed1]}
                        onChangeText={text => setNomeUsuario(text)}
                        placeholder={'Churrasbom'}
                    />
                    <Text style={style.textLabel}>Sobrenome</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed2]}
                        placeholder={"Alameda santos, 202"}
                        onChangeText={text => setSobrenomeUsuario(text)}
                    />
                    <Text style={style.textLabel}>Data de nascimento:</Text>
                    <TextInputMask
                        type={'datetime'}
                        style={[style.inputStandard, borderColorRed6]}
                        placeholder={"dd/mm/aaaa"}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={idadeUsuario}
                        onChangeText={(text) => setIdadeUsuario(text)}
                    />
                    <Text style={style.textLabel}>Email</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed3]}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                        placeholder={"Alameda santos, 202"}
                        onChangeText={text => setEmailUsuario(text)}
                    />
                    <Text style={style.textLabel}>Celular</Text>
                    <TextInputMask
                        style={[style.inputStandard, borderColorRed7]}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        keyboardType={"phone-pad"}
                        placeholder={'(xx)xxxxx-xxxx'}
                        value={celularUsuario}
                        includeRawValueInChangeText={true}
                        onChangeText={(text, rawText) => setCelularUsuario(rawText)}
                    />
                    <Text style={style.textLabel}>Senha:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed9]}
                        placeholder={"8 ~ 16 caracteres"}
                        maxLength={16}
                        onChangeText={text => criptoSenha(text)}
                    />
                    <Text style={style.textLabel}>Estado:</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed5]}
                        placeholder={"UF"}
                        maxLength={2}
                        autoCapitalize={'characters'}
                        onChangeText={text => setUfUsuario(text)}
                    />
                    <Text style={style.textLabel}>Cidade</Text>
                    <TextInput
                        style={[style.inputStandard, borderColorRed4]}
                        placeholder={"Campinas"}
                        onChangeText={text => setCidadeUsuario(text)}
                    />
                    <Text style={style.textLabel}>Qual ponto você prefere?</Text>
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
                    <Text style={style.textLabel}>Quanto você come?</Text>
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
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visivel}
            >
                <View style={style.centeredView}>
                    <View style={style.modalView}>
                        <Text style={style.modalTitle}>Ops!</Text>
                        <Text style={style.modalText}>Faltaram algumas informações!</Text>
                        <View style={style.footerModal}>
                            <TouchableOpacity style={style.continueBtn} onPress={() => setVisivel(false)}>
                                <Text style={style.textBtn}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={style.footer}>
                <TouchableOpacity style={style.continueBtn} onPress={navigateToResumo}>
                    <Text style={style.textBtn}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </View >
    );
}