import React, { useState } from 'react'
import OpenAI from "openai";
import toast from 'react-hot-toast';
import { LoaderPinwheel } from 'lucide-react';

const Modal = ({ close, onExtract }) => {

    const [emailText, setEmailText] = useState({
        email: ''
    })

    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setEmailText(prev => ({ ...prev, [name]: value }))
    }

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await client.chat.completions.create({
                model: "z-ai/glm-4.5-air:free",
                messages: [
                    {
                        role: "system",
                        content: "Extract the following details from this email: clientName, clientEmail, clientAddress, clientPhone, itemName, itemQuantity, itemPerPrice, itemtaxPercent. Return ONLY valid JSON. No text outside JSON."

                    },
                    { role: "user", content: emailText.email }
                ]
            });
            let raw = response.choices[0].message.content.trim();

            // REMOVE ```json and ```
            raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

            const aiReply = JSON.parse(raw)
            setEmailText(prev => ({ ...prev, extracted: aiReply }))
            onExtract(aiReply)
            close();
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
            setLoading(false)

        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-5 rounded-xl shadow-lg w-96">
                <div className='flex flex-col gap-3'>
                    <h2 className="text-xl  text-neutral-700 tracking-tighter font-bold">Create invoice with AI</h2>
                    <p className='text-sm text-neutral-400 tracking-tight leading-tight'>Paste any text that contain invoice details (like client name, items, quantities, and price) and the AI will attempt to create an invoice from it</p>
                    <span className='tracking-tighter text-neutral-700 font-medium'>Paste Invoice Text Here</span>
                    <textarea onChange={handleChange} name='email' value={emailText.email} placeholder='Paste any text....' className="w-full border p-2 rounded-lg h-40 border-neutral-300 placeholder:text-sm"></textarea>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={close}
                        className="px-3 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400 transition-colors duration-200"
                    >
                        Close
                    </button>
                    <button type='sumbit' onClick={handleSubmit} className="px-3 py-2 bg-[#8a0194] text-white rounded-lg cursor-pointer hover:bg-[#721378] transition-colors duration-200">
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <LoaderPinwheel className="animate-spin text-white" size={18} />
                                Extracting...
                            </div>
                        ) : (
                            "Extract"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Modal
