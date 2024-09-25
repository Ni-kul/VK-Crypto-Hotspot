import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Homescreen from './src/Homescreen/Homescreen';
import Flash from './src/Flash/Flash';
import Market from './src/Market/Market';
import Discover from './src/Discover/Discover';
import { globalstyles } from './src/globalstyles';
import { styles } from './src/Homescreen/styles';
import SecondaryContent from './src/SecondaryContent/SecondaryContent';
import HomeLeveltwo from './src/HomeLeveltwo/HomeLeveltwo';
import { getLocales } from "react-native-localize";
import CurrencyChart from './src/CurrencyChart/CurrencyChart';
import FlashSecond from './src/FlashSecond/FlashSecond';
import { useTranslation } from 'react-i18next';
import { LanguageProvider } from './LanguageContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// global.URL = 'https://crypto.gamenewsapi.com/crypto/home?bid=app.cc.com&page=2'
global.APIkey = '008c9fb9d3b54dd5ac398eca3735340c';

// function HomeTab() {
//   return (
//     <Stack.Navigator initialRouteName="Dashboard">
//       <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
//       <Stack.Screen name="ListofCategories" component={ListofCategories} options={{ headerShown: false }} />
//       <Stack.Screen name="Viewdetails" component={Viewdetails} options={{ headerShown: false }} />
//       <Stack.Screen name="PopularDeals" component={PopularDeals} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   );
// }

function TabNavigator() {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 60,
      },

    }} >
      <Tab.Screen name="Homescreen" component={Homescreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[focused ? globalstyles.hometabfocusview : globalstyles.hometabview]}>
              <Image resizeMode='contain' source={focused ? require('./Images/home1.png') : require('./Images/home2.png')}
                style={globalstyles.hometabimg}
              />
              <Text style={[globalstyles.hometabtxt, { color: focused ? '#ffb000' : '#002408' }]}>{t('Home')}</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen name="Market" component={Market}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[focused ? globalstyles.discovertabfocusview : globalstyles.hometabview]}>
              <Image resizeMode='contain' source={focused ? require('./Images/market1.png') : require('./Images/market2.png')}
                style={globalstyles.hometabimg}
              />
              <Text style={[globalstyles.hometabtxt, { color: focused ? '#ffb000' : '#000000' }]}>{t('Market')}</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen name="Flash" component={Flash}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[focused ? globalstyles.hometabfocusview : globalstyles.hometabview]}>
              <Image resizeMode='contain' source={focused ? require('./Images/flash1.png') : require('./Images/flash2.png')}
                style={globalstyles.hometabimg}
              />
              <Text style={[globalstyles.hometabtxt, { color: focused ? '#ffb000' : '#000000' }]}>{t('Flash')}</Text>
            </View>
          ),
        }}
      />

      <Tab.Screen name="Discover" component={Discover}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[focused ? globalstyles.discovertabfocusview : globalstyles.hometabview]}>
              <Image resizeMode='contain' source={focused ? require('./Images/discover2.png') : require('./Images/discover2.png')}
                style={globalstyles.hometabimg}
              />
              <Text style={[globalstyles.hometabtxt, { color: focused ? '#ffb000' : '#000000' }]}>{t('Discover')}</Text>
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  )
}

export default function App() {



  const locales = getLocales();
  if (locales.length > 0) {
    const userLanguage = locales[0].languageTag; // e.g., 'en-US'
    global.userLanguagetype = (userLanguage);
    // console.log('User Language:', userLanguage,);
  }

  return (
    // <Text>fdfdff </Text>
    <LanguageProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={false} initialRouteName="Homescreen">

          <Stack.Screen name="Homescreen" component={TabNavigator} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Flash" component={Flash} options={{ headerShown: false }} /> */}
          {/*Home screen Secondary Content HomeLeveltwo CurrencyChart FlashSecond*/}
          <Stack.Screen name="SecondaryContent" component={SecondaryContent} options={{ headerShown: false }} />
          <Stack.Screen name="HomeLeveltwo" component={HomeLeveltwo} options={{ headerShown: false }} />
          <Stack.Screen name="CurrencyChart" component={CurrencyChart} options={{ headerShown: false }} />
          <Stack.Screen name="FlashSecond" component={FlashSecond} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );


}



