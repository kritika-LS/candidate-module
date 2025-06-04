import React, { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { TextStyle } from "../../../components/common/Text";
import { styles } from "./styles";
import { Header } from "../../../components/common/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { Checkbox } from "../../../components/common/Checkbox";
import { theme } from "../../../theme";
import { SingleChecklistFooter } from "../../../components/features/SingleChecklistFooter";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { saveSkillChecklistResponse } from "../../../store/thunk/saveSkillChecklistResponse.thunk";
import { fetchSkillChecklistResponses } from "../../../store/thunk/fetchSkillChecklistResponses.thunk";

export const SingleSkillChecklist = () => {

  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  //@ts-ignore
  const { checklistId, checklistData } = route.params;

  const [updatedHtml, setUpdatedHtml] = useState<string>("");
  
  console.log("checklistData.status", checklistData.status);

  const [attested, setAttested] = useState(false);

  // HTML content with some basic styling
  const htmlContent = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 16px;
          margin: 0;
          background-color: #ffffff;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          overflow-x: auto;
          display: block;
        }
        th, td {
          word-break: break-word;
          text-align: center;
          padding: 8px;
        }
      </style>
    </head>
    <body>
      <form id="checklist-form">
        ${checklistData?.response || checklistData?.template}
      </form>

      <script>
        function sendFullHtml() {
          // Mark selected radio buttons with "checked" attribute for persistency
          document.querySelectorAll('input[type="radio"]').forEach(input => {
            if (input.checked) {
              input.setAttribute("checked", "checked");
            } else {
              input.removeAttribute("checked");
            }
          });

          // Send full HTML back
          window.ReactNativeWebView.postMessage(document.documentElement.outerHTML);
        }

        document.addEventListener("change", sendFullHtml);
      </script>
    </body>
  </html>
`;


  const fetchAllChecklistsData = useCallback(async (query: string = "") => {
    try {
      // Dispatch fetches for all relevant statuses with the search query
      // The AllChecklists component will then pick up this data from Redux
      await Promise.all([
        dispatch(fetchSkillChecklistResponses({
          checklistName: query, // Pass the query here
          pageFrom: 0,
          pageSize: 10,
          sortBy: "TITLE",
          status: null, // For 'All'
        })).unwrap(),

        dispatch(fetchSkillChecklistResponses({
          checklistName: query, // Pass the query here
          pageFrom: 0,
          pageSize: 10,
          sortBy: "TITLE",
          status: "S", // For 'Completed'
        })).unwrap(),

        dispatch(fetchSkillChecklistResponses({
          checklistName: query, // Pass the query here
          pageFrom: 0,
          pageSize: 10,
          sortBy: "TITLE",
          status: "D", // For 'Drafts'
        })).unwrap(),

        dispatch(fetchSkillChecklistResponses({
          checklistName: query, // Pass the query here
          pageFrom: 0,
          pageSize: 10,
          sortBy: "TITLE",
          status: "A", // For 'Assigned'
        })).unwrap(),
      ]);
    } catch (err) {
      console.error("Failed to fetch one or more checklist categories:", err);
    }
  }, [dispatch]);

  const handleSave = async () => {

    try {
      await dispatch(saveSkillChecklistResponse({
        response: updatedHtml, // ✅ this is the full HTML with checked radio buttons
        skillChecklistId: checklistData.checklistId,
        status: checklistData.status,
      })).unwrap();
      await fetchAllChecklistsData();
      navigation.goBack();
    } catch (error) {
      // Error handling is managed by the slice, you can show a toast here if needed
      console.error("Failed to save checklist:", error);
    }
  };


  const handleSubmit = async() => {
    try {
      await dispatch(saveSkillChecklistResponse({
        response: updatedHtml, // ✅ this is the full HTML with checked radio buttons
        skillChecklistId: checklistData.checklistId,
        status: checklistData.status,
      })).unwrap();
      await fetchAllChecklistsData();
      navigation.goBack();
    } catch (error) {
      // Error handling is managed by the slice, you can show a toast here if needed
      console.error("Failed to save checklist:", error);
    }
  };

  const handleToggleAttestation = () => {
    setAttested((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={'Skills Checklist'} showBackButton />
      <View style={styles.webViewContainer}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webView}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          onMessage={(event) => {
            const data = event.nativeEvent.data;
            console.log("Full HTML received from WebView:", data);
            setUpdatedHtml(data); // This now includes checked radio buttons
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
        />
      </View>
      <SingleChecklistFooter
        // checklist={checklistData}
        onSave={handleSave}
        onSubmit={handleSubmit}
        attested={attested}
        onToggleAttestation={handleToggleAttestation}
      />
    </SafeAreaView>
  )
}