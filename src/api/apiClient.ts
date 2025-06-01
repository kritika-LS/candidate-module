import axios, {AxiosInstance, AxiosError, AxiosRequestConfig} from 'axios';
import { ENV } from '../config/env';
import { APP_CONSTANTS } from '../config/constants';
import { ApiError } from '../models/types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.DEV_API_URL,
      timeout: APP_CONSTANTS.API_TIMEOUT,
      headers: {
        // 'Content-Type': 'application/json',
      },
    });
    this.setupInterceptors();
    this.GetToken(); 
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  public async GetToken(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('✅ Token get in axios headers:', {
          token: token, // Log only first 20 chars for security
          headers: this.axiosInstance.defaults.headers.common
        });
      } else {
        console.warn('⚠️ No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('❌ Error fetching token from AsyncStorage:', error);
    }
  }

  public async setToken(token: string): Promise<void> {
    try {
      if (token) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('✅ Token set in axios headers:', {
          token: token, // Log only first 20 chars for security
          headers: this.axiosInstance.defaults.headers.common
        });
      } else {
        console.warn('⚠️ No token found in AsyncStorage');
      }
    } catch (error) {
      console.error('❌ Error fetching token from AsyncStorage:', error);
    }
  }

   private setupInterceptors() {
    // Request interceptor
     this.axiosInstance.interceptors.request.use(
       config => {
        console.log('🌐 Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          baseURL: config.baseURL,
          headers: config.headers,
          data: config.data,
          params: config.params,
        });
        return config;
      },
      error => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      },
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      response => {
        console.log('✅ Response:', {
          status: response.status,
          url: response.config.url,
          method: response.config.method?.toUpperCase(),
          data: response.data,
          timestamp: new Date().toISOString(),
        });
        return response;
      },
      (error: AxiosError) => {
        console.error('❌ Response Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method?.toUpperCase(),
          timestamp: new Date().toISOString(),
        });
        

        const apiError: ApiError = {
          message: error.message,
          status: error.response?.status || 500,
          code: error.code,
        };
        return Promise.reject({...error?.response,apiError});
      },
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    console.log('📤 Making GET Request:', {
      url,
      config,
      timestamp: new Date().toISOString(),
    });
    try{
      return this.axiosInstance.get(url, config).then(response => {
        console.log('📥 GET Response:', {
          url,
          data: response.data,
          timestamp: new Date().toISOString(),
        });
        return response.data;
      });

    }catch(error) {
      console.log('📥 GET Response:', {
        url,
        data: error,
        timestamp: new Date().toISOString(),
      })
      throw new Error(String(error));
    }
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    console.log('📤 Making POST Request:', {
      url,
      data,
      config,
      timestamp: new Date().toISOString(),
    });

    // If data is FormData, set the correct Content-Type and other headers
    if (data instanceof FormData) {
      // Remove Content-Type header to let the browser set it with the boundary
      if (config?.headers) {
        delete config.headers['Content-Type'];
      }
      
      // Ensure we're using the latest token
      const token = this.axiosInstance.defaults.headers.common['Authorization'];
      if (token) {
        config = {
          ...config,
          headers: {
            ...config?.headers,
            'Authorization': token,
          },
        };
      }
    }

    try{
      return this.axiosInstance.post(url, data, config).then(response => {
        console.log('📥 POST Response:', {
          url,
          data: response.data,
          timestamp: new Date().toISOString(),
        });
        return response.data;
      });
    }catch(error) {
      console.log('📥 POST Response:', {
        url,
        data: error,
        timestamp: new Date().toISOString(),
      })
      throw new Error(String(error));
    }
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    console.log('📤 Making PUT Request:', {
      url,
      data,
      config,
      timestamp: new Date().toISOString(),
    });
    return this.axiosInstance.put(url, data, config).then(response => {
      console.log('📥 PUT Response:', {
        url,
        data: response.data,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    });
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    console.log('📤 Making DELETE Request:', {
      url,
      config,
      timestamp: new Date().toISOString(),
    });
    return this.axiosInstance.delete(url, config).then(response => {
      console.log('📥 DELETE Response:', {
        url,
        data: response.data,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    });
  }
}

export default ApiClient.getInstance();
