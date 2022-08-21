exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("comments", {
    id: {
      type: "varchar(50)",
      primaryKey: true,
    },
    content: {
      type: "text",
      notNull: true,
    },
    owner: {
      type: "varchar(50)",
      notNull: true,
    },
    thread_id: {
      type: "varchar(50)",
      notNull: true,
    },
    date: {
      type: "varchar(50)",
      notNull: true,
    },
    is_delete: {
      type: "integer",
      default: 0,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("comments");
};
