// import React, {useId} from 'react'

// const Input = React.forwardRef( function Input({
//     label,
//     type = "text",
//     className = "",
//     ...props
// }, ref){
//     const id = useId()
//     return (
//         <div className='w-full'>
//             {label && <label 
//             className='inline-block mb-1 pl-1' 
//             htmlFor={id}>
//                 {label}
//             </label>
//             }
//             <input
//             type={type}
//             className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//             ref={ref}
//             {...props}
//             id={id}
//             />
//         </div>
//     )
// })

// export default Input


import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()

    // Special handling for file inputs
    if (type === "file") {
        return (
            <div className='w-full'>
                {label && <label 
                    className='inline-block mb-1 pl-1' 
                    htmlFor={id}>
                    {label}
                </label>}
                <input
                    type="file"
                    className={`
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100
                        px-3 py-2 rounded-lg bg-white text-black 
                        outline-none focus:bg-gray-50 
                        duration-200 border border-gray-200 w-full 
                        ${className}
                    `}
                    ref={ref}
                    {...props}
                    id={id}
                />
            </div>
        )
    }

    // Regular input handling
    return (
        <div className='w-full'>
            {label && <label 
                className='inline-block mb-1 pl-1' 
                htmlFor={id}>
                {label}
            </label>}
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input