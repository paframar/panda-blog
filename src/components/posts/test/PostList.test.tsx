import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RootState } from '../../../store/store'
import { StoreState } from '../../../interfaces/interfaces'
import PostList from '../PostList'

function renderComponent(initialState: StoreState) {
  const mockStore = {
    getState: () => initialState,
    subscribe: () => {},
    dispatch: () => {},
  }

  render(
    <Provider store={mockStore}>
      <PostList />
    </Provider>
  )
}

describe('PostList', () => {
  it('renders post cards correctly', () => {
    const initialState: StoreState = {
      posts: [
        {
          id: 1,
          userId: 1,
          title: 'Mock Post 1',
          body: 'This is a mock post 1.',
        },
        {
          id: 2,
          userId: 2,
          title: 'Mock Post 2',
          body: 'This is a mock post 2.',
        },
      ],
      users:[]
    }

    renderComponent(initialState)

    const screenElements = [
      screen.getByRole('heading', { name: /Mock Post 1/i }),
      screen.getByText(/User #1/i),
      screen.getByText(/This is a mock post 1/i),
      screen.getByRole('heading', { name: /Mock Post 2/i }),
      screen.getByText(/User #2/i),
      screen.getByText(/This is a mock post 2/i),
    ]
    screenElements.forEach((screenElement) => {
      expect(screenElement).toBeInTheDocument()
    })

    const editButtons = screen.getAllByRole('button', { name: /edit/i })
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i })

    expect(editButtons).toHaveLength(2)
    expect(deleteButtons).toHaveLength(2)
  })

  it('renders no posts message when no posts are available', () => {
    const initPostsMock = jest.fn(() => [])

    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      initPosts: initPostsMock,
    })

    const initialState = {
      posts: [],
    }

    renderComponent(initialState)

    const noPostsMessage = screen.getByText(/no hay posts para mostrar/i)

    expect(noPostsMessage).toBeInTheDocument()
  })

  it('calls initPosts on mount when posts are empty', () => {
    const initPostsMock = jest.fn()

    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      initPosts: initPostsMock,
    })

    const initialState: RootState = {
      posts: [],
    }

    renderComponent(initialState)

    expect(initPostsMock).toHaveBeenCalled()
  })

  it('does not call initPosts when posts are not empty', () => {
    const initPostsMock = jest.fn()

    jest.spyOn(require('../hooks/usePosts'), 'default').mockReturnValue({
      initPosts: initPostsMock,
    })

    const initialState: RootState = {
      posts: [
        {
          id: 1,
          userId: 1,
          title: 'Mock Post 1',
          body: 'This is a mock post 1.',
        },
        {
          id: 2,
          userId: 2,
          title: 'Mock Post 2',
          body: 'This is a mock post 2.',
        },
      ],
    }

    renderComponent(initialState)

    expect(initPostsMock).not.toHaveBeenCalled()
  })
})
