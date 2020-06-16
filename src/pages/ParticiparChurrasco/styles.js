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

    backBtn:{
        paddingRight: 30,
    },

    titulo:{
        paddingRight: 40,
        fontSize: 25,
        fontWeight: 'bold',
    },

    conteudo: {
        alignItems: 'center',
        paddingTop: 40,
    },

    inserirText:{
        fontSize: 22,
        marginBottom: 20,
    },

    inputStandard:{ 
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1 ,
        paddingHorizontal: 50,
        borderRadius:8,
        marginBottom: 10,
        fontSize: 20,
        marginBottom: 30,
        alignContent: 'center',
    },

    enterBtn:{
        backgroundColor: 'lightgray',
        borderRadius: 10,
        padding: 5,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    textBtn:{
        fontSize: 30,
    },

    ou:{
        marginVertical: 40,
        fontSize: 20,
    },

    qrBtn:{
        marginRight: 15,
    },


    
});