import { useState } from "react";
import InputField from "./InputField";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function PasswordInput({ value, onChange, error, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="relative w-full max-w-80">
            <InputField
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                error={error}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute  right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700 cursor-pointer"
            >
                {showPassword ? 
                    <EyeSlashIcon className="h-5 w-5"/>
                    :
                    <EyeIcon className="h-5 w-5"/>
                    
                
                }
            </button>
        </div>
    );

}