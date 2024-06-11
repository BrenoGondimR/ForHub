<template>
  <b-row class="main-flux" style="margin: 20px !important;">
    <b-colxx lg="12" class="card" style="padding: 30px;">
      <Stepper>
        <!-- Primeira Etapa: Informações -->
        <StepperPanel header="Informações">
          <template #content="{ nextCallback }">
            <h4 class="mb-3"><strong>Informações</strong></h4>
            <b-row>
              <b-colxx v-for="(field, index) in fieldsInfo" :key="index" :lg="field.col" class="p-field" style="display: grid; margin-bottom: 20px;">
                <label :for="field.key">{{ field.label }}</label>
                <component
                    :is="getComponentType(field.type)"
                    v-model="field.value"
                    :id="field.key"
                    v-bind="getComponentProps(field)"
                    @keydown="field.error = false"
                    @blur="field.key === 'cep' ? fetchAddress() : null"
                    style="max-height: 44px !important;"
                />
                <small v-if="field.error" class="text-danger">{{ field.errorMessage }}</small>
              </b-colxx>
            </b-row>
            <!-- Componente de upload de arquivos -->
            <div class="card mt-3">
              <Toast />
              <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload" :multiple="true" accept="image/*" customUpload @uploader="customBase64Uploader" :maxFileSize="1000000" @select="onSelectedFiles">
                <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                  <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                    <div class="flex gap-2">
                      <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined class="custom-button"></Button>
                      <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0" class="custom-button"></Button>
                      <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0" class="custom-button"></Button>
                    </div>
                    <ProgressBar :value="totalSizePercent" :showValue="false" :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]">
                      <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
                    </ProgressBar>
                  </div>
                </template>
                <template #content="{ files, removeUploadedFileCallback, removeFileCallback }">
                  <div v-if="files.length > 0">
                    <h5>Pending</h5>
                    <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                      <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                          <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <Badge :value="file.status" :severity="file.status === 'Completed' ? 'success' : 'warning'" />
                        <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" class="custom-button" />
                      </div>
                    </div>
                  </div>
                </template>
                <template #empty>
                  <div class="flex align-items-center justify-content-center flex-column">
                    <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400" />
                    <p class="mt-4 mb-0 text-drag">Drag and drop files to here to upload.</p>
                  </div>
                </template>
              </FileUpload>
            </div>
            <div class="flex pt-4 justify-content-end">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Segunda Etapa: Valores -->
        <StepperPanel header="Valores">
          <template #content="{ prevCallback, nextCallback }">
            <h4 class="mb-3"><strong>Valores</strong></h4>
            <b-row>
              <b-colxx v-for="(field, index) in fieldsValores" :key="index" :lg="field.col" class="p-field" style="display: grid; align-items: center; margin-bottom: 20px;">
                <div class="field-label-checkbox">
                  <label :for="field.key">{{ field.label }}</label>
                  <b-form-checkbox class="checkbox-option" v-model="field.active" @input="toggleService(field.key)" />
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
                    <Dropdown style="height: 100%;" v-model="field.unit" :options="timeUnits" optionLabel="label" placeholder="Unidade" class="dropdown-inside"></Dropdown>
                  </div>
                </div>
                <!-- Campo de descrição -->
                <div>
                  <InputText style="width: 100%;" v-if="field.active" v-model="field.description" placeholder="Descrição adicional" class="mt-3"></InputText>
                </div>
                <small v-if="field.error" class="text-danger">{{ field.errorMessage }}</small>
              </b-colxx>
            </b-row>
            <div class="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" style="border-radius: 8px; background: none !important; border: 1px solid #007bff !important; color: #007bff;" @click="prevCallback" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Terceira Etapa: Formas de Pagamento -->
        <StepperPanel header="Pagamentos">
          <template #content="{ prevCallback }">
            <h4 class="mb-3"><strong>Formas de Pagamento</strong></h4>
            <b-row>
              <b-colxx v-for="(field, index) in fieldsPagamentos" :key="index" :lg="field.col" class="p-field" style="display: grid; align-items: center; margin-bottom: 20px;">
                <b-form-checkbox v-model="field.value" :id="field.key">
                  {{ field.label }}
                </b-form-checkbox>
              </b-colxx>
            </b-row>
            <div class="flex pt-4 justify-content-between">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" style="border-radius: 8px; background: none !important; border: 1px solid #007bff !important; color: #007bff;" @click="prevCallback" />
              <Button label="Cadastrar" icon="pi pi-arrow-right" iconPos="right" style="border-radius: 8px;" @click="createCoworkingSpace" />
            </div>
          </template>
        </StepperPanel>
      </Stepper>
    </b-colxx>
  </b-row>
</template>

<script>
import BColxx from "@/components/Common/Colxx.vue";
import { createCoworking } from "@/views/Coworkings/coworkings_service";

export default {
  name: "CoworkingCreation",
  components: {
    BColxx
  },
  data() {
    return {
      timeUnits: [
        { label: 'Por Hora', value: 'hora' },
        { label: 'Por Dia', value: 'dia' },
        { label: 'Por Mês', value: 'mes' }
      ],
      imageFilenames: [], // Armazena os filenames das imagens
      imageBase64Strings: [], // Armazena as strings base64 das imagens
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
          col: '6'
        },
        {
          key: 'phone',
          label: 'Telefone/WhatsApp',
          type: 'InputText',
          value: '',
          error: false,
          errorMessage: 'Telefone/WhatsApp é obrigatório',
          col: '6'
        },
        { key: 'wifi', label: 'Wi-Fi', type: 'Checkbox', value: false, error: false, errorMessage: '', col: '2' },
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
        { key: 'cafe', label: 'Café', type: 'Checkbox', value: false, error: false, errorMessage: '', col: '2' },
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
        { key: 'cep', label: 'CEP', type: 'InputText', value: '', error: false, errorMessage: '', col: '6' },
        { key: 'logradouro', label: 'Logradouro', type: 'InputText', value: '', error: false, errorMessage: '', col: '6' },
        { key: 'complemento', label: 'Complemento', type: 'InputText', value: '', error: false, errorMessage: '', col: '4' },
        { key: 'bairro', label: 'Bairro', type: 'InputText', value: '', error: false, errorMessage: '', col: '4' },
        { key: 'numero', label: 'Numero', type: 'InputText', value: '', error: false, errorMessage: '', col: '4' },
      ],
      fieldsValores: [
        { key: 'domicilio_fiscal', label: 'Domicílio Fiscal', type: 'InputNumber', description: '', value: 120.00, col: '6', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
        { key: 'secretariado', label: 'Secretariado', type: 'InputNumber', description: '', value: 179.90, col: '6', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
        { key: 'coworking', label: 'Estações de Trabalho - Coworking', type: 'InputNumber', description: '', value: 560.00, col: '6', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
        { key: 'sala_exclusiva', label: 'Sala Exclusiva', type: 'InputNumber', description: '', value: 3500.00, col: '6', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
        { key: 'sala_reuniao', label: 'Sala de Reunião', type: 'InputNumber', description: '', value: 80.00, col: '6', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
        { key: 'sala_treinamento', label: 'Sala de Treinamento', type: 'InputNumber', description: '', value: 670.00, col: '6', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
        { key: 'auditorio', label: 'Auditório', type: 'InputNumber', description: '', value: 900.00, col: '12', active: true, error: false, errorMessage: 'Este campo é obrigatório', unit: '' },
      ],
      fieldsPagamentos: [
        { key: 'pix', label: 'PIX', value: false, col: '6' },
        { key: 'boleto', label: 'Boleto Bancário', value: false, col: '6' },
        { key: 'credito', label: 'Cartão de Crédito', value: false, col: '6' },
        { key: 'debito', label: 'Cartão de Débito', value: false, col: '6' },
        { key: 'transferencia', label: 'Transferência Bancária', value: false, col: '6' },
        { key: 'paypal', label: 'PayPal', value: false, col: '6' },
        { key: 'pagseguro', label: 'PagSeguro', value: false, col: '6' },
        { key: 'mercadopago', label: 'Mercado Pago', value: false, col: '6' },
        { key: 'picpay', label: 'PicPay', value: false, col: '6' },
      ],
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
    };
  },
  methods: {
    async customBase64Uploader(event) {
      const promises = event.files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imageBase64Strings.push(reader.result);
            this.imageFilenames.push(file.name);
            resolve();
          };
        });
      });

      await Promise.all(promises);
      this.files = this.files.map(file => ({
        ...file,
        status: 'Completed'
      }));
      this.onTemplatedUpload();
    },
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
    async fetchAddress() {
      const cepField = this.fieldsInfo.find(f => f.key === 'cep');
      if (cepField.value.length === 8) {  // Verifica se o CEP tem 8 dígitos
        try {
          const response = await fetch(`https://viacep.com.br/ws/${cepField.value}/json/`);
          const addressData = await response.json();
          if (addressData && !addressData.erro) {
            this.updateField('logradouro', addressData.logradouro);
            this.updateField('bairro', addressData.bairro);
          } else {
            this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'CEP não encontrado.', life: 3000 });
          }
        } catch (error) {
          console.error('Erro ao buscar o CEP:', error);
          this.$toast.add({ severity: 'error', summary: 'Erro de Rede', detail: 'Não foi possível buscar o CEP.', life: 3000 });
        }
      }
    },
    updateField(key, value) {
      const field = this.fieldsInfo.find(f => f.key === key);
      if (field) {
        field.value = value;
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
    onRemoveTemplatingFile(file, removeFileCallback, index) {
      removeFileCallback(index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
    },
    onClearTemplatingUpload(clear) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
    },
    onSelectedFiles(event) {
      this.files = event.files.map(file => ({
        ...file,
        status: 'Pending'
      }));
      this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size));
      });
    },
    uploadEvent(callback) {
      this.totalSizePercent = this.totalSize / 10;
      callback();
    },
    createCoworkingSpace() {
      const space = {
        nome: this.fieldsInfo.find(f => f.key === 'roomName').value,
        logradouro: this.fieldsInfo.find(f => f.key === 'logradouro').value,
        cep: parseInt(this.fieldsInfo.find(f => f.key === 'cep').value),
        numero: parseInt(this.fieldsInfo.find(f => f.key === 'numero').value),
        complemento: this.fieldsInfo.find(f => f.key === 'complemento').value,
        descricao: this.fieldsInfo.find(f => f.key === 'description').value,
        wifi: this.fieldsInfo.find(f => f.key === 'wifi').value,
        quadro_branco: this.fieldsInfo.find(f => f.key === 'quadro').value,
        sala_reuniao: this.fieldsInfo.find(f => f.key === 'sala_reuniao').value,
        cafe: this.fieldsInfo.find(f => f.key === 'cafe').value,
        estacionamento: this.fieldsInfo.find(f => f.key === 'estacionamento').value,
        area_relaxamento: this.fieldsInfo.find(f => f.key === 'area_relaxamento').value,
        valores: this.fieldsValores.filter(f => f.active).map(f => ({
          servico: f.label,
          preco: f.value,
          unidade: f.unit ? f.unit.value : '',  // Certifique-se de que 'unit' é uma string
          descricao: f.description
        })),
        imagens: this.imageBase64Strings.map((base64, index) => ({
          base64,
          filename: this.imageFilenames[index] // Adiciona o filename
        }))
      };

      createCoworking(space)
          .then(response => {
            if (response.status === 201) {
              this.$router.push('/dashboard/coworkings/espacos');
              this.showSuccess(); // Chama a função showSuccess ao criar com sucesso
            }

          })
          .catch(error => {
            this.$toast.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao criar o espaço de coworking.', life: 3000 });
          });
    },
    showSuccess() {
      this.$toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 });
    },
    onTemplatedUpload() {
      this.files = this.files.map(file => ({
        ...file,
        status: 'Completed'
      }));
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },
    formatSize(bytes) {
      const k = 1024;
      const dm = 3;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    }
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

.p-fileupload {
  border: 1px dashed #cbc8c8 !important;
  border-radius: 8px !important;
}

.dropdown-inside .p-dropdown {
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  height: 100%;
}

h4 {
  font-weight: bold;
}

.custom-button.p-button {
  border: none!important;
  background: none!important;
}

.text-drag {
  font-family: Poppins, sans-serif
}
</style>
