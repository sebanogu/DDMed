import { expect, test, type Page } from '@playwright/test';

async function acceptLocalConsent(page: Page) {
  const baseURL = test.info().project.use.baseURL;
  if (!baseURL || typeof baseURL !== 'string') {
    throw new Error('Playwright baseURL is required for the auth e2e suite.');
  }

  await page.context().addCookies([
    {
      name: 'cookiesAccepted',
      value: 'true',
      url: baseURL,
    },
    {
      name: 'snomedLicenseAccepted',
      value: 'true',
      url: baseURL,
    },
  ]);
}

async function gotoApp(page: Page, path: string) {
  await acceptLocalConsent(page);
  await page.goto(path);
}

async function login(page: Page, email: string, password = 'Demo123!') {
  await gotoApp(page, '/#/login');
  await page.getByTestId('auth-login-email-input').fill(email);
  await page.getByTestId('auth-login-password-input').fill(password);
  await page.getByTestId('auth-login-submit').click();
}

test('redirects unauthenticated users to login and returns them to the requested workspace route', async ({ page }) => {
  await gotoApp(page, '/#/workspace/admin');

  await expect(page).toHaveURL(/#\/login\?redirect=%2Fworkspace%2Fadmin/);
  await expect(page.getByTestId('auth-login-page')).toBeVisible();

  await page.getByTestId('auth-login-email-input').fill('alex.owner@ddmed.test');
  await page.getByTestId('auth-login-password-input').fill('Demo123!');
  await page.getByTestId('auth-login-submit').click();

  await expect(page).toHaveURL(/#\/workspace\/admin$/);
  await expect(page.getByTestId('workspace-admin-page')).toBeVisible();
});

test('restores the authenticated session after a page reload', async ({ page }) => {
  await login(page, 'bianca.admin@ddmed.test');

  await expect(page).toHaveURL(/#\/workspace$/);
  await expect(page.getByTestId('workspace-dashboard-page')).toBeVisible();
  await expect(page.getByTestId('workspace-user-name')).toHaveText('Bianca Admin');

  await page.reload();

  await expect(page).toHaveURL(/#\/workspace$/);
  await expect(page.getByTestId('workspace-dashboard-page')).toBeVisible();
  await expect(page.getByTestId('workspace-user-name')).toHaveText('Bianca Admin');
  await expect(page.getByTestId('workspace-active-tenant-name')).toHaveText('East Clinic');
});

test('blocks suspended tenants and lets the user switch back to an active tenant', async ({ page }) => {
  await login(page, 'alex.owner@ddmed.test');

  await expect(page).toHaveURL(/#\/workspace$/);
  await page.getByRole('button', { name: 'North Clinic' }).click();
  await page.getByTestId('app-tenant-switch-tenant-south').click();

  await expect(page).toHaveURL(/#\/tenant-suspended$/);
  await expect(page.getByTestId('auth-tenant-suspended-page')).toBeVisible();
  await expect(page.getByTestId('auth-tenant-suspended-active-tenant-name')).toHaveText('South Clinic');
  await expect(page.getByTestId('auth-tenant-suspended-active-tenant-status')).toHaveText('Status: suspended');

  await page.getByTestId('auth-tenant-switch-tenant-north').click();

  await expect(page).toHaveURL(/#\/workspace$/);
  await expect(page.getByTestId('workspace-dashboard-page')).toBeVisible();
  await expect(page.getByTestId('workspace-active-tenant-name')).toHaveText('North Clinic');
  await expect(page.getByTestId('workspace-role-owner')).toBeVisible();
  await expect(page.getByTestId('workspace-role-clinician')).toBeVisible();
});

test('enforces RBAC for protected routes and workspace navigation', async ({ page }) => {
  await login(page, 'sam.support@ddmed.test');

  await expect(page).toHaveURL(/#\/workspace$/);
  await expect(page.getByTestId('workspace-dashboard-page')).toBeVisible();
  await expect(page.getByTestId('workspace-nav-support')).toBeVisible();
  await expect(page.getByTestId('workspace-nav-admin')).toHaveCount(0);
  await expect(page.getByTestId('workspace-nav-clinical')).toBeVisible();

  await page.goto('/#/workspace/support');
  await expect(page.getByTestId('workspace-support-page')).toBeVisible();
  await expect(page.getByTestId('workspace-support-message')).toHaveText('Support workspace access granted.');

  await page.goto('/#/workspace/admin');
  await expect(page).toHaveURL(/#\/access-denied\?permission=tenant\.manage&redirect=%2Fworkspace%2Fadmin/);
  await expect(page.getByTestId('auth-access-denied-page')).toBeVisible();
  await expect(page.getByTestId('auth-access-denied-permission')).toContainText('tenant.manage');
});
