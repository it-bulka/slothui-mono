export const usePrefetch = () => {
  return (url: string) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    link.onload = () => link.remove()
    document.head.appendChild(link)
  }
}