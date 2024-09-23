import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'

import { Post } from '../../../interfaces/interfaces'
import PostForm from '../PostForm'

import { Provider } from 'react-redux'
import { store } from '../../../store/store'

function getComponentParams() {
  const mockPost = {
    id: 1,
    userId: 1,
    title: 'Sample Post',
    body: 'This is a sample post.',
  }
  const onEditCallback = jest.fn()
  return { mockPost, onEditCallback }
}

function renderComponent(postToEdit?: Post, onEditCallback?: () => void) {
  render(
    <Provider store={store}>
      <PostForm postToEdit={postToEdit} onEditCallback={onEditCallback} />
    </Provider>
  )
}

describe('PostForm', () => {
  it('renders correctly (create case)', () => {
    renderComponent()

    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /content/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /user/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /create post/i })
    ).toBeInTheDocument()
  })

  it('renders correctly (edit case)', () => {
    const { mockPost, onEditCallback } = getComponentParams()
    renderComponent(mockPost, onEditCallback)

    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /content/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /user/i })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /edit post/i })
    ).toBeInTheDocument()
  })

  it('calls createPost when submitting form in create mode', async () => {
    const createPostMock = jest.fn()
    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      createPost: createPostMock,
    })

    renderComponent()

    const titleInput = screen.getByRole('textbox', { name: /title/i })
    const contentInput = screen.getByRole('textbox', { name: /content/i })
    const userCombo = screen.getByRole('combobox', { name: /user/i })
    const createButton = screen.getByRole('button', { name: /create post/i })

    await user.click(titleInput)
    await user.keyboard('New Post')

    await user.click(contentInput)
    await user.keyboard('New content')

    await user.selectOptions(userCombo, ['1'])

    await user.click(createButton)

    expect(createPostMock).toHaveBeenCalledWith({
      title: 'New Post',
      body: 'New content',
      userId: 1,
    })
  })

  it('handles form submission for editing a post', async () => {
    const updatePostMock = jest.fn()

    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      updatePost: updatePostMock,
    })
    const { mockPost, onEditCallback } = getComponentParams()
    renderComponent(mockPost, onEditCallback)

    const titleInput = screen.getByRole('textbox', { name: /title/i })
    const contentInput = screen.getByRole('textbox', { name: /content/i })
    const userCombo = screen.getByRole('combobox', { name: /user/i })
    const editButton = screen.getByRole('button', { name: /edit post/i })

    await user.click(titleInput)
    await user.clear(titleInput)
    await user.keyboard('Edited title')

    await user.click(contentInput)
    await user.clear(contentInput)
    await user.keyboard('Edited content')

    await user.selectOptions(userCombo, ['2'])

    await user.click(editButton)

    expect(updatePostMock).toHaveBeenCalledWith({
      id: 1,
      title: 'Edited title',
      body: 'Edited content',
      userId: 2,
    })
  })

  it('calls onEditCallback when editing is done', async () => {
    const updatePostMock = jest.fn()
    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      updatePost: updatePostMock,
    })

    const { mockPost } = getComponentParams()
    const onEditCallback = jest.fn()

    renderComponent(mockPost, onEditCallback)

    const editButton = screen.getByRole('button', { name: /edit post/i })
    await user.click(editButton)

    expect(onEditCallback).toHaveBeenCalled()
  })
})
