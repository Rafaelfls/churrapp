import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'lightgrey',
  },

  backBtn: {
    paddingRight: 100,
  },

  titulo: {
    paddingRight: 110,
    fontSize: 25,
    fontWeight: 'bold',
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
    padding: 35,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
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
  salvarBtn: {
    marginTop: 15,
    flexDirection: 'row-reverse',
    backgroundColor: 'black',
    borderRadius: 8,
    padding: 5,
  },
  iconSalvarBtn: {
    color: 'gold',
    paddingHorizontal: 5,
  },
  textSalvarBtn: {
    color: 'gold',
    paddingHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  }

});