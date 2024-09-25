// globalstyles
import { StyleSheet } from "react-native";

export const globalstyles = StyleSheet.create({
    hometabview: {
        width: 60,
        paddingVertical: 6,
    },
    hometabfocusview: {
        backgroundColor: '#ffffff',
        paddingVertical: 6,
        marginTop: -40,
        width: 58,
        borderRadius: 40,
        elevation: 3,
        // borderWidth: 1,
        // shadowColor: '#000000', // Shadow color
        // shadowOffset: { width: 0, height: -4 }, // Offset shadow upward
        // shadowOpacity: 0.5, // Shadow opacity
        // shadowRadius: 10,
    },
    discovertabfocusview: {
        backgroundColor: '#ffffff',
        paddingVertical: 8,
        marginTop: -40,
        width: 64,
        borderRadius: 40,
        elevation: 3,
    },
    hometabimg: {
        alignSelf: 'center',
        height: 25.5,
        width: 25.5,
    },
    hometabtxt: {
        color: 'ffb000',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '600',
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 24, 24, 0.075)',
        position: 'absolute',
        top: 0,
        zIndex: 9999,
        height: '100%',
        width: '100%'
    },
})
