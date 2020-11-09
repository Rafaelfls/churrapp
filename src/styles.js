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
  },
  // Fim
  // Pefil
  perfilInfo: {
    alignItems: 'center'
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
    height: 8
  },
  signOutBtn: {
  },
  signOutIcon: {
    color: 'black',
  },
})