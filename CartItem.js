import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CartItem = ({product, updateItemQuantity, removeItem}): Node => {

    const onDecreaseQuantity = () => {
        updateItemQuantity(product.id, --product.quantity);
    };

    const onIncreaseQuantity = () => {
        updateItemQuantity(product.id, ++product.quantity);
    };

    const onRemoveItem = () => {
        removeItem(product.id);
    };

    return (
        <View style={styles.cartItemContainer}>
            <Image style={styles.productImage} source={{uri: product.url}}/>
            <View style={styles.cartItemInnerContainer}>
                <View style={styles.cartItemTitleDescCancelIconContainer}>
                    <View style={styles.cartItemTitleDescContainer}>
                        <Text style={styles.titleText}>
                            {product.title}
                        </Text>
                        <Text style={styles.descText}>
                            {product.description}
                        </Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.4} onPress={onRemoveItem}>
                        <Image source={require('./assets/icon_delete.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.priceQuantityContainer}>
                    <Text style={styles.priceText}>
                        ${product.priceInDollars * product.quantity}
                    </Text>
                    <View style={styles.utility}/>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity activeOpacity={0.5} disabled={product.quantity === 1}
                                          onPress={onDecreaseQuantity}>
                            <Image source={require('./assets/icon_minus.png')} style={styles.icon}/>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{product.quantity}</Text>
                        <TouchableOpacity activeOpacity={0.5} disabled={product.quantity === product.stock}
                                          onPress={onIncreaseQuantity}>
                            <Image source={require('./assets/icon_plus.png')} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,
    },
    productImage: {
        height: 80,
        width: 80,
        borderRadius: 8,
    },
    cartItemContainer: {
        height: 80,
        padding: 8,
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 12,
    },
    cartItemInnerContainer: {
        flex: 1,
        display: 'flex',
        height: 80,
        paddingBottom: 4,
    },
    cartItemTitleDescCancelIconContainer: {
        display: 'flex',
        flex: 4,
        flexDirection: 'row',
    },
    cartItemTitleDescContainer: {
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    titleText: {
        marginLeft: 8,
        fontSize: 18,
    },
    descText: {
        marginLeft: 8,
        fontSize: 14,
    },
    priceQuantityContainer: {
        flex: 3,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
    },
    priceText: {
        marginLeft: 8,
        fontSize: 18,
        color: 'slategray',
    },
    utility: {
        flex: 1,
    },
    quantityContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 8,
    },
});

export default CartItem;
