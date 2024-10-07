describe('Formulário de Cadastro de Cliente', () => {
    beforeEach(() => {
          // Visita a página do formulário
      cy.visit('http://localhost:8080/dashboard/clientes/cadastro'); // Ajuste este caminho para a URL real
    });
  
    it('Deve preencher e submeter o formulário de cliente com sucesso', () => {
      // Preenche o campo "Nome de Cliente"
      cy.get('input[id="nome"]').type('João da Silva');
  
      // Preenche o campo "Email"
      cy.get('input[id="email"]').type('joao.silva@example.com');
  
      // Preenche o campo "Telefone"
      cy.get('input[id="telefonewpp"]').type('(11) 98765-4321');
  
      // Preenche o campo "CPF/CNPJ"
      cy.get('input[id="cpfcnpj"]').type('12345678901'); // CPF de 11 dígitos
    // Simula o clique para abrir o dropdown customizado
    cy.get('div[id="statusconta"]').click(); // Ajuste o seletor para o componente do dropdown

    // Aguarda as opções aparecerem e clica na opção "Ativo"
    cy.contains('Ativo').click(); // Ajuste para o texto exato da opção ou o seletor correto

    // Verifica se o valor foi selecionado corretamente (dependendo da implementação do seu dropdown)
    cy.get('div[id="statusconta"]').should('contain', 'Ativo');
  
      // Verifica se foi redirecionado para a página correta (dashboard de clientes)
      cy.url().should('include', '/dashboard/clientes');
  
      // Verifica se a mensagem de sucesso é exibida
      cy.contains('Cliente criado com sucesso!');
    });
  });
  