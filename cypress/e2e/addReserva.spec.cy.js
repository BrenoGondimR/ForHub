describe('Formulário de Cadastro de Reserva', () => {
    beforeEach(() => {
      // Acessar a página onde o formulário está
      cy.visit('http://localhost:8080/dashboard/reservas/cadastro'); // Ajuste o caminho conforme necessário
    });
  
    it('Deve preencher e submeter o formulário de reserva', () => {
      // Preencher o campo Cliente
      cy.get('[id="client"]').click();
      cy.get('.p-dropdown-item').contains('Cliente 1').click(); // Substituir pelo nome correto do cliente
  
      // Preencher o campo Espaço
      cy.get('[id="space"]').click();
      cy.get('.p-dropdown-item').contains('Espaço 1').click(); // Substituir pelo nome correto do espaço
  
      // Preencher a data de início
      cy.get('[id="startDate"]').type('2024-10-20'); // Formato de data no padrão 'yyyy-mm-dd'
  
      // Preencher a data de término
      cy.get('[id="endDate"]').type('2024-10-21');
  
      // Preencher a hora de início
      cy.get('[id="startTime"]').clear().type('09:00');
  
      // Preencher a hora de término
      cy.get('[id="endTime"]').clear().type('17:00');
  
      // Preencher o status
      cy.get('[id="status"]').click();
      cy.get('.p-dropdown-item').contains('Confirmada').click(); // Escolhe o status 'Confirmada'
  
      // Preencher o valor total
      cy.get('[id="totalAmount"]').clear().type('500.00'); // Digita o valor total
  
      // Submeter o formulário
      cy.get('button[label="Cadastrar Reserva"]').click();
  
      // Verificar se o envio foi bem-sucedido (ajuste conforme o comportamento esperado)
      cy.url().should('include', '/reserva-sucesso'); // Verifica se redirecionou para a página de sucesso
      cy.contains('Reserva criada com sucesso').should('be.visible'); // Verifica a mensagem de sucesso
    });
  
    it('Deve mostrar erros de validação ao tentar submeter formulário vazio', () => {
      // Submeter o formulário vazio
      cy.get('button[label="Cadastrar Reserva"]').click();
  
      // Verificar se as mensagens de erro de validação aparecem
      cy.contains('Campo obrigatório').should('be.visible');
    });
  });
  