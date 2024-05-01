describe("Test filters in graph", () => {
  // Type
  it("Filters by type", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to main net
    cy.intercept(
      "GET",
      "https://mainnet-public.mirrornode.hedera.com/api/v1/*"
    ).as("transactionRequest");

    // Visits Mainnet transaction URL
    cy.visit("http://localhost:3000/");
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual main page render
    cy.get(".p-8").contains("Hedera Transaction Explorer");
    // Check that mainnet is selected
    cy.get(".inline-flex").contains("MainNet");
    // Clicks on input field and enters account id
    cy.get("#accountId").click().type("0.0.1005");
    // Clicks on submit button
    cy.get(":nth-child(2) > .inline-flex").click();
    // Wait for data to arrive
    cy.wait(2000);
    // Clicks on the graph
    cy.get("#radix-\\:rb\\:").click();
    // Click on the dropdown
    cy.get("#radix-\\:rc\\:").click();
    // Wait for an error
    cy.wait(500);
  });
  // Date
  it("Filters by date", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to main net
    cy.intercept(
      "GET",
      "https://mainnet-public.mirrornode.hedera.com/api/v1/*"
    ).as("transactionRequest");

    // Visits Mainnet transaction URL
    cy.visit("http://localhost:3000/");
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual main page render
    cy.get(".p-8").contains("Hedera Transaction Explorer");
    // Check that mainnet is selected
    cy.get(".inline-flex").contains("MainNet");
    // Clicks on input field and enters account id
    cy.get("#accountId").click().type("0.0.1005");
    // Clicks on submit button
    cy.get(":nth-child(2) > .inline-flex").click();
    // Wait for data to arrive
    cy.wait(2000);
    // Gets the date picker
    cy.get('.items-start > .grid > #date').click();
    // Pick a random end date
    cy.get('.rdp-caption_end').click();
    // Wait for an error
    cy.wait(500);
  });
});
