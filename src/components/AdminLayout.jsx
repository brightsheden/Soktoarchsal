import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Image as ImageIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  User as UserIcon,
  ShieldCheck,
  PlusCircle,
  FileUp,
  ImagePlus,
} from 'lucide-react';
import { UserStore } from '../state/store';

const navItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    exact: true,
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Documents',
    path: '/admin/documents',
    icon: FileText,
    badge: 'Library',
    subLinks: [
      { name: 'All Documents', path: '/admin/documents' },
      { name: 'Upload Document', path: '/admin/documents/create', icon: FileUp },
    ],
  },
  {
    name: 'Blogs & News',
    path: '/admin/blogs',
    icon: BookOpen,
    badge: 'Articles',
    subLinks: [
      { name: 'All Posts', path: '/admin/blogs' },
      { name: 'Create Post', path: '/createblog', icon: PlusCircle },
    ],
  },
  {
    name: 'Photo Gallery',
    path: '/admin/gallery',
    icon: ImageIcon,
    badge: 'Media',
    subLinks: [
      { name: 'All Photos', path: '/admin/gallery' },
      { name: 'Upload Photo', path: '/admin/gallery/upload', icon: ImagePlus },
    ],
  },
];

export default function AdminLayout({
  children,
  title,
  subtitle,
  actions,
  breadcrumbs = [],
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userinfo = UserStore.useState((state) => state.user);

  useEffect(() => {
    if (!userinfo) {
      navigate('/login');
    }
  }, [userinfo, navigate]);

  // Close sidebar drawer on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const logoutHandler = () => {
    UserStore.update((s) => {
      s.user = null;
      s.isLoggedIn = false;
    });
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const isActive = (itemPath, exact = false) => {
    if (exact) {
      return location.pathname === itemPath;
    }
    return location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex text-slate-800 dark:text-slate-100 antialiased font-sans">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-800 shadow-2xl lg:shadow-none`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-lg shadow-emerald-900/40 flex items-center justify-center shrink-0">
              <img
                src="/acresal-logo.png"
                alt="ACReSAL Logo"
                className="w-full h-full object-contain rounded-lg bg-white p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  ACReSAL Sokoto
                </span>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-400/90 block">
                Admin Management Portal
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Core Modules
            </span>
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path, item.exact);

                return (
                  <div key={item.path} className="space-y-1">
                    <Link
                      to={item.path}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                        active
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/30'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={active ? 'text-white' : 'text-slate-400'}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && !active && (
                        <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </Link>

                    {/* Sub Links (if active) */}
                    {active && item.subLinks && (
                      <div className="ml-4 pl-4 border-l border-slate-800 space-y-1 py-1">
                        {item.subLinks.map((sub) => {
                          const SubIcon = sub.icon;
                          const isSubActive = location.pathname === sub.path;
                          return (
                            <Link
                              key={sub.path}
                              to={sub.path}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                isSubActive
                                  ? 'text-emerald-400 bg-slate-800/80'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                              }`}
                            >
                              {SubIcon ? <SubIcon size={14} /> : <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                              <span>{sub.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div>
            <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
              External & Quick Links
            </span>
            <nav className="space-y-1">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white text-sm font-medium transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink size={18} className="text-slate-400" />
                  <span>Public Website</span>
                </div>
                <span className="text-[10px] text-slate-500">Live</span>
              </Link>
            </nav>
          </div>
        </div>

        {/* User Footer Card */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-emerald-700/80 text-white font-bold flex items-center justify-center shrink-0 shadow-inner">
                {userinfo?.username ? (
                  userinfo.username.slice(0, 2).toUpperCase()
                ) : (
                  <UserIcon size={18} />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {userinfo?.username || userinfo?.email || 'Administrator'}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-slate-400">Authenticated</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={logoutHandler}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-red-900/40 transition-colors"
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>

            {/* Breadcrumb Hierarchy */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 min-w-0">
              <Link
                to="/admin"
                className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium shrink-0"
              >
                Admin
              </Link>
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight size={14} className="text-slate-400 shrink-0" />
                  {crumb.path ? (
                    <Link
                      to={crumb.path}
                      className="hover:text-emerald-600 dark:hover:text-emerald-400 font-medium truncate"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {crumb.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <ExternalLink size={13} />
              <span>Public Portal</span>
            </Link>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-200 dark:border-emerald-800">
                <ShieldCheck size={16} />
              </div>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 hidden md:inline-block">
                {userinfo?.username || 'Admin'}
              </span>
            </div>
          </div>
        </header>

        {/* Page Header (if title is provided) */}
        {title && (
          <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex items-center gap-3 shrink-0">{actions}</div>
              )}
            </div>
          </div>
        )}

        {/* Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
