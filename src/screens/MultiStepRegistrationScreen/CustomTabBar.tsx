import React from "react";
import { TextStyle } from "../../components/common/Text";
import { TabBar } from "react-native-tab-view";

export const CustomTabBar = (props:any) => {
    return (
      <>
        <TabBar
          {...props}
          // labelStyle={styles.labelStyle}
          renderLabel={(label: any) => {
            return (
                <TextStyle
                    // h3Style={{
                    // color: label?.focused ? Colors['primary'] : Colors['gray-48'],
                    // fontSize: 14,
                    // lineHeight: 22.4,
                    // }}
                >
                    {label?.route?.title}
                </TextStyle>
            );
          }}
          indicatorStyle={{ backgroundColor: '#0A66C2', height: 2 }}
			style={{ backgroundColor: '#fff', elevation: 4 }}
        //   inactiveColor={Colors['gray-48']}
        //   activeColor={Colors['primary']}
        //   getLabelText={({route}) => route.title}
        />
      </>
    );
};