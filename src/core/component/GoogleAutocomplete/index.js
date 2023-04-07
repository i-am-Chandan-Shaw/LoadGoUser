import React, { useRef } from 'react';
import { ScrollView, SafeAreaView, FlatList } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import style from './style';



const GoogleAutocomplete=({onPress,placeholder,styles,apiKey})=>{

return (
    <SafeAreaView>
            <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={[]}
                ListEmptyComponent={null}
                keyExtractor={() => "null"}
                renderItem={null}
                ListHeaderComponent={() => (
                    <ScrollView keyboardShouldPersistTaps={'handled'} style={[style.container,styles]}>
                        <GooglePlacesAutocomplete styles={{textInputContainer: style.input}}
                            enablePoweredByContainer={false}
                            
                            currentLocation={true}
                            placeholder={placeholder}
                            fetchDetails={true}
                            onPress={onPress}
                           
                            query={{
                                key: apiKey,
                                language: 'en',
                                components: 'country:IN',
                            }}
                            
                        />
                    </ScrollView>
                )}
            />
        </SafeAreaView>
    )
}

export default GoogleAutocomplete;