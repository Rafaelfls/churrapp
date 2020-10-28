import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

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
  participateBtn: {
    position:'absolute',
    top:40,
    right:20,
    justifyContent:'center',
    alignItems:'center'
  },
  textSwitch:{
    color:'white',
    fontFamily: 'poppins-light',
  },
  //body
  formGroup:{
    marginHorizontal:20,
    marginTop: 15,
    justifyContent: "center",
  },
  textLabel:{
    fontSize: 17,
    color:"maroon",
    fontFamily: 'poppins-medium',
    marginBottom: 5,
  },
  inputStandard:{ 
    height: 40, 
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'poppins-light',
    fontSize: 16,
  }, 
  infosPrincipais: {
    marginHorizontal:15,
    marginTop:10,
    width:'60%',
  },
  churrasLocalContainer: {
    marginBottom: 9,
    flexDirection: 'row',
    paddingRight:15,
  },
  churrasNome: {
    color: 'maroon',
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },
  icons: {
    color: 'maroon',
    marginRight: 8,
  },
  churrasDataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  churrasInfo: {
    color: 'black',
    fontFamily: 'poppins-light',
    fontSize: 16,
  },
  editFotoChurras:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    width:100,
    height:100,
    backgroundColor:'blue'
  },
  churrasDonoContainer: {
    height: 150,
    width: 120,
    marginBottom: 0,
    alignItems: 'center',
    backgroundColor: 'maroon',
    borderRadius: 10,
    padding: 10,
  },
  churrasImgContainer: {
    marginBottom: 0,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  churrasDono: {
    color: 'white',
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },
  donoImg: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  churrasImg: {
    height: 150,
    width: 150,
    borderRadius: 10,
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
    color: 'gray',
    fontSize: 18,
  },
  containerConvidados: {
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    flexDirection: 'row'
  },

  convidadoNaoConfirm: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    borderRadius: 8,
    margin: 10,
    height: 110,
    padding: 1,
    width: '90%'
  },  
  profileImgNaoConfirm: {
    height: '100%',
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },  
  nomeConvidadoNaoConfirm: {
    color: 'white',
    fontFamily: 'poppins-medium',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  foneConvidadoNaoConfirm: {
    color: 'white',
    fontFamily: 'poppins-light',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
  },
  statusConvidadoNaoConfirm: {
    color: 'white',
    fontFamily: 'poppins-light',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
  convidadoAusente: {
    flexDirection: 'row',
    backgroundColor: 'gray',
    borderRadius: 8,
    margin: 10,
    height: 110,
    padding: 1,
    width: '90%'
  },  
  profileImgAusente: {
    height: '100%',
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    opacity:0.5
  },  
  nomeConvidadoAusente: {
    color: 'white',
    fontFamily: 'poppins-medium',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    opacity:0.5
  },
  foneConvidadoAusente: {
    color: 'white',
    fontFamily: 'poppins-light',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
    opacity:0.5
  },  
  statusConvidadoAusente: {
    color: 'white',
    fontFamily: 'poppins-light',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
  convidadoPresente: {
    flexDirection: 'row',
    backgroundColor: 'maroon',
    borderRadius: 8,
    margin: 10,
    height: 110,
    padding: 1,
    width: '90%'
  },
  profileImg: {
    height: '100%',
    width: 100,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  nomeConvidado: {
    color: 'white',
    fontFamily: 'poppins-medium',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  foneConvidado: {
    color: 'white',
    fontFamily: 'poppins-light',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 15,
  },
  statusConvidado: {
    color: 'white',
    fontFamily: 'poppins-light',
    marginLeft: 10,
    marginTop: 5,
    fontSize: 13,
  },
  convidadoPago:{
    position:'absolute',
    right:20,
    top:13,
    color:'green'
  },

  //fim convidados

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
    fontSize: 13,
    color: 'orangered',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '40%',
  },
  precoItem: {
    fontSize: 12,
    color: '#0000ff',
    marginLeft: 2
  },
  precoItemNulo: {
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
    padding: 25,
    marginBottom: 20,
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
    height: '40%',
  },
  centeredViewItens: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '55%',
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
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'poppins-light',
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

  cardItemAdicionado: {
    marginVertical: 5,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    borderBottomColor: "#d3d3d3",
    borderBottomWidth: 1,
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
    marginBottom: 10,
    width: '80%',
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
    paddingRight: 8,
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
    paddingRight: 8,
    color: 'orangered',
  },
  churrasDataLista: {
    fontSize: 13,
    color: 'orangered',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '45%',
  },
  churrasDataModal: {
    fontSize: 13,
    color: 'orangered',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },

  //modalAdicionaQuantidade

  centeredViewQtd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '100%',
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
    marginTop: 10,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  selectionFormQtd: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:15,
  },  
  modalTextLabel:{
    textAlign: "left",
    fontSize: 17,
    marginRight:15,
    color:'#800000',
    fontFamily: 'poppins-light',
    maxWidth:'45%',
    width:'45%'
  },
  selectionFormQtdLabel: {
    fontSize: 18,
    fontFamily: 'poppins-light',
    marginRight: 10,
  },
  boxDropdownQtd: {
    position:'absolute',
    right:0,
    paddingHorizontal: 101,
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

  //modal entrar em contato com convidado
  modalViewContactar: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 25,
    alignItems: "center",
    width:'95%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredViewContactar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  modalTitleCont:{
    color:"#800000",
    fontFamily: 'poppins-medium',
    fontSize:30,
    marginBottom:15,
  },
  continueExitCont:{
    position:'absolute',
    top:10,
    right:20
  },
  modalTitleOpt:{
    color:"#800000",
    fontFamily: 'poppins-medium',
    fontSize:30,
    marginBottom:5,
  },
  modalTextCont:{
    fontSize:17,
    fontFamily: 'poppins-light',
    textAlign:'center'
  },
  modalSubCont:{
    fontSize:17,
    fontFamily: 'poppins-light',
    textAlign:'center',
    marginTop:20,
  },
  footerModalCont:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  continueBtnCont:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    marginHorizontal:5,
    backgroundColor: 'maroon',
    height: '60%',
    width: '40%',
    paddingVertical: 5,
  },
  textBtnCont:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  headerModalCont:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  closeBtnCont:{
    position:'absolute',
    top:15,
    right:20
  },
  //Fim modal entrar em contato com convidado

  //editar Foto churras
  centeredViewFotoChurras: {
    position:'absolute',
    height: 150,
    width: 150,
    borderRadius: 10,
    marginLeft:10,
    zIndex:1,
  },
  modalViewFotoChurras: {
    backgroundColor: "rgba(114,114,114,0.5)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent:'center',
    width:'100%',  
    height:'100%'  
  },
  continueBtnFotoChurras:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtnFotoChurras:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  //fim editar foto churras
});