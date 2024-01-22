import React, { useReducer, createContext, useContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload;
        case "CLEAR_NOTIFICATION":
            return null;
        default:
            return state;
    }
}

export const NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null);

    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const [notification, notificationDispatch] = useContext(NotificationContext);
    return { notification, notificationDispatch };
}

export default NotificationContext;
