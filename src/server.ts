import { app } from './app'

const port = 4000

app.listen(port, () => {
  console.log(`server on http://localhost:${port}`)
})
