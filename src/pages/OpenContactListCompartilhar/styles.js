import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'white',
  },    
  body:{
    flex: 1,
  },
  headerGroup:{
    flexDirection:'row',
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
  exitBtn:{
    flexDirection:'row-reverse',
    position:"absolute",
    right: 10,
    top: 10,
  },
  textHeaderBtn:{
    fontSize: 15,
    marginHorizontal: 7,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'poppins-semi-bold',
    color: 'black',
    marginHorizontal: 10,
  },
})