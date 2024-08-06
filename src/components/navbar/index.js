import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { BarraNavegacao } from './styles.js'; 
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
/* import logoOlimpiedas from '../../logoOlimpiedas.svg' */


export default function NavBar() {
  return (
      <BarraNavegacao>
        <Disclosure as="nav">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between h-[7rem]">
              <div className="flex flex-1 items-center justify-center sm:items-stretch">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src='https://gstatic.olympics.com/s1/f_auto/static/srm/paris-2024/topic-assets/paris-2024/emblem-oly.svg'
                    className="h-16 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </Disclosure>
      </BarraNavegacao>
  )
}
