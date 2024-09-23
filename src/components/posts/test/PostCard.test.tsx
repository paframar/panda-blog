import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { store } from '../../../store/store'
import { render, screen, fireEvent } from '@testing-library/react'
import PostCard from '../PostCard'

const mockPost = {
  id: 1,
  userId: 1,
  title: 'Sample Post',
  body: 'This is a sample post.',
}

function renderComponent() {
  render(
    <Provider store={store}>
      <PostCard post={mockPost} index={4} />
    </Provider>
  )
}

describe('PostCard', () => {
  it('renders the post information', () => {
    renderComponent()
    expect(screen.getByText('Sample Post')).toBeInTheDocument()
    expect(screen.getByText('User #1')).toBeInTheDocument()
    expect(screen.getByText('This is a sample post.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument()
  })

  it('toggles edit mode when the Edit button is clicked', async () => {
    renderComponent()
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)

    expect(screen.queryByText('Sample Post')).not.toBeInTheDocument()
    expect(screen.queryByText('This is a sample post.')).not.toBeInTheDocument()
    expect(screen.getByText(/edit post/i)).toBeInTheDocument()
  })

  it('handles delete function', () => {
    const deletePostMock = jest.fn()

    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      deletePost: deletePostMock,
    })

    renderComponent()

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    expect(deletePostMock).toHaveBeenCalledWith(mockPost.id)
  })
})
