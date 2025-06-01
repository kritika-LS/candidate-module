import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        marginBottom: 5,
        backgroundColor: '#fff',
        minHeight: 100,
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: '#e0f7fa',
        borderWidth: 1,
        borderColor: '#b2ebf2',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    uploadButtonText: {
        color: '#00867d',
        fontSize: 16,
        fontWeight: 'bold',
    },
    uploadedFileName: {
        color: '#222',
        fontSize: 14,
        fontWeight: '500',
    },
    acceptedFormats: {
        fontSize: 12,
        color: '#666',
    },
    noResults: {
        fontSize: 14,
        color: 'red',
        marginTop: 5,
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    summaryLength: {
        fontSize: 12,
        color: '#666',
        alignSelf: 'flex-end',
    },
});