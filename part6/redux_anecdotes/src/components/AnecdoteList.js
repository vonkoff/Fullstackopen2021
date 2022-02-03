import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upVoteThis } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const upVote = (id) => {
        dispatch(upVoteThis(id))
    }

    const anecdotesByVotes = anecdotes.sort((a,b) => a.votes - b.votes).reverse()

    return (
      anecdotesByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => upVote(anecdote.id)}>vote</button>
          </div>
        </div>
      )
    )
}

export default AnecdoteList