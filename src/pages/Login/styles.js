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
    loginBtn:{
        marginHorizontal: 90,
        marginTop:40,
        width: 200,
        alignSelf: "center",
        
    },
    entrarBtn:{
        padding: 10, 
        backgroundColor: '#800000', 
        marginBottom:25,
        borderRadius: 10, 
        flexDirection: 'row',
        justifyContent:'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    
        elevation: 6,
    },
    textBtn: {
        textAlign:'center',
        fontSize: 20,
        color: 'white',
        fontFamily: 'poppins-medium',
    },
});