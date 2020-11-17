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
    width:"100%",
    paddingHorizontal:40
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },
  exitBtn:{
    position:"absolute",
    left: 3,
    top: 10,
  },

  // formulario
  formGroup:{
    marginHorizontal:20,
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
    fontFamily: 'poppins-regular',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  formOk:{
    borderColor: 'gray', 
  },
  formNok:{
    borderColor: 'red', 
  },
  
  
  //imagem
  imagePicker:{
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    marginBottom: 10,
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
      marginBottom: 20, 
      height: 200,
  },
  addImgIcon:{
    color: 'maroon',
    opacity: 0.5,
    position: 'absolute',
  },

  //CadastroBtn
  textBtn:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },

  //modal
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
    fontFamily: 'poppins-medium',
  },
  modalText:{
    fontSize:17,
    textAlign:'center',
    fontFamily: 'poppins-light',
  },
  footerModal:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },

  //footer
  footer:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  continueBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    height: '60%',
    width: 125,
    paddingVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});