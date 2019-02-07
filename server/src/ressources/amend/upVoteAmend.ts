import socketIO from 'socket.io'
import { Amend, User } from '../../models'

export const upVoteAmend = {
  name: 'upVoteAmend',
  callback: ({
    io,
    socket,
    session
  }: {
    io: socketIO.Server
    socket: socketIO.Socket
    session: any
  }) => async ({ token, data }: any) => {
    const user = await User.model.findOne({ token })
    if (user && user.activated) {
      const amend = await Amend.model.findById(data.id)
      if (user.followedTexts.indexOf(amend.text) > -1) {
        if (!amend.closed) {
          if (user.upVotes.indexOf(data.id) === -1) {
            const id1 = user.downVotes.indexOf(data.id)
            if (id1 > -1) {
              amend.downVotesCount--
              user.downVotes.splice(id1, 1)
            }

            const id2 = user.indVotes.indexOf(data.id)
            if (id2 > -1) {
              amend.indVotesCount--
              user.indVotes.splice(id2, 1)
            }

            amend.upVotesCount++
            user.upVotes.push(data.id)

            await user.save()
            session.user = user

            await amend.save()

            io.emit('amend/' + amend._id, { data: amend })
            socket.emit('upVoteAmend', { data: amend })
          } else {
            socket.emit('upVoteAmend', {
              error: { code: 405, message: 'Vous avez déjà voté pour' }
            })
          }
        } else {
          socket.emit('upVoteAmend', {
            error: { code: 405, message: 'Ce scrutin est terminé' }
          })
        }
      } else {
        socket.emit('upVoteAmend', {
          error: {
            code: 405,
            message: 'Cet utilisateur ne participe pas au texte'
          }
        })
      }
    } else {
      socket.emit('upVoteAmend', {
        error: { code: 401, message: "Cet utilisateur n'est pas connecté" }
      })
    }
  }
}