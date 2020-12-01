import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },
  cleanInput: {
    position: 'absolute',
    right: 20,
    top: 40,
    backgroundColor: 'maroon',
    borderRadius: 100,
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
  headerGroup: {
    flexDirection: 'row',
  },
  exitBtn: {
    flexDirection: 'row-reverse',
    position: "absolute",
    right: 10,
    top: 10,
  },
  textHeaderBtn: {
    fontSize: 15,
    marginHorizontal: 7,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'poppins-semi-bold',
    color: 'black',
    marginHorizontal: 10,
  },

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
    fontSize: 30,
    marginBottom: 15,
    fontFamily: 'poppins-medium',
  },
  modalText: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'poppins-light',
  },
  footerModal: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  sairBtn: {
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
  textBtn: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
})