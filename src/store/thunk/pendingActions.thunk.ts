import { createAsyncThunk } from '@reduxjs/toolkit';
 import {
  fetchPendingActionsStart,
  fetchPendingActionsSuccess,
  fetchPendingActionsFailure,
 } from '../slices/pendingActions.slice'; 
import { RootState } from '..';
import { ApiError } from '../../models/types/common';
import { PendingActionsService } from '../../api/services/pendingAction.service';

 export const fetchPendingActions = createAsyncThunk(
  'pendingActions/fetchPendingActions',
  async (_, { dispatch, getState }) => {
    try {
      dispatch(fetchPendingActionsStart());

      const response = await PendingActionsService.getPendingActions();
      dispatch(fetchPendingActionsSuccess(response)); // Assuming the service returns the pending actions array
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      dispatch(fetchPendingActionsFailure(apiError.message || 'Failed to fetch pending actions'));
      throw error;
    }
  }
 );