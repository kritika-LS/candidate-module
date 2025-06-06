import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { TextStyle } from "../../components/common/Text";
import { styles } from "./styles";
import { useAppSelector } from "../../hooks/useAppDispatch";
import moment from "moment";
import ReferenceListCard from "./ReferenceListCard";
import { theme } from "../../theme";
import Icon from "../../components/common/Icon/Icon";
import ReferenceSection from "../ProfileScreen/ProfessionalInformation/Reference";

export const ReferencesScreen = () => {

    const ReferencesData = useAppSelector((state) => state?.candidateReferences?.references?.responsePayload) || [];

    const [showHistoryList, setShowHistoryList] = useState(true);
    const [showForm, setShowForm] = useState<boolean>(false);

    console.log('EducationHistoryData', ReferencesData);
    return(
        <ScrollView style={styles.container}>
			{/* <View style={[styles.flexRow, styles.sectionHeader]}>
				<TextStyle size='md' variant='bold'>References</TextStyle>
				<View style={styles.flexRow}>
					<Icon name='file-alert-outline' size={12} color={theme.colors.status.error} />
					<TextStyle size='xs' color={theme.colors.status.error} style={styles.iconSpacing}>Incomplete</TextStyle>
				</View>
			</View> */}

            {ReferencesData.length > 0 ?
                <>
                    {ReferencesData.map((item: any, index: number) => {

                        const contactPermission = item?.contactOrNot == 'N' ? 'No' : 'Yes' ;

                        return (
                            <ReferenceListCard
                                key={index}
                                listIcon={'account-outline'}
                                title={item.fullName}
                                subtitle1={'Professional reference details'}
                                organizationName={item.organizationName || '-'}
                                phoneNumber={item?.mobileNumber || ''}
                                email={item?.emailAddress || ''}
                                contactPermission={contactPermission || '-'}
                                onEdit={() => console.log('Edit pressed', item)}
                                onDelete={() => console.log('Delete pressed', item)}
                            />
                        )
                    })}
                    { !showForm && <TouchableOpacity
                        style={styles.addContainer}
                        onPress={() => setShowForm(true)}
                    >
                        <Icon name="plus" size={16} color={theme.colors.primary.main} />
                        <TextStyle color={theme.colors.primary.main} style={styles.addText} size='sm'>Add Reference</TextStyle>
                    </TouchableOpacity>
                    }
                </>
                : <ReferenceSection setShowForm={setShowForm} />
            }
            {showForm &&
                <ReferenceSection setShowForm={setShowForm} />
            }
		</ScrollView>
    )
}