import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },

  //Header
  headerGroup:{
    flexDirection:'row',
    marginHorizontal: 20,
  },
  textHeader: {
    fontSize: 25,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },
 
  body:{
    flex: 1,
  },

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


formGroup:{
  marginHorizontal:20,
  marginTop: 15,
  justifyContent: "center",
},


textLabel:{
  fontSize: 20,
  color:"black",
  fontFamily: 'poppins-medium',
  marginBottom: 0,
},
inputStandard:{ 
  height: 40, 
  borderColor: 'gray', 
  paddingHorizontal: 10,
  borderBottomWidth: 1,
  marginBottom: 20,
},

listaConvidados:{
  backgroundColor:'lightgray',
  marginHorizontal: 25,
  borderRadius: 8,
  padding: 15,
  marginVertical: 10,
},
listaConvidadosItem:{
  flexDirection: 'row',
},
listaConvidadosLabel:{
  fontSize: 15,
  fontWeight: 'bold',
  color: 'brown',
  marginLeft: 10,
},
listaConvidadosLabelOK:{
  fontSize: 15,
  fontWeight: 'bold',
  color: 'green',
  marginLeft: 10,
},
listaConvidadosLabelNOK:{
  fontSize: 15,
  fontWeight: 'bold',
  color: 'red',
  marginLeft: 10,
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
}
})