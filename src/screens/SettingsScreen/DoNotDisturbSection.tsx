import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import { TextStyle } from "../../components/common/Text";
import Icon from "../../components/common/Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { updateDoNotDisturbStatus } from "../../store/thunk/updateDoNotDisturbStatus.thunk";
import { theme } from "../../theme";

export const DoNotDisturbSection = () => {
  const dispatch = useAppDispatch();
  const currentStatus = useAppSelector(state => state.doNotDisturb.currentStatus);
  const loading = useAppSelector(state => state.doNotDisturb.loading);

  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggleSwitch = useCallback(() => {
    const newStatus = isEnabled ? 'N' : 'Y'; // Flip current
    dispatch(updateDoNotDisturbStatus({ status: newStatus }));
  }, [dispatch, isEnabled]);

  useEffect(() => {
    setIsEnabled(currentStatus === 'Y');
  }, [currentStatus]);

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Icon name="moon-waning-crescent" size={28} color={theme.colors.primary.main} />
        <Icon name="text-short" size={28} color={theme.colors.primary.main} />
      </View>
      <View style={styles.textContainer}>
        <TextStyle variant="bold" size="lg" style={styles.title}>Do Not Disturb</TextStyle>
        <TextStyle size="sm" color={theme.colors.text.light} style={styles.description}>
          Silences all notifications and messages until turned off
        </TextStyle>
      </View>
      <Switch
        value={isEnabled}
        onValueChange={handleToggleSwitch}
        disabled={loading}
        trackColor={{ false: theme.colors.grey[300], true: theme.colors.primary.main }}
        thumbColor={isEnabled ? theme.colors.primary.main : theme.colors.grey[100]}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 16,
    // backgroundColor: theme.colors.primary.light + '22',
    // borderRadius: 24,
    // padding: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 2,
  },
  description: {
    marginTop: 2,
  },
  switch: {
    marginLeft: 12,
  },
});