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
  textSubHeader:{
    fontSize: 15,
    color: 'gray',
    fontFamily: 'poppins-medium',
  },


  formGroup:{
    marginHorizontal:20,
    marginTop: 15,
    justifyContent: "center",
  },
  textLabel:{
    fontSize: 17,
    color:"black",
    fontFamily: 'poppins-medium',
    marginBottom: 5,
  },
  inputStandard:{ 
    height: 40, 
    borderColor: 'gray', 
    fontFamily: 'poppins-regular',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
     
  body:{
    flex: 1,
  },

  //Rodapé
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

  stepHeader:{
    position:'absolute',
    right: 20,
    top:0,
  },
  
  exitBtn:{
    flexDirection:'row-reverse',
    position:"absolute",
    right: 0,
    top: 10,
  },
  textHeaderBtn:{
    fontSize: 15,
    marginHorizontal: 7,
  },

  //imagem
  imagePicker:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginVertical: 10,
  },
  inputDisplay:{ 
      flex: 0.7, 
      alignItems: 'center', 
      justifyContent: 'center',
      color:'#000', 
      borderColor:'gray', 
      borderWidth: 1,
      borderRadius:8,
      paddingVertical: 10,
      marginVertical: 20, 
      height: 200,
  },
  addImgIcon:{
    color: 'maroon',
  },

  //Data e hora
  componentPicker:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  picker:{
    marginLeft: 10,
  },

});