describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/register'); // Ajuste o caminho da URL de registro
  });

  it('Deve preencher o formulário de registro', () => {
    cy.get('#username').type('novo_usuario');
    cy.get('#email').type('email@teste.com');
    cy.get('#telefone').type('123456789');
    cy.get('#cpf_cnpj').type('12345678901');
    
 
    cy.get('#password').type('SenhaForte@123');

    cy.get('body').click();

    cy.get('#confirm-password').type('SenhaForte@123');

    cy.get('body').click();
    
    cy.get('button[type="button"]').click();

    cy.url().should('include', '/login');
  });


  it('Deve exibir erro ao tentar registrar com senhas diferentes', () => {
    cy.get('#username').type('novo_usuario');
    cy.get('#email').type('email@teste.com');
    cy.get('#telefone').type('123456789');
    cy.get('#cpf_cnpj').type('12345678901');
    cy.get('#password').type('SenhaForte@123');
    cy.get('body').click();
    cy.get('#confirm-password').type('SenhaDiferente');
    cy.get('body').click();
    cy.get('button[type="button"]').click();

    cy.get('.text-danger').should('contain', 'As senhas não coincidem.');
  });
});
