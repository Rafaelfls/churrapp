import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'



import style from './styles';

export default function OutrosChurras(){
    return(
        <ScrollableTabView style={style.container} tabBarPosition="top" tabBarActiveTextColor="#fb2" tabBarInactiveTextColor="#fb4"
          renderTabBar={() => <DefaultTabBar />}
          ref={(tabView) => { this.tabView = tabView; }}
        >
          <Text tabLabel='Churras Passados'>My</Text>
          <Text tabLabel='Próximos Churras'>favorite</Text>
        </ScrollableTabView>
    )
}