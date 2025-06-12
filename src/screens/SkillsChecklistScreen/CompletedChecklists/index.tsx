import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import { SkillsChecklistMenuCard } from "../../../components/common/SkillsChecklistMenuCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/useAppDispatch";
import { TextStyle } from "../../../components/common/Text";
import { theme } from "../../../theme";
import { styles } from "./styles";
import { SkillsChecklistMenuCardSkeleton } from "../../../components/common/SkillsChecklistMenuCard/SkeletonLoader";
import { EmptyChecklist } from "../../../components/features/EmptyChecklist";
import { useNavigation } from "@react-navigation/native";
import { fetchSkillChecklistResponses } from "../../../store/thunk/fetchSkillChecklistResponses.thunk";

export const CompletedChecklists = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { items, loading, totalResults, page } = useAppSelector(state => state?.skillChecklist?.submitted);

  const loadMoreData = useCallback(async () => {
    if (isLoadingMore || loading) return;
    
    const currentItems = items.length;
    const totalItems = totalResults;
    
    if (currentItems >= totalItems) return;
    
    setIsLoadingMore(true);
    try {
      await dispatch(fetchSkillChecklistResponses({
        checklistName: "",
        pageFrom: page + 1,
        pageSize: 10,
        sortBy: "TITLE",
        status: "S"
      })).unwrap();
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [dispatch, page, items.length, totalResults, isLoadingMore, loading]);

  if (loading && items.length === 0) {
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
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => 
            isLoadingMore ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color={theme.colors.primary.main} />
              </View>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};