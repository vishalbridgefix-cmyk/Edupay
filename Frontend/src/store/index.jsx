import { configureStore } from '@reduxjs/toolkit'
import combineReducers from 'redux'
import instructor from './slice/instructorSlice'
const rootReducer = combineReducers({ instructor })
const store = configureStore({
    reducer: rootReducer


})
export default store