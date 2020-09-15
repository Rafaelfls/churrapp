import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'white',
  },

  //Header
  headerGroup:{
    flexDirection:'row',
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 23,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },
  body:{
    flex: 1,
  },

  


formGroup:{
  marginHorizontal:20,
  marginTop: 15,
  justifyContent: "center",
},


textLabel:{
  fontSize: 18,
  color:"black",
  fontFamily: 'poppins-medium',
  marginBottom: 0,
},
inputStandard:{ 
  borderColor: 'gray', 
  paddingHorizontal: 5,
  borderBottomWidth: 1,
  marginBottom: 20,
  fontFamily: 'poppins-medium',
},

listaConvidados:{
  backgroundColor:'white',
  marginHorizontal: 20,
  borderRadius: 8,
  marginVertical: 10,
},
listaConvidadosItem:{
  flexDirection: 'row',
  alignItems: 'center',
},
listaConvidadosLabel:{
  fontSize: 20,
  fontFamily: 'poppins-semi-bold',
  color: 'maroon',
  paddingBottom: 5,
},
phoneIcon:{
  color: 'black',
  paddingBottom: 3,
},
listaConvidadosLabelNum:{
  fontFamily: 'poppins-medium',
  color: 'black',
  marginLeft: 10,
},


//footer
footer:{    
  height: 90,
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: "center",
  borderTopColor: 'lightgray',
  borderTopWidth: 1,
  backgroundColor: 'white',
},
continueBtn:{
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:8,
  backgroundColor: 'maroon',
  height: '60%',
  width: '85%',
  paddingVertical: 5,
},
textBtn:{
  color: 'white',
  fontSize: 17,
  fontFamily: 'poppins-medium',
  textAlign: 'center',
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
modalTitle:{
  color:"#800000",
  fontSize:30,
  marginBottom:15,
  fontWeight: "bold"
},
confirmarSairTitle:{
  color:"#800000",
  fontSize:20,
  marginBottom:8,
  textAlign:"center"
},
modalText:{
  fontSize:17,
  textAlign:'center'
},
confirmarSairSubTitle:{
  fontSize:12,
  textAlign:'center',
  color: "grey"
},
footerModal:{    
  height: 90,
  flexDirection: "row",
  alignItems: 'center',
  justifyContent: "center",
  backgroundColor: 'white',
},
sairBtn:{
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius:8,
  backgroundColor: 'maroon',
  height: '60%',
  width: 125,
  paddingVertical: 5,
  marginHorizontal: 10
},
textBtn:{
  color: 'white',
  fontSize: 17,
  fontFamily: 'poppins-medium',
  textAlign: 'center',
},
})