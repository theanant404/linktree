'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'

interface TestimonialsProps {
  id?: string;
}

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    username: "@alexj",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "LinkHub has revolutionized how I share my online presence. It's simple, effective, and looks great!",
    likes: 45,
    comments: 5,
    retweets: 12,
  },
  {
    id: 2,
    name: "Sarah Lee",
    username: "@sarahlee",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "I've tried many link-in-bio tools, but LinkHub stands out with its sleek design and powerful analytics.",
    likes: 32,
    comments: 3,
    retweets: 8,
  },
  {
    id: 3,
    name: "Mike Brown",
    username: "@mikeb",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "As a content creator, LinkHub has been a game-changer for me. It's so easy to update and manage all my links!",
    likes: 56,
    comments: 7,
    retweets: 15,
  },
  {
    id: 4,
    name: "Emily Chen",
    username: "@emilyc",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "The customization options in LinkHub are fantastic. My profile truly feels like an extension of my brand now.",
    likes: 28,
    comments: 2,
    retweets: 6,
  },
  {
    id: 5,
    name: "David Kim",
    username: "@davidk",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "LinkHub's analytics have helped me understand my audience better. Highly recommend for fellow entrepreneurs!",
    likes: 39,
    comments: 4,
    retweets: 10,
  },
]

export default function Testimonials({ id }: TestimonialsProps) {
  const [expanded, setExpanded] = useState(false)

  const visibleTestimonials = expanded ? testimonials : testimonials.slice(0, 3)

  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.username}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.content}</p>
                <div className="flex justify-between text-gray-500 text-sm">
                  <button className="flex items-center hover:text-blue-500">
                    <MessageCircle size={18} className="mr-1" />
                    {testimonial.comments}
                  </button>
                  <button className="flex items-center hover:text-green-500">
                    <Repeat2 size={18} className="mr-1" />
                    {testimonial.retweets}
                  </button>
                  <button className="flex items-center hover:text-red-500">
                    <Heart size={18} className="mr-1" />
                    {testimonial.likes}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {!expanded && testimonials.length > 3 && (
          <div className="text-center mt-8">
            <Button onClick={() => setExpanded(true)} variant="outline">
              Show More
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

