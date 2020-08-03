import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
     //header
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#fff'
  },  

  //header
  header: {
    justifyContent: 'space-between',
    alignItems: "flex-start",
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  textHeader: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },
  
  exitBtn:{
    position:"absolute",
    left: 3,
    top: 5,
  },
  title:{
      alignSelf: "center",
      textAlign:'center',
      marginTop:45,
      fontSize : 25,
      fontFamily: 'poppins-semi-bold',
      opacity: 0.8,
      color: 'maroon',
  },
  subtitle:{
      alignSelf: "center",
      color    : "gray",
      fontFamily: 'poppins-medium',
  },  
  continueBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    width: '100%',
    height:40,
    paddingVertical: 5,
  },
  textBtn:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  inputArea:{
      marginHorizontal: 60,
      marginTop: 50,
  },
  cadastreSe:{
      marginHorizontal:60,
      flexDirection:"row",
      marginTop:10,
  },
  cadastreSeBtn:{
      marginLeft: 5,
      color:"maroon",
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      textDecorationColor: "maroon"
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
    fontSize:17,
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
  },
  modalText:{
    fontSize:17,
    textAlign:'center'
  },
  footerModal:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
});