async function validateOwner(req, res, next) {
    const { owner } = req.body;
    try {
      const user = await getUserDetails(owner);
      if (!user) {
        return res.status(400).json({ message: 'Invalid owner' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Error validating owner' });
    }
  }
