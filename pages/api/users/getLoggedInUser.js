import { withSessionAPI } from '../../../lib/session'

const handler = (req, res) => {
  res.send({ user: req.session.user })
}

export default withSessionAPI(handler)
