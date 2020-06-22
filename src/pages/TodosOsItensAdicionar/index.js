import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal, Picker} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';

//Icones imports
import Icon from 'react-native-vector-icons/FontAwesome5';

import style from './styles';

//Tipo 
// 1 -> Vaca
// 2 -> Porco
// 3 -> Frango
// 4 -> Peixe
// 5 -> Exotico
var pratoPrincipal = [
    {
        id:'1',
        item:'picanha',
        qtd: 100,
        unidade: 'kg',
        tipo:'1'
    },
    {
        id:'2',
        item:'coração',
        qtd:50,
        unidade: 'kg',
        tipo:'3'
    },
    {
        id:'3',
        item:'tulipa',
        qtd:50,
        unidade: 'kg',
        tipo:'3'
    },
    {
        id:'4',
        item:'costela',
        qtd:100,
        unidade: 'kg',
        tipo:'2'
    },

]


export default function TodosOsItensAdicionar({ route, navigation }){

    const { tipo } = route.params;
    const [visivel, setIsVisivel] = React.useState(false);
    const [itemModal, setItemModal] = React.useState('');
    const [selectedUnidade, setSelectedUnidade] = useState("Selecione...");

    function setVisibility(isVisible, item){
        setIsVisivel(isVisible)
        setItemModal(item)
    }

    function addItem(isVisible, item , unidadeDrop, qtdNova){
        setIsVisivel(isVisible)
        setItemModal(item)
    }

    function onChangeVar(text, varivael){
        varivael = text;
    }

    
    function backHome(){
        navigation.navigate("EscolherPratoPrincipal")
    }

    return(
        <View style={style.container}>
            <SafeAreaView style={style.body}>
                <View style={style.headerGroup}>
                    <View style={style.headerTextGroup}>
                        <Text style={style.textHeader}>Quais carnes quer</Text>
                        <Text style={style.textHeader}>adicionar?</Text>
                    </View>
                <TouchableOpacity style={style.exitBtn} onPress={backHome}>
                    <Icon style={style.iconHeaderBtn} name="arrow-alt-circle-left" size={20} />
                    <Text style={style.textHeaderBtn}>Voltar</Text>
                </TouchableOpacity>
                </View>                 

                <ScrollView>
                    <FlatList 
                        data = {pratoPrincipal}
                        keyExtractor={pratoPrincipal => String(pratoPrincipal.id)}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item: pratoPrincipal})=>(  
                        <View style={style.listaConvidados}> 
                            {pratoPrincipal.tipo == tipo &&
                                <TouchableOpacity style={style.card} onPress={() => setVisibility(true,pratoPrincipal.item) }>
                                    <Text style={style.textCard}>{pratoPrincipal.item}</Text>
                                </TouchableOpacity>                                 
                            }                            
                        </View> 
                        )}
                        style={style.listStyle}/>   
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={visivel}
                        >
                            <View style={style.centeredView}>
                                <View style={style.modalView}>
                                    <TouchableOpacity style={style.exitBtn} onPress={() => setVisibility(false,"")}>
                                        <Icon style={style.iconHeaderBtn} name="times" size={20} />
                                        <Text style={style.textHeaderBtn}>fechar</Text>
                                    </TouchableOpacity>
                                    <Text style={style.modalText}>Quanto de {itemModal} deseja adicionar?</Text>
                                    <View style={style.selectionForm}>
                                        <NumericInput 
                                            onChange = { text => onChangeVar(text, pratoPrincipal.qtd) }
                                            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                                            totalWidth={150} 
                                            totalHeight={30} 
                                            iconSize={15}
                                            initValue={pratoPrincipal.qtd}
                                            step={5}
                                            valueType='real'
                                            rounded 
                                            textColor='brown' 
                                            iconStyle={{ color: 'brown' }}
                                            style={style.quantidadeInput} />
                                            <Picker
                                                selectedValue={selectedUnidade}
                                                style={style.boxDropdown}
                                                itemStyle={style.itemDropdown}
                                                mode="dropdown"
                                                onValueChange={(itemValue, itemIndex) => setSelectedUnidade(itemValue)}
                                            >
                                                <Picker.Item label="g" value="g" />
                                                <Picker.Item label="kg" value="kg" />
                                                <Picker.Item label="unidade" value="unidade" />
                                                <Picker.Item label="pedaço" value="pedaço" />
                                                <Picker.Item label="fatia" value="fatia" />
                                            </Picker>
                                        </View>
                                        <TouchableOpacity style={style.salvarBtn} onPress={() => addItem(false,"",selectedUnidade, /* adicionar variavel que guarde a quantidade */)}>
                                            <Icon style={style.iconSalvarBtn} name="check" size={20} />
                                            <Text style={style.textSalvarBtn}>Confirmar</Text>
                                        </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>                    
                    </ScrollView>

            </SafeAreaView>
        </View>
    )
}