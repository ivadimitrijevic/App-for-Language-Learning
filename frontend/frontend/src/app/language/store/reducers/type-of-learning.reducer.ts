import { createFeature, createReducer, on } from "@ngrx/store";

import { TypeOfLearning } from '../../utils/types/type-of-learning.type';
import { TypeOfLearningApiActions } from '../actions/type-of-learning-api.actions';

/**
 * TypeOfLearning state
 */
export interface TypeOfLearningState {
  types: Array<TypeOfLearning>
}

/**
 * Initial state
 */
export const initialState: TypeOfLearningState = {
  types: null,
}

/**
 * TypeOfLearning feature
 */
export const typeOfLearningFeature = createFeature({
  name: 'type of learning',
  reducer: createReducer(
    initialState,
    on(TypeOfLearningApiActions.createSuccess, (state, { learningType }) => ({
      ...state,
      types: state.types ? [...state.types, learningType] : [learningType]
    })),
    on(TypeOfLearningApiActions.loadAllSuccess, (state, { types }) => ({
      ...state,
      types,
    })),
    on(TypeOfLearningApiActions.updateSuccess, (state, { learningType }) => ({
      ...state,
      types: state.types.map((typeOfLearning) => typeOfLearning.id === learningType.id ? learningType : typeOfLearning),
    })),
    on(TypeOfLearningApiActions.updateOrderSuccess, (state, { reorderedTypes }) => ({
      ...state,
      types: reorderedTypes,
    })),
  )
});

export const {
  name,
  selectTypes,
} = typeOfLearningFeature;
