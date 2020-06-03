import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AppStack =  createStackNavigator();

// Import pages
import Calculadora from './pages/Calculadora';
import CatalogoRestaurante from './pages/CatalogoRestaurante';
import DividirCompra from './pages/DividirCompra';
import GuiaCerveja from './pages/GuiaCerveja';
import InformacaoCerveja from './pages/InformacaoCerveja';
import InformacaoRestaurante from './pages/InformacaoRestaurante';
import ItemRestaurante from './pages/ItemRestaurante';
import Login from './pages/Login';
import Restaurante from './pages/Restaurante';
import ResumoChurras from './pages/ResumoChurras';
import OutrosChurras from './pages/OutrosChurras';


const Tab = createBottomTabNavigator();


    function CriarTabs() {
        return(
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size}) => {
                    let iconName;
                    if (route.name === "Outros Churras") {
                        iconName = focused 
                        ? 'glass-cheers'
                        : 'beer';
                    } else if (route.name === "Meu Churras") {
                        iconName = focused
                        ? 'home'
                        : 'burn';
                    } else if (route.name === "Perfil") {
                        iconName = focused
                        ? 'creative-commons-by'
                        : 'couch';
                    }
                    return <Icon name={iconName} size={size} color={color} />;

                }
            })} initialRouteName={'Meu Churras'} tabBarOptions={{activeTintColor: "#fff308", inactiveTintColor: "#c2ba19"}}>
                <Tab.Screen name="Outros Churras" component={OutrosChurras}/>
                <Tab.Screen name="Meu Churras" component={ResumoChurras}/>
                <Tab.Screen name="Perfil" component={GuiaCerveja}/>
            </Tab.Navigator>
        );
    }


export default function Routes(){

    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Tabs" component={CriarTabs}/>
                <AppStack.Screen name="Calculadora" component={Calculadora}/>
                <AppStack.Screen name="CatalogoRestaurante" component={CatalogoRestaurante}/>
                <AppStack.Screen name="DividirCompra" component={DividirCompra}/>
                <AppStack.Screen name="GuiaCerveja" component={GuiaCerveja}/>
                <AppStack.Screen name="InformacaoCerveja" component={InformacaoCerveja}/>
                <AppStack.Screen name="InformacaoRestaurante" component={InformacaoRestaurante}/>
                <AppStack.Screen name="ItemRestaurante" component={ItemRestaurante}/>
                <AppStack.Screen name="Restaurante" component={Restaurante}/>
                <AppStack.Screen name="ResumoChurras" component={ResumoChurras}/>
            </AppStack.Navigator>
 
        </NavigationContainer>
    );
}