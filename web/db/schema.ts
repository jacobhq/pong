import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    pgEnum,
    boolean
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
})

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
)

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
})

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
    })
)

export const gameStateEnum = pgEnum('state', ['lobby', 'ongoing', 'archived']);

export const models = pgTable("models", {
    id: text("id").primaryKey(),
    name: text('name').notNull().unique(),
    downloadUrl: text("downloadUrl").notNull(),
    public: boolean("public").default(false).notNull(),
    owner: text("owner")
        .references(() => users.id, { onDelete: "cascade" }),
})

export const players = pgTable("players", {
    id: text("id").primaryKey(),
    displayName: text('displayName')
        .unique()
        .notNull(),
    gameId: text("gameId")
        .notNull()
        .references(() => games.id, { onDelete: "cascade" }),
    userId: text("userId")
        .references(() => users.id),
    playerScore: integer("playerScore")
        .notNull()
        .default(0),
    modelScore: integer("modelScore")
        .notNull()
        .default(0),
    grading: integer("grading")
        .notNull()
        .default(0)
})

export const games = pgTable('games', {
    id: text("id").primaryKey(),
    name: text('name'),
    owner: text("owner")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    state: gameStateEnum("state"),
    model: text("model")
        .notNull()
        .references(() => models.id),
    modelName: text("modelName").notNull()
})
