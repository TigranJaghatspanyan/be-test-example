export const UserSchema = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      example: 1,
    },
    name: {
      type: "string",
      example: "John Doe",
    },
    email: {
      type: "string",
      example: "john.doe@example.com",
    },
    password: {
      type: "string",
      example: "hashed_password",
    },
  },
  required: ["name", "email", "password"],
};
