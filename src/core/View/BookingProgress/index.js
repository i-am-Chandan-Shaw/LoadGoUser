import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text,Image } from 'react-native';
import * as Progress from 'react-native-progress';
import style from './style';
import { Button } from 'react-native-paper';
import imagePath from '../../../constants/imagePath';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const BookingProgress = ({onPress}) => {
    const textArr=[
        'Please wait while we connect a driver near you.',
        'Make sure to check the goods before loading.',
        'We make sure to deliver your goods with safety.',
        'Drivers Found in your locality, waiting to accept the ride.',
        'It\'s taking longer than expected.',
        'Finding ride in the background, You can check the status in Ride Tab'
    ]
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState(textArr[0]);
    const { width, height } = Dimensions.get('window');
    
    let deliveryGif= <Image style={{height:150, width:150}} source={imagePath.deliveryBoy} />

    useEffect(() => {
        startProgress()
    },[]);

    const startProgress=()=>{
        const interval = setInterval(() => {
        setProgress((progress) => {
            const index = parseInt(progress*100/20);
            if(index<2)
                deliveryGif = <Image style={{height:150, width:250}} source={imagePath.truckDelivery} />
            else
                deliveryGif=<Image style={{height:150, width:150}} source={imagePath.deliveryBoy} />
            setProgressText(textArr[index])
            if(progress>=1){
                clearInterval(interval);
                return 1;
            }
            else {
                return progress + 0.01;
            }
        });
        }, 500);
    }

    return (
        <View style={style.mainContainer}>
            <View>
                {deliveryGif}
            </View>
            <View style={style.progressContainer} >
                <Progress.Bar
                    progress={progress}
                    width={width - 20}
                    color='#0047ab'
                    animated={true}
                />
            </View>
            <View style={style.textContainer}>
                <Text style={style.progressTextStyle} >{progressText}</Text>
            </View>
            <Button style={style.secondaryButton} mode='contained' onPress={onPress} >
                <Text style={{fontSize:16, color:'#333'}}>Cancel Ride</Text>
            </Button>
            <View style={style.pickupContainer}>
                <Text style={{color:'#000', fontSize:15, fontWeight:600}}>Pickup Contact</Text>
                <View style={{marginRight:5}}></View>
                <EntypoIcon name="chevron-right" size={20} color={'#000'} />
                <View style={{marginRight:10}}></View>
                <Text style={{color:'#000', fontSize:16, fontWeight:600}}>Chandan Shaw (8240122319)</Text>
            </View>
        </View>

    )
}

export default BookingProgress;