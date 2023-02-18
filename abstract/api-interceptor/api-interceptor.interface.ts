export interface IApiInterceptorHandle {
  body: any;
  params: any;
  query: any;
  url: string;
  method: string;
  user?: any;
}

export interface IApiInterceptorHandleIntercept extends IApiInterceptorHandle {
  response: any;
}

export interface IApiInterceptorHandleCatch extends IApiInterceptorHandle {
  exception: any;
}
