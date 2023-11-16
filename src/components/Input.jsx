import React, { useId } from "react"
const Input = React.forwardRef(function Input({
  label,  //**** these are deafult values */
  type = 'text', //**** these are deafult values */
  userClassName = "",
  ...props //******  user kuch properties bhej raha hai to usko store karne ke liye  */
}, ref) {

  const id = useId();

  return (
    <div className=" w-full">
      {/* agar label diya hai to lebel component render hoga */}
      {label &&
        <label
          className="inline-block mb-1 pl-1"
          htmlFor={id} //****  isse har baar uniqe id generate hogi  */
        >
          {label}
        </label>}

      <input
        type={type} //**** yaha type by default text hai but agar user input me koi aur type bhejta hai to ye override ho jayega usertype se   */
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full  ${userClassName}`}
        ref={ref}
        {...props}
        id={id}
      />


    </div>


  );
});
export default Input