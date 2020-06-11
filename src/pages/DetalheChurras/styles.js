import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#fff'
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
  churrasData: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#000'
  },
  detalheTitle: {
    fontSize: 40,
    marginBottom: 5,
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 30
  },
  churrasSubTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000'
  },
  detalheDescricao: {
    left: '10%',
    fontSize: 18
  },
  detalheBtn: {
    borderRadius: 8,
    borderWidth: 0,
    top: 380,
    marginHorizontal: 20,
    alignItems: 'center'
    
  }
    
});