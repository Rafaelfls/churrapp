import { StyleSheet, YellowBox, RecyclerViewBackedScrollViewComponent } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'maroon',    
  },   
  textHeader10: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'poppins-medium',
    marginHorizontal: 15,
    marginTop: 50,
  },  
  textHeader2: {
    textAlign: 'center',
    fontSize: 18,
    color: 'lightgray',
    fontFamily: 'poppins-regular',
    marginHorizontal: 15,
    marginTop: 5,
  },
  textHeader3: {
    textAlign: 'center',
    fontSize: 20,
    color: 'lightgrey',
    fontFamily: 'poppins-regular',
    marginTop: 250,
  },
  continueBtn:{
    marginTop: 20,
    borderRadius:8,
    backgroundColor: 'black',
    paddingHorizontal: 80,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textBtn:{
    marginRight: 10,
    color: 'white',
    fontFamily: 'poppins-medium',
    fontSize: 20,
    textAlign: 'center',
  },
});