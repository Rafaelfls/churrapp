import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  //header
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#fff'
  },
  header: {
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  titulo: {
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },
  textSubHeader: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'poppins-medium',
  },
  signOutBtn: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  menuBtn: {
    position: "absolute",
    left: 0,
    top: 10,
  },
  signOutIcon: {
    color: 'gray',
  },
  menuIcon: {
    color: 'gray',
  },
  //Notificação quantidade
  centeredViewNotificacaoQtd: {
    position: 'absolute',
    height: 15,
    width: 15,
    left: 19,
    zIndex: 1,
  },
  modalViewNotificacaoQtd: {
    backgroundColor: "rgba(114,114,114,0.5)",
    borderRadius: 100,
    alignItems: "center",
  },
  textBtnNotificacaoQtd: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'poppins-medium',
  },
  //fim Notificação quantidade

  //cards
  churrasList: {
    marginLeft: 20,
    paddingTop: 15,
    backgroundColor: "transparent"
  },

  //cardDesign
  churras: {
    backgroundColor: 'white',
    marginBottom: 15,
    marginLeft: 0,
  },
  slideBtn: {
    flexDirection: 'row',
    width: "74%",
  },
  detalheSlide: {
    backgroundColor: "darkgray",
    width: 100,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  deletarSlide: {
    backgroundColor: "#800000",
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },

  //imagem Quando nao tem churras

  semChurras: {
    marginTop:60,
    height: "100%",
    width:'100%',
    alignSelf: "center",
    position:'absolute',
    top:0
  },

  // fim imagem quando nao tem churras


  //cardContent
  churrasDescricao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  churrasFoto: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  churrasInfosView: {
    marginLeft: 10,
  },
  churrasTitle: {
    fontSize: 15,
    fontFamily: 'poppins-semi-bold',
  },
  churrasDono: {
    color: 'gray',
    fontFamily: 'poppins-medium',
  },
  churrasLocDat: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  localIcon: {
    color: 'steelblue',
    paddingBottom: 5,
  },
  churrasLocalSV: {
    marginBottom: 2,
    marginRight:3,
    width: '100%',
  },
  churrasLocal: {
    fontSize: 13,
    color: 'steelblue',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '100%',
  },
  locDatSeparator: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },
  dataIcon: {
    paddingBottom: 5,
    color: 'orangered',
  },
  churrasData: {
    fontSize: 13,
    color: 'orangered',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },

  //fabButton
  fabBtn: {
    opacity: 0.85,
  },
  fabBtnIcon: {
    fontSize: 15,
    height: 22,
    textAlignVertical: 'center',
    color: 'white'
  },

  //modal
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center'

  },
  modalTitleCont: {
    color: "#800000",
    textAlign: 'center',
    fontFamily: 'poppins-medium',
    fontSize: 27,
    marginBottom: 15,
  },
  footerModal: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  exitBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  salvarBtn: {
    marginHorizontal: 3,
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


  //Loading modal
  loadingBackground: {
    flexDirection: "row",
    position: 'relative',
    width: '100%',
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    opacity: 0.8
  },
  textLoading: {
    fontSize: 20,
    fontFamily: 'poppins-medium',
    color: 'white',
    marginLeft: 7,
  },

  //notificação modal
  modalViewNotf: {
    margin: 20,
    backgroundColor: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 25,
    paddingTop: 40,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  centeredViewNotf: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    position: 'absolute',
    top: Constants.statusBarHeight - 44,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#80808080"
  },
  cardNotf: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#800000"
  },
  cardTextNotf: {
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },
  cardFooterNotf: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  cardBtnNotf: {
    backgroundColor: '#800000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 5,
  },
  cardBtnNotf1: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 5,
  },
  cardBtnTextNotf: {
    fontFamily: 'poppins-medium',
    color: "white",
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  cardBtnTextNotf1: {
    fontFamily: 'poppins-medium',
    color: "gray",
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  closeNotf: {
    position: "absolute",
    top: 20,
    right: 20,
  }
  //fim notificacao modal
});