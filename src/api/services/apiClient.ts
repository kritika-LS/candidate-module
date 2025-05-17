import axios, {AxiosInstance, AxiosError, AxiosRequestConfig} from 'axios';
import { ENV } from '../../config/env';
import { APP_CONSTANTS, AUTH_CONSTANTS } from '../../config/constants';
import { ApiError } from '../../models/types/common';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.API_URL,
      timeout: APP_CONSTANTS.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AUTH_CONSTANTS.AUTH_TOKEN}`,
      },
    });

    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
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
        return Promise.reject(apiError);
      },
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    console.log('📤 Making GET Request:', {
      url,
      config,
      timestamp: new Date().toISOString(),
    });
    return this.axiosInstance.get(url, config).then(response => {
      console.log('📥 GET Response:', {
        url,
        data: response.data,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    });
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
    return this.axiosInstance.post(url, data, config).then(response => {
      console.log('📥 POST Response:', {
        url,
        data: response.data,
        timestamp: new Date().toISOString(),
      });
      return response.data;
    });
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
