<template>
  <b-container fluid class="mb-5">
    <b-row class="justify-content-center mt-5">
      <b-col cols="12" class="mb-4">
        <h1 class="text-center">Selecione seu período de cobrança e plano de inscrição</h1>
      </b-col>
    </b-row>
    <b-row class="justify-content-center">
      <b-col cols="12" class="mb-4 text-center">
        <b-form-group class="d-flex justify-content-center">
          <b-form-checkbox v-model="checked" switch @change="toggleBillingPeriod">
            {{ billingPeriod === 'mensal' ? 'Cobrança Mensal' : 'Cobrança Anual' }}
          </b-form-checkbox>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="justify-content-center d-flex align-items-stretch">
      <CardPlans v-for="(plan, index) in updatedPlans" :key="index" :plan="plan" :highlighted="plan.name === 'PREMIUM'" :billingPeriod="billingPeriod" class="d-flex flex-column" />
    </b-row>
  </b-container>
  <FooterComp />
</template>

<script>
import FooterComp from "@/components/Common/FooterComp.vue";
import CardPlans from "@/components/Common/CardPlans.vue";

export default {
  name: "home",
  components: {
    FooterComp,
    CardPlans,
  },
  data() {
    return {
      checked: false,
      billingPeriod: 'mensal',
      plans: [
        {
          name: 'BÁSICO',
          priceMonthly: 50,
          priceYearly: 465,
          descriptionMonthly: 'cobrado mensalmente',
          descriptionYearly: '7% de desconto anual',
          limit: 1,
          days: 30,
          features: [
            'Listagem de 1 escritório',
            'Suporte básico por email',
            'Acesso ao painel de controle',
            'Análises básicas de uso'
          ],
          buttonLabel: 'Assine Agora'
        },
        {
          name: 'PREMIUM',
          priceMonthly: 150,
          priceYearly: 1395,
          descriptionMonthly: 'cobrado mensalmente',
          descriptionYearly: '7% de desconto anual',
          limit: 5,
          days: 30,
          features: [
            'Listagem de até 5 escritórios',
            'Suporte prioritário por email e telefone',
            'Acesso ao painel de controle avançado',
            'Análises detalhadas de uso',
            'Promoções destacadas'
          ],
          buttonLabel: 'Assine Agora'
        },
        {
          name: 'ILIMITADO',
          priceMonthly: 300,
          priceYearly: 3348,
          descriptionMonthly: 'cobrado mensalmente',
          descriptionYearly: '7% de desconto anual',
          limit: 'ilimitado',
          days: 30,
          features: [
            'Listagem ilimitada de escritórios',
            'Suporte dedicado 24/7',
            'Acesso ao painel de controle premium',
            'Análises avançadas de uso',
            'Promoções e destaque máximo',
            'Consultoria personalizada'
          ],
          buttonLabel: 'Assine Agora'
        },
      ],
    };
  },
  computed: {
    updatedPlans() {
      return this.plans.map(plan => {
        const monthlyCost = plan.priceMonthly * 12;
        const yearlyCost = plan.priceYearly;
        const savings = monthlyCost - yearlyCost;

        return {
          ...plan,
          price: this.billingPeriod === 'mensal' ? plan.priceMonthly : plan.priceYearly,
          description: this.billingPeriod === 'mensal' ? plan.descriptionMonthly : plan.descriptionYearly,
          savings
        };
      });
    }
  },
  methods: {
    toggleBillingPeriod() {
      this.billingPeriod = this.checked ? 'anual' : 'mensal';
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

b-form-checkbox {
  display: inline-block;
  font-size: 1.2rem;
  cursor: pointer;
}

b-form-group {
  margin-bottom: 0;
}

.discount-text {
  font-size: 1rem;
  color: #28a745;
  margin-left: 0.5rem;
}

:deep(.btn:hover){
  color: #1aa3e4;
  background: linear-gradient(135deg, #f0f0f0, #ffffff);
}
</style>