/**
 * Serviço de integração com Mercado Pago para o UpClinic
 * Implementa funcionalidades de assinatura, pagamento recorrente e períodos gratuitos
 */

import axios from 'axios';

// URL base da API
const API_URL = process.env.REACT_APP_MERCADOPAGO_API_URL || 'https://api.mercadopago.com';

/**
 * Classe de serviço para integração com Mercado Pago
 */
class MercadoPagoService {
  constructor() {
    this.accessToken = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;
    this.publicKey = process.env.REACT_APP_MERCADOPAGO_PUBLIC_KEY;
  }

  /**
   * Inicializa o SDK do Mercado Pago
   */
  initSDK() {
    if (window.MercadoPago) {
      return new window.MercadoPago(this.publicKey);
    } else {
      console.error('SDK do Mercado Pago não encontrado');
      return null;
    }
  }

  /**
   * Cria um plano de assinatura no Mercado Pago
   * @param {Object} planData - Dados do plano
   * @returns {Promise} - Promessa com os dados do plano criado
   */
  async createSubscriptionPlan(planData) {
    try {
      const response = await axios.post(`${API_URL}/preapproval_plan`, planData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao criar plano de assinatura:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível criar o plano de assinatura');
    }
  }
  
  /**
   * Cria uma assinatura para um usuário
   * @param {Object} subscriptionData - Dados da assinatura
   * @returns {Promise} - Promessa com os dados da assinatura criada
   */
  async createSubscription(subscriptionData) {
    try {
      const response = await axios.post(`${API_URL}/preapproval`, subscriptionData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao criar assinatura:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível criar a assinatura');
    }
  }
  
  /**
   * Cria um token de cartão de crédito
   * @param {Object} cardData - Dados do cartão
   * @returns {Promise} - Promessa com o token do cartão
   */
  async createCardToken(cardData) {
    const mp = this.initSDK();
    if (!mp) {
      throw new Error('SDK do Mercado Pago não inicializado');
    }
    
    try {
      const cardToken = await mp.createCardToken({
        cardNumber: cardData.cardNumber,
        cardholderName: cardData.cardholderName,
        cardExpirationMonth: cardData.expirationMonth,
        cardExpirationYear: cardData.expirationYear,
        securityCode: cardData.securityCode
      });
      
      return cardToken.id;
    } catch (error) {
      console.error('Erro ao criar token de cartão:', error);
      throw new Error('Não foi possível processar os dados do cartão');
    }
  }
  
  /**
   * Obtém detalhes de uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com os detalhes da assinatura
   */
  async getSubscription(subscriptionId) {
    try {
      const response = await axios.get(`${API_URL}/preapproval/${subscriptionId}`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter detalhes da assinatura:', error);
      throw new Error('Não foi possível obter os detalhes da assinatura');
    }
  }
  
  /**
   * Cancela uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com o resultado do cancelamento
   */
  async cancelSubscription(subscriptionId) {
    try {
      const response = await axios.put(`${API_URL}/preapproval/${subscriptionId}`, {
        status: 'cancelled'
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      throw new Error('Não foi possível cancelar a assinatura');
    }
  }
  
  /**
   * Pausa uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com o resultado da pausa
   */
  async pauseSubscription(subscriptionId) {
    try {
      const response = await axios.put(`${API_URL}/preapproval/${subscriptionId}`, {
        status: 'paused'
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao pausar assinatura:', error);
      throw new Error('Não foi possível pausar a assinatura');
    }
  }
  
  /**
   * Reativa uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com o resultado da reativação
   */
  async reactivateSubscription(subscriptionId) {
    try {
      const response = await axios.put(`${API_URL}/preapproval/${subscriptionId}`, {
        status: 'authorized'
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao reativar assinatura:', error);
      throw new Error('Não foi possível reativar a assinatura');
    }
  }
  
  /**
   * Atualiza uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @param {Object} updateData - Dados para atualização
   * @returns {Promise} - Promessa com os dados atualizados
   */
  async updateSubscription(subscriptionId, updateData) {
    try {
      const response = await axios.put(`${API_URL}/preapproval/${subscriptionId}`, updateData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar assinatura:', error);
      throw new Error('Não foi possível atualizar a assinatura');
    }
  }
  
  /**
   * Lista pagamentos de uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com a lista de pagamentos
   */
  async getSubscriptionPayments(subscriptionId) {
    try {
      const response = await axios.get(`${API_URL}/preapproval/${subscriptionId}/payments`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao listar pagamentos da assinatura:', error);
      throw new Error('Não foi possível listar os pagamentos da assinatura');
    }
  }
  
  /**
   * Cria um plano com período gratuito
   * @param {Object} planData - Dados do plano
   * @param {number} freePeriodMonths - Duração do período gratuito em meses
   * @returns {Promise} - Promessa com os dados do plano criado
   */
  async createPlanWithFreeTrial(planData, freePeriodMonths) {
    try {
      const planWithTrial = {
        ...planData,
        auto_recurring: {
          ...planData.auto_recurring,
          free_trial: {
            frequency: freePeriodMonths,
            frequency_type: "months"
          }
        }
      };
      
      return await this.createSubscriptionPlan(planWithTrial);
    } catch (error) {
      console.error('Erro ao criar plano com período gratuito:', error);
      throw new Error('Não foi possível criar o plano com período gratuito');
    }
  }
  
  /**
   * Cria uma assinatura com cupom promocional
   * @param {Object} subscriptionData - Dados da assinatura
   * @param {Object} couponData - Dados do cupom
   * @returns {Promise} - Promessa com os dados da assinatura criada
   */
  async createSubscriptionWithCoupon(subscriptionData, couponData) {
    try {
      // Calcular data de início da cobrança após período gratuito
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + couponData.freePeriod);
      
      const subscriptionWithCoupon = {
        ...subscriptionData,
        auto_recurring: {
          ...subscriptionData.auto_recurring,
          start_date: endDate.toISOString()
        }
      };
      
      return await this.createSubscription(subscriptionWithCoupon);
    } catch (error) {
      console.error('Erro ao criar assinatura com cupom:', error);
      throw new Error('Não foi possível criar a assinatura com cupom promocional');
    }
  }
  
  /**
   * Processa webhook do Mercado Pago
   * @param {Object} webhookData - Dados do webhook
   * @returns {Object} - Dados processados do webhook
   */
  processWebhook(webhookData) {
    try {
      const { action, data } = webhookData;
      
      // Processar diferentes tipos de eventos
      switch (action) {
        case 'preapproval.created':
          return {
            type: 'subscription_created',
            subscriptionId: data.id
          };
          
        case 'preapproval.updated':
          return {
            type: 'subscription_updated',
            subscriptionId: data.id,
            status: data.status
          };
          
        case 'preapproval.paused':
          return {
            type: 'subscription_paused',
            subscriptionId: data.id
          };
          
        case 'preapproval.cancelled':
          return {
            type: 'subscription_cancelled',
            subscriptionId: data.id
          };
          
        case 'payment.created':
        case 'payment.updated':
          return {
            type: 'payment_update',
            paymentId: data.id,
            status: data.status
          };
          
        default:
          return {
            type: 'unknown',
            data: webhookData
          };
      }
    } catch (error) {
      console.error('Erro ao processar webhook:', error);
      throw new Error('Não foi possível processar o webhook');
    }
  }
  
  /**
   * Cria planos padrão do UpClinic no Mercado Pago
   * @returns {Promise} - Promessa com os IDs dos planos criados
   */
  async createDefaultPlans() {
    try {
      // Plano Plus
      const plusPlanMonthly = await this.createSubscriptionPlan({
        reason: "UpClinic Plus Mensal",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 15,
          currency_id: "BRL"
        }
      });
      
      const plusPlanAnnual = await this.createSubscriptionPlan({
        reason: "UpClinic Plus Anual",
        auto_recurring: {
          frequency: 12,
          frequency_type: "months",
          transaction_amount: 180,
          currency_id: "BRL"
        }
      });
      
      // Plano Pro
      const proPlanMonthly = await this.createSubscriptionPlan({
        reason: "UpClinic Pro Mensal",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 35,
          currency_id: "BRL"
        }
      });
      
      const proPlanAnnual = await this.createSubscriptionPlan({
        reason: "UpClinic Pro Anual",
        auto_recurring: {
          frequency: 12,
          frequency_type: "months",
          transaction_amount: 420,
          currency_id: "BRL"
        }
      });
      
      // Plano Master
      const masterPlanMonthly = await this.createSubscriptionPlan({
        reason: "UpClinic Master Mensal",
        auto_recurring: {
          frequency: 1,
          frequency_type: "months",
          transaction_amount: 45,
          currency_id: "BRL"
        }
      });
      
      const masterPlanAnnual = await this.createSubscriptionPlan({
        reason: "UpClinic Master Anual",
        auto_recurring: {
          frequency: 12,
          frequency_type: "months",
          transaction_amount: 540,
          currency_id: "BRL"
        }
      });
      
      return {
        plus: {
          monthly: plusPlanMonthly.id,
          annual: plusPlanAnnual.id
        },
        pro: {
          monthly: proPlanMonthly.id,
          annual: proPlanAnnual.id
        },
        master: {
          monthly: masterPlanMonthly.id,
          annual: masterPlanAnnual.id
        }
      };
    } catch (error) {
      console.error('Erro ao criar planos padrão:', error);
      throw new Error('Não foi possível criar os planos padrão');
    }
  }
}

export default new MercadoPagoService();
