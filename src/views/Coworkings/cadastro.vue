<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="card">
      <Stepper>
        <!-- Primeira Etapa: Informações -->
        <StepperPanel header="Informações">
          <template #content="{ nextCallback }">
            <b-row>
              <b-colxx v-for="(field, index) in fieldsInfo" :key="index" :lg="field.col" class="p-field" style="display: grid; margin-bottom: 5px;">
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
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Segunda Etapa: Valores -->
        <StepperPanel header="Valores">
          <template #content="{ prevCallback, nextCallback }">
            <b-row>
              <b-colxx v-for="(field, index) in fieldsValores" :key="index" :lg="field.col" class="p-field" style="display: grid;">
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
            <div class="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" style="border-radius: 8px; background: none !important; border: 1px solid #007bff !important; color: #007bff;" @click="prevCallback" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Terceira Etapa: Datas -->
        <StepperPanel header="Datas">
          <template #content="{ prevCallback }">
            <b-row>
              <b-colxx v-for="(field, index) in fieldsDatas" :key="index" :lg="field.col" class="p-field" style="display: grid;">
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
            <div class="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" style="border-radius: 8px; background: none !important; border: 1px solid #007bff !important; color: #007bff;" @click="prevCallback" />
              <Button label="Cadastrar" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;" />
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
      fieldsInfo: [
        { key: 'roomName', label: 'Nome da Sala', type: 'InputText', value: '', error: false, errorMessage: 'Nome da sala é obrigatório', col: '6' },
        { key: 'companyName', label: 'Nome da Empresa', type: 'InputText', value: '', error: false, errorMessage: 'Nome da empresa é obrigatório', col: '6' },
        { key: 'description', label: 'Descrição da Sala/Empresa', type: 'Textarea', value: '', error: false, errorMessage: 'Descrição é obrigatória', col: '12' },
        { key: 'wifi', label: 'Wi-Fi', type: 'Checkbox', value: '', error: false, errorMessage: '', col: '2' },
        { key: 'impressora', label: 'Impressora', type: 'Checkbox', value: '', error: false, errorMessage: '', col: '2' },
        { key: 'sala_reuniao', label: 'Sala de Reunião', type: 'Checkbox', value: '', error: false, errorMessage: '', col: '2' },
        { key: 'cafe', label: 'Café', type: 'Checkbox', value: '', error: false, errorMessage: 'Descrição é obrigatória', col: '2' },
        { key: 'estacionamento', label: 'Estacionemtno', type: 'Checkbox', value: '', error: false, errorMessage: '', col: '2' },
        { key: 'area_relaxamento', label: 'Área de Relaxamento', type: 'Checkbox', value: '', error: false, errorMessage: '', col: '2' },
        { key: 'address', label: 'Endereço', type: 'InputText', value: '', error: false, errorMessage: '', col: '12' },
      ],
      fieldsValores: [
        { key: 'price', label: 'Preço por Hora', type: 'InputNumber', value: '', error: false, errorMessage: 'Preço é obrigatório', col: '6' },
      ],
      fieldsDatas: [
        { key: 'startDate', label: 'Data de Início', type: 'Calendar', value: '', error: false, errorMessage: 'Data de início é obrigatória', col: '6' },
        { key: 'startTime', label: 'Hora de Início', type: 'Calendar', value: '', error: false, errorMessage: 'Hora de início é obrigatória', col: '6', additionalProps: { timeOnly: true }},
        { key: 'endTime', label: 'Hora de Término', type: 'Calendar', value: '', error: false, errorMessage: 'Hora de término é obrigatória', col: '6', additionalProps: { timeOnly: true }},
        { key: 'endDate', label: 'Data de Término', type: 'Calendar', value: '', error: false, errorMessage: 'Data de término é obrigatória', col: '6' },
        { key: 'guests', label: 'Número de Convidados', type: 'InputNumber', value: 1, error: false, errorMessage: 'Número de convidados é obrigatório', col: '6' }
      ],
    };
  },
  methods: {
    getComponentType(type) {
      switch(type) {
        case 'InputText':
          return 'InputText';
        case 'Textarea':
          return 'Textarea';
        case 'InputNumber':
          return 'InputNumber';
        case 'Calendar':
          return 'Calendar';
        case 'Dropdown':
          return 'Dropdown';
        case 'Checkbox':
          return 'Checkbox'; // Use 'div' to wrap multiple checkboxes
        case 'InputMask':
          return 'InputMask';
        default:
          return 'InputText';
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
  },
};
</script>

<style scoped>
.checkbox-option {
  display: grid;
  margin-right: 10px;
}
:deep(.p-stepper-nav){
  padding: 0px
}
</style>
