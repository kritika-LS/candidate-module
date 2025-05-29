import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextStyle } from '../../components/common/Text';
import { styles } from './styles';
import Icon from '../../components/common/Icon/Icon';
import { theme } from '../../theme';

const MAX_LINES = 2;

const JobDescriptionCard = ({ description }: { description: string }) => {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const [numLines, setNumLines] = useState(0);

  const onTextLayout = (e: any) => {
    // Check if the actual number of lines rendered is greater than MAX_LINES
    if (e.nativeEvent.lines.length > MAX_LINES && !showToggle) {
      setShowToggle(true);
    } else if (e.nativeEvent.lines.length <= MAX_LINES && showToggle) {
      setShowToggle(false); // Hide toggle if it fits within MAX_LINES after layout
    }
    setNumLines(e.nativeEvent.lines.length); // Store the actual number of lines
  };

  return (
    <View style={styles.card}>
      <TextStyle variant="bold" size="md" style={styles.sectionTitle}>Job Description</TextStyle>
      <Text
        style={styles.descriptionText}
        numberOfLines={expanded ? undefined : MAX_LINES} // Control lines dynamically
        onTextLayout={onTextLayout}
      >
        {description}
      </Text>
      {showToggle && (numLines > MAX_LINES) && ( // Only show if more than MAX_LINES are rendered
        <TouchableOpacity onPress={() => setExpanded(!expanded)} style={[styles.flexRow, styles.viewMore]}>
          <TextStyle size='sm' color={theme.colors.blue.light}>{expanded ? 'View Less' : 'View More'}</TextStyle>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} color={theme.colors.blue.light} size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default JobDescriptionCard;