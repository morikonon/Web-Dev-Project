// src/app/interceptors/token.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access');

  const publicEndpoints = [
    '/login',
    '/register',
    '/genres/choices',
    '/publishers/choices',
    '/age-limits',
  ];

  if (publicEndpoints.some(endpoint => req.url.includes(endpoint))) {
    return next(req); 
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(authReq);
  }

  return next(req);
};
