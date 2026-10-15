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





export const useAddImage = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState(s => s.user.token);
  
  return useMutation(async (imageData) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await axios.post(`${API_URL}/api/gallery/add_image/`, imageData, config);
    return response.data;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('fetchGalleryImages');
    }
  });
};

export const useEditImage = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState(state => state.user.token);
  
  return useMutation(
    async ({id, data}) => {
      try {
        const response = await axios.put(`${API_URL}/api/gallery/update_image/${id}/`, data, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to update image');
      }
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('gallery');
        queryClient.invalidateQueries(['image-details', variables.id]);
      }
    }
  );
};

export const useGalleryImages = () => {
  return useQuery('gallery', async () => {
    const { data } = await axios.get(`${API_URL}/api/gallery/get_images/`);
    return data;
  });
};

export const useGetImageDetails = (id) => {
  return useQuery(['image-details', id],
    async () => {
      try {
        const response = await axios.get(`${API_URL}/api/gallery/get_image/${id}/`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch image details');
      }
    },
    {
      enabled: !!id,
      retry: 1
    }
  );
};

export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState(s=> s.user.token)
  
  return useMutation(
    async ({id}) => {
      const response = await axios.delete(`${API_URL}/api/gallery/delete_image/${id}/`, {
        
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
          },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('gallery');
      }
    }
  );
};

export const useDocuments = (params = {}) => {
  const { page = 1, search = '', category = '', pageSize = 9 } = params;
  return useQuery(
    ['documents', page, search, category, pageSize],
    async () => {
      const queryParams = new URLSearchParams();
      if (page) queryParams.append('page', page);
      if (pageSize) queryParams.append('page_size', pageSize);
      if (search) queryParams.append('search', search);
      if (category && category !== 'All') queryParams.append('category', category);

      const url = `${API_URL}/api/documents/?${queryParams.toString()}`;
      const { data } = await axios.get(url);
      return data;
    },
    {
      keepPreviousData: true,
    }
  );
};

export const useDocumentDetails = (id) => {
  return useQuery(
    ['document-details', id],
    async () => {
      try {
        const response = await axios.get(`${API_URL}/api/documents/${id}/`);
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.detail || 'Failed to fetch document details');
      }
    },
    {
      enabled: !!id,
      retry: 1,
    }
  );
};

export const useDocumentCategories = () => {
  return useQuery('document-categories', async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/documents/categories/`);
      return data;
    } catch {
      return [];
    }
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState((s) => s.user?.token);

  return useMutation(
    async (formData) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}/api/documents/create/`, formData, config);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
        queryClient.invalidateQueries('document-categories');
      },
    }
  );
};

export const useUpdateDocument = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState((state) => state.user?.token);

  return useMutation(
    async ({ id, data }) => {
      try {
        const response = await axios.put(`${API_URL}/api/documents/update/${id}/`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message ||
            error.response?.data?.detail ||
            'Failed to update document'
        );
      }
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries('documents');
        queryClient.invalidateQueries(['document-details', variables.id]);
        queryClient.invalidateQueries('document-categories');
      },
    }
  );
};

export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  const token = UserStore.useState((s) => s.user?.token);

  return useMutation(
    async ({ id }) => {
      const response = await axios.delete(`${API_URL}/api/documents/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
        queryClient.invalidateQueries('document-categories');
      },
    }
  );
};

