import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#fff'
  },
  churrasList: {
    margin: 24,
  },
  churrasPassado: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    borderWidth: 2,
    padding: 14,
    marginBottom: 16,
  },
  churrasFuturo: {
    backgroundColor: '#A0522D',
    borderRadius: 8,
    borderWidth: 2,
    padding: 14,
    marginBottom: 16,
  },
  churrasData: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000'
  },
  churrasTitle: {
    fontSize: 20,
    marginBottom: 5,
    color: '#000'
  },
  cardBtn: {
    position: 'absolute',
    top: 137,
    left: '82%'
  }, 
    
});