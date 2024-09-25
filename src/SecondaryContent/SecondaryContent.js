// SecondaryContent  -- Home screen Secondary Content 
import React, { useEffect, useState } from 'react';
import Share from 'react-native-share';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';

import { styles } from './styles';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function SecondaryContent({ navigation, route }) {

    const [isLiked, setisLiked] = useState(false);
    const [likeCount, setlikeCount] = useState(0);
    const [reviewtxt, setreviewtxt] = useState('');
    const [reviews, setReviews] = useState([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [isStarred, setIsStarred] = useState(false);

    const { t } = useTranslation();

    const routedata = route.params;
    // console.log('routedata', routedata)
    const itemId = global.userLanguagetype.startsWith('en-') ? routedata.source.id : routedata.id;




    useEffect(() => {
        const checkLikedStatus = async () => {
            try {
                const storedReviews = await AsyncStorage.getItem('reviews');
                const likedIds = await AsyncStorage.getItem('likedItems');

                if (storedReviews) {
                    const reviewsArray = JSON.parse(storedReviews);
                    setReviews(reviewsArray);
                    // Calculate review count for the current item
                    const count = reviewsArray.filter(review => review.id === itemId).length;
                    setReviewCount(count);
                }

                if (likedIds) {
                    const likedArray = JSON.parse(likedIds);

                    // Determine the correct ID based on global user language type
                    // const itemId = global.userLanguagetype.startsWith('en-') ? routedata.source.id : routedata.id;

                    // Check if the current item is liked
                    if (likedArray.includes(itemId)) {
                        setisLiked(true);
                    }

                    // Set the like count based on the number of liked items
                    setlikeCount(likedArray.length);
                }
            } catch (error) {
                console.error('Error checking liked status:', error);
            }
        };

        checkLikedStatus();
    }, [routedata.source.id, routedata.id]);


    const handleLike = async (id) => {
        // console.log('id', id)
        try {
            const likedIds = await AsyncStorage.getItem('likedItems');
            let likedArray = likedIds ? JSON.parse(likedIds) : [];

            if (isLiked) {
                // If the item is already liked, remove the ID from storage
                likedArray = likedArray.filter(likedId => likedId !== id);

                // console.log('Removing ID:', id); // Debugging remove logic
                // console.log('Updated likedArray after removal:', likedArray); // Check after removal
            } else {
                // If the item is not liked, add the ID to storage
                likedArray.push(id);

                // console.log('Adding ID:', id); // Debugging add logic
                // console.log('Updated likedArray after adding:', likedArray); // Check after addition
            }

            // Save the updated liked array to AsyncStorage
            await AsyncStorage.setItem('likedItems', JSON.stringify(likedArray));

            // Toggle the like state
            setisLiked(!isLiked);

            // Update the like count based on the length of liked items
            setlikeCount(likedArray.length);
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };




    const TogoBack = () => {
        navigation.goBack();
    }

    const handleShare = async () => {
        try {
            const shareOptions = {
                title: 'Share Title',
                message: routedata.title,
                // url: 'https://example.com', // URL or path to the content you want to share
                // You can add more options like social media platforms here
            };
            await Share.open(shareOptions);
        } catch (error) {
            console.log('Share Error:', error);
        }
    };


    const getIdToUse = () => {
        return global.userLanguagetype.startsWith('en-') ? routedata.source.id : routedata.id;
    };


    const handleReviewSubmit = async () => {
        if (reviewtxt.trim() === '') {
            console.log('Review text is empty');
            return;
        }

        try {
            const newReview = { id: itemId, text: reviewtxt };
            const updatedReviews = [...reviews, newReview];
            await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
            setReviews(updatedReviews);
            setreviewtxt('');  // Clear the review input field

            // Update review count
            const count = updatedReviews.filter(review => review.id === itemId).length;
            setReviewCount(count);
            Alert.alert('Your review has been submitted successfully!');
        } catch (error) {
            console.error('Error saving review:', error);
        }
    };

    const handleStarPress = () => {
        // Toggle the state
        setIsStarred(!isStarred);
    };

    const removeItem = async () => {
        try {
            await AsyncStorage.removeItem('likedItems');
            await AsyncStorage.removeItem('reviews');
            console.log(`${'likedItems'} removed from AsyncStorage`);
        } catch (error) {
            console.error('Error removing item from AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.viewone}>
            <ScrollView >

                <View style={styles.viewtwo}>
                    <TouchableOpacity onPress={TogoBack}>
                        <Image resizeMode='contain' source={require('../../Images/back1.png')} style={styles.backarrow} />
                    </TouchableOpacity>
                    <Text style={styles.hadtxt}>{t('Finance and economics')}</Text>
                </View>

                <View style={styles.viewthree}>

                    <Text style={styles.txt1}>{routedata.title}</Text>

                    <View style={styles.view4}>
                        {
                            global.userLanguagetype.startsWith('en-') ?
                                <Text style={styles.txt2}>{moment(routedata.publishedAt).fromNow()}</Text>
                                :
                                <Text style={styles.txt2}>{moment(routedata.createtime).fromNow()}</Text>
                        }
                        < View style={styles.view5}>
                            <Image resizeMode='contain' source={require('../../Images/fire.png')} style={styles.fireimg} />
                            <Text style={styles.txt2}> 454545454</Text>
                        </View>
                    </View>

                    <Text style={styles.txt3}>{routedata.content}</Text>
                </View>

            </ScrollView >

            <View style={styles.viewsix}>
                <View style={styles.view7}>
                    <TextInput
                        style={styles.inputtxt}
                        placeholder='Write a review'
                        placeholderTextColor='#c3c3c3'
                        value={reviewtxt}
                        onChangeText={(text) => setreviewtxt(text)}
                        onEndEditing={handleReviewSubmit}
                    />
                    <TouchableOpacity >
                        <Image resizeMode='contain' source={require('../../Images/msg.png')} style={styles.smsimg} />
                        {reviewCount > 0 && <Text style={styles.likeCountText}>{reviewCount}</Text>}
                    </TouchableOpacity>

                </View>


                <View style={styles.view8}>
                    <TouchableOpacity onPress={() => handleLike(getIdToUse())} style={{ position: 'relative' }}>
                        <Image resizeMode='contain'
                            source={require('../../Images/like.png')} style={styles.likeimg} />
                        {likeCount > 0 && <Text style={styles.likeCountText}>{likeCount}</Text>}
                    </TouchableOpacity>


                    <TouchableOpacity onPress={handleStarPress}>
                        <Image resizeMode='contain' source={isStarred ? require('../../Images/star1.png') : require('../../Images/star.png')} style={styles.likeimg} />

                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleShare}>
                        <Image resizeMode='contain' source={require('../../Images/share.png')} style={styles.shareimg} />
                    </TouchableOpacity>

                    <TouchableOpacity >
                        <Image resizeMode='contain' source={require('../../Images/toolmenu.png')} style={styles.menuimg} />
                    </TouchableOpacity>
                </View>

            </View>

        </View >
    )
}


{/* <View>
                {reviews.filter(review => review.id === itemId).map((review, index) => (
                    <View key={index} style={styles.reviewContainer}>
                        <Text style={styles.reviewText}>{review.text}</Text>
                    </View>
                ))}
            </View> */}