import React from 'react';
import {View, StyleSheet, Switch} from 'react-native';
import {TextStyle} from '../Text';
import { theme } from '../../../theme';

interface SwitchFieldProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({
  label,
  value,
  onValueChange,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <TextStyle variant="medium" size="sm">
          {label}
        </TextStyle>
        {description && (
          <TextStyle
            variant="regular"
            size="xs"
            color="secondary"
            style={styles.description}>
            {description}
          </TextStyle>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: theme.colors.grey[300],
          true: theme.colors.primary.main,
        }}
        thumbColor={theme.colors.background.paper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  labelContainer: {
    flex: 1,
  },
  description: {
    marginTop: theme.spacing.xs,
  },
});
