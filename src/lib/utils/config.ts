'use server'

export async function getDeployURl() {
  console.log(process.env.URL)
  console.log(process.env.DEPLOY_URL)
  console.log(process.env.NETLIFY)
  console.log(process.env.DEPLOY_PRIME_URL)

  return process.env.NETLIFY
    ? process.env.NODE_ENV === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL
    : process.env.DEPLOY_URL
}
