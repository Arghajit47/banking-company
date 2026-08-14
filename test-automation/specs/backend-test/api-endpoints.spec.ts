import { test } from "@fixtures/api-fixtures";

test.describe("Backend API Endpoints", () => {
  test("GET /api/auth/status returns 200 with valid schema", async ({ backendApi }) => {
    const res = await backendApi.getAuthStatus();
    await backendApi.validateAuthStatusSchema(res.body);
  });

  test("GET /api/use-cases returns 200 with valid schema", async ({ backendApi }) => {
    const res = await backendApi.getUseCases();
    await backendApi.validateUseCasesSchema(res.body);
  });
});
