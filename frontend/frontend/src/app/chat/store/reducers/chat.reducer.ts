import { createFeature, createReducer, on } from "@ngrx/store";

import { Message } from '../../utils/types/message.type';
import { ChatApiActions } from '../actions/chat-api.actions';
import { ChatActions } from '../actions/chat.actions';
import { PaginationInformation } from '../../../pagination/utils/types/pagination-information.type';

/**
 * Chat state
 */
export interface ChatState {
  messages: Array<Message>;
  paginationInfo: PaginationInformation;
}

/**
 * Initial state
 */
export const initialState: ChatState = {
  messages: null,
  paginationInfo: null,
}

/**
 * Chat feature
 */
export const chatFeature = createFeature({
  name: 'chat',
  reducer: createReducer(
    initialState,
    on(ChatApiActions.loadAllSuccess, (state, { data }) => ({
      ...state,
      messages: data.messages,
      paginationInfo: {
        perPage: data.perPage,
        currentPage: data.currentPage,
        lastPage: data.lastPage,
        total: data.total,
      }
    })),
    on(ChatActions.loadAll, (state) => ({
      ...state,
      messages: null,
    })),
    on(ChatApiActions.createSuccess, (state, { message }) => ({
      ...state,
      messages: state.messages ? [...state.messages, message] : [message],
    })),
  )
});

export const {
  name,
  selectMessages,
  selectPaginationInfo
} = chatFeature;
