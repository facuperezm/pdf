import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const media = sqliteTable("media", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  timestamp: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});
