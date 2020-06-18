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
    justifyContent: 'space-between',
    alignItems: "flex-start",
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
  textSubHeader:{
    fontSize: 15,
    color: 'gray',
    fontFamily: 'poppins-medium',
  },
  signOutBtn:{
    paddingTop: 10,
    justifyContent: 'center',
  },
  signOutIcon:{
    color: 'gray',
  },
  slideBtn:{
    flexDirection:'row',
  },

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

  //cardContent
  churrasDescricao:{
    flexDirection:'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  churrasFoto:{
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  churrasInfosView:{
    marginLeft: 10,
  },
  churrasTitle: {
    fontSize: 15,
    fontFamily: 'poppins-semi-bold',
  },
  churrasDono:{
    color: 'gray',
    fontFamily: 'poppins-medium',
  },
  churrasLocDat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  localIcon:{
    color: 'steelblue',
    paddingBottom: 5,
  },
  churrasLocal: {
    fontSize: 13,
    color: 'steelblue',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },
  locDatSeparator: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },
  dataIcon:{
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
  fabBtn:{
    opacity: 0.85,
  },
  fabBtnIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
});