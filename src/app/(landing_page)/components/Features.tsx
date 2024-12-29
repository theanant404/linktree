import { Link, Smartphone, Globe } from 'lucide-react'

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose LinkHub?</h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4">
            <Link className="h-12 w-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center" />
            <h3 className="text-xl font-bold">One Link for Everything</h3>
            <p className="text-gray-500 text-center">Share all your social profiles, websites, and content with just one link.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Smartphone className="h-12 w-12 rounded-full bg-purple-100 text-purple-500 p-2" />
            <h3 className="text-xl font-bold">Mobile Optimized</h3>
            <p className="text-gray-500 text-center">Our links look great on any device, ensuring a seamless experience for your audience.</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Globe className="h-12 w-12 rounded-full bg-purple-100 text-purple-500 p-2" />
            <h3 className="text-xl font-bold">Global Reach</h3>
            <p className="text-gray-500 text-center">Connect with your audience worldwide, breaking down geographical barriers.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

