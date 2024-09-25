// CurrencyChart
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { styles } from './styles';
import { LineChart, } from "react-native-gifted-charts";
import { Homeget } from '../API';
import { globalstyles } from '../globalstyles';

export default function CurrencyChart({ navigation, route }) {

    const [loading, setLoading] = useState(false);

    const routedata = route.params
    // console.log('routedata C', routedata)
    // useEffect(() => {
    //     navigation.addListener('focus', async () => {

    //     });
    // }, []);

    const datascroll = [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
    ]

    const ToBack = () => {
        navigation.goBack()
    }

    const handleShare = async () => {
        try {
            const shareOptions = {
                title: 'Share Title',
                message: JSON.stringify(routedata, null, 2),
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
            {/* <ScrollView > */}

            <View style={styles.viewtwo}>
                <TouchableOpacity onPress={ToBack}>
                    <Image resizeMode='contain' source={require('../../Images/back1.png')} style={styles.backimg} />
                </TouchableOpacity>

                <View style={styles.view3}>
                    <TouchableOpacity style={styles.noteimgview}>
                        <Image resizeMode='contain' source={require('../../Images/ww.png')} style={styles.noteimg} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noteimgview}>
                        <Image resizeMode='contain' source={require('../../Images/qq.png')} style={styles.noteimg} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noteimgview}>
                        <Image resizeMode='contain' source={require('../../Images/ww.png')} style={styles.noteimg} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.noteimgview} onPress={() => handleShare()}>
                        <Image resizeMode='contain' source={require('../../Images/share.png')} style={styles.shareimg} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={styles.view4}>
                    <Text style={styles.txt1}>fsdfsd fsdf</Text>
                </View> */}

            {/* <View style={styles.view5}>
                    <Image resizeMode='contain' source={{ uri: routedata.image }} style={styles.shareimg} />
                    <View style={styles.view6}>
                        <Text style={styles.txt2}>{routedata.symbol}</Text>
                        <Text style={styles.txt3}>{routedata.name}</Text>
                    </View>
                </View> */}

            {/* <View style={styles.view7}>
                    <Text style={styles.txt4}>Y{routedata.max_supply}</Text>
                    <View style={styles.view8}>
                        <Text style={styles.txt5}>+{routedata.market_cap_rank}%</Text>
                    </View>
                </View> */}

            {/* <Text style={styles.txt6}>={routedata.high_24h}</Text>

                <Text style={styles.txt7}>+{routedata.low_24h}</Text> */}

            {/* <ScrollView horizontal={true} >
                    {datascroll.map((data, index) => (

                        <TouchableOpacity key={index} style={styles.view9}>
                            <Text style={styles.txt8}>coin pro</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView> */}


            <View style={{ flex: 1, marginVertical: 1, }}>
                <WebView
                    source={{ uri: 'https://www.coingecko.com/en/coins/bitcoin' }}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </View>

            {/* </ScrollView> */}

        </View>
    )
}
