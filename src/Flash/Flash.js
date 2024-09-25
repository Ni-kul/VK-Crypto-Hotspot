// Flash
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Share from 'react-native-share';
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { styles } from './styles';
import { Homeget } from '../API';
import { globalstyles } from '../globalstyles';
import { useTranslation } from 'react-i18next';

export default function Flash({ navigation }) {

    const [currentshow, setcurrentshow] = useState(1);
    const [selected, setSelected] = useState('');
    const [isCalendarVisible, setIsCalendarVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM-DD'));

    const [loading, setLoading] = useState(false);
    const [flashdata, setflashdata] = useState([]);

    const { t } = useTranslation();


    useEffect(() => {
        navigation.addListener('focus', async () => {
            Toflash();
        });
    }, []);

    const Toflash = async () => {

        const apiUrl = global.userLanguagetype.startsWith('en-')
            ? 'https://apis.soccernetnews.com/crypto/flash?v=v1'
            : 'https://v1.adjustapi.com/crypto/fastnews';

        setLoading(true);
        const response = await Homeget(apiUrl);
        // console.log('flash response--', response);
        setLoading(false);
        if (global.userLanguagetype.startsWith('en-')) {
            if (response.code == 200) {
                setflashdata(response.data)
            } else {
                console.log('flash response.code', response.code)
            }
        } else {
            setflashdata(response.list)
        }
    }

    const toggleCalendarVisibility = () => {
        setIsCalendarVisible(true);
        setcurrentshow(2)
    };

    const toggleCalendarflash = () => {
        setIsCalendarVisible(false);
        setcurrentshow(1)
    };

    const handleCancel = () => {
        setIsCalendarVisible(false);
        setcurrentshow(1);
    };

    const handleOk = () => {
        setIsCalendarVisible(false);
        setcurrentshow(1);
        // console.log("Selected Date:", selected);
    };

    const handleMonthChange = (direction) => {
        // console.log('direction', direction)
        const newMonth = direction === 'prev'
            ? moment(currentMonth).subtract(1, 'month').format('YYYY-MM-DD')
            : moment(currentMonth).add(1, 'month').format('YYYY-MM-DD');
        // console.log('newMonth', newMonth)
        setCurrentMonth(newMonth);
    };

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

    const ToFlashSecond = (data) => {
        navigation.navigate('FlashSecond', data)
    }

    return (
        <View style={styles.viewone}>
            {loading ?
                <View style={globalstyles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <ScrollView >

                <View style={styles.viewtwo}>

                    <TouchableOpacity onPress={() => toggleCalendarflash()}>
                        <Text style={[styles.txt1, { color: currentshow == 1 ? '#ffb000' : '#000000' }]}>{t('flash')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleCalendarVisibility()}>
                        <Text style={[styles.txt1, { color: currentshow == 2 ? '#ffb000' : '#000000' }]}>{t('Calendar')}</Text>
                    </TouchableOpacity>

                </View>

                {currentshow === 2 && isCalendarVisible && (
                    <View>

                        <Calendar
                            current={currentMonth}
                            onDayPress={day => {
                                setSelected(day.dateString);
                                // setIsCalendarVisible(false); // Hide calendar after selecting a date
                                // setcurrentshow(1); // Switch back to flash after selecting date
                            }}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                textSectionTitleColor: '#b6c1cd',
                                selectedDayBackgroundColor: '#BABABA',
                                selectedDayTextColor: '#ffb000',
                                todayTextColor: '#ffb000',
                                dayTextColor: '#2d4150',
                                monthTextColor: '#000000', // Color of the month text
                            }}
                            markedDates={{
                                [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' },
                            }}
                        // renderHeader={(date) => {
                        //     const formattedDate = moment(currentMonth).format('MMMM YYYY'); // Format using moment
                        //     // const formattedDate = moment(date).format('MMMM YYYY'); // Format using moment
                        //     return (
                        //         <View style={styles.calendarHeader}>
                        //             <TouchableOpacity onPress={() => handleMonthChange('prev')}>
                        //                 <Image source={require('../../Images/left.png')} style={styles.arrow} />
                        //             </TouchableOpacity>
                        //             <Text style={styles.headerText}>
                        //                 {formattedDate}
                        //             </Text>
                        //             <TouchableOpacity onPress={() => handleMonthChange('next')}>
                        //                 <Image source={require('../../Images/right.png')} style={styles.arrow} />
                        //             </TouchableOpacity>
                        //         </View>
                        //     );
                        // }}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.cancelText}>{t('Back to today')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.okButton} onPress={handleOk}>
                                <Text style={styles.okbtnText}>{t('OK')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}


                {/* <TouchableOpacity style={styles.searchimgview}>
                    <Image resizeMode='contain' source={require('../../Images/search.png')} style={styles.searchimg} />
                </TouchableOpacity> */}


                <View style={styles.viewthree}>

                    <View style={styles.viewfour}>
                        <Image resizeMode='contain' source={require('../../Images/fire2.png')} style={styles.searchimg} />
                        <Text style={styles.txt2}>-{t('Understand Base based L3 game chain 83')}-</Text>
                        <TouchableOpacity>
                            <Image resizeMode='contain' source={require('../../Images/ra.png')} style={styles.searchimg} />
                        </TouchableOpacity>

                    </View>

                    {global.userLanguagetype.startsWith('en-') ?
                        flashdata.map((data, index) => (

                            <TouchableOpacity key={index} onPress={() => ToFlashSecond(data)}>
                                <Text style={styles.txt3}>{`${moment(data.createtime).format('M')} / ${moment(data.createtime).format('D')} ${moment(data.createtime).format('dddd')}`}</Text>

                                <View style={styles.viewfive}>
                                    <Text style={styles.txt4}>{moment(data.createtime).format('HH:mm')}</Text>
                                    <Text style={styles.txt5}>{data.title}</Text>
                                    <Text style={styles.txt6}>{data.content}</Text>

                                    <TouchableOpacity style={styles.linkview} onPress={() => handlePress(data.targeturl)}>
                                        <Image resizeMode='contain' source={require('../../Images/link.png')} style={styles.linkimg} />
                                        <Text style={styles.txt7}>{t('Original link')}</Text>
                                    </TouchableOpacity>

                                    <View style={styles.fourbtnview}>
                                        <TouchableOpacity style={styles.positivebtn}>
                                            <Image resizeMode='contain' source={require('../../Images/33.png')} style={styles.positiveimg} />
                                            <Text style={styles.txt8}>{t('positive')} 321</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.positivebtn}>
                                            <Image resizeMode='contain' source={require('../../Images/333.png')} style={styles.positiveimg} />
                                            <Text style={styles.txt9}>{t('negative')} 122</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.positivebtn}>
                                            <Image resizeMode='contain' source={require('../../Images/msg.png')} style={styles.reviewimg} />
                                            <Text style={styles.txt9}>{t('review')}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.positivebtn} onPress={() => handleShare(data.title)}>
                                            <Image resizeMode='contain' source={require('../../Images/share.png')} style={styles.shareimg} />
                                            <Text style={styles.txt9}>{t('Share')}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                        :

                        flashdata && flashdata.length > 0 ? (
                            flashdata.map((dataItem, index) => (
                                <View key={index}>
                                    {/* <Text style={styles.txt3}>
                                    {`${moment(dataItem.date).format('M')} / ${moment(dataItem.created_at_zh).format('D')} ${moment(dataItem.date).format('dddd')}`}
                                </Text> */}

                                    {/* Loop through the lives array inside each list item */}
                                    {dataItem.lives && dataItem.lives.length > 0 ? (
                                        dataItem.lives.map((liveItem, liveIndex) => (
                                            <TouchableOpacity key={liveIndex} onPress={() => ToFlashSecond(liveItem)}>
                                                <Text style={styles.txt3}>
                                                    {`${moment(dataItem.date).format('M')} / ${moment(dataItem.created_at_zh).format('D')} ${moment(dataItem.date).format('dddd')}`}
                                                </Text>
                                                <View style={styles.viewfive}>
                                                    <Text style={styles.txt5}>{liveItem.title}</Text>
                                                    <Text style={styles.txt6}>{liveItem.content}</Text>

                                                    {/* Handle the link view */}
                                                    {liveItem.link && (
                                                        <TouchableOpacity style={styles.linkview} onPress={() => handlePress(liveItem.link)}>
                                                            <Image resizeMode='contain' source={require('../../Images/link.png')} style={styles.linkimg} />
                                                            <Text style={styles.txt7}>Original link</Text>
                                                        </TouchableOpacity>
                                                    )}

                                                    {/* Add buttons or other interactions here */}
                                                    <View style={styles.fourbtnview}>
                                                        {/* Positive button */}
                                                        <TouchableOpacity style={styles.positivebtn}>
                                                            <Image resizeMode='contain' source={require('../../Images/33.png')} style={styles.positiveimg} />
                                                            <Text style={styles.txt8}>Positive</Text>
                                                        </TouchableOpacity>

                                                        {/* Negative button */}
                                                        <TouchableOpacity style={styles.positivebtn}>
                                                            <Image resizeMode='contain' source={require('../../Images/333.png')} style={styles.positiveimg} />
                                                            <Text style={styles.txt9}>Negative</Text>
                                                        </TouchableOpacity>

                                                        {/* Review button */}
                                                        <TouchableOpacity style={styles.positivebtn}>
                                                            <Image resizeMode='contain' source={require('../../Images/msg.png')} style={styles.reviewimg} />
                                                            <Text style={styles.txt9}>Review</Text>
                                                        </TouchableOpacity>

                                                        {/* Share button */}
                                                        <TouchableOpacity style={styles.positivebtn} onPress={() => handleShare(liveItem.title)}>
                                                            <Image resizeMode='contain' source={require('../../Images/share.png')} style={styles.shareimg} />
                                                            <Text style={styles.txt9}>Share</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    ) : (
                                        <Text>No lives data available</Text>
                                    )}
                                </View>
                            ))
                        ) : (
                            <Text>No data available</Text>
                        )
                    }




                </View>
            </ScrollView>

        </View>
    )
}
