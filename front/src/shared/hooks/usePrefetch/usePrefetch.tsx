export const usePrefetch = () => {
  return (url: string) => {
    const img = new Image()
    img.src = url
  }
}