import React, { useState, useMemo, useCallback } from "react";
import { TextInput, StyleSheet } from "react-native";
import { useTheme, NavigationProp } from "@react-navigation/native";
import { usePlatformApp } from "@ledgerhq/live-common/lib/platform/PlatformAppProvider";
import NavigationScrollView from "../../../components/NavigationScrollView";
import Button from "../../../components/Button";
import { ScreenName } from "../../../const";

export default function LoadPlatformManifest({
  navigation,
}: {
  navigation: NavigationProp,
}) {
  const { colors } = useTheme();
  const [manifest, setManifest] = useState("");
  const { addLocalManifest } = usePlatformApp();

  const onChange = useCallback(val => {
    try {
      const json = JSON.parse(val);
      setManifest(JSON.stringify(json, null, 2));
    } catch (e) {
      setManifest(val);
    }
  }, []);

  const disabled = useMemo(() => {
    if (!manifest) {
      return true;
    }

    try {
      JSON.parse(manifest);
      return false;
    } catch (e) {
      return true;
    }
  }, [manifest]);

  const onOpen = useCallback(() => {
    const json = JSON.parse(manifest);

    addLocalManifest(json);

    // const nav = navigation.getParent();
    navigation.navigate({
      name: ScreenName.PlatformApp,
      params: {
        platform: json.id,
        name: json.name,
      },
    });
  }, [manifest, addLocalManifest, navigation]);

  return (
    <NavigationScrollView contentContainerStyle={styles.root}>
      <TextInput
        style={[
          styles.input,
          { color: colors.text, borderColor: colors.border },
        ]}
        value={manifest}
        onChangeText={onChange}
        placeholder="Paste your manufest json"
        multiline
        autoCorrect={false}
      />
      <Button
        type="primary"
        title="Open"
        disabled={disabled}
        onPress={onOpen}
      />
    </NavigationScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginBottom: 16,
  },
});
