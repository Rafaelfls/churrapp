import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, HorizontalScrollView, Modal, TouchableHighlight, Alert, RefreshControl } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import ActionButton from 'react-native-action-button';
import IconEnt from 'react-native-vector-icons/Entypo';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconFA from 'react-native-vector-icons/FontAwesome';
import IconOct from 'react-native-vector-icons/Octicons';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome5';

import backgroundImg from '../../assets/fundoDescricao.jpg';
import profileImg from '../../assets/Perfil.jpg';
import donoImg from '../../assets/rafaelPerfil.jpg';
import frango from '../../assets/frango.jpg';
import linguica from '../../assets/linguica.jpg';
import fraldinha from '../../assets/fraldinha.jpg';
import pao from '../../assets/pao.jpg';

import style from './styles';
import { Container } from 'native-base';

import {useConvidadosCount} from '../../context/churrasCount';

export default function DetalheChurras() {
  const {convidadosCount, setConvidadosCount} = useConvidadosCount();

  const route = useRoute();
  const [itens, setItens] = useState([]);
  const [itensTotal, setItensTotal] = useState(0);
  const [convidados, setConvidados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [todosItens, setTodosItens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshItens, setRefreshItens] = useState([]);
  const [refreshConvidados, setRefreshConvidados] = useState([]);
  const [todosTipos, setTodosTipos] = useState([]);
  const [subTipos, setSubTipos] = useState([]);
  const [cancelBtn, setCancelBtn] = useState();

  const churras = route.params.churras;
  const allowShare = route.params.allowShare;
  const editavel = route.params.editavel;
  const [modalTipoVisivel, setModalTipoVisivel] = useState(false);
  const [modalItemVisivel, setModalItemVisivel] = useState(false);
  const [modalSubTipoVisivel, setModalSubTipoVisivel] = useState(false);
  const navigation = useNavigation();

  function CompartilharChurras(churras) {
    navigation.push('CompartilharChurrasco', { churras });

  }

  function backHome() {
    navigation.goBack()
  }

  async function carregarItens() {
    const response = await api.get(`/listadochurras/${churras.id}`);

    setItens([...itens, ...response.data]);
    setItensTotal(response.data.length);
  }
  async function carregarSubTipos() {
    const response = await api.get(`/subtipos`);

    setSubTipos([...subTipos, ...response.data]);
  }
  
  async function carregarTodosTipos(subTipo) {
    setModalTipoVisivel(!modalTipoVisivel);
    const response = await api.get(`/tipoSubTipo?subTipo=${subTipo.id}`);

    setTodosTipos([...todosTipos, ...response.data]);
  }
  async function onRefresh() {

    setLoading(true);

    const response = await api.get(`/convidados/${churras.id}`);
    const response2 = await api.get(`/listadochurras/${churras.id}`);

    setConvidados([...refreshConvidados, ...response.data]);
    setItens([...refreshItens, ...response2.data]);
    setItensTotal(response2.data.length);
    setLoading(false);
    
  }
  async function carregarConvidados() {
    const response = await api.get(`/convidados/${churras.id}`);

    setConvidados([...convidados, ...response.data]);
    setConvidadosCount(response.data.length);
    console.log("CONVIDADOS " + convidadosCount)
  }

 

  async function addItem(item) {
    await api.post('/listadochurras', {
      quantidade: 10,
      unidade_id: item.unidade_id,
      item_id: item.id,
      churras_id: churras.id
    })
    setModalItemVisivel(!modalItemVisivel);
    setModalSubTipoVisivel(!modalSubTipoVisivel)
    setModalTipoVisivel(!modalTipoVisivel)

    onRefresh();

  }

  function addItemVisivel() {
    if (editavel) {
      return(
        <TouchableOpacity onPress={() => setModalSubTipoVisivel(true)}>
            <Text style={style.verTodos}>Adicionar item</Text>
          </TouchableOpacity>
      );
    } else {
      return null
    }
  }


  async function pegarItemPorTipo(tipo){
    

    setModalItemVisivel(true);    
    const response = await api.get(`/items?tipo=${tipo.id}`);

    setTodosItens([...todosItens, ...response.data]);
  }


  useEffect(() => {
    carregarItens();
    carregarConvidados();
    carregarSubTipos();
  }, []);

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
                <IconEnt name="share" size={25} color={"white"}/>
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
            <View style={style.churrasDataContainer}>
              <IconEnt name="calendar" size={22} style={style.dataIcon} />
              <Text style={style.churrasData}>{churras.data} - {churras.hrInicio}</Text>
            </View>
          </View>
          <View style={style.churrasDonoContainer}>
            <Image source={{uri:churras.fotoUrlU}} style={style.donoImg} />
            <Text style={style.churrasDono}>{churras.nome}</Text>
          </View>
        </View>

        <View style={style.linhaDeSeparacao} />

        <View style={style.cabecalhoConvidados}>
          <View style={style.containerTituloConvidados}>
            <Text style={style.tituloConvidados}>Convidados</Text>
            <Text style={style.subtituloConvidados}>{convidadosCount} pessoas</Text>
          </View>
          <TouchableOpacity >
            <Text style={style.verTodos}>ver todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={convidados}
          horizontal
          pagingEnabled={true}
          style={{ height: 200, width: "100%" }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={() => onRefresh()}/>}
          showsHorizontalScrollIndicator={false}
          keyExtractor={convidados => String(convidados.id)}
          renderItem={({ item: convidados }) => (

            <View style={{ width: 140, height: 'auto', flexDirection: 'row' }}>
              <TouchableOpacity>
                <View style={style.convidado}>
                  <Image source={profileImg} style={style.profileImg} />
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
              <TouchableOpacity>
                <View style={style.item}>
                  <Image source={frango} style={style.itemImg} />
                  <Text style={style.nomeItem}>{itens.nomeItem}</Text>
                  <Text style={style.qtdItem}>{itens.quantidade}{itens.unidade}</Text>
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
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          <View style={style.centeredSubTipoView}>
            <View style={style.modalView}>
              <Text>Escolha uma categoria por favor</Text>
              <FlatList
                  data={subTipos}
                  style={{width:"100%"}}
                  horizontal
                  keyExtractor={subTipos => String(subTipos.id)}
                  renderItem={({ item: subTipos }) => (

                    <View style={style.subTiposDesign}>
                      <TouchableOpacity onPress={() =>{ carregarTodosTipos(subTipos)
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
        visible={modalTipoVisivel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
          <View style={style.centeredView}>
            <View style={style.modalView}>
            <Text>Agora um tipo</Text>
              <FlatList
                  data={todosTipos}
                  keyExtractor={todosTipos => String(todosTipos.id)}
                  renderItem={({ item: todosTipos }) => (

                    <View style={style.tiposDesign}>
                      <TouchableOpacity onPress={() => pegarItemPorTipo(todosTipos)}>
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
        visible={modalItemVisivel}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={style.centeredView}>
            <View style={style.modalView}>
            <Text>E para finalizar, o que deseja adicionar?</Text>
                <FlatList
                  data={todosItens}
                  keyExtractor={todosItens => String(todosItens.id)}
                  renderItem={({ item: todosItens }) => (

                    <View style={style.itensDesign}>
                      <TouchableOpacity onPress={() => {addItem(todosItens)
                      setTodosItens([]);
                      setTodosTipos([]);
                      }}>
                          <Text style={style.nomeItem}>{todosItens.nomeItem}</Text>
                      </TouchableOpacity>
                    </View>

                  )}
                />
              <View style={style.footerModal}>
                <TouchableHighlight style={style.exitBtn}  onPress={() => {
                    setModalItemVisivel(!modalItemVisivel);
                    setTodosItens([]);
                  }}>
                  {/* <Icon style={style.iconSalvarBtn} name="times" size={15} /> */}
                  <Text style={style.iconSalvarBtn}>Cancelar</Text>
                </TouchableHighlight>
              </View>
            </View>
        </View>
      </Modal>
    </View>
  )
}