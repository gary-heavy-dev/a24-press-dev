// 1. Check to see if TYPE has been set by Netlify toml.
// 2. If it hasn't been set, this is probably the development environment and you can use the staging dataset.
// 3. If TYPE has been set only use the 'production' dataset if we're in production.

function Environment() {
  if (process.env.TYPE != 'production') {
    return 'staging'
  } else {
    return process.env.TYPE === 'production' ? 'production' : 'staging'
  }
}

export default Environment