/* eslint-disable react/prop-types */
// import React from "react";
//******** button me koi bhi text pas karne ke liye hum children  name se ek prop pass karenge ,hum children ki jagah kuch aur name bhi rakh sakte the like "text","btnText" and etc..   */
const Button = ({
  children,
  type = 'button',
  bgColor = 'bg-blue-600',
  textColor = 'text-white',
  userClassName = '',
  ...props //****** ek property default me hai className but agar user kuch properties pass karna chahta hai to usko  hum "...props" variable  me store karenge */

}) => {
  return (
    <button className={`py-2 px-4 rounded-full ${userClassName} ${bgColor} ${textColor} ${type} `} {...props}    >
      {children}
    </button>
  );
};

export default Button