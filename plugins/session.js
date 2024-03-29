import session from "cookie-session";

export default ({ req, res }, inject) => {
  const handler = session({
    name: "session",
    keys: ["your-secret-key"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  });

  handler(req, res, () => {});

  inject("session", {
    set: (name, value) => {
      req.session[name] = value;
    },
    get: (name) => {
      return req.session[name];
    },
    remove: (name) => {
      delete req.session[name];
    },
    removeAll: () => {
      req.session = null;
    },
  });
};
