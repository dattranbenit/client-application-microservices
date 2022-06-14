export const SERVER = {
  resource_uri: "http://localhost:8005",
  clientId: "jmaster",
  clientSecret: "123",
  scopes: "read write log notification",
  callback_uri: "http://localhost:3000/login",
  auth_uri: 'http://localhost:8007'//check http://localhost:8005/security, combine all in one route
}