// HomeLeveltwo

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    viewone: {
        flex: 1
    },
    imgone: {
        width: '100%',
        height: 420
    },

    backbtn: {
        position: 'absolute',
        left: '3%',
        top: 14,
        // borderWidth: 1,
        width: 40,
        height: 40,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    backimg: {
        width: 30,
        height: 30
    },
    sharebtn: {
        position: 'absolute',
        right: '3%',
        top: 14,
        // borderWidth: 1,
        width: 40,
        height: 40,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30
    },
    shareimg: {
        width: 34,
        height: 34
    },
    view2: {
        marginBottom: 10,
        width: '96%',
        alignSelf: 'center',
        // borderWidth: 1,
    },

    view3: {
        marginTop: 10,
        // borderWidth: 1,
        paddingHorizontal: '2%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    view4: {
        // borderWidth: 1,
        width: '70%'
    },
    view5: {
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txt1: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 20,
    },
    txt2: {
        marginTop: 10,
        fontWeight: '500',
        color: '#818181',
        fontSize: 13,
    },
    txt3: {
        marginLeft: '5%',
        marginTop: 10,
        fontWeight: '500',
        color: '#818181',
        fontSize: 13,
    },
    imgtwo: {
        width: '28%',
        // height:'auto'
    },
})