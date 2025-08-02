import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";

const rootReducers = combineReducers({
    // Add your reducers here
    auth: authReducer,
    product:customerProductReducer,
    cart: cartReducer,
    order: orderReducer
});

const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

export default store;