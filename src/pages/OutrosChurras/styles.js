import { StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  //header
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },  

  //header
  header: {
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  titulo: {
    width:"100%"
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
    textAlign:'center'
  },

 //cards
 churrasList: {
  marginHorizontal: 20,
  paddingTop: 15,
  backgroundColor: "transparent",
},

//cardDesign
slideBtn:{
  flexDirection:'row',
  width:'100%',
  marginTop:10,
  marginBottom:15,
  padding:10,
  backgroundColor:'#d3d3d350',
  borderRadius:8,
},

//cardContent
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
  width:'100%',
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

});