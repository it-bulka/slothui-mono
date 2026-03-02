export const createTempUrl = (file: File) => {
  return URL.createObjectURL(file)
}