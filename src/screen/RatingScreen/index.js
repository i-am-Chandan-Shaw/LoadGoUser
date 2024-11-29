import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler,
} from 'react-native';
import style from './style';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {patch} from '../../core/helper/services';

const Chip = ({label, selected, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(label)}
      style={[style.chip, selected && style.selectedChip]}>
      <Text style={[style.label, selected && style.selectedLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const RatingScreen = props => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [tripDetails, setTripDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log(props);
    setTripDetails(props.route.params.tripDetails);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    // Clean up the event listener when the component is unmounted
    return () => backHandler.remove();
  }, []);

  const handleStarPress = star => {
    setRating(star);
  };

  const [selectedChips, setSelectedChips] = useState([]);

  const handleChipSelect = label => {
    if (selectedChips.includes(label)) {
      setSelectedChips(selectedChips.filter(chip => chip !== label));
    } else {
      setSelectedChips([...selectedChips, label]);
    }
  };

  const handleBackPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const chipData = [
    'Overall Service',
    'Delivery',
    ,
    'Tracking',
    'Costs',
    'Driver Behavior',
    'Safety',
  ];

  const handleSubmit = () => {
    // Reset the rating and comment fields after submission
    setRating(0);
    setComment('');
    patchFeedback();

    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  };

  const patchFeedback = async () => {
    const payload = {
      id: tripDetails?.tripId,
      feedbackDriversFeedback: comment,
      feedbackDriversRating: rating,
    };
    try {
      setIsLoading(true);
      const data = await patch(payload, 'patchRequestVehicle');
      if (data) {
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.topContainer}>
        <View style={style.header}>
          <Avatar.Icon size={54} icon="account" />
          <Text style={[style.mediumText, {marginTop: 10}]}>
            {' '}
            {tripDetails?.driverName}
          </Text>
          <Text style={[style.boldText, {marginTop: 10}]}>
            {' '}
            ₹ {tripDetails?.amount}
          </Text>
        </View>
        {/* Star Rating */}
        <View style={style.starContainer}>
          {[1, 2, 3, 4, 5].map(star => (
            <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
              <FAIcon
                name={star <= rating ? 'star' : 'star-o'}
                size={40}
                color={star <= rating ? '#f1c40f' : '#aaa'}
                style={style.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        {/* Chip Container */}
        <Text style={[style.smallText, {fontWeight: 600}]}>
          {' '}
          Tell us what can be improved?
        </Text>
        <View style={style.chipContainer}>
          {chipData.map(chipLabel => (
            <Chip
              key={chipLabel}
              label={chipLabel}
              selected={selectedChips.includes(chipLabel)}
              onSelect={handleChipSelect}
            />
          ))}
        </View>
        {/* Comment Textarea */}
        <Text style={[style.smallText, {marginTop: 10, marginBottom: 10}]}>
          {' '}
          Leave a feedback
        </Text>
        <TextInput
          placeholder="Enter your feedback"
          value={comment}
          onChangeText={text => setComment(text)}
          multiline
          style={style.textarea}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={style.button} onPress={handleSubmit}>
        <Text style={style.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RatingScreen;
