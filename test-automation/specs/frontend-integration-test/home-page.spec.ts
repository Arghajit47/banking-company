import { test } from "@fixtures/ui-fixtures";

test.describe("Home Page Navbar Auth Integration", () => {
  test("loads home page and navbar", async ({ homepage }) => {
    await homepage.assertPageComponents();
  });

  test("shows Login and Sign Up when logged out", async ({ homepage }) => {
    await homepage.assertLoggedOutNavbar();
  });

  test("shows user info and Logout when mocked logged in", async ({ homepage }) => {
    await homepage.assertLoggedInNavbar();
  });

  test("mobile menu shows auth CTAs", async ({ homepage }) => {
    await homepage.assertMobileAuthToggle();
  });
});
