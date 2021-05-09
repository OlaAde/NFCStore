import React, {useState} from 'react';
import type {Node} from 'react';
import {
    FlatList, Image,
    SafeAreaView, StatusBar,
    StyleSheet, Text,
    TouchableOpacity,

} from 'react-native';
import CartItem from './CartItem';


const allProductsInStore = {
    '0': {
        id: '0',
        title: 'Shoulder rolls tee',
        description: 'Shoulder rolls tee description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/34-0.jpg',
        priceInDollars: 27,
        stock: 8,
        quantity: 1,
    }, '1': {
        id: '1',
        title: 'Cerise scallop tee',
        description: 'Cerise scallop tee description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/33-0.jpg',
        priceInDollars: 42,
        stock: 2,
        quantity: 1,
    }, '2': {
        id: '2',
        title: 'Grey slouch tank',
        description: 'Grey slouch tank description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/35-0.jpg',
        priceInDollars: 24,
        stock: 1,
        quantity: 1,
    },
    '3': {
        id: '3',
        title: 'Sunshirt dress',
        description: 'Sunshirt dress description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/36-0.jpg',
        priceInDollars: 58,
        stock: 12,
        quantity: 1,
    }, '4': {
        id: '4',
        title: 'Fine lines tee',
        description: 'Fine lines tee description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/37-0.jpg',
        priceInDollars: 58,
        stock: 3,
        quantity: 1,
    },
};


const App: () => Node = () => {
    const [productsInCart, updateProductsInCart] = useState(allProductsInStore);

    const updateItemQuantity = (id, quantity) => {
        productsInCart[id].quantity = quantity;
        updateProductsInCart({...productsInCart});
    };

    const removeItem = (id) => {
        delete productsInCart[id];
        updateProductsInCart({...productsInCart});
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#FBB8AC'}/>
            {!Object.keys(productsInCart).length && <Text style={styles.noItemsText}>No items in cart. Tap on the plus button  "+"  to add items to your cart</Text>}
            <FlatList
                contentInsetAdjustmentBehavior="automatic" data={Object.values(productsInCart)}
                renderItem={({item}) => <CartItem key={item.id} product={item}
                                                  updateItemQuantity={updateItemQuantity} removeItem={removeItem}/>}/>

            <TouchableOpacity activeOpacity={0.5} style={styles.fabContainer}>
                <Image source={require('./assets/icon_plus_fab.png')} style={[styles.icon, styles.fabIcon]}/>
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
    fabIcon: {
        alignSelf: 'center',
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 18,
        padding: 8
    },
});

export default App;
