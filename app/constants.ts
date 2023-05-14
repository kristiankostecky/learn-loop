export const ROUTES = {
  APP: {
    DECKS: {
      CARD: (deck: string, card: string) => `/app/decks/${deck}/cards/${card}`,
      CARDS: (deck: string) => `/app/decks/${deck}/cards`,
      DECK: (deck: string) => `/app/decks/${deck}`,
      EDIT_CARD: (deck: string, card: string) =>
        `/app/decks/${deck}/cards/${card}/edit`,
      NEW_CARD: (deck: string) => `/app/decks/${deck}/cards/new`,
      ROOT: '/app/decks',
    },
    ROOT: '/app',
  },
  LOGIN: '/login',
  LOGOUT: '/logout',
  REGISTER: '/register',
  ROOT: '/',
  SIGNUP: '/signup',
}
