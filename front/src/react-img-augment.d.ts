export {};

declare module 'react' {
  interface ImgHTMLAttributes<_T> {
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
