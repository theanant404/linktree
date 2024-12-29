import { Check } from 'lucide-react'

interface PricingProps {
  id?: string;
}

const plans = [
  { name: 'Basic', description: 'For individuals', price: '0' },
  { name: 'Pro', description: 'For professionals', price: '19', popular: true },
  { name: 'Enterprise', description: 'For large teams', price: '49' }
]

export default function Pricing({ id }: PricingProps) {
  return (
    <section id={id} className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative flex flex-col p-6 bg-white shadow-lg rounded-lg justify-between border ${plan.popular ? 'border-purple-500' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-center mb-4">{plan.name}</h3>
                <p className="text-center text-gray-600 mb-4">{plan.description}</p>
                <p className="text-center text-4xl font-bold mb-6">
                  ${plan.price}<span className="text-base font-normal">/month</span>
                </p>
                <ul className="space-y-2 mb-6">
                  {[
                    'Custom URL',
                    'Analytics',
                    i > 0 && 'Remove LinkHub branding',
                    i > 1 && 'Priority support',
                  ].filter(Boolean).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-green-500 mr-2 h-5 w-5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className={`mt-6 w-full py-2 px-4 rounded-lg transition-colors ${
                plan.popular
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

