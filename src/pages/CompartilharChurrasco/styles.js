import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#fff'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'lightgrey',
    },

    backBtn: {
        paddingRight: 60,
    },

    titulo: {
        paddingRight: 70,
        fontSize: 25,
        fontWeight: 'bold',
    },

    conteudoContainer: {
        alignItems: 'center',
    },

    nomeChurras: {
        fontSize: 30,
        fontWeight: "bold",
        color: 'black',
        opacity: 0.7,
        paddingTop: 20,
        paddingBottom: 10,
    },
    churrasLocalContainer: {
        marginBottom: 9,
        flexDirection: 'row',
        alignItems: 'center',
    },
    churrasLocal: {
        color: 'lightgray',
        fontSize: 18,
    },
    localIcon: {
        color: 'lightgray',
        marginRight: 8,
    },
    churrasDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    churrasData: {
        color: 'lightgray',
        fontSize: 18,
    },
    dataIcon: {
        color: 'lightgray',
        marginRight: 8,
    },
    codigo: {
        fontWeight: "bold",
        paddingVertical: 20,
        opacity: 0.8,
        fontSize: 35,
    },

    qrCode:{
        height: 220,
        width: 220,
        marginBottom: 20,
    },

    shareBtn:{
        backgroundColor: 'lightgray',
        borderRadius: 5,
        padding: 7,
        paddingHorizontal: 25,
    },

    shareText:{
        fontSize: 30,
    },


});