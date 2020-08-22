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
  salvarBtn: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
  },
  iconSalvarBtn: {
    color: 'white',
    paddingHorizontal: 5,
  },
  textSalvarBtn: {
    color: 'white',
    paddingHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
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