import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import { ScrollableTabView, DefaultTabBar, ScrollableTabBar, } from '@valdio/react-native-scrollable-tabview'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/FontAwesome5';



import style from './styles';

export default function OutrosChurras(){
    const [churrasPassado, setChurrasPassados] = useState([]);
    const [churrasFuturo, setChurrasFuturo] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const[loading, setLoading] = useState(false);
    const[dataPassado, setDataPassado] = useState('22/07/2020');
    const[dataFuturo, setDataFuturo] = useState('2020-06-20');

    const navigation = useNavigation();

    async function loadChurrasPassados() {
        if(loading) {
            return;
        }

        if(total > 0 && churras.length === total) {
            return;
        }
        
        setLoading(true);

        const response = await api.get(`churraspassados?data=${dataPassado}`, {
            params: { page }
        });
        
        setChurrasPassados([...churrasPassado, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    async function loadChurrasFuturos() {
        if(loading) {
            return;
        }

        if(total > 0 && churras.length === total) {
            return;
        }
        
        setLoading(true);

        const response = await api.get(`churrasfuturo?data=${dataFuturo}`, {
            params: { page }
        });
        
        setChurrasFuturo([...churrasFuturo, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadChurrasPassados();
        loadChurrasFuturos();
    }, []);

    function detalheChurras(churras) {
        navigation.push('DetalheChurras', { churras });
    }

    

    return(
        <ScrollableTabView style={style.container} tabBarPosition="top" tabBarActiveTextColor="#A52A2A" tabBarInactiveTextColor="#fb4" tabBarTextStyle={{fontWeight: 'bold'}} 
          tabBarBackgroundColor='#000'
          renderTabBar={() => <DefaultTabBar />}
          ref={(tabView) => { this.tabView = tabView; }}
          initialPage={1}
        >
          <FlatList
              tabLabel='Churras Passados'
              data={churrasPassado}
              style={style.churrasList}
              showsVerticalScrollIndicator={false}
              keyExtractor={churras => String(churras.id)}
              onEndReached={loadChurrasPassados}
              onEndReachedThreshold={0.2}
              renderItem={({item: churras}) => (

                  <TouchableOpacity onPress={() => detalheChurras(churras)}>
                    <View style={style.churrasPassado}>
                        <Text style={style.churrasTitle}>Churras ja foi em: <Text style={style.churrasData}>{churras.data}</Text></Text>
                        <Text style={style.churrasData}>Organizado por {churras.nome}</Text>
                        <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
                        <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
                        <Text style={style.churrasData}>Local: {churras.local}</Text>
                        
                        <Icon style={style.cardBtn} size={25} name="angle-right"/>
                        

                    </View>
                  </TouchableOpacity>
              )}
          />
          <FlatList
              tabLabel='Próximos Churras'
              data={churrasFuturo}
              style={style.churrasList}
              showsVerticalScrollIndicator={false}
              keyExtractor={churras => String(churras.id)}
              onEndReached={loadChurrasFuturos}
              onEndReachedThreshold={0.2}
              renderItem={({item: churras}) => (
                  
                
                  <TouchableOpacity onPress={() => detalheChurras(churras)}>
                    <View style={style.churrasFuturo}>
                        <Text style={style.churrasTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
                        <Text style={style.churrasData}>Organizado por {churras.nome}</Text>
                        <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
                        <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
                        <Text style={style.churrasData}>Local: {churras.local}</Text>

                        <Icon style={style.cardBtn} size={25} name="angle-right"/>

                        
                    </View>
                  </TouchableOpacity>
                
              )}
          />
        </ScrollableTabView>
    )
}