import React from 'react';
import {View, Text, TouchableOpacity, TextInput,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import style from './styles';

export default function AdicionaConvidados(){
    return(
        <View style={style.container}> 
          <View style={style.header}>
            <Text style={style.textHeader}>Convide seus amigos!</Text>
            <View style={style.stepHeader}>
              <Text style={style.textHeader}>2/4</Text>
            </View>
          </View>
          
          <View style={style.footer}>
            <TouchableOpacity style = {style.continueBtn}>
              <Icon style={style.iconBtn} name  = "check" size = {20}/>
              <Text style={style.textBtn}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}