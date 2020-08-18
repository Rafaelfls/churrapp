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

  textIcon: {
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
  footer: {
    height: 90,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center",
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    backgroundColor: 'white',
  },
  continueBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: 'maroon',
    height: '60%',
    width: '85%',
    paddingVertical: 5,
  },
  textBtn: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
  },

  //modal
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 25,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    bottom: "35%",
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15
  },
  footerModal: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  exitBtnModal: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  salvarBtnModal: {
    flexDirection: 'row-reverse',
    backgroundColor: '#800000',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  iconSalvarBtnModal: {
    marginLeft: 5,
    color: 'white'
  },

})