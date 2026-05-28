const usersEnv = (process.env.TEST_USERS || '').split(',');

const users = usersEnv.reduce((acc, pair) => {
  const [user, pass] = pair.split(':');
  if (user && pass) acc[user] = pass;
  return acc;
}, {});

function basicAuth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Centro de Estudiantes API"');
    return res.status(401).json({ error: 'Credenciales requeridas' });
  }

  const credentials = Buffer.from(header.slice(6), 'base64').toString();
  const [username, password] = credentials.split(':');

  if (!users[username] || users[username] !== password) {
    res.set('WWW-Authenticate', 'Basic realm="Centro de Estudiantes API"');
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  req.user = username;
  next();
}

module.exports = basicAuth;
