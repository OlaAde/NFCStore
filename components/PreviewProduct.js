import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

const PreviewProduct = ({product, addToCart, discard}) => {

    return <View style={{width: '100%', height: '100%'}}>
        <Image style={styles.productImage} source={{uri: product.url}}/>

        <View style={{flex: 1}}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.priceInDollars}>${product.priceInDollars}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.buttonContainer}>
            <Button mode={'outlined'} style={styles.button} onPress={discard}>Discard</Button>
            <Button mode={'outlined'} style={styles.button} onPress={addToCart}>Add to cart</Button>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    productImage: {
        height: '70%',
        width: '100%',
        borderRadius: 4,
        backgroundColor: 'pink',
    },
    button: {
        marginHorizontal: 4,
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: 5,
    },
    priceInDollars: {
        fontSize: 19,
        color: 'darkgrey',
    },
    description: {
        fontSize: 18,
        color: 'darkgrey',
    },
});
export default PreviewProduct;
