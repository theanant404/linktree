import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <section className="mb-20 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900">About LinkHub</h1>
          <p className="mx-auto text-xl text-gray-600 max-w-2xl">
            Connecting people through a single link, simplifying the way we share our online presence.
          </p>
        </section>

        <section className="mb-20 shadow-sm">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Mission</h2>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <p className="text-lg text-gray-700">
                At LinkHub, we believe in the power of connection. Our mission is to simplify the way people share their online presence, making it easier than ever to connect with audiences across multiple platforms.
              </p>
              <p className="mt-4 text-lg text-gray-700">
                We're dedicated to providing a user-friendly, customizable platform that allows individuals and businesses to showcase their entire digital identity through a single, powerful link.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=300&width=400"
                alt="LinkHub Mission Illustration"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="mb-20 shadow-sm">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Team</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg?height=200&width=200" },
              { name: "John Smith", role: "CTO", image: "/placeholder.svg?height=200&width=200" },
              { name: "Emily Johnson", role: "Head of Design", image: "/placeholder.svg?height=200&width=200" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Simplicity", description: "We believe in making things simple and easy to use." },
              { title: "Innovation", description: "We're always looking for new ways to improve and evolve." },
              { title: "User-Centric", description: "Our users are at the heart of everything we do." },
              { title: "Reliability", description: "We provide a stable and secure platform you can count on." },
            ].map((value, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-2 text-xl font-semibold">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Ready to Get Started?</h2>
          <p className="mb-8 text-xl text-gray-600">Join thousands of users who are already simplifying their online presence with LinkHub.</p>
          <Link 
            href="#" 
            className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors"
          >
            Create Your LinkHub
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </section>
      </div>
    </main>
  )
}

