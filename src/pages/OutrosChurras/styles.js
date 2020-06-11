import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

  //header
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 5,
    backgroundColor: '#fff'
  },

  //cards
  churrasList: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "transparent"
  },
  churras: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    marginBottom: 16,
  },

  //cardContent
  churrasTitleView: {
    alignItems: 'center',
    marginBottom: 12,
  },
  churrasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  churrasDescricao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  churrasFoto: {
    width: 40,
    height: 40,
  },
  churrasInfosView: {
    marginLeft: 20,
  },
  churrasLocal: {
    fontSize: 18,
    marginBottom: 6,
  },
  churrasData: {
    color: 'gray',
    marginBottom: 2,
  },
  churrasDono: {
    color: 'gray',
  },
  verMaisView: {
    alignItems: 'flex-end',
  },
  verMais: {
    fontWeight: "bold",
  },

});