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
    width:"74%",
  },
  detalheSlide:{
    backgroundColor:"darkgray",    
    width:100,
    marginRight:10,
    justifyContent:'center',
    alignItems:'center',
    borderBottomLeftRadius:8,
    borderTopLeftRadius:8,
  },
  deletarSlide:{
    backgroundColor:"#800000",
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderBottomRightRadius:8,
    borderTopRightRadius:8,
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
    width:'100%',
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
    width:'40%',
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
    width:'45%',
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
    position: 'absolute',
    bottom: "35%",
    width:'100%',
  },
  modalText:{
    fontSize: 18,
    marginBottom:15
  },
  footerModal:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  exitBtn:{
    flexDirection:'row-reverse',
    backgroundColor:'#800000',
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:8,
    alignItems:'center',
    marginHorizontal: 6,
  },
  salvarBtn:{
    flexDirection:'row-reverse',
    backgroundColor:'#800000',
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:8,
    alignItems:'center',
    marginHorizontal: 6,
  },
  iconSalvarBtn:{
    marginLeft:5,
    color:'white'
  },

  
  //Loading modal
  loadingBackground: {
    flexDirection:"row",
    position: 'relative',
    width:'100%',
    height:"100%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    opacity: 0.8
  },
  textLoading:{
    fontSize: 20,
    fontFamily: 'poppins-medium',
    color: 'white',
    marginLeft:7,
  },
});