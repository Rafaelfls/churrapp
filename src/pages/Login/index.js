import React from 'react';
import {View, Image, Text, Button, Alert} from 'react-native';

import style from './styles';

import logo from '../../assets/logo.jpg'

export default function Calculadora(){
    return(
        <View style={style.container}>
            <Text style={style.appName}>Churrapp</Text>
            <View style={style.imageContainer}>
                <Image style={style.logo} source={logo}/>
            </View>
            <Text style={style.title}>Bora armar um churras?</Text>
            <Text style={style.subtitle}>Como você prefere se conectar?</Text>
            <View style={style.allBtn}>
                <View style={style.fbBtn}>
                    <Button title="Login with Facebook" onPress={() => Alert.alert('Facebook button')}/>
                </View>
                <Button color="#DD4B39" title="Login with Google" style={style.loginBtn} onPress={() => Alert.alert('Google button')}/>
                <Button color="gray" title="Celular" style={style.loginBtn} onPress={() => Alert.alert('Celular button')}/>
            </View>
        </View>
    );
}