const { test, expect } = require('@playwright/test');

test('Create user API', async ({ request }) => {

  const response = await request.post(
    'posts',
    {
      data: {
        "userId": 482,
        "id": 385,
        "title": "Pranaya - Test User",
        "body": "This is a test user created using Playwright API testing."
      }
    }
  );
  const body = await response.json();
  console.log(body);
  expect(response.status()).toBe(201);
  expect(body.title).toBe("Pranaya - Test User");
});

test('Get user by id', async ({ request }) => {

  const response = await request.get(
    'posts/1'
  );
  console.log(await response.json());
  expect(response.status()).toBe(200);
});

test('Get all users', async ({ request }) => {

  const response = await request.get(
    'posts'
  );
  console.log(await response.json());
  expect(response.status()).toBe(200);
});

test('Update User', async ({ request }) => {
  const response = await request.put(
    'posts/1',
    {
      data: {
        title: "Updated Title"
      }
    }
  );
  expect(response.status()).toBe(200);
});

test('Delete User', async ({ request }) => {
  const response = await request.delete(
    'posts/1'
  );
  expect(response.status()).toBe(200);
});