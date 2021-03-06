import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Modal, Picker, ToastAndroid } from 'react-native';
import api from '../../services/api';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'

import style from './styles';
import { useLoadingModal, createLoadingModal, useInitialPage } from '../../context/churrasContext';

export default function EscolherNovosItens2({ route, navigation }) {

    const { loading, setLoading } = useLoadingModal();
    const { setInitialPage } = useInitialPage()
    const criarModal = createLoadingModal(loading);
    const [item, setItem] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [visivel, setIsVisivel] = React.useState(false);
    const [itemModal, setItemModal] = React.useState('');
    const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
    const [visivelUnidade, setVisivelUnidade] = React.useState([false])
    const [quantidadeModal, setQuantidadeModal] = useState(0)
    const [nomeUnidadeSelecionada, setNomeUnidadeSelecionada] = useState('Unidade de medida')
    const [precoMedioModal, setPrecoMedioModal] = useState(0);
    const [precoModal, setPrecoModal] = useState(0)
    const [idItem, setIdItem] = useState(null)
    const [filtro, setFiltro] = useState(null)
    const [adicionado, setAdicionado] = useState(false);
    const { churrascode } = route.params;
    const { convidadosQtd } = route.params;
    const { subTipo } = route.params;

    async function firstLoad() {
        setLoading(true)
        const responseItem = await api.get(`/listItem?subTipo=${2}`);
        const responseUnidade = await api.get(`/unidade`);
        const responseTipos = await api.get(`/tipoSubTipo?subTipo=${2}`);

        responseUnidade.data.sort(function (a, b) {
            if (a.id > b.id) {
                return 1;
            }
            if (a.id < b.id) {
                return -1;
            }
            return 0;
        })
        setUnidades(responseUnidade.data);
        setItem(responseItem.data);
        setTipo(responseTipos.data);
        setLoading(false)
    }

    useEffect(() => {
        firstLoad();
    }, []);

    function setVisibility(isVisible, item, unidade, id, precoMedio) {
        setPrecoMedioModal(precoMedio)
        setQuantidadeModal(0)
        setIsVisivel(isVisible)
        setItemModal(item)
        setIdItem(id)
    }
    function showToast(isVisible) {
        if (isVisible) {
            ToastAndroid.showWithGravityAndOffset(
                itemModal + " foi adicionado!", ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }

    async function addItem(isVisible, item, unidadeDrop, qtdNova, precoModal) {
        setLoading(true)
        var precoFinal;

        if (precoModal == 0) {
            precoFinal = precoMedioModal;
        } else {
            precoFinal = precoModal
        }
        if (typeof unidadeDrop == 'string' || unidadeDrop == 0) {
            setLoading(false)
            setVisivelUnidade([true])
        } else {
            setIsVisivel(false)
            await api.post('/listadochurras', {
                quantidade: qtdNova,
                churras_id: churrascode,
                unidade_id: unidadeDrop,
                formato_id: 7,
                item_id: item,
                precoItem: precoFinal,
            }).then(async function (res) {
                if (res.data.quantidadeAntiga) {
                    var sub = res.data.quantidadeAntiga * res.data.precoAntigo;
                    var sum = precoFinal * (qtdNova + res.data.quantidadeAntiga);
                    var precoFinalTotal = sum - sub;
                } else {
                    var precoFinalTotal = precoFinal * qtdNova;
                }
                await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
                    valorTotal: precoFinalTotal
                }).then(function (res) {
                    setQuantidadeModal(0)
                    setPrecoModal(0)
                    setLoading(false)
                    showToast(isVisible)
                })
            })
        }
    }

    function backHome() {
        if (subTipo != null) {
            navigation.replace('DetalheChurras', { churras: churrascode, editavel: true })
            setInitialPage(0)
        } else {
            navigation.push('AdicionarAcompanhamento', { churrascode, convidadosQtd })
        }
    }

    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                        <IconFea style={style.iconHeaderBtn} name="chevron-left" size={22} />
                    </TouchableOpacity>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Adicionar acompanhamentos</Text>
                    </View>
                </View>

                <FlatList
                    data={item}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: item }) => (
                        <View >
                            <TouchableOpacity style={style.card} onPress={() => setVisibility(true, item.nomeItem, item.unidade_id, item.id, item.precoMedio)}>
                                {item.fotoUrlI == null
                                    ? <Image source={{ uri: item.fotoUrlT }} style={style.churrasFoto} />
                                    : <Image source={{ uri: item.fotoUrlI }} style={style.churrasFoto} />}
                                <View style={style.churrasInfosView}>
                                    <Text style={style.churrasTitle}>{item.nomeItem}</Text>
                                    <Text style={style.churrasDono}>{item.descricao} </Text>
                                    <View style={style.churrasLocDat}>
                                        <IconMat style={style.dataIcon} name="rice" size={15} />
                                        <Text style={style.churrasData}> {item.tipo}</Text>
                                        <Text style={style.locDatSeparator}>  |  </Text>
                                        <Icon style={style.localIcon} name="coins" size={15} />
                                        <Text style={style.churrasLocal}> {item.precoMedio == null ? '  -  ' : "  R$" + (item.precoMedio).toFixed(2)}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                    style={style.listStyle} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visivel}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalText}>Quanto de
                                <Text style={{ fontFamily: 'poppins-medium', }}> {itemModal} </Text>
                                 deseja adicionar?</Text>
                            <View style={style.selectionForm}>
                                <Text style={style.modalTextLabel}>Quantidade:</Text>
                                <NumericInput
                                    value={quantidadeModal}
                                    onChange={quantNova => setQuantidadeModal(quantNova)}
                                    totalWidth={150}
                                    totalHeight={30}
                                    iconSize={15}
                                    minValue={0}
                                    initValue={quantidadeModal}
                                    valueType='real'
                                    rounded
                                    textColor='black'
                                    iconStyle={{ color: 'maroon' }} />
                            </View>
                            <View style={style.selectionForm}>
                                <Text style={style.modalTextLabel}>Unidade:</Text>
                                <Picker
                                    selectedValue={selectedUnidade}
                                    style={style.boxDropdown}
                                    itemStyle={style.itemDropdown}
                                    mode="dropdown"
                                    onValueChange={itemValue => { setSelectedUnidade(itemValue); setNomeUnidadeSelecionada(unidades[itemValue].unidade) }}
                                >
                                    {unidades.map((unity, idx) => (
                                        <Picker.Item label={unity.unidade} value={unity.id} key={idx} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={style.selectionForm}>
                                <Text style={style.modalTextLabel}>Preço por {nomeUnidadeSelecionada}:</Text>
                                <NumericInput
                                    value={precoModal}
                                    onChange={precoNova => setPrecoModal(precoNova)}
                                    totalWidth={150}
                                    totalHeight={30}
                                    iconSize={15}
                                    minValue={0}
                                    initValue={precoModal}
                                    valueType='real'
                                    rounded
                                    textColor='black'
                                    iconStyle={{ color: 'maroon' }} />
                            </View>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.exitBtnFooter} onPress={() => setVisibility(false, "", '', '', '')}>
                                    <Text style={style.iconExitBtn}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.salvarBtn} onPress={() => addItem(true, idItem, selectedUnidade, quantidadeModal, precoModal)}>
                                    <Text style={style.iconSalvarBtn}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {criarModal}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={adicionado}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitle}>Adicionado!</Text>
                            <Text style={style.modalText}>Item adicionado com sucesso!</Text>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.salvarBtn} onPress={() => { setAdicionado(false) }}>
                                    <Text style={style.iconSalvarBtn}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visivelUnidade[0]}
                >
                    <View style={style.centeredView2}>
                        <View style={style.modalView2}>
                            <Text style={style.modalTitle2}>Ops!</Text>
                            <Text style={style.modalText2}>Escolha a unidade de medida do seu item!</Text>
                            <View style={style.footerModal2}>
                                <TouchableOpacity style={style.continueBtn2} onPress={() => setVisivelUnidade([false])}>
                                    <Text style={style.textBtn2}>Ok</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </View>
    )

}