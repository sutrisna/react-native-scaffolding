/**
 * Kang Koding
 * Trisna DEV
 */

import {
  createStackNavigator,
  SwitchNavigator,
} from "react-navigation";

import Login from "./src/pages/login";

import Home from "./src/pages/home";
import Input from "./src/pages/input";
import Detail from "./src/pages/detail";

const HomeStage = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Detail: {
      screen: Detail
    },
    Input: {
      screen: Input
    },
  },
  {
    // initialRouteName: "Input", // Jika ingin mengedit halaman spesific, status development.
    initialRouteName: "Home",
  }
);

const RootApp = SwitchNavigator(
  {
    InitHome: {
      screen: HomeStage
    },
    InitLogin: {
      screen: Login
    },
  },
  {
    initialRouteName: "InitLogin"
    // initialRouteName: "InitHome" // Jika ingin langsung ke home, status development.
  }
);

export default RootApp;