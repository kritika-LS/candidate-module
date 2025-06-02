import React, { useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import { Header } from "../../components/common/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchSection } from "../../components/features/SearchSection";
import { TabView } from "react-native-tab-view";
import { TextStyle } from "../../components/common/Text";
import Icon from "../../components/common/Icon/Icon";
import { theme } from "../../theme";
import { styles } from "./styles";
import { Route } from "../../types/profile";
import { SkillsChecklistMenuCard } from "../../components/common/SkillsChecklistMenuCard";

const screenWidth = Dimensions.get('window').width;

export const SkillsChecklistScreen = () => {

	const [searchValue, setSearchValue] = useState("");
	const [chips, setChips] = useState<string[]>([]);
	const [index, setIndex] = useState(0);

	const [routes] = useState<Route[]>([
		{ key: 'All', title: 'All', count: 3 },
		{ key: 'Assigned', title: 'Assigned', count: 0 },
		{ key: 'Drafts', title: 'Drafts', count: 2 },
		{ key: 'Completed', title: 'Completed', count: 0 },
	]);

	const renderScene = ({ route }: { route: any }) => {
		switch (route.key) {
			case 'All':
				return (
					<SkillsChecklistMenuCard />
				);
			case 'Assigned':
				return (
					<TextStyle>Assigned</TextStyle>
				);
			case 'Drafts':
				return (
					<TextStyle>Drafts</TextStyle>
				);
			case 'Completed':
				return (
					<TextStyle>Completed</TextStyle>
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
														<View>
																{/* <Icon name={route.icon} color={color} size={16} /> */}
																<TextStyle size="sm" style={[{ color }, styles.iconSpacing]}>{route.title}</TextStyle>
																<TextStyle size="sm" style={[{ color }, styles.iconSpacing]}>{`(${route.count})`}</TextStyle>
														</View>
												</Pressable>
										);
								})}
						</View>
				</ScrollView>
		);
};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			{/* <Header title="Skills Checklist" showBackButton /> */}
			<SearchSection
				title={'Skills Checklist'}
				subTitle={'Manage and track your skill assessments'}
				searchValue={searchValue}
				onSearchValueChange={() => { }}
				onSearch={() => { }}
				chips={chips}
				onRemoveChip={() => { }}
				onClearAll={() => { }}
				onFilterPress={() => { }}
				showFilter={false}
			/>

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