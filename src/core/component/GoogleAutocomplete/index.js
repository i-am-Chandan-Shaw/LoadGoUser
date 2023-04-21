import React from 'react';
import { ScrollView, SafeAreaView, FlatList } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import style from './style';



const GoogleAutocomplete=({onPress,placeholder,styles,apiKey})=>{

const autocomplete = ()=>{
    return(
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
                strictbounds: true,
                location:"22.9868, 87.8550",
                radius:"167000"
            }} 
        />
    )
}

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
                        {autocomplete()}
                    </ScrollView>
                )}
            />
        </SafeAreaView>
    )
}

export default GoogleAutocomplete;