export const ROUTES = {
  APP: {
    DECKS: {
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
