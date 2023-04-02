export const ROUTES = {
  APP: {
    DECKS: {
      CARDS: (slug: string) => `/app/decks/${slug}/cards`,
      DETAIL: (slug: string) => `/app/decks/${slug}`,
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
