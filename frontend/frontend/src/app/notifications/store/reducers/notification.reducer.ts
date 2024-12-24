import { createFeature, createReducer, on } from "@ngrx/store";

import { Notification } from '../../utils/types/notification.type';
import { NotificationApiActions } from '../actions/notification-api.actions';

/**
 * Notification state
 */
export interface NotificationState {
  notifications: Array<Notification>;
}

/**
 * Initial state
 */
export const initialState: NotificationState = {
  notifications: null,
}

/**
 * Notification feature
 */
export const notificationFeature = createFeature({
  name: 'notification',
  reducer: createReducer(
    initialState,
    on(NotificationApiActions.loadAllSuccess, (state, { notifications }) => ({
      ...state,
      notifications,
    })),
    // on(FriendApiActions.createSuccess, (state, { friend }) => ({
    //   ...state,
    //   friends: state.friends ? [...state.friends, friend] : [friend],
    // })),
    on(NotificationApiActions.updateSuccess, (state, { notification }) => ({
      ...state,
      notifications: state.notifications.map((stateNotification) => stateNotification.id === notification.id ? notification : stateNotification),
    })),
  )
});

export const {
  name,
  selectNotifications,
} = notificationFeature;
