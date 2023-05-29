import React from 'react';
import { View,Text } from 'react-native';
import style from './style';
import CurrentOrders from '../../core/component/CurrentOrders';

const Orders=()=>{
    const ordersData=[
        {
            id:1,
            pickup:'1/30/21 Kundu Bagan, Beleghata,Dr. SC Banerjee Road Kolkata:700085',
            drop:'Vivek Vihar, Priya Mana Basti Narao Howrah:700129',
            date:'Sat, Mar 04',
            time:'01:52 PM',
            status:'Completed',
            amount:'867.00',
            vehicleType:'tataAce',
            vehicleName:'Tata Ace',
            tripId:'16997782',
            driverName:'Arun Kumar',
            driverRating:'4.3',
            driverNumber:'8200120090',
            pickupCoords:{
                "latitude": 22.5628783, 
                "latitudeDelta": 0.0122, 
                "longitude": 88.3962467, 
                "longitudeDelta": 0.0061627689429373245
            },
            dropCoords:{ 
                "latitude": 22.5830002, 
                "latitudeDelta": 0.0122, 
                "longitude": 88.3372909, 
                "longitudeDelta": 0.0061627689429373245
            }
        },
        {
            id:0,
            pickup:'Sealdah, Raja Bazar, Kolkata, West Bengal 700014',
            drop:'59, Sitaram Ghosh St, College Row, College Street, Kolkata, West Bengal 700009',
            date:'Thu, 22 Mar',
            time:'03:15 PM',
            status:'Cancelled',
            amount:'0.00',
            vehicleType:'bolero',
            vehicleName:'Bolero',
            tripId:'11237782',
            driverName:'Sujit Singh',
            driverRating:'4.1',
            driverNumber:'87200010020',
            pickupCoords:{
                "latitude": 22.5628783, 
                "latitudeDelta": 0.0122, 
                "longitude": 88.3962467, 
                "longitudeDelta": 0.0061627689429373245
            },
            dropCoords:{ 
                "latitude": 22.5830002, 
                "latitudeDelta": 0.0122, 
                "longitude": 88.3372909, 
                "longitudeDelta": 0.0061627689429373245
            }
        }
        
    ]
return (
    <View style={style.mainContainer}>
        <View style={style.headerContainer}>
            <Text style={style.subHeaderText}>Orders</Text>
        </View>
        <CurrentOrders data={ordersData[0]} />
        <CurrentOrders data={ordersData[1]} />
    </View>
    )
}

export default Orders;