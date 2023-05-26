import React, { useState } from 'react';
import { View, Modal,Text,Pressable } from 'react-native';
import style from './style';



const AppModal = ({visibility,height, header, onConfirm, onCancel, children, onValueChange}) => {

    const handleButtonPress = () => {
        onValueChange('yoyo');
      };

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={visibility}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(!visibility);
            }}>
                
            <View style={style.backdrop}>
                <View style={[style.modalContainer,{height:height}]}>
                    <View style={style.modalHeader}>
                        <Text style={{color:'#000', fontSize:18}}>{header}</Text>
                    </View>
                    <View style={style.modalBody}>
                        {children}
                    </View>
                    <View style={style.modalFooter}>
                        <Pressable onPress={handleButtonPress}> 
                            <Text style={{color:'#0047ab', fontSize:16, fontWeight:600}}>OK</Text> 
                        </Pressable>
                        <View style={{marginRight:15}}></View>
                        <Pressable onPress={onCancel}  > 
                            <Text style={{color:'#333', fontSize:16, fontWeight:600}}>Cancel</Text> 
                        </Pressable>
                    </View>

                </View>
            </View>

        </Modal>
    )
}

export default AppModal;