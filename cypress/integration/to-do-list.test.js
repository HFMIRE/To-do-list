describe("to-do list test", () => {
  it("find the to-do website - all-project page", () => {
    //arange
    cy.visit("http://localhost:4000");
  });
  it("add a new board", () => {
    cy.visit("http://localhost:4000");
    cy.contains("Add Projects").click();
    cy.get('input[name="name"').type("Coding project ");
    cy.get("form").submit();
  });
  it("opens the First board page", () => {
    //arrange
    cy.visit("http://localhost:4000");
    //act
    cy.contains("Coding project").click();
  });
  // having a link that allows to go back to the all boards
  it("add task", () => {
    //arrange
    cy.visit("http://localhost:4000/board/26");
    //act
    cy.contains("Add").click();
  });
  it("filling information to add task", () => {
    cy.visit("http://localhost:4000/task?board=26");
    cy.get('input[name="name"').type("Third Task ");
    cy.get('input[ name="description" ').type("Fruits");
    cy.get("form").submit();
  });
  // this part should also check if it is possible to update task
  it("check if it possible to delete task", () => {
    cy.contains("Third Task").click();
    cy.contains("Delete").click();
  });
});
