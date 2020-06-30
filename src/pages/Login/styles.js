import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: "100%",
        width : "100%",
        backgroundColor: 'white',
    },
    appName:{
        marginTop: "15%",
        alignSelf: "center",
        fontSize : 80,
        fontFamily: 'titulo-logo',
        color: 'maroon',
    },
    logo:{
        height   : "190%",
        width    : "480%",
        alignSelf: "center",
    },
    imageContainer:{
        height         : "10%",
        width          : "19%",
        alignSelf      : "center",
    },
    title:{
        alignSelf: "center",
        marginTop: 70,
        fontSize : 22,
        fontFamily: 'poppins-semi-bold',
        marginTop: '25%',
        opacity: 0.8,
        color: 'maroon',
    },
    subtitle:{
        alignSelf: "center",
        color    : "gray",
        fontFamily: 'poppins-medium',
    },
    allBtn:{
        marginTop     : '5%',
        justifyContent: "space-evenly",
    },
    fbBtn:{
        padding: 6,
        backgroundColor: "#3B5998",
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    loginBtn:{
        marginHorizontal: 70,
        width: 150,
        alignSelf: "center",
        
    },
    googleBtn:{
        padding: 6, 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        marginBottom: 10, 
        flexDirection: 'row'
    },
    celularBtn:{
        padding: 6, 
        backgroundColor: '#a3a29b', 
        borderRadius: 10, 
        flexDirection: 'row',
    },
    textBtnGoogle: {
        fontSize: 20,
        color: 'lightgray',
        fontWeight: 'bold',
        paddingHorizontal: 10

    },
    textBtn: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
});