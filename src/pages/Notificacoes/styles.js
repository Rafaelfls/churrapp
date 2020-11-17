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
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#800000",
    },
    cardTextNotf: {
        fontFamily: 'poppins-medium',
        fontSize: 18,
    },
    cardFooterNotf: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-end",
    },
    cardBtnNotf: {
        backgroundColor: '#800000',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginLeft: 5,
    },
    cardBtnNotf1: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 3,
        marginLeft: 5,
    },
    cardBtnTextNotf: {
        fontFamily: 'poppins-medium',
        color: "white",
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    cardBtnTextNotf1: {
        fontFamily: 'poppins-medium',
        color: "gray",
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    closeNotf: {
        position: "absolute",
        top: 20,
        right: 20,
    },
})