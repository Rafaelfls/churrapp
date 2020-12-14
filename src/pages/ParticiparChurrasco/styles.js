import { StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },

    header: {
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    titulo:{
        fontSize: 28,
        color: 'black',
        fontFamily: 'poppins-semi-bold',
    },

    conteudo: {
        alignItems: 'center',
    },
    inserirText:{
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'poppins-medium',
    },
    inputStandard:{ 
        height: 40, 
        borderColor: 'gray', 
        borderBottomWidth: 1 ,
        paddingHorizontal: 20,
        fontSize: 20,
        alignContent: 'center',
    },

    //Buttons
    btnsContainer:{   
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        backgroundColor: '#f5f5f5',
      },

    enterBtn:{
        backgroundColor: 'maroon',
        borderRadius: 8,
        padding: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    
        elevation: 6,
    },

    textBtn:{
        fontSize: 20,
        fontFamily: 'poppins-medium',
        color: 'white',
    },

    qrBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign:'center',
        justifyContent: 'center',        
    },

    qrIcon:{
        color: 'maroon',
    },

    backIcon:{
        color: 'black',
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
    fontSize:20,
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
  continueBtnModal:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    height: '60%',
    width: '85%',
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },   
  textBtnModal:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  cleanInput: {
    position: 'absolute',
    right: 50,
    top: 60,
    backgroundColor: 'maroon',
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  mudarSenha: {
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  footerModal2: {  
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  exitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'lightgray',
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
  iconExitBtn: {
    color: 'maroon',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  salvarBtn: {
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
  //fim modal
});