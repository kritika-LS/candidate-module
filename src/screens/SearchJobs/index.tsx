import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { SearchSection } from "../../components/features/SearchSection";
import JobCard from "../../components/features/JobCard";

const mockJobs = [
  {
    id: 1,
    title: "Registered Nurse",
    type: "Travel",
    company: "Starlight Medical Center",
    location: "Syracuse, NY, US",
    reference: "RE-1032YPL",
    salary: "$2484 - $2681 / week",
    experience: "0-2 years",
    shift: "3x12 Day",
    startDate: "Dec 02, 2024",
    endDate: "Mar 02, 2025",
    duration: "3 Months",
    openings: 1,
    posted: "2 days ago"
  },
  // ...add more mock jobs as needed
];

export const SearchJobs = () => {
  const [sort, setSort] = useState("Relevance");

  const handleFilterPress = () => {
    // Handle filter modal open
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SearchSection onFilterPress={handleFilterPress} />
        <View style={styles.jobsHeaderRow}>
          <Text style={styles.jobsCount}>{mockJobs.length} Jobs for you</Text>
          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>Sort by</Text>
            <TouchableOpacity style={styles.sortDropdown}>
              <Text style={styles.sortValue}>{sort}</Text>
              {/* Add dropdown icon if needed */}
            </TouchableOpacity>
          </View>
        </View>
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  jobsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  jobsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortLabel: {
    fontSize: 14,
    color: '#888',
    marginRight: 4,
  },
  sortDropdown: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sortValue: {
    fontSize: 14,
    color: '#222',
  },
});