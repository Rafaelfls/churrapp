import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },

  headerGroup: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },

  //body
  listStyle: {
    marginTop: 15,
  },

  componentPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: '2%',
    backgroundColor: 'white'
  },

  textIcon:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconTipo: {
    alignSelf: 'center',
    color: 'maroon',
  },
  textLabel: {
    fontSize: 17,
    color: "maroon",
    fontFamily: 'poppins-semi-bold',
    marginLeft: 10
  },

  picker: {
    flexDirection: 'row',
    borderRadius: 6,
  },

  quantidadeInput: {
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    backgroundColor: 'white',
    width: 100,
  },
  

  //footer
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
  
  //modal
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 25,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    backgroundColor:'#80808080'
  },
  modalText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign:'center',
    fontFamily:'poppins-light'
  },
  modalTextSair:{
    fontSize:17,
    textAlign:'center'
  },
  modalTitleText:{
    color:'maroon',
    fontSize:20,
    fontFamily:'poppins-medium'
  },
  modalTitle:{
    color:"#800000",
    fontSize:30,
    marginBottom:15,
    fontWeight: "bold"
  },
  confirmarSairTitle:{
    color:"#800000",
    fontSize:20,
    marginBottom:8,
    textAlign:"center"
  },
  confirmarSairSubTitle:{
    fontSize:12,
    textAlign:'center',
    color: "grey"
  },
  sairBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    height: '60%',
    width: 125,
    paddingVertical: 5,
    marginHorizontal: 10
  },
  textBtn:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
  footerModal: {    
    height: 50,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  exitBtnModal: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  salvarBtnModal: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    marginHorizontal:5,
    backgroundColor: 'maroon',
    height: '60%',
    width: '40%',
    paddingVertical: 5,
  },
  iconSalvarBtnModal: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },

  //modal sair
  modalTitle:{
    color:"#800000",
    fontSize:30,
    marginBottom:15,
    fontWeight: "bold"
  },
  modalTextSair:{
    fontSize:17,
    textAlign:'center',
    fontFamily:'poppins-light'
  },
  confirmarSairSubTitle:{
    fontSize:12,
    textAlign:'center',
    color: "grey"
  },
  footerModalSair:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: 'white',
  },
  sairBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    height: '60%',
    width: 125,
    paddingVertical: 5,
    marginHorizontal: 10
  },
  textBtn:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },

})