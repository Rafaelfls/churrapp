import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    header: {
        flexDirection: 'row',
        paddingTop: Constants.statusBarHeight + 20,
        paddingBottom: '5%',
        backgroundColor: 'maroon',
        justifyContent: 'center',
    },
    backBtn: {
        position: "absolute",
        top: Constants.statusBarHeight + 20,
        left: 0,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "white",
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    churrasLocal: {
        color: 'gray',
        fontSize: 18,
    },
    localIcon: {
        color: 'gray',
        marginRight: 8,
    },
    copyIcon:{
        color: 'gray',
    },
    codigoTO:{
        flexDirection:'row',
        alignItems:'flex-start'
    },  
    churrasDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    churrasData: {
        color: 'gray',
        fontSize: 18,
    },
    dataIcon: {
        color: 'gray',
        marginRight: 8,
    },
    codigo: {
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
        opacity: 0.8,
        fontSize: 30,
    },
    //Rodapé
    footer: {
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height: 90,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        backgroundColor: 'white',
    },
    shareBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: 'maroon',
        height: '60%',
        width: '85%',
        paddingVertical: 5,
    },
    shareText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'poppins-medium',
        textAlign: 'center',
    },
});