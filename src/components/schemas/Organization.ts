export const OrganizationSchema = {
    type: "object",
    properties: {
      id: {
        type: "integer",
        example: 1
      },
      organizationName: {
        type: "string",
        example: "Tech Corp"
      },
      organizationFounder: {
        type: "string",
        example: "Jane Doe"
      },
      creatorEmail: {
        type: "string",
        example: "jane.doe@example.com"
      }
    },
    required: ["organizationName", "organizationFounder", "creatorEmail"]
  };
  