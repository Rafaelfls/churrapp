import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'



import style from './styles';

const churras= [
  {
      id: 1,
      data: "10/06/2020",
      nome: "Matheus Torres",
      local: "Alphaville",
      hrInicio: "16:00h",
      hrFim: "21:00h",
      numConvidados: "19"
  },
  {
      id: 2,
      data: "05/09/2020",
      nome: "Rafael França",
      local: "St. Antonio de Jesus",
      hrInicio: "12:00h",
      hrFim: "17:30h",
      numConvidados: "6"
  },
  {
      id: 3,
      data: "25/06/2020",
      nome: "João Chioda",
      local: "Jaboticabal",
      hrInicio: "11:00h",
      hrFim: "21:00h",
      numConvidados: "4"
  },
  {
      id: 4,
      data: "01/07/2020",
      nome: "Marcus Brocaneli",
      local: "Sumaré",
      hrInicio: "18:00h",
      hrFim: "01:00h",
      numConvidados: "8"
  },
  {
      id: 5,
      data: "10/06/2020",
      nome: "Tacio Barreto",
      local: "Fora do Brasil",
      hrInicio: "09:00h",
      hrFim: "23:59h",
      numConvidados: "89"
  },
]

export default function OutrosChurras(){
    return(
        <ScrollableTabView style={style.container} tabBarPosition="top" tabBarActiveTextColor="#fb2" tabBarInactiveTextColor="#fb4"
          renderTabBar={() => <DefaultTabBar />}
          ref={(tabView) => { this.tabView = tabView; }}
        >
          <FlatList
              tabLabel='Churras Passados'
              data={churras}
              style={style.churrasList}
              showsVerticalScrollIndicator={false}
              keyExtractor={churras => String(churras)}
              renderItem={({item: churras}) => (


                  <View style={style.churras}>
                      <Text style={style.churrasTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
                      <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
                      <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
                      <Text style={style.churrasData}>Local: {churras.local}</Text>

                  </View>

              )}
          />
          <FlatList
              tabLabel='Próximos Churras'
              data={churras}
              style={style.churrasList}
              showsVerticalScrollIndicator={false}
              keyExtractor={churras => String(churras)}
              renderItem={({item: churras}) => (
                  
                
                  <View style={style.churras}>
                      <Text style={style.churrasTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
                      <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
                      <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
                      <Text style={style.churrasData}>Local: {churras.local}</Text>

                  </View>
                
              )}
          />
        </ScrollableTabView>
    )
}