import React, {useState} from 'react';
import type {Node} from 'react';
import {
    FlatList, Image,
    SafeAreaView, StatusBar,
    StyleSheet, Text,
    TouchableOpacity, View,
} from 'react-native';
import CartItem from './components/CartItem';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {Dialog, Portal} from 'react-native-paper';
import PreviewProduct from './components/PreviewProduct';

const allProductsInStore = {
    '346FBB810DACC6': {
        id: '346FBB810DACC6',
        title: 'Shoulder rolls tee',
        description: 'Shoulder rolls tee description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/34-0.jpg',
        priceInDollars: 27,
        stock: 8,
        quantity: 1,
    },
    '0E05B021': {
        id: '0E05B021',
        title: 'Cerise scallop tee',
        description: 'Cerise scallop tee description',
        url: 'https://storage.googleapis.com/material-vignettes.appspot.com/image/33-0.jpg',
        priceInDollars: 42,
        stock: 2,
        quantity: 1,
    },
    '34A27F19CE96C6': {
        id: '34A27F19CE96C6',
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
    const [productsInCart, updateProductsInCart] = useState({});
    const [currentlyScannedProduct, setCurrentlyScannedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        NfcManager.start();
    }, []);


    const updateItemQuantity = (id, quantity) => {
        productsInCart[id].quantity = quantity;
        updateProductsInCart({...productsInCart});
    };

    const removeItem = (id) => {
        delete productsInCart[id];
        updateProductsInCart({...productsInCart});
    };

    const onAddProduct = () => {
        readNdef();
        setModalVisible(true);
    };

    const addToCart = () => {
        updateProductsInCart({...productsInCart, [currentlyScannedProduct.id]: currentlyScannedProduct});
        onDismissAddProductModal();
    };

    function onTagFound(tagFound) {
        let id = tagFound.id;
        let product = allProductsInStore[id];
        if (!product) {
            console.log('Product not found for this tag');
        }
        if (productsInCart[id]) {
            console.log('Product has been added to cart');
        }

        setCurrentlyScannedProduct(product);
    }

    const cleanUp = () => {
        NfcManager.unregisterTagEvent().catch(() => 0);
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.setEventListener(NfcEvents.SessionClosed, null);
    };

    function readNdef() {
        return new Promise((resolve) => {
            let tagFound = null;

            NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
                tagFound = tag;
                onTagFound(tagFound);
                console.log('tag', tag);
                resolve(tagFound);
            });

            NfcManager.setEventListener(NfcEvents.SessionClosed, () => {
                if (!tagFound) {
                    resolve();
                }
            });

            NfcManager.registerTagEvent();
        });
    }

    const onDismissAddProductModal = () => {
        cleanUp();
        setModalVisible(false);
        setCurrentlyScannedProduct(null);
    };

    const onDiscardScannedItem = () => {
        setCurrentlyScannedProduct(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#FBB8AC'}/>
            {!Object.keys(productsInCart).length &&
            <View style={styles.noItemsContainer}>
                <Text style={styles.noItemsText}>No items in cart.</Text>
                <Text style={styles.noItemsText}>Tap on the plus button "+" to add items to your cart</Text>
            </View>}
            <FlatList
                contentInsetAdjustmentBehavior="automatic" data={Object.values(productsInCart)}
                renderItem={({item}) => <CartItem key={item.id} product={item}
                                                  updateItemQuantity={updateItemQuantity} removeItem={removeItem}/>}/>

            <TouchableOpacity activeOpacity={0.5} style={styles.fabContainer} onPress={onAddProduct}>
                <Image source={require('./assets/icon_plus_fab.png')} style={[styles.icon, styles.fabIcon]}/>
            </TouchableOpacity>

            <Portal>
                <Dialog
                    style={{height: '80%'}}
                    dismissable={true}
                    onDismiss={onDismissAddProductModal}
                    visible={modalVisible}>
                    <Dialog.Content
                        style={styles.dialogContainer}>
                        {!currentlyScannedProduct &&
                        <Text style={styles.directiveText}>Scan the NFC tag located on the product</Text>}
                        {currentlyScannedProduct &&
                        <PreviewProduct product={currentlyScannedProduct} addToCart={addToCart}
                                        discard={onDiscardScannedItem}/>}
                    </Dialog.Content>
                </Dialog>
            </Portal>
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
    noItemsContainer: {
        height: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
        flexDirection: 'column',
        display: 'flex',
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 22,
        padding: 8,
        alignSelf: 'center',

    },
    directiveText: {
        fontSize: 24,
        textAlign: 'center',
    },
    dialogContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: 'white',
        height: '100%',
        borderRadius: 4,
    },
});

export default App;
