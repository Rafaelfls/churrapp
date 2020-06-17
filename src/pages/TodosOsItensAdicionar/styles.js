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
    fontSize: 25,
    color: '#fb2',
    marginLeft: 15,
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 8,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20,
    },
    boxDropdown:{
      paddingHorizontal: 70,
      color: 'black',
    },
    selectionForm:{
      flexDirection: 'row',
      justifyContent:'center',
      alignItems:'center'
    },
    salvarBtn:{
      marginTop: 15,
      flexDirection:'row-reverse',
      backgroundColor: 'black',
      borderRadius: 8,
      padding:5,
    },
    iconSalvarBtn:{
      color:'gold',
      paddingHorizontal: 5,
    },
    textSalvarBtn:{
      color:'gold',
      paddingHorizontal: 5,
    }
})