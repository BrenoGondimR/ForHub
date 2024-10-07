<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Clientes</h2>
    </b-colxx>
    <b-colxx lg="12">
      <b-row>
        <b-colxx v-for="(card, index) in cards" :key="index" md="4">
          <CardComponent :title="card.title" :icon="card.icon" :quantity="card.quantity" />
        </b-colxx>
      </b-row>
    </b-colxx>
    <b-colxx lg="12" style="display: flex; justify-content: space-between;" class="mt-2 mb-2">
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"> </InputIcon>
        <InputText v-model="searchQuery" placeholder="Search" />
      </IconField>
      <Button class="button-new" @click="redirectToCadastro" label="Cadastrar Cliente" outlined />
    </b-colxx>
    <b-colxx lg="12">
      <TabView>
        <TabPanel header="Ativos">
          <DataTable :value="filteredActiveCustomers" paginator :rows="5" tableStyle="min-width: 50rem">
            <Column field="nome" header="Nome" style="width: 16%">
              <template #body="slotProps">
                <div class="customer-badge" :class="slotProps.data.badgeClass">
                  <span class="customer-initials">{{ getInitials(slotProps.data.name) }}</span>
                </div>
                <span>{{ slotProps.data.name }}</span>
              </template>
            </Column>
            <Column field="telefone" header="Telefone" style="width: 16%"></Column>
            <Column field="start_date" header="Cadastro" style="width: 16%"></Column>
            <Column field="stage" header="Email" style="width: 16%"></Column>
            <Column field="status" header="Status" style="width: 16%">
              <template #body="slotProps">
                <div :class="getStatusClass(slotProps.data.status)">
                  {{ slotProps.data.status }}
                </div>
              </template>
            </Column>
            <Column field="progress" header="Pagamento" style="width: 16%">
              <template #body="slotProps">
                <ProgressBar :value="slotProps.data.progress"></ProgressBar>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
        <TabPanel header="Inativos">
          <DataTable :value="filteredInactiveCustomers" paginator :rows="5" tableStyle="min-width: 50rem">
            <Column field="name" header="Nome" style="width: 16%">
              <template #body="slotProps">
                <div class="customer-badge" :class="slotProps.data.badgeClass">
                  <span class="customer-initials">{{ getInitials(slotProps.data.name) }}</span>
                </div>
                <span>{{ slotProps.data.name }}</span>
              </template>
            </Column>
            <Column field="telefone" header="Telefone" style="width: 16%"></Column>
            <Column field="start_date" header="Cadastro" style="width: 16%"></Column>
            <Column field="stage" header="Email" style="width: 16%"></Column>
            <Column field="status" header="Status" style="width: 16%">
              <template #body="slotProps">
                <div :class="getStatusClass(slotProps.data.status)">
                  {{ slotProps.data.status }}
                </div>
              </template>
            </Column>
            <Column field="progress" header="Pagamento" style="width: 16%">
              <template #body="slotProps">
                <ProgressBar :value="slotProps.data.progress"></ProgressBar>
              </template>
            </Column>
          </DataTable>
        </TabPanel>
      </TabView>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import CardComponent from "@/components/Common/ClientsCard.vue";
import {getAllClients} from "@/views/Clientes/clientes_service";

export default {
  name: "clients",
  components: {
    BColxx,
    CardComponent
  },
  data() {
    return {
      searchQuery: '',
      customers: [

      ],
      cards: [
        { title: 'Novos Clientes', icon: 'pi pi-user-plus', quantity: 20 },
        { title: 'Clientes Inativos', icon: 'pi pi-user-minus', quantity: 15 },
        { title: 'Clientes Hospedados', icon: 'pi pi-home', quantity: 10 }
      ]
    };
  },
  computed: {
    activeCustomers() {
      return this.customers.filter(customer => customer.status === 'ativo');
    },
    inactiveCustomers() {
      return this.customers.filter(customer => customer.status === 'inativo');
    },
    filteredActiveCustomers() {
      return this.activeCustomers.filter(customer =>
          customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredInactiveCustomers() {
      return this.inactiveCustomers.filter(customer =>
          customer.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    getInitials(name) {
      const initials = name.split(' ').map(n => n[0]).join('');
      return initials.toUpperCase();
    },
    assignRandomBadgeClass() {
      const badgeClasses = [
        'badge-1',
        'badge-2',
        'badge-3',
        'badge-4'
      ];
      this.customers.forEach(customer => {
        customer.badgeClass = badgeClasses[Math.floor(Math.random() * badgeClasses.length)];
      });
    },
    getStatusClass(status) {
      return status === 'ativo' ? 'status-active' : 'status-inactive';
    },
    redirectToCadastro() {
      this.$router.push('/dashboard/clientes/cadastro');
    },
    fetchClients() {
      const userId = parseInt(localStorage.getItem('userId'), 10); // Obtém o userId do localStorage
      getAllClients(userId) // Faz a chamada à API passando o userID
          .then(response => {
            const clientsFromApi = response.data.data; // Dados dos clientes da API
            clientsFromApi.forEach(client => {
              debugger
              this.customers.push({
                name: client.Nome, // Mapeia os dados conforme necessário
                telefone: client.TelefoneWpp,
                start_date: client.DataCriacao, // Data de criação do cliente
                stage: client.Email, // Email do cliente
                status: client.StatusConta, // Status da conta
                progress: 100 // Progresso (você pode ajustar essa lógica conforme a necessidade)
              });
            });
            this.assignRandomBadgeClass(); // Atribui uma classe de badge aleatória a cada cliente
          })
          .catch(error => {
            console.error('Erro ao buscar clientes:', error);
          });
    }
  },
  mounted() {
    this.fetchClients()
    this.assignRandomBadgeClass();
  }
};
</script>

<style scoped>
.customer-badge {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  margin-right: 10px;
  font-weight: bold;
  color: white;
}

.customer-initials {
  color: white;
}

:deep(.p-inputtext:focus) {
  outline: 1px solid #3498db;
}

.badge-1 {
  background-color: #f9f3eb;
  border: 1px solid #f6ede1;
  color: #ca9552;
}

.badge-2 {
  background-color: #e9f1f6;
  border: 1px solid #ccdee9;
  color: #4c8bb3;
}

.badge-3 {
  background-color: #f6e9f4;
  border: 1px solid #e9cae4;
  color: #b54aa5;
}

.badge-4 {
  background-color: #e9f6eb;
  border: 1px solid #cbe9cd;
  color: #68c175;
}

.badge-1 span {
  color: #ca9552;
}

.badge-2 span {
  color: #4c8bb3;
}

.badge-3 span {
  color: #b54aa5;
}

.badge-4 span {
  color: #68c175;
}

.status-active {
  background-color: #E8F7E9;
  border: 1px solid #C9ECC8;
  color: #41BF43;
  padding: 0 10px;
  border-radius: 10px;
  display: inline-block;
}

.status-inactive {
  background-color: #FFE9E9;
  border: 1px solid #FFC9CE;
  color: #FE3232;
  padding: 0 10px;
  border-radius: 10px;
  display: inline-block;
}
</style>

