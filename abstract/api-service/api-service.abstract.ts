import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassConstructor } from 'class-transformer';
import { TransformUtils } from '../utils/transform.utils';
import { IGenerateHeaders } from './interface/abstract-api/generate-headers.interface';
import { AbstractApiException } from './exception/abstract-api.exception';

export abstract class ApiServiceAbstract {
  protected api: AxiosInstance;

  protected constructor(
    baseURL: string,
    config?: AxiosRequestConfig,
    private exception = AbstractApiException,
  ) {
    this.api = axios.create({
      ...config,
      baseURL,
    });
  }

  protected async get<T>(
    url: string,
    token?: string,
    config?: AxiosRequestConfig,
    cls?: ClassConstructor<T>,
  ): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.get(url, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err) {
      throw new this.exception(err.response.data);
    }
  }

  protected async post<T>(
    url: string,
    data?: any,
    token?: string,
    config?: AxiosRequestConfig,
    cls?: ClassConstructor<T>,
  ): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.post(url, data, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err) {
      throw new this.exception(err.response.data);
    }
  }

  protected async put<T>(
    url: string,
    data?: any,
    token?: string,
    cls?: ClassConstructor<T>,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.put(url, data, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err) {
      throw new this.exception(err.response.data);
    }
  }

  protected async delete<T>(
    url: string,
    token?: string,
    config?: AxiosRequestConfig,
    cls?: ClassConstructor<T>,
  ): Promise<AxiosResponse<T | T[]>> {
    try {
      const result = await this.api.delete(url, {
        ...config,
        ...(token ? this.generateHeaders(token) : {}),
      });

      return {
        ...result,
        data: cls
          ? TransformUtils.plainToInstance(cls, result.data)
          : result.data,
      };
    } catch (err) {
      throw new this.exception(err.response.data);
    }
  }

  protected generateHeaders(token: string): IGenerateHeaders {
    return {
      headers: {
        Authorization: 'Bearer ' + token.replace('Bearer ', ''),
      },
    };
  }
}
