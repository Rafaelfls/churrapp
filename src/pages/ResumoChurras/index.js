import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from '../../services/api';

import churrasPhoto from '../../assets/fundoDescricao.jpg';

import style from './styles';

export default function ResumoChurras() {
    const [churras, setChurras] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [usuario_id, setUsuarioId] = useState('0516f9fb26e6be70');

    const navigation = useNavigation();

    function logout() {
        navigation.replace('Login');
    }

    function inicioCriarChurras() {
        navigation.replace('InicioCriaChurras');
    }

    function ParticiparChurras() {
        navigation.replace('ParticiparChurrasco');
    }

    function detalheChurras(churras) {
        navigation.navigate('DetalheChurras', { churras });
    }


    async function loadChurras() {
        if (loading) {
            return;
        }

        if (total > 0 && churras.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get(`/churras/${usuario_id}`, {
            params: { usuario_id, page }
        });

        setChurras([...churras, ...response.data]);
        setTotal(response.headers['total-meu']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadChurras();
    }, []);

    return (

        <View style={style.container}>

            <View style={style.header}>
                <Text style={style.textHeader}>Churrapp</Text>
                <Text style={style.textSubHeader}>Você tem {total} churras criados</Text>
                <View style={style.signOutBtn}>
                    <TouchableOpacity onPress={logout}>
                        <Icon name="sign-out-alt" size={25} />
                    </TouchableOpacity>
                </View>
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
                        <View style={style.churrasTitleView}>
                            <Text style={style.churrasTitle}>{churras.nomeChurras}</Text>
                        </View>
                        <View style={style.churrasDescricao}>
                            <Image source={churrasPhoto} style={style.churrasFoto} />
                            <View style={style.churrasInfosView}>
                                <Text style={style.churrasLocal}>{churras.local}</Text>
                                <Text style={style.churrasData}>{churras.data} - {churras.hrFim} às {churras.hrFim}</Text>
                                <Text style={style.churrasDono}>{churras.nome} </Text>
                            </View>
                        </View>
                        <View style={style.verMaisView}>
                            <TouchableOpacity onPress={() => detalheChurras(churras)}>
                                <Text style={style.verMais} >ver mais</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                )}
            />

            <ActionButton>
                <ActionButton.Item title="Criar Churras" onPress={inicioCriarChurras}>
                    <Icon name="plus" style={style.fabBtn} />
                </ActionButton.Item>
                <ActionButton.Item title="Participar do Churras" onPress={ParticiparChurras}>
                    <Icon name="users" style={style.fabBtn} />
                </ActionButton.Item>
            </ActionButton>

        </View>

    )
}