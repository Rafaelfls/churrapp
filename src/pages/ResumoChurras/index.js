import React, {useState, useEffect} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';

import logoImg from '../../assets/logo.jpg';

import style from './styles';


export default function ResumoChurras(){
    const [churras, setChurras] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const[loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function logout() {
        navigation.replace('Login');
      }
      
    function criarChurras() {
        navigation.replace('CriarChurrasco');
     }
     
     function detalheChurras(churras) {
         navigation.navigate('DetalheChurras', { churras });
     }
    

    async function loadChurras() {
        if(loading) {
            return;
        }

        if(total > 0 && churras.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('churras', {
            params: { page }
        });

        setChurras([...churras, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadChurras();
    }, []);

    return(

        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.textHeader}>Churrapp</Text>

                <Text style={ style.subHeader }>Você tem {total} churras criados</Text>
            </View>

            <View style={{ alignItems: 'flex-end', justifyContent: 'center', marginHorizontal: 20 }}>
                <TouchableOpacity   onPress={logout}>
                    <Icon    name  = "sign-out-alt" size = {25}/>

                </TouchableOpacity>
            </View>

            <FlatList
                data={churras}
                style={style.churrasList}
                showsVerticalScrollIndicator={false}
                keyExtractor={churras => String(churras.id)}
                onEndReached={loadChurras}
                onEndReachedThreshold={0.2}
                renderItem={({ item: churras }) => (
                    <View style={style.churras}>
                        <Text style={style.churrasTitle}>Data do Churras: <Text style={style.churrasData}>{churras.data}</Text></Text>
                        <Text style={style.churrasData}>Horário de início: {churras.hrInicio}</Text>
                        <Text style={style.churrasData}>Horário de término: {churras.hrFim}</Text>
                        <Text style={style.churrasData}>Número de convidados: {churras.convidados} </Text>
                        <Text style={style.churrasData}>Local: {churras.local}</Text>

                        <View style={style.detailBtn}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between'}}onPress={() => detalheChurras(churras)}>
                                <Text style={style.detailBtnText}>Detalhes</Text>
                                <Icon name="newspaper" color="#fff" size={23}/>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            />
            
            <ActionButton>
                <ActionButton.Item  title="Criar Churras" onPress={criarChurras}>
                    <Icon name="plus" style={style.fabBtn}/>
                </ActionButton.Item>
                <ActionButton.Item  title="Participar do Churras" onPress={() => {}}>
                    <Icon name="users" style={style.fabBtn}/>
                </ActionButton.Item>
            </ActionButton>
            
        </View>

    )
}