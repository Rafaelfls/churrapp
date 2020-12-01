import React, { createContext, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Modal, Picker, Image, TextInput } from 'react-native';

import style from './styles';

const ChurrasContext = createContext();

export default function churrasProvider({ children }) {
    const [churrasCount, setChurrasCount] = useState(0);
    const [churrasParticipado, setChurrasParticipado] = useState(0);
    const [convidadosCount, setConvidadosCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [appStateVisible, setAppStateVisible] = useState();
    const [newChurras, setNewChurras] = useState();
    const [editavel, setEditavel] = useState(false);



    return (
        <ChurrasContext.Provider
            value={{
                churrasCount,
                setChurrasCount,
                convidadosCount,
                setConvidadosCount,
                loading,
                setLoading,
                churrasParticipado,
                setChurrasParticipado,
                appStateVisible,
                setAppStateVisible,
                newChurras,
                setNewChurras,
                editavel,
                setEditavel
            }}>
            {children}
        </ChurrasContext.Provider>
    );
}

export function useChurrasCount() {
    const context = useContext(ChurrasContext);
    const { churrasCount, setChurrasCount } = context;
    return { churrasCount, setChurrasCount };
}

export function useChurrasParticipado() {
    const context = useContext(ChurrasContext);
    const { churrasParticipado, setChurrasParticipado } = context;
    return { churrasParticipado, setChurrasParticipado };
}

export function useConvidadosCount() {
    const context = useContext(ChurrasContext);
    const { convidadosCount, setConvidadosCount } = context;
    return { convidadosCount, setConvidadosCount };
}

export function useLoadingModal() {
    const context = useContext(ChurrasContext)
    const { loading, setLoading } = context;
    return { loading, setLoading };

}

export function useAppState() {
    const context = useContext(ChurrasContext);
    const { appStateVisible, setAppStateVisible } = context;
    return { appStateVisible, setAppStateVisible };
}


export function useChurras() {
    const context = useContext(ChurrasContext);
    const { newChurras, setNewChurras } = context;
    return { newChurras, setNewChurras };
}

export function useEditavel() {
    const context = useContext(ChurrasContext);
    const { editavel, setEditavel } = context;
    return { editavel, setEditavel };
}

export function createLoadingModal(loading) {
    if (loading === true) {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
            >
                <View style={style.loadingBackground}
                >
                    <ActivityIndicator size="large" color="maroon" />
                    <Text style={style.textLoading}>Carregando ...</Text>
                </View>
            </Modal>
        )
    } else {
        return null
    }
}