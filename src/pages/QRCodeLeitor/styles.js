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
        paddingRight: 100,
    },

    titulo:{
        paddingRight: 110,
        fontSize: 25,
        fontWeight: 'bold',
    },
    
});