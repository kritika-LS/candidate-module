import React, { useCallback, useEffect, useState } from "react";
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
import { AllChecklists } from "./AllChecklists";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchSkillChecklistResponses } from "../../store/thunk/fetchSkillChecklistResponses.thunk";
import { AssignedChecklists } from "./AssignedChecklists";
import { DraftsChecklists } from "./DraftsChecklists";
import { CompletedChecklists } from "./CompletedChecklists";

const screenWidth = Dimensions.get('window').width;

export const SkillsChecklistScreen = () => {

	const dispatch = useAppDispatch();

	const allListCount = useAppSelector(state => state?.skillChecklist?.all?.totalResults);
	const assignedListCount = useAppSelector(state => state?.skillChecklist?.approved?.totalResults);
	const draftsListCount = useAppSelector(state => state?.skillChecklist?.draft?.totalResults);
	const completedListCount = useAppSelector(state => state?.skillChecklist?.submitted?.totalResults);

	const [searchValue, setSearchValue] = useState("");
	const [index, setIndex] = useState(0);

	const [routes] = useState<Route[]>([
		{ key: 'All', title: 'All', count: allListCount },
		{ key: 'Assigned', title: 'Assigned', count: assignedListCount },
		{ key: 'Drafts', title: 'Drafts', count: draftsListCount },
		{ key: 'Completed', title: 'Completed', count: completedListCount },
	]);

	const getTabColor = (tabName: string) => {
		switch (tabName.toLowerCase()) {
			case 'all':
				return theme.colors.primary.main;
			case 'assigned':
				return theme.colors.accent.dark;
			case 'drafts':
				return theme.colors.status.error;
			case 'completed':
				return '#15803d';
			default:
				return theme.colors.primary.main;
		}
	};

	const renderScene = ({ route }: { route: any }) => {
		switch (route.key) {
			case 'All':
				return (
					<AllChecklists />
				);
			case 'Assigned':
				return (
					<AssignedChecklists />
				);
			case 'Drafts':
				return (
					<DraftsChecklists />
				);
			case 'Completed':
				return (
					<CompletedChecklists />
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
						const color = focused ? getTabColor(route.title) : theme.colors.text.light;

						return (
							<Pressable
								key={route.key}
								onPress={() => jumpTo(route.key)}
								style={styles.tabItem}
							>
								<View>
									{/* <Icon name={route.icon} color={color} size={16} /> */}
									<TextStyle size="sm" style={[{ color }, styles.iconSpacing]}>{route.title}</TextStyle>
									<TextStyle size="sm" style={[{ color, textAlign: 'center' }, styles.iconSpacing]}>{`(${route.count})`}</TextStyle>
								</View>
							</Pressable>
						);
					})}
				</View>
			</ScrollView>
		);
	};

	const handleSearch = useCallback(() => {
		if (searchValue.trim()) {
			fetchAllChecklistsData(searchValue.trim());
		} else {
			fetchAllChecklistsData("");
		}
	}, [searchValue]); // Depend on searchValue

	// Modified fetchAllChecklistsData to accept a checklistName
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

	const handleClearAll = useCallback(() => {
		setSearchValue("");
		fetchAllChecklistsData(""); // Call fetch with empty query
}, []);

	useEffect(() => {
		// Initial fetch when component mounts, with an empty search query
		fetchAllChecklistsData("");
	}, [fetchAllChecklistsData]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Header title="Skills Checklist" showBackButton />
			<SearchSection
				title={'Skills Checklist'}
				subTitle={'Manage and track your skill assessments'}
				placeholder={'Search for checklists...'}
				searchValue={searchValue}
				onSearchValueChange={setSearchValue}
				onSearch={handleSearch}
				onClearAll={handleClearAll}
				showFilter={false}
				showCrossIcon={true}
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