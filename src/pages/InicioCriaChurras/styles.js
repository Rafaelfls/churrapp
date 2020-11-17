import { StyleSheet, YellowBox, RecyclerViewBackedScrollViewComponent } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'maroon',    
  },
  
  textContainer:{
    paddingTop: '15%',
  },
  textHeader10: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'poppins-medium',
    marginHorizontal: '10%',
  },  
  textHeader2: {
    textAlign: 'center',
    fontSize: 18,
    color: 'lightgray',
    fontFamily: 'poppins-regular',
    marginHorizontal: '10%',
    marginTop: '2%',
  },

  btnContainer:{
    paddingBottom: '15%',
  },
  textHeader3: {
    textAlign: 'center',
    fontSize: 20,
    color: 'lightgrey',
    fontFamily: 'poppins-regular',
    marginBottom: '5%',
  },
  continueBtn:{
    borderRadius:8,
    backgroundColor: 'black',
    paddingHorizontal: 90,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  textBtn:{
    color: 'white',
    fontFamily: 'poppins-medium',
    fontSize: 20,
    textAlign: 'center',
  },
});