import { Stack } from "expo-router";
import { useCallback } from "react";

// use this library if you want custom fonts
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// when loading, make splash screen visible
SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      onLayout={onLayoutRootView}
      // screenOptions={{ headerShown: false }}
    />
  );
};

export default Layout;
