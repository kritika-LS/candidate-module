import React, { useCallback, useRef, useState } from "react";
import { Alert, SafeAreaView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from 'react-native-webview';
import { Header } from "../../../components/common/Header";
import { styles } from "./styles";
import { SingleChecklistFooter } from "../../../components/features/SingleChecklistFooter";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { saveSkillChecklistResponse } from "../../../store/thunk/saveSkillChecklistResponse.thunk";
import { fetchSkillChecklistResponses } from "../../../store/thunk/fetchSkillChecklistResponses.thunk";
import Toast from "react-native-toast-message";

export const SingleSkillChecklist = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  // @ts-ignore
  const { checklistId, checklistData } = route.params;

  const [updatedHtml, setUpdatedHtml] = useState<string>("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isFormSaving, setIsFormSaving] = useState(false);
  const [attested, setAttested] = useState(false);
  const webViewRef = useRef(null);

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
          function validateAndSendForm() {
            const form = document.getElementById("checklist-form");
            const radios = form.querySelectorAll("input[type='radio']");
            const groups = {};

            radios.forEach(r => {
              const name = r.name.trim();
              if (!groups[name]) groups[name] = [];
              groups[name].push(r);
            });

            let valid = true;
            Object.values(groups).forEach(group => {
              const isChecked = group.some(r => r.checked);
              if (!isChecked) valid = false;
            });

            if (!valid) {
              window.ReactNativeWebView.postMessage(JSON.stringify({ error: "Please complete all fields before submitting." }));
              return;
            }

            radios.forEach(r => {
              if (r.checked) r.setAttribute("checked", "checked");
              else r.removeAttribute("checked");
            });

            window.ReactNativeWebView.postMessage(document.documentElement.outerHTML);
          }

          function sendPartialFormWithoutValidation() {
            const radios = document.querySelectorAll('input[type="radio"]');
            radios.forEach(r => {
              if (r.checked) r.setAttribute("checked", "checked");
              else r.removeAttribute("checked");
            });

            window.ReactNativeWebView.postMessage(document.documentElement.outerHTML);
          }
        </script>
      </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    const data = event.nativeEvent.data;

    if (isFormSubmitting) {
      try {
        const parsed = JSON.parse(data);
        if (parsed?.error) {
          Toast.show({ type: 'error', text1: parsed.error });
          setIsFormSubmitting(false);
          return;
        }
      } catch (_) {
        // Not JSON — expected when valid HTML is returned
      }

      setUpdatedHtml(data);
      submitChecklist(data);
    } else if (isFormSaving) {
      setUpdatedHtml(data);
      saveChecklistDraft(data);
    }
  };

  const submitChecklist = async (html: string) => {
    try {
      await dispatch(saveSkillChecklistResponse({
        response: html,
        skillChecklistId: checklistData.checklistId,
        status: "S",
      })).unwrap();
      await fetchAllChecklistsData();
      navigation.goBack();
    } catch (error) {
      console.error("❌ Failed to save draft:", error);
    if (typeof error === "object" && error !== null) {
      console.log("🧾 Error details:", JSON.stringify(error, null, 2));
    } else {
      console.log("🧾 Raw error:", error);
    }

    } finally {
      setIsFormSubmitting(false);
    }
  };

  const saveChecklistDraft = async (html: string) => {
    try {
      await dispatch(saveSkillChecklistResponse({
        response: html,
        skillChecklistId: checklistData.checklistId,
        status: "D",
      })).unwrap();
      await fetchAllChecklistsData();
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save draft:", error);
    } finally {
      setIsFormSaving(false);
    }
  };

  const fetchAllChecklistsData = useCallback(async (query: string = "") => {
    try {
      await Promise.all([
        dispatch(fetchSkillChecklistResponses({ checklistName: query, pageFrom: 0, pageSize: 10, sortBy: "TITLE", status: null })).unwrap(),
        dispatch(fetchSkillChecklistResponses({ checklistName: query, pageFrom: 0, pageSize: 10, sortBy: "TITLE", status: "S" })).unwrap(),
        dispatch(fetchSkillChecklistResponses({ checklistName: query, pageFrom: 0, pageSize: 10, sortBy: "TITLE", status: "D" })).unwrap(),
        dispatch(fetchSkillChecklistResponses({ checklistName: query, pageFrom: 0, pageSize: 10, sortBy: "TITLE", status: "A" })).unwrap(),
      ]);
    } catch (err) {
      console.error("Failed to fetch checklist categories:", err);
    }
  }, [dispatch]);

  const handleSave = () => {
    setIsFormSaving(true);
    webViewRef.current?.injectJavaScript(`sendPartialFormWithoutValidation(); true;`);
  };

  const handleSubmit = () => {
    setIsFormSubmitting(true);
    webViewRef.current?.injectJavaScript(`validateAndSendForm(); true;`);
  };

  const handleToggleAttestation = () => {
    setAttested(prev => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Skills Checklist" showBackButton />
      <View style={styles.webViewContainer}>
        <WebView
          ref={webViewRef}
          source={{ html: htmlContent }}
          style={styles.webView}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          onMessage={handleWebViewMessage}
          onError={({ nativeEvent }) => console.warn('WebView error: ', nativeEvent)}
        />
      </View>
      <SingleChecklistFooter
        onSave={handleSave}
        onSubmit={handleSubmit}
        attested={attested}
        onToggleAttestation={handleToggleAttestation}
      />
    </SafeAreaView>
  );
};
