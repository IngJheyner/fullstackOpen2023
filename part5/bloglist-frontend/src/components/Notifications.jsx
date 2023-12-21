import React from 'react'

export const Notifications = ({ info }) => {

    if (info.message === null) {
        return null
    }

    return (
        <div className={ info.type }>
            {info.message}
        </div>
    )
}
