import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 15,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },

    header: {
        justifyContent: 'space-between',
        alignItems: "center",
        flexDirection: 'row',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    titulo:{
        fontSize: 28,
        color: 'black',
        fontFamily: 'poppins-semi-bold',
    },

    conteudo: {
        alignItems: 'center',
    },
    inserirText:{
        fontSize: 20,
        marginBottom: 20,
        fontFamily: 'poppins-medium',
    },
    inputStandard:{ 
        height: 40, 
        borderColor: 'gray', 
        borderBottomWidth: 1 ,
        paddingHorizontal: 20,
        fontSize: 20,
        alignContent: 'center',
    },

    //Buttons
    btnsContainer:{   
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderTopColor: 'lightgray',
        borderTopWidth: 1,
        backgroundColor: 'white',
      },

    enterBtn:{
        backgroundColor: 'maroon',
        borderRadius: 8,
        padding: 10,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },

    textBtn:{
        fontSize: 20,
        fontFamily: 'poppins-medium',
        color: 'white',
    },

    qrBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        textAlign:'center',
        justifyContent: 'center',        
    },

    qrIcon:{
        color: 'maroon',
    },

    backIcon:{
        color: 'black',
    },
});