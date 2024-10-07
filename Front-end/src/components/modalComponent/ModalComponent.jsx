import { Modal } from 'antd'
// eslint-disable-next-line no-unused-vars
import React from 'react'

const ModalComponent = ({ title = 'Modal', isOpen = false, children, ...rests }) => {
    return (
        <Modal title={title} open={isOpen} {...rests}>
            {children}
        </Modal>
    )
}

export default ModalComponent