<template>
  <b-col cols="12" lg="4" class="mb-4">
    <b-card :class="['plan-card', { 'highlighted': highlighted }]">
      <b-card-header class="plan-header">
        <h2 class="plan-title">{{ plan.name }}</h2>
        <div v-if="billingPeriod === 'anual'" class="plan-save">
          Economize R$ {{ annualSavings }}
        </div>
        <h2 class="plan-price">
          R$ {{ price }}/<span v-if="billingPeriod === 'mensal'">mês</span><span v-else>ano</span>
        </h2>
        <p v-if="billingPeriod === 'anual'" class="plan-price-annual">
          Total ano: R$ {{ price }} em até 12x de R$ {{ monthlyInstallment }}
        </p>
        <p class="plan-description">{{ plan.description }}</p>
      </b-card-header>
      <b-card-body>
        <p class="plan-limit">
          <span class="plan-limit-text">Limite de escritórios:</span>
          <span class="plan-limit-value">{{ plan.limit }}</span>
        </p>
        <p class="plan-details">Período de utilização: <span class="plan-details-value">{{ plan.days }} dias</span></p>
        <b-list-group class="mt-3 plan-features">
          <b-list-group-item
              v-for="(feature, index) in plan.features"
              :key="index"
              variant="light"
              class="plan-feature"
          >
            <b-icon icon="check" class="mr-2" variant="success" /> {{ feature }}
          </b-list-group-item>
        </b-list-group>
      </b-card-body>
      <b-card-footer class="plan-footer">
        <b-button class="plan-button" @click="selectPlan(plan)">{{ plan.buttonLabel }}</b-button>
      </b-card-footer>
    </b-card>
  </b-col>
</template>

<script>
export default {
  name: "CardPlans",
  props: {
    plan: {
      type: Object,
      required: true,
    },
    highlighted: {
      type: Boolean,
      default: false
    },
    billingPeriod: {
      type: String,
      required: true,
    }
  },
  computed: {
    price() {
      return this.billingPeriod === 'mensal' ? this.plan.priceMonthly : this.plan.priceYearly;
    },
    annualSavings() {
      if (this.billingPeriod === 'anual') {
        const monthlyCost = this.plan.priceMonthly * 12;
        const yearlyCost = this.plan.priceYearly;
        return monthlyCost - yearlyCost;
      }
      return 0;
    },
    monthlyInstallment() {
      if (this.billingPeriod === 'anual') {
        return (this.plan.priceYearly / 12).toFixed(2);
      }
      return 0;
    }
  },
  methods: {
    selectPlan(plan) {
      console.log("Plano selecionado:", plan);
    }
  }
};
</script>

<style scoped>
.plan-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  background-color: #ffffff;
  border: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.highlighted {
  border: 2px solid #1aa3e4;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transform: scale(1.05);
}

.plan-header {
  background-color: #f0f0f0;
  padding: 24px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  text-align: center;
  position: relative;
}

.plan-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333333;
}

.plan-save {
  display: inline-block;
  background-color: #28a745;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 8px;
  padding: 4px 8px;
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
}

.plan-price {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 8px;
  color: #1aa3e4;
}

.plan-price-annual {
  font-size: 16px;
  color: #555;
  margin-bottom: 8px;
}

.plan-description {
  color: #777777;
  font-weight: 500;
  font-size: 14px;
}

.plan-limit, .plan-details {
  font-size: 16px;
  color: #555555;
  margin-bottom: 8px;
}

.plan-limit-text, .plan-details-value {
  font-weight: 500;
}

.plan-limit-value {
  font-size: 20px;
  font-weight: bold;
  color: #1aa3e4;
  background: linear-gradient(45deg, #1aa3e4, #6a1b9a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 4px 8px;
}

.plan-features {
  margin-top: 16px;
  flex-grow: 1;
}

.plan-feature {
  padding: 12px 16px;
  color: #555555;
  border: none;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: background-color 0.3s ease-in-out;
}

.plan-feature:hover {
  background-color: #e9ecef;
}

.plan-footer {
  padding: 24px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  text-align: center;
  margin-top: auto; /* Adiciona esta linha para empurrar o footer para o final do card */

}

.plan-button {
  background-color: #1aa3e4;
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
}
</style>
