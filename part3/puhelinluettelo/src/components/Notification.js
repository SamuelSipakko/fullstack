import React from 'react'
import './notification.css'


const Notification = ({ notification }) => {
    if (notification == null)
        return null

    if (notification.successfull)
        return (
            <div className='success'>
                {notification.message}
            </div>
        )

    return (
        <div className='error'>
            {notification.message}
        </div>
    )
}

export default Notification