import { Users, BookOpen, MessageSquare, BarChart3, DoorOpenIcon, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {  useBlogs } from "../ApiHook";
import { UserStore } from "../state/store";
import { useEffect } from "react";
import { FaDoorOpen } from "react-icons/fa6";

export default function AdminHome() {
  const {data:blogs} = useBlogs()

  const total_blogs = blogs?.length || 0;
  const userinfo = UserStore.useState(state => state.user)
  const navigate = useNavigate()

  useEffect(()=>{

    if(userinfo === null){
      navigate('/login')
    }

  },[navigate, userinfo])


  const logoutHandler = () => {
    UserStore.update(s => {
      s.user = null,
      s.isLoggedIn=false
    })
    localStorage.removeItem('userInfo');
   
  };
  


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>

          <div className="flex justify-center flex-col ">
   
          <button onClick={logoutHandler} className="btn btn-primary" >
            <LogOut/>
            Logout</button>
           
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
              <Link to="/admin/blogs">
              <AdminCard
                title="Manage Blogs"
                description="Create, edit, and delete blog posts"
                icon={<BookOpen className="h-6 w-6 text-gray-500 dark:text-gray-400" />}
                metric={total_blogs}
                metricLabel="Active Blogs"
              />
              </Link>
             
              <AdminCard
                title="Manage Teams"
                description="Review and moderate teams"
                icon={
                  <Users className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                }
                metric="0"
                metricLabel="Pending Comments"
              />
            
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminCard({ title, description, icon, metric, metricLabel }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
        <div>{icon}</div>
      </div>
      <div className="p-4">
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {metric}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{metricLabel}</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>
    </div>
  );
}
