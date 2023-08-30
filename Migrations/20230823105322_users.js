exports.up = function(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string('name').notNull()
    table.string('email').notNull()
    table.string('hashpassword').notNull()
    table.boolean("isAdmin").defaultTo(false)
    table.timestamp("createdDate").defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};


