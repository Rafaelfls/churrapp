import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, Picker, Modal, TouchableHighlight, Alert, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import NumericInput from 'react-native-numeric-input';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons'
import IconMa from 'react-native-vector-icons/MaterialIcons';
import IconOct from 'react-native-vector-icons/Octicons';
import api from '../../services/api';

import style from './styles';
import { Container } from 'native-base';

import { useConvidadosCount } from '../../context/churrasContext';

export default function DetalheChurras() {
  const { convidadosCount, setConvidadosCount } = useConvidadosCount();

  const route = useRoute();
  const [itens, setItens] = useState([]);
  const [itensTotal, setItensTotal] = useState(0);
  const [convidados, setConvidados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [todosItens, setTodosItens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [todosTipos, setTodosTipos] = useState([]);
  const [subTipos, setSubTipos] = useState([]);
  const [cancelBtn, setCancelBtn] = useState();
  const [churrasDateFormatted, setChurrasDateFormatted] = useState();

  const churras = route.params.churras;
  const allowShare = route.params.allowShare;
  const editavel = route.params.editavel;
  const [modalTipoVisivel, setModalTipoVisivel] = useState(false);
  const [modalItemVisivel, setModalItemVisivel] = useState(false);
  const [modalSubTipoVisivel, setModalSubTipoVisivel] = useState(false);
  const [quantidadeModal, setQuantidadeModal] = useState(0)
  const [idItem, setIdItem] = useState(null)
  const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");
  const [unidades, setUnidades] = useState([]);
  const [itemModal, setItemModal] = React.useState('');
  const [visivel, setIsVisivel] = React.useState(false);
  const navigation = useNavigation();

  function CompartilharChurras(churras) {
    navigation.push('CompartilharChurrasco', { churras });

  }

  async function setVisibility(isVisible, item, unidade, id) {
    const responseUnidade = await api.get(`/unidade`);

    setUnidades(responseUnidade.data);
    setQuantidadeModal(0)
    setIsVisivel(isVisible)
    setItemModal(item)
    setIdItem(id)
  }

  function formatData() {
    var date = new Date(churras.data).getDate() + 1
    var month = new Date(churras.data).getMonth() + 1
    var year = new Date(churras.data).getFullYear()
    setChurrasDateFormatted(date + '/' + month + '/' + year)
  }

  function backHome() {
    navigation.goBack()
  }

  async function carregarItens() {
    const response = await api.get(`/listadochurras/${churras.id}`);

    setItens(response.data);
    setItensTotal(response.data.length);
  }
  async function carregarSubTipos() {
    const response = await api.get(`/subtipos`);
    response.data.shift()
    setSubTipos(response.data);
  }

  async function carregarTodosTipos(subTipo) {
    if (subTipo.id == 2) {
      return pegarItemPorTipo({ id: 6 })
    } else {
      const response = await api.get(`/tipoSubTipo?subTipo=${subTipo.id}`).then(function (response) {
        setTodosTipos(response.data);
        setModalSubTipoVisivel(false);
        setModalTipoVisivel(true);
      });

    }
  }

  async function carregarConvidados() {
    const response = await api.get(`/convidados/${churras.id}`);

    setConvidados(response.data);
    setConvidadosCount(response.data.length);
  }


  async function addItem(isVisible, item, unidadeDrop, qtdNova) {
    setIsVisivel(isVisible)
    await api.post('/listadochurras', {
      quantidade: qtdNova,
      churras_id: churras.id,
      unidade_id: unidadeDrop,
      item_id: item,
    }).then(function (res) {
      setQuantidadeModal(0)
      setModalSubTipoVisivel(false)
      setModalTipoVisivel(false)
    })
  }

  function addItemVisivel() {
    if (editavel) {
      return (
        <TouchableOpacity onPress={() => setModalSubTipoVisivel(true)}>
          <Text style={style.verTodos}>Adicionar item</Text>
        </TouchableOpacity>
      );
    } else {
      return null
    }
  }


  async function pegarItemPorTipo(tipo) {
    const response = await api.get(`/items?tipo=${tipo.id}`).then(function (response) {
      setTodosItens(response.data);
      setModalSubTipoVisivel(false);
      setModalTipoVisivel(false);
      setModalItemVisivel(true);
    });
  }

  async function deleteItem(itens){
    await api.delete(`/listadochurras/${itens.id}`) 
    .then(function(response){
      setRefresh(!refresh);
    })
  }


  useEffect(() => {
    carregarItens();
    carregarConvidados();
    carregarSubTipos();
    formatData();
  }, [refresh]);

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <TouchableOpacity style={style.backBtn} onPress={() => backHome()} >
          <IconOct name="chevron-left" size={25} color={"white"} />
        </TouchableOpacity>
        <View style={style.title}>
          <Text style={style.detalheTitle}>{churras.nomeChurras}</Text>
        </View>
        {allowShare &&
          <TouchableOpacity style={style.shareBtn} onPress={() => CompartilharChurras(churras)} >
            <IconEnt name="share" size={25} color={"white"} />
          </TouchableOpacity>
        }
      </View>

      <ScrollView nestedScrollEnabled={true}>

        <View style={style.infosPrincipais}>
          <View style={style.infosLocDat}>
            <View style={style.churrasLocalContainer}>
              <IconFA name="map-o" size={20} style={style.localIcon} />
              <Text style={style.churrasLocal}>{churras.local}</Text>
            </View>
            <View style={style.churrasLocalContainer}>
              <IconEnt name="calendar" size={22} style={style.dataIcon} />
              <Text style={style.churrasData}>{churrasDateFormatted}</Text>
            </View>
            <View style={style.churrasLocalContainer}>
              <IconEnt name="clock" size={22} style={style.dataIcon} />
              <Text style={style.churrasData}>{churras.hrInicio}{churras.hrFim == null ? null : " - " + churras.hrFim}</Text>
            </View>
            <View style={style.churrasLocalContainer}>
              <IconMa name="description" size={22} style={style.dataIcon} />
              <Text style={style.churrasData}>{churras.descricao == null ? "-" : churras.descricao}</Text>
            </View>
          </View>
          <View style={style.churrasDonoContainer}>
            <Image source={{ uri: churras.fotoUrlU }} style={style.donoImg} />
            <Text style={style.churrasDono}>{churras.nome}</Text>
          </View>
        </View>

        <View style={style.linhaDeSeparacao} />

        <View style={style.cabecalhoConvidados}>
          <View style={style.containerTituloConvidados}>
            <Text style={style.tituloConvidados}>Convidados</Text>
            <Text style={style.subtituloConvidados}>{convidadosCount} pessoas</Text>
          </View>
        </View>

        <FlatList
          data={convidados}
          horizontal
          pagingEnabled={true}
          style={{ height: 200, width: "100%" }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={convidados => String(convidados.id)}
          renderItem={({ item: convidados }) => (

            <View style={{ width: 140, height: 'auto', flexDirection: 'row' }}>
              <TouchableOpacity>
                <View style={style.convidado}>
                  <Image source={{ uri: convidados.fotoUrlU }} style={style.profileImg} />
                  <Text style={style.nomeConvidado}>{convidados.nome}</Text>
                  <Text style={style.foneConvidado}>{convidados.celular}</Text>
                </View>
              </TouchableOpacity>
            </View>

          )}
        />

        <View style={style.linhaDeSeparacao} />

        <View style={style.cabecalhoItens}>
          <View style={style.containerTituloItens}>
            <Text style={style.tituloItens}>Itens {itensTotal}</Text>
          </View>
          {addItemVisivel()}
        </View>

        <FlatList
          data={itens}
          horizontal
          pagingEnabled={true}
          style={{ height: 200, width: "100%" }}
          showsHorizontalScrollIndicator={false}
          keyExtractor={itens => String(itens.id)}
          renderItem={({ item: itens }) => (

            <View style={{ width: 140, height: 'auto', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => deleteItem(itens)}>
                <View style={style.item}>
                  <Image source={{ uri: itens.fotoUrlI }} style={style.itemImg} />
                  <Text style={style.nomeItemAdc}>{itens.nomeItem}</Text>
                  <Text style={style.qtdItemAdc}>{itens.quantidade}{itens.unidade}</Text>
                </View>
              </TouchableOpacity>
            </View>

          )}
        />

      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSubTipoVisivel}
      >
        <View style={style.centeredSubTipoView}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Escolha uma categoria</Text>
            <FlatList
              data={subTipos}
              style={{ width: "100%" }}
              keyExtractor={subTipos => String(subTipos.id)}
              renderItem={({ item: subTipos }) => (

                <View >
                  <TouchableOpacity style={style.subTiposDesign} onPress={() => {
                    carregarTodosTipos(subTipos)
                  }}>
                    <Text style={style.nomeItem}>{subTipos.subTipo}</Text>
                  </TouchableOpacity>
                </View>

              )}
            />
            <View style={style.footerModal}>
              <TouchableHighlight style={style.exitBtn} onPress={() => {
                setModalSubTipoVisivel(!modalSubTipoVisivel);
              }}>
                {/* <Icon style={style.iconSalvarBtn} name="times" size={15} /> */}
                <Text style={style.iconSalvarBtn}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalTipoVisivel}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Qual tipo?</Text>
            <FlatList
              data={todosTipos}
              keyExtractor={todosTipos => String(todosTipos.id)}
              renderItem={({ item: todosTipos }) => (

                <View>
                  <TouchableOpacity style={style.tiposDesign} onPress={() => pegarItemPorTipo(todosTipos)}>
                    <Text style={style.nomeItem}>{todosTipos.tipo}</Text>
                  </TouchableOpacity>
                </View>

              )}
            />
            <View style={style.footerModal}>
              <TouchableHighlight style={style.exitBtn} onPress={() => {
                setModalTipoVisivel(!modalTipoVisivel);
                setTodosTipos([]);
              }}>
                {/* <Icon style={style.iconSalvarBtn} name="times" size={15} /> */}
                <Text style={style.iconSalvarBtn}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalItemVisivel}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.titleSubTipoModal}>Qual deseja adicionar?</Text>
            <FlatList
              data={todosItens}
              keyExtractor={todosItens => String(todosItens.id)}
              renderItem={({ item: todosItens }) => (
                <View>
                  <TouchableOpacity style={style.card} onPress={() => setVisibility(true, todosItens.nomeItem, todosItens.unidade_id, todosItens.id)}>
                    {todosItens.fotoUrlI == null
                      ? <Image source={{ uri: "https://churrappuploadteste.s3.amazonaws.com/default/tipo_" + todosItens.tipo_id + ".jpg" }} style={style.churrasFotoModal} />
                      : <Image source={{ uri: todosItens.fotoUrlI }} style={style.churrasFotoModal} />}
                    <View style={style.churrasInfosViewModal}>
                      <Text style={style.churrasTitleModal}>{todosItens.nomeItem}</Text>
                      <Text style={style.churrasDonoModal}>{todosItens.descricao} </Text>
                      <View style={style.churrasLocDatModal}>
                        <IconMat style={style.dataIconModal} name="cow" size={15} />
                        <Text style={style.churrasDataModal}> {todosItens.tipo}</Text>
                        <Text style={style.locDatSeparatorModal}>  |  </Text>
                        <Icon style={style.localIconModal} name="coins" size={15} />
                        <Text style={style.churrasLocalModal}> {todosItens.precoMedio == null ? '  -  ' : "  R$" + todosItens.precoMedio}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

              )}
            />
            <View style={style.footerModal}>
              <TouchableHighlight style={style.exitBtn} onPress={() => {
                setModalItemVisivel(!modalItemVisivel);
                setTodosItens([]);
                setRefresh(!refresh)
              }}>
                {/* <Icon style={style.iconSalvarBtn} name="times" size={15} /> */}
                <Text style={style.iconSalvarBtn}>Cancelar</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={visivel}
      >
        <View style={style.centeredViewQtd}>
          <View style={style.modalViewQtd}>
            <Text style={style.titleSubTipoModal}>Quanto de {itemModal} deseja adicionar?</Text>
            <View style={style.selectionFormQtd}>
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
                style={style.quantidadeInputQtd} />
              <Picker
                selectedValue={selectedUnidade}
                style={style.boxDropdownQtd}
                itemStyle={style.itemDropdown}
                mode="dropdown"
                onValueChange={itemValue => setSelectedUnidade(itemValue)}
              >
                {unidades.map(unity => (
                  <Picker.Item label={unity.unidade} value={unity.id} />
                ))}
              </Picker>
            </View>
            <View style={style.footerModalQtd}>
              <TouchableOpacity style={style.exitBtnFooterQtd} onPress={() => setVisibility(false, "", '', '')}>
                <Icon style={style.iconSalvarBtnQtd} name="times" size={15} />
                <Text style={style.iconSalvarBtnQtd}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.salvarBtnQtd} onPress={() => addItem(false, idItem, selectedUnidade, quantidadeModal)}>
                <Icon style={style.iconSalvarBtnQtd} name="check" size={15} />
                <Text style={style.iconSalvarBtnQtd}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>



    </View>
  )
}