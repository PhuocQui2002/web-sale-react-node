// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Drawer } from 'antd'


const DrawerComponent = ({ title = 'Drawer', placement = 'right', isOpen = false, children, ...rests }) => {
    return (
        <>
            <Drawer title={title} placemen={placement} open={isOpen} {...rests}>
                {children}
            </Drawer>
        </>
    )
}

export default DrawerComponent