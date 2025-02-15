import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, Linking} from 'react-native';
import style from './style';
import imagePath from '../../constants/imagePath';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppDivider from '../../core/component/AppDivider';
import {Button} from 'react-native-paper';
import {convertTo12HourFormat} from '../../core/helper/commonHelper';

const TripDetails = props => {
  const [textToCopy, setTextToCopy] = useState('Tap to copy this text');

  const copyToClipboard = () => {
    Clipboard.setString(textToCopy);
    Alert.alert('Copied!', 'Text has been copied to clipboard.');
  };

  const [data, setData] = useState('');

  useEffect(() => {
    if (props) setData(props.route.params.tripDetails);
  }, [props]);

  const callSupport = () => {
    Linking.openURL(`tel:${8240687723}`);
  };

  return (
    <ScrollView>
      {data && (
        <View style={style.mainContainer}>
          <View style={{flexGrow: 1}}>
            <View style={style.topContainer}>
              <View>
                <View>
                  <Text style={style.subHeaderText}>
                    {data.requestDate},{' '}
                    {convertTo12HourFormat(data.requestTime)}
                  </Text>
                </View>
                <View>
                  <Text style={style.secondarySemibold}>CRN {data.tripId}</Text>
                </View>
              </View>
              <View>
                <Button
                  style={{borderColor: '#d6d6d6'}}
                  onPress={callSupport}
                  buttonColor="#1F41BB"
                  textColor="#fff"
                  mode="contained">
                  Contact Support
                </Button>
              </View>
            </View>
            <AppDivider bgColor={'#d6d6d6'} />

            <View style={style.middleContainer}>
              <View style={style.leftContent}>
                <Image style={[style.image]} source={imagePath['tataAce']} />
                <Text style={style.subHeaderText}>Tata Ace</Text>
              </View>
              <View style={style.rightContent}>
                <MaterialIcons name="cash" color={'green'} size={30} />
                <Text style={[style.subHeaderText]}>₹ {data.amount}</Text>
              </View>
            </View>

            <AppDivider bgColor={'#d6d6d6'} />

            <View
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                // alignItems: 'center',
                // paddingVertical: 20,
                paddingBottom: 20,
                // borderRightColor:'#ccc',
                // borderRightWidth:1,
              }}>
              <View style={{marginHorizontal: 10,marginVertical: 10}}>
                <Text style={{}}>Driver Details</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    gap: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                    borderRightColor: '#ccc',
                    borderRightWidth: 1,
                  }}>
                  <MaterialIcons name="account" color={'green'} size={30} />
                  <View>
                    {/* <Text style={style.subHeaderText}>Driver's Name</Text> */}
                    <Text style={style.subHeaderText}>{data.driverName}</Text>
                  </View>
                </View>
                <View
                  style={{
                    gap: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                  }}>
                  <MaterialIcons name="phone" color={'green'} size={25} />
                  <View>
                    {/* <Text style={style.subHeaderText}>Driver's Phone</Text> */}
                    <Text style={[style.subHeaderText]}>
                      {data.driverPhone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <AppDivider bgColor={'#d6d6d6'} />

            <View style={style.middleContainer}>
              <View style={style.leftContent}>
                <MaterialIcons name="package" color={'green'} size={25} />
                <Text style={style.subHeaderText}>{data.goodsType}</Text>
              </View>
              <View style={style.rightContent}>
                <MaterialIcons name="pin" color={'green'} size={25} />
                <Text style={[style.subHeaderText]}>{data.totalKm}</Text>
              </View>
            </View>

            <AppDivider bgColor={'#d6d6d6'} />

            <View style={style.locationContainer}>
              {/* <View style={style.locationText}>
                            <Text numberOfLines={1} style={[style.text]}>12:54 PM</Text>
                            <View style={{ height: 17 }}></View>
                            <Text numberOfLines={1} style={[style.text]}>{data.time}</Text>
                        </View> */}
              <View style={style.timeLine}>
                <View style={style.circle}></View>
                <View style={style.dottedLine}></View>
                <View
                  style={[style.circle, {backgroundColor: '#568203'}]}></View>
              </View>
              <View style={style.locationText}>
                <Text numberOfLines={2} style={[style.text]}>
                  {data.pickUpLocation}
                </Text>
                <View style={{height: 17}}></View>
                <Text numberOfLines={1} style={[style.text]}>
                  {data.dropLocation}
                </Text>
              </View>
            </View>

            <AppDivider bgColor={'#d6d6d6'} />

            <View style={style.billDetailsContainer}>
              <Text style={style.subHeaderText}>Bill Details</Text>

              <View style={style.billRow}>
                <Text style={[style.text, {fontSize: 15}]}>Your Trip</Text>
                <Text style={[style.text, {fontSize: 15}]}>
                  ₹ {data.amount}
                </Text>
              </View>

              {/* <View style={style.billRow}>
                <Text style={[style.text, {fontSize: 15}]}>Wait Time</Text>
                <Text style={[style.text, {fontSize: 15}]}>₹ 0</Text>
              </View> */}
              {/* <View style={style.billRow}>
                <Text style={[style.text, {fontSize: 15}]}>Taxes</Text>
                <Text style={[style.text, {fontSize: 15}]}>₹ 78.12</Text>
              </View> */}

              <View style={[style.billRow, {borderBottomWidth: 0}]}>
                <Text style={style.subHeaderText}>Total Payable</Text>
                <Text style={[style.text, {fontSize: 15}]}>
                  ₹ {data.amount}
                </Text>
              </View>

              <View style={[style.billRow, {borderBottomWidth: 0}]}>
                <Text style={style.subHeaderText}>Payment Method</Text>
                <Text style={[style.subHeaderText]}>Cash</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default TripDetails;
