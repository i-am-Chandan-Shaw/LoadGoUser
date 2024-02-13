import React from 'react';
import { WebView } from 'react-native-webview';

const TermsAndConditions=()=>{
return (
    <WebView source={{ uri: 'https://rahul-shaw18.github.io/LoadGo/terms-conditions' }} style={{ flex: 1 }} />
    )
}

export default TermsAndConditions;