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

export default function EscolherNovosItens({ route, navigation }) {

    const [item, setItem] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [tipo, setTipo] = useState([]);
    const { tela } = route.params;
    const [visivel, setIsVisivel] = React.useState(false);
    const [itemModal, setItemModal] = React.useState('');
    const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
    const [tipomin, setTipoMin] = useState(null)
    const [tipomax, setTipoMax] = useState(null)
    const [pratoQuantidade, setPratoQuantidade] = useState([{item: null, quantidade: 0, unidade:null}])
    const [quantidadeModal, setQuantidadeModal] = useState(null)

    async function firstLoad() {
        const responseItem = await api.get(`/item`);
        const responseUnidade = await api.get(`/unidade`);
        const responseTipos = await api.get(`/tipo`);

        setUnidades([...unidades, ...responseUnidade.data]);
        setItem([...item, ...responseItem.data]);
        setTipo([...tipo, ...responseTipo.data]);
    }

    useEffect(() => {
        escolherTipos()
        firstLoad();
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
        console.log(item, qtdNova, unidadeDrop)
        setPratoQuantidade({item:item, quantidade:qtdNova, unidade:unidadeDrop})
        console.log(pratoQuantidade)
    }

    function backHome() {
        navigation.goBack()
    }

    function nextFiltering(tipo) {
        navigation.push('TodosOsItensAdicionar', { tipo })
    }

    listaUnidades = unidades.map(unity => (
        <Picker.Item label={unity.unidade} value={unity.id} />
      ));


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
                            data={tipo}
                            horizontal
                            keyExtractor={tipo => String(tipo.id)}
                            showsVerticalScrollIndicator={false}
                            showsHorisontalScrollIndicator={false}
                            renderItem={({ item: tipo }) => (
                                <View style={style.tiposDeCarnes}>
                                    <TouchableOpacity style={style.tiposDeItenscard} >
                                        <Text style={style.tiposDeItenstextCard}>{tipo.tipo}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            style={style.listStyle} />
                    </View>
                }
                {tela == 3 &&
                    <View style={style.filtro}>
                        <FlatList
                            data={tipo}
                            horizontal
                            keyExtractor={tipo => String(tipo.id)}
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
                    data={item}
                    keyExtractor={item => String(item.id)}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item: item }) => (
                        <View style={style.listaConvidados}>
                                <TouchableOpacity style={style.card} onPress={() => setVisibility(true, item.nomeItem)}>
                                    <Text style={style.textCard}>{item.nomeItem}</Text>
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
                            <TouchableOpacity style={style.exitBtn} onPress={() => setVisibility(false, "")}>
                                <Icon style={style.iconHeaderBtn} name="times" size={20} />
                                <Text style={style.textHeaderBtn}>fechar</Text>
                            </TouchableOpacity>
                            <Text style={style.modalText}>Quanto de {itemModal} deseja adicionar?</Text>
                            <View style={style.selectionForm}>
                                <NumericInput
                                    onChange={quantNova => setQuantidadeModal(quantNova)}
                                    onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                                    totalWidth={150}
                                    totalHeight={30}
                                    iconSize={15}
                                    initValue={0}
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
                                    onValueChange={itemValue => setSelectedUnidade(itemValue)}
                                >
                                    {listaUnidades}
                                </Picker>
                            </View>
                            <TouchableOpacity style={style.salvarBtn} onPress={() => addItem(false, itemModal, selectedUnidade ,quantidadeModal )}>
                                <Icon style={style.iconSalvarBtn} name="check" size={20} />
                                <Text style={style.textSalvarBtn}>Confirmar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


            </SafeAreaView>
        </View>
    )

}