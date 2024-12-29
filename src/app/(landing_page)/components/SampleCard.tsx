import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Globe, Youtube, Mail, Phone } from 'lucide-react'

export default function SampleCard() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Your LinkHub Card</h2>
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="sm:flex sm:items-center px-6 py-4">
            <Image
              className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-24 w-24 rounded-full"
              src="/placeholder.svg?height=96&width=96"
              alt="User Avatar"
              width={96}
              height={96}
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <p className="text-xl leading-tight">John Doe</p>
              <p className="text-sm leading-tight text-gray-600">@johndoe</p>
            </div>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700 text-base">
              Digital creator, coffee enthusiast, and tech geek. Follow me for daily inspiration and tech tips!
            </p>
          </div>
          <div className="px-6 py-4">
            <h3 className="font-semibold mb-2">Social Media</h3>
            <div className="flex flex-wrap gap-4">
              <Facebook className="text-blue-600" />
              <Twitter className="text-blue-400" />
              <Instagram className="text-pink-600" />
              <Linkedin className="text-blue-700" />
              <Youtube className="text-red-600" />
            </div>
          </div>
          <div className="px-6 py-4">
            <h3 className="font-semibold mb-2">Other Links</h3>
            <div className="space-y-2 justify-center">
              <div className="flex items-center bg-slate-300 rounded-sm p-3">
                <Globe className="mr-2 text-gray-600" />
                <a href="#" className="text-blue-500 hover:underline">www.johndoe.com</a>
              </div>
              <div className="flex items-center bg-slate-300 rounded-sm p-3">
                <Mail className="mr-2 text-gray-600 " />
                <a href="mailto:john@example.com" className="text-blue-500 hover:underline">john@example.com</a>
              </div>
              <div className="flex items-center bg-slate-300 rounded-sm p-3">
                <Phone className="mr-2 text-gray-600" />
                <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a>
              </div>
              <div className="flex items-center bg-slate-300 rounded-sm p-3">
                <Globe className="mr-2 text-gray-600" />
                <a href="#" className="text-blue-500 hover:underline">www.johndoe.com</a>
              </div>
              <div className="flex items-center bg-slate-300 rounded-sm p-3">
                <Mail className="mr-2 text-gray-600" />
                <a href="mailto:john@example.com" className="text-blue-500 hover:underline">john@example.com</a>
              </div>
              <div className="flex items-center bg-slate-300 rounded-sm p-3">
                <Phone className="mr-2 text-gray-600" />
                <a href="tel:+1234567890" className="text-blue-500 hover:underline">+1 (234) 567-890</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

