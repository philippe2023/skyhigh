import { db } from "./database";

export default function SqliteDBAdapter() {
    return {
        async createUser(user) {
            const stmt = db.prepare('INSERT INTO user (name, email, image, emailVerified) VALUES (@name, @email, @image, @emailVerified) RETURNING id');
            const id = stmt.run(user);
            return {...user, id: id.lastInsertRowid};
        },
        async getUser(id) {
            const stmt = db.prepare('SELECT * FROM user WHERE id = ?');
            return stmt.get(id);
        },
        async getUserByEmail(email) {
            const stmt = db.prepare('SELECT * FROM user WHERE email = ?');
            return stmt.get(email);
        },
        async getUserByAccount({ providerAccountId, provider }) {
            const stmt = db.prepare('SELECT * FROM account WHERE provider = ? AND providerAccountId = ?');
            const account =  stmt.get(provider, providerAccountId);
            if (!account) return;
            const user = db.prepare('SELECT * FROM user WHERE id = ?').get(account.userId);
            if (!user) return;
            return user;
        },
        async updateUser(userUpdate) {
            const existingUser = db.prepare('SELECT * FROM user WHERE id = ?').get(userUpdate.id);
            const user = {...existingUser, ...userUpdate};
            const stmt = db.prepare('UPDATE user SET name = ?, email = ?, image = ?, emailVerified = ? WHERE id = ?');
            stmt.run(user);
            return user;
        },
        async deleteUser(userId) {
            const stmt = db.prepare('DELETE FROM user WHERE id = ?');
            stmt.run(userId);
        },
        async linkAccount(account) {
            if (!account.refresh_token) {
                account.refresh_token = null;
            }
            if (!account.session_state) {
                account.session_state = null;
            }
            const stmt = db.prepare('INSERT INTO account (userId, type, provider, providerAccountId, refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) VALUES (@userId, @type, @provider, @providerAccountId, @refresh_token, @access_token, @expires_at, @token_type, @scope, @id_token, @session_state)');
            stmt.run(account);
        },
        async unlinkAccount({ providerAccountId, provider }) {
            const stmt = db.prepare('DELETE FROM account WHERE provider = ? AND providerAccountId = ?');
            stmt.run(provider, providerAccountId);
        },
        async createSession(session) {
            // Convert expires Date object to a timestamp
            const expiresForDB = Math.floor(session.expires.getTime() / 1000);
            const stmt = db.prepare('INSERT INTO session (sessionToken, userId, expires) VALUES (@sessionToken, @userId, ?) RETURNING id');
            const id = stmt.run(session, expiresForDB);
            return {...session, id: id.lastInsertRowid};
        },
        async getSessionAndUser(sessionToken) {
            const stmt = db.prepare('SELECT * FROM session WHERE sessionToken = ?');
            const session = stmt.get(sessionToken);
            if (!session) return;
            // convert expires timestamp from DB to Date object
            session.expires = new Date(session.expires * 1000);
            const user = db.prepare('SELECT * FROM user WHERE id = ?').get(session.userId);
            if (!user) return;
            return {
                session,
                user,
            };
        },
        async updateSession(session) {
            const existing = db.prepare('SELECT * FROM session WHERE sessionToken = ?').get(session.sessionToken);
            if (!existing) {
              throw new Error(`Can not update session ${session.sessionToken}; Unable to find session.`);
            }
            // Convert expires Date object to a timestamp
            const expiresForDB = Math.floor(session.expires.getTime() / 1000);
            const stmt = db.prepare('UPDATE session SET expires = ? WHERE sessionToken = ?');
            stmt.run(expiresForDB, session.sessionToken);
        },
        async deleteSession(sessionToken) {
            const stmt = db.prepare('DELETE FROM session WHERE sessionToken = ?');
            stmt.run(sessionToken);
        },
        async createVerificationToken({ identifier, token, expires }) {
            const stmt = db.prepare('INSERT INTO verification_token (identifier, token, expires) VALUES (@identifier, @token, @expires)');
            stmt.run(identifier, token, expires);
        },
        async getVerificationToken(identifier, token) {
            const stmt = db.prepare('SELECT * FROM verification_token WHERE identifier = ? AND token = ?');
            return stmt.get(identifier, token);
        },
    }
  }
  // https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-prisma/src/index.ts
  /*
    
    getUser: (id) => p.user.findUnique({ where: { id } }),
    getUserByEmail: (email) => p.user.findUnique({ where: { email } }),
    async getUserByAccount(provider_providerAccountId) {
      const account = await p.account.findUnique({
        where: { provider_providerAccountId },
        select: { user: true },
      })
      return account?.user ?? null
    },
    updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
    deleteUser: (id) => p.user.delete({ where: { id } }),
    linkAccount: (data) =>
      p.account.create({ data }) as unknown as AdapterAccount,
    unlinkAccount: (provider_providerAccountId) =>
      p.account.delete({
        where: { provider_providerAccountId },
      }) as unknown as AdapterAccount,
    async getSessionAndUser(sessionToken) {
      const userAndSession = await p.session.findUnique({
        where: { sessionToken },
        include: { user: true },
      })
      if (!userAndSession) return null
      const { user, ...session } = userAndSession
      return { user, session }
    },
    createSession: (data) => p.session.create({ data }),
    updateSession: (data) =>
      p.session.update({ where: { sessionToken: data.sessionToken }, data }),
    deleteSession: (sessionToken) =>
      p.session.delete({ where: { sessionToken } }),
    async createVerificationToken(data) {
      const verificationToken = await p.verificationToken.create({ data })
      // @ts-expect-errors // MongoDB needs an ID, but we don't
      if (verificationToken.id) delete verificationToken.id
      return verificationToken
    },
    async useVerificationToken(identifier_token) {
      try {
        const verificationToken = await p.verificationToken.delete({
          where: { identifier_token },
        })
        // @ts-expect-errors // MongoDB needs an ID, but we don't
        if (verificationToken.id) delete verificationToken.id
        return verificationToken
      } catch (error) {
        // If token already used/deleted, just return null
        // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
        if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
          return null
        throw error
      }
    },
  */