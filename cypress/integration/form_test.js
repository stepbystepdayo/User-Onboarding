describe("My First Task ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  //   it("Visits  ", () => {
  //     cy.visit("http://localhost:3000/");
  //   });

  //   it("sainty checks", () => {
  //     expect(5).to.equal(5);
  //     expect(5 * 5).to.equal(25);
  //     expect({}).to.eql({});
  //     expect({}).to.not.equal({});
  //   });

  const nameInput = () => cy.get("input[name=name]");
  const mailInput = () => cy.get("input[name=email]");
  const passwordInput = () => cy.get("input[name=password]");
  const agreeInput = () => cy.get("input[name=agree]");
  const button = () => cy.get("button");

  it("the proper elements exist", () => {
    nameInput().should("exist");
    mailInput().should("exist");
    passwordInput().should("exist");
    agreeInput().should("exist");
    button().should("exist");
  });

  describe("Filling out input and cancelling", () => {
    it("submit button is disabled", () => {
      button().should("be.disabled");
    });
    it("can type inside the name", () => {
      nameInput()
        .should("have.value", "")
        .type("Sayo")
        .should("have.value", "Sayo");
    });
    it("can type inside the email", () => {
      mailInput()
        .should("have.value", "")
        .type("sl.deve080412@gmail.com")
        .should("have.value", "sl.deve080412@gmail.com");
    });
    it("can type inside the password", () => {
      passwordInput()
        .should("have.value", "")
        .type("doglover")
        .should("have.value", "doglover");
    });
    it("can press the agreebox", () => {
      agreeInput().should("not.be.checked").check().should("be.checked");
    });
    it("the submit button", () => {
      nameInput().type("Sayo");
      mailInput().type("sl.deve080412@gmail.com");
      passwordInput().type("doglover");
      agreeInput().check();

      button().should("not.be.disabled");
    });
  });

  describe("Adding a user", () => {
    it("can submit", () => {
      cy.contains(/Sayo/i).should("not.exist");
      nameInput().type("Sayo");
      mailInput().type("sl.deve080412@gmail.com");
      passwordInput().type("doglover");
      agreeInput().check();
      button().click();
      cy.contains(/Sayo/i).should("exist");
      nameInput().should("have.value", "");
      mailInput().should("have.value", "");
      passwordInput().should("have.value", "");
      agreeInput().should("not.be.checked");
    });
  });
  describe("if user name input box is blank,show error", () => {
    it("show red error id username is blank", () => {
      nameInput().should("have.value", "");
      nameInput().type("Sayo");
      nameInput().should("have.value", "Sayo");
      nameInput().clear();
      cy.contains(/Name is required/i);
    });
    it("show red error id email is blank", () => {
      passwordInput().should("have.value", "");
      passwordInput().type("doglover");
      passwordInput().should("have.value", "doglover");
      passwordInput().clear();
      cy.contains(/this is a required field/i);
    });
  });
});
