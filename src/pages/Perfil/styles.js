import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Row, Right } from 'native-base';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  backgroundProfile:{
    backgroundColor: "maroon",
    marginBottom: 10,
    paddingBottom: 10,
  },

  editarContainer:{
    marginTop: Constants.statusBarHeight + 15,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  editIcon: {
    color: 'white',
  },
  editLine:{
    flexDirection: 'row',
    marginVertical: 7,
    alignItems:'center'
  },
  inputStandard:{
    position: 'absolute',
    right: 0,
    height: 40, 
    borderColor: 'gray', 
    fontFamily: 'poppins-regular',
    borderBottomWidth: 0.5,
    paddingHorizontal: 5,
    width:'40%'
  },
  modalText:{
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width:'100%',
  },
  modalView: {
    backgroundColor: "white",
    width:'100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  containerProfile: {
    alignItems: 'center',
  },

  profileImg:{
    height: 140,
    width: 140,
    borderRadius: 70,
    marginBottom: 10,
  },

  profileName:{
    fontFamily: 'poppins-medium',
    fontSize: 30,
    color: 'white',
  },

  profileLocal:{
    fontSize: 20,
    color: 'white',
    fontFamily: 'poppins-regular',
  },

  profileIdade:{
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'poppins-regular',
  },

  //Meus Churrascos
  containerMyChurras: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  containerOrg: {
    alignItems: 'center',
  },

  profileOrg:{
    fontSize: 17,
    color: 'black',
    fontFamily: 'poppins-regular',
  },

  profileOrgNumber:{
    fontSize: 23,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },

  linhaSeparaçãoHor:{
    height: "90%",
    width: 1,
    backgroundColor: 'gray',
  },

  containerPart: {
    alignItems: 'center',
  },

  profilePart:{
    fontSize: 17,
    color: 'black',
    fontFamily: 'poppins-regular',
  },

  profilePartNumber:{
    fontSize: 23,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },

  //Minhas Preferências
  containerGeral:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  containerEsq:{
    alignItems: 'flex-start',
  },

  containerDir:{
    alignItems: 'flex-end',
  },

  infos:{
    fontSize: 13,
    marginHorizontal: 5,
    fontFamily: 'poppins-regular',
  },

  containerInfos:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },

});