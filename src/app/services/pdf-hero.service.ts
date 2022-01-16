import { jsPDF } from 'jspdf';
import { Injectable } from '@angular/core';
import { Attachment, Usuario } from '../models/usuario.interface';
import { Agressor } from '../models/agressor.interface';
import { Juiz } from '../models/Juiz.interface';
import { UserService } from './user.service';
import { Documento } from '../models/documento.interface';

interface HtmlStyles {
  'font-size'?: string;
  'font-family'?: string;
  'font-style'?: 'italic' | 'normal';
  'color'?: string;
  'margin'?: string; 
  'margin-bottom'?: string;
  'margin-left'?: string;
  'text-align'?: 'center' | 'left' | 'right' | 'initial' | 'justify' | 'unset';
  'vertical-align'?: 'sub' | 'baseline' | 'initial' | 'unset';
}

type HtmlTag = 'h2' | 'h4' | 'span' | 'p' | 'div' | 'ul' | 'ol' | 'li';

interface HtmlOptions {
  tag: HtmlTag;
  parentTag?: HtmlTag;
  parentStyle?: HtmlStyles;
  indent?: string;
  break?: number;
  styles?: HtmlStyles;
  openingTag?: boolean;
  closingTag?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PdfHeroService {
  private globalStyle: HtmlStyles = {
    "color": '#000',
    "text-align": 'justify',
    "margin": '0px'
  };
  constructor(private userService: UserService) { }

  private getBreaks(breaks: number): string {
    if (breaks === 0) { return null; }
    let br = '<br>';
    for (let i = 1; i <= breaks - 1; i++) {
      br += br;
    }
    return br;
  }

  private getDeficiencias(deficiencias: string[]): string {
    if (!deficiencias || deficiencias.length === 0) { return null; }
    if (deficiencias.length === 1) { return deficiencias[0]; }
    if (deficiencias.length === 2) { return deficiencias[0] + ' e ' + deficiencias[1]; }
    const lastElement = deficiencias.splice(deficiencias.length - 1, 1);
    return deficiencias.join(', ') + ' e ' + lastElement[0];
  }

  private getViolenciasSofridas(usuario: Usuario): string {
    let violencias = '';
    const violenciasFisicas = usuario.violenciasFisicasSofridas;
    if (usuario.violenciaFisica) {
      violencias += 'VIOLÊNCIA FÍSICA, com ';
    }
    if (violenciasFisicas && violenciasFisicas.length > 0) {
      violencias += violenciasFisicas.join('/');
    }
    if (usuario.violenciaMoral) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA MORAL';
    }
    if (usuario.violenciaPatrimonial) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA PATRIMONIAL';
    }
    if (usuario.violenciaPsicologica) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA PSICOLÓGICA';
    }
    if (usuario.violenciaSexual) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA SEXUAL';
    }
    violencias += '.';
    return violencias;
  }

  private getJuizViolenciasSofridas(juiz: Juiz): string {
    let violencias = '';
    const violenciasFisicas = juiz.violenciasFisicasSofridas;
    if (juiz.violenciasSofridas.violenciaFisica) {
      violencias += 'VIOLÊNCIA FÍSICA, com ';
    }
    if (violenciasFisicas && violenciasFisicas.length > 0) {
      violencias += violenciasFisicas.join('/');
    }
    if (juiz.violenciasSofridas.violenciaMoral) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA MORAL';
    }
    if (juiz.violenciasSofridas.violenciaPatrimonial) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA PATRIMONIAL';
    }
    if (juiz.violenciasSofridas.violenciaPsicologica) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA PSICOLÓGICA';
    }
    if (juiz.violenciasSofridas.violenciaSexual) {
      violencias += violencias !== '' ? ';' : '' + 'VIOLÊNCIA SEXUAL';
    }
    violencias += '.';
    return violencias
  }

  private getComportamentosAgressor(agressor: Agressor): string {
    if (!agressor.agressivo && !agressor.ciumento && !agressor.controlador) { return null; }
    const comportamentos = [];
    if (agressor.agressivo) {
      comportamentos.push('violento');
    }
    if (agressor.ciumento) {
      comportamentos.push('ciúmes excessivos');
    }
    if (agressor.controlador) {
      comportamentos.push('controlador');
    }
    return `O(a) Requerido(a) possui comportamento ${comportamentos.join('/')} com a vítima ora requerente.`;
  }

  private getHabitosAgressor(agressor: Agressor): string {
    if (!agressor.crimeOrganizado && !agressor.usaAlcool && !agressor.usaDrogas) { return null; }
    const habitos = [];
    if (agressor.usaAlcool && agressor.usaDrogas) {
      habitos.push('faz uso de álcool e/ou drogas ilícitas');
    } else if (agressor.usaAlcool && !agressor.usaDrogas) {
      habitos.push('faz uso de álcool');
    } else if (!agressor.usaAlcool && agressor.usaDrogas) {
      habitos.push('faz uso de drogas ilícitas');
    }
    if (agressor.crimeOrganizado) {
      habitos.push('possui envolvimento com atividade criminosa');
    }
    return `O(a) Requerido(a) ${habitos.join('/')}.`;
  }

  private getMidiasAttached(midias: Attachment[], type: 'audio' | 'foto'): string {
    if (!midias || midias.length === 0) { return '(N)'; }
    const filePath = {
      audio: 'audios/relatos',
      foto: 'imagensAnexo'
    };
    return midias.filter(md => md.path.includes(filePath[type])).length > 0 ? '(S)' : '(N)';
  }

  private getMedidasAnteriores(usuario: Usuario): string {
    if (!usuario.solicitouAnteriores) {
      return 'este é o primeiro pedido de medida protetiva.';
    }
    if (usuario.solicitouAnteriores && usuario.medidasAnteriores) {
      return 'já solicitou medida protetiva anteriormente, a qual foi deferida.';
    }
    if (usuario.solicitouAnteriores && !usuario.medidasAnteriores) {
      return 'já solicitou medida protetiva anteriormente, a qual foi indeferida.';
    }
    return '';
  }

  private getMedidasConcedidas(medidasConcedidas: {[key: string]: {label: string, marked: boolean} | {[innerKey: string]: {label: string, marked: boolean}}}): string {
    let html = '';
    const keys = Object.keys(medidasConcedidas);
    for (const key of keys) {
      if (key === 'outrasMedidasDeferidas') {
        const innerKeys = Object.keys(medidasConcedidas[key]);
        for (const innerKey of innerKeys) {
          const outrasMedidas = medidasConcedidas[key][innerKey] as {label: string, marked: boolean};
          html += this.generateHtml(outrasMedidas.label, {tag: 'li', break: 2});
        }
        continue;
      }
      const medidaDeferida = medidasConcedidas[key] as {label: string, marked: boolean};
      if (medidaDeferida && medidaDeferida.marked) {
        html += this.generateHtml(medidaDeferida.label, {tag: 'li', break: 2});
      }
    }
    return html;
  }

  private getStyles(styles: HtmlStyles): string {
    let htmlStyles = '';
    for (const key of Object.keys(styles)) {
      htmlStyles += `${key}: ${styles[key]};`;
    }
    return htmlStyles;
  }

  private generateHtml(text: string, htmlOptions: HtmlOptions): string {
    const parentTag = htmlOptions.parentTag;
    const tag = htmlOptions.tag;
    const styles = htmlOptions.styles ? this.getStyles({ ...this.globalStyle, ...htmlOptions.styles }) : this.getStyles(this.globalStyle);
    if (htmlOptions.openingTag) {
      return `<${tag} style="${styles}">`;
    }
    if (htmlOptions.closingTag) {
      return `</${tag}>`;
    }
    const indent = htmlOptions.indent ? htmlOptions.indent : '';
    const breaks = htmlOptions.break ? this.getBreaks(htmlOptions.break) : null;
    const htmlText = `${indent}${text}`;
    const html = `<${tag} style="${styles}">${htmlText}</${tag}>`;
    return html + (breaks ? breaks : '');
  }

  public generateDocument(documento: Documento): string {
    let html: string = '';
    html += this.generateHtml('<b>MINUTA DE DECISÃO</b>', {tag: 'h4', break: 4, styles: {"font-size": '20px', "text-align": 'center'}});
    html += this.generateHtml('PROCESSO Nº ' + documento.numeroProcesso, {tag: 'h4', break: 2});
    html += this.generateHtml('CLASSE: Medidas protetivas de urgência (Lei Maria da Penha)', {tag: 'h4', break: 2});
    html += this.generateHtml('REQUERENTE: ' + documento.usuario.nomeCompleto, {tag: 'h4', break: 2});
    html += this.generateHtml('REQUERIDO: ' + documento.agressor.nomeCompleto, {tag: 'h4', break: 2});
    html += this.generateHtml('DECISÃO', {tag: 'h4', break: 2, styles: {"text-align": 'center'}});
    html += this.generateHtml('Vistos etc.', {tag: 'p', break: 2});
    html += this.generateHtml(`Trata-se de pedido de medida protetiva de urgência, formulado por Requerente ${documento.usuario.nomeCompleto} , em desfavor do Requerido  ${documento.agressor.nomeCompleto}, ambos qualificados nos autos. O pedido foi ajuizado pela pela própria Requente por meio do sistema virtual de atendimento a mulher vítima de violência doméstica – Maria da Penha Virtual.`, {tag: 'p', break: 2});
    if (this.getDeficiencias(documento.usuario.deficiencias)) {
      html += this.generateHtml(`Conforme narrado na inicial, a Requerente é pessoa com deficiência, acometida de ${this.getDeficiencias(documento.usuario.deficiencias)}`, {tag: 'p', break: 2});
    }
    if (documento.usuario.filhos && documento.usuario.filhos >= 1) {
      html += this.generateHtml(`A Requerente possui ${documento.usuario.filhos} com o Requerido.`, {tag: 'p', break: 2});
    }
    html += this.generateHtml(`O grau de relacionamento de ambos é ${documento.usuario.tipoRelacionamento}.`, {tag: 'p', break: 2});
    html += this.generateHtml('A Requerente afirma que sofreu:', {tag: 'p', break: 2});
    html += this.generateHtml(this.getViolenciasSofridas(documento.usuario), {tag: 'p', break: 2});
    html += this.generateHtml('Sobre o(a) Requerido(a), foi informado que:', {tag: 'p', break: 2});
    if (this.getComportamentosAgressor(documento.agressor)) {
      html += this.generateHtml(this.getComportamentosAgressor(documento.agressor), {tag: 'p', break: 2});
    }
    if (this.getHabitosAgressor(documento.agressor)) {
      html += this.generateHtml(this.getHabitosAgressor(documento.agressor), {tag: 'p', break: 2});
    }
    if (documento.usuario.relatoViolencia) {
      html += this.generateHtml('Como descrição dos fatos, a Requerente relata, in verbis:', {tag: 'p', break: 2});
      html += this.generateHtml(documento.usuario.relatoViolencia, {tag: 'p', break: 2});
    }
    html += this.generateHtml(`Juntada de áudio ${this.getMidiasAttached(documento.usuario.midias, 'audio')}`, {tag: 'p', break: 2});
    html += this.generateHtml(`Juntada de foto(s) ${this.getMidiasAttached(documento.usuario.midias, 'foto')}`, {tag: 'p', break: 2});
    html += this.generateHtml(`A Requerente informa que, em face deste requerido, ${this.getMedidasAnteriores(documento.usuario)}`, {tag: 'p', break: 2});
    html += this.generateHtml('Sem contestação (contraditório diferido).', {tag: 'p', break: 2});
    html += this.generateHtml('Vieram os autos conclusos.', {tag: 'p', break: 2});
    html += this.generateHtml('É o que importa relatar. Passo a decidir.', {tag: 'p', break: 2});
    html += this.generateHtml('A Constituição Federal, por seu § 8º do art. 226, impôs ao Estado o dever de assegurar a assistência à família na pessoa de cada um dos que a integram, impondo a criação de mecanismos para coibir a violência no âmbito de suas relações.', {tag: 'p', break: 2});
    html += this.generateHtml('A Lei n.º 11.340/06 estabelece mecanismos para coibir e prevenir a violência doméstica e familiar contra a mulher, concretizando mandamento constitucional:', {tag: 'p', break: 2});
    html += this.generateHtml(`<p>Art. 18. Recebido o expediente com o pedido da ofendida, caberá ao juiz, no prazo de 48 (quarenta e oito) horas:<br>I - conhecer do expediente e do pedido e decidir sobre as medidas protetivas de urgência;<br>II - determinar o encaminhamento da ofendida ao órgão de assistência judiciária, quando for o caso;<br>III - comunicar ao Ministério Público para que adote as providências cabíveis.<br>Art. 19. As medidas protetivas de urgência poderão ser concedidas pelo juiz, a requerimento do Ministério Público ou a pedido da ofendida.<br>§ 1o As medidas protetivas de urgência poderão ser concedidas de imediato, independentemente de audiência das partes e de manifestação do Ministério Público, devendo este ser prontamente comunicado.</p>`,
      {tag: 'p', styles: {"margin-left": '350px'}});
    html += this.generateHtml('Sendo medida de natureza cautelar preparatória ou incidental – cível ou criminal -, fazem-se necessários os requisitos do <b><i>fumus boni iuris</i></b> e do <b><i>periculum in mora</i></b>, principalmente para concessão de medidas <b><i>inaudita altera pars</i></b>.', {tag: 'p', break: 2});
    html += this.generateHtml('Cabe anotar que, em tais casos, a palavra da vítima, inexistindo qualquer outro elemento probatório elidindo o contrário, possui relevante valor probatório, sendo suficiente a respaldar <b><i>ab initio</i></b> a fumaça do bom direito.', {tag: 'p', break: 2});
    html += this.generateHtml('No caso dos autos, a narrativa indica gravidade da(s) ofensa(s) perpetrada(s) e foi corroborada pela prova juntada pela Requerente, sendo necessário destacar que:', {tag: 'p', break: 2});
    html += this.generateHtml(`I – há indícios de que o relato sobre a violência é ${documento.juiz && documento.juiz.riscoViolencia ? 'verossímil' : 'inverossímil'}`, {tag: 'p', break: 2});
    html += this.generateHtml(`II – o perfil do Requerido é ${documento.juiz && documento.juiz.perfilRequerido ? 'verossímil' : 'inverossímil'}`, {tag: 'p', break: 2});
    html += this.generateHtml('III - O exame da prova juntada é conclusivo sobre a necessidade de se deferir a medida protetiva de urgência, merecendo destaque a(s) seguinte(s) ocorrência(s):', {tag: 'p', break: 2});
    html += this.generateHtml(this.getJuizViolenciasSofridas(documento.juiz), {tag: 'p', break: 2});
    html += this.generateHtml('Ademais,', {tag: 'p', break: 2});
    html += this.generateHtml(documento.juiz.casoAutos, {tag: 'p', break: 2});
    if (documento.juiz.decisaoJuiz.decideNow) {
      html += this.generateHtml('Tem-se, assim, como razoável a imposição de medida(s) protetiva(s), antes mesmo da oitiva da parte contrária e de prévia manifestação do Ministério Público, para assegurar a integridade da requerente.', {tag: 'p', break: 2});
      html += this.generateHtml('Deve ser esclarecido, por fim, que esta medida se reveste de <b>caráter provisório</b>, podendo:', {tag: 'p', break: 2});
      html += this.generateHtml('A) ser revogada, se as circunstâncias assim o indicarem,', {tag: 'p', break: 2});
      html += this.generateHtml('ou;', {tag: 'p', break: 2});
      html += this.generateHtml('B) ser substituída por prisão preventiva, se as medidas não se revelarem suficientes ou não forem devidamente cumpridas.', {tag: 'p', break: 2});
      html += this.generateHtml('Reputo adequada(s) e necessária(s), nos termos do art. 282 do CPP c/c art. 22, II e III, “a” e “b” da Lei n.º 11.340/06, a(s) seguinte(s) medida(s), a(s) qual(is) fica(m) decretada(s):', {tag: 'p', break: 2});
      html += this.generateHtml(null, {tag: 'ol', openingTag: true});
      html += this.getMedidasConcedidas(documento.juiz.medidasDeferidas);
      html += this.generateHtml(null, {tag: 'ol', closingTag: true});
      html += this.generateHtml('Em face da urgência e como economia processual, serve a presente decisão como mandado, para intimação do requerido na forma da lei, advertindo-o expressamente de que o descumprimento das medidas poderá resultar na decretação de sua prisão preventiva, nos termos do art. 282, § 4º do CPP.', {tag: 'p', break: 2});
      html += this.generateHtml('Ciência da concessão da medida ao Ministério Público.', {tag: 'p', break: 2});
      html += this.generateHtml('Oficie-se a Delegacia de Polícia com atribuição, determinando a instauração de inquérito policial para apuração, em todos os termos, do(s) crime(s) eventualmente narrado(s) no campo DESCRIÇÃO DOS FATOS PELA VÍTIMA no EXTRATO de medida protetiva de urgência em anexo.', {tag: 'p', break: 2});
    }
    if (documento.juiz.decisaoJuiz.waitForContraditory) {
      html += this.generateHtml('Tem-se, assim, neste momento e com base na instrução processual, como NÃO RAZOÁVEL a imposição de medida(s) protetiva(s), antes da oitiva da parte contrária e de prévia manifestação do Ministério Público.', {tag: 'p', break: 2});
      html += this.generateHtml('PRECAUÇÃO – Por precaução, extingo o processo sem julgamento do mérito e <b>sem a intimação da parte Requerida</b>, uma vez que:', {tag: 'p', break: 2});
      html += this.generateHtml('a) da narração dos fatos não decorre logicamente a conclusão, existência de risco de violência/morte e necessidade de medida protetiva de urgência (art. 303, I, §6º, III, do CPC) c/c art. 10 da Lei n.º 12.016/09;', {tag: 'p', break: 2});
      html += this.generateHtml('b) ausência de interesse processual na medida.', {tag: 'p', break: 2});
      html += this.generateHtml('Ciência da não concessão da medida ao Ministério Público.', {tag: 'p', break: 2});
    }
    html += this.generateHtml('Expedientes necessários e urgentes.', {tag: 'p', break: 2});
    html += this.generateHtml('Fica a Diretora de Secretaria autorizada a subscrever os atos necessários para seu fiel cumprimento.', {tag: 'p', break: 2});
    html += this.generateHtml('Intimações e expedientes necessários.', {tag: 'p', break: 2});
    html += this.generateHtml('Cumpra-se.', {tag: 'p', break: 2});
    html += this.generateHtml(`${this.userService.getUserClaims.city}/${this.userService.getUserClaims.state}, ${new Date().toLocaleDateString('pt-br', {year: 'numeric', month: 'long', day: 'numeric'})}.`, {tag: 'p'});
    return html;
  }

  public async generateDecision(processo: number, html: HTMLElement) {
    const role = this.userService.getUserClaims.role;
    if (role === 'juiz' || role === 'direitoAgil') {
      const doc = new jsPDF({unit: 'pt', format: 'letter', precision: 100});
      await doc.html(html, {margin: [5, 5, 5, 5], x: 15, y: 15});
      doc.save(`Processo Nº ${processo}.pdf`);
    }
  }
}
