import Environment from './environment.js'
import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'mmd5bl9c',
  dataset: Environment(), // get dataset based on current environment
  useCdn: false // `false` if you want to ensure fresh data
})