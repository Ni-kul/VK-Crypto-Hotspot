// FlashSecond
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Share from 'react-native-share';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { styles } from './styles';
import { Homeget } from '../API';
import { globalstyles } from '../globalstyles';

export default function FlashSecond({ navigation, route }) {

    const [currentshow, setcurrentshow] = useState(1);
    const [selected, setSelected] = useState('');
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM-DD'));

    const [loading, setLoading] = useState(false);

    const routedata = route.params
    console.log('routedata', routedata)

    // useEffect(() => {
    //     navigation.addListener('focus', async () => {
    //     });
    // }, []);




    const TogoBack = () => {
        navigation.goBack();
    }



    const handlePress = (url) => {
        Linking.openURL(url).catch((err) => console.error("An error occurred", err));
    };

    const handleShare = async (data) => {
        try {
            const shareOptions = {
                title: 'Share Title',
                message: data,
                // url: 'https://example.com', // URL or path to the content you want to share
                // You can add more options like social media platforms here
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Share Error:', error);
        }
    };

    return (
        <View style={styles.viewone}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView >

                <View style={styles.viewtwo}>

                    <TouchableOpacity onPress={() => TogoBack()}>
                        <Image resizeMode='contain' source={require('../../Images/back1.png')} style={styles.backimg} />
                    </TouchableOpacity>
                    <Text style={styles.hadtxt}>Flash</Text>
                    <TouchableOpacity >
                        <Image resizeMode='contain' source={require('../../Images/toolmenu.png')} style={styles.backimg} />
                    </TouchableOpacity>

                </View>

                <View style={styles.view3}>

                    <Text style={styles.txt1}>{routedata.title}</Text>

                    <View style={styles.view4}>
                        <Text style={styles.txt2}></Text>
                        <StarRatingDisplay
                            rating={4.5}
                        />
                    </View>
                </View>

                <Text style={styles.txt3}>{routedata.content}</Text>

            </ScrollView>

        </View>
    )
}
