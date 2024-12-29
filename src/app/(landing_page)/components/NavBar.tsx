'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const session=useSession()

  return (
    <nav className="bg-green-100 sticky top-0  shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-green-600">LinkHub</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="#features" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Features</Link>
              <Link href="#pricing" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Pricing</Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Testimonials</Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="#faq" className="text-gray-600 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">FAQ</Link>
            </div>
          </div>
          <div className='flex gap-x-6 justify-center'>
          <div className="hidden md:block">
            {session.status === 'authenticated' && session.data ? (<>
            <Button onClick={()=>{signOut()}} variant={"link"} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md dark:text-white text-slate-900 ">
              Log Out
            </Button>
            </>):(<>
              <Link href={"/auth/v1/sign-in"}  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md dark:text-slate-50 text-slate-900 bg-green-300 ">
              Sign In
            </Link>
            </>)}
            
          </div>
          <ThemeSwitcher/>
          </div>
          <div className="-mr-2 flex md:hidden">
            <Button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200  "
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#features" className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Features</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Pricing</Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">Testimonials</Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="#faq" className="text-gray-600 hover:text-green-600 block px-3 py-2 rounded-md text-base font-medium">FAQ</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
          {session.status === 'authenticated' && session.data ? (<> <div className="px-2">
              <Button onClick={()=>{signOut()}} variant={"link"} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700">
                Log Out
              </Button>
            </div></>):(
              <div className="flex flex-col gap-2">
              <div className="px-2">
              <Link href="/auth/v1/sign-in" className="block text-center px-3 py-2 rounded-md text-base font-medium text-slate-800 dark:text-slate-50 bg-green-100 hover:bg-green-200">
                Sign In
              </Link>
            </div>
            <div className="px-2">
              <Link href="/auth/v1/sign-up" className="block px-3 py-2 text-center rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700">
                Sign Up
              </Link>
            </div>
            </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

