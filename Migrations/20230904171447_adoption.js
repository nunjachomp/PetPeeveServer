exports.up = function(knex) {
    return knex.schema.createTable("adoption", (table) => {
    table.increments('id').primary();
    table.integer('userId').unsigned();
    table.integer('petId').unsigned();
    table.foreign('userId').references('users.id');
    table.foreign('petId').references('pets.id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("adoption");
};
