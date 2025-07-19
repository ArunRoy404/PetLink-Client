import React from "react";
import { Avatar as MTAvatar, Tooltip } from "@material-tailwind/react";

export default function Avatar({ src, loading = false, alt = "User Avatar", size = "lg", name = "" }) {
    return (
        <div className="flex items-center gap-3">
            <Tooltip content={name || alt}>
                {
                    loading
                        ? <div className="h-[110px] w-[110px] flex flex-col gap-2 items-center justify-center">
                            <l-bouncy size="30" speed="1.75" color="black"></l-bouncy>
                            <p className="text-sm font-bold">Uploading</p>
                            </div>
                        : <MTAvatar
                            variant="circular"
                            size={size}
                            alt={alt}
                            src={src || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"} // fallback image
                            className="border-2 border-primary object-cover"
                        />
                }
            </Tooltip>
            {name && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>}
        </div>
    );
}
