export const updateUserSession = async (session, updatedUser) => {
  try {
    session.user = updatedUser
    await session.save()
  } catch (err) {
    console.error(err, 'updateUserSession')
  }
}
