import Image from 'next/image'

export default function Sponsors() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted by Industry Leaders</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              src={`/placeholder.svg?height=60&width=120`}
              alt={`Sponsor ${i}`}
              width={120}
              height={60}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

