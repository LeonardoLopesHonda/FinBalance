test("GET in /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status")
    const responseBody = response.json();

    expect(response.status).toBe(200);
    expect(responseBody.updatedAt).toBeDefined();
    expect(responseBody.dependencies.database.version).toBeDefined();
    expect(responseBody.dependencies.database.max_connections).toBeDefined();
    expect(responseBody.dependencies.database.opened_connections).toBeDefined();
});