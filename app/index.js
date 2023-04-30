import { ScrollView, SafeAreaView, StyleSheet, View, Text, Alert } from "react-native";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Stack, useRouter } from "expo-router";
import { FlatList } from "react-native-gesture-handler";

export default function Home() {
  // const router = useRouter();

  const { options } = useTimer();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#fff" },
          headerShadowVisible: false,
          headerTitle: "Timer",
          headerShown: true,
          headerLargeTitle: "test",
          // headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,

          // headerRight: () => <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />,
        }}
      />

      <View style={styles.container}>
        <View showsVerticalScrollIndicator={false} style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Hours</Text>
          <TimeScroller data={options.hours} onChange={[]} />
        </View>
        <View showsVerticalScrollIndicator={false} style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Minutes</Text>
          <TimeScroller data={options.minutes} onChange={[]} />
        </View>
        <View showsVerticalScrollIndicator={false} style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Seconds</Text>
          <TimeScroller data={options.seconds} onChange={[]} />
        </View>
      </View>

      {/* <View showsVerticalScrollIndicator={false} style={styles.timerContainer}>
        <FlatList
          numColumns={3}
          data={["Hours", "Minutes"]}
          // keyExtractor={}
          scrollEnabled={false}
          nestedScrollEnabled={true}
          renderItem={({ item }) => <TimeScroller type={item} data={options.hours} onChange={[]} />}
        />
      </View> */}
    </SafeAreaView>
  );
}

// array of 60 seconds

function TimeScroller({ type, data, onChange }) {
  const ref = useRef(null);
  const renderItem = useCallback(({ item }) => {
    return (
      <View key={item}>
        <Text style={styles.timerValue}>{item}</Text>
      </View>
    );
  }, []);
  const handleSnapToItem = (index) => {
    console.log(index);
  };
  return (
    <View>
      <Text>{type}</Text>
      <View style={styles.timerScrollerContainer}>
        <FlatList
          ref={ref}
          data={data}
          // scrollEnabled={true}
          keyExtractor={(data) => data}
          initialNumToRender={3}
          snapToAlignment="start"
          renderItem={renderItem}
          snapToInterval={70}
          showsVerticalScrollIndicator={false}
          decelerationRate="slow"
          onEndReached={() => (ref.current.position = 0)}
          // disableIntervalMomentum={true}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "lightcyan",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timerContainer: {
    flexDirection: "column",
    // height: "50%",
    width: "25%",
    justifyContent: "space-evenly",
    fontFamily: "DMRegular",
    backgroundColor: "green",
  },

  timerLabel: {
    fontSize: 22,
  },
  timerScrollerContainer: {
    justifyContent: "center",
    backgroundColor: "lightblue",
    height: 210,
  },
  timerScroller: {},

  timerValue: {
    height: 70,
    width: 70,
    textAlign: "center",
    fontSize: 45,
  },
});

const useTimer = () => {
  const [timer, setTimer] = useState(0); // by seconds
  const [isRunning, setIsRunning] = useState(false);

  const SECONDS = useMemo(() => [...Array(60).keys()]);
  const MINUTES = useMemo(() => [...Array(60).keys()]);
  const HOURS = useMemo(() => [...Array(24).keys()]);

  const options = {
    hours: HOURS,
    minutes: MINUTES,
    seconds: SECONDS,
  };

  return { timer, options, isRunning, setTimer, setIsRunning };
};
