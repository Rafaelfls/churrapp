import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Row } from 'native-base';

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
    fontSize: 19,
    marginHorizontal: 5,
    fontFamily: 'poppins-regular',
  },

  containerInfos:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },

});