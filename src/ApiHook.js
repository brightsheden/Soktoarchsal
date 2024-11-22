import axios from "axios";
import { UserStore } from "./state/store";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { API_URL } from "../config";




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
    const token = UserStore.useState(state => state.user.token);
    
    return useMutation(
      async ({id, data}) => {
        try {
          console.log('Sending data:', Object.fromEntries(data.entries())); // Debug log
          const response = await axios.put(`${API_URL}/api/blog/update/${id}/`, data, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data;
        } catch (error) {
          console.error('API Error:', error.response?.data); // Debug log
          throw new Error(
            error.response?.data?.message || 
            error.response?.data?.detail || 
            'Failed to update blog'
          );
        }
      },
      {
        onSuccess: (data, variables) => {
          queryClient.invalidateQueries('blogs');
          queryClient.invalidateQueries(['blog-details', variables.id]);
        },
        onError: (error) => {
          console.error('Update failed:', error);
        }
      }
    );
  };
  

  export const useBlogs = () => {
    return useQuery('blogs', async () => {
    
      const { data } = await axios.get(`${API_URL}/api/blogs`);
      return data;
    });
  };
  


export const useGetBlogByDetails = (slug) => {
  return useQuery(['blog-details', slug],
    async () => {
      try {
        const response = await axios.get(`${API_URL}/api/blog/${slug}/`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch blog details');
      }
    },
    {
      enabled: !!slug,
      retry: 1
    }
  );
};



export const useDelete = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({id}) => {
      const response = await axios.delete(`${API_URL}/api/blogs/${id}/`);
      return response.data;
    }
  ), {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    }
  }
}



export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState(state => state.user.token)

  
  return useMutation(
    async ({ id }) => {
      const response = await axios.delete(`${API_URL}/api/blog/delete/${id}/`, {
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

