interface Env {
  BASIC_AUTH_IS_ENABLED: string;
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  if (context.env.BASIC_AUTH_IS_ENABLED !== "1") {
    return context.next();
  }

  const authorizationHeader =
    context.request.headers.get("Authorization");

  if (authorizationHeader?.startsWith("Basic ")) {
    try {
      const authValue = authorizationHeader.slice(6);
      const decoded = atob(authValue);
      const [user, password] = decoded.split(":");

      if (
        user === context.env.BASIC_AUTH_USERNAME &&
        password === context.env.BASIC_AUTH_PASSWORD
      ) {
        return context.next();
      }
    } catch {
      // 認証情報が不正な場合は401
    }
  }

  return new Response("Auth Required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
};