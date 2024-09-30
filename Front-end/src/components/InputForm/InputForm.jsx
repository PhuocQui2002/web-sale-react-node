// eslint-disable-next-line no-unused-vars
import React from 'react'
import { WrapperInputStyle } from './style'

const InputForm = (props) => {
    // eslint-disable-next-line react/prop-types
    const { placeholder = 'Nhập text', ...rests } = props
    const handleOnchangeInput = (e) => {
        console.log("in put:" + e.target.value)
        // eslint-disable-next-line react/prop-types
        props.onChange(e.target.value)
    }
    return (
        // eslint-disable-next-line react/prop-types
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests} onChange={handleOnchangeInput} />
    )
}

export default InputForm