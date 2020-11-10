import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  drawerActive: {
    backgroundColor: 'white'
  },
  drawerInactive: {
    backgroundColor: 'black'
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
  // CustomSideBarMenu
  sideMenuProfileIcon: {
    // resizeMode: 'center',
    marginTop: 40,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    top: -15
  },
  // Fim
  // Pefil
  perfilInfo: {
    alignItems: 'center',
  },
  perfilChurrasInfo: {
    flexDirection: 'row'
  },
  perfilTxtInfo: {
    marginHorizontal: 4,
    fontFamily: 'poppins-medium',
    fontSize: 15
  },
  perfilChurrasInfoBox: {
    backgroundColor: 'transparent',
    // borderRadius: 8,
    // borderColor: 'rgba(125,0,0,0.8)',
    // borderWidth: 1,
    // marginHorizontal: 30,
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 20

  },
  // Fim
  linha: {
    backgroundColor: 'gray',
    width: '100%',
    height: 4,
  },
  signOutBtn: {
  },
  signOutIcon: {
    color: 'black',
  },
  //Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 35,
    paddingVertical: 25,
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
  modalTitle: {
    color: "#800000",
    fontSize: 26,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 17,
    textAlign: 'center'
  },
  footerModal: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  inputArea: {
    marginHorizontal: 30,
    marginTop: 50,
    width: 200
  },
  textLabel: {
    fontSize: 17,
    color: "black",
    fontFamily: 'poppins-medium',
    marginBottom: 5,
  },
  inputStandard: {
    height: 40,
    borderColor: 'gray',
    fontFamily: 'poppins-regular',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 2,
    fontSize: 17,
  },
  inputStandardAssunto:{
    height: 40,
    borderColor: 'gray',
    fontFamily: 'poppins-regular',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 2,
    fontSize: 17,
  },
  continueBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'maroon',
    width: '100%',
    height: 40,
    paddingVertical: 5,
    marginTop: 10
  },
  textBtn: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  //Fim
})