import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },  
  textHeader: {
    fontSize: 25,
    color: '#fb2',
    marginLeft: 15,
  },
  stepHeader:{
    position:'absolute',
    right: 20,
    top:0,
  },   
  body:{
    flex: 1,
  },
  footer:{    
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: 'center',
    backgroundColor: 'brown',
    bottom:0,
  },
  textFooter:{
    alignSelf: 'center',
    fontSize: 20,
    color: 'yellow',
    marginLeft: 15
  },
continueBtn:{
  alignSelf: 'center',
  position: 'absolute',
  right: 20,
  flexDirection:'row-reverse',
  borderRadius:8,
  backgroundColor: 'black',
  paddingHorizontal: 10,
  paddingVertical: 5,
},
textBtn:{
  marginRight: 10,
  color: 'yellow',
},
iconBtn:{
  color:"yellow",
},
formGroup:{
  marginHorizontal:20,
  marginTop: 15,
  justifyContent: "center",
},
textLabel:{
  fontSize: 20,
  color:"brown",
  marginBottom: 10,
},
inputStandard:{ 
  height: 40, 
  borderColor: 'gray', 
  borderWidth: 1 ,
  paddingHorizontal: 10,
  borderRadius:8,
  marginBottom: 10,
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
headerGroup:{
  flexDirection:'row',
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