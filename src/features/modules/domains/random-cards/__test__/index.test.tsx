import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { SWRConfig } from 'swr'
import { setupServer } from 'msw/node'

import { nextRouterMock, NextRouterProvider } from 'src/mocks'
import { useUser } from 'src/shared/user/useUser'
import { ThemeProvider } from 'src/app/providers/ThemeProvider'

import {
  emptyResponseFetchAnimes,
  successResponseFetchAnimes,
} from '../mocks/msw'
import { RandomCards } from '..'

jest.mock('src/shared/user/useUser')
const mockedUseUser = jest.mocked(useUser)

describe('RandomCards', () => {
  const defaultRouterMocked = nextRouterMock()

  const RandomCardsMockWithProviders = () => (
    <ThemeProvider>
      <NextRouterProvider value={defaultRouterMocked}>
        <RandomCards />
      </NextRouterProvider>
    </ThemeProvider>
  )

  const server = setupServer(successResponseFetchAnimes)

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  beforeEach(() => {
    jest.resetModules()
    jest.dontMock('src/shared/user/useUser.tsx')
  })

  it('should back to sign up screen when user name is empty', () => {
    mockedUseUser.mockReturnValue({ user: { name: '' } })
    render(<RandomCardsMockWithProviders />)

    expect(defaultRouterMocked.replace).toBeCalledWith('/')
  })

  it('should show user name as "Testing user" when came to RandomCards page', () => {
    mockedUseUser.mockReturnValue({ user: { name: 'Testing user' } })
    render(<RandomCardsMockWithProviders />)

    const useNameElement = screen.getByTestId('user-name-test-id')

    expect(useNameElement).toHaveTextContent('Testing user')
  })

  it('should show a spinner when cards is still loading', () => {
    server.use(emptyResponseFetchAnimes)
    render(
      <SWRConfig value={{ provider: () => new Map() }}>
        <RandomCardsMockWithProviders />
      </SWRConfig>,
    )

    const loadingIndicators = screen.getAllByTestId('loading-activity-test-id')

    expect(loadingIndicators).toHaveLength(1)
  })

  it('should show 5 when cards is still loaded with success', async () => {
    render(<RandomCardsMockWithProviders />)

    const cards = await screen.findAllByTestId('card-test-id')

    expect(cards).toHaveLength(5)
  })

  it("should add a new card in the end from the 5 cards when user click in 'Puxar uma nova carta aleatoriamente' button", async () => {
    render(<RandomCardsMockWithProviders />)
    const getMoreCardButton = screen.getByDisplayValue(
      'Puxar uma nova carta aleatoriamente',
    )

    fireEvent.click(getMoreCardButton)

    const cards = await screen.findAllByTestId('card-test-id')
    expect(cards).toHaveLength(6)
  })

  it("should the 'Puxar uma nova carta aleatoriamente' button be disabled when user already clicked three times in it", () => {
    render(<RandomCardsMockWithProviders />)
    const getMoreCardButton = screen.getByDisplayValue(
      'Puxar uma nova carta aleatoriamente',
    )

    fireEvent.click(getMoreCardButton)
    fireEvent.click(getMoreCardButton)
    fireEvent.click(getMoreCardButton)

    expect(getMoreCardButton).toBeDisabled()
  })

  it("should the 'Puxar uma nova carta aleatoriamente' button display value be 'Limite atingido (3x)' when user already clicked three times in it", () => {
    render(<RandomCardsMockWithProviders />)
    const getMoreCardButton = screen.getByDisplayValue(
      'Puxar uma nova carta aleatoriamente',
    )

    fireEvent.click(getMoreCardButton)
    fireEvent.click(getMoreCardButton)
    fireEvent.click(getMoreCardButton)

    expect(getMoreCardButton).toHaveDisplayValue('Limite atingido (3x)')
  })

  it("should cards order be swapped when user click in 'Embaralhar cartas' button", async () => {
    render(<RandomCardsMockWithProviders />)
    const cardsBeforeShuffle = await screen.findAllByTestId('card-test-id')
    const shuffleCardsButton = screen.getByDisplayValue('Embaralhar cartas')

    fireEvent.click(shuffleCardsButton)
    const cardsAfterShuffle = await screen.findAllByTestId('card-test-id')

    cardsBeforeShuffle.forEach((cards, index) => {
      expect(cards.textContent).not.toBe(cardsAfterShuffle[index])
    })
  })
})
