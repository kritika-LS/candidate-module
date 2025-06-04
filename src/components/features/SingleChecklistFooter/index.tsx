import React from "react";
import { TouchableOpacity, View } from "react-native";
import { TextStyle } from "../../common/Text";
import { Checkbox } from "../../common/Checkbox";
import { theme } from "../../../theme";
import { styles } from "./styles";

type SingleChecklistFooterProps = {
  // checklist: ChecklistType; // Replace with your actual type
  onSave: () => void;
  onSubmit: () => void;
  attested: boolean;
  onToggleAttestation: () => void;
};

export const SingleChecklistFooter: React.FC<SingleChecklistFooterProps> = ({
  // checklist,
  onSave,
  onSubmit,
  attested,
  onToggleAttestation,
}) => {
  return(

    <View style={styles.footer}>
    <TouchableOpacity onPress={onToggleAttestation} style={styles.attestationContainer} activeOpacity={0.7}>
      <Checkbox
        checked={attested}
        onChange={() => {}}
      />
      <TextStyle color="#92400e">
        <TextStyle variant="bold" color="#92400e"> Attestation:</TextStyle> I attest that the information I have provided is true and accurate to the best of my knowledge, and that it accurately reflects the education I have received and my experience in each of the clinical areas identified within the last 2 years.
      </TextStyle>
    </TouchableOpacity>
    <TextStyle size="sm">* All fields are required</TextStyle>
    <View style={styles.footerButtonContainer}>

      <TouchableOpacity style={styles.footerButton} onPress={onSave}>
        <TextStyle 
          leftIcon="floppy" 
          iconColor={theme.colors.primary.main} 
          color={theme.colors.primary.main} 
          size="sm"
        >
          Save Draft
        </TextStyle>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.footerButton, !attested && styles.disabledButton]} onPress={onSubmit} disabled={!attested}>
        <TextStyle 
          leftIcon="send-outline" 
          rotationAngle={'300deg'}
          iconColor={attested ? theme.colors.primary.main : theme.colors.grey[300]} 
          color={attested ? theme.colors.primary.main : theme.colors.grey[300]} 
          size="sm"
        >
          Submit Checklist
        </TextStyle>
      </TouchableOpacity>

    </View>
  </View>
  )
}