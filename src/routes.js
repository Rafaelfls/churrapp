import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconMI from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'expo';
import { createDrawerNavigator } from '@react-navigation/drawer'

const AppStack = createStackNavigator();
const prefix = Linking.makeUrl('/');

// Import pages
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import LoginCelular from './pages/LoginCelular';
import CadastroUsuario from './pages/CadastroUsuario';
import ResumoChurras from './pages/ResumoChurras';
import OutrosChurras from './pages/OutrosChurras';
import CriarChurrasco from './pages/CriarChurrasco';
import AdicionaConvidados from './pages/AdicionaConvidados';
import CompartilharConvidados from './pages/CompartilharConvidados';
import DetalheChurras from './pages/DetalheChurras';
import InicioCriaChurras from './pages/InicioCriaChurras';
import OpenContactList from './pages/OpenContactList';
import OpenContactListCompartilhar from './pages/OpenContactListCompartilhar';
import AdicionarPratoPrincipal from './pages/AdicionarPratoPrincipal';
import ParticiparChurrasco from './pages/ParticiparChurrasco';
import CompartilharChurrasco from './pages/CompartilharChurrasco';
import QRCodeLeitor from './pages/QRCodeLeitor';
import EscolherNovosItens from './pages/EscolherNovosItens';
import EscolherNovosItens2 from './pages/EscolherNovosItens2';
import EscolherNovosItens3 from './pages/EscolherNovosItens3';
import EscolherNovosItens4 from './pages/EscolherNovosItens4';
import EscolherNovosItens5 from './pages/EscolherNovosItens5';
import AdicionarAcompanhamento from './pages/AdicionarAcompanhamento';
import AdicionarBebidas from './pages/AdicionarBebidas';
import AdicionarExtras from './pages/AdicionarExtras';
import AdicionarSobremesas from './pages/AdicionarSobremesas';
import FinalCriaChurras from './pages/FinalCriaChurras';
import EsqueciSenha from './pages/EsqueciSenha';
import AlterarSenha from './pages/AlterarSenha';
import Notificacoes from './pages/Notificacoes';

import CustomSideBarMenu from './components/CustomSideBarMenu'

import ChurrasProvider from './context/churrasContext';

import style from './styles.js'
import api from './services/api'

//Criando Icone Customizável
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import icoMoonConfig from '../selection.json';
const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig, 'zondicon-icon', 'icomoon.ttf');
//Fim


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function badgeIconeNotificacao(focused) {
    const [notificacoes, setnotificacoes] = useState([]);
    function loadNotificacoes() {
        api.get(`/notificacoes/${USUARIOLOGADO.id}`).then(function (res) {
            setnotificacoes(res.data)
        })
    }

    useEffect(() => {
        loadNotificacoes();
    }, []);

    return (
        <View>
            <View style={style.centeredViewNotificacaoQtd}>
                {notificacoes.length > 0
                    ? <View style={style.modalViewNotificacaoQtd}>
                        <Text style={style.textBtnNotificacaoQtd}>{notificacoes.length}</Text>
                    </View>
                    : null}
            </View>
            <IconMI size={25} name={focused ? 'bell-o' : 'bell'}  ></IconMI>
        </View>
    )
}
function criarDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName='Início'
            drawerType={'back'}
            drawerStyle={{ width: '65%', backgroundColor: 'lightgray' }}
            overlayColor={'rgba(0,0,0,0.8)'}
            drawerContentOptions={{
                activeTintColor: 'white',
                inactiveTintColor: 'maroon',
                activeBackgroundColor: 'rgba(128,0,0,0.8)',
                labelStyle: { fontFamily: 'poppins-medium', fontSize: 15, alignSelf: 'flex-start' },
                itemStyle: { marginHorizontal: 8, top: -30 }
            }}
            drawerContent={(props) => <CustomSideBarMenu {...props} />}
        >
            <Drawer.Screen name='Início' component={CriarTabs}
                options={{
                    drawerIcon: (({ focused }) => <IconMI size={25} name={focused ? 'home' : 'home'} ></IconMI>),
                    title: "Início",
                }}
            />
            <Drawer.Screen name='Notificações' component={Notificacoes}
                options={{
                    drawerIcon: (({ focused }) => badgeIconeNotificacao(focused))
                }}
            />
            <Drawer.Screen name='Criar Item' component={Perfil}
                options={{
                    drawerIcon: (({ focused }) => <CustomIcon name={focused ? "add-outline" : "add-solid"} size={25} />)
                }}
            />
            <Drawer.Screen name='Lista de Compras' component={Perfil}
                options={{
                    drawerIcon: (({ focused }) => <CustomIcon name="list-bullet" size={25} />)
                }}
            />
            <Drawer.Screen name='Perfil' component={Perfil}
                options={{
                    drawerIcon: (({ focused }) => <CustomIcon name="user" size={25} />)
                }}
            />
            <Drawer.Screen name='Guia' component={Perfil}
                options={{
                    drawerIcon: (({ focused }) => <CustomIcon name="location-food" size={25} />)
                }}
            />
            <Drawer.Screen name='Promoções' component={Perfil}
                options={{
                    drawerIcon: (({ focused }) => <IconIo name={focused ? "md-pricetag" : "md-pricetag"} size={25} />)
                }}
            />
            <Drawer.Screen name='Lojas' component={Perfil}
                options={{
                    drawerIcon: (({ focused }) => <CustomIcon name="location-shopping" size={25} />)
                }}
            />
        </Drawer.Navigator>
    );
}
function CriarTabs() {
    return (

        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Outros Churras") {
                    iconName = focused
                        ? 'glass-cheers'
                        : 'glass-cheers';
                } else if (route.name === "Meu Churras") {
                    iconName = focused
                        ? 'home'
                        : 'home';
                }
                return <Icon name={iconName} size={size} color={color} />;

            }
        })} initialRouteName={'Meu Churras'} tabBarOptions={{ activeTintColor: "maroon", inactiveTintColor: "gray" }}>
            <Tab.Screen name="Outros Churras" component={OutrosChurras} />
            <Tab.Screen name="Meu Churras" component={ResumoChurras} />
        </Tab.Navigator>
    );
}

export default function Routes() {

    const linking = {
        prefixes: [prefix],
    };

    return (
        <ChurrasProvider>
            <NavigationContainer linking={linking} fallback={<Text>Carregando...</Text>}>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    {/* Telas fora do app */}
                    <AppStack.Screen name="Login" component={Login} />
                    <AppStack.Screen name="LoginCelular" component={LoginCelular} />
                    <AppStack.Screen name='EsqueciSenha' component={EsqueciSenha} />
                    <AppStack.Screen name='AlterarSenha' component={AlterarSenha} />
                    <AppStack.Screen name="CadastroUsuario" component={CadastroUsuario} />
                    {/* Fim telas fora do app */}

                    {/* Paginas principais */}
                    <AppStack.Screen name="Tabs" component={criarDrawer} />
                    <AppStack.Screen name="Perfil" component={Perfil} />
                    <AppStack.Screen name="ResumoChurras" component={ResumoChurras} />
                    <AppStack.Screen name="OutrosChurras" component={OutrosChurras} />
                    {/* Fim paginas principais */}

                    {/* Paginas de comparilhamento do churrasco */}
                    <AppStack.Screen name="ParticiparChurrasco" component={ParticiparChurrasco} />
                    <AppStack.Screen name="CompartilharChurrasco" component={CompartilharChurrasco} />
                    <AppStack.Screen name="CompartilharConvidados" component={CompartilharConvidados} />
                    <AppStack.Screen name="OpenContactListCompartilhar" component={OpenContactListCompartilhar} />
                    <AppStack.Screen name="QRCodeLeitor" component={QRCodeLeitor} />
                    {/* Fim telas de compartilhamento do churrasco */}

                    {/* Inicio telas de criação do churrasco */}
                    <AppStack.Screen name="InicioCriaChurras" component={InicioCriaChurras} />
                    <AppStack.Screen name="CriarChurrasco" component={CriarChurrasco} />
                    <AppStack.Screen name="AdicionaConvidados" component={AdicionaConvidados} />
                    <AppStack.Screen name="DetalheChurras" component={DetalheChurras} />
                    <AppStack.Screen name="OpenContactList" component={OpenContactList} />
                    <AppStack.Screen name="AdicionarPratoPrincipal" component={AdicionarPratoPrincipal} />
                    <AppStack.Screen name="EscolherNovosItens" component={EscolherNovosItens} />
                    <AppStack.Screen name="EscolherNovosItens2" component={EscolherNovosItens2} />
                    <AppStack.Screen name="EscolherNovosItens3" component={EscolherNovosItens3} />
                    <AppStack.Screen name="EscolherNovosItens4" component={EscolherNovosItens4} />
                    <AppStack.Screen name="EscolherNovosItens5" component={EscolherNovosItens5} />
                    <AppStack.Screen name="AdicionarAcompanhamento" component={AdicionarAcompanhamento} />
                    <AppStack.Screen name="AdicionarBebidas" component={AdicionarBebidas} />
                    <AppStack.Screen name="AdicionarExtras" component={AdicionarExtras} />
                    <AppStack.Screen name="AdicionarSobremesas" component={AdicionarSobremesas} />
                    <AppStack.Screen name="FinalCriaChurras" component={FinalCriaChurras} />
                    {/* Fim telas de criação do churrasco */}
                </AppStack.Navigator>
            </NavigationContainer>
        </ChurrasProvider>
    );
}