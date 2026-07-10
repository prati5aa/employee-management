import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings,
  HelpCircle,
  Search,
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
  FolderKanban,
  Bell
} from 'lucide-react';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  // Menu items
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'employees', icon: Users, label: 'Employees' },
    { id: 'add-employee', icon: UserPlus, label: 'Add Employee' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'projects', icon: FolderKanban, label: 'Projects' },
    { id: 'tasks', icon: Calendar, label: 'Tasks' },
    { id: 'messages', icon: MessageSquare, label: 'Messages' },
  ];

  const bottomMenu = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <div 
      className={`
        relative bg-white border-r border-slate-200/80 shadow-sm
        transition-all duration-300 ease-in-out h-screen sticky top-0
        ${isCollapsed ? 'w-20' : 'w-64'}
        flex flex-col
      `}
    >
      {/* Logo */}
      <div className={`
        flex items-center gap-3 px-4 h-16 border-b border-slate-200/60
        ${isCollapsed ? 'justify-center' : 'justify-start'}
      `}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-200 flex-shrink-0">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        {!isCollapsed && (
          <div>
            <span className="font-bold text-slate-800 text-lg">Admin</span>
            <span className="text-[10px] text-slate-400 block -mt-0.5">Dashboard</span>
          </div>
        )}
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="px-3 py-3 border-b border-slate-200/60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 relative group
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : ''}`} />
                
                {!isCollapsed && (
                  <span className="text-sm font-medium flex-1 text-left">
                    {item.label}
                  </span>
                )}

                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-200/60 p-3">
        {/* Bottom menu items */}
        <div className="space-y-1 mb-2">
          {bottomMenu.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 relative group
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }
                  ${isCollapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-indigo-600' : ''}`} />
                
                {!isCollapsed && (
                  <span className="text-sm font-medium flex-1 text-left">
                    {item.label}
                  </span>
                )}

                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* User Profile */}
        <div className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl
          hover:bg-slate-50 transition-all duration-200 cursor-pointer
          ${isCollapsed ? 'justify-center' : 'justify-start'}
        `}>
          <div className="relative flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-md shadow-indigo-200">
              JD
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white"></div>
          </div>
          
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">John Doe</p>
              <p className="text-xs text-slate-400 truncate">Administrator</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
          text-red-600 hover:bg-red-50 transition-all duration-200 relative group
          ${isCollapsed ? 'justify-center' : 'justify-start'}
          mt-1
        `}>
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm font-medium">Logout</span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center hover:bg-slate-50 z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-slate-500" />
        )}
      </button>
    </div>
  );
};

export default Sidebar;