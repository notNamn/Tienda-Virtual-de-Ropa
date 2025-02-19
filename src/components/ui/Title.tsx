import React from 'react'

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}
export default function Title({title, subtitle, className}: Props) {
    return (
        <div className={`mt-3 text-black ${className}`} >
            <h1 className="text-3xl font-bold my-10">
                {title}
            </h1>

            {subtitle && (
                <h3 className="text-xl mb-5 " >
                    {subtitle}
                </h3>
            ) }
        </div>
    )
}
