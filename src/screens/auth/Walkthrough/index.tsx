import React, { useRef, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions,
  ViewToken,
} from 'react-native';
import WalkthroughItem from '../../../components/features/WalkthroughItem';
import { WalkthroughItemType } from '../../../models/types/WalkthroughItemType';
import styles from './styles';
import Icon from '../../../components/common/Icon/Icon';


const walkthroughData: WalkthroughItemType[] = [
  {
    key: '1',
    title: 'Find where your care is needed most',
    description:
      'Browse thousands of healthcare opportunities. Roles tailored to your expertise, schedule, and the impact you want to make.',
    image: require('../../../../assets/walkthrough/1.png'),
  },
  {
    key: '2',
    title: 'Be seen. Be trusted. Be job-ready.',
    description:
      'Securely verify your credentials in minutes. Show up with a complete profile that gives employers confidence before the first hello.',
    image: require('../../../../assets/walkthrough/2.png'),
  },
  {
    key: '3',
    title: 'Grow with Every Click',
    description:
      'Set your goals, track your journey, and unlock new opportunities. This isn’t just job searching — it’s career-building, made simple.',
    image: require('../../../../assets/walkthrough/3.png'),
  },
];

type WalkthroughScreenProps = {
  onDone: () => void;
};

const WalkthroughScreen: React.FC<WalkthroughScreenProps> = ({onDone}) => {

  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const scrollToNext = () => {
    if (currentIndex < walkthroughData.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  const onPressExploreOpportunities = () => {
      onDone();
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bars */}
      <View style={styles.topBars}>
        {walkthroughData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              { backgroundColor: currentIndex === index ? '#3A7DFF' : '#D3D3D3' },
            ]}
          />
        ))}
      </View>

      {/* Walkthrough Slides */}
      <FlatList
        data={walkthroughData}
        renderItem={({ item }) => <WalkthroughItem item={item} />}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Bottom Navigation Area */}
      <View style={styles.bottomNav}>
        {/* Left Arrow (hidden on first screen) */}
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={scrollToPrev} style={styles.arrowWrapper}>
            {/* <Text style={styles.arrow}>←</Text> */}
            <Icon name="west" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.arrowPlaceholder} />
        )}

        {/* Right Arrow or CTA */}
        {currentIndex < walkthroughData.length - 1 ? (
          <TouchableOpacity onPress={scrollToNext} style={styles.arrowWrapper}>
            <Icon name="east" size={24} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.ctaButton} onPress={onPressExploreOpportunities}>
            <Text style={styles.ctaText}>Explore Opportunities</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

export default WalkthroughScreen;
