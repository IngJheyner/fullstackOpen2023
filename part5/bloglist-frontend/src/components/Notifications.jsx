import PropTypes from 'prop-types'

Notifications.propTypes = {
    info: PropTypes.object.isRequired
}

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
