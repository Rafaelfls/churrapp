import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },  
  header: {
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fb2'
  },
  fabBtn: {
      fontSize: 20,
      height: 22,
      color: '#fff308'
    },
  churrasList: {
    margin: 24
  },
  churras: {
    backgroundColor: '#fff308',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16
  },
  logoutBtn:{
  },
    
});