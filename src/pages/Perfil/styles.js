import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Row } from 'native-base';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  containerProfile: {
    marginTop: Constants.statusBarHeight + 70,
    alignItems: 'center',
  },

  profileImg:{
    height: 160,
    width: 160,
    borderRadius: 80,
    marginBottom: 10,
  },

  profileName:{
    fontWeight: "bold",
    fontSize: 30,
  },

  profileLocal:{
    fontSize: 20,
    color: 'darkgrey',
  },

  profileIdade:{
    fontSize: 20,
    color: 'darkgrey',
  },

  profileOrg:{
    fontSize: 20,
    color: 'black',
    marginTop: 15,
    fontWeight: 'bold',
  },

  profilePart:{
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  containerGeral:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 5,
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
  },

  containerInfos:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },

  editarContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 15,
  },

  editar:{
    fontWeight: 'bold',
    fontSize: 18,
  },

});