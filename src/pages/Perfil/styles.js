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
    position:'absolute',
    top:Constants.statusBarHeight +15,
    left:10
  },
  editLine:{
    flexDirection: 'row',
    marginBottom: 30,
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
    width:'45%'
  },
  modalText:{
    width:'50%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: 0,
    width:'100%',
    height:'40%',
  },
  modalView: {
    backgroundColor: "#f2f2f2" ,
    width:'100%',
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
    borderTopColor:"#d3d3d3",
    borderTopWidth:1,
  },

  containerProfile: {
    alignItems: 'center',
    marginTop: Constants.statusBarHeight +15,
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
  footerModal:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  exitBtn:{
    flexDirection:'row-reverse',
    backgroundColor:'#800000',
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:8,
    alignItems:'center',
  },
  salvarBtn:{
    flexDirection:'row-reverse',
    backgroundColor:'#800000',
    paddingHorizontal:10,
    paddingVertical:2,
    borderRadius:8,
    alignItems:'center',
  },
  iconSalvarBtn:{
    marginLeft:5,
    color:'white'
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
    width: '48%',
    alignItems: 'flex-start',
  },

  containerDir:{
    width:'48%',
    alignItems: 'flex-end',
  },

  infosLeft:{
    fontSize: 13,
    textAlign:'left',
    marginHorizontal: 5,
    fontFamily: 'poppins-regular',
  },

  infosRight:{
    fontSize: 13,
    textAlign:'right',
    marginHorizontal: 5,
    fontFamily: 'poppins-regular',
  },

  containerInfos:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },

});