import React, { useId } from 'react'

function Select({
    options,
    label,
    userClassName = '',
    ...props
}, ref) {
    const id = useId();
    return (
        <div>
            {label &&
                <label
                    htmlFor={id} className=''
                >
                    <select
                        {...props}
                        id={id}
                        ref={ref}
                        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${userClassName} `}
                    >
                        {options?.map((option) => (

                            <option key={option} value={option}>
                                {options}
                            </option>
                        ))}
                    </select>

                </label>}

        </div>
    )
}

export default React.forwardRef(Select);