import React from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';

import style from './styles';

export default function ResumoChurras(){
    return(
        <View style={{flex: 1}}>

            <ActionButton >
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