import React, { useEffect, useState } from "react";
import { Dimensions, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Header } from "../../components/common/Header";
import { TabView } from "react-native-tab-view";
import { Route } from "../../types/profile";
import { TextStyle } from "../../components/common/Text";
import { styles } from "./styles";
import { theme } from "../../theme";
import Icon from "../../components/common/Icon/Icon";
import { DoNotDisturbSection } from "./DoNotDisturbSection";
import { UpdatePassword } from "./UpdatePassword";
import { UpdateEmail } from "./UpdateEmail";

const screenWidth = Dimensions.get('window').width;

export const SettingsScreen = () => {

	const [index, setIndex] = useState(0);
	const [routes] = useState<Route[]>([
		{ key: 'Email', title: 'Email Address', icon: 'email-search-outline' },
		{ key: 'Password', title: 'Password', icon: 'lock-outline' },
		{ key: 'Dnd', title: 'Do not disturb', icon: 'bell-off-outline' },
	]);

	const renderScene = ({ route }: { route: any }) => {
		switch (route.key) {
			case 'Email':
				return (
					<UpdateEmail />
				);
			case 'Password':
				return (
					<UpdatePassword />
				);
			case 'Dnd':
				return (
					<DoNotDisturbSection />
				);
			default:
				return null;
		}
	};

	const renderScrollableTabBar = (props: any) => {
		const { navigationState, jumpTo } = props;

		return (
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
				style={{ maxHeight: 60, minHeight: 40 }}
			>
				<View style={styles.tabBarContainer}>
					{navigationState.routes.map((route: any, index: number) => {
						const focused = navigationState.index === index;
						const color = focused ? theme.colors.primary.main : theme.colors.text.light;

						return (
							<Pressable
								key={route.key}
								onPress={() => jumpTo(route.key)}
								style={styles.tabItem}
							>
								<View style={styles.flexRow}>
									<Icon name={route.icon} color={color} size={16} />
									<TextStyle size="sm" variant={focused ? "bold" : "regular"} style={[{color}, styles.iconSpacing]}>{route.title}</TextStyle>
								</View>
								{focused && <View style={styles.activeIndicator} />}
							</Pressable>
						);
					})}
				</View>
			</ScrollView>
		);
	};

	return (
		<SafeAreaView style={{flex: 1}}>
			<Header title="Settings" showBackButton />

			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: screenWidth }}
				renderTabBar={renderScrollableTabBar}
			/>
		</SafeAreaView>
	)
}