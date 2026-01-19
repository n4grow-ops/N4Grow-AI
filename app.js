/**
 * Portal de Recrutamento N4G - Lógica Core
 * Desenvolvido por Antigravity (Senior Fullstack & UI Designer)
 */

// --- CONFIGURAÇÃO DAS VAGAS E REGRAS ---
const ROLES_CONFIG = {
    back_end: {
        title: "Programador Back-end",
        sections: [
            {
                name: "Comportamental",
                questions: [
                    { id: "q7", type: "radio", label: "7. Se pegar uma tarefa que você não sabe fazer, o que faz primeiro?", options: ["Pesquiso e testo", "Pergunto direto", "Evito pegar"], required: true },
                    { id: "q8", type: "radio", label: "8. O que você prioriza?", options: ["Código perfeito", "Entregar funcionando", "Os dois, priorizando entrega"], required: true }
                ]
            },
            {
                name: "Técnico — Back-end",
                questions: [
                    { id: "q9", type: "radio", label: "9. Linguagem back-end", options: ["PHP", "Node.js", "Python", "Java", "Outra"], hasOther: true, required: true },
                    { id: "q10", type: "radio", label: "10. Já desenvolveu API?", options: ["Sim", "Não"], required: true },
                    { id: "q11", type: "short", label: "11. Para que serve uma API?", placeholder: "Explique brevemente...", required: true },
                    { id: "q12", type: "radio", label: "12. Como armazenaria senha de usuário?", options: ["Texto puro", "Hash", "Banco sem criptografia"], required: true },
                    { id: "q13", type: "radio", label: "13. Usa Git no dia a dia?", options: ["Sim", "Não"], required: true }
                ]
            }
        ],
        rejectionRules: (ans) => {
            const reasons = [];
            if (ans.q12 === "Texto puro") reasons.push("Riscos de segurança: Armazenamento de senha em texto puro.");
            if (ans.q13 === "Não") reasons.push("Conhecimento necessário: Uso obrigatório de Git.");
            return reasons;
        }
    },
    fullstack: {
        title: "Programador Fullstack",
        sections: [
            {
                name: "Comportamental",
                questions: [
                    { id: "q7", type: "radio", label: "7. Como você prefere trabalhar?", options: ["Tarefas bem definidas", "Autonomia", "Depende do projeto"], required: true },
                    { id: "q8", type: "short", label: "8. Se algo quebra em produção, o que você faz primeiro?", required: true }
                ]
            },
            {
                name: "Técnico — Back-end",
                questions: [
                    { id: "q9", type: "radio", label: "9. Linguagem principal", options: ["PHP", "Node.js", "Python", "Java"], required: true },
                    { id: "q10", type: "radio", label: "10. Já criou API?", options: ["Sim", "Não"], required: true },
                    { id: "q11", type: "short", label: "11. O que é uma API?", required: true },
                    { id: "q12", type: "radio", label: "12. Como armazena senha?", options: ["Texto puro", "Hash"], required: true }
                ]
            },
            {
                name: "Técnico — Front-end",
                questions: [
                    { id: "q13", type: "radio", label: "13. Framework front-end", options: ["React", "Vue", "Angular", "Outro"], hasOther: true, required: true },
                    { id: "q14", type: "short", label: "14. O que é state?", required: true },
                    { id: "q15", type: "short", label: "15. Como o front-end consome uma API?", required: true }
                ]
            },
            {
                name: "Base Geral",
                questions: [
                    { id: "q16", type: "radio", label: "16. Usa Git no dia a dia?", options: ["Sim", "Não"], required: true }
                ]
            }
        ],
        rejectionRules: (ans) => {
            const reasons = [];
            if (ans.q12 === "Texto puro") reasons.push("Segurança: Armazenamento de senha inseguro.");
            if (ans.q16 === "Não") reasons.push("Processos: Necessário domínio de Git.");
            if (!ans.q11 || ans.q11.length < 5) reasons.push("Conhecimento: Resposta sobre API insuficiente.");
            return reasons;
        }
    },
    banco_dados: {
        title: "Programador Banco de Dados",
        sections: [
            {
                name: "Comportamental",
                questions: [
                    { id: "q7", type: "short", label: "7. Antes de rodar UPDATE/DELETE em produção, o que você faz?", required: true },
                    { id: "q8", type: "radio", label: "8. Já lidou com erro crítico em banco?", options: ["Sim", "Não"], required: true }
                ]
            },
            {
                name: "Técnico — Banco de Dados",
                questions: [
                    { id: "q9", type: "radio", label: "9. Banco que domina", options: ["MySQL", "PostgreSQL", "Ambos"], required: true },
                    { id: "q10", type: "short", label: "10. Diferença entre PRIMARY KEY e FOREIGN KEY?", required: true },
                    { id: "q11", type: "short", label: "11. Quando usar INNER JOIN vs LEFT JOIN?", required: true },
                    { id: "q12", type: "short", label: "12. O que é índice e quando pode piorar performance?", required: true },
                    { id: "q13", type: "short", label: "13. Para que servem transações?", required: true }
                ]
            },
            {
                name: "Segurança e Performance",
                questions: [
                    { id: "q14", type: "short", label: "14. Como evitar perda de dados?", required: true }
                ]
            }
        ],
        rejectionRules: (ans) => {
            const reasons = [];
            if (!ans.q11 || ans.q11.length < 5) reasons.push("Conhecimento: Falta clareza sobre JOINs.");
            if (!ans.q14 || ans.q14.length < 5) reasons.push("Segurança: Falta estratégia de prevenção de perda de dados.");
            return reasons;
        }
    },
    ia_automacoes: {
        title: "Automações de IA",
        sections: [
            {
                name: "Comportamental",
                questions: [
                    { id: "q7", type: "radio", label: "7. Como você lida com tarefas vagas?", options: ["Organizo e valido requisitos crítico", "Prefiro instruções detalhadas", "Depende do projeto"], required: true },
                    { id: "q8", type: "short", label: "8. Exemplo de automação que você fez e o resultado", required: true }
                ]
            },
            {
                name: "Técnico — Automações",
                questions: [
                    { id: "q9", type: "radio", label: "9. Já criou automações Make/Zapier/n8n?", options: ["Sim", "Não"], required: true },
                    { id: "q10", type: "radio", label: "10. Ferramenta que domina", options: ["n8n", "Make", "Zapier", "Custom", "Outra"], hasOther: true, required: true },
                    { id: "q11", type: "radio", label: "11. Sabe integrar API REST e autenticação?", options: ["Sim", "Não"], required: true },
                    { id: "q12", type: "short", label: "12. O que é um Webhook?", required: true },
                    { id: "q13", type: "short", label: "13. Quando uma automação falha, o que você faz primeiro?", required: true },
                    { id: "q14", type: "radio", label: "14. Já trabalhou com LLM/ChatGPT via API/agentes?", options: ["Sim", "Não"], required: true },
                    { id: "q15", type: "short", label: "15. Cite um cuidado de segurança em automações", required: true }
                ]
            }
        ],
        rejectionRules: (ans) => {
            const reasons = [];
            if (ans.q9 === "Não") reasons.push("Experiência: Necessário experiência em ferramentas de automação.");
            if (!ans.q12 || ans.q12.length < 5) reasons.push("Conhecimento: Definição de Webhook insuficiente.");
            if (!ans.q13 || ans.q13.length < 5) reasons.push("Resolução: Falta plano de ação para falhas.");
            return reasons;
        }
    },
    gestor_trafego: {
        title: "Gestor de Tráfego",
        sections: [
            {
                name: "Comportamental",
                questions: [
                    { id: "q7", type: "radio", label: "7. Você é mais teste rápido ou planejamento detalhado?", options: ["Teste rápido", "Planejamento detalhado", "Equilíbrio"], required: true },
                    { id: "q8", type: "short", label: "8. Se uma campanha cai 40% do dia para noite, o que olha primeiro?", required: true }
                ]
            },
            {
                name: "Técnico — Tráfego",
                questions: [
                    { id: "q9", type: "radio", label: "9. Já gerenciou campanhas com verba real?", options: ["Sim", "Não"], required: true },
                    { id: "q10", type: "checkbox", label: "10. Plataformas que domina", options: ["Meta Ads", "Google Ads", "TikTok Ads", "YouTube Ads", "Outras"], hasOther: true, required: true },
                    { id: "q11", type: "short", label: "11. O que é CPA e ROAS?", required: true },
                    { id: "q12", type: "short", label: "12. O que configura primeiro para tracking?", required: true },
                    { id: "q13", type: "radio", label: "13. Sabe estrutura de campanhas?", options: ["Sim", "Não"], required: true },
                    { id: "q14", type: "short", label: "14. Cite 2 testes A/B que faria em uma oferta", required: true },
                    { id: "q15", type: "radio", label: "15. Já trabalhou com funil e landing page (CRO básico)?", options: ["Sim", "Não"], required: true }
                ]
            }
        ],
        rejectionRules: (ans) => {
            const reasons = [];
            if (ans.q9 === "Não") reasons.push("Experiência: Candidato não gerenciou verba real.");
            if (!ans.q11 || ans.q11.length < 5) reasons.push("Métricas: Definição de CPA/ROAS insuficiente.");
            if (!ans.q12 || ans.q12.length < 5) reasons.push("Tracking: Falta conhecimento em rastreamento.");
            return reasons;
        }
    },
    editor_video: {
        title: "Editor de Vídeos",
        sections: [
            {
                name: "Comportamental",
                questions: [
                    { id: "q7", type: "radio", label: "7. Prefere roteiro fechado ou liberdade criativa?", options: ["Roteiro fechado", "Liberdade criativa", "Depende"], required: true },
                    { id: "q8", type: "short", label: "8. Link de portfólio", required: true }
                ]
            },
            {
                name: "Técnico — Edição",
                questions: [
                    { id: "q9", type: "radio", label: "9. Software principal", options: ["Premiere", "CapCut", "DaVinci", "After Effects", "Final Cut", "Não uso nenhuma"], required: true },
                    { id: "q10", type: "checkbox", label: "10. Edita vídeos para", options: ["Reels/TikTok/Shorts", "YouTube longo", "VSL/Ads", "Podcast/cortes"], required: true },
                    { id: "q11", type: "short", label: "11. Descreva seu fluxo de edição em 3 passos", required: true },
                    { id: "q12", type: "group_radio", label: "12. Você sabe fazer:", items: ["Legendas dinâmicas", "Motion básico", "Tratamento de áudio"], options: ["Sim", "Não"], required: true },
                    { id: "q13", type: "short", label: "13. Qual padrão exporta para redes sociais?", required: true },
                    { id: "q14", type: "radio", label: "14. Consegue entregar 1 vídeo curto por dia?", options: ["Sim", "Não"], required: true },
                    { id: "q15", type: "short", label: "15. Como organiza arquivos/projeto para não perder mídia?", required: true }
                ]
            }
        ],
        reproduce_rules: (ans) => {
            const reasons = [];
            if (ans.q9 === "Não uso nenhuma") reasons.push("Software: Candidato não utiliza softwares de edição.");
            if (!ans.q11 || ans.q11.length < 5) reasons.push("Processo: Fluxo de edição não detalhado.");
            if (!ans.q13 || ans.q13.length < 5) reasons.push("Técnico: Padrão de exportação não especificado.");
            return reasons;
        }
    }
};

// --- ESTADO DA APLICAÇÃO ---
let state = {
    selectedRole: localStorage.getItem('selectedRole') || null,
    currentData: null,
    evaluation: null
};

// --- ELEMENTOS DOM ---
const mainContent = document.getElementById('mainContent');

// --- RENDERIZAÇÃO DE TELAS ---

/**
 * Tela 1: Portal de Seleção
 */
function renderPortal() {
    mainContent.style.opacity = '0';
    setTimeout(() => {
        mainContent.innerHTML = `
            <div class="fade-in">
                <h1 class="portal-title">Selecione a vaga para iniciar</h1>
                <div class="grid-portal">
                    ${Object.keys(ROLES_CONFIG).map(key => `
                        <button class="role-card" onclick="selectRole('${key}')" aria-label="Candidatar para ${ROLES_CONFIG[key].title}">
                            <h3>${ROLES_CONFIG[key].title}</h3>
                            <p>Clique para iniciar seu teste</p>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        mainContent.style.opacity = '1';
        localStorage.removeItem('selectedRole');
    }, 200);
}

/**
 * Seleciona uma vaga e muda para o formulário com transição fluida
 */
window.selectRole = (roleKey) => {
    mainContent.style.opacity = '0';
    setTimeout(() => {
        state.selectedRole = roleKey;
        localStorage.setItem('selectedRole', roleKey);
        renderForm();
        mainContent.style.opacity = '1';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
};

/**
 * Tela 2: Formulário Dinâmico
 */
function renderForm() {
    const role = ROLES_CONFIG[state.selectedRole];
    if (!role) return renderPortal();

    let html = `
        <div class="fade-in">
            <div class="form-header">
                <h2>Você escolheu: ${role.title}</h2>
                <button class="btn-secondary" onclick="renderPortal()">Trocar vaga</button>
            </div>
            <form id="recruitmentForm">
                <!-- Seção Dados Básicos -->
                <div class="form-section">
                    <h4>Dados Básicos</h4>
                    <div class="form-group">
                        <label for="fullName">Nome completo <span>*</span></label>
                        <input type="text" id="fullName" name="fullName" required>
                        <span class="error-msg" id="error-fullName">Campo obrigatório</span>
                    </div>
                    <div class="form-group">
                        <label for="whatsapp">WhatsApp (apenas números) <span>*</span></label>
                        <input type="tel" id="whatsapp" name="whatsapp" placeholder="(00) 00000-0000" required>
                        <span class="error-msg" id="error-whatsapp">Mínimo 10 dígitos</span>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input type="email" id="email" name="email">
                    </div>
                    <div class="form-group">
                        <label for="instagram">Instagram</label>
                        <input type="text" id="instagram" name="instagram">
                    </div>
                    <div class="form-group">
                        <label for="linkedin">LinkedIn</label>
                        <input type="text" id="linkedin" name="linkedin">
                    </div>
                    <div class="form-group">
                        <label>Idade <span>*</span></label>
                        <div class="radio-group">
                            <label class="radio-option"><input type="radio" name="age" value="Menos de 18" required> Menos de 18</label>
                            <label class="radio-option"><input type="radio" name="age" value="18 ou mais"> 18 ou mais</label>
                        </div>
                        <span class="error-msg" id="error-age">Selecione uma opção</span>
                    </div>
                </div>

                <!-- Seção Redes Sociais -->
                <div class="form-section">
                    <h4>Redes Sociais (Aviso)</h4>
                    <div class="form-group">
                        <label class="checkbox-option">
                            <input type="checkbox" name="socialConsent" required>
                            Minhas redes sociais podem estar abertas/públicas e autorizo a análise do perfil para fins de seleção.
                        </label>
                        <span class="error-msg" id="error-socialConsent">Você deve autorizar para prosseguir</span>
                    </div>
                </div>

                <!-- Seção Modelo de Trabalho -->
                <div class="form-section">
                    <h4>Modelo de Trabalho</h4>
                    <div class="form-group">
                        <label>Prestador de serviço (PJ/MEI)? <span>*</span></label>
                        <div class="radio-group">
                            <label class="radio-option"><input type="radio" name="workType" value="Já tenho MEI" required> Já tenho MEI</label>
                            <label class="radio-option"><input type="radio" name="workType" value="Posso abrir MEI"> Posso abrir MEI</label>
                            <label class="radio-option"><input type="radio" name="workType" value="Não posso"> Não posso</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Disponibilidade semanal <span>*</span></label>
                        <div class="radio-group">
                            <label class="radio-option"><input type="radio" name="availability" value="Até 10h" required> Até 10h</label>
                            <label class="radio-option"><input type="radio" name="availability" value="10–20h"> 10–20h</label>
                            <label class="radio-option"><input type="radio" name="availability" value="20–30h"> 20–30h</label>
                            <label class="radio-option"><input type="radio" name="availability" value="30h+"> 30h+</label>
                        </div>
                    </div>
                </div>

                <!-- Questões da Vaga -->
                ${role.sections.map(section => `
                    <div class="form-section">
                        <h4>${section.name}</h4>
                        ${section.questions.map(q => renderQuestion(q)).join('')}
                    </div>
                `).join('')}

                <button type="submit" class="btn-primary">Enviar Candidatura</button>
            </form>
        </div>
    `;
    mainContent.innerHTML = html;

    // Listener do Formulário
    const form = document.getElementById('recruitmentForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSubmit(form);
    });

    // Setup mobile-friendly touch handlers
    setupMobileInputHandlers();

    // Limpar erros ao digitar
    form.querySelectorAll('input, select, textarea').forEach(el => {
        el.addEventListener('input', () => {
            const errorSpan = document.getElementById(`error-${el.name}`);
            if (errorSpan) errorSpan.style.display = 'none';
        });
    });
}

function renderQuestion(q) {
    let content = `<div class="form-group" data-q-id="${q.id}">
        <label>${q.label} ${q.required ? '<span>*</span>' : ''}</label>`;

    if (q.type === 'radio') {
        content += `<div class="radio-group">${q.options.map(opt => `
            <label class="radio-option"><input type="radio" name="${q.id}" value="${opt}" ${q.required ? 'required' : ''}> ${opt}</label>
        `).join('')}</div>`;
        if (q.hasOther) content += `<input type="text" name="${q.id}_other" placeholder="Especifique..." style="display:none; margin-top:10px;">`;
    } else if (q.type === 'checkbox') {
        content += `<div class="checkbox-group">${q.options.map(opt => `
            <label class="checkbox-option"><input type="checkbox" name="${q.id}" value="${opt}"> ${opt}</label>
        `).join('')}</div>`;
        if (q.hasOther) content += `<input type="text" name="${q.id}_other" placeholder="Especifique..." style="display:none; margin-top:10px;">`;
    } else if (q.type === 'short') {
        content += `<textarea name="${q.id}" rows="2" ${q.required ? 'required' : ''}></textarea>`;
    } else if (q.type === 'group_radio') {
        content += `<div class="group-radio-table">${q.items.map(item => `
            <div style="margin-bottom:10px;">
                <p style="font-size:0.9rem; margin-bottom:5px;">${item}</p>
                <div class="radio-group" style="flex-direction:row; gap:20px;">
                    ${q.options.map(opt => `<label class="radio-option"><input type="radio" name="${q.id}_${item}" value="${opt}" required> ${opt}</label>`).join('')}
                </div>
            </div>
        `).join('')}</div>`;
    }

    content += `<span class="error-msg" id="error-${q.id}">Este campo deve ter pelo menos 5 caracteres</span></div>`;
    return content;
}

/**
 * Handle do Submit
 */
function handleSubmit(form) {
    const formData = new FormData(form);
    const data = {};
    let isValid = true;

    // Normalização inicial do FormData
    formData.forEach((value, key) => {
        if (key.includes('[]') || form.querySelectorAll(`[name="${key}"][type="checkbox"]`).length > 1) {
            if (!data[key]) data[key] = [];
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });

    // Validação WhatsApp
    const whatsapp = data.whatsapp ? data.whatsapp.replace(/\D/g, '') : '';
    if (whatsapp.length < 10) {
        showError('whatsapp');
        isValid = false;
    }

    // Validação Respostas Curtas (min 5 chars)
    const role = ROLES_CONFIG[state.selectedRole];
    role.sections.forEach(sec => {
        sec.questions.forEach(q => {
            if (q.type === 'short' && data[q.id] && data[q.id].trim().length < 5) {
                showError(q.id);
                isValid = false;
            }
        });
    });

    if (!isValid) {
        showToast("⚠️ Verifique os campos com erro.", "warning");
        return;
    }

    // Processamento de Avaliação
    evaluateCandidate(data);
}

function showError(id) {
    const el = document.getElementById(`error-${id}`);
    if (el) el.style.display = 'block';
}

/**
 * Regras de Negócio e Reprovação
 */
function evaluateCandidate(data) {
    const role = ROLES_CONFIG[state.selectedRole];
    const reasons = [];

    // Regras Gerais
    if (data.age === "Menos de 18") reasons.push("Geral: Candidato menor de 18 anos.");
    if (data.workType === "Não posso") reasons.push("Geral: Candidato não possui disponibilidade para PJ/MEI.");
    if (!data.socialConsent) reasons.push("Geral: Não aceitou o consentimento de análise de redes sociais.");

    // Regras Específicas
    const specificReasons = role.reproduce_rules ? role.reproduce_rules(data) : (role.rejectionRules ? role.rejectionRules(data) : []);
    reasons.push(...specificReasons);

    const status = reasons.length > 0 ? "REPROVADO" : "APTO_PARA_REUNIAO";

    state.currentData = data;
    state.evaluation = { status, reasons };

    showResults();
    sendToWebhook(data, state.evaluation);
}

/**
 * Tela 3: Painel Final
 */
function showResults() {
    mainContent.innerHTML = `
        <div class="result-panel fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 40vh; text-align: center; gap: 20px;">
            <h2 style="font-size: 2.5rem; color: #ffffff; font-weight: 900;">Obrigado!</h2>
            <p style="font-size: 1.4rem; color: #ffffff; max-width: 600px;">Alguns de nossos consultores entrará em contato!</p>
            <p style="font-size: 1.1rem; color: var(--text-dim); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">N4Grow - Nova mentalidade, novo crescimento!</p>
            
            <button class="btn-primary" onclick="renderPortal()" style="max-width: 250px; margin-top: 20px;">Voltar ao Início</button>
        </div>
    `;
}

/**
 * Webhook n8n
 */
async function sendToWebhook(answers, validation) {
    const payload = {
        meta: {
            selectedVacancy: {
                roleKey: state.selectedRole,
                roleName: ROLES_CONFIG[state.selectedRole].title
            },
            role: ROLES_CONFIG[state.selectedRole].title,
            timestampISO: new Date().toISOString(),
            userAgent: navigator.userAgent
        },
        answers: answers,
        validation: validation
    };

    try {
        const response = await fetch('https://n8n.n4growth.com/webhook-test/N4grow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showToast("✅ Dados enviados com sucesso!", "success");
        } else {
            throw new Error();
        }
    } catch (e) {
        showToast("⚠️ Falha ao enviar ao webhook (modo local ok)", "warning");
    }
}

/**
 * Utils: Copy Summary
 */
window.copySummary = () => {
    const role = ROLES_CONFIG[state.selectedRole].title;
    const { status, reasons } = state.evaluation;
    const ans = state.currentData;

    let text = `RESUMO CANDIDATURA - ${role}\n`;
    text += `Nome: ${ans.fullName}\nStatus: ${status}\n`;
    if (reasons.length > 0) text += `Motivos: ${reasons.join(', ')}\n`;
    text += `\n--- RESPOSTAS ---\n`;

    Object.keys(ans).forEach(key => {
        if (!['socialConsent', 'fullName'].includes(key)) {
            text += `${key}: ${ans[key]}\n`;
        }
    });

    navigator.clipboard.writeText(text).then(() => {
        showToast("Copiado para o clipboard!", "success");
    });
};

/**
 * Utils: Download JSON
 */
window.downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        role: ROLES_CONFIG[state.selectedRole].title,
        evaluation: state.evaluation,
        answers: state.currentData
    }, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `candidatura_${state.selectedRole}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
};

/**
 * Toast System
 */
function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}

/**
 * Sistema de Gotículas em Segundo Plano
 */
function initDroplets() {
    const container = document.getElementById('droplets-container');
    const dropletCount = 60; // Aumentado para mais preenchimento

    for (let i = 0; i < dropletCount; i++) {
        const droplet = document.createElement('div');
        droplet.className = 'droplet';

        // Um pouco maiores mas ainda pequenas (5px a 15px)
        const size = Math.random() * 10 + 5;
        droplet.style.width = `${size}px`;
        droplet.style.height = `${size}px`;

        // Posição inicial randômica (top)
        droplet.style.top = `${Math.random() * 100}%`;

        // Muito mais dinâmicas (2.5s a 7s)
        droplet.style.setProperty('--startY', `${Math.random() * 100}vh`);
        droplet.style.setProperty('--endY', `${Math.random() * 100}vh`);
        droplet.style.setProperty('--duration', `${Math.random() * 4.5 + 2.5}s`);

        // Delay randômico reduzido para fluxo mais denso
        droplet.style.animationDelay = `${Math.random() * 8}s`;

        container.appendChild(droplet);
    }
}

/**
 * Setup Mobile-Friendly Input Handlers
 * Forces checkboxes and radios to respond to label clicks on mobile
 */
function setupMobileInputHandlers() {
    // Wait for DOM to be ready
    setTimeout(() => {
        const allOptions = document.querySelectorAll('.radio-option, .checkbox-option');

        allOptions.forEach(container => {
            const input = container.querySelector('input[type="radio"], input[type="checkbox"]');

            if (!input) return;

            // Remove default behavior and handle manually
            container.style.cursor = 'pointer';

            // Add click handler to the entire container
            container.addEventListener('click', (e) => {
                // Don't prevent default if clicking directly on input
                if (e.target === input) return;

                e.preventDefault();
                e.stopPropagation();

                if (input.type === 'radio') {
                    input.checked = true;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                } else if (input.type === 'checkbox') {
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });

            // Add touch handler for better mobile support
            container.addEventListener('touchend', (e) => {
                // Don't prevent if touching the input directly
                if (e.target === input) return;

                e.preventDefault();
                e.stopPropagation();

                if (input.type === 'radio') {
                    input.checked = true;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                } else if (input.type === 'checkbox') {
                    input.checked = !input.checked;
                    input.dispatchEvent(new Event('change', { bubbles: true }));
                }
            }, { passive: false });
        });
    }, 150);
}

// Início
document.addEventListener('DOMContentLoaded', () => {
    initDroplets();
    if (state.selectedRole) {
        renderForm();
    } else {
        renderPortal();
    }
});
