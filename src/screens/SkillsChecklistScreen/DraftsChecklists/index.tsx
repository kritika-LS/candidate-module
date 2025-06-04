import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { SkillsChecklistMenuCard } from "../../../components/common/SkillsChecklistMenuCard";
import { useAppSelector } from "../../../hooks/useAppDispatch";
import { TextStyle } from "../../../components/common/Text";
import { theme } from "../../../theme";
import { styles } from "./styles";
import { SkillsChecklistMenuCardSkeleton } from "../../../components/common/SkillsChecklistMenuCard/SkeletonLoader";
import { EmptyChecklist } from "../../../components/features/EmptyChecklist";
import { useNavigation } from "@react-navigation/native";

export const DraftsChecklists = () => {

  const navigation = useNavigation();

  const { items, loading } = useAppSelector(state => state?.skillChecklist?.draft);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.body}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <SkillsChecklistMenuCardSkeleton key={index} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  if (items.length === 0) {
    return (
      <EmptyChecklist />
    );
  }

  const handleSkillPress = (item:any) => {
    try{
      console.log('handleSkillPress');
      navigation.navigate('SingleSkillChecklist',{
        checklistId: item.id,
        checklistData: item,
      });
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.body}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SkillsChecklistMenuCard
              title={item.title}
              status={item.status}
              isDraft={item.status === 'D'}
              completed={item.status === 'S'}
              data={item}
              onPress={() => handleSkillPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};