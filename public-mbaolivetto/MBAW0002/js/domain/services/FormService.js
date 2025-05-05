export class FormService {
  static async submitForm(data) {
    try {
      // const rota1 = 'http://localhost:5678/webhook/minha-rota';
      const rota2 = 'https://n8n-prd.ogrupoprimo.com/webhook/LancamentosLeadCapture';
      
      const response = await fetch( rota2, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Formulário enviado com sucesso');
        window.location.href = data.RedirectUrl;
      } else {
        console.error('Erro ao enviar o formulário:', response.statusText);
        FormService.showErrorMessage('Erro ao enviar o formulário. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      FormService.showErrorMessage('Erro de conexão. Verifique sua internet e tente novamente.');
    }
  }

  static showErrorMessage(message) {
    const formFailDiv = document.querySelector('.w-form-fail');
    if (formFailDiv) {
      formFailDiv.style.display = 'block';
      formFailDiv.textContent = message;
    }
  }
}