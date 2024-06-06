<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="card">
      <Stepper>
        <!-- Primeira Etapa: Informações -->
        <StepperPanel header="Informações">
          <template #content="{ nextCallback }">
            <h4 class="mb-3"><strong>Informações</strong></h4>
            <b-row>
              <b-colxx v-for="(field, index) in fieldsInfo" :key="index" :lg="field.col" class="p-field"
                       style="display: grid; margin-bottom: 20px;">
                <label :for="field.key">{{ field.label }}</label>
                <component
                    :is="getComponentType(field.type)"
                    v-model="field.value"
                    :id="field.key"
                    v-bind="getComponentProps(field)"
                    @keydown="field.error = false"
                    style="max-height: 44px !important;"
                />
                <small v-if="field.error" class="text-danger">{{ field.errorMessage }}</small>
              </b-colxx>
            </b-row>
            <div class="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;"
                      @click="nextCallback"/>
            </div>
          </template>
        </StepperPanel>

        <!-- Segunda Etapa: Valores -->
        <StepperPanel header="Valores">
          <template #content="{ prevCallback, nextCallback }">
            <h4 class="mb-3"><strong>Valores</strong></h4>
            <b-row>
              <b-colxx v-for="(field, index) in fieldsValores" :key="index" :lg="field.col" class="p-field"
                       style="display: grid; align-items: center; margin-bottom: 20px;">
                <div class="field-label-checkbox">
                  <label :for="field.key">{{ field.label }}</label>
                  <b-form-checkbox class="checkbox-option" v-model="field.active" @input="toggleService(field.key)"/>
                </div>
                <div v-if="field.active" class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">R$</span>
                  </div>
                  <component
                      :is="getComponentType(field.type)"
                      v-model="field.value"
                      :id="field.key"
                      v-bind="getComponentProps(field)"
                      @keydown="field.error = false"
                      style="max-height: 44px !important; border-radius: 5px 0px 0px 5px; !important;"
                  />
                  <div class="input-group-append">
                    <Dropdown style="height: 100%;" v-model="field.unit" :options="timeUnits" optionLabel="label"
                              placeholder="Unidade" class="dropdown-inside"></Dropdown>
                  </div>
                  <!-- Campo de descrição -->
                </div>
                <div>
                  <InputText style="width: 100%;" v-if="field.active" v-model="field.description" placeholder="Descrição adicional" class="mt-3"></InputText>
                </div>
                <small v-if="field.error" class="text-danger">{{ field.errorMessage }}</small>
              </b-colxx>
            </b-row>
            <div class="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                      style="border-radius: 8px; background: none !important; border: 1px solid #007bff !important; color: #007bff;"
                      @click="prevCallback"/>
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;"
                      @click="nextCallback"/>
            </div>
          </template>
        </StepperPanel>

        <!-- Terceira Etapa: Formas de Pagamento -->
        <StepperPanel header="Formas de Pagamento">
          <template #content="{ prevCallback }">
            <h4 class="mb-3"><strong>Formas de Pagamento</strong></h4>
            <b-row>
              <b-colxx v-for="(field, index) in fieldsPagamentos" :key="index" :lg="field.col" class="p-field"
                       style="display: grid; align-items: center; margin-bottom: 20px;">
                <b-form-checkbox v-model="field.value" :id="field.key">
                  {{ field.label }}
                </b-form-checkbox>
              </b-colxx>
            </b-row>
            <div class="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                      style="border-radius: 8px; background: none !important; border: 1px solid #007bff !important; color: #007bff;"
                      @click="prevCallback"/>
              <Button label="Cadastrar" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;"/>
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";

export default {
  name: "CoworkingCreation",
  components: {
    BColxx,
  },
  data() {
    return {
      timeUnits: [
        {label: 'Por Hora', value: 'hora'},
        {label: 'Por Dia', value: 'dia'},
        {label: 'Por Mês', value: 'mes'}
      ],
      fieldsInfo: [
        {
          key: 'roomName',
          label: 'Nome da Sala',
          type: 'InputText',
          value: '',
          error: false,
          errorMessage: 'Nome da sala é obrigatório',
          col: '6'
        },
        {
          key: 'companyName',
          label: 'Nome da Empresa',
          type: 'InputText',
          value: '',
          error: false,
          errorMessage: 'Nome da empresa é obrigatório',
          col: '6'
        },
        {
          key: 'description',
          label: 'Descrição da Sala/Empresa',
          type: 'TextArea',
          value: '',
          error: false,
          errorMessage: 'Descrição é obrigatória',
          col: '12'
        },
        {key: 'wifi', label: 'Wi-Fi', type: 'Checkbox', value: false, error: false, errorMessage: '', col: '2'},
        {
          key: 'quadro',
          label: 'Quadro Branco',
          type: 'Checkbox',
          value: false,
          error: false,
          errorMessage: '',
          col: '2'
        },
        {
          key: 'sala_reuniao',
          label: 'Sala de Reunião',
          type: 'Checkbox',
          value: false,
          error: false,
          errorMessage: '',
          col: '2'
        },
        {key: 'cafe', label: 'Café', type: 'Checkbox', value: false, error: false, errorMessage: '', col: '2'},
        {
          key: 'estacionamento',
          label: 'Estacionamento',
          type: 'Checkbox',
          value: false,
          error: false,
          errorMessage: '',
          col: '2'
        },
        {
          key: 'area_relaxamento',
          label: 'Área de Relaxamento',
          type: 'Checkbox',
          value: false,
          error: false,
          errorMessage: '',
          col: '2'
        },
        {key: 'address', label: 'Endereço', type: 'InputText', value: '', error: false, errorMessage: '', col: '12'},
      ],
      fieldsValores: [
        {
          key: 'domicilio_fiscal',
          label: 'Domicílio Fiscal',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 120.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
        {
          key: 'secretariado',
          label: 'Secretariado',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 179.90,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
        {
          key: 'coworking',
          label: 'Estações de Trabalho - Coworking',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 560.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
        {
          key: 'sala_exclusiva',
          label: 'Sala Exclusiva',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 3500.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
        {
          key: 'sala_reuniao',
          label: 'Sala de Reunião',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 80.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
        {
          key: 'sala_treinamento',
          label: 'Sala de Treinamento',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 670.00,
          col: '6',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
        {
          key: 'auditorio',
          label: 'Auditório',
          type: 'InputNumber',
          description: '', // Descrição adicional
          value: 900.00,
          col: '12',
          active: true,
          error: false,
          errorMessage: 'Este campo é obrigatório',
          unit: ''
        },
      ],
      fieldsPagamentos: [
        {key: 'pix', label: 'PIX', value: false, col: '6'},
        {key: 'boleto', label: 'Boleto Bancário', value: false, col: '6'},
        {key: 'credito', label: 'Cartão de Crédito', value: false, col: '6'},
        {key: 'debito', label: 'Cartão de Débito', value: false, col: '6'},
        {key: 'transferencia', label: 'Transferência Bancária', value: false, col: '6'},
        {key: 'paypal', label: 'PayPal', value: false, col: '6'},
        {key: 'pagseguro', label: 'PagSeguro', value: false, col: '6'},
        {key: 'mercadopago', label: 'Mercado Pago', value: false, col: '6'},
        {key: 'picpay', label: 'PicPay', value: false, col: '6'},
      ],
    };
  },
  methods: {
    getComponentType(type) {
      switch (type) {
        case 'InputText':
          return 'b-form-input';
        case 'TextArea':
          return 'b-form-textarea';
        case 'InputNumber':
          return 'b-form-input';
        case 'Calendar':
          return 'b-form-datepicker';
        case 'Dropdown':
          return 'b-form-select';
        case 'Checkbox':
          return 'b-form-checkbox';
        case 'InputMask':
          return 'b-form-input';
        default:
          return 'b-form-input';
      }
    },
    getComponentProps(field) {
      const props = {};
      if (field.type === 'InputMask') {
        props.mask = field.mask;
      }
      if (field.type === 'Dropdown') {
        props.options = field.options;
      }
      if (field.type === 'Checkbox') {
        props.options = field.options;
      }
      if (field.type === 'Calendar' && field.additionalProps) {
        Object.assign(props, field.additionalProps);
      }
      return props;
    },
    toggleService(key) {
      const field = this.fieldsValores.find(f => f.key === key);
      if (field) {
        field.active = !field.active;
      }
    },
  },
};
</script>

<style scoped>
.checkbox-option {
  margin-left: 10px;
}

.form-check {
  min-height: 1.5rem;
  margin-top: 5px;
}

:deep(.p-stepper-nav) {
  padding: 0px;
}

.field-label-checkbox {
  display: flex;
  align-items: center;
  gap: 5px;
}

.input-group {
  display: flex;
  align-items: center;
}

.input-group-prepend {
  margin-right: 5px;
}

.form-control {
  border-radius: 5px;
}

.input-group-append {
  display: flex;
  align-items: center;
  height: 100%;
}

.dropdown-inside .p-dropdown {
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  height: 100%;
}

h4 {
  font-weight: bold;
}
</style>
