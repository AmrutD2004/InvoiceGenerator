import React, { useEffect, useState } from 'react'
import { Lightbulb } from 'lucide-react'
import OpenAI from "openai";
import axios from 'axios';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const AiInsights = () => {
    const userID = localStorage.getItem('userID')

    const [invoiceData, setInvoiceData] = useState([])

    const [aiInsights, setAiInsights] = useState([])

    const [loading, setLoading] = useState(false)

    const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true
    });

    const fetchInvoices = async (id) => {
        const response = await axios.get(`http://127.0.0.1:8000/api/all-invoices/${id}`)
        const data = response.data
        setInvoiceData(data)

    }

    const getAiInsights = async () => {
        setLoading(true)
        try {
            const response = await client.chat.completions.create({
                model: "z-ai/glm-4.5-air:free",
                messages: [
                    {
                        role: "system",
                        content: "Extract the meaning full information form the the given invoices data and generate meaningfull insinghts only 3 sentences. Return ONLY valid JSON. No text outside JSON."

                    },
                    { role: "user", content: JSON.stringify(invoiceData) }

                ]
            });
            let raw = response.choices[0].message.content.trim();

            // REMOVE ```json and ```
            raw = raw.replace(/```json/g, "").replace(/```/g, "").trim();

            const parsed = JSON.parse(raw);

            setAiInsights(parsed.insights)


        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (userID) {
            fetchInvoices(userID)
        }
    }, [])

    useEffect(() => {
        if (invoiceData.length > 0) {
            getAiInsights()
        }
    }, [invoiceData])


    return (
        <div className='p-5 shadow-md rounded-xl bg-white gap-3 '>
            <div className="p-1.5 bg-transparent rounded-lg inline-flex gap-3 items-center">
                <Lightbulb className="text-yellow-500" size={28} />
                <h1 className='text-xl tracking-tighter leading-tight text-neutral-700 text-shadow-sm underline'>AI Insights</h1>
            </div>
            <div className='flex flex-col gap-3 ms-4 mt-3'>
                {loading ? (
                    <div>
                        <Skeleton count={3} height={20} style={{ marginBottom: "10px" }}/>
                    </div>
                ) : (
                    <ul className="list-disc ms-6 text-neutral-700 space-y-2">
                        {aiInsights.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                )}


            </div>
        </div>
    )
}

export default AiInsights
