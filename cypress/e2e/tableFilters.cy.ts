describe("Tests filters in the table", () => {
  it("Filters by Transaction ID", () => {
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
    // Searches the transaction ID that starts by 0.0.2
    cy.get('[placeholder="Filter transactions by ID..."]')
      .click()
      .type("0.0.2{enter}");
    // Waits for the search
    cy.wait(500);
    // Checks there is a transaction ID that shows
    cy.get(":nth-child(3) > .p-6").contains("0.0.22");
  });

  // Transaction type
  it("Filters by Transaction Type", () => {
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
    // Sets the Crypto Transfer Filter
    cy.get("#radix-\\:r0\\:").click();
    cy.get("#radix-\\:r1\\:").contains("Crypto Transfer").click();
    // Checks that the filter is applied by checking the first result
    cy.get(
      ".\\[\\&_tr\\:last-child\\]\\:border-0 > :nth-child(1) > :nth-child(3)"
    ).contains("CRYPTOTRANSFER");
  });

  // Transaction result
  it("Filters by Transaction Result", () => {
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
    // Sets the filter to Success
    cy.get("#radix-\\:r2\\:").click();
    cy.get("#radix-\\:r3\\: > .relative").contains("SUCCESS").click();
    // Checks that the filter is applied by checking the first result
    cy.get('.\\[\\&_tr\\:last-child\\]\\:border-0 > :nth-child(1) > :nth-child(7)').contains("SUCCESS");
  });

  // Transaction dates
  it('Filters by Dates', () => {
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
    // Select our date picker
    cy.get('.py-4 > .grid > #date').click();
    // Pick a random end date
    cy.get('.rdp-caption_end').click();
    // Wait to see if an error happened
    cy.wait(500);
  })
});
