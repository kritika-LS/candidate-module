import React, { useState, useMemo, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, BackHandler } from 'react-native';
import { TextStyle } from '../../../../components/common/Text';
import { Checkbox } from '../../../../components/common/Checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or your icon lib
import { ProfileScreenHeader } from '../../../../components/features/ProfileScreenHeader';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const CHARTING_SYSTEMS = [
	'GE Healthcare',
	'Matrix',
	'Oasis',
	'Centricity',
	'Health Connect',
	'McKesson',
	'PointClickCare',
	'Cerner',
	'Home Care/HomeBase',
	'MediHost',
	'Siemens',
	'Epic',
	'Horizon',
	'Meditech',
	'Sunrise',
] as const;

type ChartingSystemTs = typeof CHARTING_SYSTEMS[number];

const ChartingSystem: React.FC = () => {
	const [systems, setSystems] = useState<string[]>([...CHARTING_SYSTEMS]);
	const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
	const [otherSystem, setOtherSystem] = useState<string>('');
	const [otherSystems, setOtherSystems] = useState<string[]>([]);
	const [saved, setSaved] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);

	// "All scripts" is checked if all systems (including others) are selected
	const allSelected = useMemo(
		() => systems.length > 0 && selectedSystems.length === systems.length,
		[selectedSystems, systems]
	);

	// Handle "All scripts" select/deselect
	const handleAllScripts = (checked: boolean) => {
		setSelectedSystems(checked ? [...systems] : []);
	};

	// Handle individual system select/deselect
	const toggleSystem = (system: string) => {
		setSelectedSystems((prev) =>
			prev.includes(system)
				? prev.filter((s) => s !== system)
				: [...prev, system]
		);
	};

	// Add a new system
const addOtherSystem = () => {
  const trimmed = otherSystem.trim();
  if (trimmed) {
    setSystems((prev) => [...prev, trimmed]);
    setOtherSystems((prev) => [...prev, trimmed]);
    setSelectedSystems((prev) =>
      allSelected ? [...prev, trimmed] : prev
    );
    setOtherSystem('');
  }
};

// Remove an "other" system
const removeOtherSystem = (system: string) => {
  setOtherSystems((prev) => prev.filter((s) => s !== system));
  setSystems((prev) => prev.filter((s) => s !== system));
  setSelectedSystems((prev) => prev.filter((s) => s !== system));
};

const handleSave = () => {
	Toast.show({

	})
  // Your save logic here
  // Send both selected and all charting systems to API
  const payload = selectedSystems;
  // Call your API here
  console.log('Payload:', payload);
  setSaved(true);
  setModalVisible(false);
  // navigation.goBack();
};

useEffect(() => {
  if (!saved) return;
  setSaved(false);
}, [/* Add your state variables that should trigger unsaved changes */]);

useFocusEffect(
  React.useCallback(() => {
    const onBackPress = () => {
      if (!saved) {
        setModalVisible(true);
        // return true; // Prevent default back action
      }
      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    // return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [saved])
);

	return (
				<View style={styles.body}>
					<ProfileScreenHeader
						headerIcon='link-variant'
						headerTitle='Charting System'
						completedStatus={false}
					/>
					<TextStyle variant="regular" size='xs' style={{ marginBottom: 16, marginTop: -20 }}>
						Do you have experience with any of these EMR/EHR systems?
					</TextStyle>
					<View style={[styles.checkboxRow, { marginBottom: 24 }]}>
						<Checkbox
							checked={allSelected}
							label="All scripts"
							onChange={handleAllScripts}
							size={16}
						/>
					</View>
					<View style={styles.checkboxContainer}>
						{systems.map((system) => (
							<View key={system} style={styles.checkboxRow}>
								<Checkbox
									checked={selectedSystems.includes(system)}
									label={system}
									onChange={() => toggleSystem(system)}
									size={16}
								/>
							</View>
						))}
					</View>
					<TextStyle variant="bold" size='sm' style={{ marginTop: 16, marginBottom: 6 }}>
						Others (Please List)
					</TextStyle>
					<View style={styles.otherInputRow}>
						<TextInput
							style={styles.input}
							placeholder={`Enter other charting systems you have \nexperience with`}
							value={otherSystem}
							onChangeText={setOtherSystem}
							onSubmitEditing={addOtherSystem}
							returnKeyType="done"
						/>
					</View>
					{otherSystems.length > 0 && (
						<View style={styles.chipList}>
							{otherSystems.map((sys, idx) => (
								<View key={idx} style={styles.chip}>
									<TextStyle variant="regular" size='sm'>{sys}</TextStyle>
									<TouchableOpacity style={styles.crossIcon} onPress={() => removeOtherSystem(sys)}>
										<Icon name="close" size={16} color="#1976D2" />
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}
				</View>
	);
};

export default ChartingSystem;