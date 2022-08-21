exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("threads", {
    id: {
      type: "varchar(50)",
      primaryKey: true,
    },
    title: {
      type: "text",
      notNull: true,
    },
    body: {
      type: "text",
      notNull: true,
    },
    owner: {
      type: "varchar(50)",
      notNull: true,
    },
    date: {
      type: "varchar(50)",
      notNull: true
    },
    is_delete: {
      type: "integer",
      default: 0,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("threads");
};
