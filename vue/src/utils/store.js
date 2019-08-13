export const saveSwaggerConfig = (data) => {
  window.localStorage.setItem('swagger-config', JSON.stringify(data))
}

export const getSwaggerConfig = () => {
  const config = window.localStorage.getItem('swagger-config')
  return config ? JSON.parse(config) : []
}
