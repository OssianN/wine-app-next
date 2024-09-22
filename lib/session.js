import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';

export const sessionOptions = {
  cookieName: 'userSession',
  password: process.env.SECRET_COOKIE_PASSWORD,
  ttl: 0,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionSSR(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

export function withSessionAPI(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}
