import axios from "axios";
import { UserStore } from "./state/store";
import { useMutation, useQuery, useQueryClient } from "react-query";


const API_URL = 'http://127.0.0.1:8000'


const loginUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/api/auth/login/`, loginData);
    return response.data; 
  };
  
  export const useLogin = () => {
    return useMutation(loginUser, {
      onSuccess: (data) => {
        // Store user data in Pullstate's UserStore
        localStorage.setItem('userInfo', JSON.stringify(data));
        UserStore.update(s => {
          s.user = data;
          s.isLoggedIn = true;
        });
  
  
  
        
      },
  
    });
  };



  const RegisterUser = async (loginData) => {
    const response = await axios.post(`${API_URL}/api/auth/register/`, loginData);
    return response.data; 
  };
  
  export const useRegister = () => {
    return useMutation(RegisterUser, {
      onSuccess: (data) => {
        // Store user data in Pullstate's UserStore
        localStorage.setItem('userInfo', JSON.stringify(data));
        UserStore.update(s => {
          s.user = data;
          s.isLoggedIn = true;
        });        
      },
  
    });
  };



  const logoutUser = async () => {
    UserStore.update({
        userInfo : null,
        isLoggedIn : false
    })

  }



 export  const useCreateBlog =  ()=>{
    const queryClient = useQueryClient();
    const token = UserStore.useState(s => s.user.token)
    return useMutation(async (blogData) => {

      const config = {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${token}`
          }
      }
      const response  = await axios.post(`${API_URL}/api/blog/create_blog/`, blogData, config);
      return response.data;
    }, {
        onSuccess:()=>{
            queryClient.invalidateQueries('fetchAdminBlogs');
        }
    })
  }





export const useEditBlog = () => {
    const queryClient = useQueryClient();
    const token = UserStore.useState(state => state.user.token)
    return useMutation(
      async ({id,data }) => {
        const response = await axios.put(`${API_URL}/api/blog/update/${id}/`, data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      },
      {
        onSuccess: () => {
         queryClient.invalidateQueries('blogs');
        },
      }
    );
  };
  

  export const useBlogs = () => {
    return useQuery('blogs', async () => {
    
      const { data } = await axios.get(`${API_URL}/api/blogs`);
      return data;
    });
  };
  


export const useGetBlogByDetails = (slug)=>{
  return useQuery(['blog-datails'],
    async () => {
      
     const response = await axios.get(`${API_URL}/api/blog/${slug}/`)
      console.log(response.data)
     return response.data
    }
  )
}