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
    paddingHorizontal: 40
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
    position:"absolute",
    right: 0,
    top: 10,
  },
  signOutIcon:{
    color: 'gray',
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
  slideBtn:{
    flexDirection:'row',
    width:"80%",
  },
  detalheSlide:{
    backgroundColor:"gray",
    width:100
  },
  deletarSlide:{
    backgroundColor:"red",
    width:100
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: "50%",
    width:'100%',
  },
  btnArea: {
    flexDirection: 'row',
    alignSelf: 'center'
  },
  btnSair: {
    paddingTop: 50,
    flexDirection: 'row',
    marginHorizontal: '8%'
  },
  btnDeletar: {
    paddingTop: 50,
    flexDirection: 'row',
  },
  btnText: {
    marginHorizontal: 8
  },
});