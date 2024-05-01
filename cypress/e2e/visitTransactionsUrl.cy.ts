describe("Go to Transaction URLs", () => {
  // Mainnet URL
  it("Visits Transaction Mainnet URL and checks display", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to main net
    cy.intercept(
      "GET",
      "https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/*"
    ).as("transactionRequest");

    // Visits Mainnet transaction URL
    cy.visit(
      "http://localhost:3000/transactions?selectedNetwork=mainnet&accountId=0.0.1004&id=0.0.1004-1605303503-644881963"
    );
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual transaction page render
    cy.get(".p-8").contains("Transactions on Account ID:");
    // Check the account id shows up correctly
    cy.get(".justify-center").contains("0.0.1004");
    // Check if transaction ID is correct
    cy.get(".p-8").contains("0.0.1004-1605303503-644881963");
    // Check that mainnet is selected
    cy.get('.inline-flex').contains("MainNet")
  });
  // Testnet URL
  it("Visits Transaction Testnet URL and checks display", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to test net
    cy.intercept(
      "GET",
      "https://testnet.mirrornode.hedera.com/api/v1/transactions/*"
    ).as("transactionRequest");

    // Visits Testnet transaction URL
    cy.visit(
      "http://localhost:3000/transactions?selectedNetwork=testnet&accountId=0.0.5000&id=0.0.3727703-1710767515-342084100"
    );
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual transaction page render
    cy.get(".p-8").contains("Transactions on Account ID:");
    // Check the account id shows up correctly
    cy.get(".justify-center").contains("0.0.5000");
    // Check if transaction ID is correct
    cy.get(".p-8").contains("0.0.3727703-1710767515-342084100");
    // Check that Testnet is selected
    cy.get('.inline-flex').contains("TestNet")
  });
  // Previewnet URL
  it("Visits Transaction Previewnet URL and checks display", () => {
    cy.viewport(1980, 1080);
    // Intercepts all requests to preview net
    cy.intercept(
      "GET",
      "https://previewnet.mirrornode.hedera.com/api/v1/transactions/*"
    ).as("transactionRequest");

    // Visits Previewnet transaction URL
    cy.visit(
      "http://localhost:3000/transactions?selectedNetwork=previewnet&accountId=0.0.17135&id=0.0.17118-1714557728-098000000"
    );
    // Wait for page to load
    cy.wait(2000);
    // Looks that we are on the actual transaction page render
    cy.get(".p-8").contains("Transactions on Account ID:");
    // Check the account id shows up correctly
    cy.get(".justify-center").contains("0.0.17135");
    // Check if transaction ID is correct
    cy.get(".p-8").contains("0.0.17118-1714557728-098000000");
    // Check that Previewnet is selected
    cy.get('.inline-flex').contains("PreviewNet")
  });
});
