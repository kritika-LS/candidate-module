import { createAsyncThunk } from '@reduxjs/toolkit';
import { DoNotDisturbService } from '../../api/services/doNotDisturb.service';
import { DoNotDisturbStatus } from '../../models/types/doNotDisturb';
import {
 updateDoNotDisturbStart,
 updateDoNotDisturbSuccess,
 updateDoNotDisturbFailure,
 setDoNotDisturbStatus,
} from '../slices/doNotDisturb.slice';
import { ApiError } from '../../models/types/common';

export const updateDoNotDisturbStatus = createAsyncThunk(
 'doNotDisturb/updateStatus',
 async (payload: { status: DoNotDisturbStatus }, { dispatch, getState }) => {
   
   const currentState = (getState() as any).doNotDisturb.currentStatus;

   try {
     
     dispatch(updateDoNotDisturbStart(payload.status));

     const response = await DoNotDisturbService.updateStatus(payload.status);

     dispatch(updateDoNotDisturbSuccess(response));
     dispatch(setDoNotDisturbStatus(payload.status));

     return response;
   } catch (error) {
     const apiError = error as ApiError;
     dispatch(updateDoNotDisturbFailure({
       error: apiError.message || 'Failed to update Do Not Disturb status.',
       previousStatus: currentState || 'N',
     }));
     throw error;
   }
 }
);
