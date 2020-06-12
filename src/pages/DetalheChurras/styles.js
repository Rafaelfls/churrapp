import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  //header
  containerImg: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
  backgroundImg: {
    opacity: 0.3,
    resizeMode: 'contain',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'cover',
    position: 'relative',
    backgroundColor: 'transparent',
    width: '100%',
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    flex: 0.5,
    paddingTop: Constants.statusBarHeight + 15,
  },
  backBtn:{
    marginLeft: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingRight: 10,
  },
  detalheTitle: {
    fontSize: 30,
    marginBottom: 0,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 15,
    marginLeft: 20,
  },
  shareBtn: {
    marginRight: 15,
    alignSelf: 'flex-start',
    marginTop: 10,
    paddingLeft: 20,
  },

  //body
  infosPrincipais: {
    marginLeft: 20,
  },
  churrasLocalContainer: {
    marginBottom: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },
  churrasLocal: {
    color: 'gray',
    fontSize: 18,
  },
  localIcon: {
    color: 'gray',
    marginRight: 8,
  },
  churrasDataContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  churrasData: {
    color: 'gray',
    fontSize: 18,
  },
  dataIcon: {
    color: 'gray',
    marginRight: 8,
  },
  churrasDonoContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  churrasDono: {
    color: 'black',
    fontSize: 23,
  },
  donoIcon: {
    marginRight: 8,
  },

  //linha
  linhaDeSeparacao:{
    backgroundColor: 'gray',
    height: 0.5,
    width: "90%",
    alignSelf: 'center',
    marginVertical: 5,
    justifyContent: 'flex-start',
  },

  //convidados
  cabecalhoConvidados:{
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  containerTituloConvidados:{
    alignItems: 'flex-start',
  },
  tituloConvidados:{
    fontSize: 17,
    fontWeight: 'bold',
  },
  verTodos:{
    fontWeight: 'bold',
  },
  subtituloConvidados:{
    fontSize: 17,
    opacity: 0.7,
  },

  containerConvidados:{
  },
  convidado:{
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 8,
    height: 170,
  },
  profileImg:{
    height: 130,
    width: 100,
    marginBottom: 3,
  },
  nomeConvidado:{
    
  },


  detalheChurras: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
    marginHorizontal: 15,
  },


  churrasSubTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000'
  },
  detalheDescricao: {
    alignSelf: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
  },
  detalheBtnView: {
    position: 'absolute',
    alignSelf: 'center',
    top: '92%',
  }

});