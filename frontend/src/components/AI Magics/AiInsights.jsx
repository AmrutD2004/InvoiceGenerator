import React from 'react'
import { Lightbulb } from 'lucide-react'

const AiInsights = () => {
    return (
        <div className='p-5 shadow-md rounded-xl bg-white gap-3 '>
            <div className="p-1.5 bg-transparent rounded-lg inline-flex gap-3 items-center">
                <Lightbulb className="text-yellow-500" size={28} />
                <h1 className='text-xl tracking-tighter leading-tight text-neutral-700 text-shadow-sm underline'>AI Insights</h1>
            </div>
            <div className='flex flex-col gap-3 ms-4 mt-3'>
                <p classname="text-sm text-neutral-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim quasi, officia eaque repudiandae laborum vero veniam quae incidunt sed odio quaerat, velit inventore! Repellat sequi itaque vel dolor aliquid excepturi!</p>
                <p classname="text-sm text-neutral-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, qui minima, provident eveniet voluptas, temporibus similique perspiciatis magni esse eaque quasi hic neque. Accusamus nesciunt voluptatibus veniam optio magni incidunt?</p>
                <p classname="text-sm text-neutral-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente consectetur repudiandae nam ratione doloribus culpa modi recusandae error facilis </p>
            </div>
        </div>
    )
}

export default AiInsights
