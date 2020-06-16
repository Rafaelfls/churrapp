import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

  scroll:{
    flex: 1,
  },

  //header
  containerImg: {
    flex: 0.18,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backgroundImg: {
    opacity: 0.3,
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
    marginLeft: 15,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent:  'space-between',
    alignItems: 'center',
    marginRight: 15,
    marginTop: 10,
  },
  infosLocDat: {
    marginLeft: 5,
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
    marginBottom: 0,
    alignItems: 'center',
    borderColor: 'darkgrey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 3,
  },
  churrasDono: {
    color: 'black',
    fontSize: 15,
    opacity: 0.7,
  },
  donoImg: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },

  //linha
  linhaDeSeparacao:{
    backgroundColor: 'lightgray',
    height: 1,
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
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 8,
    height: 150,
  },
  profileImg:{
    height: 110,
    width: 100,
    marginBottom: 3,
    borderRadius: 2,
  },
  nomeConvidado:{
  },

  //Itens
  cabecalhoItens:{
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  containerTituloItens:{
    alignItems: 'flex-start',
  },
  tituloItens:{
    fontSize: 17,
    fontWeight: 'bold',
  },
  verTodos:{
    fontWeight: 'bold',
  },
  subtituloItens:{
    fontSize: 17,
    opacity: 0.7,
  },
  containerItens:{
  },
  item:{
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    padding: 8,
    height: 170,
  },
  itemImg:{
    height: 110,
    width: 100,
    marginBottom: 3,
    borderRadius: 2,
  },
  nomeItem:{
    marginBottom: 3,
  },
  qtdItem:{
    color: 'gray',
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