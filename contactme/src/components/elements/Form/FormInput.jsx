import React from 'react'

const FormInput = ({fieldsetId, display, colSpan, rowSpan, inputRequired, inputValue, maxLength, fieldError, handleChange, handleBlur, labelColor, labelFont, inputLabel, inputName, inputType, inputPlaceholder, inputId, ...rest}) => {
  return (
    <fieldset id={fieldsetId} className={`gap-2.5 flex flex-col ${colSpan ? colSpan : 'col-span-1'} w-full`}>
        <label htmlFor={inputId || 'name'} className={`text-sm ${labelFont ? labelFont : 'font-medium'} ${labelColor ? labelColor : 'text-gray-600'}`}>{inputLabel || "Contact Name"}</label>
        <input type={inputType || "text"} {...rest} maxLength={maxLength} value={inputValue} onChange={handleChange} onBlur={handleBlur} required={inputRequired || true} id={inputId || 'name'} name={inputName || 'name'} placeholder={inputPlaceholder || 'Enter name'} className={`px-4 py-2.5 rounded-five text-black placeholder:text-gray-600 font-spaceGroteskRegular w-full border-2 ${fieldError ? 'border-red-500 focus:border-red-500' : 'border-brandGray17x focus:border-black'} focus:outline-none focus:border-2 bg-transparent`} />
        <p className='text-red-500 text-xs font-medium'>{fieldError}</p>
    </fieldset>
  )
}

export default FormInput