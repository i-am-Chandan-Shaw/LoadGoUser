import React from 'react';
import { View, Modal } from 'react-native';
import style from './style';
import { ActivityIndicator } from 'react-native-paper';

const AppLoader = ({ styles }) => {
    return (
        <Modal transparent>
            <View style={[style.loaderContainer, styles]}>
                <ActivityIndicator size={35} animating={true} color={'#fff'} />
            </View>
        </Modal>
    )
}

export default AppLoader;