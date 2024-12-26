import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import commonStyles from '../../../constants/commonStyle';
import {useTheme} from '../../../constants/ThemeContext';

const EditFareAmount = ({fareAmountDetails, confirmFareDetails}) => {
  const {theme} = useTheme();
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(''); // State to store error message

  const [currentFare, setCurrentFare] = useState({
    minFare: fareAmountDetails.minFare || 0,
    fare: fareAmountDetails.fare || 0,
  });

  useEffect(() => {
    if (fareAmountDetails) {
      setCurrentFare({
        minFare: fareAmountDetails.minFare,
        fare: fareAmountDetails.fare,
      });
    }
  }, [fareAmountDetails]);

  const validateInput = text => {
    const sanitizedText = text.replace(/[^0-9]/g, ''); // Allow only numbers

    // Validate against minFare
    if (parseInt(sanitizedText, 10) < currentFare.minFare) {
      setError(`Minimum fare should be ₹${currentFare.minFare}`);
    } else {
      setError('');
    }

    // Update the fare
    setCurrentFare(prevState => ({
      ...prevState,
      fare: sanitizedText,
    }));
  };

  const confirmFare = () => {
    if (!error) {
      console.log('Fare confirmed:', currentFare);
      confirmFareDetails(currentFare);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[commonStyles.fnt16Medium, commonStyles.textCenter]}>
        Enter your fare
      </Text>
      <View style={styles.inputContainer}>
        {/* Rs Symbol */}
        <Text style={[styles.currencySymbol, {color: theme.black}]}>Rs</Text>
        {/* TextInput */}
        <TextInput
          value={currentFare.fare.toString()} // Ensure value is a string
          onChangeText={validateInput}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="decimal-pad"
          maxLength={5}
          placeholder="0"
          placeholderTextColor={theme.textInfo}
          style={[
            styles.input,
            {
              backgroundColor: theme.white,
              borderColor: focused ? theme.bgPrimary : theme.borderColor,
              color: theme.black,
              shadowColor: focused ? theme.bgPrimary : 'transparent',
            },
          ]}
        />
      </View>
      {/* Error Message */}
      {error ? (
        <Text style={[styles.errorText, {color: theme.errorColor || 'red'}]}>
          {error}
        </Text>
      ) : null}
      <TouchableOpacity
        style={error ? commonStyles.btnDisabled : commonStyles.btnPrimary}
        onPress={confirmFare}
        disabled={!!error} // Disable button if there's an error
      >
        <Text
          style={[
            commonStyles.textCenter,
            commonStyles.fnt16Medium,
            {color: theme.white},
          ]}>
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  currencySymbol: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginRight: 5,
  },
  input: {
    flex: 1, // Ensure input takes the remaining space
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    paddingVertical: 10,
    paddingHorizontal: 5,
    lineHeight: 30,
    textAlignVertical: 'center',
    textAlign: 'left',
  },
  errorText: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
});

export default EditFareAmount;
