/**
 * Serviço de integração com PagSeguro para processamento de pagamentos
 * e gerenciamento de assinaturas do UpClinic
 */

import axios from 'axios';

// Configurações do PagSeguro
const API_URL = process.env.REACT_APP_PAGSEGURO_API_URL || 'https://sandbox.api.pagseguro.com';
const API_KEY = process.env.REACT_APP_PAGSEGURO_API_KEY;

// Headers padrão para requisições
const getHeaders = () => ({
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'x-api-version': '4.0'
});

/**
 * Classe de serviço para integração com PagSeguro
 */
class PagSeguroService {
  /**
   * Cria uma nova assinatura (plano recorrente)
   * @param {Object} subscriptionData - Dados da assinatura
   * @returns {Promise} - Promessa com resultado da criação da assinatura
   */
  async createSubscription(subscriptionData) {
    try {
      const { plan, customer, paymentMethod, billingType, discountProgression } = subscriptionData;
      
      // Formata os dados para o padrão do PagSeguro
      const payload = {
        plan: {
          id: plan.id,
          name: plan.name,
          amount: plan.amount,
          frequency: billingType === 'annual' ? 'YEARLY' : 'MONTHLY',
        },
        customer: {
          name: customer.name,
          email: customer.email,
          tax_id: customer.document, // CPF/CNPJ
          phone: customer.phone
        },
        payment_method: this._formatPaymentMethod(paymentMethod),
        discount_progression: this._formatDiscountProgression(discountProgression, billingType)
      };
      
      const response = await axios.post(
        `${API_URL}/subscriptions`,
        payload,
        { headers: getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao criar assinatura no PagSeguro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao processar pagamento');
    }
  }
  
  /**
   * Cria um teste gratuito (trial) para o plano Plus
   * @param {Object} trialData - Dados do período de teste
   * @returns {Promise} - Promessa com resultado da criação do teste
   */
  async createFreeTrial(trialData) {
    try {
      const { customer, planId } = trialData;
      
      // Formata os dados para o padrão do PagSeguro
      const payload = {
        plan_id: planId,
        customer: {
          name: customer.name,
          email: customer.email,
          tax_id: customer.document, // CPF/CNPJ
          phone: customer.phone
        },
        trial_period: {
          days: 7, // 7 dias de teste gratuito
          enabled: true
        }
      };
      
      const response = await axios.post(
        `${API_URL}/subscriptions/trial`,
        payload,
        { headers: getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao criar período de teste no PagSeguro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao criar período de teste');
    }
  }
  
  /**
   * Consulta o status de uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com dados da assinatura
   */
  async getSubscriptionStatus(subscriptionId) {
    try {
      const response = await axios.get(
        `${API_URL}/subscriptions/${subscriptionId}`,
        { headers: getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao consultar assinatura no PagSeguro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao consultar assinatura');
    }
  }
  
  /**
   * Cancela uma assinatura existente
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com resultado do cancelamento
   */
  async cancelSubscription(subscriptionId) {
    try {
      const response = await axios.put(
        `${API_URL}/subscriptions/${subscriptionId}/cancel`,
        {},
        { headers: getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao cancelar assinatura no PagSeguro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao cancelar assinatura');
    }
  }
  
  /**
   * Atualiza o método de pagamento de uma assinatura
   * @param {string} subscriptionId - ID da assinatura
   * @param {Object} paymentMethod - Novo método de pagamento
   * @returns {Promise} - Promessa com resultado da atualização
   */
  async updatePaymentMethod(subscriptionId, paymentMethod) {
    try {
      const payload = this._formatPaymentMethod(paymentMethod);
      
      const response = await axios.put(
        `${API_URL}/subscriptions/${subscriptionId}/payment-method`,
        payload,
        { headers: getHeaders() }
      );
      
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar método de pagamento no PagSeguro:', error);
      throw new Error(error.response?.data?.message || 'Erro ao atualizar método de pagamento');
    }
  }
  
  /**
   * Formata o método de pagamento para o padrão do PagSeguro
   * @param {Object} paymentMethod - Dados do método de pagamento
   * @returns {Object} - Método de pagamento formatado
   * @private
   */
  _formatPaymentMethod(paymentMethod) {
    switch (paymentMethod.type) {
      case 'credit':
        return {
          type: 'CREDIT_CARD',
          card: {
            number: paymentMethod.cardNumber.replace(/\s/g, ''),
            exp_month: paymentMethod.cardExpiry.split('/')[0],
            exp_year: `20${paymentMethod.cardExpiry.split('/')[1]}`,
            security_code: paymentMethod.cardCVV,
            holder: {
              name: paymentMethod.cardName
            }
          }
        };
        
      case 'boleto':
        return {
          type: 'BOLETO'
        };
        
      case 'pix':
        return {
          type: 'PIX'
        };
        
      default:
        throw new Error('Método de pagamento não suportado');
    }
  }
  
  /**
   * Formata a progressão de descontos para o padrão do PagSeguro
   * @param {Object} discountProgression - Configuração de descontos progressivos
   * @param {string} billingType - Tipo de cobrança (mensal ou anual)
   * @returns {Array} - Array de descontos formatados
   * @private
   */
  _formatDiscountProgression(discountProgression, billingType) {
    if (!discountProgression) return [];
    
    if (billingType === 'monthly') {
      // Descontos para plano mensal
      return [
        { cycles: 1, value: discountProgression.firstMonth, type: 'PERCENTAGE' },  // 1º mês: 100% (grátis)
        { cycles: 1, value: discountProgression.secondMonth, type: 'PERCENTAGE' }, // 2º mês: 75% de desconto
        { cycles: 1, value: discountProgression.thirdMonth, type: 'PERCENTAGE' },  // 3º mês: 50% de desconto
        { cycles: 1, value: discountProgression.fourthMonth, type: 'PERCENTAGE' }  // 4º mês: 25% de desconto
      ];
    } else {
      // Descontos para plano anual
      return [
        { cycles: 1, value: discountProgression.firstMonth, type: 'PERCENTAGE' },  // 1º mês: 100% (grátis)
        { cycles: 1, value: discountProgression.secondMonth, type: 'PERCENTAGE' }, // 2º mês: 25% do valor
        { cycles: 1, value: discountProgression.thirdMonth, type: 'PERCENTAGE' },  // 3º mês: 50% do valor
        { cycles: 1, value: discountProgression.fourthMonth, type: 'PERCENTAGE' }, // 4º mês: 75% do valor
        { cycles: 1, value: discountProgression.fifthMonth, type: 'PERCENTAGE' }   // 5º mês: 85% do valor
      ];
    }
  }
  
  /**
   * Processa webhook de notificação do PagSeguro
   * @param {Object} notification - Dados da notificação
   * @returns {Object} - Dados processados da notificação
   */
  processWebhookNotification(notification) {
    try {
      const { event, data } = notification;
      
      // Mapeia eventos do PagSeguro para ações no sistema
      switch (event) {
        case 'SUBSCRIPTION.CREATED':
          return {
            type: 'subscription_created',
            subscriptionId: data.id,
            status: data.status,
            customer: data.customer
          };
          
        case 'SUBSCRIPTION.UPDATED':
          return {
            type: 'subscription_updated',
            subscriptionId: data.id,
            status: data.status,
            updatedFields: data.changed_fields
          };
          
        case 'SUBSCRIPTION.CANCELLED':
          return {
            type: 'subscription_cancelled',
            subscriptionId: data.id,
            cancellationDate: data.cancellation_date
          };
          
        case 'PAYMENT.SUCCEEDED':
          return {
            type: 'payment_succeeded',
            subscriptionId: data.subscription_id,
            paymentId: data.id,
            amount: data.amount,
            paymentDate: data.payment_date
          };
          
        case 'PAYMENT.FAILED':
          return {
            type: 'payment_failed',
            subscriptionId: data.subscription_id,
            paymentId: data.id,
            failureReason: data.failure_reason
          };
          
        default:
          return {
            type: 'unknown',
            rawData: notification
          };
      }
    } catch (error) {
      console.error('Erro ao processar notificação do PagSeguro:', error);
      throw new Error('Erro ao processar notificação');
    }
  }
}

export default new PagSeguroService();
