import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, Modal, Picker } from 'react-native';
import api from '../../services/api';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFea from 'react-native-vector-icons/Feather';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'

import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function EscolherNovosItens5({ route, navigation }) {

  const { loading, setLoading } = useLoadingModal();
  const criarModal = createLoadingModal(loading);
    const [item, setItem] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [visivel, setIsVisivel] = React.useState(false);
    const [itemModal, setItemModal] = React.useState('');
    const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
    const [quantidadeModal, setQuantidadeModal] = useState(0)
    const [idItem, setIdItem] = useState(null)
    const [filtro, setFiltro] = useState(null)
    const { churrascode } = route.params;
    const { convidadosQtd } = route.params;

    async function firstLoad() {
        setLoading(true)
        const responseItem = await api.get(`/listItem?subTipo=${5}`);        
        const responseUnidade = await api.get(`/unidade`);
        const responseTipos = await api.get(`/tipoSubTipo?subTipo=${5}`);


        setUnidades(responseUnidade.data);
        setItem(responseItem.data);
        setTipo(responseTipos.data);
        setLoading(false)
    }

    useEffect(() => {
        firstLoad();
    }, []);

    function setVisibility(isVisible, item, unidade, id) {
        setQuantidadeModal(0)
        setIsVisivel(isVisible)
        setItemModal(item)
        setIdItem(id)
    }

    async function addItem(isVisible, item, unidadeDrop, qtdNova) {
        setIsVisivel(isVisible)
        setLoading(true)
        await api.post('/listadochurras', {
            quantidade: qtdNova,
            churras_id: churrascode,
            unidade_id: unidadeDrop,
            formato_id:0,
            item_id: item,
        }).then(function (res) {
            setQuantidadeModal(0)
        setLoading(false)
        })
    }

    function backHome() {
        navigation.push('AdicionarSobremesas', { churrascode, convidadosQtd })
    }

    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Adicionar sobremesas</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                        <Icon style={style.iconHeaderBtn} name="arrow-alt-circle-left" size={20} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={item}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: item }) => (
                        <View >
                            <TouchableOpacity style={style.card} onPress={() => setVisibility(true, item.nomeItem, item.unidade_id, item.id)}>
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
                                        <Text style={style.churrasLocal}> {item.precoMedio == null ? '  -  ' : "  R$" + item.precoMedio}</Text>
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
                            <Text style={style.modalText}>Quanto de {itemModal} deseja adicionar?</Text>
                            <View style={style.selectionForm}>
                                <NumericInput
                                    value={quantidadeModal}
                                    onChange={quantNova => setQuantidadeModal(quantNova)}
                                    totalWidth={150}
                                    totalHeight={30}
                                    iconSize={15}
                                    initValue={quantidadeModal}
                                    valueType='real'
                                    rounded
                                    textColor='black'
                                    iconStyle={{ color: 'maroon' }}
                                    style={style.quantidadeInput} />
                                <Picker
                                    selectedValue={selectedUnidade}
                                    style={style.boxDropdown}
                                    itemStyle={style.itemDropdown}
                                    mode="dropdown"
                                    onValueChange={itemValue => setSelectedUnidade(itemValue)}
                                >
                                    {unidades.map((unity , idx) => (
                                        <Picker.Item label={unity.unidade} value={unity.id}  key={idx} />
                                    ))}
                                </Picker>
                            </View>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.exitBtnFooter} onPress={() => setVisibility(false, "", '', '')}>
                                    <Icon style={style.iconSalvarBtn} name="times" size={15} />
                                    <Text style={style.iconSalvarBtn}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.salvarBtn} onPress={() => addItem(false, idItem, selectedUnidade, quantidadeModal)}>
                                    <Icon style={style.iconSalvarBtn} name="check" size={15} />
                                    <Text style={style.iconSalvarBtn}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


{criarModal}
            </SafeAreaView>
        </View>
    )

}