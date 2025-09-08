import { configureStore } from '@reduxjs/toolkit'

import formReducer from './Slice';


export const store = configureStore({ reducer: {form : formReducer} })
