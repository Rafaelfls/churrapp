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
    flexDirection: 'row',
    
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
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "transparent"
  },
  churras: {
    backgroundColor: '#fff308',
    borderRadius: 8,
    padding: 24,
    marginBottom: 16,
  },
  signOutBtn:{
    position: 'absolute',
    top: 15,
    right: 20,
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
  }
    
});