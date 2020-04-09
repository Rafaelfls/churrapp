import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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

export default function Routes(){
    return(
        <NavigationContainer>

            <AppStack.Navigator>
                <AppStack.Screen name="Calculadora" component={Calculadora}/>
                <AppStack.Screen name="CatalogoRestaurante" component={CatalogoRestaurante}/>
                <AppStack.Screen name="DividirCompra" component={DividirCompra}/>
                <AppStack.Screen name="GuiaCerveja" component={GuiaCerveja}/>
                <AppStack.Screen name="InformacaoCerveja" component={InformacaoCerveja}/>
                <AppStack.Screen name="InformacaoRestaurante" component={InformacaoRestaurante}/>
                <AppStack.Screen name="ItemRestaurante" component={ItemRestaurante}/>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Restaurante" component={Restaurante}/>
                <AppStack.Screen name="ResumoChurras" component={ResumoChurras}/>
            </AppStack.Navigator>
 
        </NavigationContainer>
    );
}