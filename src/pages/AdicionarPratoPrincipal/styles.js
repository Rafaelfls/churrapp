import { StyleSheet, YellowBox } from 'react-native';
import Constants from 'expo-constants';
import { ceil } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 15,
    backgroundColor: 'white',
  },
  body: {
    flex: 1,
  },

  headerGroup: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  textHeader: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'poppins-semi-bold',
  },

  //body
  listStyle: {
    marginTop: 15,
  },

  componentPicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginHorizontal: '5%',
    marginVertical: 10,
    borderRadius: 8,
    paddingHorizontal: '2%',
    backgroundColor: 'white'
  },

  textIcon:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  iconTipo: {
    alignSelf: 'center',
    color: 'maroon',
  },
  textLabel: {
    fontSize: 16,
    color: "maroon",
    fontFamily: 'poppins-semi-bold',
    marginLeft: 10
  },

  picker: {
    flexDirection: 'row',
    borderRadius: 6,
  },

  quantidadeInput: {
    paddingHorizontal: 20,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRadius: 0,
    backgroundColor: 'white',
    width: 100,
  },
  

  //footer
  footer:{    
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  continueBtn:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    height: '60%',
    width: '85%',
    paddingVertical: 5,
  },
  textBtn:{
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },
})