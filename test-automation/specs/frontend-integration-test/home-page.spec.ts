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

  test("footer renders with API-driven contact details", async ({ footerPage }) => {
    await footerPage.assertFooterRendersFromApi();
  });
});

test.describe("Home Page CTA Section", () => {
  test("CTA section renders with heading, body, and Open Account button", async ({ homepage }) => {
    await homepage.assertCtaSection();
  });

  test("CTA button is visible and clickable", async ({ homepage }) => {
    await homepage.assertCtaButtonClickable();
  });

  test("CTA section renders API-driven content", async ({ homepage }) => {
    await homepage.assertCtaApiContent();
  });
});

test.describe("Home Page Testimonials Section", () => {
  test("testimonials section renders with heading, tabs, and cards", async ({ homepage }) => {
    await homepage.assertTestimonialsSection();
  });
});
