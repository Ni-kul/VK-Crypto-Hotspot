// Market
import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { Homeget } from '../API';
import { globalstyles } from '../globalstyles';
import { useTranslation } from 'react-i18next';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function Market() {

    const [searchtxt, setsearchtxt] = useState('');
    const [currentshow, setcurrentshow] = useState(1);
    const [loading, setLoading] = useState(false);
    const [marketdata, setmarketdata] = useState([]);

    const { t } = useTranslation();
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener('focus', async () => {
            Tomarketdata();
        });
    }, []);
    const Tomarketdata = async () => {
        // https://api.jogame.net/crypto/symbols?bid=app.cc.com&limit=30&page=1
        const apiUrl = global.userLanguagetype.startsWith('en-')
            ? 'https://crypto.gamenewsapi.com/crypto/symbols?bid=app.cc.com&limit=30&page=1'
            : 'https://v1.adjustapi.com/crypto/symbols';

        setLoading(true);
        const response = await Homeget(apiUrl);
        // console.log('market response--', response);
        setLoading(false);
        if (response.code == 200) {
            setmarketdata(response.data)
        } else {
            console.log('market response.code', response.code)
        }
    }


    // https://coinmarketcap.com/rankings/exchanges/


    const databtc = [
        { img: require('../../Images/s1.png') },
        { img: require('../../Images/s1.png') },
    ]

    const ToCurrencyCharttt = (data) => {
        navigation.navigate('CurrencyChart', data)
    }

    const coinLinks = [
        { name: "bitcoin", url: "https://www.coingecko.com/en/coins/bitcoin" },
        { name: "ethereum", url: "https://www.coingecko.com/en/coins/ethereum" },
        { name: "tether", url: "https://www.coingecko.com/en/coins/tether" },
        { name: "bnb", url: "https://www.coingecko.com/en/coins/bnb" },
        { name: "solana", url: "https://www.coingecko.com/en/coins/solana" },
        { name: "usdc", url: "https://www.coingecko.com/en/coins/usdc" },
        { name: "xrp", url: "https://www.coingecko.com/en/coins/xrp" },
        { name: "Lido Staked Ether", url: "https://www.coingecko.com/en/coins/lido-staked-ether" },
        { name: "dogecoin", url: "https://www.coingecko.com/en/coins/dogecoin" },
        { name: "toncoin", url: "https://www.coingecko.com/en/coins/toncoin" },
        { name: "tron", url: "https://www.coingecko.com/en/coins/tron" },
        { name: "cardano", url: "https://www.coingecko.com/en/coins/cardano" },
        { name: "avalanche", url: "https://www.coingecko.com/en/coins/avalanche" },
        { name: "Wrapped stETH", url: "https://www.coingecko.com/en/coins/wrapped-steth" },
        { name: "Wrapped Bitcoin", url: "https://www.coingecko.com/en/coins/wrapped-bitcoin" },
        { name: "Shiba Inu", url: "https://www.coingecko.com/en/coins/shiba-inu" },
        { name: "weth", url: "https://www.coingecko.com/en/coins/weth" },
        { name: "chainlink", url: "https://www.coingecko.com/en/coins/chainlink" },
        { name: "Bitcoin Cash", url: "https://www.coingecko.com/en/coins/bitcoin-cash" },
        { name: "polkadot", url: "https://www.coingecko.com/en/coins/polkadot" },
        { name: "LEO Token", url: "https://www.coingecko.com/en/coins/leo-token" },
        { name: "dai", url: "https://www.coingecko.com/en/coins/dai" },
        { name: "uniswap", url: "https://www.coingecko.com/en/coins/uniswap" },
        { name: "litecoin", url: "https://www.coingecko.com/en/coins/litecoin" },
        { name: "NEAR Protocol", url: "https://www.coingecko.com/en/coins/near" },
        { name: "kaspa", url: "https://www.coingecko.com/en/coins/kaspa" },
        { name: "Internet Computer", url: "https://www.coingecko.com/en/coins/internet-computer" },
        { name: "Wrapped eETH", url: "https://www.coingecko.com/en/coins/wrapped-eeth" },
        { name: "artificial-superintelligence-alliance", url: "https://www.coingecko.com/en/coins/artificial-superintelligence-alliance" },
        { name: "pepe", url: "https://www.coingecko.com/en/coins/pepe" },
        { name: "monero", url: "https://www.coingecko.com/en/coins/monero" },
        { name: "aptos", url: "https://www.coingecko.com/en/coins/aptos" },
        { name: "POL (ex-MATIC)", url: "https://www.coingecko.com/en/coins/pol-ex-matic" },
        { name: "Stellar", url: "https://www.coingecko.com/en/coins/stellar" },
        { name: "Ethereum Classic", url: "https://www.coingecko.com/en/coins/ethereum-classic" },
        { name: "sui", url: "https://www.coingecko.com/en/coins/sui" },
        { name: "Ethena USDe", url: "https://www.coingecko.com/en/coins/ethena-usde" },
        { name: "First Digital USD", url: "https://www.coingecko.com/en/coins/first-digital-usd" },
        { name: "stacks", url: "https://www.coingecko.com/en/coins/stacks" },
        { name: "okb", url: "https://www.coingecko.com/en/coins/okb" },
        { name: "bittensor", url: "https://www.coingecko.com/en/coins/bittensor" },
        { name: "cronos", url: "https://www.coingecko.com/en/coins/cronos" },
        { name: "filecoin", url: "https://www.coingecko.com/en/coins/filecoin" },
        { name: "immutable-x", url: "https://www.coingecko.com/en/coins/immutable-x" },
        { name: "aave", url: "https://www.coingecko.com/en/coins/aave" },
        { name: "render", url: "https://www.coingecko.com/en/coins/render" },
        { name: "hedera", url: "https://www.coingecko.com/en/coins/hedera" },
        { name: "injective", url: "https://www.coingecko.com/en/coins/injective" },
        { name: "mantle", url: "https://www.coingecko.com/en/coins/mantle" },
        { name: "arbitrum", url: "https://www.coingecko.com/en/coins/arbitrum" },
        { name: "optimism", url: "https://www.coingecko.com/en/coins/optimism" },
        { name: "vechain", url: "https://www.coingecko.com/en/coins/vechain" },
        { name: "cosmos-hub", url: "https://www.coingecko.com/en/coins/cosmos-hub" },
        { name: "dogwifhat", url: "https://www.coingecko.com/en/coins/dogwifhat" },
        { name: "whitebit", url: "https://www.coingecko.com/en/coins/whitebit" },
        { name: "maker", url: "https://www.coingecko.com/en/coins/maker" },
        { name: "binance-peg-weth", url: "https://www.coingecko.com/en/coins/binance-peg-weth" },
        { name: "The Graph", url: "https://www.coingecko.com/en/coins/the-graph" },
        { name: "THORChain", url: "https://www.coingecko.com/en/coins/thorchain" },
        { name: "Fantom", url: "https://www.coingecko.com/en/coins/fantom" },
        { name: "Bitget Token", url: "https://www.coingecko.com/en/coins/bitget-token" },
        { name: "Rocket Pool ETH", url: "https://www.coingecko.com/en/coins/rocket-pool-eth" },
        { name: "Arweave", url: "https://www.coingecko.com/en/coins/arweave" },
        { name: "Theta Network", url: "https://www.coingecko.com/en/coins/theta-network" },
        { name: "Polygon", url: "https://www.coingecko.com/en/coins/polygon" },
        { name: "Helium", url: "https://www.coingecko.com/en/coins/helium" },
        { name: "Solv Protocol SolvBTC", url: "https://www.coingecko.com/en/coins/solv-protocol-solvbtc" },
        { name: "FLOKI", url: "https://www.coingecko.com/en/coins/floki" },
        { name: "Mantle Staked Ether", url: "https://www.coingecko.com/en/coins/mantle-staked-ether" },
        { name: "Bonk", url: "https://www.coingecko.com/en/coins/bonk" },
        { name: "Quant", url: "https://www.coingecko.com/en/coins/quant" },
        { name: "Algorand", url: "https://www.coingecko.com/en/coins/algorand" },
        { name: "Pyth Network", url: "https://www.coingecko.com/en/coins/pyth-network" },
        { name: "Jupiter", url: "https://www.coingecko.com/en/coins/jupiter" },
        { name: "Gate", url: "https://www.coingecko.com/en/coins/gatetoken" },
        { name: "JasmyCoin", url: "https://www.coingecko.com/en/coins/jasmycoin" },
        { name: "Sei", url: "https://www.coingecko.com/en/coins/sei" },
        { name: "KuCoin", url: "https://www.coingecko.com/en/coins/kucoin-shares" },
        { name: "Bitcoin SV", url: "https://www.coingecko.com/en/coins/bitcoin-sv" },
        { name: "Celestia", url: "https://www.coingecko.com/en/coins/celestia" },
        { name: "MANTRA", url: "https://www.coingecko.com/en/coins/mantra" },
        { name: "Ondo", url: "https://www.coingecko.com/en/coins/ondo" },
        { name: "Lido DAO", url: "https://www.coingecko.com/en/coins/lido-dao" },
        { name: "Renzo Restaked ETH", url: "https://www.coingecko.com/en/coins/renzo-restaked-eth" },
        { name: "Ronin Bridged WETH (Ronin)", url: "https://www.coingecko.com/en/coins/ronin-bridged-weth-ronin" },
        { name: "Core", url: "https://www.coingecko.com/en/coins/core" },
        { name: "Flow", url: "https://www.coingecko.com/en/coins/flow" },
        { name: "BitTorrent", url: "https://www.coingecko.com/en/coins/bittorrent" },
        { name: "ether.fi Staked ETH", url: "https://www.coingecko.com/en/coins/ether-fi-staked-eth" },
        { name: "Fasttoken", url: "https://www.coingecko.com/en/coins/fasttoken" },
        { name: "Brett", url: "https://www.coingecko.com/en/coins/brett-2" },
        { name: "Notcoin", url: "https://www.coingecko.com/en/coins/notcoin" },
        { name: "Klaytn", url: "https://www.coingecko.com/en/coins/klaytn" },
        { name: "PayPal USD", url: "https://www.coingecko.com/en/coins/paypal-usd" },
        { name: "EOS", url: "https://www.coingecko.com/en/coins/eos" },
        { name: "Tokenize Xchange", url: "https://www.coingecko.com/en/coins/tokenize-xchange" },
        { name: "Beam", url: "https://www.coingecko.com/en/coins/beam-2" },
        { name: "USDD", url: "https://www.coingecko.com/en/coins/usdd" },
        { name: "Flare", url: "https://www.coingecko.com/en/coins/flare" },
        { name: "MultiversX", url: "https://www.coingecko.com/en/coins/multiversx" },
    ];

    // const coinLinks = {
    //     Bitcoin: "https://www.coingecko.com/en/coins/Bitcoin",
    //     Ethereum: "https://www.coingecko.com/en/coins/Ethereum",
    //     Tether: "https://www.coingecko.com/en/coins/Tether",
    //     BNB: "https://www.coingecko.com/en/coins/BNB",
    //     Solana: "https://www.coingecko.com/en/coins/Solana",
    //     USDC: "https://www.coingecko.com/en/coins/USDC",
    //     XRP: "https://www.coingecko.com/en/coins/xrp",
    //     LidoStakedEther: "https://www.coingecko.com/en/coins/lido-staked-ether",
    //     Dogecoin: "https://www.coingecko.com/en/coins/Dogecoin",
    //     Toncoin: "https://www.coingecko.com/en/coins/Toncoin",
    //     TRON: "https://www.coingecko.com/en/coins/TRON",
    //     Cardano: "https://www.coingecko.com/en/coins/Cardano",
    //     Avalanche: "https://www.coingecko.com/en/coins/avalanche",
    //     WrappedstETH: "https://www.coingecko.com/en/coins/wrapped-steth",
    //     WrappedBitcoin: "https://www.coingecko.com/en/coins/wrapped-bitcoin",
    //     ShibaInu: "https://www.coingecko.com/en/coins/shiba-inu",
    //     WETH: "https://www.coingecko.com/en/coins/weth",
    //     Chainlink: "https://www.coingecko.com/en/coins/chainlink",
    //     BitcoinCash: "https://www.coingecko.com/en/coins/bitcoin-cash",
    //     Polkadot: "https://www.coingecko.com/en/coins/polkadot",
    //     LEOToken: "https://www.coingecko.com/en/coins/leo-token",
    //     Dai: "https://www.coingecko.com/en/coins/dai",
    //     Uniswap: "https://www.coingecko.com/en/coins/uniswap",
    //     Litecoin: "https://www.coingecko.com/en/coins/litecoin",
    //     NEARProtocol: "https://www.coingecko.com/en/coins/near",
    //     Kaspa: "https://www.coingecko.com/en/coins/kaspa",
    //     InternetComputer: "https://www.coingecko.com/en/coins/internet-computer",
    //     WrappedeETH: "https://www.coingecko.com/en/coins/wrapped-eeth",
    //     ArtificialSuperintelligenceAlliance: "https://www.coingecko.com/en/coins/artificial-superintelligence-alliance",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Monero: "https://www.coingecko.com/en/coins/monero",
    //     Aptos: "https://www.coingecko.com/en/coins/aptos",
    //     POLexMATIC: "https://www.coingecko.com/en/coins/pol-ex-matic",
    //     Stellar: "https://www.coingecko.com/en/coins/stellar",
    //     EthereumClassic: "https://www.coingecko.com/en/coins/ethereum-classic",
    //     Sui: "https://www.coingecko.com/en/coins/sui",
    //     EthenaUSDe: "https://www.coingecko.com/en/coins/ethena-usde",
    //     FirstDigitalUSD: "https://www.coingecko.com/en/coins/first-digital-usd",
    //     Stacks: "https://www.coingecko.com/en/coins/stacks",
    //     OKB: "https://www.coingecko.com/en/coins/okb",
    //     Bittensor: "https://www.coingecko.com/en/coins/bittensor",
    //     Cronos: "https://www.coingecko.com/en/coins/cronos",
    //     Filecoin: "https://www.coingecko.com/en/coins/filecoin",
    //     Immutable: "https://www.coingecko.com/en/coins/immutable-x",
    //     Aave: "https://www.coingecko.com/en/coins/aave",
    //     Render: "https://www.coingecko.com/en/coins/render",
    //     Hedera: "https://www.coingecko.com/en/coins/hedera",
    //     Injective: "https://www.coingecko.com/en/coins/injective",
    //     Mantle: "https://www.coingecko.com/en/coins/mantle",
    //     Arbitrum: "https://www.coingecko.com/en/coins/arbitrum",
    //     Optimism: "https://www.coingecko.com/en/coins/optimism",
    //     VeChain: "https://www.coingecko.com/en/coins/vechain",
    //     CosmosHub: "https://www.coingecko.com/en/coins/cosmos-hub",
    //     dogwifhat: "https://www.coingecko.com/en/coins/dogwifhat",
    //     WhiteBITCoin: "https://www.coingecko.com/en/coins/whitebit",
    //     Maker: "https://www.coingecko.com/en/coins/maker",
    //     'Binance-Peg WETH': "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",
    //     Pepe: "https://www.coingecko.com/en/coins/pepe",



    //     // Add more coins as needed
    // };

    const ToCurrencyChart = (data, navigation) => {
        // Find the coin link object based on the coin name
        const coinName = data.name.toLowerCase();

        // Find the coin link object based on the lowercase coin name
        const coinLink = coinLinks.find(link => link.name === coinName);

        if (coinLink) {
            const coinUrl = coinLink.url;
            // console.log('coinUrl', coinUrl);
            // Navigate to CurrencyChart screen and pass the coin URL
            // navigation.navigate('CurrencyChart', { coinUrl });
            ToCurrencyCharttt(coinUrl)
        } else {
            console.log("No URL found for this coin");
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
                    <TextInput
                        style={styles.inputtxt}
                        placeholder={t('Currency search by contract address is already supported try it out')}
                        placeholderTextColor='#c3c3c3'
                        // multiline={true}
                        value={searchtxt}
                        onChangeText={(text) => setsearchtxt(text)}
                    />

                    {/* <TouchableOpacity style={styles.subview} >
                        <Image resizeMode='contain' source={require('../../Images/noteimg.png')} style={styles.noteimg} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.subview} >
                        <Image resizeMode='contain' source={require('../../Images/simg.png')} style={styles.img2} />
                    </TouchableOpacity> */}
                </View>

                <View style={styles.view3}>

                    <View style={styles.view4}>
                        <TouchableOpacity style={styles.subview2} onPress={() => setcurrentshow(1)}>
                            <Text style={[styles.txt1, { color: currentshow == 1 ? '#ffb000' : '#000000' }]}>{t('Market Value')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.subview2} onPress={() => setcurrentshow(2)}>
                            <Text style={[styles.txt1, { color: currentshow == 2 ? '#ffb000' : '#000000' }]}>{t('Tranding Post')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.view5} onPress={() => setcurrentshow(3)}>
                            <Image resizeMode='contain' source={require('../../Images/fire3.png')} style={styles.fireimg} />
                            <View style={styles.subview2} >
                                <Text style={[styles.txt1, { color: currentshow == 3 ? '#ffb000' : '#000000' }]}>{t('Top search')}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* <TouchableOpacity style={styles.subview3} >
                        <Image resizeMode='contain' source={require('../../Images/toolmenu.png')} style={styles.toolmenu} />
                    </TouchableOpacity> */}
                </View>


                {/* Market Value */}
                {currentshow == 1 &&
                    <View style={{ width: '100%' }}>
                        <Image resizeMode='stretch' source={require('../../Images/s1.png')} style={styles.s1img} />

                        <View style={styles.view6}>
                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt2}>{t('Market Value')} ( Y )</Text>
                                <Image resizeMode='stretch' source={require('../../Images/updown.png')} style={styles.updown} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt2}>{t('Net Index')} ( Y )</Text>
                                <Image resizeMode='stretch' source={require('../../Images/updown.png')} style={styles.updown} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt2}>{t("Today's gain")}</Text>
                                <Image resizeMode='stretch' source={require('../../Images/updown.png')} style={styles.updown} />
                            </TouchableOpacity>
                        </View>

                        {marketdata.length > 0 &&
                            marketdata.map((data, index) => (

                                <TouchableOpacity key={index} style={styles.view7} onPress={() => ToCurrencyChart(data)}>
                                    <Text style={styles.txt3}>{index + 1}</Text>
                                    <Image resizeMode='contain' source={{ uri: data.image }} style={styles.b1img} />
                                    <View style={styles.subview5}>
                                        <Text style={styles.txt4}>{data.name}</Text>
                                        <Text style={styles.txt5}>{data.current_price}</Text>
                                    </View>
                                    <View style={styles.subview6}>
                                        <Text style={styles.txt6}>{data.total_supply}</Text>
                                        <Text style={styles.txt7}>${data.total_volume}</Text>
                                    </View>

                                    <Text style={[styles.txt8, { color: Math.round(data.price_change_percentage_24h) >= 0 ? '#00b332' : '#ff3d3d' }]}>{data.price_change_percentage_24h}</Text>

                                </TouchableOpacity>
                            ))}
                    </View>
                }

                {currentshow == 3 &&
                    <View >
                        <View style={styles.view8}>

                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt2}>{t('Name/Turnover')} ( Y )</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt2}>{t("Today's heat")}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt2}>{t('Net Index')}  ( Y )</Text>
                            </TouchableOpacity>
                        </View>
                        {marketdata.length > 0 &&
                            marketdata.map((data, index) => (

                                <View key={index} style={styles.view9}>
                                    <Text style={styles.txt3}>{index + 1}</Text>
                                    <View style={styles.subview7}>
                                        <Image resizeMode='contain' source={{ uri: data.image }} style={styles.b2img} />

                                        <View style={styles.subview8}>
                                            <Text style={styles.txt4}>{data.name}</Text>
                                            <Text style={styles.txt5}>{data.current_price}</Text>
                                        </View>

                                    </View>

                                    <View style={styles.subview9}>
                                        {index == 0 &&
                                            <View style={styles.subview9}>
                                                <Image resizeMode='contain' source={require('../../Images/fire2.png')} style={styles.fire2} />
                                                <Image resizeMode='contain' source={require('../../Images/fire2.png')} style={styles.fire2} />
                                                <Image resizeMode='contain' source={require('../../Images/fire2.png')} style={styles.fire2} />
                                            </View>

                                        }
                                    </View>
                                    <View style={styles.subview6}>
                                        <Text style={styles.txt6}>{data.total_supply}</Text>
                                        {index == 1 ?
                                            <Text style={styles.txt99}>${data.total_volume}</Text>
                                            :
                                            <Text style={styles.txt9}>${data.total_volume}</Text>

                                        }
                                    </View>

                                </View>
                            ))
                        }

                    </View>
                }


            </ScrollView>

            {currentshow == 2 &&
                <View style={{ height: '83%' }}>
                    {/* <View style={styles.view10}>
                            <Image resizeMode='contain' source={require('../../Images/star.png')} style={styles.toolmenu} />

                            <TouchableOpacity style={styles.subview44}>
                                <Text style={styles.txt10}>Y {t('Filter')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.subview44}>
                                <Text style={styles.txt10}>{t('AP')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.subview44}>
                                <Text style={styles.txt10}>{t('Turnover')} (Y)</Text>
                                <Image resizeMode='stretch' source={require('../../Images/updown.png')} style={styles.updown} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.subview4}>
                                <Text style={styles.txt10}>{t('Capiatal holding')} (Y)</Text>
                                <Image resizeMode='stretch' source={require('../../Images/updown.png')} style={styles.updown} />
                            </TouchableOpacity>

                            <Text style={styles.txt11}>?</Text>

                        </View> */}

                    <View style={{ flex: 1, marginVertical: 1, }}>
                        <WebView
                            source={{ uri: 'https://coinmarketcap.com/rankings/exchanges/' }}
                            onLoadStart={() => setLoading(true)}
                            onLoadEnd={() => setLoading(false)}
                        />
                    </View>

                </View>

            }
        </View>
    )
}
