// @flow
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTranslation } from "react-i18next";
import { useTheme } from "@react-navigation/native";
import type {
  Account,
  AccountLike,
} from "@ledgerhq/live-common/lib/types/account";

import { ScreenName } from "../../../const";
import styles from "../../../navigation/styles";
import LText from "../../../components/LText";

import Form from "./Form";
import History from "./History";

type TabLabelProps = {
  focused: boolean,
  color: string,
};

type RouteParams = {
  defaultAccount: ?AccountLike,
  defaultParentAccount: ?Account,
  providers: any,
  provider: string,
};

const SwapFormOrHistory = ({ route }: { route: { params: RouteParams } }) => {
  const { params: routeParams } = route;
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: styles.headerNoShadow,
        tabBarIndicatorStyle: {
          backgroundColor: colors.live,
        },
      }}
    >
      <Tab.Screen
        name={ScreenName.SwapForm}
        options={{
          title: t("exchange.buy.tabTitle"),
          tabBarLabel: ({ focused, color }: TabLabelProps) => (
            <LText style={{ width: "110%", color }} semiBold={focused}>
              {t("transfer.swap.form.tab")}
            </LText>
          ),
        }}
      >
        {_props => <Form {..._props} {...routeParams} />}
      </Tab.Screen>
      <Tab.Screen
        name={ScreenName.SwapHistory}
        component={History}
        options={{
          title: t("exchange.buy.tabTitle"),
          tabBarLabel: ({ focused, color }: TabLabelProps) => (
            <LText style={{ width: "110%", color }} semiBold={focused}>
              {t("transfer.swap.history.tab")}
            </LText>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Tab = createMaterialTopTabNavigator();

export default SwapFormOrHistory;
