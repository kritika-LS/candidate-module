import React from "react";
import { FlatList, SafeAreaView, View, ActivityIndicator } from "react-native";
import { SkillsChecklistMenuCard } from "../../../components/common/SkillsChecklistMenuCard";
import { styles } from "./styles";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { TextStyle } from "../../../components/common/Text";
import { theme } from "../../../theme";
import { RootState } from "../../../store/types";

export const AllChecklists = () => {
  // Select data, loading, and error states for 'All' category
  // const allChecklists = useAppSelector((state: RootState) => state.skillChecklist.all.items);
  // const loadingAll = useAppSelector((state: RootState) => state.skillChecklist.all.loading);
  // const errorAll = useAppSelector((state: RootState) => state.skillChecklist.all.error);

  // if (loadingAll) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color={theme.colors.primary.main} />
  //       <TextStyle style={styles.loadingText}>Loading Checklists...</TextStyle>
  //     </View>
  //   );
  // }

  // if (errorAll) {
  //   return (
  //     <View style={styles.errorContainer}>
  //       <TextStyle style={styles.errorText}>Error loading checklists: {errorAll}</TextStyle>
  //     </View>
  //   );
  // }

  // if (allChecklists.length === 0) {
  //   return (
  //     <View style={styles.emptyContainer}>
  //       <TextStyle style={styles.emptyText}>No checklists found.</TextStyle>
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.body}>
        {/* <FlatList
          data={[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SkillsChecklistMenuCard
              title={item.title}
              status={item.status}
              isDraft={item.status === 'D'}
            />
          )}
        /> */}
      </View>
    </SafeAreaView>
  );
};