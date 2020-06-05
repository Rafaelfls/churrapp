import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#fff',    
  },   
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:"lightgray",
    paddingLeft:10,
    paddingBottom: 10,
    zIndex: 1,
    backgroundColor: '#fff',
  },
  textHeader: {
    fontSize: 25,
    color: '#fb2',
  },
  formGroup:{
    marginHorizontal:20,
    marginVertical: 15,
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
  datePicker:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginVertical: 10,
  },    
  fabBtn: {
      fontSize: 20,
      height: 22,
      color: '#fff308',
    },
  footer:{
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  continueBtn:{
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
  stepHeader:{
    position:'absolute',
    right: 20,
    top:0,
  },
  scrollView:{
    marginBottom: 30,
  },
});