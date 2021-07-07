describe("Add, edit, display and delete new item test", () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/sight/form');
  });

  it('should test name input', () => {
    cy.get('#form-name').focus();
    cy.get('body').click();
    cy.get("span").contains("This field is required!");
  })

  it('should test longitude input', () => {
    cy.get('#form-longitude').focus();
    cy.get('body').click();
    cy.get("span").contains("This field is required!");
    cy.get('#form-longitude').type('444');
    cy.get("span").contains("You must follow");
  })

  it('should test latitude input', () => {
    cy.get('#form-latitude').focus();
    cy.get('body').click();
    cy.get("span").contains("This field is required!");
    cy.get('#form-latitude').type('444');
    cy.get("span").contains("You must follow");
  })

  it('should test description input', () => {
    cy.get('#form-description').focus();
    cy.get('body').click();
    cy.get("span").contains("This field is required!");
    cy.get('#form-description').type('s'.repeat(256));
    cy.get("span").contains("Max length is 255!");
  })

  it('should test color input', () => {
    cy.get('#form-color').focus();
    cy.get('body').click();
    cy.get("span").contains("This field is required!");
    cy.get('#form-color').type('0');
    cy.get("span").contains("Minimal value is 1!");
    cy.get('#form-color').type('4');
    cy.get("span").contains("Maximal value is 3!");
  })
});
