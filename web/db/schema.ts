import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    pgEnum,
    uniqueIndex,
    uuid,
    varchar,
    boolean,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "next-auth/adapters"
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { InferSelectModel } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

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

export const gameStateEnum = pgEnum('state', ['lobby', 'ongoing', 'disabled']);

export const models = pgTable("models", {
    id: uuid("id").primaryKey(),
    name: text('name'),
    downloadUrl: text("downloadUrl"),
    public: boolean("public").default(false),
    owner: text("owner")
        .references(() => users.id, { onDelete: "cascade" }),
})

export const players = pgTable("players", {
    id: uuid("id").primaryKey(),
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
        .default(0)
})

export const games = pgTable('games', {
    id: uuid("id").primaryKey(),
    name: text('name'),
    owner: text("owner")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    state: gameStateEnum("state"),
    model: text("model")
        .notNull()
        .references(() => models.id),
})

export type Model = InferSelectModel<typeof models>
export type Player = InferSelectModel<typeof players>
export type Game = InferSelectModel<typeof games>
