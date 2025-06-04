import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "../../common/Icon/Icon";
import { TextStyle } from "../../common/Text";
import { theme } from "../../../theme";

export const EmptyChecklist = () => {
  return(
    <View style={styles.emptyContainer}>
            <Icon name="bookshelf" size={30} color={theme.colors.grey[500]} />
            <TextStyle style={styles.emptyText}>No checklists found.</TextStyle>
            <TextStyle color={theme.colors.grey[800]} style={styles.emptyText}>Start by creating your first skills checklist</TextStyle>
          </View>
  )
}

const styles = StyleSheet.create({

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    textAlign: 'center',
  },
  
})