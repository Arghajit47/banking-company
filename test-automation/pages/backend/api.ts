import { BaseAPI, type Response } from "@base/api-base";
import { API_PATHS, authStatusSchema } from "@constants/index";

export class BackendApi extends BaseAPI {
  async getAuthStatus(): Promise<Response> {
    return await this.get(API_PATHS.AUTH_STATUS);
  }

  validateAuthStatusSchema(body: unknown): void {
    BaseAPI.assertSchemaObject(body, authStatusSchema);
  }
}
