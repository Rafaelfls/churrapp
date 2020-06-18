import { StyleSheet, YellowBox, RecyclerViewBackedScrollViewComponent } from 'react-native';
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
    marginLeft: 15,
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
  imagePicker:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginVertical: 10,
  },  
  componentPicker:{
    flexDirection: "row",
    alignContent: "center",
    marginVertical: 10,
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
  stepHeader:{
    position:'absolute',
    right: 20,
    top:0,
  },
  picker:{
    position: 'absolute',
    right: 0,
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
  },
  inputDisplay:{ 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      color:'#000', 
      borderColor:'black', 
      borderWidth: 1 ,
      borderRadius:8,
      paddingVertical: 10,
      marginVertical: 0, 
      width: 200, 
      height: 200,
  },
});