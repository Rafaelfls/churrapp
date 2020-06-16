import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },  
  body:{
    flex: 1,
  },
  headerGroup:{
    flexDirection:'row',
  },
  textHeader: {
    fontSize: 25,
    color: '#fb2',
    marginLeft: 15,
  },
  exitBtn:{
    flexDirection:'row-reverse',
    position:"absolute",
    right: 10,
    top: 20,
  },
  textHeaderBtn:{
    fontSize: 15,
    marginHorizontal: 7,
  },
  footer:{    
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: 'center',
    backgroundColor: 'brown',
    position: 'absolute',
    width: '100%',
    bottom: 0,
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
componentPicker:{
  flexDirection: "row",
  alignContent: "center",
  marginVertical: 10,
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 5,
  paddingVertical: 10,
  backgroundColor:'white'
},   
textLabel:{
  fontSize: 20,
  color:"brown",
  marginBottom: 10,
},
picker:{
  position: 'absolute',
  right: 5,
  top:10,
  flexDirection:'row',
  borderWidth: 1,
  borderRadius: 6,
},
icons:{
    marginHorizontal: 5,
    justifyContent: 'center',
    textAlign: 'center'
},
quantidadeInput:{
    paddingHorizontal: 30,
    borderWidth: 0.2,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    width:100,
},
iconMeat:{
    zIndex: 100,
    color: 'black',
    fontSize: 20
}
})