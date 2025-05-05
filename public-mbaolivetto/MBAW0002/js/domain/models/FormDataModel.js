export class FormDataModel {
  constructor(formData) {
    const urlParams = new URLSearchParams(window.location.search);

    // Captura os parâmetros adicionais da URL
    const email = formData.get('email') || urlParams.get('email') || '';
    const utm_source = urlParams.get('utm_source') || '';
    const utm_campaign = urlParams.get('utm_campaign') || '';
    const utm_medium = urlParams.get('utm_medium') || '';
    const utm_content = urlParams.get('utm_content') || '';
    const utm_term = urlParams.get('utm_term') || '';
    const pmp = urlParams.get('pmp') || '';
    const sck = urlParams.get('sck') || '';
    const src = urlParams.get('src') || '';

    // Codifica o e-mail em Base64
    const encodedEmail = email ? btoa(email) : '';

    // Define os campos do modelo
    this.sobrenome = formData.get('name') || '';
    this.phone_number = formData.get('phone') || '';
    this.email = email;
    this.mkt_id = '';
    this.bu = 'MBA';
    this.Campaign = 'MBAW0002_Lista_Espera';
    this.locale = 'br';
    this.pmp = pmp ? pmp : 'MBA-LEX-HOME-LNK-BSOP-20230928-ORG-MBAW0002-MBAWO-VENDAS';

    // Concatena os parâmetros no RedirectUrl
    this.RedirectUrl = `./espera-obrigado.html?email=${encodedEmail}&utm_source=${encodeURIComponent(utm_source)}&utm_campaign=${encodeURIComponent(utm_campaign)}&utm_medium=${encodeURIComponent(utm_medium)}&utm_content=${encodeURIComponent(utm_content)}&utm_term=${encodeURIComponent(utm_term)}&pmp=${encodeURIComponent(this.pmp)}&sck=${encodeURIComponent(sck)}&src=${encodeURIComponent(src)}`;
  }
}