export const deleteTempUrl = (tempUrl: string) => {
  URL.revokeObjectURL(tempUrl)
}