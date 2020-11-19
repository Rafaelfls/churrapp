import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#800000'
  },

  header: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    backgroundColor: '#800000',
    zIndex:1,
  },

  backBtn: {
    color:"white",
  },
  
  backBtnTo: {
    position:"absolute",
    left:0,
    paddingHorizontal:25,
    top:Constants.statusBarHeight + 5,
  },

  cameraContainer: {
    marginHorizontal: 0, marginLeft: 0, marginStart: 0,
    paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
    marginTop:40,
    height: '109%',
    padding: 0,
    backgroundColor:'maroon'
},

  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color:"white",
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
    padding: 35,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'poppins-light',
  },
  modalTitle:{
    color:"#800000",
    fontSize:30,
    marginBottom:15,
    fontFamily: 'poppins-medium',
  },
  exitBtn: {
    flexDirection: 'row-reverse',
    position: "absolute",
    right: 10,
    top: 10,
    color:"white",
  },
  textHeaderBtn: {
    fontSize: 15,
    marginHorizontal: 7,
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
  textSalvarBtn:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  footer: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },

  //qrCode modal
  centeredViewQr: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalViewQr: {
    margin: 20,
    backgroundColor: "transparent",
    borderRadius: 8,
    padding: 100,
    marginTop:0,
    alignItems: "center",
    borderColor:'maroon',
    borderStyle:'dotted',
    borderWidth:2,  
  },

});