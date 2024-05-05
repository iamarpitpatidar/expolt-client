'use server'

export async function getDeployURl() {
  console.log(process.env.URL)
  console.log(process.env.DEPLOY_URL)
  console.log(process.env.NETLIFY)
  console.log(process.env.CONTEXT)

  return process.env.NETLIFY
    ? process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_URL
    : process.env.DEPLOY_URL
}
