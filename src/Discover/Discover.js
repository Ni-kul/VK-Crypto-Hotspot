// Discover
import React, { useEffect, useState } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import Modal from "react-native-modal";
import { View, Image, Text, TouchableOpacity, ScrollView, alert, TextInput, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native';
import { styles } from './styles';
import { Homeget } from '../API';
import { globalstyles } from '../globalstyles';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import WebView from 'react-native-webview';

export default function Discover({ navigation }) {

    const [searchtxt, setsearchtxt] = useState('');
    const [searchurl, setsearchurl] = useState('');
    const [loading, setLoading] = useState(false);
    const [newsdata, setnewsdata] = useState([]);
    const [isScannerVisible, setScannerVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);

    const { t } = useTranslation();
    useEffect(() => {
        navigation.addListener('focus', async () => {
            ToNewsget();
            requestCameraPermission();
        });
    }, []);

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs access to your camera to scan QR codes',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission granted');
            } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
                console.log('Camera permission denied');
                Alert.alert(
                    'Permission Denied',
                    'You need to enable camera permission from the settings to scan QR codes.'
                );
            } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                console.log('Permission permanently denied');
                Alert.alert(
                    'Permission Denied',
                    'You have permanently denied the camera permission. Please go to settings to enable it.'
                );
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const onSuccess = (e) => {
        // Handle the QR code result here
        Alert.alert('QR Code Scanned', e.data);
        setScannerVisible(false); // Close the scanner after a successful scan
    };

    const openScanner = () => {
        // openCamera();
        setModalVisible(true);
        setScannerVisible(true);
    };

    const ToNewsget = async () => {
        const apiUrl = global.userLanguagetype.startsWith('en-')
            ? 'https://crypto.gamenewsapi.com/crypto/news?bid=app.cc.com&page=1'
            : 'https://crypto.gamenewsapi.com/crypto/home?bid=app.cc.com&page=1';

        setLoading(true);
        const response = await Homeget(apiUrl);
        // console.log('apiUrl', apiUrl)
        // console.log('newsget response--', response);
        setLoading(false);
        if (response.code == 200) {
            setnewsdata(response.data)
        } else {
            console.log('news response.code', response.code)
        }
    }

    const Tosearch = () => {
        if (searchtxt != '') {
            // setnewsdata([]);
            const searchLower = searchtxt.toLowerCase();  // Ensure searchLower is defined

            const isUrl = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(searchLower);

            if (isUrl) {
                // If the search text is a URL,
                setsearchurl(searchLower);
                console.log('searchurl (direct):', searchLower)
                openmodalurl();
            } else {

                const filteredData = newsdata.filter(item => {
                    // Convert each field to lower case for case-insensitive comparison
                    const titleLower = item.title ? item.title.toLowerCase() : '';
                    const contentLower = item.content ? item.content.toLowerCase() : '';
                    const createtimeLower = item.createtime ? item.createtime.toLowerCase() : '';
                    // const targeturlLower = item.targeturl ? item.targeturl.toLowerCase() : '';

                    // console.log('Title:', titleLower);
                    // console.log('Content:', contentLower);
                    // console.log('Createtime:', createtimeLower);
                    // console.log('URL:', targeturlLower);

                    // Check if search text matches any of the fields
                    const isMatch = [
                        titleLower.includes(searchLower),
                        contentLower.includes(searchLower),
                        createtimeLower.includes(searchLower),
                        // targeturlLower.includes(searchLower)
                    ].some(Boolean); // Use .some to check if any field matches

                    return isMatch;
                });
                // console.log('filteredData', filteredData)
                setnewsdata(filteredData);
            }
        } else {
            console.log('ddfsdf');
            // setnewsdata(newsdata)
        }
    }

    const openmodal = () => {
        setModalVisible(true);
    }
    const closemodal = () => {
        setModalVisible(false);
    }
    const closemodalTap = () => {
        setScannerVisible(false)
        setModalVisible(false);
    }

    // isModalVisible2
    const openmodalurl = () => {
        setModalVisible2(true);
    }
    const closemodalurl = () => {
        setModalVisible2(false);
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

                    <TextInput
                        style={styles.inputtxt}
                        placeholder={t('Enter a DAapp name or URL')}
                        placeholderTextColor='#c3c3c3'
                        value={searchtxt}
                        onChangeText={(text) => setsearchtxt(text)}
                        onSubmitEditing={Tosearch}
                    />

                    <Image resizeMode='contain' source={require('../../Images/search.png')} style={styles.searchimg} />

                    {isScannerVisible == false &&
                        <TouchableOpacity style={styles.scannerview} onPress={openScanner}>
                            <Image resizeMode='contain' source={require('../../Images/scanner.png')} style={styles.scannerimg} />
                        </TouchableOpacity>
                    }

                    {/* <TouchableOpacity style={styles.scannerview}>
                        <Text style={styles.zerotxt}>0</Text>
                    </TouchableOpacity> */}

                </View>


                {/* <Text style={styles.txt1}>{ }</Text> */}
                {/* <Image resizeMode='stretch' source={require('../../Images/s1.png')} style={styles.s1img} /> */}

                <View style={{ marginBottom: 20 }}>
                    {newsdata.length > 0 ?
                        newsdata.map((data, index) => (

                            <View key={index} style={styles.fiveview}>
                                <View style={styles.viewsix}>
                                    {/* <Text style={styles.txt5}>{data.title}</Text> */}
                                    {/* <Text style={styles.txt6}>{data.createtime}</Text> */}
                                </View>
                                <Image resizeMode='stretch' source={{ uri: data.image }} style={styles.imgone} />
                            </View>
                        ))
                        :
                        <Text style={styles.notetxt}>{t('Data not found')}</Text>
                    }
                </View>




            </ScrollView>



            <Modal isVisible={isModalVisible} onBackButtonPress={closemodalTap} onBackdropPress={closemodalTap} style={{ margin: 0, justifyContent: 'center', }}>
                <View style={styles.mview1}>
                    <QRCodeScanner
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.off}
                        topContent={
                            <Text style={styles.mtext}>
                                {t('Scan your QR code')}
                            </Text>
                        }
                        bottomContent={
                            <TouchableOpacity
                                style={styles.buttonTouchable}
                                onPress={() => closemodalTap()}>
                                <Text style={styles.mtext}>{t('Cancel')}</Text>
                            </TouchableOpacity>
                        }
                    />
                </View>
            </Modal>


            {/* isModalVisible2 */}
            <Modal isVisible={isModalVisible2} onBackButtonPress={closemodalurl} onBackdropPress={closemodalurl} style={{ margin: 0, justifyContent: 'center', }}>

                <View style={styles.mview1}>

                    <TouchableOpacity style={styles.mbackview} onPress={closemodalurl}>
                        <Image resizeMode='stretch' source={require('../../Images/back1.png')} style={styles.back1} />
                    </TouchableOpacity>
                    {searchurl &&
                        <WebView
                            source={{ uri: searchurl }}
                            style={{ flex: 1, }}
                        />
                    }
                </View>
            </Modal>
        </View>
    )
}
