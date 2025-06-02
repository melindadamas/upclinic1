/**
 * Serviço para gerenciamento do manual digital integrado do UpClinic
 */

import axios from 'axios';

// URL base da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

/**
 * Classe de serviço para o manual digital
 */
class ManualService {
  /**
   * Obtém o conteúdo completo do manual digital
   * @param {string} userPlan - Plano do usuário (plus, pro, master)
   * @returns {Promise} - Promessa com o conteúdo do manual
   */
  async getManualContent(userPlan) {
    try {
      const response = await axios.get(`${API_URL}/manual`, {
        params: { plan: userPlan }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter conteúdo do manual:', error);
      throw new Error('Não foi possível carregar o manual digital');
    }
  }
  
  /**
   * Obtém uma seção específica do manual
   * @param {string} sectionId - ID da seção
   * @param {string} userPlan - Plano do usuário (plus, pro, master)
   * @returns {Promise} - Promessa com o conteúdo da seção
   */
  async getManualSection(sectionId, userPlan) {
    try {
      const response = await axios.get(`${API_URL}/manual/sections/${sectionId}`, {
        params: { plan: userPlan }
      });
      
      return response.data;
    } catch (error) {
      console.error(`Erro ao obter seção ${sectionId} do manual:`, error);
      throw new Error('Não foi possível carregar esta seção do manual');
    }
  }
  
  /**
   * Obtém a estrutura do manual (índice)
   * @param {string} userPlan - Plano do usuário (plus, pro, master)
   * @returns {Promise} - Promessa com a estrutura do manual
   */
  async getManualStructure(userPlan) {
    try {
      const response = await axios.get(`${API_URL}/manual/structure`, {
        params: { plan: userPlan }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter estrutura do manual:', error);
      throw new Error('Não foi possível carregar o índice do manual');
    }
  }
  
  /**
   * Busca no conteúdo do manual
   * @param {string} query - Termo de busca
   * @param {string} userPlan - Plano do usuário (plus, pro, master)
   * @returns {Promise} - Promessa com os resultados da busca
   */
  async searchManual(query, userPlan) {
    try {
      const response = await axios.get(`${API_URL}/manual/search`, {
        params: { 
          query,
          plan: userPlan
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar no manual:', error);
      throw new Error('Não foi possível realizar a busca no manual');
    }
  }
  
  /**
   * Marca uma seção como lida pelo usuário
   * @param {string} sectionId - ID da seção
   * @param {string} userId - ID do usuário
   * @returns {Promise} - Promessa com o resultado da operação
   */
  async markSectionAsRead(sectionId, userId) {
    try {
      const response = await axios.post(`${API_URL}/manual/read`, {
        sectionId,
        userId
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao marcar seção como lida:', error);
      // Falha silenciosa para não interromper a experiência do usuário
      return { success: false };
    }
  }
  
  /**
   * Obtém o progresso de leitura do usuário
   * @param {string} userId - ID do usuário
   * @returns {Promise} - Promessa com o progresso de leitura
   */
  async getUserProgress(userId) {
    try {
      const response = await axios.get(`${API_URL}/manual/progress/${userId}`);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter progresso do usuário:', error);
      return { progress: 0, sectionsRead: [] };
    }
  }
  
  /**
   * Obtém os vídeos tutoriais relacionados a uma seção
   * @param {string} sectionId - ID da seção
   * @returns {Promise} - Promessa com os vídeos tutoriais
   */
  async getSectionVideos(sectionId) {
    try {
      const response = await axios.get(`${API_URL}/manual/videos/${sectionId}`);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter vídeos da seção:', error);
      return [];
    }
  }
  
  /**
   * Fornece o conteúdo do manual offline para uso sem internet
   * @param {string} userPlan - Plano do usuário (plus, pro, master)
   * @returns {Promise} - Promessa com o conteúdo offline do manual
   */
  async getOfflineManualContent(userPlan) {
    try {
      const response = await axios.get(`${API_URL}/manual/offline`, {
        params: { plan: userPlan }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao obter conteúdo offline do manual:', error);
      throw new Error('Não foi possível preparar o manual para uso offline');
    }
  }
  
  /**
   * Envia feedback sobre uma seção do manual
   * @param {Object} feedback - Dados do feedback
   * @returns {Promise} - Promessa com o resultado do envio
   */
  async sendFeedback(feedback) {
    try {
      const response = await axios.post(`${API_URL}/manual/feedback`, feedback);
      
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      throw new Error('Não foi possível enviar seu feedback');
    }
  }
}

export default new ManualService();
