import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
  },  
  header: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:"lightgray",
    marginLeft:10,
    paddingBottom: 10,
  },
  textHeader: {
    fontSize: 25,
    color: '#fb2',
    marginLeft: 15,
  },
  fabBtn: {
      fontSize: 20,
      height: 22,
      color: '#fff308'
    },
  stepHeader:{
    position:'absolute',
    right: 20,
    top:0,
  },   
  footer:{    
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: 'center',
    backgroundColor: 'brown',
  },
  textFooter:{
    position: 'absolute',
    bottom: 40,
    fontSize: 20,
    color: 'yellow',
    marginLeft: 15
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
},
textBtn:{
  marginRight: 10,
  color: 'yellow',
},
iconBtn:{
  color:"yellow",
},
listStyle:{
  height: 1000
},
actionBtn:{

},
})