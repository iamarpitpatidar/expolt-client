'use server'

export async function getDeployURl() {
  return process.env.NETLIFY
    ? process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL
    : process.env.DEPLOY_URL
}
