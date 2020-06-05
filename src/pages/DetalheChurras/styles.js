import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: '#fff'
  },  
  header: {
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: 'column',
    
  },
  subHeader:{
    fontWeight: 'bold',
    fontSize: 15
  },
  textHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginHorizontal: 70
  },
  fabBtn: {
      fontSize: 20,
      height: 22,
      color: '#fff308'
    },
  churrasList: {
    margin: 24,
  },
  churras: {
    backgroundColor: '#fff308',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
  },
  logoutBtn:{
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
  churrasSubTitle: {
    fontSize: 18,
    marginBottom: 5,
    color: '#000'
  },
  detailBtn: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 14,
    
  },
  detailBtnText: {
    color: "#fff",
    
  }
    
});