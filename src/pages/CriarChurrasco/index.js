import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'



import style from './styles';

export default function CriarChurrasco(){
    return(
        <View style={style.container}> 
          <View style={style.header}>
            <Text style={style.textHeader}>Vamos começar?</Text>
            <Text style={style.textHeader}>1/4</Text>
        </View>
        </View>
    )
}