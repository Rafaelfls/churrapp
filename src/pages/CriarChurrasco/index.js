import React from 'react';
import {View, Text, TouchableOpacity, TextInput, ScrollView, SafeAreaView ,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

import DatePicker from '../../components/DatePicker'
import TimePicker from '../../components/TimePicker'
import ImagePicker from '../../components/ImagePicker'

import style from './styles';

export default function CriarChurrasco(){
    const [onChangeText] = React.useState('');
    
    const navigation = useNavigation();

    function next() {
        navigation.replace('AdicionaConvidados');
      }

    return(
        <View style={style.container}> 
          <View style={style.header}>
            <Text style={style.textHeader}>Vamos começar?</Text>
            <View style={style.stepHeader}>
              <Text style={style.textHeader}>1/4</Text>
            </View>
          </View>
          <SafeAreaView>
            <ScrollView style={style.scrollView}>
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
                <Text style={style.textLabel}>Descrição:</Text>
                <TextInput
                  style={style.inputStandard}
                  multiline={true}
                  numberOfLines={3}
                  placeholder={"O melhor churras do ano"}
                  onChangeText={text => onChangeText(text)}
                />
                <View style={style.datePicker}>
                  <ImagePicker/>
                </View>
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
            </ScrollView>
          </SafeAreaView>

          <View style={style.footer}>
            <TouchableOpacity style = {style.continueBtn} onPress={next}>
              <Icon style={style.iconBtn} name  = "check" size = {20}/>
              <Text style={style.textBtn}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
    )
}