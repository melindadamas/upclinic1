/**
 * Serviço para gerenciamento de cupons promocionais do UpClinic
 */

import axios from 'axios';

// URL base da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Classe de serviço para cupons promocionais
 */
class CouponService {
  /**
   * Valida um cupom promocional
   * @param {string} couponCode - Código do cupom
   * @returns {Promise} - Promessa com os dados do cupom
   */
  async validateCoupon(couponCode) {
    try {
      const response = await axios.post(`${API_URL}/coupons/validate`, {
        code: couponCode
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
      throw new Error(error.response?.data?.message || 'Cupom inválido ou expirado');
    }
  }
  
  /**
   * Aplica um cupom a uma assinatura
   * @param {string} couponCode - Código do cupom
   * @param {string} subscriptionId - ID da assinatura
   * @returns {Promise} - Promessa com o resultado da aplicação
   */
  async applyCoupon(couponCode, subscriptionId) {
    try {
      const response = await axios.post(`${API_URL}/coupons/apply`, {
        code: couponCode,
        subscriptionId
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao aplicar cupom:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível aplicar o cupom');
    }
  }
  
  /**
   * Lista cupons disponíveis para o usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise} - Promessa com a lista de cupons
   */
  async listAvailableCoupons(userId) {
    try {
      const response = await axios.get(`${API_URL}/coupons/available`, {
        params: { userId }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao listar cupons disponíveis:', error);
      return [];
    }
  }
  
  /**
   * Cria um novo cupom (apenas para administradores)
   * @param {Object} couponData - Dados do cupom
   * @returns {Promise} - Promessa com o cupom criado
   */
  async createCoupon(couponData) {
    try {
      const response = await axios.post(`${API_URL}/admin/coupons`, couponData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao criar cupom:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível criar o cupom');
    }
  }
  
  /**
   * Lista todos os cupons (apenas para administradores)
   * @param {Object} filters - Filtros de busca
   * @returns {Promise} - Promessa com a lista de cupons
   */
  async listAllCoupons(filters = {}) {
    try {
      const response = await axios.get(`${API_URL}/admin/coupons`, {
        params: filters,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao listar cupons:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível listar os cupons');
    }
  }
  
  /**
   * Atualiza um cupom existente (apenas para administradores)
   * @param {string} couponId - ID do cupom
   * @param {Object} couponData - Novos dados do cupom
   * @returns {Promise} - Promessa com o cupom atualizado
   */
  async updateCoupon(couponId, couponData) {
    try {
      const response = await axios.put(`${API_URL}/admin/coupons/${couponId}`, couponData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar cupom:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível atualizar o cupom');
    }
  }
  
  /**
   * Desativa um cupom (apenas para administradores)
   * @param {string} couponId - ID do cupom
   * @returns {Promise} - Promessa com o resultado da desativação
   */
  async deactivateCoupon(couponId) {
    try {
      const response = await axios.put(`${API_URL}/admin/coupons/${couponId}/deactivate`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao desativar cupom:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível desativar o cupom');
    }
  }
  
  /**
   * Obtém relatório de uso de cupons (apenas para administradores)
   * @param {Object} filters - Filtros para o relatório
   * @returns {Promise} - Promessa com os dados do relatório
   */
  async getCouponUsageReport(filters = {}) {
    try {
      const response = await axios.get(`${API_URL}/admin/coupons/report`, {
        params: filters,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter relatório de cupons:', error);
      throw new Error(error.response?.data?.message || 'Não foi possível obter o relatório');
    }
  }
}

export default new CouponService();
