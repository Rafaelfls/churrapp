import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';

import logoImg from '../../assets/logo.jpg';

import style from './styles';

const churras= [
    {
        id: 1,
        data: "10/06/2020",
        nome: "Matheus Torres",

    }
]

export default function ResumoChurras(){
    return(

        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.textHeader}>Churrapp</Text>
            </View>

            <FlatList
                data={churras}
                style={style.churrasList}
                keyExtractor={churras => String(churras)}
                renderItem={({item: churras}) => (
                    <View style={style.churras}>
                        <Text>{churras.data}</Text>

                    </View>
                )}
            />
            
            <ActionButton>
                <ActionButton.Item  title="Criar Churras" onPress={() => {}}>
                    <Icon name="plus" style={style.fabBtn}/>
                </ActionButton.Item>
                <ActionButton.Item  title="Participar do Churras" onPress={() => {}}>
                    <Icon name="users" style={style.fabBtn}/>
                </ActionButton.Item>
            </ActionButton>
            
        </View>

    )
}