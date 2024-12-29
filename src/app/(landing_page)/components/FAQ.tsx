'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "What is LinkHub?",
    answer: "LinkHub is a platform that allows you to create a single link to share all your social media profiles and important links."
  },
  {
    question: "How do I create my LinkHub?",
    answer: "Simply sign up, add your social media links and other important URLs, customize your page, and share your unique LinkHub URL."
  },
  {
    question: "Can I customize my LinkHub page?",
    answer: "Yes, you can customize your LinkHub page with your own profile picture, background, and button styles."
  },
  {
    question: "Is there a limit to how many links I can add?",
    answer: "The number of links you can add depends on your plan. Basic users can add up to 5 links, while Pro and Enterprise users have unlimited links."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

