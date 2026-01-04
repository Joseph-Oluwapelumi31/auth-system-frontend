import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}



function InputField({error,value, ...props}: InputFieldProps) {
    return(
        <input 
        value={value}
        {...props}
        className={`
            w-full max-w-80 h-15 px-4 py-6
             border 
             ${error ? "border-red-500" : value ? "border-green-500" : "border-gray-400 "}
            rounded-sm outline-none focus:ring-1 focus:ring-violet-500 focus:border-gray-500`}
        />
        
    )
}
export default InputField;