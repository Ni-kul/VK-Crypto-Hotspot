// Homescreen
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper'
import { getLocales } from "react-native-localize";
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import DatePicker from 'react-native-date-picker'
import { styles } from './styles';
import { globalstyles } from '../globalstyles';
import { Homeget } from '../API';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

export default function Homescreen({ navigation }) {

    const [searchtxt, setsearchtxt] = useState('');
    const [date, setdate] = useState(null)
    const [open, setopen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [homedata, sethomedata] = useState([]);

    const { t } = useTranslation();

    const swiperdata = [
        { img: require('../../Images/s1.png') },
        { img: require('../../Images/s1.png') },
        { img: require('../../Images/s1.png') },
        { img: require('../../Images/s1.png') },
    ]

    // [{"countryCode": "US", "isRTL": false, "languageCode": "en", "languageTag": "en-US"}]

    useEffect(() => {
        navigation.addListener('focus', async () => {
            ToHomeget();
            // const locales = getLocales();
            // if (locales.length > 0) {
            //     const userLanguage = locales[0].languageTag; // e.g., 'en-US'
            //     setSystemLanguage(userLanguage);
            //     console.log('User Language:', userLanguage);
            // }
            // console.log('-----', global.userLanguagetype);
        });
    }, []);

    const ToSecondaryContent = (data) => {
        navigation.navigate('SecondaryContent', data)
    }

    const ToHomeLeveltwo = () => {
        navigation.navigate('HomeLeveltwo')
    }


    const ToHomeget = async () => {

        const apiUrl = global.userLanguagetype.startsWith('en-')
            ? ('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=' + global.APIkey)
            : 'https://v1.adjustapi.com/crypto/contentlist';

        setLoading(true);
        const response = await Homeget(apiUrl);
        // const response = await Homeget('https://crypto.gamenewsapi.com/crypto/home?bid=app.cc.com&page=1');
        // console.log('Homeget response--', response);
        setLoading(false);
        if (global.userLanguagetype.startsWith('en-')) {

            if (response.status == 'ok') {
                sethomedata(response.articles)
            } else {
                console.log('response.status', response.status)
            }
        } else {
            sethomedata(response.data);
            console.log('data')
        }
    }



    return (
        <View style={styles.viewone}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView >

                {/* <View style={styles.viewtwo}>

                    <TextInput
                        style={styles.inputtxt}
                        placeholder={t('Proposed new capital resk framework for stablecoin')}
                        placeholderTextColor='#c3c3c3'
                        value={searchtxt}
                        onChangeText={(text) => setsearchtxt(text)}
                    />

                    <TouchableOpacity style={styles.calendarview} onPress={() => setopen(true)}>
                        <Image resizeMode='contain' source={require('../../Images/calendar2.png')} style={styles.calendarimg} />
                        <DatePicker
                            modal
                            mode={'date'}
                            open={open}
                            date={date || new Date()}
                            onConfirm={(date) => {
                                setopen(false)
                                setdate(date)
                            }}
                            onCancel={() => {
                                setopen(false)
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.notifiactionview} >
                        <Image resizeMode='contain' source={require('../../Images/notifiaction.png')} style={styles.notifiactionimg} />
                    </TouchableOpacity> 

                </View> */}

                {/* {date && {date.toDateString()}} */}
                <Text style={styles.txt1}>{t('Finance and economics')}</Text>

                <Swiper style={styles.swiperwrapper} showsButtons={false}
                    dot={<View style={styles.dotstyle} />}
                    activeDot={<View style={styles.activdotstyle} />}>
                    {swiperdata.map((item, index) => (
                        <Image key={index} resizeMode='stretch' source={item.img} style={styles.slide} />
                    ))}
                </Swiper>

                <View style={styles.view2}>

                    {/* <TouchableOpacity style={styles.threeview} onPress={ToHomeLeveltwo}>
                        <View style={styles.viewfour}>
                            <Text style={styles.txt2}>Chife editor recommendation</Text>
                            <TouchableOpacity>
                                <Image resizeMode='contain' source={require('../../Images/toolmenu.png')} style={styles.toolmenuimg} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.txt3}>pump.fun knows how to take advantage of human nature Pantera Capital:Why did we invest in aPriri </Text>
                        <Text style={styles.txt4}>More than 250 active projects in 6 categories Solana Eco-Latest Panorama ...</Text>

                    </TouchableOpacity> */}

                    {global.userLanguagetype.startsWith('en-') ?
                        homedata.map((data, index) => (

                            <TouchableOpacity key={index} onPress={() => ToSecondaryContent(data)} style={styles.fiveview}>
                                <View style={styles.viewsix}>
                                    <Text style={styles.txt5}>{data.title}</Text>
                                    <Text style={styles.txt6}>{moment(data.publishedAt).fromNow()}</Text>
                                </View>
                                <Image resizeMode='stretch' source={{ uri: data.urlToImage }} style={styles.imgone} />
                            </TouchableOpacity>
                        ))

                        :

                        (homedata.map((data, index) => (

                            <TouchableOpacity key={index} onPress={() => ToSecondaryContent(data)} style={styles.fiveview}>
                                <View style={styles.viewsix}>
                                    <Text style={styles.txt5}>{data.title}</Text>
                                    <Text style={styles.txt6}>{moment(data.createtime).fromNow()}</Text>
                                </View>
                                <Image resizeMode='stretch' source={{ uri: data.image }} style={styles.imgone} />
                            </TouchableOpacity>
                        )))
                    }
                </View>

            </ScrollView>
        </View>
    )
}
