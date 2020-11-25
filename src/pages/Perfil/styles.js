import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Row, Right } from 'native-base';

export default StyleSheet.create({
  //header
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'maroon'
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
    left: 15,
    top: 10,
  },
  signOutIcon: {
    color: 'gray',
  },
  menuIcon: {
    color: 'gray',
  },
  //fim
  backgroundProfile: {
    backgroundColor: "maroon",
    marginBottom: 10,
    paddingBottom: 10,
  },

  editarContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight + 15,
    left: 10
  },
  editLine: {
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center'
  },
  inputStandard: {
    height: 40,
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'poppins-light',
    fontSize: 16,
  },
  mudarSenhaTO: {
    position: 'absolute',
    right: 5,
    top: 35,
    backgroundColor: 'maroon',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  mudarSenha: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  icons: {
    color: 'maroon',
    marginRight: 8,
  },
  modalText: {
    width: '50%'
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

  containerProfile: {
    alignItems: 'center',
    marginTop: Constants.statusBarHeight + 15,
  },

  profileImg: {
    height: 140,
    width: 140,
    borderRadius: 70,
    marginBottom: 10,
  },

  profileName: {
    fontFamily: 'poppins-medium',
    fontSize: 30,
    color: 'white',
  },

  profileLocal: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'poppins-regular',
  },

  profileIdade: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'poppins-regular',
    paddingHorizontal: 5,
  },
  containerIdade: {
    flexDirection: 'row',
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
  },
  salvarBtn: {
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

  //Meus Churrascos
  containerMyChurras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  containerOrg: {
    alignItems: 'center',
  },

  profileOrg: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'poppins-regular',
  },

  profileOrgNumber: {
    fontSize: 23,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },

  linhaSeparaçãoHor: {
    height: "90%",
    width: 1,
    backgroundColor: 'gray',
  },

  containerPart: {
    alignItems: 'center',
  },

  profilePart: {
    fontSize: 17,
    color: 'black',
    fontFamily: 'poppins-regular',
  },

  profilePartNumber: {
    fontSize: 23,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },

  //Minhas Preferências
  containerGeral: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingBottom: 10,
  },

  containerEsq: {
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  textoItem: {
    color: 'maroon',
    fontFamily: 'poppins-medium',
    fontSize: 18,
  },
  exitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
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
  formGroup: {
    marginHorizontal: 20,
    marginTop: 15,
    justifyContent: "center",
  },

  preferenciasTitulo: {
    fontFamily: 'poppins-medium',
    fontSize: 20,
    color: 'maroon',
    marginVertical: 10,
    marginLeft: 10,
  },

  infosLeft: {
    fontSize: 13,
    textAlign: 'left',
    marginHorizontal: 5,
    fontFamily: 'poppins-regular',
  },

  infosRight: {
    fontSize: 13,
    textAlign: 'right',
    marginHorizontal: 5,
    fontFamily: 'poppins-regular',
  },

  containerInfos: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
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
  //modal return update
  modalViewContactar: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 25,
    alignItems: "center",
    width: '95%',
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
  modalTitleCont: {
    color: "#800000",
    fontFamily: 'poppins-medium',
    fontSize: 30,
    marginBottom: 15,
  },
  modalTextCont: {
    fontSize: 17,
    fontFamily: 'poppins-light',
    textAlign: 'center'
  },
  footerModalCont: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  continueBtnCont: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
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
  iconExitBtn: {
    color: 'maroon',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  textBtnCont: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  //fim modal retunr update
  //editar Foto perfil
  centeredViewFotoPerfil: {
    position: 'absolute',
    height: 140,
    width: 140,
    zIndex: 1,
  },
  modalViewFotoPerfil: {
    backgroundColor: "rgba(114,114,114,0.5)",
    borderRadius: 70,
    alignItems: "center",
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  continueBtnFotoPerfil: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBtnFotoPerfil: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  //fim editar foto perfil
  // Dados Filtrados
  viewDadosFiltrados: {
    backgroundColor: 'transparent',
    margin: 0,
    flex: 1,
  },
  flatDadosFiltrados: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    margin: 10,
  },
  linha: {
    width: "90%",
    height: 1,
    backgroundColor: 'gray',
  },
  flatItemDadosFiltrados: {
    margin: 8,
    // borderWidth: 1,
    // borderRadius: 8,

  },
  textoDadosFiltrados: {
    color: 'maroon',
    fontFamily: 'poppins-semi-bold',
    padding: 2
  },
  flatCloseBtn: {
    color: 'maroon',
    textAlign: 'center',
    backgroundColor: 'lightgray',
    borderRadius: 8,
    width: 60,
    fontSize: 14
  },
  // Fim Dados Filtrados
});