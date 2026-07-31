import { expect, test } from "@playwright/test"

test.describe("public site", () => {
  test("home page renders the hero and primary navigation", async ({ page }) => {
    await page.goto("/")
    await expect(
      page.getByRole("heading", { level: 1, name: /rigorous, useful work/i }),
    ).toBeVisible()
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible()
  })

  test("a visitor can reach a programme page from the academics index", async ({
    page,
  }) => {
    await page.goto("/academics")
    await page.getByRole("link", { name: "BSc Computer Science" }).first().click()
    await expect(page).toHaveURL(/\/academics\/bsc-computer-science$/)
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "BSc Computer Science",
    )
  })

  test("the enquiry form reports validation errors before submitting", async ({
    page,
  }) => {
    await page.goto("/admissions/enquiry")
    await page.getByRole("button", { name: "Send enquiry" }).click()
    await expect(page.getByText("Please enter your full name.")).toBeVisible()
  })

  test("a complete enquiry is accepted and returns a reference", async ({ page }) => {
    await page.goto("/admissions/enquiry")
    await page.getByLabel("Full name").fill("Playwright Applicant")
    await page.getByLabel("Phone").fill("9876543210")
    await page.getByLabel("Email").fill("playwright@example.com")
    await page.getByLabel("Programme").selectOption("BSc Computer Science")
    await page.getByLabel("Intake").selectOption("Autumn 2026")
    await page
      .getByLabel("Message")
      .fill("Please send the application deadline and the fee structure.")
    await page.getByLabel(/privacy notice/i).check()
    await page.getByRole("button", { name: "Send enquiry" }).click()

    await expect(page.getByRole("heading", { name: "Enquiry received" })).toBeVisible()
    await expect(page.getByText(/DDE-\d{4}-/)).toBeVisible()
  })
})

test.describe("admissions console", () => {
  test("the console redirects anonymous visitors to sign in", async ({ page }) => {
    await page.goto("/admin")
    await expect(page).toHaveURL(/\/admin\/login/)
    await expect(page.getByRole("heading", { name: "Admissions console" })).toBeVisible()
  })
})

test("the health endpoint reports the database as reachable", async ({ request }) => {
  const response = await request.get("/api/health")
  expect(response.status()).toBe(200)
  expect(await response.json()).toMatchObject({ status: "ok" })
})
