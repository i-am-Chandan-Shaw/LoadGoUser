/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import AppLoader from '../AppLoader';

const GoogleAutocomplete = ({onPress, placeholder, styles, apiKey}) => {
  const [loading, setLoading] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  const handleSearch = () => {
    setLoading(true);
    setResultsFound(true); // Assume results exist initially
  };

  const onFail = () => {
    setLoading(false);
    setResultsFound(false); // No results found
  };

  const renderAutocomplete = () => (
    <GooglePlacesAutocomplete
      styles={{
        textInputContainer: style.input,
        listView: style.listView,
        row: style.row,
        separator: style.separator,
      }}
      enablePoweredByContainer={false}
      currentLocation={true}
      placeholder={placeholder}
      fetchDetails={true}
      onPress={onPress}
      onFail={onFail}
      query={{
        key: apiKey,
        language: 'en',
        components: 'country:IN',
        strictbounds: true,
        location: '22.9868,87.8550',
        radius: '167000',
      }}
      onTextInputChange={handleSearch}
      onLoading={isLoading => setLoading(isLoading)} // Update loading state
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        keyboardShouldPersistTaps={'handled'}
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => 'null'}
        renderItem={null}
        ListHeaderComponent={() => (
          <ScrollView
            keyboardShouldPersistTaps={'handled'}
            style={[style.container, styles]}>
            {loading ? (
              <AppLoader />
            ) : (
              !resultsFound && (
                <Text style={style.noResultsText}>No Results Found</Text>
              )
            )}
            {renderAutocomplete()}
          </ScrollView>
        )}
      />
    </SafeAreaView>
  );
};

export default GoogleAutocomplete;

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 6,
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  listView: {
    backgroundColor: '#fff',
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
  },
  noResultsText: {
    textAlign: 'center',
    color: 'gray',
    marginVertical: 20,
    fontSize: 16,
  },
});
