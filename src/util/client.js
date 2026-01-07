import Environment from './environment.js'
import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'mmd5bl9c',
  dataset: Environment(), // get dataset based on current environment
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // Use a recent API version
})
