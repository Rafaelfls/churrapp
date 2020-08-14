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

export default function EscolherNovosItens3({ route, navigation }) {

    const [item, setItem] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [tipo, setTipo] = useState([]);
    const [visivel, setIsVisivel] = React.useState(false);
    const [itemModal, setItemModal] = React.useState('');
    const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
    const [quantidadeModal, setQuantidadeModal] = useState(null)
    const [idItem, setIdItem] = useState(null)
    const [filtro, setFiltro] = useState(null)

    async function firstLoad() {
        const responseItem = await api.get(`/listItem?subTipo=${3}`);
        const responseUnidade = await api.get(`/unidade`);
        const responseTipos = await api.get(`/tipoSubTipo?subTipo=${3}`);

        console.log(responseItem)

        setUnidades([...unidades, ...responseUnidade.data]);
        setItem([...item, ...responseItem.data]);
        setTipo([...tipo, ...responseTipos.data]);
    }

    useEffect(() => {
        firstLoad();
    }, []);

    function setVisibility(isVisible, item, unidade, id) {
        setIsVisivel(isVisible)
        setItemModal(item)
        setQuantidadeModal(unidade)
        setIdItem(id)
    }

    function addItem(isVisible, item, unidadeDrop, qtdNova) {
        setIsVisivel(isVisible)
        console.log(item, unidadeDrop, qtdNova)
    }

    function backHome() {
        navigation.goBack()
    }

    function setFiltroTipo(idFiltro) {
        if (filtro == idFiltro) {
            setFiltro(null)
        } else {
            setFiltro(idFiltro)
        }
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Adicionar bebidas</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                        <Icon style={style.iconHeaderBtn} name="arrow-alt-circle-left" size={20} />
                        <Text style={style.textHeaderBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={tipo}
                    horizontal={true}
                    keyExtractor={tipo => String(tipo.id)}
                    showsHorisontalScrollIndicator={false}
                    renderItem={({ item: tipo }) => (
                        <View style={style.filtroL} >
                            <TouchableOpacity style={style.tiposDeItenscard} onPress={() => setFiltroTipo(tipo.id)}>
                                <Text style={style.tiposDeItenstextCard}>{tipo.tipo}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />


                <FlatList
                    data={item}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: item }) => (
                        <View >
                            {filtro == null ? (
                                <TouchableOpacity style={style.card} onPress={() => setVisibility(true, item.nomeItem, item.unidade_id, item.id)}>
                                    {item.fotoUrlI == null 
                                    ? <Image source={{ uri: "https://churrappuploadteste.s3.amazonaws.com/default/tipo_" + item.tipo_id + ".jpg" }} style={style.churrasFoto} />
                                    : <Image source={{ uri: item.fotoUrlI }} style={style.churrasFoto} />}
                                    <View style={style.churrasInfosView}>
                                        <Text style={style.churrasTitle}>{item.nomeItem}</Text>
                                        <Text style={style.churrasDono}>{item.descricao} </Text>
                                        <View style={style.churrasLocDat}>
                                            <Icon style={style.localIcon} name="coins" size={15} />
                                            <Text style={style.churrasLocal}> {item.precoMedio == null ? '  -  ' : "  R$" + item.precoMedio}</Text>
                                            <Text style={style.locDatSeparator}>  |  </Text>
                                            <IconMat style={style.dataIcon} name="cow" size={15} />
                                            <Text style={style.churrasData}> {item.tipo}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ) : filtro == item.tipo_id ? (
                                <TouchableOpacity style={style.card} onPress={() => setVisibility(true, item.nomeItem, item.unidade_id, item.id)}>
                                   {item.fotoUrlI == null 
                                    ? <Image source={{ uri: "https://churrappuploadteste.s3.amazonaws.com/default/tipo_" + item.tipo_id + ".jpg" }} style={style.churrasFoto} />
                                    : <Image source={{ uri: item.fotoUrlI }} style={style.churrasFoto} />}
                                    <View style={style.churrasInfosView}>
                                        <Text style={style.churrasTitle}>{item.nomeItem}</Text>
                                        <Text style={style.churrasDono}>{item.descricao} </Text>
                                        <View style={style.churrasLocDat}>
                                            <Icon style={style.localIcon} name="coins" size={15} />
                                            <Text style={style.churrasLocal}>{item.precoMedio == null ? '  -  ' : "  R$" + item.precoMedio}</Text>
                                            <Text style={style.locDatSeparator}>  |  </Text>
                                            <IconMat style={style.dataIcon} name="cow" size={15} />
                                            <Text style={style.churrasData}> {item.tipo}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ) : null}
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
                                    onChange={quantNova => setQuantidadeModal(quantNova)}
                                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                    totalWidth={150}
                                    totalHeight={30}
                                    iconSize={15}
                                    initValue={0}
                                    step={1}
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
                                    {unidades.map(unity => (
                                        <Picker.Item label={unity.unidade} value={unity.id} />
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


            </SafeAreaView>
        </View>
    )

}