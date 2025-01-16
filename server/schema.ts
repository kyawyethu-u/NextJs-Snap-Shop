
import {
   
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    boolean,
    pgEnum,
    serial,
    real,
  } from "drizzle-orm/pg-core"

  import type { AdapterAccount } from "next-auth/adapters"

  import {createId} from "@paralleldrive/cuid2"
import { relations } from "drizzle-orm"

  export const RoleEnum = pgEnum("roles",["user","admin"])
  
 //db schemas

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  isTwoFactorEnabled: boolean("isTwoFactorEnabled").default(false),
  role: RoleEnum("roles").default("user")
})

export const twoFactorTokens = pgTable("two_factor_tokens",{
  id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
  email: text("email").notNull(),
  userId: text("userId").references(()=> users.id,{onDelete: "cascade"}),
},(token) => ({
  compoundKey: primaryKey({
    columns: [token.token, token.id],
  }),
})
  
)


export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount>().notNull(),
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

export const emailVerificationToken = pgTable(
  "email_verification_token",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

//reset password
export const resetPasswordToken = pgTable(
  "reset_password_token",
  {
    id: text("id")
      .notNull()
      .$defaultFn(() => createId()),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: text("email").notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.id, vt.token] }),
  })
);

//product 
export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    description: text("description").notNull(),
    title: text("title").notNull(),
    price: real("price").notNull(),
    createdAt: timestamp("createdAt",{mode: "date"}).defaultNow(),
  }
)
//3 table created
export const productVariants = pgTable(
  "productVariants",{
    id: serial("id").primaryKey(),
    color: text("color").notNull(),
    productType: text("productType").notNull(),
    updated: timestamp("updated").defaultNow(),
    productID: serial("productID").notNull().references(()=>products.id,{onDelete: "cascade"}),
  }
)//productType is for filtering

export const variantImages =pgTable("variantImages",{
  id: serial("id").primaryKey(),
  image_url: text("image_url").notNull(),
  name: text("name").notNull(),
  size: text("size").notNull(),
  order: real("order").notNull(),

  variantID: serial("variantID").notNull().references(()=>productVariants.id,{onDelete: "cascade"}) 
})

export const variantTags = pgTable("variantTags",{
  id: serial("id").primaryKey(),
  tag: text("tag").notNull(),
  variantID: serial("variantID").notNull().references(()=>productVariants.id,{onDelete: "cascade"}) 
})

//db relations started here
export const productRelations = relations(products,({many,one})=> ({
  productVariants: many(productVariants,{
    relationName: "productVariants"
  })
})) 

export const productVariantsRelations = relations(productVariants,({many,one})=>({
    product: one(products,{
      fields: [productVariants.productID],
      references: [products.id],
      relationName: "productVariants",
    }),
    variantImages: many(variantImages,{relationName: "variantImages"}),
    variantTags: many(variantTags,{relationName: "variantTags"})
}))

export const variantImagesRelations = relations(variantImages,({many,one})=>({
  productVariants : one(productVariants,{
    fields: [variantImages.variantID],
    references: [productVariants.id],
    relationName: "variantImages"
  })
}))

export const variantTagsRelations = relations(variantTags,({many,one})=>({
  productVariants : one(productVariants,{
    fields: [variantTags.variantID],
    references: [productVariants.id],
    relationName: "variantTags"
  })
}))