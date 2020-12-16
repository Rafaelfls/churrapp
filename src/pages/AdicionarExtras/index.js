import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Modal, SafeAreaView, FlatList, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import NumericInput from 'react-native-numeric-input';
import api from '../../services/api';

//Icones imports
import IconF5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFat from 'react-native-vector-icons/Feather';


import style from './styles';
import { useLoadingModal, createLoadingModal } from '../../context/churrasContext';

export default function AdicionarExtras({ route, navigation }) {

    const { loading, setLoading } = useLoadingModal();
    const criarModal = createLoadingModal(loading);
    const { convidadosQtd } = route.params;
    const [itemList, setItemList] = React.useState([])
    const [reload, setReload] = React.useState(false);
    const [itemDeletar, setItemDeletar] = useState([]);
    const [isSugestao, setIsSugestao] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(false);
    const [convidados, setConvidados] = useState([]);
    const [modalSair, setModalSair] = useState(false)
    const [isEnabled, setIsEnabled] = useState(false);
    const [modalSugestao, setModalSugestao] = useState(false)
    const { churrascode } = route.params;

    const config = {
        headers: { 'Authorization': USUARIOLOGADO.id }
    };

    async function carregaMinhaLista() {
        setLoading(true)
        await api.get(`/listadochurras/subTipo/${churrascode}/${4}`)
            .then(async function (response) {
                setItemList([])
                if (response.data == 0) {
                    await api.get(`/sugestao/${4}`).then(function (response) {
                        setItemList(response.data);
                        setIsSugestao(true)
                        setLoading(false)
                    });
                } else {
                    setItemList(response.data);
                    setIsSugestao(false)
                    setLoading(false)
                }
            })
    }

    useEffect(() => {
        carregaMinhaLista();
        carregaConvidados();
    }, [reload]);

    async function carregaConvidados() {
        await api.get(`/convidados/${churrascode}`)
            .then(function (res) {
                setConvidados(res.data)
            })
    }

    function enviaMensagens(convid, todosConvid) {
        var telefone = convid.celular
        if (convid.valorTotal != 0) {
            var valorFinal = (convid.valorTotal / todosConvid).toFixed(2);
            var cvt = CONVITE
            cvt = cvt.replace('R$XX,XX.', 'R$' + valorFinal + ".")
            cvt = cvt.replace('R$0.00.', 'R$' + valorFinal + ".")
            cvt = cvt.replace(',,', ',')
            cvt = cvt.replace(',.', '.')
            cvt = cvt.replace('..', '.')
            Linking.canOpenURL(`whatsapp://send?text=${cvt}`).then(supported => {
                if (supported) {
                    return Linking.openURL(`whatsapp://send?text=${cvt}&phone=+55${telefone}`);
                } else {
                    return Linking.openURL(`https://api.whatsapp.com/send?phone=+55${telefone}&text=${cvt}`)
                }
            })
        } else {
            alert("convid.valorTotal")
        }

    }

    async function updateValorPagar(convidado, quantosConvid) {
        var valorAPagar = convidado.valorTotal / quantosConvid;
        await api.put(`/atualizarValor/${convidado.id}`, {
            valorPagar: valorAPagar
        })


    }

    async function next(sugestao) {
        if (sugestao) {
            await carregaConvidados()
            var convidQtd = convidados.length + 1
            await convidados.map(convid => updateValorPagar(convid, convidQtd))
            await carregaConvidados()
            await convidados.map(convid => enviaMensagens(convid, convidQtd))
            await convidados.map(convid => enviaNotificacao(convid, convidQtd))

            setLoading(false)
            navigation.replace('FinalCriaChurras');
        } else {
            if (isSugestao) {
                setModalSugestao(true)
            } else {
                var item = itemList.map((items) => item = items.nomeItem)
                var temCarvao = false
                item.map((item) => {
                    if (item == "Carvão" || item == "Álcool em Gel") {
                        temCarvao = true
                    }
                })
                if (temCarvao) {
                    next(true)
                } else {
                    setModalSugestao(true)
                }
            }
        }

    }


    async function enviaNotificacao(convid, todosConvid) {
        var valorFinal = (convid.valorTotal / todosConvid).toFixed(2);
        if (convid.limiteConfirmacao == null) {
            await api.post(`/notificacoes/${convid.usuario_id}/${churrascode}`, {
                mensagem: `${USUARIOLOGADO.nome} está te convidando para o churras ${convid.nomeChurras}, e o valor por pessoa é de R$${valorFinal}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                negar: "Não vou",
                confirmar: "Vou",
                validade: convid.date,
            })
        } else {
            await api.post(`/notificacoes/${convid.usuario_id}/${churrascode}`, {
                mensagem: `${USUARIOLOGADO.nome} está te convidando para o churras ${convid.nomeChurras}, e o valor por pessoa é de R$${valorFinal}. Para mais informações acesse o churrasco na pagina de churras futuros. `,
                negar: "Não vou",
                confirmar: "Vou",
                validade: convid.limiteConfirmacao,
            })
        }
    }

    function escolherNovosItens() {
        navigation.push('EscolherNovosItens4', { churrascode, convidadosQtd, subtipo: null })
    }

    function backHome() {
        CONVITE = null;
        setLoading(true)
        api.delete(`/churras/${churrascode}`, config)
            .then(function (response) {
                setLoading(false)
                navigation.replace('Tabs');
            })
        setModalSair(false)
    }
    function backOnePage() {
        setLoading(true)
        setItemList([])
        setLoading(false)
        navigation.goBack()
    }

    async function deleteItem(item) {
        setLoading(true)
        var precoFinalTotal = item.precoItem * item.quantidade;
        await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
            valorTotal: -precoFinalTotal
        }).then(async function () {
            await api.delete(`/listadochurras/${item.id}`)
                .then(function (res) {
                    setIsEnabled(false)
                    setIsVisible(false)
                    setReload(!reload)
                    setLoading(false)
                })
        })
    }

    function updateValue(qtdSugestao) {
        var convidQtd = convidados.length + 1
        if (isSugestao) {
            if (convidQtd == 0 || convidQtd == undefined || convidQtd == null) {
                return (qtdSugestao).toFixed(2)
            } else {
                return (qtdSugestao * (convidQtd)).toFixed(2)
            }
        }
        return qtdSugestao.toFixed(2)
    }


    async function adicionarSugestao() {
        var convidQtd = convidados.length + 1
        setLoading(true)
        setIsEnabled(previousState => !previousState)
        if (!isEnabled) {
            if (isSugestao) {
                setLoading(true)
                var precoFinalTotal = 0;
                itemList.map(async item => {
                    var quantidadeFinal = item.quantidade * convidadosQtd
                    precoFinalTotal = precoFinalTotal + (item.precoMedio * quantidadeFinal);
                    await api.post('/listadochurras', {
                        quantidade: quantidadeFinal,
                        churras_id: churrascode,
                        unidade_id: item.unidade_id,
                        item_id: item.item_id,
                        formato_id: 7,
                        precoItem: item.precoMedio,
                    })
                })

                await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
                    valorTotal: precoFinalTotal
                })

                carregaConvidados();
            }
            setIsSugestao(false)
            setReload(!reload)
            setLoading(false)
        } else {
            console.log('Se der ruim foi aqui')
            // await api.get(`/sugestao/${1}`).then(function (response) {
            //     response.data.map(async item => {
            //         var quantidadeFinal = item.quantidade * convidadosQtd
            //         await api.post('/listadochurras', {
            //             quantidade: -quantidadeFinal,
            //             churras_id: churrascode,
            //             unidade_id: item.unidade_id,
            //             item_id: item.item_id,
            //             formato_id: 7,
            //             precoItem: item.precoMedio,
            //         }).then(async function (res) {
            //             var precoFinalTotal = item.precoMedio * item.quantidade;
            //             await api.put(`/churrasUpdate/valorTotal/${churrascode}`, {
            //                 valorTotal: -precoFinalTotal
            //             })
            //         })
            //     })
            //     setReload(!reload)
            // });
        }
        carregaConvidados();
        setLoading(false)
    }


    return (
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <TouchableOpacity style={style.exitBtn} onPress={() => backOnePage()}>
                        <IconFat style={style.iconHeaderBtn} name="chevron-left" size={22} />
                    </TouchableOpacity>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Outros itens</Text>
                    </View>
                    <TouchableOpacity style={style.exitBtn} onPress={() => setModalSair(true)}>
                        <Icon style={style.iconHeaderBtn} name="md-close" size={22} />
                    </TouchableOpacity>
                </View>
                {isSugestao
                    ? <View style={{ flexDirection: 'row', marginTop: 5, justifyContent: "center", alignItems: "center" }}>
                        {isEnabled
                            ? <Text style={style.textLabel}>Apagar sugestão?</Text>
                            : <Text style={style.textLabel}>Manter sugestão?</Text>
                        }

                        <Switch
                            trackColor={{ false: "gray", true: "maroon" }}
                            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={adicionarSugestao}
                            value={isEnabled}
                        />
                    </View>
                    : null
                }

                <FlatList
                    data={itemList}
                    keyExtractor={itemList => itemList.id}
                    showsVerticalScrollIndicator={false}
                    refreshing={loading}
                    onRefresh={carregaMinhaLista}
                    renderItem={({ item: itemList }) => (
                        <View>
                            {isSugestao == true
                                // Caso seja seja sujestão o item não pode ser deletado
                                ? (<View style={style.componentPicker}>
                                    <View style={style.textIcon}>
                                        <Text style={style.textLabel}>{itemList.nomeItem}</Text>
                                    </View>
                                    <View style={style.picker}>
                                        <Text style={style.textLabel}>{updateValue(itemList.quantidade) + " " + itemList.unidade}</Text>
                                    </View>
                                </View>)
                                // Caso nao seja sujestão o item pode ser deletado
                                : (<TouchableOpacity style={style.componentPicker} onPress={() => { setIsVisible(true); setItemDeletar(itemList) }}>
                                    <View style={style.textIcon}>
                                        <Text style={style.textLabel}>{itemList.nomeItem}</Text>
                                    </View>
                                    <View style={style.picker}>
                                        <Text style={style.textLabel}>{updateValue(itemList.quantidade) + " " + itemList.unidade}</Text>
                                    </View>
                                </TouchableOpacity>)}
                        </View>
                    )}
                    style={style.listStyle} />

                <ActionButton offsetX={10} offsetY={100} onPress={() => escolherNovosItens()} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isVisible}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitleText}>Deletar</Text>
                            <Text style={style.modalText}>Deseja remover <Text style={{ fontFamily: 'poppins-medium' }}>{itemDeletar.nomeItem}</Text> do seu churras? </Text>
                            <View style={style.footerModal}>
                                <TouchableOpacity style={style.exitBtnModal} onPress={() => setIsVisible(false)}>
                                    <Text style={style.iconExitBtn}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.salvarBtn} onPress={() => deleteItem(itemDeletar)}>
                                    <Text style={style.iconSalvarBtnModal}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {isEnabled
                    ? <View style={style.footer2}>
                        <TouchableOpacity style={style.continueBtn2} onPress={() => next(true)}>
                            <Text style={style.textBtn}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={style.footer2}>
                        <TouchableOpacity style={style.continueBtn2} onPress={() => next(false)}>
                            <Text style={style.textBtn}>Continuar</Text>
                        </TouchableOpacity>
                    </View>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSair}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitle}>Quer sair?</Text>
                            <Text style={style.modalText}>Você deseja mesmo cancelar este churrasco?</Text>
                            <Text style={style.confirmarSairSubTitle}>(Tudo que fez até aqui sera perdido)</Text>
                            <View style={style.footerModalSair}>
                                <TouchableOpacity style={style.sairBtn} onPress={() => setModalSair(false)}>
                                    <Text style={style.iconExitBtn}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.salvarBtn} onPress={() => backHome()}>
                                    <Text style={style.textBtn}>Sim</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalSugestao}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitle}>Dica</Text>
                            <Text style={style.modalText}>Não quer voltar e acrescentar carvão e/ou acendedor ao churrasco?</Text>
                            {/* <Text style={style.confirmarSairSubTitle}>?</Text> */}
                            <View style={style.footerModalSair}>
                                <TouchableOpacity style={style.sairBtn} onPress={() => next(true)}>
                                    <Text style={style.iconExitBtn}>Não</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.salvarBtn} onPress={() => setModalSugestao(false)}>
                                    <Text style={style.textBtn}>Sim</Text>
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