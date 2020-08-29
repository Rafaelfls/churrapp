import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Left } from 'native-base';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  //header
  containerHeader: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: '2%',
    backgroundColor: 'maroon',

  },
  title: {
    width: '70%',
    marginTop: 10,
  },
  detalheTitle: {
    fontSize: 30,
    marginBottom: 0,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 15,
    opacity: 0.9,
    textAlign: "center",
  },
  backBtn: {
    position: "relative",
    top: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  shareBtn: {
    position: "relative",
    top: 0,
    right: 0,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  //body
  infosPrincipais: {
    marginLeft: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  infosLocDat: {
    marginLeft: 5,
    width: '70%'
  },
  churrasLocalContainer: {
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  churrasLocal: {
    color: 'gray',
    fontSize: 18,
  },
  localIcon: {
    color: 'gray',
    marginRight: 8,
  },
  churrasDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  churrasData: {
    color: 'gray',
    fontSize: 18,
  },
  dataIcon: {
    color: 'gray',
    marginRight: 8,
  },
  churrasDonoContainer: {
    marginBottom: 0,
    alignItems: 'center',
    backgroundColor: 'maroon',
    borderRadius: 10,
    padding: 10,
  },
  churrasImgContainer: {
    marginBottom: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 10,
  },
  churrasDono: {
    color: 'white',
    fontSize: 13,
  },
  donoImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  churrasImg: {
    height: 100,
    width: 100,
    borderRadius: 30,
    resizeMode: 'stretch',
  },

  //linha
  linhaDeSeparacao: {
    backgroundColor: 'lightgray',
    height: 1,
    width: "90%",
    alignSelf: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
  },

  //convidados
  cabecalhoConvidados: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  containerTituloConvidados: {
    alignItems: 'flex-start',
  },
  tituloConvidados: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  verTodos: {
    fontWeight: 'bold',
  },
  subtituloConvidados: {
    fontSize: 17,
    opacity: 0.7,
  },
  containerConvidados: {
  },
  convidado: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'maroon',
    borderRadius: 8,
    margin: 10,
    height: 150,
  },
  profileImg: {
    height: 110,
    width: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  nomeConvidado: {
    color: 'white',
    padding: 3,
  },
  foneConvidado: {
    color: 'lightgray',
    paddingBottom: 12,
    fontSize: 12,
  },

  //Itens
  cabecalhoItens: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  containerTituloItens: {
    alignItems: 'flex-start',
  },
  tituloItens: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  verTodos: {
    fontWeight: 'bold',
  },
  subtituloItens: {
    fontSize: 17,
    opacity: 0.7,
  },
  containerItens: {
  },
  item: {
    justifyContent: 'center',
    backgroundColor: "#d3d3d3",
    borderRadius: 8,
    margin: 10,
    padding: 8,
    height: 130,
    bottom: 10,
  },
  tiposDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "maroon",
    borderRadius: 8,
    width: "100%",
    marginVertical: 5,
    height: 70,
  },
  subTiposDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "maroon",
    borderRadius: 8,
    width: "100%",
    marginVertical: 5,
    height: 70,
  },
  itensDesign: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "maroon",
    borderRadius: 8,
    width: "100%",
    marginVertical: 5,
    height: 70,
  },
  itemImg: {
    height: 30,
    width: 100,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  nomeItemAdc: {
    color: '#800000',
    padding: 3,
  },
  qtdItemAdc: {
    color: '#800000',
    fontSize: 12,
  },
  precoItem:{
    fontSize: 12,
    color: '#0000ff',
    marginLeft: 2
  },
  precoItemNulo:{
    fontSize: 20,
    color: '#0000ff',
    marginLeft: 2,
    marginBottom: 5
  },
  nomeItem: {
    color: 'white',
    padding: 3,
  },
  qtdItem: {
    color: 'white',
    paddingBottom: 12,
    fontSize: 12,
  },




  detalheChurras: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    marginHorizontal: 15,
  },


  churrasSubTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000'
  },
  detalheDescricao: {
    alignSelf: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  detalheBtnView: {
    position: 'absolute',
    alignSelf: 'center',
    top: '92%',
  },
  modalView: {
    backgroundColor: "#f2f2f2",
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopColor: "#d3d3d3",
    borderTopWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '60%',
    height: 'auto',
  },
  //subTipo  modal
  centeredSubTipoView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
  },
  titleSubTipoModal: {
    fontSize: 25,
    marginBottom: 0,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 15,
    opacity: 0.9,
    textAlign: "center",
  },
  footerModal: {
    margin: 10,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  exitBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  iconSalvarBtn: {
    marginLeft: 5,
    color: 'white'
  },

  //cardModal

  card: {
    marginVertical: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
  },
  textCard: {
    justifyContent: "center",
    alignSelf: 'center',
    color: 'white',
    fontSize: 36,
  },
  tiposDeItenscard: {
    marginVertical: 5,
    marginHorizontal: 7,
    backgroundColor: 'maroon',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tiposDeItenstextCard: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
    justifyContent: "center",
    alignSelf: 'center',
  },
  iconTipo: {
    justifyContent: "center",
    alignSelf: 'center',
    color: 'gold',
    fontSize: 36,
  },
  //card itens

  churrasFotoModal: {
    width: 50,
    height: 50,
    borderRadius: 33,
  },
  churrasInfosViewModal: {
    marginLeft: 10,
    marginBottom: 10
  },
  churrasTitleModal: {
    fontSize: 15,
    fontFamily: 'poppins-semi-bold',
  },
  churrasDonoModal: {
    color: 'gray',
    fontFamily: 'poppins-medium',
  },
  churrasLocDatModal: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  localIconModal: {
    color: 'steelblue',
    paddingBottom: 5,
  },
  churrasLocalModal: {
    fontSize: 13,
    color: 'steelblue',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '40%',
  },
  locDatSeparatorModal: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },
  dataIconModal: {
    paddingBottom: 5,
    color: 'orangered',
  },
  churrasDataModal: {
    fontSize: 13,
    color: 'orangered',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '45%',
  },

  //modalAdicionaQuantidade
  
  centeredViewQtd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
  },
  modalViewQtd: {
    backgroundColor: "#f2f2f2",
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopColor: "#d3d3d3",
    borderTopWidth: 1,
  },
  iconSalvarBtnQtd: {
    marginLeft: 5,
    color: 'white'
  },  
  exitBtnFooterQtd: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  salvarBtnQtd: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  }, 
  footerModalQtd: {
    marginTop:10,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  selectionFormQtd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxDropdownQtd: {
    paddingHorizontal: 70,
    color: 'black',
  },
  titleSubTipoModalQtd: {
    fontSize: 20,
    marginBottom: 0,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 15,
    opacity: 0.9,
    textAlign: "center",
  },
});