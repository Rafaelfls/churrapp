import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 15,
        backgroundColor: '#fff'
    },
    header: {
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    titulo: {
        alignItems: 'center'
    },
    textHeader: {
        fontSize: 30,
        color: 'black',
        fontFamily: 'poppins-semi-bold',
    },
    menuBtn: {
        position: "absolute",
        left: 0,
        top: 10,
    },
    modalViewNotf: {
        margin: 20,
        backgroundColor: "white",
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 25,
        paddingTop: 40,
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    centeredViewNotf: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        position: 'absolute',
        top: Constants.statusBarHeight - 44,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#80808080"
    },
    cardNotf: {
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#800000",
        marginBottom: 10
    },
    cardTextNotf: {
        fontFamily: 'poppins-medium',
        fontSize: 18,
        textAlign: 'justify',
    },
    cardFooterNotf: {
        height: 90,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
    },
    cardBtnNotf: {
        alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    backgroundColor: 'maroon',
    height: '60%',
    width: 125,
    paddingVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    },
    cardBtnNotf1: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'lightgray',
        height: '60%',
        width: 125,
        paddingVertical: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    cardBtnTextNotf: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'poppins-medium',
        textAlign: 'center',
    },
    cardBtnTextNotf1: {
        color: 'maroon',
    fontSize: 17,
    fontFamily: 'poppins-medium',
    textAlign: 'center',
    },
    closeNotf: {
        position: "absolute",
        top: 20,
        right: 20,
    },
})