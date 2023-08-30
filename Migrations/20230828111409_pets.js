exports.up = function(knex) {
    return knex.schema.createTable("pets", (table) => {
        table.increments("id").primary();
        table.string('name').notNull();
        table.string("species").notNull();
        // table.string("simple_classification").notNull();
        // table.string('adoption_status').notNull();
        // table.string('photo_url').notNull();
        // table.float('height').notNull();
        // table.float('weight').notNull();
        // table.string('primary_color').notNull();
        // table.string('bio').notNull();
        // table.boolean('hypoallergenic').notNull();
        // table.string('dietary_restrictions').notNull();
        table.timestamp("createdDate").defaultTo(knex.fn.now());
        table.string("userId").notNull(); //why do I need this?
        table.string("petImage");
      })
    };


exports.down = function(knex) {
    return knex.schema.dropTable("pets");
};
