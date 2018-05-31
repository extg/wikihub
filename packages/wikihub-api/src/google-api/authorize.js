import GoogleAuth from 'google-auth-library'

/**
 * https://github.com/google/google-api-nodejs-client/#using-jwt-service-tokens
 */
export function authorizeByJwt({client_email, private_key}, scopes) {
  const auth = new GoogleAuth()

  return Promise.resolve(
    new auth.JWT(client_email, null, private_key, scopes, null)
  )
}
