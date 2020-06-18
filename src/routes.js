import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AppStack =  createStackNavigator();

// Import pages
import Perfil from './pages/Perfil';
import Login from './pages/Login';
import ResumoChurras from './pages/ResumoChurras';
import OutrosChurras from './pages/OutrosChurras';
import CriarChurrasco from './pages/CriarChurrasco';
import AdicionaConvidados from './pages/AdicionaConvidados';
import DetalheChurras from './pages/DetalheChurras';
import InicioCriaChurras from './pages/InicioCriaChurras';
import OpenContactList from './pages/OpenContactList';
import AdicionarPratoPrincipal from './pages/AdicionarPratoPrincipal';
import ParticiparChurrasco from './pages/ParticiparChurrasco';
import CompartilharChurrasco from './pages/CompartilharChurrasco';
import QRCodeLeitor from './pages/QRCodeLeitor';
import EscolherPratoPrincipal from './pages/EscolherPratoPrincipal';
import TodosOsItensAdicionar from './pages/TodosOsItensAdicionar';

const Tab = createBottomTabNavigator();

    function CriarTabs() {
        return(
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === "Outros Churras") {
                        iconName = focused 
                        ? 'glass-cheers'
                        : 'glass-cheers';
                    } else if (route.name === "Meu Churras") {
                        iconName = focused
                        ? 'home'
                        : 'home';
                    } else if (route.name === "Perfil") {
                        iconName = focused
                        ? 'creative-commons-by'
                        : 'creative-commons-by';
                    }
                    return <Icon name={iconName} size={size} color={color} />;

                }
            })} initialRouteName={'Meu Churras'} tabBarOptions={{activeTintColor: "maroon", inactiveTintColor: "gray"}}>
                <Tab.Screen name="Outros Churras" component={OutrosChurras}/>
                <Tab.Screen name="Meu Churras" component={ResumoChurras}/>
                <Tab.Screen name="Perfil" component={Perfil}/>
            </Tab.Navigator>
        );
    }

export default function Routes(){

    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login}/>
                <AppStack.Screen name="Tabs" component={CriarTabs}/>
                <AppStack.Screen name="Perfil" component={Perfil}/>
                <AppStack.Screen name="ResumoChurras" component={ResumoChurras}/>
                <AppStack.Screen name="OutrosChurras" component={OutrosChurras}/>

                <AppStack.Screen name="ParticiparChurrasco" component={ParticiparChurrasco}/>
                <AppStack.Screen name="CompartilharChurrasco" component={CompartilharChurrasco}/>
                <AppStack.Screen name="QRCodeLeitor" component={QRCodeLeitor}/>

                {/* Inicio telas de criação do churrasco */}
                <AppStack.Screen name="InicioCriaChurras" component={InicioCriaChurras}/>
                <AppStack.Screen name="CriarChurrasco" component={CriarChurrasco}/>
                <AppStack.Screen name="AdicionaConvidados" component={AdicionaConvidados}/>
                <AppStack.Screen name="DetalheChurras" component={DetalheChurras}/>
                <AppStack.Screen name="OpenContactList" component={OpenContactList}/>
                <AppStack.Screen name="AdicionarPratoPrincipal" component={AdicionarPratoPrincipal}/>
                <AppStack.Screen name="EscolherPratoPrincipal" component={EscolherPratoPrincipal}/>
                <AppStack.Screen name="TodosOsItensAdicionar" component={TodosOsItensAdicionar}/>
                {/* Fim telas de criação do churrasco */}

            </AppStack.Navigator>
 
        </NavigationContainer>
    );
}