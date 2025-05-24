import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        margin: 16,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        marginTop: 16,
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        fontSize: 16,
        color: '#000',
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingBottom: 16
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    dropdownContainer: {
        maxHeight: 200,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    saveBtn: {
        marginTop: 24,
        backgroundColor: '#0A47E9',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    saveBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
    safeArea: {
        flex: 1,
    },
    uploadGroup: {
        marginTop: 16,
    },
    uploadBtn: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    uploadBtnText: {
        color: '#0A47E9',
        fontWeight: '500',
    },
    fileName: {
        marginTop: 8,
        fontSize: 14,
    },
    note: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
})

export default styles;