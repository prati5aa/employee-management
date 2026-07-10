import { Bell, ChevronDown, Grid, Menu, Search, Sun } from 'lucide-react'
import React from 'react'

const Nav = () => {
  return (
     <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200">
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="font-semibold text-white text-lg hidden sm:block">Admin</span>
            <span className="text-slate-500 text-xs font-medium bg-slate-800 px-2 py-0.5 rounded-full hidden md:block">
              v2.0
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-sm ml-4">
            <span className="text-slate-500">Dashboard</span>
            <span className="text-slate-700">/</span>
            <span className="text-slate-300 font-medium">Analytics</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 w-48 lg:w-64 transition-all duration-200 hover:border-slate-600 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
            <Search className="h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm text-slate-300 w-full placeholder:text-slate-500"
              readOnly
            />
            <kbd className="hidden lg:block text-[10px] font-mono text-slate-500 bg-slate-700 px-1.5 py-0.5 rounded border border-slate-600">
              ⌘K
            </kbd>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200">
              <Grid className="h-5 w-5" />
            </button>
            <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900"></span>
            </button>
            <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-400 hover:text-slate-200">
              <Sun className="h-5 w-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-8 bg-slate-800"></div>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-slate-800 rounded-xl px-2 py-1.5 transition-colors duration-200">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-indigo-500/20">
                JD
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-slate-900"></div>
            </div>

            <div className="hidden md:block">
              <p className="text-sm font-medium text-white leading-none">John Doe</p>
              <p className="text-xs text-slate-400 leading-none mt-1">Administrator</p>
            </div>

            <ChevronDown
             className="h-4 w-4 text-slate-500 hidden sm:block" />
          </div>

          <button className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors duration-200 text-slate-400">
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
