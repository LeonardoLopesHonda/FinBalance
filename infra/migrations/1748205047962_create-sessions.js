exports.up = (pgm) => {
  pgm.createTable("sessions", {
    session_token: {
      type: "text",
      primaryKey: true,
    },
    user_id: {
      type: "uuid",
      references: "users",
      notNull: true,
    },
    // Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
    expires_at: {
      type: "timestamptz",
      notNull: true,
    },
  });
};

exports.down = false;
