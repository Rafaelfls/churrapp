import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },  
  header: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:"lightgray",
  },
  textHeader: {
    fontSize: 25,
    color: '#fb2',
  },
    
});