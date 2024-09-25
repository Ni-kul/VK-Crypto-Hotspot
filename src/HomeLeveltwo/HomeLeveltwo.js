// HomeLeveltwo
import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Share from 'react-native-share';
import { styles } from './styles';
import { globalstyles } from '../globalstyles';

export default function HomeLeveltwo({ navigation }) {

    const [searchtxt, setsearchtxt] = useState('');
    const [date, setdate] = useState(null)
    const [open, setopen] = useState(false)

    const swiperdata = [
        { img: require('../../Images/s1.png') },
        { img: require('../../Images/s1.png') },
        { img: require('../../Images/s1.png') },
    ]

    const Togoback = () => {
        navigation.goBack();
    }

    const ToSecondaryContent = () => {
        navigation.navigate('SecondaryContent')
    }
    const handleShare = async () => {
        try {
            const shareOptions = {
                title: 'Share Title',
                message: 'This is a sample message to share.',
                url: 'https://example.com', // URL or path to the content you want to share
                // You can add more options like social media platforms here
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Share Error:', error);
        }
    };

    return (
        <View style={styles.viewone}>
            <ScrollView >

                <Image resizeMode='stretch' source={require('../../Images/HomeLevel2.png')} style={styles.imgone} />

                <TouchableOpacity style={styles.backbtn} onPress={Togoback}>
                    <Image resizeMode='contain' source={require('../../Images/back1.png')} style={styles.backimg} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.sharebtn} onPress={handleShare}>
                    <Image resizeMode='contain' source={require('../../Images/share.png')} style={styles.shareimg} />
                </TouchableOpacity>


                <View style={styles.view2}>

                    {swiperdata.map((data, index) => (

                        <TouchableOpacity key={index} onPress={ToSecondaryContent} style={styles.view3}>
                            <View style={styles.view4}>
                                <Text style={styles.txt1}>--Understand Base based L3 game chain B3-- Understand Base based L3 game chain B3</Text>
                                <View style={styles.view5}>
                                    <Text style={styles.txt2}>Golden Finance</Text>
                                    <Text style={styles.txt3}>3 hours ago</Text>
                                </View>
                            </View>
                            <Image resizeMode='stretch' source={require('../../Images/HomePage.png')} style={styles.imgtwo} />
                        </TouchableOpacity>
                    ))}


                </View>
            </ScrollView>
        </View>
    )
}
