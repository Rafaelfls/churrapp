import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },  
  body:{
    flex: 1,
  },
  headerGroup:{
    flexDirection:'row',
  },
  textHeader: {
    fontSize: 25,
    color: '#fb2',
    marginLeft: 15,
  },
  exitBtn:{
    flexDirection:'row-reverse',
    position:"absolute",
    right: 10,
    top: 20,
  },
  textHeaderBtn:{
    fontSize: 15,
    marginHorizontal: 7,
  },
  card:{
      margin: 20,
      backgroundColor: 'brown',
      paddingVertical: 100,
      borderRadius: 8,
  },
  textCard:{
    justifyContent: "center",
    alignSelf: 'center',
    color: 'gold',
    fontSize: 36,
  },
  iconTipo:{
    justifyContent: "center",
    alignSelf: 'center',
    color: 'gold',
    fontSize: 36,
  },
})