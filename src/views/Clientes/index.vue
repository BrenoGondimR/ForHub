<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="mb-4">
      <h2 class="title-dash">Clientes</h2>
    </b-colxx>
    <b-colxx lg="12">
      <b-row>
        <b-colxx v-for="(card, index) in cards" :key="index" md="6">
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
            <Column field="telefone" header="Telefone" style="width: 25%"></Column>
            <Column field="start_date" header="Cadastro" style="width: 25%">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.start_date) }}
              </template>
            </Column>
            <Column field="stage" header="Email" style="width: 25%"></Column>
            <Column field="status" header="Status" style="width: 25%">
              <template #body="slotProps">
                <div :class="getStatusClass(slotProps.data.status)">
                  {{ slotProps.data.status }}
                </div>
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
            <Column field="telefone" header="Telefone" style="width: 25%"></Column>
            <Column field="start_date" header="Cadastro" style="width: 25%">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.start_date) }}
              </template>
            </Column>
            <Column field="stage" header="Email" style="width: 25%"></Column>
            <Column field="status" header="Status" style="width: 25%">
              <template #body="slotProps">
                <div :class="getStatusClass(slotProps.data.status)">
                  {{ slotProps.data.status }}
                </div>
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
      customers: [],
      cards: [
        { title: 'Clientes Ativos', icon: 'pi pi-user-plus', quantity: 0 },
        { title: 'Clientes Inativos', icon: 'pi pi-user-minus', quantity: 0 }
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
      return name.substring(0, 2).toUpperCase();
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
    updateCardQuantities() {
      this.cards[0].quantity = this.customers.filter(customer => 
        customer.status === 'ativo'
      ).length;
      
      this.cards[1].quantity = this.customers.filter(customer => 
        customer.status === 'inativo'
      ).length;
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('pt-BR', options);
    },
    fetchClients() {
      const userId = parseInt(localStorage.getItem('userId'), 10);
      getAllClients(userId)
        .then(response => {
          const clientsFromApi = response.data.data;
          this.customers = clientsFromApi.map(client => ({
            name: client.Nome,
            telefone: client.TelefoneWpp,
            start_date: client.CreatedAt,
            stage: client.Email,
            status: client.StatusConta,
            progress: 100
          }));
          debugger
          this.assignRandomBadgeClass();
          this.updateCardQuantities();
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

