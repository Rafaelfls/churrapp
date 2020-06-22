import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActionButton, SafeAreaView, FlatList, Modal, Picker } from 'react-native';
import api from '../../services/api';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import style from './styles';

var tiposDeCarnes = [
    {
        id: '1',
        nome: 'Bovino'
    },
    {
        id: '2',
        nome: 'Suino'
    },
    {
        id: '3',
        nome: 'Peixe'
    },
    {
        id: '4',
        nome: 'Frango'
    },
    {
        id: '5',
        nome: 'Exoticos'
    },
]

var tiposDeBebidas = [
    {
        id: '1',
        nome: 'Alcolicas'
    },
    {
        id: '2',
        nome: 'Não Alcolicas'
    },
]

var tiposDeExtras = [
    {
        id: '1',
        nome: 'Descartáveis'
    },
    {
        id: '2',
        nome: 'Utensílios'
    },
    {
        id: '3',
        nome: 'Consumíveis'
    },
    {
        id: '4',
        nome: 'Diversão'
    },
    {
        id: '5',
        nome: 'Temperos'
    },
]

var pratoPrincipal = [
    {
        id: '1',
        item: 'picanha',
        qtd: 0.5,
        unidade: 'kg',
        tipo: '1'
    },
    {
        id: '5',
        item: 'alcatra',
        qtd: 0.5,
        unidade: 'kg',
        tipo: '1'
    },
    {
        id: '2',
        item: 'coração',
        qtd: 50,
        unidade: 'kg',
        tipo: '3'
    },
    {
        id: '3',
        item: 'tulipa',
        qtd: 50,
        unidade: 'kg',
        tipo: '3'
    },
    {
        id: '4',
        item: 'costela',
        qtd: 100,
        unidade: 'kg',
        tipo: '2'
    },
    {
        id: '6',
        item: 'Narguile',
        qtd: 1,
        unidade: 'unidade',
        tipo: '12'
    },

]

export default function EscolherNovosItens({ route, navigation }) {

    const [item, setItem] = useState([]);
    const [loading, setLoading] = useState(false);
    const { tela } = route.params;
    const [visivel, setIsVisivel] = React.useState(false);
    const [itemModal, setItemModal] = React.useState('');
    const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
    const [tipomin, setTipoMin] = useState(null)
    const [tipomax, setTipoMax] = useState(null)

    async function carregarItem() {
        if (loading) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/item`);

        setItem([...item, ...response.data]);
        setLoading(false);

    }

    useEffect(() => {
        escolherTipos()
        carregarItem();
    }, []);

    function setVisibility(isVisible, item) {
        setIsVisivel(isVisible)
        setItemModal(item)
    }

    function escolherTipos() {
        if (tela == 1) {
            setTipoMin(1)
            setTipoMax(5)
        }
        if (tela == 2) {
            setTipoMin(6)
        }
        if (tela == 3) {
            setTipoMin(7)
            setTipoMax(8)
        }
        if (tela == 4) {
            setTipoMin(9)
            setTipoMax(13)
        }
    }

    function addItem(isVisible, item, unidadeDrop, qtdNova) {
        setIsVisivel(isVisible)
        setItemModal(item)
    }

    function onChangeVar(text, varivael) {
        varivael = text;
    }

    function backHome() {
        navigation.goBack()
    }

    function nextFiltering(tipo) {
        navigation.push('TodosOsItensAdicionar', { tipo })
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Vamos adicionar mais</Text>
                        {tela == 1 &&
                            <Text style={style.textHeader}>carnes?</Text>
                        }
                        {tela == 2 &&
                            <Text style={style.textHeader}>acompanhamentos?</Text>
                        }
                        {tela == 3 &&
                            <Text style={style.textHeader}>bebidas?</Text>
                        }
                        {tela == 4 &&
                            <Text style={style.textHeader}>itens extras?</Text>
                        }
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                        <Icon style={style.iconHeaderBtn} name="arrow-alt-circle-left" size={20} />
                        <Text style={style.textHeaderBtn}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                {tela == 1 &&
                    <View style={style.filtro}>
                        <FlatList
                            data={tiposDeCarnes}
                            horizontal
                            keyExtractor={tiposDeCarnes => String(tiposDeCarnes.id)}
                            showsVerticalScrollIndicator={false}
                            showsHorisontalScrollIndicator={false}
                            renderItem={({ item: tiposDeCarnes }) => (
                                <View style={style.tiposDeCarnes}>
                                    <TouchableOpacity style={style.tiposDeItenscard} >
                                        <Text style={style.tiposDeItenstextCard}>{tiposDeCarnes.nome}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            style={style.listStyle} />
                    </View>
                }
                {tela == 3 &&
                    <View style={style.filtro}>
                        <FlatList
                            data={tiposDeBebidas}
                            horizontal
                            keyExtractor={tiposDeBebidas => String(tiposDeBebidas.id)}
                            showsVerticalScrollIndicator={false}
                            showsHorisontalScrollIndicator={false}
                            renderItem={({ item: tiposDeBebidas }) => (
                                <View style={style.tiposDeBebidas}>
                                    <TouchableOpacity style={style.tiposDeItenscard} >
                                        <Text style={style.tiposDeItenstextCard}>{tiposDeBebidas.nome}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            style={style.listStyle} />
                    </View>
                }
                {tela == 4 &&
                    <View style={style.filtro}>
                        <FlatList
                            data={tiposDeExtras}
                            horizontal
                            keyExtractor={tiposDeExtras => String(tiposDeExtras.id)}
                            showsVerticalScrollIndicator={false}
                            showsHorisontalScrollIndicator={false}
                            renderItem={({ item: tiposDeExtras }) => (
                                <View style={style.tiposDeExtras}>
                                    <TouchableOpacity style={style.tiposDeItenscard} >
                                        <Text style={style.tiposDeItenstextCard}>{tiposDeExtras.nome}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            style={style.listStyle} />
                    </View>
                }

                <FlatList
                    data={pratoPrincipal}
                    keyExtractor={pratoPrincipal => String(pratoPrincipal.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: pratoPrincipal }) => (
                        <View style={style.listaConvidados}>
                            {pratoPrincipal.tipo <= tipomax && pratoPrincipal.tipo >= tipomin &&
                                <TouchableOpacity style={style.card} onPress={() => setVisibility(true, pratoPrincipal.item)}>
                                    <Text style={style.textCard}>{pratoPrincipal.item}</Text>
                                </TouchableOpacity>
                            }
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
                            <TouchableOpacity style={style.exitBtn} onPress={() => setVisibility(false, "")}>
                                <Icon style={style.iconHeaderBtn} name="times" size={20} />
                                <Text style={style.textHeaderBtn}>fechar</Text>
                            </TouchableOpacity>
                            <Text style={style.modalText}>Quanto de {itemModal} deseja adicionar?</Text>
                            <View style={style.selectionForm}>
                                <NumericInput
                                    onChange={text => onChangeVar(text, pratoPrincipal.qtd)}
                                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                    totalWidth={150}
                                    totalHeight={30}
                                    iconSize={15}
                                    initValue={pratoPrincipal.qtd}
                                    step={5}
                                    valueType='real'
                                    rounded
                                    textColor='brown'
                                    iconStyle={{ color: 'brown' }}
                                    style={style.quantidadeInput} />
                                <Picker
                                    selectedValue={selectedUnidade}
                                    style={style.boxDropdown}
                                    itemStyle={style.itemDropdown}
                                    mode="dropdown"
                                    onValueChange={(itemValue, itemIndex) => setSelectedUnidade(itemValue)}
                                >
                                    <Picker.Item label="g" value="g" />
                                    <Picker.Item label="kg" value="kg" />
                                    <Picker.Item label="unidade" value="unidade" />
                                    <Picker.Item label="pedaço" value="pedaço" />
                                    <Picker.Item label="fatia" value="fatia" />
                                </Picker>
                            </View>
                            <TouchableOpacity style={style.salvarBtn} onPress={() => addItem(false, "", selectedUnidade, /* adicionar variavel que guarde a quantidade */)}>
                                <Icon style={style.iconSalvarBtn} name="check" size={20} />
                                <Text style={style.textSalvarBtn}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <ActionButton offsetX={10} offsetY={90}/>

            </SafeAreaView>
        </View>
    )

}