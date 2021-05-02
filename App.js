import React from 'react';
import type {Node} from 'react';
import {
    FlatList, Image,
    SafeAreaView, StatusBar,
    StyleSheet,
    Text, TouchableOpacity,
    View,
} from 'react-native';


const productsInCart = [{
    id: '0',
    'title': 'Shoulder rolls tee',
    'description': 'Shoulder rolls tee description',
    'url': 'https://storage.googleapis.com/material-vignettes.appspot.com/image/34-0.jpg',
    'priceInDollars': 27,
}, {
    id: '1',
    'title': 'Cerise scallop tee',
    'description': 'Cerise scallop tee description',
    'url': 'https://storage.googleapis.com/material-vignettes.appspot.com/image/33-0.jpg',
    'priceInDollars': 42,
}, {
    id: '2',
    'title': 'Grey slouch tank',
    'description': 'Grey slouch tank description',
    'url': 'https://storage.googleapis.com/material-vignettes.appspot.com/image/35-0.jpg',
    'priceInDollars': 24,
}, {
    id: '3',
    'title': 'Sunshirt dress',
    'description': 'Sunshirt dress description',
    'url': 'https://storage.googleapis.com/material-vignettes.appspot.com/image/36-0.jpg',
    'priceInDollars': 58,
}, {
    id: '4',
    'title': 'Fine lines tee',
    'description': 'Fine lines tee description',
    'url': 'https://storage.googleapis.com/material-vignettes.appspot.com/image/37-0.jpg',
    'priceInDollars': 58,
}];

const CartItem = ({product}): Node => {
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
                    <TouchableOpacity activeOpacity={0.4}>
                        <Image source={require('./assets/icon_delete.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.priceQuantityContainer}>
                    <Text style={styles.priceText}>
                        ${product.priceInDollars}
                    </Text>
                    <View style={styles.utility}/>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Image source={require('./assets/icon_minus.png')} style={styles.icon}/>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>3</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <Image source={require('./assets/icon_plus.png')} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const App: () => Node = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#FBB8AC'}/>
            <FlatList
                contentInsetAdjustmentBehavior="automatic" data={productsInCart}
                renderItem={({item}) => <CartItem key={item.id} product={item}/>}/>
            <TouchableOpacity activeOpacity={0.5} style={styles.fabContainer}>
                <Image source={require('./assets/icon_plus_fab.png')} style={ [styles.icon, styles.fabIcon]}/>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
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
    fabContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FEDBD0',
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
    },
    fabIcon:{
        alignSelf: 'center'
    }
});

export default App;
