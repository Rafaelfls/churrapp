import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'white',
  },    
  body:{
    flex: 1,
  },
  headerGroup:{
    flexDirection:'row',
  },
  exitBtn:{
    flexDirection:'row-reverse',
    position:"absolute",
    right: 10,
    top: 10,
  },
  textHeaderBtn:{
    fontSize: 15,
    marginHorizontal: 7,
  },
  textHeader: {
    fontSize: 20,
    fontFamily: 'poppins-semi-bold',
    color: 'black',
    marginHorizontal: 20,
  },
})