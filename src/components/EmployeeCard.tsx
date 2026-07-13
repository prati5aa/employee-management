import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  Star,
  MessageCircle,
  ExternalLink,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const EmployeeCard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Static employee data
  const employee = {
    name: 'Sarah Johnson',
    email: 'sarah.j@company.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Frontend Developer',
    department: 'Engineering',
    status: 'active',
    joinDate: 'Jan 15, 2023',
    location: 'New York, NY',
    avatar: 'SJ',
    rating: 4.8,
    projects: 12,
    tasks: 8
  };

  // Status Badge Component
  const StatusBadge = ({ status }: { status?: string }) => {
    const statusMap: Record<string, { bg: string; text: string; dot: string; icon: typeof CheckCircle; label: string }> = {
      active: { 
        bg: 'bg-emerald-50', 
        text: 'text-emerald-700', 
        dot: 'bg-emerald-500',
        icon: CheckCircle,
        label: 'Active'
      },
      inactive: { 
        bg: 'bg-slate-50', 
        text: 'text-slate-600', 
        dot: 'bg-slate-400',
        icon: XCircle,
        label: 'Inactive'
      },
      'on-leave': { 
        bg: 'bg-amber-50', 
        text: 'text-amber-700', 
        dot: 'bg-amber-500',
        icon: AlertCircle,
        label: 'On Leave'
      }
    };

    const config = statusMap[status ?? 'active'] || statusMap.active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="h-3.5 w-3.5" />
        {config.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 flex items-center justify-center">
      <div 
        className="w-full max-w-sm bg-white rounded-2xl border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Header with Gradient Background */}
        <div className="relative h-28 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl"></div>
          </div>

          {/* Action Menu */}
          <div className="absolute top-3 right-3">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-200 shadow-sm border border-white/20"
            >
              <MoreVertical className="h-4 w-4 text-slate-500" />
            </button>
            
            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-slate-200 py-1 z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Edit className="h-3.5 w-3.5" />
                  Edit Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  View Profile
                </button>
                <div className="border-t border-slate-100 my-1"></div>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-8 left-6">
            <div className={`
              w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 
              flex items-center justify-center text-white font-semibold text-lg
              shadow-lg shadow-indigo-200 ring-4 ring-white
              transition-all duration-300
              ${isHovered ? 'scale-110 rotate-3 shadow-xl shadow-indigo-300' : 'scale-100 rotate-0'}
            `}>
              {employee.avatar}
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="pt-10 px-6 pb-6">
          {/* Name & Position */}
          <div className="flex items-start justify-between mb-1">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                {employee.name}
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                {employee.position}
              </p>
            </div>
            <div className="flex-shrink-0 ml-3">
              <StatusBadge status={employee.status} />
            </div>
          </div>

          {/* Department & Location */}
          <div className="flex flex-wrap gap-3 mt-3 text-sm">
            <span className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              {employee.department}
            </span>
            <span className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              {employee.location}
            </span>
          </div>

          {/* Contact Info */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group/email">
              <div className="p-1 bg-indigo-50 rounded-lg group-hover/email:bg-indigo-100 transition-colors">
                <Mail className="h-3.5 w-3.5 text-indigo-500" />
              </div>
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors group/phone">
              <div className="p-1 bg-emerald-50 rounded-lg group-hover/phone:bg-emerald-100 transition-colors">
                <Phone className="h-3.5 w-3.5 text-emerald-500" />
              </div>
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <div className="p-1 bg-amber-50 rounded-lg">
                <Calendar className="h-3.5 w-3.5 text-amber-500" />
              </div>
              <span>Joined {employee.joinDate}</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
            <div className="text-center p-2 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors">
              <p className="text-lg font-bold text-slate-800">{employee.projects}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Projects</p>
            </div>
            <div className="text-center p-2 bg-slate-50/50 rounded-xl hover:bg-slate-50 transition-colors">
              <p className="text-lg font-bold text-slate-800">{employee.tasks}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Tasks</p>
            </div>
            <div className="text-center p-2 bg-amber-50/50 rounded-xl hover:bg-amber-50 transition-colors">
              <div className="flex items-center justify-center gap-0.5">
                <p className="text-lg font-bold text-amber-500">{employee.rating}</p>
                <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Rating</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white text-sm font-medium rounded-xl transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-indigo-300/50 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Message
            </button>
            <button className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Profile
            </button>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                <div className="w-5 h-5 rounded-full bg-indigo-200 ring-2 ring-white flex items-center justify-center text-[8px] font-bold text-indigo-700">JD</div>
                <div className="w-5 h-5 rounded-full bg-emerald-200 ring-2 ring-white flex items-center justify-center text-[8px] font-bold text-emerald-700">MC</div>
                <div className="w-5 h-5 rounded-full bg-amber-200 ring-2 ring-white flex items-center justify-center text-[8px] font-bold text-amber-700">ER</div>
              </div>
              <span className="text-xs text-slate-400">+2 team members</span>
            </div>
            <button className="text-xs text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1 transition-colors">
              View all
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;