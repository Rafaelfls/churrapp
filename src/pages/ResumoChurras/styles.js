import { StyleSheet, Dimensions, StatusBar } from 'react-native';

export default StyleSheet.create({

  //header
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 15,
    backgroundColor: '#fff'
  },
  header: {
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
    textAlign: 'center'
  },
  textSubHeader: {
    fontSize: 15,
    color: 'gray',
    fontFamily: 'poppins-medium',
    textAlign: 'center'
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
    left: 24,
    zIndex: 1,
    top: -5
  },
  modalViewNotificacaoQtd: {
    backgroundColor: "rgba(114,114,114,0.5)",
    borderRadius: 100,
    alignItems: "center"
  },
  textBtnNotificacaoQtd: {
    color: 'white',
    fontSize: 10,
    fontFamily: 'poppins-medium',
  },
  //fim Notificação quantidade

  //cards
  churrasList: {
    paddingTop: 15,
    backgroundColor: "transparent",
  },

  //cardDesign
  churras: {
    marginVertical: 10,
    marginBottom: 15,
    marginHorizontal: 10,
  },
  slideBtn: {
    flexDirection: 'row',
    width: Dimensions.get('window').width + 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  detalheSlide: {
    backgroundColor: "darkgray",
    width: 100,
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

  semChurrasbg1: {
    position: 'absolute',
    bottom: 25,
    right: 85
  },
  semChurras1: {
    width: 100,
    height: 100
  },
  semChurrasbg2: {
    width: '100%',
    alignItems: 'center'
  },
  semChurras2: {
    width: 641*0.4,
    height: 802*0.4
  },

  // fim imagem quando nao tem churras


  //cardContent
  churrasDescricao: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unpressedCard: {
    backgroundColor: '#d3d3d350',
    width: "100%",
    borderRadius: 8,
    paddingVertical: 5,
  },
  pressedCard: {
    backgroundColor: '#d3d3d3',
    width: "100%",
    borderRadius: 8,
    paddingVertical: 5,
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
  extraIconTO: {
    color: 'maroon',
    position: 'absolute',
    top: 10,
    right: -20,
    height: 110,
    width: 100,
    // backgroundColor: 'red',
    zIndex: 20
  },
  extraIcon: {
    color: 'maroon',
  },
  churrasLocalSV: {
    marginBottom: 2,
    marginRight: 3,
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
  dot: {
    height: 5,
    width: 5,
    borderRadius: 5 / 2,
    backgroundColor: 'maroon',
    marginTop: 3,
    right: -50,
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
  plus1: {
    width: '25%',
    height: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    position: "absolute"
  },
  plus2: {
    height: '25%',
    width: 2,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    position: "absolute"
  },
  fab: {
    backgroundColor: 'transparent',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 22, 
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
    textAlign: 'center',
    fontFamily: 'poppins-light',

  },
  modalTitleCont: {
    color: "#800000",
    textAlign: 'center',
    fontFamily: 'poppins-medium',
    fontSize: 27,
    marginBottom: 15,
  },
  footerModal: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  exitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'lightgray',
    height: '60%',
    width: 125,
    paddingVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  iconExitBtn: {
    color: 'maroon',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  salvarBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'maroon',
    height: '60%',
    width: 125,
    paddingVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  iconSalvarBtn: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
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
    top: StatusBar.currentHeight - 44,
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