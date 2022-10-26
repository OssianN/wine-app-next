const handler = async (req, res) => {
  const { wineList } = JSON.parse(req.body)
  try {
    if (!wineList) {
      res.status(200).json([])
      return
    }

    const data = await getData(wineList)
    res.status(200).json(data)
  } catch (err) {
    console.error(err, 'IN GET /WINES')
    res.status(500).send(err)
  }
}

export default handler
