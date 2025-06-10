import React from "react";
import { SafeAreaView, View } from "react-native";
import { TextStyle } from "../../components/common/Text";
import { styles } from "./styles";
import { Header } from "../../components/common/Header";
import { useAppSelector } from "../../hooks/useAppDispatch";
import RescheduleBottomSheet from "../MyScreenings/RescheduleBottomSheet";
import { getGreeting } from "../../utils/getGreeting";
import { useNavigation, useRoute } from "@react-navigation/native";

export const ScreeningScheduler = () => {

  const route = useRoute();
  const navigation = useNavigation();

  //@ts-ignore
  const { candidatePoolId } = route?.params;

  const { details, loading, error } = useAppSelector((state) => state.screeningDetails);

  console.log({details})
  const greeting = details?.candidateName ? `${getGreeting()}, ${details?.candidateName}!` : `${getGreeting()}!`;

  const handleSuccessfulScheduling = () => {
    navigation.goBack();
  }

  return(
    <SafeAreaView style={styles.safeArea}>
      <Header showBackButton  />
      <View style={styles.body}>
        <TextStyle size="lg">{`${greeting} 👋`}</TextStyle>
        <View style={styles.screeningSchedularCard}>
          {/* @ts-ignore */}
          <RescheduleBottomSheet screening={details} candidatePoolId={candidatePoolId} onClose={handleSuccessfulScheduling} />
        </View>
      </View>
    </SafeAreaView>
  )
}