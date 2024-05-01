describe("Tests moving from account to transfer page", () => {
  it("Looks for an account and selects a transaction to see", () => {
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
    // Sets a transaction to see
    cy.get(
      ".\\[\\&_tr\\:last-child\\]\\:border-0 > :nth-child(1) > :nth-child(1) > .peer"
    ).click();
    // Clicks on See transaction
    cy.get(".ml-2 > div > .inline-flex").dblclick();
    // Waits
    cy.wait(1000);
    // Looks that we are on the actual transaction page render
    cy.get(".p-8").contains("Transactions on Account ID:");
    // Check the account id shows up correctly
    cy.get(".justify-center").contains("0.0.1005");
    // Check that mainnet is selected
    cy.get(".inline-flex").contains("MainNet");
  });
});
