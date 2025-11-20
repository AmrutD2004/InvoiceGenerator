import React from 'react'
import Header from '../../components/landing/Header'
import Hero from '../../components/landing/Hero'
import Feature from '../../components/landing/Feature'
import Testimoni from '../../components/landing/Testimoni'
import FAQ from '../../components/landing/FAQ'
import Footer from '../../components/landing/Footer'
import AiChatbot from '../../components/AI Chatbot/AiChatbot'

const LandingPage = () => {
  return (
    <div className='bg-white'>
      <Header />
      <main>
        <Hero />
        <Feature  />
        <Testimoni />
        <FAQ />
      </main>
      <Footer />
      <AiChatbot />
    </div>
  )
}

export default LandingPage
