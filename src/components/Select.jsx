import React, { forwardRef } from 'react'
import { useId } from 'react'
import { useRef } from 'react'

    function Select({
        label,
        options,
        className = "",
        ...props
    },ref) {
        const id = useId()
  return (
        <div>
            {label && (
                <label
                className='' 
                htmlFor={id} >
                </label>
            )}
            <select name=""
            id={id}
            {...props}
            ref={ref}
            className='`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`' >
                {options?.map((option) => {
                    <option key={option} value={option}>
                        {option}
                    </option>
                })}
            </select>
        </div>
  )
}

export default forwardRef(Select)