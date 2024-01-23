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

export const useNotificationValue = () => {
    const [notification] = useContext(NotificationContext)
    return notification
  }

export const useNotify = () => {
    const valueAndDispatch = useContext(NotificationContext)
    const dispatch = valueAndDispatch[1]
    return (payload) => {
            dispatch({ type: 'SET_NOTIFICATION', payload})
        setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
    }
}

export default NotificationContext;
