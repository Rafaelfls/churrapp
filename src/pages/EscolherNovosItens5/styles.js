import { StyleSheet, YellowBox, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 15,
    backgroundColor: '#fff'
  },
  body: {
    flex: 1,
  },
  headerGroup: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: "center",
  },
  textHeader: {
    fontSize: 18,
    color: 'black',
    marginLeft:10,
    fontFamily: 'poppins-semi-bold',
  },
  modalTitle: {
    color: "#800000",
    fontSize: 30,
    marginBottom: 15,
    fontFamily: 'poppins-medium',
  },
  exitBtn: {
    flexDirection: 'row-reverse',
  },
  textHeaderBtn: {
    fontSize: 15,
    marginHorizontal: 7,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  textCard: {
    justifyContent: "center",
    alignSelf: 'center',
    color: 'white',
    fontSize: 36,
  },
  tiposDeItenscard: {
    marginVertical: 5,
    marginHorizontal: 7,
    backgroundColor: 'maroon',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  tiposDeItenstextCard: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
    justifyContent: "center",
    alignSelf: 'center',
  },
  iconTipo: {
    justifyContent: "center",
    alignSelf: 'center',
    color: 'gold',
    fontSize: 36,
  },  
  footerModal: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '100%',
  },
  modalView: {
    backgroundColor: "#f2f2f2",
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopColor: "#d3d3d3",
    borderTopWidth: 1,
  },
  iconSalvarBtn: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },  
  iconExitBtn: {
    color: 'maroon',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  exitBtnFooter: {
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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 20,
    fontFamily: 'poppins-light',
  },
  modalTextLabel:{
    textAlign: "left",
    fontSize: 17,
    marginRight:15,
    color:'#800000',
    fontFamily: 'poppins-light',
    maxWidth:'45%',
    width:'45%'
  },
  boxDropdown: {
    position:'absolute',
    right:0,
    paddingHorizontal: 101,
    color: 'black',
  },
  selectionForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:15,
  },
  textSalvarBtn: {
    color: 'gold',
    paddingHorizontal: 5,
  },
  listaConvidados:{
    marginTop: 10,
  },
  filtroL:{
    marginBottom:10,
  },

  //card itens

  churrasFoto: {
    width: 66,
    height: 66,
    borderRadius: 33,
  },
  churrasInfosView: {
    marginLeft: 10,
  },
  churrasTitle: {
    fontSize: 15,
    fontFamily: 'poppins-semi-bold',
  },
  churrasDono: {
    color: 'gray',
    fontFamily: 'poppins-medium',
  },
  churrasLocDat: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  localIcon: {
    color: 'steelblue',
    paddingBottom: 5,
  },
  churrasLocal: {
    fontSize: 13,
    color: 'steelblue',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '40%',
  },
  locDatSeparator: {
    fontSize: 13,
    color: 'gray',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
  },
  dataIcon: {
    paddingBottom: 5,
    color: 'orangered',
  },
  churrasData: {
    fontSize: 13,
    color: 'orangered',
    marginBottom: 2,
    fontFamily: 'poppins-medium',
    width: '45%',
  },
})