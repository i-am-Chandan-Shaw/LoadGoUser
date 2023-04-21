import React ,  {useState, useEffect} from 'react';
import { View,Text, Pressable } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const Account=()=>{

    const [progress, setProgress] = useState(0);
  useEffect(() => {
    setInterval(() => {
        if(progress < 1) {
            setProgress((progress)=>{
                return progress+0.01;
            });
          }
    }, 100);
  },[]);

return (
    <View style={{top:200}}>
        <ProgressBar  animatedValue={progress} color={MD3Colors.error50} />
        <Pressable style={{borderColor:'#333', padding:10, margin:10, backgroundColor:'#ddd', top:50}}>
            <Text>Start Animation</Text>
        </Pressable>
    </View>
    )
}

export default Account;