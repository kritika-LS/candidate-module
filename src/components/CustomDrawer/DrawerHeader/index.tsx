// components/CustomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from '../../common/Icon/Icon';
import { SearchBar } from '../../common/SearchBar';
import { theme } from '../../../theme';
import { useNavigation } from '@react-navigation/native';

// interface DrawerHeaderProps {
//   onMenuPress: () => void;
// }

const DrawerHeader = () => {
	const navigation = useNavigation();

	const handleMenuPress = () => {
		//@ts-ignore
		navigation.openDrawer();
	};

	const handleSearchBarPress = () => {
		//@ts-ignore
		navigation.navigate('Search Jobs');
	};

	const handleNotificationsPress = () => {
		//@ts-ignore
		navigation.navigate('NotificationsScreen');
	};

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity onPress={handleMenuPress}>
				<Icon name='menu' color={theme.colors.text.light} style={{right: 8}} />
			</TouchableOpacity>

			<SearchBar placeholder="Search for jobs" showSearchIcon />

			{/* <TouchableOpacity>
				<Icon name='chat-outline' color={theme.colors.text.light} />
			</TouchableOpacity> */}
			<TouchableOpacity onPress={handleNotificationsPress}>
				<Icon name='bell-outline' color={theme.colors.text.light} />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default DrawerHeader;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-around',
		paddingHorizontal: 16,
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 50,
	},
});
