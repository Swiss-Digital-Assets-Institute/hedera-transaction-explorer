describe("Looks up account IDs on the 3 nodes", () => {
  // Mainnet
  it("Visits main page and checks for mainnet account id", () => {
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
    cy.get('#accountId').click().type("0.0.1005")
    // Clicks on submit button
    cy.get(':nth-child(2) > .inline-flex').click()
    // Wait for data to arrive
    cy.wait(2000)
    // Checks the table exists by checking the transaction ID filter
    cy.get('.p-8').contains("Transaction ID")
    // Check the graphs exist by checking card title
    cy.get('.p-8').contains("Transfers graphs")
    // Check filters exist in graph by checking Filters
    cy.get('.p-8').contains("Filters")
  });

  // Testnet
  it("Visits main page and checks for testnet account id", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to test net
    cy.intercept(
      "GET",
      "https://testnet.mirrornode.hedera.com/api/v1/transactions/*"
    ).as("transactionRequest");

    // Visits home page
    cy.visit("http://localhost:3000/");
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual main page render
    cy.get(".p-8").contains("Hedera Transaction Explorer");
    // Check that mainnet is selected
    cy.get(".inline-flex").contains("MainNet").click();
    // Gets the testnet value
    cy.get('.h-full > .overflow-hidden').contains("TestNet").click()
    // Refresh page to make sure the input is correct
    cy.visit("http://localhost:3000/");
    // Wait for page to load
    cy.wait(2000);
    // Clicks on input field and enters account id
    cy.get('#accountId').click().type("0.0.1005")
    // Clicks on submit button
    cy.get(':nth-child(2) > .inline-flex').click()
    // Wait for data to arrive
    cy.wait(2000)
    // Checks the table exists by checking the transaction ID filter
    cy.get('.p-8').contains("Transaction ID")
    // Check the graphs exist by checking card title
    cy.get('.p-8').contains("Transfers graphs")
    // Check filters exist in graph by checking Filters
    cy.get('.p-8').contains("Filters")
  });

  // Previewnet
  it("Visits main page and checks for previewnet account id", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to preview net
    cy.intercept(
      "GET",
      "https://previewnet.mirrornode.hedera.com/api/v1/transactions/*"
    ).as("transactionRequest");

    // Visits home page
    cy.visit("http://localhost:3000/");
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual main page render
    cy.get(".p-8").contains("Hedera Transaction Explorer");
    // Check that mainnet is selected
    cy.get(".inline-flex").contains("MainNet").click();
    // Gets the testnet value
    cy.get('.h-full > .overflow-hidden').contains("PreviewNet").click()
    // Refresh page to make sure the input is correct
    cy.visit("http://localhost:3000/");
    // Wait for page to load
    cy.wait(2000);
    // Clicks on input field and enters account id
    cy.get('#accountId').click().type("0.0.17135")
    // Clicks on submit button
    cy.get(':nth-child(2) > .inline-flex').click()
    // Wait for data to arrive
    cy.wait(2000)
    // Checks the table exists by checking the transaction ID filter
    cy.get('.p-8').contains("Transaction ID")
    // Check the graphs exist by checking card title
    cy.get('.p-8').contains("Transfers graphs")
    // Check filters exist in graph by checking Filters
    cy.get('.p-8').contains("Filters")
  });
});
