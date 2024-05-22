import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

const media = sqliteTable("media", {
  id: integer("id").primaryKey(),
  url: text("url").notNull(),
  name: text("name").notNull(),
  fileKey: text("file_key").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  created: text("timestamp").default(sql`(CURRENT_TIMESTAMP)`),
});

export default media;
