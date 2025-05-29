import { createAsyncThunk } from '@reduxjs/toolkit';
import {
 ParseJobSearchQueryService,
 ParseJobSearchQueryResponse,
} from '../../api/services/parseJobSearchQuery.service'; // Adjust path
import {
 parseJobSearchQueryStart,
 parseJobSearchQuerySuccess,
 parseJobSearchQueryFailure,
} from '../slices/parseJobSearchQuery.slice'; // Adjust path
import { ApiError } from '../../models/types/common'; // Assuming you have this type for API errors

export const parseJobSearchQuery = createAsyncThunk(
 'parseJobSearchQuery/parseJobSearchQuery',
 async (query: string, { dispatch }) => {
   try {
     dispatch(parseJobSearchQueryStart());
     const response: ParseJobSearchQueryResponse =
       await ParseJobSearchQueryService.parseQuery(query);
     dispatch(parseJobSearchQuerySuccess(response.responsePayload)); // Assuming you want to store just the payload
     return response.responsePayload;
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(
       parseJobSearchQueryFailure(apiError.message || 'Failed to parse job search query'),
     );
     throw error;
   }
 },
);
