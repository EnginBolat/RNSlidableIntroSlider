import React, { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { NavigationButton } from "../../components";

const OnBoard = () => {
    const { width } = Dimensions.get('window');
    const [activeIndex, setActiveIndex] = useState(0);
    const flatlistRef = useRef<FlatList>(null);

    const goToNextPage = () => {
        if (activeIndex < pages.length - 1) {
            setActiveIndex(activeIndex + 1);
            flatlistRef.current!.scrollToIndex({ animated: true, index: activeIndex + 1 });
        }
    };

    const goToBackPage = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            flatlistRef.current!.scrollToIndex({ animated: true, index: activeIndex - 1 });
        }
    };

    const pages = [
        { id: 1, component: <Page nextButtonHandle={goToNextPage} /> },
        { id: 2, component: <Page2 nextButtonHandle={goToNextPage} backButtonHandle={goToBackPage} /> },
        { id: 3, component: <Page3 nextButtonHandle={goToNextPage} backButtonHandle={goToBackPage} /> },
        { id: 4, component: <Page4 backButtonHandle={goToBackPage} /> },
    ];

    function renderItem(item: any) {
        return <View style={{ width: width }}>{item.component}</View>
    }

    const renderIndicator = ({ item, index }: { item: any, index: number }) => (
        <View style={[styles.indicator, index === activeIndex ? styles.activeIndicator : null]} key={index} />
    );

    return <View style={styles.container}>
        <FlatList
            ref={flatlistRef}
            pagingEnabled
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={pages}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
            onScroll={(event) => {
                const { x } = event.nativeEvent.contentOffset;
                const currentIndex = Math.round(x / width);
                setActiveIndex(currentIndex);
            }}
        />
        <View style={[styles.indicatorContainer]}>
            <FlatList
                contentContainerStyle={{ justifyContent: 'center', alignContent: 'center', flex: 1, }}
                horizontal
                data={pages}
                renderItem={renderIndicator}
                keyExtractor={(_, index) => index.toString()}
            />
        </View>
    </View >
}

export default OnBoard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 24,
    },
    indicatorContainer: {
        flexDirection: 'row',
        bottom: 20,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'gray',
        marginRight: 5,
    },
    activeIndicator: {
        backgroundColor: 'green',
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingVertical: 32,
    },
    buttonText: {
        fontWeight: 'bold',
    },
    nextButtonText: {
        color: 'green',
    },
    backButtonText: {
        color: 'red',
    },
});


const Page: React.FC<{ nextButtonHandle: any; }> = ({ nextButtonHandle }) => {
    return <View style={styles.container}>
        <Text style={styles.title}>Hello, World!</Text>
        <NavigationButton
            title="Next"
            onPress={nextButtonHandle}
            style={styles.buttonContainer}
            textStyle={[styles.nextButtonText, styles.buttonText]}
        />
    </View >
}

const Page2: React.FC<{ nextButtonHandle: any; backButtonHandle: any; }> = ({ nextButtonHandle, backButtonHandle, }) => {
    return <View style={styles.container}>
        <Text style={styles.title}>Hello, World! 2</Text>
        <View style={styles.buttonContainer}>
            <NavigationButton
                title="Back" onPress={backButtonHandle}
                textStyle={[styles.backButtonText, styles.buttonText]}
            />
            <View style={{ paddingHorizontal: 12 }} />
            <NavigationButton
                title="Next" onPress={nextButtonHandle}
                textStyle={[styles.nextButtonText, styles.buttonText]}
            />
        </View>
    </View>
}

const Page3: React.FC<{ nextButtonHandle: any; backButtonHandle: any; }> = ({ nextButtonHandle, backButtonHandle }) => {
    return <View style={styles.container}>
        <Text style={styles.title}>Hello, World! 3</Text>
        <View style={styles.buttonContainer}>
            <NavigationButton
                title="Back" onPress={backButtonHandle}
                textStyle={[styles.backButtonText, styles.buttonText]}
            />
            <View style={{ paddingHorizontal: 12 }} />
            <NavigationButton
                title="Next" onPress={nextButtonHandle}
                textStyle={[styles.nextButtonText, styles.buttonText]}
            />
        </View>
    </View>
}

const Page4: React.FC<{ backButtonHandle: any; }> = ({ backButtonHandle }) => {
    return <View style={styles.container}>
        <Text style={styles.title}>Hello, World! 4</Text>
        <NavigationButton title="Back"
            onPress={backButtonHandle}
            style={styles.buttonContainer}
            textStyle={[styles.backButtonText, styles.buttonText]}
        />
    </View>
}