import { StyleSheet, YellowBox, RecyclerViewBackedScrollViewComponent } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'brown',    
  },   
  textHeader10: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fb2',
    marginHorizontal: 10,
    marginTop: 50,
  },  
  textHeader01: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fb2',
    marginHorizontal: 10,
    marginBottom: 35,
  },
  textHeader2: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fb2',
    marginLeft: 15,
    marginVertical: 30,
  },
  textHeader3: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fb2',
    marginLeft: 15,
  },
  continueBtn:{
    position: 'absolute',
    right: 10,
    bottom: 35,
    flexDirection:'row-reverse',
    borderRadius:8,
    backgroundColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    alignContent: 'center',
  },
  textBtn:{
    marginRight: 10,
    color: 'yellow',
    fontSize: 30,
  },
  iconBtn:{
    color:"yellow",
  },
});