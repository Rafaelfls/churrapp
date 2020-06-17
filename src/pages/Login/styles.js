import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: "100%",
        width : "100%",
    },
    appName:{
        marginTop: "20%",
        alignSelf: "center",
        fontSize : 40,
        fontFamily: 'patua-one',
    },
    logo:{
        height   : "120%",
        width    : "130%",
        alignSelf: "center",
    },
    imageContainer:{
        height         : "10%",
        width          : "19%",
        alignSelf      : "center",
        marginTop      : 20,
    },
    title:{
        alignSelf: "center",
        marginTop: 70,
        fontSize : 25,
        fontFamily: 'patua-one',
    },
    subtitle:{
        alignSelf: "center",
        marginTop: 15,
        color    : "gray",
        fontFamily: 'patua-one',
    },
    allBtn:{
        marginTop     : 40,
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