import { withSessionAPI } from '../../../lib/session'

export const handler = async (req, res) => {
  try {
    req.session.destroy()
    res.status(200).send()
  } catch (err) {
    res.status(500).send()
  }
}

export default withSessionAPI(handler)
