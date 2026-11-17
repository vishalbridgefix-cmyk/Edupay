import { combineReducers, configureStore } from '@reduxjs/toolkit'

import instructor from './slice/instructorSlice'
const rootReducer = combineReducers({ instructor })
const store = configureStore({
    reducer: rootReducer


})
export default store