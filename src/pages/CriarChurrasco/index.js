import React from 'react';
import {View, Text, TouchableOpacity, TextInput,} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';

import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'

import style from './styles';

export default function CriarChurrasco(){
    const [onChangeText] = React.useState('');

    return(
        <View style={style.container}> 
          <View style={style.header}>
            <Text style={style.textHeader}>Vamos começar?</Text>
            <Text style={style.textHeader}>1/4</Text>
          </View>
          <View style={style.formGroup}>
            <Text style={style.textLabel}>Nome do churrasco:</Text>
            <TextInput
              style={style.inputStandard}
              placeholder={'Churrasbom'}
              onChangeText={text => onChangeText(text)}
            />
            <Text style={style.textLabel}>Local do churrasco:</Text>
            <TextInput
              style={style.inputStandard}
              placeholder={"Alameda santos, 202"}
              onChangeText={text => onChangeText(text)}
            />
            <View style={style.datePicker}>
              <Text style={style.textLabel}>Data:</Text>
              <DatePicker/>
            </View>
            <View style={style.datePicker}>
              <Text style={style.textLabel}>Início:</Text>
              <TimePicker/>
            </View>
            <View style={style.datePicker}>
              <Text style={style.textLabel}>Término:</Text>
              <TimePicker/>
            </View>
          </View>

          <View style={style.footer}>
            <TouchableOpacity style = {style.continueBtn} >
              <Icon style={style.iconBtn} name  = "check" size = {20}/>
              <Text style={style.textBtn}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}