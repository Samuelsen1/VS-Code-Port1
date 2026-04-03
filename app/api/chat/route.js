import { NextResponse } from 'next/server';

// External General AI endpoint (General – Desktop AI assistant)
// Override via GENERAL_AI_URL env var if you deploy to a different domain.
const GENERAL_AI_URL = process.env.GENERAL_AI_URL || 'https://general-ai-wheat.vercel.app/api/chat';

// Samuel's comprehensive CV data
const cvData = `
SAMUEL AFRIYIE OPOKU
Digital Learning Designer | Web Portfolio: https://vs-code-port1.vercel.app
Location: Große Klosterkoppel 8, 23562 Lübeck
Phone: +49 171 5811680
Email: gideonsammysen@gmail.com
LinkedIn: https://www.linkedin.com/in/samuel-o-4b9bbb2a8

PROFESSIONAL SUMMARY:
Digital Learning Designer with 1+ year of e-learning development experience and 3 years of teaching background. Combines Master's-level media studies expertise with hands-on skills in instructional design, multimedia production, and LMS administration using Articulate 360, Adobe Creative Suite, and web and AI technologies to create accessible, learner-centered digital experiences.

SKILLS & COMPETENCIES:
Instructional Design: ADDIE | Bloom's Taxonomy | Adult Learning Theory | Storyboarding | Learning Experience Design (LXD) | Curriculum Development | Learning Outcome Alignment | Competency-Based Design
E-Learning Development: SCORM Packaging | LMS Administration | Learning Analytics | Formative/Summative Evaluation
Multimedia Production: Photo Editing (Infographics | Posters | Flyers) | Video Creation & Editing
Technical Communication: User Guides | Knowledge-Base Documentation | Cross-Cultural Content Adaptation | Content Localization
Collaboration: Stakeholder Engagement | Cross-Functional Teamwork

TOOLS & TECHNOLOGIES:
E-Learning Authoring & LMS: Articulate 360 (Storyline, Rise) | Moodle
Design & Multimedia: Adobe Creative Suite (Premiere Pro, Photoshop, InDesign) | Figma | Descript
Web & AI Development: HTML | CSS | Markdown | API Integration | Prompt Coding
Development Tools: GitHub | VS Code | Cursor | Vercel
Productivity & Collaboration: Google Workspace | Microsoft 365 (Word, PowerPoint, SharePoint, Teams, Excel, Loop, etc.) | Notion

EDUCATION:
- Master's in North American Studies (Media Studies) (Grade: 2.0 | Gut) (Oct 2023 – March 2026) - Philipps-Universität Marburg, Germany
  Relevant Courses: Media | Visual Art | Writing for Research | Campus Fiction & Film (Paulo Freire: Pedagogy of the Oppressed) | Contested Sustainability
  Master's Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"

- Bachelor of Education in English Language (Grade: 1.4 | First Class Honours) (Oct 2018 – Oct 2022) - University of Cape Coast, Ghana
  Relevant Courses: Educational Psychology | General Curriculum Studies | Assessment & Evaluation | Educating Individuals with Diverse Learning Needs | Research Methods in Education | Educational Statistics | Language & Linguistics | Semantics | Translation | English in Multilingual Contexts

PROFESSIONAL EXPERIENCE:

1. Global Academy – eLearning Developer (Intern) (Feb 2026 – Present) - Dräger, Lübeck
   - Assist in producing interactive e-learning modules using Articulate 360; support script and storyboard revisions for instructional clarity and consistency
   - Support video production across the full workflow, including shoots, editing, and audio optimisation using Adobe Premiere Pro
   - Utilise AI-powered tools to create translated versions of e-learning modules, improving accessibility and reach across multilingual audiences
   - Progressively take ownership of small-scale e-learning projects, managing them independently from concept through to delivery

2. Digital Learning Designer (Intern) (June 2025 – Nov 2025) - Tanz der Kulturen e.V., Hamburg
   - Designed 25+ accessible multimedia learning assets (infographics, promotional materials) in line with WCAG 2.1, expanding reach to diverse learner groups
   - Curated and structured 50+ educational resources for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners
   - Localized 300+ pages of German instructional content (e.g., Rituelle Tanz Pädagogik book) into English using AI-assisted translation, preserving natural flow

3. English Language Teacher & Administrative Assistant (Jan 2023 – Oct 2023) - Ghana National Service Scheme, Kumasi
   - Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy, enhancing comprehension, writing, and speaking skills
   - Assessed student progress using formative and summative methods to inform lesson adaptation
   - Managed administrative tasks, including student records, scheduling, and correspondence

4. English Language Teaching Assistant (Intern) (June 2021 – Dec 2021) - Ghana Education Service, Kumasi
   - Developed a box-part-letter handwriting method, improving first-year student performance by 40%
   - Facilitated lessons integrating assessment strategies and instructional scaffolding aligned to learning outcomes

5. English Language Teacher (Working Student) (Jan 2020 – June 2020) - Kovak Hill Educational Centre, Kumasi
   - Developed and implemented lesson plans following ADDIE principles, ensuring alignment with curriculum standards and learner engagement strategies

CERTIFICATIONS & TRAINING:
- Instructional Design Foundations & Applications – University of Illinois Urbana-Champaign
- EF SET English Certificate – C1 Advanced (67/100)
- Technical Writing Course – Google Developers
- Technical Writing Course – Board Infinity (April 2025)
- Using the MLA International Bibliography for Research in Foreign Language Studies – Philipps-Universität Marburg (Aug 14, 2025)

PORTFOLIO HIGHLIGHTS:
Product Training (Articulate 360): Interactive onboarding on Dräger Fundamentals of Controllers (brand identity) | Interactive onboarding on Dräger Medical Vacuum Systems (available upon request)
E-Learning (Rise): Interactive courses with assessments & multimedia — Sample 1 (accessibility panel & chatbot); Sample 2
Posters & Flyers: Creative content aligned with brand identity
Knowledge Base (Notion): ADDIE-based LLMs & Sustainability | Climate change resources
Portfolio Website: Bilingual (EN/DE), dark/light theme, AI assistants, advanced accessibility
AI (Thesis-inspired): Advanced assistant — Q&A, fact-check, PDF reading, analysis — https://general-ai-wheat.vercel.app

LANGUAGES:
- English – Native/Bilingual
- German – B1 Intermediate
- Akan – Fluent

PERSONAL ATTRIBUTES:
- Height: 184cm
- Natural talents: Creativity in drawing, naturally soothing singing voice
- Personality: Quiet, observant, curious (actively learning new skills), empathetic, reserved but friendly
`;

// Enhanced pattern matching with fuzzy logic and semantic similarity
function matchesPattern(message, patterns) {
  const lowerMessage = message.toLowerCase();
  return patterns.some(pattern => {
    if (typeof pattern === 'string') {
      return lowerMessage.includes(pattern);
    }
    if (pattern instanceof RegExp) {
      return pattern.test(lowerMessage);
    }
    return false;
  });
}

// NLP: Semantic similarity and word relationship mapping
// Maps words to semantic vectors (simplified representation using word relationships)
const semanticVectors = {
  'instructional': ['design', 'learning', 'education', 'training', 'course', 'curriculum', 'pedagogy', 'teaching', 'educational'],
  'design': ['instructional', 'learning', 'course', 'curriculum', 'educational', 'training', 'create', 'develop', 'build'],
  'learning': ['instructional', 'design', 'education', 'training', 'course', 'student', 'learner', 'knowledge', 'teaching'],
  'technical': ['writing', 'documentation', 'document', 'guide', 'manual', 'api', 'code', 'software', 'developer'],
  'writing': ['technical', 'documentation', 'content', 'document', 'guide', 'manual', 'author', 'create', 'draft'],
  'documentation': ['technical', 'writing', 'guide', 'manual', 'api', 'reference', 'help', 'content', 'document'],
  'skills': ['abilities', 'competencies', 'expertise', 'proficiency', 'capabilities', 'talents', 'strengths'],
  'experience': ['work', 'job', 'career', 'employment', 'background', 'history', 'past', 'previous'],
  'available': ['free', 'ready', 'open', 'when', 'start', 'date', 'hire', 'looking', 'seeking'],
  'portfolio': ['projects', 'work', 'examples', 'samples', 'showcase', 'demo', 'creations'],
  'contact': ['email', 'phone', 'reach', 'connect', 'message', 'communication', 'get in touch'],
  'education': ['degree', 'university', 'study', 'academic', 'school', 'master', 'bachelor', 'qualification'],
};

// Calculate semantic similarity score between query and target concepts
function calculateSemanticSimilarity(message, targetConcepts) {
  const words = message.toLowerCase().split(/\s+/);
  let maxSimilarity = 0;
  
  for (const word of words) {
    for (const target of targetConcepts) {
      // Direct match
      if (word === target.toLowerCase()) {
        maxSimilarity = Math.max(maxSimilarity, 1.0);
      }
      
      // Semantic relationship (check if word relates to target)
      const wordVector = semanticVectors[word] || [];
      const targetVector = semanticVectors[target.toLowerCase()] || [];
      
      // Calculate overlap (simplified cosine similarity)
      if (wordVector.length > 0 && targetVector.length > 0) {
        const intersection = wordVector.filter(v => targetVector.includes(v));
        const similarity = intersection.length / Math.max(wordVector.length, targetVector.length);
        maxSimilarity = Math.max(maxSimilarity, similarity * 0.7); // Weight semantic matches
      }
      
      // Check if word appears in target's semantic vector
      if (wordVector.includes(target.toLowerCase()) || targetVector.includes(word)) {
        maxSimilarity = Math.max(maxSimilarity, 0.6);
      }
    }
  }
  
  return maxSimilarity;
}

// NLU: Enhanced intent extraction with context awareness
function extractIntentWithContext(message, topics) {
  const lowerMessage = message.toLowerCase();
  const intent = {
    type: 'information', // information, question, command, comparison
    urgency: 'normal',
    context: [],
    entities: []
  };
  
  // Question type detection
  if (/^(what|who|when|where|why|how|which|whose)/i.test(message.trim())) {
    intent.type = 'question';
  }
  
  // Command detection
  if (/^(tell|show|explain|describe|give|provide|list|display)/i.test(message.trim())) {
    intent.type = 'command';
  }
  
  // Comparison detection
  if (/compare|vs|versus|difference|better|different|similar|same/i.test(message)) {
    intent.type = 'comparison';
  }
  
  // Urgency detection
  if (/urgent|asap|soon|quick|fast|immediately|right now/i.test(message)) {
    intent.urgency = 'high';
  }
  
  // Entity extraction (simplified NER)
  const entities = {
    person: message.match(/\b(samuel|sam)\b/gi) || [],
    location: message.match(/\b(germany|germany|lübeck|marburg|ghana|kumasi|remote|on-site|hybrid)\b/gi) || [],
    tool: message.match(/\b(articulate|storyline|rise|moodle|scorm|figma|notion|github|premiere|photoshop|indesign|vs code|markdown|html|css)\b/gi) || [],
    skill: message.match(/\b(instructional design|learning design|lxd|l&d|technical writing|documentation|e-learning|elearning|accessibility|wcag)\b/gi) || [],
    date: message.match(/\b(2026|2025|2024|april|may|february|january|march|june|july|august|september|october|november|december)\b/gi) || []
  };
  
  intent.entities = Object.entries(entities)
    .filter(([_, values]) => values.length > 0)
    .map(([type, values]) => ({ type, values: [...new Set(values)] }));
  
  // Context from topics
  intent.context = topics;
  
  return intent;
}

// Extract key topics from message - Enhanced with comprehensive patterns
function extractTopics(message) {
  const topics = [];
  const lowerMessage = message.toLowerCase();
  
  const topicPatterns = {
    // Question types
    'why': [/why|wieso|warum|what.*makes|what.*reason|reason.*for|what.*causes|what.*leads|what.*drives|what.*motivat|why.*is|why.*are|why.*does|why.*do|was.*bewirkt|was.*verursacht|was.*führt|was.*treibt/i],
    'how': [/how.*do|how.*does|how.*can|how.*work|how.*create|how.*build|how.*make|how.*develop|how.*design|how.*use|how.*approach|how.*method|how.*process|wie.*macht|wie.*erstellt|wie.*baut|wie.*kann|wie.*entwickelt|wie.*design|wie.*verwendet|wie.*ansatz|wie.*methode|wie.*prozess/i],
    'what': [/what.*is|what.*are|what.*does|what.*can|what.*know|what.*do|what.*specializ|what.*expert|what.*competent|what.*good|was.*ist|was.*sind|was.*kann|was.*macht|was.*weiß|was.*kann.*er|was.*spezialisiert|was.*kompetent/i],
    'tell-me': [/tell.*me|explain|describe|share|elaborate|inform|detail|break.*down|outline|summarize|give.*info|provide.*info|erzähl.*mir|erklär|beschreib|teile|informieren|detaillieren|zusammenfass|gib.*info|informiere/i],
    'compare': [/compare|vs|versus|difference|better.*than|versus|versus|different|similar|same|verschiedene|unterschiedlich|ähnlich|gleich|im.*vergleich|unterschied|besser.*als|unterschiede|vergleichen/i],
    
    // Role hierarchy
    'role-primary': [/primary.*role|main.*role|primary.*focus|primary.*professional|primary.*career|main.*focus|primary.*expertise|haupt.*rolle|haupt.*beruf|primär.*rolle|primär.*fokus|primär.*karriere|haupt.*fokus|haupt.*expertise/i],
    'role-secondary': [/secondary|technical writing.*role|documentation.*role|do.*also.*technical|also.*work.*technical|zweite.*rolle|sekundär|technical.*writing.*secondary|also.*specializ/i],
    'role-relationship': [/how.*instructional.*technical|how.*relate|relationship.*between|connection.*between|wie.*zusammen|beziehung.*zwischen|wie.*verbunden|verbindung.*zwischen/i],
    'role-prioritize': [/which.*priorit|which.*should|recruiter.*priorit|which.*role|best.*fit|welche.*priorit|welche.*rolle.*priorit|welche.*sollte|recruiter.*soll|beste.*passung/i],
    'role-switching': [/switching.*career|switching.*from|career.*change|changing.*career|karriere.*wechsel|wechsel.*von|wechseln.*karriere/i],
    'role-temporary': [/technical.*writing.*temporary|see.*temporary|temporary|vorübergehend/i],
    'team-fit': [/team|work.*with|types.*team|works.*best|collaborate|hybrid|remote|on-site|art.*team|hybrid.*remote|remote.*work|on.*site|types.*teams|team.*culture|working.*style/i],
    
    'digital-learning': [/digital learning|e-learning|elearning|instructional design|learning design|lxd|l&d|learning.*development|learning.*experience.*design|curriculum|course design|learning experience|addie|bloom|articulate|storyline|rise|scorm|moodle|educational.*design|training.*design|learning.*development|course.*development|online.*training|webinar|educational.*technology|edtech|learning.*platform|training.*platform|educational.*content|learning.*content|courseware|microlearning|blended.*learning|adaptive.*learning|gamification|learning.*analytics|lms|learning.*management|content.*authoring|rapid.*elearning|storyboard|instructional.*video|educational.*video|multimedia.*content|interactive.*content|learning.*designer|instructional.*designer|e-learning.*designer|learning.*experience.*designer|curriculum.*designer|course.*designer|educational.*designer|training.*designer|learning.*specialist|instructional.*specialist|e-learning.*specialist|lxd.*specialist|l&d.*specialist|learning.*and.*development|lernen.*und.*entwicklung|lern.*design|instruktionsdesign|e-learning.*modul|kurse.*design|online.*learning|distance.*learning|virtual.*learning|multimedia.*learning|interactive.*learning|digital.*education|bildungsdesign|schulungsdesign|lerntech|bildungsinhalt|lerninhalt|kursware|mikrolernen|blended.*learning|adaptives.*lernen|gamifizierung|lern.*analytik|lern.*management|inhaltserstellung|rapid.*elearning|storyboard|instruktionsvideo|bildungsvideo|multimedia.*inhalt|interaktiver.*inhalt|lerndesigner|instruktionsdesigner|e-learning.*designer|lern.*erfahrungs.*designer|kurrikulum.*designer|kurs.*designer|bildungsdesigner|schulungsdesigner|lern.*spezialist|instruktions.*spezialist|e-learning.*spezialist|lxd.*spezialist|l&d.*spezialist/i],
    'technical-writing': [/technical writing|documentation|tech writer|api doc|user guide|knowledge base|technical competenc|writing skill|documentation skill|technical.*documentation|api.*documentation|user.*documentation|developer.*documentation|content.*writing|procedural.*writing|process.*documentation|system.*documentation|software.*documentation|end.*user.*documentation|admin.*documentation|reference.*documentation|troubleshooting.*guide|how.*to.*guide|quick.*start|getting.*started|user.*manual|installation.*guide|configuration.*guide|release.*notes|changelog|sop|standard.*operating.*procedure|runbook|run.*book|knowledge.*article|help.*content|support.*content|content.*strategy|information.*architecture|doc.*planning|documentation.*strategy|single.*source|structured.*authoring|content.*reuse|localization|translation|technical.*editing|copyediting|review|qa|quality.*assurance|technisches schreiben|dokumentation|benutzerhandbuch|api.*dokumentation|wissensdatenbank|user.*manual|technical.*doc|process.*doc|dita|xml.*doc|content.*development|technische.*dokumentation|systemdokumentation|software.*dokumentation|endbenutzer.*dokumentation|admin.*dokumentation|referenz.*dokumentation|fehlerbehebung|anleitung|schnellstart|installationsanleitung|konfigurationsanleitung|versionshinweise|änderungsprotokoll|betriebsanweisung|wissensartikel|hilfeinhalt|support.*inhalt|inhaltsstrategie|informationsarchitektur|dok.*planung|dokumentationsstrategie|einzelquelle|strukturierte.*autorensysteme|inhaltswiederverwendung|lokalisierung|übersetzung|technisches.*lektorat|redigierung|überprüfung|qualitätssicherung/i],
    
    'experience': [/experience|work history|work|job|career|employment|position|role|what.*done|what.*did|what.*worked|background|professional.*history|previous.*work|work.*experience|employment.*history|career.*history|work.*background|work.*background|past.*work|work.*record|erfahrung|arbeit|beruf|karriere|position|was.*gemacht|was.*getan|was.*gearbeitet|berufsleben|laufbahn|was.*erfahren|berufserfahrung|berufshistorie|berufslaufbahn|vorherige.*arbeit/i],
    'achievements': [/achievement|accomplishment|success|impact|result|outcome|erfolg|leistung|erreichung|auswirkung|ergebnis|wirkung/i],
    'strengths': [/strength|strong|excel|best.*at|good.*at|stärke|stark|exzellent|gut.*in|beste.*in/i],
    
    // Education & Learning
    'education': [/education|degree|university|academic|study|studied|school|master|bachelor|diploma|qualification|college|institute|ausbildung|studium|universität|abschluss|promotion|hochschule|akademisch|qualifikation/i],
    'certification': [/certificat|training|course|credential|certified|qualification|license|zertifikat|kurs|schulung|weiterbildung|qualifikation|lizenz/i],
    'learning': [/learn|learning|study|studying|studied|continuous.*learning|lernen|studium|studieren|kontinuierlich.*lernen/i],
    
    'skills': [/skill|abilities|expertise|proficien|capabilit|competence|competenc|talented|proficient|what.*can|what.*can.*do|what.*able|what.*good.*at|what.*expert|strengths|strong.*at|excel.*at|specializ|was kann|können|fähigkeit|kompetenz|talent|fachlich|begabt|was.*gut|was.*stark|was.*kompetent|stärken|kompetenzen|fähigkeiten/i],
    'tools': [/tool|software|program|platform|application|app|technology|tech stack|system|werkzeug|programm|anwendung|technologie|system|software/i],
    'specific-tools': [/articulate|adobe|figma|premiere|photoshop|indesign|moodle|scorm|notion|github|vercel|markdown|html|css|vs.*code/i],
    
    'portfolio': [/portfolio|project|work sample|example|showcase|demo|what.*built|what.*created|what.*made|what.*done|what.*work|creations|builds|works|productions|work.*examples|show.*work|show.*projects|show.*samples|show.*examples|display.*work|view.*work|see.*work|previous.*work|past.*work|completed.*work|recent.*work|current.*work|featured.*work|best.*work|top.*projects|highlighted.*projects|projekte|beispiele|projekt.*beispiele|was.*erstellt|was.*gebaut|was.*gemacht|was.*geschaffen|was.*erarbeitet|zeige.*arbeiten|zeige.*projekte|zeige.*beispiele|zeige.*samples|vorherige.*arbeit|abgeschlossene.*arbeit|aktuelle.*arbeit|hervorgehobene.*projekte|beste.*projekte|portfolio.*link|portfolio.*url|see.*portfolio|sample|examples|samples|case.*study|work.*product/i],
    
    'contact': [/contact|email|phone|reach|get.*in.*touch|how.*to.*reach|how.*contact|how.*reach|how.*connect|call|message|connect|communication|reach.*out|contact.*info|contact.*details|get.*hold|how.*to.*contact|how.*get.*in.*touch|phone.*number|email.*address|kontakt|erreichen|telefon|e-mail|kontaktdaten|wie.*kontaktieren|wie.*erreichen|wie.*kontakt|wie.*erreichen|anrufen|schreiben|kommunikation|erreichbar|kontaktinformationen|kontaktdaten|wie.*kontaktiert|erreichbarkeit/i],
    
    // Languages & Communication
    'languages': [/language|speak|german|english|multilingual|bilingual|fluent|proficiency|sprache|sprechen|mehrsprachig|zweisprachig|fließend|kompetenz|sprachkenntnisse/i],
    
    // Accessibility & Standards
    'accessibility': [/accessib|wcag|inclusive|universal.*design|a11y|barrierefreiheit|zugänglich|inklusion|wie.*barrierefrei|accessible.*design|accessibility.*standards/i],
    
    // Availability & Opportunity
    'availability': [/available|availability|start.*date|when.*can|free|hire|looking.*for.*work|open.*to|ready|seeking|accepting|interested.*in|when.*start|when.*begin|when.*available|start.*work|begin.*work|when.*free|free.*to.*work|open.*for.*projects|taking.*projects|accept.*work|accept.*projects|when.*will|when.*can.*start|when.*can.*begin|when.*can.*work|start.*date|begin.*date|commence|commencement|join|joining|employment.*date|hiring|recruiting|searching.*for|looking.*for.*position|job.*search|career.*opportunity|position.*available|open.*position|vacancy|job.*opening|verfügbar|verfügbarkeit|wann.*kann|freie.*zeit|sucht.*arbeit|offen.*für|verfügbar.*für|wann.*verfügbar|bereit.*für|bereit.*zu.*arbeiten|sucht.*projekt|offen.*für.*projekte|interessiert.*an|wann.*kann.*er|wann.*kann.*samuel|wann.*wird|wann.*kann.*beginnen|wann.*kann.*arbeiten|startdatum|beginn.*datum|einstieg|einstieg.*datum|anstellung|beschäftigung|stellenangebot|offene.*stelle|vakanz|jobsuche|karrierechance/i],
    
    // Location & Geography
    'location': [/where|location|based|live|city|country|germany|lübeck|marburg|ghana|kumasi|address|reside|wo|standort|wohnt|wo.*lebt|wo.*basiert|adresse|wohnort|ansässig/i],
    
    // Personal
    'personal': [/height|tall|personality|personal|hobbies|talent|about.*him|who.*is|character|interests|hobbies|persönlich|größe|hobbys|wer.*ist|über.*ihn|als.*person|wie.*ist|persönlichkeit|interessen/i],
    
    // Process & Methods
    'process': [/process|method|approach|workflow|methodology|methodologie|prozess|methode|ansatz|workflow|methodologie/i],
    
    // Quality & Impact
    'quality': [/quality|excellence|best.*practice|standard|high.*quality|qualität|exzellenz|beste.*praxis|standard|hohe.*qualität/i],
    'impact': [/impact|result|outcome|achievement|effect|measurable|wirkung|ergebnis|erreichung|effekt|messbar/i]
  };
  
  // Primary pattern matching
  for (const [topic, patterns] of Object.entries(topicPatterns)) {
    if (matchesPattern(lowerMessage, patterns)) {
      topics.push(topic);
    }
  }
  
  return topics;
}

// Free Dictionary API: https://dictionaryapi.dev/ — fetch definition for a term
async function fetchDefinition(term, lang = 'en') {
  if (!term || !/^[a-zA-Z0-9\s\-äöüßÄÖÜ]+$/.test(term)) return null;
  const clean = String(term).trim();
  const code = lang === 'de' ? 'de' : 'en';
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${code}/${encodeURIComponent(clean)}`, {
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(4000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const entry = data[0];
    const word = entry.word || term;
    const out = [];
    for (const m of (entry.meanings || []).slice(0, 2)) {
      const pos = m.partOfSpeech || '';
      for (const d of (m.definitions || []).slice(0, 1)) {
        out.push(`${word} (${pos}): ${d.definition}`);
        if (d.example) out.push(`Example: ${d.example}`);
      }
    }
    return out.length ? out.join('\n') : null;
  } catch {
    return null;
  }
}

// Detect if the user is asking for a word/phrase definition and extract the term
function getDefinitionRequest(message) {
  const m = message.match(/\b(?:define|definition|meaning of|what does|what do)\s+(?:the\s+)?([\w-]+(?:\s+[\w-]+)?)\s*(?:mean)?\??/i)
    || message.match(/\b(?:was bedeutet|was heißt|bedeutung von|definition von)\s+([\wäöüß-]+(?:\s+[\wäöüß-]+)?)\s*\??/i);
  return m ? m[1].trim() : null;
}

// Structure-aware intent: use question word + main predicate to avoid conflating e.g. availability vs experience.
// "When is he available for full-time employment" -> availability (when + available). "What is his experience" -> experience.
function classifyIntent(message, language) {
  const q = message.trim().toLowerCase();
  const en = language !== 'de';

  // --- AVAILABILITY: when/start/begin + available|verfügbar|start|anfangen OR "available for (full-time )employment"
  if (/\b(?:when|wann|ab wann)\s+(?:is|ist|can|kann|does|wird)\s+(?:he|samuel|sam|er)\s+(?:available|verfügbar|free|bereit)/i.test(q)) return 'availability';
  if (/\b(?:when|wann)\s+can\s+(?:he|samuel|sam)\s+start\b/i.test(q)) return 'availability';
  if (/\b(?:wann|ab wann)\s+kann\s+(?:er|samuel)\s+(?:anfangen|beginnen|starten)\b/i.test(q)) return 'availability';
  if (/\bavailable\s+for\s+(?:full[- ]?time\s+)?(?:employment|work)\b/i.test(q)) return 'availability';
  if (/\bverfügbar\s+für\s+(?:Vollzeit[- ]?)?(?:Anstellung|Arbeit|Beschäftigung)\b/i.test(q)) return 'availability';
  if (/\b(?:when|wann)\s+(?:is|ist)\s+(?:he|samuel|sam|er)\s+free\b/i.test(q)) return 'availability';
  if (/\b(?:when|wann)\s+(?:can|kann)\s+(?:he|samuel|sam|er)\s+(?:start|begin|anfangen|beginnen)\b/i.test(q)) return 'availability';
  if (/\b(?:full[- ]?time|Vollzeit)\s+(?:available|verfügbar|employment|Anstellung)\b/i.test(q)) return 'availability';
  if (/\b(?:start\s+date|Startdatum|Einstieg|Beginn)\b/i.test(q) && /\b(?:when|wann|what|was)\b/i.test(q)) return 'availability';

  // --- EXPERIENCE: what/how much + experience|work history|erfahrung (and NOT when+available)
  if (/\b(?:what|was|how much|wie viel)\s+(?:is|ist|are|sind)\s+(?:his|seine|their|ihre)\s+(?:work\s+)?(?:experience|history|erfahrung|Berufserfahrung)/i.test(q)) return 'experience';
  if (/\b(?:tell|erzähl|describe|beschreib)\s+(?:me|mir)\s+(?:about|über)\s+(?:his|seine|their)\s+(?:experience|erfahrung|work\s+history)/i.test(q)) return 'experience';
  if (/\b(?:work\s+history|employment\s+history|Berufserfahrung|Berufslaufbahn)\b/i.test(q) && !/\b(?:when|wann|available|verfügbar)\b/i.test(q)) return 'experience';

  // --- CONTACT: how/where to contact, email, phone, reach
  if (/\b(?:how|wie|where|wo)\s+(?:can|kann|do|to)\s+(?:i|we|man)\s+(?:contact|reach|reach out|kontaktieren|erreichen)/i.test(q)) return 'contact';
  if (/\b(?:email|e-mail|phone|telefon|linkedin)\s+(?:address|number|nummer)?\b/i.test(q) || /\b(?:contact|kontakt)\s+(?:info|information|details|daten)\b/i.test(q)) return 'contact';

  // --- EDUCATION: degree, university, study, master, bachelor
  if (/\b(?:what|was|which|welche)\s+(?:is|ist|are)\s+(?:his|seine)\s+(?:education|degree|qualification|ausbildung|abschluss|studium)/i.test(q)) return 'education';
  if (/\b(?:where|wo)\s+(?:did|hat)\s+(?:he|samuel|sam|er)\s+(?:study|studiert|studiert)/i.test(q)) return 'education';

  // --- LOCATION: where based, location, city, country
  if (/\b(?:where|wo)\s+(?:is|ist)\s+(?:he|samuel|sam|er)\s+(?:based|located|living|living|wohnt|basiert|ansässig)/i.test(q)) return 'location';
  if (/\b(?:location|standort|wohnort)\s+(?:in|in)\b/i.test(q)) return 'location';

  // --- PORTFOLIO / PROJECTS
  if (/\b(?:portfolio|projekte|projects|work\s+samples?|beispiele)\b/i.test(q) && /\b(?:show|zeig|view|see|link|links)\b/i.test(q)) return 'portfolio';

  // --- SKILLS / TOOLS
  if (/\b(?:what|was|which|welche)\s+(?:are|sind)\s+(?:his|seine)\s+(?:skills|abilities|competencies|tools|kompetenzen|fähigkeiten|werkzeuge)/i.test(q)) return 'skills';
  if (/\b(?:what|welche)\s+(?:tools|software|programs|werkzeuge|programme)\s+(?:does|verwendet)\s+(?:he|er)\s+(?:use|verwenden)/i.test(q)) return 'tools';

  // --- CERTIFICATIONS
  if (/\b(?:what|was|which|welche)\s+(?:certifications?|certificates?|zertifikate?|trainings?)\s+(?:does|hat)\s+(?:he|er)\s+(?:have|hat)/i.test(q)) return 'certifications';

  // --- ROLE / IDENTITY
  if (/\b(?:is|ist)\s+(?:he|samuel|sam|er)\s+(?:a|an|ein)\s+\w+\s+(?:designer|developer|writer|teacher|instruktionsdesigner|lerndesigner)/i.test(q)) return 'role';
  if (/\b(?:primary|primär|main|haupt)\s+(?:role|focus|fokus|career|karriere)\b/i.test(q)) return 'role';

  return 'other';
}

// Call external General AI (General – Desktop AI assistant)
// Returns a reply string or null on failure.
async function callGeneralAI(message, history) {
  if (!GENERAL_AI_URL) return null;

  try {
    const payload = {
      message: String(message || '').trim(),
      // Keep history short and in the shape the external API expects
      history: Array.isArray(history)
        ? history
            .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
            .slice(-20)
            .map(m => ({ role: m.role, content: String(m.content).slice(0, 800) }))
        : [],
    };

    if (!payload.message) return null;

    const res = await fetch(GENERAL_AI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      // Keep in sync with other upstream calls
      signal: AbortSignal.timeout(28000),
    });

    if (!res.ok) {
      console.warn('General AI proxy error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    const reply = typeof data?.reply === 'string' && data.reply.trim()
      ? data.reply.trim()
      : typeof data?.response === 'string' && data.response.trim()
      ? data.response.trim()
      : null;

    return reply;
  } catch (e) {
    console.warn('General AI proxy failed:', e?.message || e);
    return null;
  }
}

// Rate limiting: for production, use Vercel's rate limit or Upstash Redis.
// Example: @upstash/ratelimit or vercel.json / middleware.

export async function POST(request) {
  try {
    const { message, language = 'en', history = [] } = await request.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({
        error: language === 'de'
          ? 'Bitte geben Sie eine Nachricht ein, damit ich Ihnen helfen kann.'
          : 'Please provide a message so I can help you.'
      }, { status: 400 });
    }

    const isGerman = language === 'de';
    const lowerMessage = message.toLowerCase();
    const topics = extractTopics(message);
    // Treat questions about Samuel specially – answer from CV-based logic, not General AI
    const aboutSamuel =
      /samuel\b|afriyie\b|opoku\b|\bhis\b|\bihm\b|\bsein\b|\bihn\b/i.test(lowerMessage) ||
      topics.some(t =>
        [
          'digital-learning',
          'technical-writing',
          'experience',
          'achievements',
          'strengths',
          'education',
          'certification',
          'skills',
          'tools',
          'portfolio',
          'contact',
          'languages',
          'accessibility',
          'availability',
          'location',
          'personal',
        ].includes(t),
      );
    
    // NLU: Extract intent with context for enhanced understanding
    const intent = extractIntentWithContext(message, topics);
    
    // Enhanced welcome messages
    const greetings = {
      en: [
        /^(hi|hello|hey|greetings|good morning|good afternoon|good evening|hi there|hey there|sup|what's up|howdy)\s*$/i,
        /^(hi|hello|hey)\s+(samuel|sam|sir)/i
      ],
      de: [
        /^(hallo|hi|hey|guten tag|guten morgen|guten abend|moin|servus|grüß|tag)\s*$/i,
        /^(hallo|hi|hey)\s+(samuel|sam|herr)/i
      ]
    };
    
    // Check for greeting
    if (greetings[language].some(pattern => pattern.test(message.trim()))) {
      const response = isGerman
        ? "Guten Tag! 👋 Ich bin Samuels KI-Assistent.\n\nIch beantworte gerne Fragen über Samuel und seine Expertise in **Digital Learning Design** und **Technical Writing**.\n\n**Was ich Ihnen erzählen kann:**\n\n🎓 **Digital Learning Design**\n• E-Learning-Entwicklung mit Articulate 360\n• Instruktionsdesign (ADDIE, Bloom's Taxonomie)\n• Multimedia-Erstellung und Videobearbeitung\n• SCORM und LMS-Integration\n\n📝 **Technical Writing**\n• Benutzerhandbücher und API-Dokumentation\n• Wissensdatenbanken und Content-Lokalisierung\n• Technische Dokumentation und Prozessdokumentation\n\n💼 **Weitere Themen**\n• Berufserfahrung und Ausbildung\n• Portfolio und Zertifikate\n• Kontaktinformationen\n• Verfügbarkeit und Standort\n\n**Beispiel-Fragen:**\n• 'Was sind Samuels Hauptkompetenzen?'\n• 'Erzähle mir über seine Digital Learning Erfahrung'\n• 'Wie kann ich Samuel kontaktieren?'\n• 'Welche Tools verwendet er für E-Learning?'\n\nStellen Sie gerne eine Frage – ich helfe Ihnen sofort! 😊"
        : "Hello! 👋 I'm Samuel's AI assistant.\n\nI'm here to answer questions about Samuel and his expertise in **Digital Learning Design** and **Technical Writing**.\n\n**What I can tell you about:**\n\n🎓 **Digital Learning Design**\n• E-learning development with Articulate 360\n• Instructional design (ADDIE, Bloom's Taxonomy)\n• Multimedia creation and video editing\n• SCORM and LMS integration\n\n📝 **Technical Writing**\n• User guides and API documentation\n• Knowledge bases and content localization\n• Technical documentation and process documentation\n\n💼 **Additional Topics**\n• Work experience and education\n• Portfolio and certifications\n• Contact information\n• Availability and location\n\n**Example Questions:**\n• 'What are Samuel's core competencies?'\n• 'Tell me about his digital learning experience'\n• 'How can I contact Samuel?'\n• 'What tools does he use for e-learning?'\n\nFeel free to ask me anything – I'm here to help! 😊";
      
      return NextResponse.json({ response, timestamp: new Date().toISOString() });
    }
    
    // ——— Primary path: external General AI (General – Desktop AI assistant) ———
    // Only for non-Samuel / general questions. Samuel-specific questions are
    // answered purely from the CV-based logic below (no Wikipedia / web snippets).
    if (!aboutSamuel) {
      const generalReply = await callGeneralAI(message, history);
      if (generalReply) {
        return NextResponse.json({
          response: generalReply,
          timestamp: new Date().toISOString(),
          poweredBy: 'general-ai',
        });
      }
    }
    
    // ——— Fallback LLM path (OpenAI + Dictionary API): understand everything, respond like a human ———
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      try {
        let definitionCtx = '';
        const defTerm = getDefinitionRequest(message);
        if (defTerm) {
          const def = await fetchDefinition(defTerm, language === 'de' ? 'de' : 'en');
          if (def) definitionCtx = `\n\n[DICTIONARY DEFINITION - use when relevant]\n${def}\n[/DICTIONARY DEFINITION]`;
        }
        
        const intent = classifyIntent(message, language);
        const systemContent = `You are Samuel's friendly AI assistant. Use ONLY the CV and any [DICTIONARY DEFINITION] below. Be concise, natural, and human-like — write as a helpful colleague, not a robot. Answer in the user's language: English if they write in English, German if in German.

SENTENCE STRUCTURE & CONTEXT (important):
- Pay attention to the main ask from word order and syntax. E.g. "When is he available for full-time employment" asks about AVAILABILITY/start date, not work history. "What is his experience" asks about work history/experience.
- "When" + "available|start|begin" / "Wann" + "verfügbar|anfangen|beginnen" = availability. "What" + "experience|work history" / "Was" + "Erfahrung|Berufserfahrung" = experience. Do not conflate.
- For German, use correct syntax and vocabulary (e.g. Verfügbarkeit, Berufserfahrung, Anstellung).

RULES:
- Base answers on the CV. For jargon (ADDIE, SCORM, WCAG, DITA, LXD, etc.) explain briefly in plain language; you may use the [DICTIONARY DEFINITION] if provided.
- If asked about something not in the CV or definition, say you don't have that and suggest contacting Samuel: gideonsammysen@gmail.com or +49 171 5811680.
- Stay on topic: Samuel's skills, experience, education, portfolio, availability, personality, contact. Redirect off-topic gently.
- Vary tone: warm when appropriate, professional for recruiters. Use short paragraphs and lists when helpful.${definitionCtx}

[DETECTED INTENT from sentence structure: ${intent}]

--- CV DATA ---
${cvData}
--- END CV ---`;

        // Build messages: system + last 5 turns from history + new user message
        const maxHistory = 5;
        const recent = Array.isArray(history) ? history.slice(-maxHistory * 2) : [];
        const historyMessages = recent
          .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .map(m => ({ role: m.role, content: String(m.content).trim() }))
          .slice(-maxHistory * 2);

        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemContent },
              ...historyMessages,
              { role: 'user', content: message.trim() },
            ],
            max_tokens: 1024,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(28000),
        });
        
        if (!res.ok) {
          const err = await res.text();
          console.warn('OpenAI API error:', res.status, err);
          throw new Error('OpenAI request failed');
        }
        
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content?.trim();
        if (content) {
          return NextResponse.json({
            response: content,
            timestamp: new Date().toISOString(),
            confidence: 0.95,
            poweredBy: 'openai',
          });
        }
      } catch (e) {
        console.warn('LLM path failed, using rule-based fallback:', e?.message || e);
      }
    }
    
    // ——— Rule-based fallback when OPENAI_API_KEY is unset or LLM fails ———
    let response = '';
    let confidence = 0;
    
    // Yes/No responses for contradictory questions (highest priority - check first)
    
    // Roles Samuel is NOT - Explicit No responses
    if (matchesPattern(message, [
      /is.*he.*scientist|is.*samuel.*scientist|is.*scientist|he.*scientist|samuel.*scientist|ist.*er.*wissenschaftler|ist.*samuel.*wissenschaftler|ist.*wissenschaftler|er.*wissenschaftler|samuel.*wissenschaftler/i,
      /is.*he.*doctor|is.*samuel.*doctor|is.*he.*a.*doctor|is.*samuel.*a.*doctor|he.*doctor|samuel.*doctor|ist.*er.*arzt|ist.*samuel.*arzt|ist.*er.*ein.*arzt|ist.*samuel.*ein.*arzt|er.*arzt|samuel.*arzt|medizin|physician|doktor.*medizin/i,
      /is.*he.*software.*engineer|is.*samuel.*software.*engineer|is.*software.*engineer|he.*software.*engineer|samuel.*software.*engineer|ist.*er.*software.*ingenieur|ist.*samuel.*software.*ingenieur|ist.*software.*ingenieur|er.*software.*ingenieur|samuel.*software.*ingenieur/i,
      /is.*he.*developer|is.*samuel.*developer|is.*developer|he.*developer|samuel.*developer|web.*developer|app.*developer|software.*developer|ist.*er.*entwickler|ist.*samuel.*entwickler|ist.*entwickler|er.*entwickler|samuel.*entwickler|web.*entwickler|app.*entwickler|software.*entwickler/i,
      /is.*he.*programmer|is.*samuel.*programmer|is.*programmer|he.*programmer|samuel.*programmer|ist.*er.*programmierer|ist.*samuel.*programmierer|ist.*programmierer|er.*programmierer|samuel.*programmierer/i,
      /is.*he.*coder|is.*samuel.*coder|is.*coder|he.*coder|samuel.*coder|ist.*er.*programmierer|ist.*samuel.*programmierer/i,
      /is.*he.*data.*scientist|is.*samuel.*data.*scientist|is.*data.*scientist|he.*data.*scientist|samuel.*data.*scientist|ist.*er.*datenwissenschaftler|ist.*samuel.*datenwissenschaftler|ist.*datenwissenschaftler|er.*datenwissenschaftler|samuel.*datenwissenschaftler/i,
      /is.*he.*machine.*learning|is.*samuel.*machine.*learning|is.*machine.*learning|he.*machine.*learning|samuel.*machine.*learning|ml.*engineer|ist.*er.*maschinelles.*lernen|ist.*samuel.*maschinelles.*lernen/i,
      /is.*he.*ai.*engineer|is.*samuel.*ai.*engineer|is.*ai.*engineer|he.*ai.*engineer|samuel.*ai.*engineer|ist.*er.*ki.*ingenieur|ist.*samuel.*ki.*ingenieur/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Nein.** Samuel ist kein Wissenschaftler, Software-Ingenieur, Entwickler oder Programmierer. Er ist **Digital Learning Designer** (Instruktionsdesign) mit einer sekundären Spezialisierung in **Technical Writing**.\n\n✅ **Was Samuel IST:**\n• **Instructional Designer / Digital Learning Designer**\n• **Learning Experience Designer (LXD)**\n• **E-Learning Entwickler** (Articulate 360, SCORM)\n• **Technical Writer** (sekundär)\n\n❌ **Was Samuel NICHT ist:**\n• Software Engineer / Entwickler\n• Programmierer / Coder\n• Data Scientist / Datenwissenschaftler\n• ML/AI Engineer\n\n**Seine Expertise liegt in der Gestaltung von Lerninhalten und technischer Dokumentation, nicht in Software-Entwicklung oder Datenwissenschaft.**"
        : "**No.** Samuel is not a scientist, doctor, software engineer, developer, or programmer. He is a **Digital Learning Designer** (Instructional Design) with a secondary specialization in **Technical Writing**.\n\n✅ **What Samuel IS:**\n• **Instructional Designer / Digital Learning Designer**\n• **Learning Experience Designer (LXD)**\n• **E-Learning Developer** (Articulate 360, SCORM)\n• **Technical Writer** (secondary)\n\n❌ **What Samuel is NOT:**\n• Doctor / Physician / Medical Professional\n• Software Engineer / Developer\n• Programmer / Coder\n• Data Scientist\n• ML/AI Engineer\n\n**His expertise is in designing learning content and technical documentation, not software development, data science, or medicine.**";
    }
    
    // Can Samuel code? - Nuanced response
    else if (matchesPattern(message, [
      /can.*samuel.*code|can.*he.*code|does.*samuel.*code|does.*he.*code|samuel.*coding|he.*coding|kann.*samuel.*programmieren|kann.*er.*programmieren|programmiert.*samuel|programmiert.*er|can.*samuel.*program/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Kann Samuel programmieren?**\n\nSamuel hat **Grundkenntnisse in JavaScript, HTML und CSS**, die er hauptsächlich für Web-Dokumentation und sein Portfolio verwendet. Er ist jedoch **kein professioneller Programmierer oder Software-Entwickler**.\n\n💻 **Seine technischen Fähigkeiten:**\n• **JavaScript (Grundkenntnisse)** – Für interaktive Web-Elemente\n• **HTML & CSS** – Für Web-Dokumentation und Styling\n• **Markdown** – Für technische Dokumentation\n• **GitHub** – Für Versionskontrolle\n• **VS Code** – Als Entwicklungseditor\n\n**Wichtig:** Diese Kenntnisse dienen hauptsächlich der Unterstützung seiner Hauptarbeit als **Instructional Designer** und **Technical Writer** – nicht als Haupttätigkeit.\n\n**Sein Fokus liegt auf:**\n• E-Learning-Entwicklung (Articulate 360)\n• Technische Dokumentation\n• Content-Erstellung\n• Nicht auf Software-Entwicklung"
        : "**Can Samuel code?**\n\nSamuel knows **JavaScript basics along with CSS and HTML**, primarily used for web documentation and his portfolio. However, he is **not a professional programmer or software developer**.\n\n💻 **His technical skills:**\n• **JavaScript (basics)** – For interactive web elements\n• **HTML & CSS** – For web documentation and styling\n• **Markdown** – For technical documentation\n• **GitHub** – For version control\n• **VS Code** – As development editor\n\n**Important:** These skills primarily support his main work as an **Instructional Designer** and **Technical Writer** – not as a primary role.\n\n**His focus is on:**\n• E-learning development (Articulate 360)\n• Technical documentation\n• Content creation\n• Not software development";
    }
    
    // Roles Samuel IS aligned with - Explicit Yes responses
    else if (matchesPattern(message, [
      /is.*he.*instructional.*designer|is.*samuel.*instructional.*designer|is.*instructional.*designer|he.*instructional.*designer|samuel.*instructional.*designer|skilled.*instructional.*designer|good.*instructional.*designer|ist.*er.*instruktionsdesigner|ist.*samuel.*instruktionsdesigner|ist.*instruktionsdesigner|er.*instruktionsdesigner|samuel.*instruktionsdesigner|erfahren.*instruktionsdesigner|guter.*instruktionsdesigner/i,
      /is.*he.*learning.*designer|is.*samuel.*learning.*designer|is.*learning.*designer|he.*learning.*designer|samuel.*learning.*designer|digital.*learning.*designer|e-learning.*designer|ist.*er.*lerndesigner|ist.*samuel.*lerndesigner|ist.*lerndesigner|er.*lerndesigner|samuel.*lerndesigner|digital.*lerndesigner|e-learning.*designer/i,
      /is.*he.*lxd|is.*samuel.*lxd|is.*lxd|he.*lxd|samuel.*lxd|learning.*experience.*designer|learning.*experience.*design|ist.*er.*lxd|ist.*samuel.*lxd|ist.*lxd|er.*lxd|samuel.*lxd|lernexperience.*designer|lernexperience.*design/i,
      /is.*he.*l&d|is.*samuel.*l&d|is.*l&d|he.*l&d|samuel.*l&d|learning.*and.*development|can.*he.*do.*l&d|can.*he.*do.*lxd|can.*he.*l&d|can.*he.*lxd|ist.*er.*l&d|ist.*samuel.*l&d|ist.*l&d|er.*l&d|samuel.*l&d|kann.*er.*l&d|kann.*er.*lxd|kann.*er.*lernen.*und.*entwicklung/i,
      /is.*he.*e-learning|is.*samuel.*e-learning|is.*e-learning|he.*e-learning|samuel.*e-learning|ist.*er.*e-learning|ist.*samuel.*e-learning|ist.*e-learning|er.*e-learning|samuel.*e-learning/i,
      /is.*he.*technical.*writer|is.*samuel.*technical.*writer|is.*technical.*writer|he.*technical.*writer|samuel.*technical.*writer|ist.*er.*technischer.*schreiber|ist.*samuel.*technischer.*schreiber|ist.*technischer.*schreiber|er.*technischer.*schreiber|samuel.*technischer.*schreiber/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Ja.** Samuel ist ein **erfahrener Instructional Designer / Digital Learning Designer** mit starken Fähigkeiten in diesen Bereichen.\n\n✅ **Samuels Expertise:**\n• **Instructional Designer** – Primärfokus mit ADDIE, Bloom's Taxonomie\n• **Learning Experience Designer (LXD)** – Lernerzentrierte Design-Ansätze\n• **L&D (Learning & Development)** – Ja, dies entspricht genau seinem primären Karriereweg\n• **E-Learning Designer/Entwickler** – Articulate 360, SCORM, Moodle\n• **Technical Writer** – Sekundäre Spezialisierung\n\n**Kann er LXD oder L&D machen?** **Ja, absolut!** LXD (Learning Experience Design) und L&D (Learning & Development) sind beide Kernbereiche seines primären professionellen Fokus. Er hat:\n• 1+ Jahr Erfahrung in Digital Learning Design\n• Zertifizierung: Instructional Design Foundations & Applications (University of Illinois, 2025)\n• 25+ barrierefreie Lerninhalte erstellt\n• 50+ Bildungsressourcen strukturiert\n\n**Diese Rollen sind ideal für Samuel, da sie direkt zu seinem Instruktionsdesign-Hintergrund passen.**"
        : "**Yes.** Samuel is an **experienced Instructional Designer / Digital Learning Designer** with strong capabilities in these areas.\n\n✅ **Samuel's Expertise:**\n• **Instructional Designer** – Primary focus with ADDIE, Bloom's Taxonomy\n• **Learning Experience Designer (LXD)** – Learner-centered design approaches\n• **L&D (Learning & Development)** – Yes, this aligns exactly with his primary career path\n• **E-Learning Designer/Developer** – Articulate 360, SCORM, Moodle\n• **Technical Writer** – Secondary specialization\n\n**Can he do LXD or L&D?** **Yes, absolutely!** LXD (Learning Experience Design) and L&D (Learning & Development) are both core areas of his primary professional focus. He has:\n• 1+ year experience in Digital Learning Design\n• Certification: Instructional Design Foundations & Applications (University of Illinois, 2025)\n• Created 25+ accessible learning assets\n• Structured 50+ educational resources\n\n**These roles are ideal for Samuel, as they directly align with his instructional design background.**";
    }
    
    // Priority-based response system (check most specific first)
    
    // Primary role identity (highest priority - establishes hierarchy)
    if (topics.includes('role-primary') || matchesPattern(message, [
      /primary.*professional.*role|primary.*role|main.*role|primary.*focus|primary.*professional|primary.*career|haupt.*rolle|haupt.*beruf|primär.*rolle|primär.*fokus|primär.*karriere|haupt.*fokus|what.*primary|what.*main/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels primärer professioneller Fokus:**\n\nMein primärer professioneller Fokus liegt auf **Instruktionsdesign und Digital Learning Design**, bei dem ich lernerzentrierte E-Learning-Erfahrungen erstelle, die auf Pädagogik, Barrierefreiheit und messbaren Lernergebnissen basieren.\n\n🎓 **Kernkompetenzen:**\n• Instruktionsdesign mit ADDIE, Bloom's Taxonomie\n• E-Learning-Entwicklung (Articulate 360)\n• Learning Experience Design (LXD)\n• Curriculum-Entwicklung und Storyboarding\n• Lernanalysen und Bewertung\n• WCAG 2.1-konforme Module\n\nDies ist die Hauptrichtung meiner Karriere."
        : "**Samuel's Primary Professional Focus:**\n\nMy primary professional focus is **Instructional Design and Digital Learning Design**, creating learner-centered e-learning experiences grounded in pedagogy, accessibility, and measurable learning outcomes.\n\n🎓 **Core Competencies:**\n• Instructional design with ADDIE, Bloom's Taxonomy\n• E-learning development (Articulate 360)\n• Learning Experience Design (LXD)\n• Curriculum development and storyboarding\n• Learning analytics and assessment\n• WCAG 2.1-compliant modules\n\nThis is the main direction of my career.";
    }
    
    // Role prioritization (for recruiters)
    else if (topics.includes('role-prioritize') || matchesPattern(message, [
      /which.*priorit|which.*should|recruiter.*priorit|which.*role.*priorit|which.*should.*priorit|welche.*priorit|welche.*rolle.*priorit|welche.*sollte|recruiter.*soll/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Rollen-Priorisierung für Recruiter:**\n\n🎯 **Primäre Priorität:**\n**Instruktionsdesign, Digital Learning Design oder E-Learning-Entwicklung** sollten priorisiert werden. Das sind Samuels Hauptkompetenzen und Karriereziel.\n\n📝 **Sekundäre Option:**\n**Technical Writing und Dokumentationsspezialist-Rollen** sind eine starke sekundäre Option, insbesondere dort, wo Dokumentation, Lernen und Benutzerunterstützung sich überschneiden.\n\n**Verfügbarkeit:** Samuel ist verfügbar für Vollzeit-Rollen ab April/Mai 2026 (nach Abschluss des verpflichtenden Teils seiner Masterarbeit).\n\n**Kontakt:** gideonsammysen@gmail.com für Anfragen"
        : "**Role Prioritization for Recruiters:**\n\n🎯 **Primary Priority:**\n**Instructional Design, Digital Learning Design, or E-Learning Development** should be prioritized. These are Samuel's core competencies and career goals.\n\n📝 **Secondary Option:**\n**Technical Writing and Documentation Specialist roles** are a strong secondary option, particularly where documentation, learning, and user enablement intersect.\n\n**Availability:** Samuel is available for full-time roles starting April/May 2026 (after completing the mandatory part of his internship).\n\n**Contact:** gideonsammysen@gmail.com for inquiries";
    }
    
    // Secondary role - Technical Writing
    else if (topics.includes('role-secondary') || matchesPattern(message, [
      /do.*also.*technical|also.*work.*technical|technical.*writing.*role|documentation.*role|secondary|zweite.*rolle|sekundär|auch.*technical|auch.*technisches.*schreiben/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Technical Writing als sekundäre Spezialisierung:**\n\nJa. Neben Instruktionsdesign habe ich starke Erfahrung in **Technical Writing und Dokumentation**, einschließlich Benutzerhandbücher, API-Dokumentation und Wissensdatenbank-Entwicklung. Dies ist eine komplementäre sekundäre Spezialisierung.\n\n📝 **Technical Writing Fähigkeiten:**\n• Benutzerhandbücher & API-Dokumentation\n• Wissensdatenbank-Design (Notion)\n• Content-Lokalisierung (300+ Seiten Deutsch→Englisch)\n• DITA XML Dokumentation\n• Prozessdokumentation\n\n**Beziehung:** Technical Writing unterstützt Instruktionsdesign, indem es Dokumentationsqualität, Informationsarchitektur und Benutzerunterstützung stärkt."
        : "**Technical Writing as Secondary Specialization:**\n\nYes. Alongside instructional design, I have strong experience in **technical writing and documentation**, including user guides, API documentation, and knowledge base development. This is a complementary secondary specialization.\n\n📝 **Technical Writing Skills:**\n• User guides & API documentation\n• Knowledge base design (Notion)\n• Content localization (300+ pages German→English)\n• DITA XML documentation\n• Process documentation\n\n**Relationship:** Technical writing supports instructional design by strengthening documentation quality, information architecture, and user support.";
    }
    
    // Role relationship
    else if (topics.includes('role-relationship') || matchesPattern(message, [
      /how.*instructional.*technical|how.*relate|relationship.*between|wie.*zusammen|beziehung.*zwischen|wie.*verbunden|how.*connect/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Wie Instruktionsdesign und Technical Writing zusammenhängen:**\n\nInstruktionsdesign formt, **wie Menschen lernen**, während Technical Writing sich darauf konzentriert, **wie Menschen Systeme nutzen**. Mein Hintergrund ermöglicht es mir, sowohl Lernerfahrungen zu gestalten als auch Tools, Prozesse und Workflows klar und zugänglich zu dokumentieren.\n\n**Konvergenz in modernen Rollen:**\nModernes Instruktionsdesign überschneidet sich zunehmend mit Dokumentation, Onboarding und Produktlernen. Mein Portfolio spiegelt diese Konvergenz und meine Fähigkeit wider, in beiden Bereichen zu arbeiten.\n\n**Praxis:** Beide Bereiche ergänzen sich, um skalierbare Lernsysteme, Produktadoption und Benutzererfolg zu unterstützen."
        : "**How Instructional Design and Technical Writing Relate:**\n\nInstructional design shapes **how people learn**, while technical writing focuses on **how people use systems**. My background allows me to design learning experiences and also document tools, processes, and workflows clearly and accessibly.\n\n**Convergence in Modern Roles:**\nModern instructional design increasingly overlaps with documentation, onboarding, and product learning. My portfolio reflects this convergence and my ability to work across both domains.\n\n**In Practice:** Both areas complement each other to support scalable learning systems, product adoption, and user success.";
    }
    
    // Role switching question
    else if (topics.includes('role-switching') || matchesPattern(message, [
      /switching.*career|switching.*from|career.*change|switching.*to.*technical|karriere.*wechsel|wechsel.*von|wechsel.*karriere/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Karrierewechsel? Nein.**\n\nNein. Instruktionsdesign bleibt mein primärer Karriereweg. Technical Writing ergänzt diese Arbeit, indem es Dokumentationsqualität, Informationsarchitektur und Benutzerunterstützung stärkt.\n\n**Perspektive:** Ich sehe Technical Writing als eine wertvolle parallele Spezialisierung, die skalierbare Lernsysteme, Produktadoption und Benutzererfolg unterstützt – nicht als vorübergehende Beschäftigung.\n\n**Hauptziel:** Vollzeit-Rollen in Instruktionsdesign, Digital Learning Design oder E-Learning-Entwicklung ab April/Mai 2026 (nach Abschluss des verpflichtenden Teils meiner Masterarbeit)."
        : "**Switching Careers? No.**\n\nNo. Instructional design remains my primary career path. Technical writing complements this work by strengthening documentation quality, information architecture, and user support.\n\n**Perspective:** I see technical writing as a valuable parallel specialization that supports scalable learning systems, product adoption, and user success—not as a temporary pursuit.\n\n**Main Goal:** Full-time roles in Instructional Design, Digital Learning Design, or E-Learning Development starting April/May 2026 (after completing the mandatory part of my internship).";
    }
    
    // Team fit / Hybrid/Remote
    else if (topics.includes('team-fit') || matchesPattern(message, [
      /team|work.*with|types.*team|works.*best|hybrid|remote|on-site|art.*team|hybrid.*remote|remote.*work|on.*site|types.*teams/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Team-Fit und Arbeitsmodalitäten:**\n\n**Mit welchen Teams arbeite ich am besten?**\nSamuel arbeitet gut mit Lern- & Entwicklungsteams, HR, Produktteams, Fachexperten, Ingenieuren und Compliance-Stakeholdern zusammen – besonders in strukturierten, dokumentationsorientierten Umgebungen.\n\n**Arbeitsmodalitäten:**\n• **Vor-Ort** – Verfügbar in Deutschland (Lübeck/Marburg)\n• **Hybrid** – Flexible Kombination aus vor Ort und remote\n• **Remote** – Vollständig remote je nach Team-Bedarf und Projektstruktur\n\n**Verfügbar ab:** April/Mai 2026 für Vollzeit-Rollen (nach Abschluss des verpflichtenden Teils seiner Masterarbeit)"
        : "**Team Fit & Work Modalities:**\n\n**What types of teams do I work best with?**\nSamuel works well with learning & development teams, HR, product teams, SMEs, engineers, and compliance stakeholders—especially in structured, documentation-driven environments.\n\n**Work Modalities:**\n• **On-Site** – Available in Germany (Lübeck/Marburg)\n• **Hybrid** – Flexible combination of on-site and remote\n• **Remote** – Fully remote depending on team needs and project structure\n\n**Available from:** April/May 2026 for full-time roles (after completing the mandatory part of his internship).";
    }
    
    // Portfolio with link
    else if (topics.includes('portfolio') && matchesPattern(message, [
      /portfolio|see.*portfolio|view.*portfolio|portfolio.*link|portfolio.*url|show.*portfolio|link.*portfolio|zeige.*portfolio|portfolio.*zeigen|portfolio.*link|portfolio.*url/i
    ]) && !matchesPattern(message, [
      /sample|example|project|samples|examples|projekt|beispiel/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Portfolio:**\n\n**Portfolio-Website:**\n🔗 **https://vs-code-port1.vercel.app**\n\nDie Portfolio-Website enthält:\n• Interaktive E-Learning-Module mit Barrierefreiheits-Features\n• Technische Dokumentation (2FA Guides, API-Dokumentation)\n• Wissensdatenbanken (Klimawandel, Nachhaltigkeit)\n• Zweisprachige Unterstützung (EN/DE)\n• Erweiterte Barrierefreiheits-Funktionen\n\n**Weitere Portfolio-Links:**\n• GitHub Technical Writing Samples: https://github.com/Samuelsen1/Tech-Writing-Samples\n• Notion Knowledge Bases (siehe Portfolio-Website für Links)\n\n**Hinweis:** Die Portfolio-Website zeigt die Konvergenz zwischen Instruktionsdesign und Technical Writing, da modernes Instruktionsdesign zunehmend mit Dokumentation, Onboarding und Produktlernen überschneidet.\n\n**Für spezifische Projekt-Links fragen Sie:** 'Was sind einige Beispiele oder Samples?' oder 'Zeige mir Portfolio-Projekte mit Links'"
        : "**Samuel's Portfolio:**\n\n**Portfolio Website:**\n🔗 **https://vs-code-port1.vercel.app**\n\nThe portfolio website includes:\n• Interactive e-learning modules with accessibility features\n• Technical documentation (2FA guides, API documentation)\n• Knowledge bases (climate change, sustainability)\n• Bilingual support (EN/DE)\n• Advanced accessibility features\n\n**Additional Portfolio Links:**\n• GitHub Technical Writing Samples: https://github.com/Samuelsen1/Tech-Writing-Samples\n• Notion Knowledge Bases (see portfolio website for links)\n\n**Note:** The portfolio website demonstrates the convergence between instructional design and technical writing, as modern instructional design increasingly overlaps with documentation, onboarding, and product learning.\n\n**For specific project links, ask:** 'What are some examples or samples?' or 'Show me portfolio projects with links'";
    }
    
    // Portfolio projects (detailed) - includes specific links
    else if (topics.includes('portfolio') || matchesPattern(message, [
      /portfolio|project|work sample|example|showcase|demo|what.*built|what.*created|projekte|beispiele|projekt.*beispiele|was.*erstellt|was.*gebaut|portfolio.*projekte|showcase|which.*project|which.*represent|sample|examples|samples/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Portfolio-Highlights mit Links:**\n\n**Portfolio-Website:** https://vs-code-port1.vercel.app\n\n🎓 **E-Learning-Module (Primärfokus):**\n• **Plain Language & Inclusive Communication** – Interaktives Modul mit erweitertem Barrierefreiheits-Panel (WCAG 2.1)\n   🔗 https://plain-language-five.vercel.app\n• **Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)** – Schritt-für-Schritt-Anleitung\n   🔗 https://360.eu.articulate.com/review/content/8d8ac689-1670-458d-a7b3-0407850b55ef/review\n• **E-Learning Accessibility Best Practices** – Best Practices für barrierefreies Design\n\n📚 **Wissensdatenbanken (ADDIE-basiert):**\n• **LLMs, Sustainability and Climate Change** – Theoretisch vollständiger ADDIE-Leitfaden\n   🔗 https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d\n• **Climate Change Mitigation Guide** – Umfassende Bildungsressource\n   🔗 https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f\n\n📄 **Technische Dokumentation (Sekundärfokus):**\n• **Technical Documentation (GitHub)** – Postman API Guide & 2FA Knowledge Base\n   🔗 https://github.com/Samuelsen1/Sample-2\n• **Welth Health Platform** – DITA XML Dokumentation für Gesundheitsmanagement\n   🔗 https://github.com/Samuelsen1/Tech-Writing-Samples\n\n**Welche Projekte repräsentieren den Primärfokus?** Die interaktiven E-Learning-Module (z.B. Plain Language & Inclusive Communication), barrierefreiheitsfokussierten Lernprojekte und Instruktionsdesign-Fallstudien.\n\n**Welche Projekte zeigen Technical Writing?** Die API-Dokumentation, GitHub-Repositories und DITA XML-Projekte zeigen Technical Writing-Fähigkeiten."
        : "**Samuel's Portfolio Highlights with Links:**\n\n**Portfolio Website:** https://vs-code-port1.vercel.app\n\n🎓 **E-Learning Modules (Primary Focus):**\n• **Plain Language & Inclusive Communication** – Interactive module with advanced accessibility panel (WCAG 2.1)\n   🔗 https://plain-language-five.vercel.app\n• **Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)** – Step-by-step troubleshooting guide\n   🔗 https://360.eu.articulate.com/review/content/8d8ac689-1670-458d-a7b3-0407850b55ef/review\n• **E-Learning Accessibility Best Practices** – Best practices for accessible design\n\n📚 **Knowledge Bases (ADDIE-based):**\n• **LLMs, Sustainability and Climate Change** – Theoretically complete ADDIE-based guide\n   🔗 https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d\n• **Climate Change Mitigation Guide** – Comprehensive educational resource\n   🔗 https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f\n\n📄 **Technical Documentation (Secondary Focus):**\n• **Technical Documentation (GitHub)** – Postman API Guide & 2FA Knowledge Base\n   🔗 https://github.com/Samuelsen1/Sample-2\n• **Welth Health Platform** – DITA XML documentation for health management\n   🔗 https://github.com/Samuelsen1/Tech-Writing-Samples\n\n**Which projects represent the primary focus?** The interactive e-learning modules (e.g., Plain Language & Inclusive Communication), accessibility-focused learning projects, and instructional design case studies.\n\n**Which projects show technical writing capability?** The API documentation, GitHub repositories, and DITA XML projects demonstrate technical writing skills.";
    }
    
    // Digital Learning specific (high priority)
    // Do NOT trigger this block for pure education questions like "his education".
    if (
      (topics.includes('digital-learning') || matchesPattern(message, [
      /digital learning|e-learning|elearning|instructional design|learning design|lxd|curriculum|course design|learning experience|addie|bloom.*taxonom|articulate|storyline|rise|scorm|moodle|multimedia.*learning|interactive.*module|learning.*outcome|digitales lernen|instruktionsdesign|lerndesign|e-learning.*kompetenz|digital.*kompetenz|lern.*kompetenz|addie.*framework|bloom.*taxonomie/i
    ]))
      && !topics.includes('education')
      && !/\beducation\b|degree|university|studium|ausbildung|abschluss|bachelor|master/i.test(lowerMessage)
    ) {
      confidence = 1;
      response = isGerman 
        ? "**Samuels Digital Learning Design Kompetenzen:**\n\n🎓 **Instruktionsdesign & Methodik:**\n• **ADDIE-Framework** – Analyse, Design, Entwicklung, Implementierung, Evaluation\n• **Bloom's Taxonomie** – Strukturierung von Lernzielen und Assessment\n• **Adult Learning Theory** – Erwachsenenbildung und didaktische Prinzipien\n• **Storyboarding** – Entwicklung von Lernpfaden und interaktiven Szenarien\n• **Learning Experience Design (LXD)** – Benutzerzentriertes Design für Lernerfahrungen\n• **Curriculum Development** – Entwicklung von Lehrplänen und Kursstrukturen\n\n📊 **E-Learning-Entwicklung & Technologie:**\n• **Articulate 360** – Storyline (interaktive Module) und Rise (responsive Kurse)\n• **SCORM-Packaging** – Standardskonforme Lernmodul-Erstellung\n• **LMS-Administration** – Moodle, Kursverwaltung und Tracking\n• **Lernanalysen** – Messung von Lernergebnissen und Engagement\n• **Formative & summative Evaluation** – Kontinuierliche Verbesserung von Kursen\n\n🎨 **Multimedia-Erstellung & Content-Produktion:**\n• **Fotobearbeitung** – Infografiken, Poster, Flyer, Bildungsmaterialien (Adobe Photoshop)\n• **Videoerstellung & -bearbeitung** – Videoprojekte und Multimedia-Content (Adobe Premiere Pro)\n• **Layout-Design** – Professionelle Dokumente und Materialien (Adobe InDesign)\n• **Entwicklung interaktiver Module** – Gamification und Benutzerinteraktion\n\n♿ **Barrierefreiheit & Standards:**\n• **WCAG 2.1-Konformität** – Zugängliche Lernmaterialien für alle\n• **Inklusives Design** – Materialien für diverse Lerngruppen\n• **Plain Language Principles** – Klare, verständliche Kommunikation\n• **Ausrichtung auf Lernergebnisse** – Messbare Verbesserungen (40% Verbesserung dokumentiert)\n\n📈 **Erfolge & Impact:**\n• 25+ WCAG-konforme Multimedia-Assets erstellt\n• 50+ Bildungsressourcen strukturiert (200+ Lernende erreicht)\n• Lernverbesserungen von bis zu 40% dokumentiert\n\n**Zertifizierung:** Instructional Design Foundations & Applications – University of Illinois Urbana-Champaign (Aug 2025)"
        : "**Samuel's Digital Learning Design Competencies:**\n\n🎓 **Instructional Design & Methodology:**\n• **ADDIE Framework** – Analysis, Design, Development, Implementation, Evaluation\n• **Bloom's Taxonomy** – Learning objective structuring and assessment design\n• **Adult Learning Theory** – Adult education principles and pedagogical approaches\n• **Storyboarding** – Learning path development and interactive scenarios\n• **Learning Experience Design (LXD)** – User-centered design for learning experiences\n• **Curriculum Development** – Course structure and curriculum planning\n\n📊 **E-Learning Development & Technology:**\n• **Articulate 360** – Storyline (interactive modules) and Rise (responsive courses)\n• **SCORM Packaging** – Standards-compliant learning module creation\n• **LMS Administration** – Moodle, course management, and tracking\n• **Learning Analytics** – Outcome measurement and engagement tracking\n• **Formative & Summative Evaluation** – Continuous course improvement\n\n🎨 **Multimedia Creation & Content Production:**\n• **Photo Editing** – Infographics, posters, flyers, educational materials (Adobe Photoshop)\n• **Video Creation & Editing** – Video projects and multimedia content (Adobe Premiere Pro)\n• **Layout Design** – Professional documents and materials (Adobe InDesign)\n• **Interactive Module Development** – Gamification and user interaction\n\n♿ **Accessibility & Standards:**\n• **WCAG 2.1 Compliance** – Accessible learning materials for all\n• **Inclusive Design** – Materials for diverse learner groups\n• **Plain Language Principles** – Clear, understandable communication\n• **Learning Outcome Alignment** – Measurable improvements (40% improvement documented)\n\n📈 **Achievements & Impact:**\n• Created 25+ WCAG-compliant multimedia assets\n• Structured 50+ educational resources (reaching 200+ learners)\n• Documented learning improvements of up to 40%\n\n**Certification:** Instructional Design Foundations & Applications – University of Illinois Urbana-Champaign (Aug 2025)";
    }
    
    // Technical Writing specific (high priority)
    else if (topics.includes('technical-writing') || matchesPattern(message, [
      /technical writing|documentation|tech writer|api doc|user guide|knowledge base|technical competenc|writing skill|documentation skill|dita|xml.*doc|technisches schreiben|dokumentation|benutzerhandbuch|api.*dokumentation|wissensdatenbank|technische.*dokumentation|prozessdokumentation/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Technical Writing Kompetenzen:**\n\n📝 **Dokumentationstypen & Formate:**\n• **Benutzerhandbücher & Anleitungen** – Schritt-für-Schritt-Anleitungen (z.B. 2FA-Setup)\n• **API-Dokumentation** – REST APIs, Postman, Entwickler-Dokumentation\n• **Wissensdatenbank-Design** – Strukturierte Content-Systeme (Notion)\n• **Technische Spezifikationen** – Detaillierte technische Dokumentation\n• **Prozessdokumentation** – Workflows und Verfahrensbeschreibungen\n• **DITA XML** – Strukturierte XML-Dokumentation für technische Systeme\n• **Content-Lokalisierung** – Übersetzung und Anpassung (300+ Seiten Deutsch→Englisch)\n\n🏗️ **Informationsarchitektur & Strukturierung:**\n• **Inhaltsstrukturierung & -organisation** – Logische Hierarchien und Navigation\n• **Dokumentationsplanung** – Strategische Content-Entwicklung\n• **Benutzerzentrierter Designansatz** – Fokus auf Lesbarkeit und Verständlichkeit\n• **Querverweise & Navigation** – Verbesserte Benutzerführung\n• **Versionskontrolle** – GitHub für Dokumentationsmanagement\n• **Multi-Level-Strategien** – Anpassung an verschiedene Zielgruppen\n\n💻 **Technische Fähigkeiten & Tools:**\n• **Markdown, HTML, CSS** – Formatierung und Web-Dokumentation\n• **GitHub & VS Code** – Versionierung und Entwicklungsumgebung\n• **SCORM-Packaging** – Technische Standards für Lernmodule\n• **Web-Technologien** – Moderne Dokumentationsplattformen\n• **Notion, Figma** – Content-Management und Design-Tools\n\n♿ **Standards & Qualitätssicherung:**\n• **WCAG 2.1-Konformität** – Barrierefreie Dokumentation\n• **Plain Language Principles** – Klare, einfache Sprache\n• **Inklusives Design** – Zugängliche Content-Erstellung\n• **Konsistenz & Best Practices** – Einheitliche Dokumentationsstandards\n\n📚 **Portfolio-Beispiele:**\n• 2FA User Guide (Microsoft PDF Format)\n• Postman API Documentation Guide\n• Welth Health Platform (DITA XML)\n• Klimawandel-Wissensdatenbank (ADDIE-basiert)\n\n**Zertifizierungen:**\n• Technical Writing – Google Developers (Apr 2025)\n• Technical Writing – Board Infinity (Apr 2025)\n• Creating API Documentation – LinkedIn Learning (Mai 2025)"
        : "**Samuel's Technical Writing Competencies:**\n\n📝 **Documentation Types & Formats:**\n• **User Guides & Manuals** – Step-by-step instructions (e.g., 2FA setup)\n• **API Documentation** – REST APIs, Postman, developer documentation\n• **Knowledge Base Design** – Structured content systems (Notion)\n• **Technical Specifications** – Detailed technical documentation\n• **Process Documentation** – Workflows and procedure descriptions\n• **DITA XML** – Structured XML documentation for technical systems\n• **Content Localization** – Translation and adaptation (300+ pages German→English)\n\n🏗️ **Information Architecture & Structuring:**\n• **Content Structuring & Organization** – Logical hierarchies and navigation\n• **Documentation Planning** – Strategic content development\n• **User-Centered Design Approach** – Focus on readability and comprehension\n• **Cross-Referencing & Navigation** – Improved user guidance\n• **Version Control** – GitHub for documentation management\n• **Multi-Level Strategies** – Adaptation to different target audiences\n\n💻 **Technical Skills & Tools:**\n• **Markdown, HTML, CSS** – Formatting and web documentation\n• **GitHub & VS Code** – Versioning and development environment\n• **SCORM Packaging** – Technical standards for learning modules\n• **Web Technologies** – Modern documentation platforms\n• **Notion, Figma** – Content management and design tools\n\n♿ **Standards & Quality Assurance:**\n• **WCAG 2.1 Compliance** – Accessible documentation\n• **Plain Language Principles** – Clear, simple language\n• **Inclusive Design** – Accessible content creation\n• **Consistency & Best Practices** – Uniform documentation standards\n\n📚 **Portfolio Examples:**\n• 2FA User Guide (Microsoft PDF Format)\n• Postman API Documentation Guide\n• Welth Health Platform (DITA XML)\n• Climate Change Knowledge Base (ADDIE-based)\n\n**Certifications:**\n• Technical Writing – Google Developers (Apr 2025)\n• Technical Writing – Board Infinity (Apr 2025)\n• Creating API Documentation – LinkedIn Learning (May 2025)";
    }
    
    // Contact information
    else if (topics.includes('contact') || matchesPattern(message, [
      /contact|email|phone|reach|get in touch|how to reach|how.*contact|call|message|kontakt|erreichen|telefon|e-mail|kontaktdaten|wie.*kontaktieren|wie.*erreichen|anrufen|schreiben/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Kontaktinformationen für Samuel:**\n\n📧 **E-Mail:** gideonsammysen@gmail.com\n📱 **Telefon:** +49 171 5811680\n📍 **Standort:** Große Klosterkoppel 8, 23562 Lübeck\n\n💼 **LinkedIn:** [linkedin.com/in/samuel-o-4b9bbb2a8](https://www.linkedin.com/in/samuel-o-4b9bbb2a8)\n\n**Für:**\n• Berufliche Anfragen und Möglichkeiten\n• Freelance-Projekte\n• Zusammenarbeiten\n• Beratung zu Digital Learning oder Technical Writing\n\nSamuel freut sich über Ihre Nachricht! 😊"
        : "**Contact Information for Samuel:**\n\n📧 **Email:** gideonsammysen@gmail.com\n📱 **Phone:** +49 171 5811680\n📍 **Location:** Große Klosterkoppel 8, 23562 Lübeck\n\n💼 **LinkedIn:** [linkedin.com/in/samuel-o-4b9bbb2a8](https://www.linkedin.com/in/samuel-o-4b9bbb2a8)\n\n**For:**\n• Professional inquiries and opportunities\n• Freelance projects\n• Collaborations\n• Consultations on Digital Learning or Technical Writing\n\nSamuel looks forward to hearing from you! 😊";
    }
    
    // Availability (before Experience: "when is he available for full-time employment" = availability, not experience)
    else if (topics.includes('availability') || classifyIntent(message, language) === 'availability' || matchesPattern(message, [
      /when\s+(?:is\s+)?(?:he|samuel|sam)\s+available|when\s+can\s+(?:he|samuel|sam)\s+start|available\s+for\s+(?:full[- ]?time\s+)?(?:employment|work)|wann\s+(?:ist\s+)?(?:er|samuel)\s+verfügbar|ab\s+wann|wann\s+kann\s+(?:er|samuel)\s+anfangen|available|availability|start\s+date|when\s+can|free|hire|looking\s+for\s+work|verfügbar|verfügbarkeit|wann.*kann|freie.*zeit|sucht.*arbeit|offen.*für|Vollzeit|full[- ]?time/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Verfügbarkeit:**\n\n📅 **Vollzeit verfügbar ab:** April/Mai 2026 (nach Abschluss des verpflichtenden Teils seiner Masterarbeit)\n\n💼 **Aktuell verfügbar für:**\n• **Freelance-Projekte** – Digital Learning Design oder Technical Writing\n• **Teilzeit-Rollen** – Flexible Zusammenarbeit während des Studiums\n• **Beratungsaufträge** – Expertise in Barrierefreiheit und Instruktionsdesign\n\n**Kontakt:** gideonsammysen@gmail.com\n\n---\n\n💼 **Aktuell:** Global Academy – eLearning Developer (Praktikant) bei Dräger, Lübeck\n\n🎓 **Aktuell:** Master-Student an der Philipps-Universität Marburg (North American Studies, Medienwissenschaften)\n\n**Schwerpunkte:** Digital Learning Design, Technical Writing, Content-Lokalisierung, Barrierefreiheit"
        : "**Samuel's Availability:**\n\n📅 **Full-time available from:** April/May 2026 (after completing the mandatory part of his master's thesis requirements)\n\n💼 **Currently available for:**\n• **Freelance Projects** – Digital Learning Design or Technical Writing\n• **Part-Time Roles** – Flexible collaboration during studies\n• **Consultation Projects** – Expertise in accessibility and instructional design\n\n**Contact:** gideonsammysen@gmail.com\n\n---\n\n💼 **Current:** Global Academy – eLearning Developer (Intern) at Dräger, Lübeck\n\n🎓 **Currently:** Master's student at Philipps-Universität Marburg (North American Studies, Media Studies)\n\n**Focus Areas:** Digital Learning Design, Technical Writing, Content Localization, Accessibility";
    }
    
    // Experience/Work History (exclude when sentence clearly asks about availability: "when ... available", "available for employment")
    else if ((topics.includes('experience') || matchesPattern(message, [
      /experience|work history|work|job|career|employment|position|role|what.*done|what.*did|background|erfahrung|arbeit|beruf|karriere|position|was.*gemacht|was.*getan|berufsleben|laufbahn|was.*erfahren/i
    ])) && classifyIntent(message, language) !== 'availability' && !matchesPattern(message, [
      /when\s+(?:is\s+)?(?:he|samuel|sam)\s+available|when\s+can\s+(?:he|samuel|sam)\s+start|available\s+for\s+(?:full[- ]?time\s+)?(?:employment|work)|wann\s+(?:ist\s+)?(?:er|samuel)\s+verfügbar|ab\s+wann|wann\s+kann\s+(?:er|samuel)\s+anfangen/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Berufserfahrung im Überblick:**\n\n🎯 **Aktuell (seit Februar 2026):**\n**Global Academy – eLearning Developer (Praktikant)** bei **Dräger, Lübeck**\n• Mitwirkung an interaktiven E-Learning-Modulen (Articulate 360); Unterstützung bei Skript- und Storyboard-Revisionen für Klarheit und Konsistenz\n• Videoproduktion: Drehs, Schnitt und Audio-Optimierung mit Adobe Premiere Pro\n• KI-gestützte Übersetzungen von E-Learning-Modulen für mehrsprachige Zielgruppen\n• Übernahme kleinerer E-Learning-Projekte von Konzept bis Lieferung\n\n📚 **Zuletzt (Juni–November 2025):**\n**Digital Learning Designer (Praktikant)** bei **Tanz der Kulturen e.V., Hamburg**\n• **25+ barrierefreie Multimedia-Lerninhalte** gestaltet (Infografiken, Werbematerialien) nach WCAG 2.1-Standards, Erweiterung der Reichweite auf diverse Lerngruppen\n• **50+ Bildungsressourcen** kuratiert und strukturiert für transkulturelle Kunstpädagogik, Unterstützung von 200+ internationalen, kommunalen und ERASMUS-Lernenden\n• **300+ Seiten** deutscher Unterrichtsinhalte (z.B. 'Rituelle Tanz Pädagogik' Buch) ins Englische lokalisiert mit KI-gestützter Übersetzung unter Beibehaltung des natürlichen Flusses\n\n👨‍🏫 **Januar–Oktober 2023:**\n**Englischlehrer & Verwaltungsassistent** bei **Ghana National Service Scheme, Kumasi**\n• Englischunterricht entworfen und durchgeführt mit Lernzielen nach Bloom's Taxonomie\n• Verbesserung von Verständnis, Schreib- und Sprechfertigkeiten\n• Schülerfortschritt mittels formativer und summativer Methoden bewertet\n• Verwaltungsaufgaben verwaltet (Schülerakten, Zeitplanung, Korrespondenz)\n\n👨‍🏫 **Juni–Dezember 2021:**\n**Englischlehrassistent (Praktikant)** bei **Ghana Education Service, Kumasi**\n• **Box-Part-Letter-Handschriftmethode** entwickelt, die die Leistung von Erstklässlern um **40% verbesserte**\n• Unterrichtseinheiten durchgeführt mit Bewertungsstrategien und Unterrichtsstützung\n\n👨‍🏫 **Januar–Juni 2020:**\n**Englischlehrer (Arbeitender Student)** bei **Kovak Hill Educational Centre, Kumasi**\n• Unterrichtspläne nach ADDIE-Prinzipien entwickelt und durchgeführt\n• Übereinstimmung mit Lehrplannormen und Lernerbeteiligungsstrategien sichergestellt\n\n**Gesamt:** 1+ Jahr Digital Learning Design + 3+ Jahre Lehre"
        : "**Samuel's Professional Experience Overview:**\n\n🎯 **Current (February 2026 – Present):**\n**Global Academy – eLearning Developer (Intern)** at **Dräger, Lübeck**\n• Assist in producing interactive e-learning modules with Articulate 360; support script and storyboard revisions for clarity and consistency\n• Support end-to-end video production: shoots, editing, and audio optimisation with Adobe Premiere Pro\n• Use AI-powered tools for translated e-learning versions, improving reach across multilingual audiences\n• Take ownership of small-scale e-learning projects from concept through delivery\n\n📚 **Most Recent (June–November 2025):**\n**Digital Learning Designer (Intern)** at **Tanz der Kulturen e.V., Hamburg**\n• **Designed 25+ accessible multimedia learning assets** (infographics, promotional materials) in line with WCAG 2.1, expanding reach to diverse learner groups\n• **Curated and structured 50+ educational resources** for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners\n• **Localized 300+ pages** of German instructional content (e.g., 'Rituelle Tanz Pädagogik' book) into English using AI-assisted translation, preserving natural flow\n\n👨‍🏫 **January–October 2023:**\n**English Language Teacher & Administrative Assistant** at **Ghana National Service Scheme, Kumasi**\n• Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy\n• Enhanced comprehension, writing, and speaking skills\n• Assessed student progress using formative and summative methods\n• Managed administrative tasks (student records, scheduling, correspondence)\n\n👨‍🏫 **June–December 2021:**\n**English Language Teaching Assistant (Intern)** at **Ghana Education Service, Kumasi**\n• **Developed box-part-letter handwriting method** that improved first-year student performance by **40%**\n• Facilitated lessons integrating assessment strategies and instructional scaffolding\n\n👨‍🏫 **January–June 2020:**\n**English Language Teacher (Working Student)** at **Kovak Hill Educational Centre, Kumasi**\n• Developed and implemented lesson plans following ADDIE principles\n• Ensured alignment with curriculum standards and learner engagement strategies\n\n**Total:** 1+ year Digital Learning Design + 3+ years Teaching";
    }
    
    // Skills (general)
    else if (topics.includes('skills') || matchesPattern(message, [
      /\bskill|\babilities|\bexpertise|\bproficien|\bcapabilit|was kann|können|\bfähigkeit|\bkompetenz|seine.*kompetenz|seine.*fähigkeit|welche.*kompetenz|welche.*fähigkeit|können.*tun|was.*macht|womit.*arbeitet/i
    ])) {
      confidence = 0.9;
      response = isGerman
        ? "Samuel hat umfassende Expertise in **Digital Learning Design** und **Technical Writing**. Hier ist eine Übersicht:\n\n🎓 **Digital Learning Design:**\n• E-Learning-Entwicklung (Articulate 360, SCORM, Moodle)\n• Instruktionsdesign (ADDIE, Bloom's Taxonomie, Adult Learning Theory)\n• Multimedia-Erstellung (Video, Infografiken, Poster)\n• Lernanalysen & Bewertung (formative und summative Methoden)\n• Storyboarding und Curriculum-Entwicklung\n• Learning Experience Design (LXD)\n\n📝 **Technical Writing:**\n• Benutzerhandbücher & API-Dokumentation\n• Wissensdatenbank-Design (Notion)\n• Content-Lokalisierung (Deutsch-Englisch, 300+ Seiten)\n• Prozessdokumentation & technische Spezifikationen\n• DITA XML Dokumentation\n\n🛠️ **Werkzeuge & Technologien:**\n• **E-Learning:** Articulate 360, Moodle, SCORM\n• **Multimedia:** Adobe Premiere Pro, Photoshop, InDesign\n• **Design:** Figma\n• **Dokumentation:** Notion, GitHub, Markdown, HTML, CSS\n• **Entwicklung:** VS Code, Vercel, Web-Technologien\n\n♿ **Besonderheiten:**\n• WCAG 2.1-Konformität und inklusives Design\n• Plain Language Principles\n• Messbare Lernergebnisse (40% Verbesserung dokumentiert)\n\n💬 **Für detaillierte Informationen fragen Sie:**\n• 'Was sind seine Digital Learning Kompetenzen?'\n• 'Was sind seine Technical Writing Fähigkeiten?'\n• 'Welche Tools verwendet er?'"
        : "Samuel has comprehensive expertise in both **Digital Learning Design** and **Technical Writing**. Here's an overview:\n\n🎓 **Digital Learning Design:**\n• E-learning development (Articulate 360, SCORM, Moodle)\n• Instructional design (ADDIE, Bloom's Taxonomy, Adult Learning Theory)\n• Multimedia creation (video, infographics, posters)\n• Learning analytics & assessment (formative and summative methods)\n• Storyboarding and curriculum development\n• Learning Experience Design (LXD)\n\n📝 **Technical Writing:**\n• User guides & API documentation\n• Knowledge base design (Notion)\n• Content localization (German-English, 300+ pages)\n• Process documentation & technical specifications\n• DITA XML documentation\n\n🛠️ **Tools & Technologies:**\n• **E-Learning:** Articulate 360, Moodle, SCORM\n• **Multimedia:** Adobe Premiere Pro, Photoshop, InDesign\n• **Design:** Figma\n• **Documentation:** Notion, GitHub, Markdown, HTML, CSS\n• **Development:** VS Code, Vercel, Web technologies\n\n♿ **Specializations:**\n• WCAG 2.1 compliance and inclusive design\n• Plain Language Principles\n• Measurable learning outcomes (40% improvement documented)\n\n💬 **For detailed information, ask:**\n• 'What are his digital learning competencies?'\n• 'What are his technical writing skills?'\n• 'What tools does he use?'";
    }
    
    // Education
    else if (topics.includes('education') || matchesPattern(message, [
      /education|degree|university|academic|study|studied|school|master|bachelor|ausbildung|studium|universität|abschluss|promotion|studiert/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Ausbildung:**\n\n🎓 **Master in North American Studies (Medienwissenschaften)**\nPhilipps-Universität Marburg, Deutschland (Oktober 2023 – Aktuell)\n\n**Relevante Kurse:**\n• Medien, Visuelle Kunst\n• Wissenschaftliches Schreiben für Forschung\n• Umstrittene Nachhaltigkeit\n\n**Masterarbeit:**\n'KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen'\n\n**Fokus:** Analyse der Wechselwirkung zwischen Mensch und Technologie in digitalen Medien und Narrativen.\n\n---\n\n🎓 **Bachelor of Education in Englischer Sprache**\nUniversity of Cape Coast, Ghana (Oktober 2018 – Oktober 2022)\n**Abschluss:** CGPA 3.6/4.0 (≈ Deutsche Note 1.4 – Sehr gut)\n\n**Relevante Kurse:**\n• Pädagogische Psychologie\n• Lehrplanstudien (Curriculum Studies)\n• Bewertung & Evaluation (Assessment & Evaluation)\n• Erziehung von Personen mit vielfältigen Lernbedürfnissen\n• Forschungsmethoden in der Bildung\n• Bildungsstatistik\n• Sprachwissenschaften & Linguistik\n• Semantik & Übersetzung\n• Englisch in mehrsprachigen Kontexten\n\n**Pädagogischer Hintergrund:** Samuel's Bachelor-Abschluss in Englischer Bildung bildet die Grundlage für seine Instruktionsdesign-Expertise und Unterrichtserfahrung.\n\n**Kontinuierliche Weiterbildung:** Samuel hält seine Fähigkeiten durch aktuelle Zertifizierungen in Digital Learning Design und Technical Writing auf dem neuesten Stand."
        : "**Samuel's Education:**\n\n🎓 **Master's in North American Studies (Media Studies)**\nPhilipps-Universität Marburg, Germany (October 2023 – Present)\n\n**Relevant Courses:**\n• Media, Visual Art\n• Writing for Research\n• Contested Sustainability\n\n**Master's Thesis:**\n'AI as Reflection: Human-Technology Relationships in Digital Narratives'\n\n**Focus:** Analysis of the interplay between humans and technology in digital media and narratives.\n\n---\n\n🎓 **Bachelor of Education in English Language**\nUniversity of Cape Coast, Ghana (October 2018 – October 2022)\n**Degree:** CGPA 3.6/4.0 (≈ German 1.4 – Excellent)\n\n**Relevant Courses:**\n• Educational Psychology\n• Curriculum Studies\n• Assessment & Evaluation\n• Educating Individuals with Diverse Learning Needs\n• Research Methods in Education\n• Educational Statistics\n• Language & Linguistics\n• Semantics & Translation\n• English in Multilingual Contexts\n\n**Educational Foundation:** Samuel's Bachelor's degree in English Education forms the foundation for his instructional design expertise and teaching experience.\n\n**Continuous Learning:** Samuel keeps his skills current with recent certifications in Digital Learning Design and Technical Writing.";
    }
    
    // Portfolio/Projects (general overview – only when user is NOT explicitly asking for links)
    else if (
      (topics.includes('portfolio') || matchesPattern(message, [
        /portfolio|project|work sample|example|showcase|demo|what.*built|what.*created|projekte|beispiele|projekt.*beispiele|was.*erstellt|was.*gebaut|portfolio.*projekte|showcase/i
      ])) &&
      !matchesPattern(message, [
        /link|links|with link|mit link|mit links/i
      ])
    ) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Portfolio-Highlights:**\n\n📄 **Technische Dokumentation:**\n• **2FA User Guide** – Microsoft PDF-Format, praktische Anleitung\n• **Postman API Documentation Guide** – Entwickler-freundliche API-Dokumentation\n• **Welth Health Platform** – DITA XML-Dokumentation für Gesundheitsmanagement\n\n🎓 **E-Learning-Module:**\n• **Plain Language & Inclusive Communication** – Interaktives E-Learning-Modul mit erweitertem Barrierefreiheits-Panel (WCAG 2.1)\n• **Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)** – Schritt-für-Schritt-Anleitung\n• **E-Learning Accessibility Best Practices** – Best Practices für barrierefreies E-Learning\n\n📚 **Wissensdatenbanken & Content-Systeme:**\n• **ADDIE-basierte Dokumentation für LLMs & Nachhaltigkeit** – Theoretisch vollständiger Leitfaden\n• **Climate Change Mitigation Guide** – Umfassende Bildungsressource zu Klimawissenschaft\n• **Sustainability and Climate Change Knowledge Base** – Strukturierte Wissensdatenbank\n\n🌐 **Web-Projekte:**\n• **Persönliche Portfolio-Website** – Responsive, zweisprachig (EN/DE) mit erweiterten Barrierefreiheitsfunktionen\n• Dark/Light Theme Toggle\n• KI-Assistent mit zweisprachiger Unterstützung\n\n**Alle Projekte zeigen:** Benutzerzentriertes Design, WCAG 2.1-Konformität und messbare Ergebnisse."
        : "**Samuel's Portfolio Highlights:**\n\n📄 **Technical Documentation:**\n• **2FA User Guide** – Microsoft PDF format, practical setup guide\n• **Postman API Documentation Guide** – Developer-friendly API documentation\n• **Welth Health Platform** – DITA XML documentation for health management\n\n🎓 **E-Learning Modules:**\n• **Plain Language & Inclusive Communication** – Interactive e-learning module with advanced accessibility panel (WCAG 2.1)\n• **Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)** – Step-by-step troubleshooting guide\n• **E-Learning Accessibility Best Practices** – Best practices for accessible e-learning design\n\n📚 **Knowledge Bases & Content Systems:**\n• **ADDIE-based Documentation for LLMs & Sustainability** – Theoretically complete guide\n• **Climate Change Mitigation Guide** – Comprehensive educational resource on climate science\n• **Sustainability and Climate Change Knowledge Base** – Structured knowledge base system\n\n🌐 **Web Projects:**\n• **Personal Portfolio Website** – Responsive, bilingual (EN/DE) with advanced accessibility features\n• Dark/Light theme toggle\n• AI assistant with bilingual support\n\n**All projects demonstrate:** User-centered design, WCAG 2.1 compliance, and measurable outcomes.";
    }
    
    // Tools/Software
    else if (topics.includes('tools') || matchesPattern(message, [
      /tool|software|program|platform|articulate|adobe|figma|technology|tech stack|werkzeug|programme|welche.*tools|welche.*software|welche.*programme|mit.*arbeitet/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Werkzeuge & Technologien:**\n\n🎓 **E-Learning & LMS:**\n• **Articulate 360** – Storyline (interaktive Module), Rise (responsive Kurse)\n• **Moodle** – LMS-Administration und Kursverwaltung\n• **SCORM** – Verpackung und Standards für Lernmodule\n\n🎨 **Design & Multimedia:**\n• **Adobe Premiere Pro** – Videoerstellung, -bearbeitung und -produktion\n• **Adobe Photoshop** – Infografiken, Poster, Flyer, Bildbearbeitung\n• **Adobe InDesign** – Layout-Design für Dokumente und Materialien\n• **Figma** – UI/UX-Design und Prototyping\n\n📝 **Dokumentation & Content-Management:**\n• **Notion** – Wissensdatenbanken und strukturierte Content-Systeme\n• **Google Workspace** – Kollaborative Dokumentation\n• **Microsoft 365** – Dokumentenverwaltung\n• **Markdown, HTML, CSS** – Web-Dokumentation und Formatierung\n\n💻 **Entwicklung & Versionierung:**\n• **GitHub** – Versionskontrolle und Code-Management\n• **VS Code** – Entwicklungsumgebung\n• **Vercel** – Web-Deployment und Hosting\n• **Web-Technologien** – Moderne Web-Entwicklung\n\n**Lernbereitschaft:** Samuel erkundet kontinuierlich neue Tools und Technologien, um seine Fähigkeiten zu erweitern!"
        : "**Samuel's Tools & Technologies:**\n\n🎓 **E-Learning & LMS:**\n• **Articulate 360** – Storyline (interactive modules), Rise (responsive courses)\n• **Moodle** – LMS administration and course management\n• **SCORM** – Packaging and standards for learning modules\n\n🎨 **Design & Multimedia:**\n• **Adobe Premiere Pro** – Video creation, editing, and production\n• **Adobe Photoshop** – Infographics, posters, flyers, image editing\n• **Adobe InDesign** – Layout design for documents and materials\n• **Figma** – UI/UX design and prototyping\n\n📝 **Documentation & Content Management:**\n• **Notion** – Knowledge bases and structured content systems\n• **Google Workspace** – Collaborative documentation\n• **Microsoft 365** – Document management\n• **Markdown, HTML, CSS** – Web documentation and formatting\n\n💻 **Development & Versioning:**\n• **GitHub** – Version control and code management\n• **VS Code** – Development environment\n• **Vercel** – Web deployment and hosting\n• **Web Technologies** – Modern web development\n\n**Learning Mindset:** Samuel continuously explores new tools and technologies to expand his capabilities!";
    }
    
    // Certifications
    else if (topics.includes('certification') || matchesPattern(message, [
      /certificat|training|course|credential|certified|zertifikat|kurs|schulung|weiterbildung|qualifikation/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Zertifizierungen & Weiterbildung:**\n\n📜 **Digital Learning Design Foundations & Applications**\nUniversity of Illinois Urbana-Champaign (August 2025)\n\n📜 **Technical Writing Course**\nGoogle Developers (April 2025)\n\n📜 **Technical Writing Course**\nBoard Infinity (April 2025)\n\n📜 **Creating API Documentation**\nLinkedIn Learning (Mai 2025)\n\n📜 **EF SET English Certificate**\nC1 Advanced (67/100) (Februar 2025)\n\n**Hinweis:** Alle Zertifizierungen stammen aus 2025 und zeigen Samuels aktive Weiterentwicklung seiner Fähigkeiten in Digital Learning Design und Technical Writing. Er bleibt auf dem neuesten Stand der Branchentrends und Best Practices."
        : "**Samuel's Certifications & Training:**\n\n📜 **Digital Learning Design Foundations & Applications**\nUniversity of Illinois Urbana-Champaign (August 2025)\n\n📜 **Technical Writing Course**\nGoogle Developers (April 2025)\n\n📜 **Technical Writing Course**\nBoard Infinity (April 2025)\n\n📜 **Creating API Documentation**\nLinkedIn Learning (May 2025)\n\n📜 **EF SET English Certificate**\nC1 Advanced (67/100) (February 2025)\n\n**Note:** All certifications are from 2025, demonstrating Samuel's active skill development in Digital Learning Design and Technical Writing. He stays current with industry trends and best practices.";
    }
    
    // Languages
    else if (topics.includes('languages') || matchesPattern(message, [
      /language|speak|german|english|multilingual|bilingual|fluent|sprache|sprechen|mehrsprachig|welche.*sprache|welche.*sprachen|welche.*sprachen.*spricht/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Sprachen:**\n\n🗣️ **Englisch** – Muttersprache/Bilingual (C1 Advanced zertifiziert, 67/100)\n• Professionelle Kommunikation in Englisch\n• Technical Writing und Dokumentation auf Englisch\n• Unterrichtserfahrung in Englisch als Fremdsprache\n\n🗣️ **Deutsch** – B1 (Mittelstufe)\n• Lebt und studiert seit 2023 in Deutschland\n• Lokalisierungserfahrung: 300+ Seiten Deutsch→Englisch\n• Arbeitet aktiv daran, sein Deutsch zu verbessern\n\n🗣️ **Akan** – Fließend (Ghanaische Muttersprache)\n• Muttersprachliche Kenntnisse\n• Kulturelle Kommunikation\n\n**Lokalisierungserfahrung:** Samuel hat 300+ Seiten deutschen Unterrichtsinhalts ins Englische lokalisiert und dabei den natürlichen Fluss und die Stimme bewahrt. Diese Erfahrung zeigt seine Fähigkeit, zwischen Sprachen und Kulturen zu vermitteln."
        : "**Samuel's Languages:**\n\n🗣️ **English** – Native/Bilingual (C1 Advanced certified, 67/100)\n• Professional communication in English\n• Technical writing and documentation in English\n• Teaching experience in English as a foreign language\n\n🗣️ **German** – B1 (Intermediate)\n• Living and studying in Germany since 2023\n• Localization experience: 300+ pages German→English\n• Actively working to improve German proficiency\n\n🗣️ **Akan** – Fluent (Ghanaian native language)\n• Native-level proficiency\n• Cultural communication\n\n**Localization Experience:** Samuel has localized 300+ pages of German instructional content into English, preserving natural flow and voice. This experience demonstrates his ability to bridge languages and cultures.";
    }
    
    // Accessibility
    else if (topics.includes('accessibility') || matchesPattern(message, [
      /accessib|wcag|inclusive|universal design|a11y|barrierefreiheit|zugänglich|inklusion|wie.*barrierefrei/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Barrierefreiheits-Expertise:**\n\n♿ **WCAG 2.1-Konformität:**\n• Alle Projekte folgen den Web Content Accessibility Guidelines\n• Bildschirmleser-Kompatibilität\n• Tastaturnavigation-Unterstützung\n• Kontrastverhältnisse und lesbare Schriftgrößen\n• Alternative Texte für Bilder und Multimedia\n\n♿ **Inklusives Design:**\n• Materialien für diverse Zielgruppen nutzbar\n• Plain Language Principles – klare, einfache Sprache\n• Multiple Lernmodalitäten – visuell, auditiv, kinästhetisch\n• Kultursensible Anpassung von Inhalten\n\n♿ **Praktische Erfahrung:**\n• **25+ barrierefreie Dokumentations-Assets** erstellt nach WCAG 2.1\n• **Erweitertes Barrierefreiheits-Panel** in seinem Portfolio (10+ Funktionen)\n• **Mehrsprachiger Content** (Englisch, Deutsch) mit Barrierefreiheits-Features\n• **Zugängliche E-Learning-Module** mit Text-zu-Sprache, Fokusindikatoren und anpassbaren Anzeigeeinstellungen\n\n**Philosophie:** Barrierefreiheit ist keine Option – sie ist essentiell, um alle Lernenden zu erreichen. Samuel integriert Barrierefreiheit von Anfang an in jeden Projektprozess."
        : "**Samuel's Accessibility Expertise:**\n\n♿ **WCAG 2.1 Compliance:**\n• All projects follow Web Content Accessibility Guidelines\n• Screen reader compatibility\n• Keyboard navigation support\n• Contrast ratios and readable font sizes\n• Alternative text for images and multimedia\n\n♿ **Inclusive Design:**\n• Materials usable by diverse audiences\n• Plain Language Principles – clear, simple language\n• Multiple learning modalities – visual, auditory, kinesthetic\n• Culturally sensitive content adaptation\n\n♿ **Practical Experience:**\n• **Created 25+ accessible documentation assets** following WCAG 2.1\n• **Advanced accessibility panel** in his portfolio (10+ features)\n• **Multilingual content** (English, German) with accessibility features\n• **Accessible e-learning modules** with text-to-speech, focus indicators, and customizable display settings\n\n**Philosophy:** Accessibility is not optional—it's essential for reaching all learners. Samuel integrates accessibility from the start in every project process.";
    }
    
    // Location
    else if (topics.includes('location') || matchesPattern(message, [
      /where|location|based|live|city|country|germany|lübeck|marburg|ghana|wo|standort|wohnt|wo.*lebt|wo.*basiert/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "📍 **Samuels Standort:**\n\n**Aktuell basiert in:** Große Klosterkoppel 8, 23562 Lübeck\n\n🇩🇪 **In Deutschland seit:** 2023\n\n🎓 **Studiert an:** Philipps-Universität Marburg\n   (ca. 2,5 Stunden von Lübeck entfernt)\n\n💼 **Aktuelle Position:** Dräger, Lübeck (Global Academy – eLearning Developer Praktikant)\n\n🌍 **Hintergrund:**\n• Ursprünglich aus Ghana (Kumasi)\n• Lebt und studiert seit 2023 in Deutschland\n• Erfahrung mit internationaler Zusammenarbeit und multikulturellen Umgebungen\n\n**Offen für:**\n• Remote-Arbeit\n• Vor-Ort-Möglichkeiten in Deutschland\n• Reise für Projekte und Konferenzen\n\n**Kontakt:** +49 171 5811680 (Deutsche Telefonnummer)"
        : "📍 **Samuel's Location:**\n\n**Currently based in:** Große Klosterkoppel 8, 23562 Lübeck\n\n🇩🇪 **In Germany since:** 2023\n\n🎓 **Studying at:** Philipps-Universität Marburg\n   (approximately 2.5 hours from Lübeck)\n\n💼 **Current Position:** Dräger, Lübeck (Global Academy – eLearning Developer Intern)\n\n🌍 **Background:**\n• Originally from Ghana (Kumasi)\n• Living and studying in Germany since 2023\n• Experience with international collaboration and multicultural environments\n\n**Open to:**\n• Remote work\n• On-site opportunities in Germany\n• Travel for projects and conferences\n\n**Contact:** +49 171 5811680 (German phone number)";
    }
    
    // Personal attributes
    else if (topics.includes('personal') || matchesPattern(message, [
      /height|tall|personality|personal|hobbies|talent|about him|who is|character|persönlich|größe|hobbys|wer.*ist|über.*ihn|als.*person|wie.*ist/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Über Samuel:**\n\n👤 **Persönlichkeit:**\n• **Ruhig und beobachtend** – Analytisch und durchdacht in seiner Herangehensweise\n• **Empathisch** – Versteht die Bedürfnisse von Lernenden und Nutzern\n• **Neugierig** – Lernt aktiv neue Fähigkeiten und erkundet neue Technologien\n• **Reserviert aber freundlich** – Professionell und zugänglich\n• **Werteorientiert** – Konzentriert sich auf kontinuierliche Verbesserung und inklusives Design\n\n🎨 **Natürliche Talente:**\n• **Kreatives Zeichnen** – Visuelle Kreativität, die in Infografiken und Design-Assets zum Ausdruck kommt\n• **Natürlich beruhigende Singstimme** – Musikalische Sensibilität\n\n📏 **Größe:** 184cm\n\n💡 **Arbeitsansatz:**\nSamuel kombiniert technische Präzision mit kreativer Problemlösung. Er schätzt kontinuierliches Lernen, inklusives Design und messbare Ergebnisse. Seine multikulturelle Perspektive (Ghana → Deutschland) bereichert seine Fähigkeit, für diverse Zielgruppen zu kommunizieren und Inhalte zu erstellen.\n\n**Interessen:** Digitale Medien, Technologie-Mensch-Beziehungen (Masterarbeit), Nachhaltigkeit, Barrierefreiheit"
        : "**About Samuel:**\n\n👤 **Personality:**\n• **Quiet and Observant** – Analytical and thoughtful in approach\n• **Empathetic** – Understands the needs of learners and users\n• **Curious** – Actively learning new skills and exploring new technologies\n• **Reserved but Friendly** – Professional and approachable\n• **Value-Driven** – Focuses on continuous improvement and inclusive design\n\n🎨 **Natural Talents:**\n• **Creative Drawing** – Visual creativity that shows in infographics and design assets\n• **Naturally Soothing Singing Voice** – Musical sensitivity\n\n📏 **Height:** 184cm\n\n💡 **Work Approach:**\nSamuel combines technical precision with creative problem-solving. He values continuous learning, inclusive design, and measurable outcomes. His multicultural perspective (Ghana → Germany) enriches his ability to communicate and create content for diverse audiences.\n\n**Interests:** Digital media, human-technology relationships (Master's thesis focus), sustainability, accessibility";
    }
    
    // "Why" questions - provide explanations
    else if (topics.includes('why') && (topics.includes('digital-learning') || topics.includes('technical-writing') || topics.includes('accessibility'))) {
      confidence = 0.9;
      if (topics.includes('digital-learning')) {
        response = isGerman
          ? "**Warum ist Samuel gut in Digital Learning Design?**\n\nSamuel hat eine starke pädagogische Grundlage (Bachelor in Englischer Bildung, Master in Medienwissenschaften) kombiniert mit praktischer Erfahrung:\n\n🎓 **Theoretische Basis:**\n• Instruktionsdesign-Methodik (ADDIE, Bloom's Taxonomie)\n• Erwachsenenbildungstheorie\n• Lernpsychologie und Bewertung\n\n💼 **Praktische Erfahrung:**\n• **25+ WCAG-konforme Multimedia-Assets** erstellt\n• **50+ Bildungsressourcen** strukturiert (200+ Lernende erreicht)\n• **300+ Seiten** Content-Lokalisierung (Deutsch→Englisch)\n• **Messbare Ergebnisse:** 40% Verbesserung der Lernergebnisse dokumentiert\n\n🎯 **Kombinierte Expertise:**\nSeine Erfahrung in Unterricht (3+ Jahre) und Digital Learning Design (1+ Jahr) gibt ihm ein tiefes Verständnis dafür, wie Menschen lernen und wie man effektive E-Learning-Erfahrungen erstellt.\n\n**Zertifizierung:** Instructional Design Foundations & Applications – University of Illinois (2025)"
          : "**Why is Samuel good at Digital Learning Design?**\n\nSamuel has a strong pedagogical foundation (Bachelor's in English Education, Master's in Media Studies) combined with practical experience:\n\n🎓 **Theoretical Foundation:**\n• Instructional design methodology (ADDIE, Bloom's Taxonomy)\n• Adult learning theory\n• Learning psychology and assessment\n\n💼 **Practical Experience:**\n• **Created 25+ WCAG-compliant multimedia assets**\n• **Structured 50+ educational resources** (reaching 200+ learners)\n• **300+ pages** of content localization (German→English)\n• **Measurable Results:** Documented 40% improvement in learning outcomes\n\n🎯 **Combined Expertise:**\nHis experience in teaching (3+ years) and Digital Learning Design (1+ year) gives him deep understanding of how people learn and how to create effective e-learning experiences.\n\n**Certification:** Instructional Design Foundations & Applications – University of Illinois (2025)";
      } else if (topics.includes('technical-writing')) {
        response = isGerman
          ? "**Warum ist Samuel gut in Technical Writing?**\n\nSamuel kombiniert starke Schreibfähigkeiten mit technischem Verständnis und Benutzerzentriertheit:\n\n📝 **Schreib-Expertise:**\n• Englisch als Muttersprache (C1 Advanced zertifiziert)\n• Wissenschaftliches Schreiben (Masterstudium)\n• Unterrichtserfahrung verbessert Klarheit und Struktur\n\n🔧 **Technisches Verständnis:**\n• API-Dokumentation (Postman, REST APIs)\n• Markdown, HTML, CSS für Web-Dokumentation\n• GitHub für Versionskontrolle\n• SCORM-Packaging verstehen\n\n🎯 **Benutzerzentriertheit:**\nSein Instruktionsdesign-Hintergrund hilft ihm, technische Konzepte so zu erklären, dass Benutzer sie verstehen und anwenden können.\n\n📚 **Bewiesene Erfahrung:**\n• 300+ Seiten Content-Lokalisierung (Deutsch→Englisch)\n• 2FA User Guides, API-Dokumentation\n• Wissensdatenbank-Design (Notion)\n\n**Zertifizierungen:** Technical Writing – Google Developers & Board Infinity (2025)"
          : "**Why is Samuel good at Technical Writing?**\n\nSamuel combines strong writing skills with technical understanding and user-centeredness:\n\n📝 **Writing Expertise:**\n• Native English speaker (C1 Advanced certified)\n• Academic writing (Master's program)\n• Teaching experience enhances clarity and structure\n\n🔧 **Technical Understanding:**\n• API documentation (Postman, REST APIs)\n• Markdown, HTML, CSS for web documentation\n• GitHub for version control\n• Understanding of SCORM packaging\n\n🎯 **User-Centeredness:**\nHis instructional design background helps him explain technical concepts in ways users understand and can apply.\n\n📚 **Proven Experience:**\n• 300+ pages of content localization (German→English)\n• 2FA User Guides, API documentation\n• Knowledge base design (Notion)\n\n**Certifications:** Technical Writing – Google Developers & Board Infinity (2025)";
      } else {
        response = isGerman
          ? "**Warum ist Barrierefreiheit wichtig für Samuel?**\n\nSamuel glaubt, dass Barrierefreiheit essentiell ist, um **alle Lernenden zu erreichen** – nicht nur eine Option.\n\n♿ **Grundprinzipien:**\n• **Inklusivität:** Lernen sollte für alle zugänglich sein, unabhängig von Fähigkeiten oder Hintergründen\n• **WCAG 2.1-Konformität:** Einhaltung etablierter Standards\n• **Plain Language:** Klare, verständliche Kommunikation für diverse Zielgruppen\n\n💼 **Praktische Umsetzung:**\n• Alle Projekte folgen WCAG 2.1-Richtlinien\n• 25+ barrierefreie Assets erstellt\n• Erweitertes Barrierefreiheits-Panel im Portfolio\n• Mehrsprachiger Content mit Barrierefreiheits-Features\n\n**Philosophie:** Barrierefreiheit ist ein integraler Bestandteil von gutem Design – kein zusätzliches Feature, sondern eine Grundvoraussetzung."
          : "**Why is accessibility important to Samuel?**\n\nSamuel believes accessibility is essential to **reach all learners** – not just an option.\n\n♿ **Core Principles:**\n• **Inclusivity:** Learning should be accessible to all, regardless of abilities or backgrounds\n• **WCAG 2.1 Compliance:** Adherence to established standards\n• **Plain Language:** Clear, understandable communication for diverse audiences\n\n💼 **Practical Implementation:**\n• All projects follow WCAG 2.1 guidelines\n• Created 25+ accessible assets\n• Advanced accessibility panel in portfolio\n• Multilingual content with accessibility features\n\n**Philosophy:** Accessibility is an integral part of good design – not an add-on feature, but a fundamental requirement.";
      }
    }
    
    // "How" questions - provide process explanations
    else if (topics.includes('how') && (topics.includes('digital-learning') || topics.includes('technical-writing'))) {
      confidence = 0.9;
      if (topics.includes('digital-learning')) {
        response = isGerman
          ? "**Wie erstellt Samuel E-Learning-Module?**\n\nSamuel folgt einem strukturierten, benutzerzentrierten Prozess:\n\n1️⃣ **Analyse (ADDIE):**\n• Zielgruppenanalyse und Bedarfsermittlung\n• Lernziele definieren (Bloom's Taxonomie)\n• Technische Anforderungen prüfen\n\n2️⃣ **Design:**\n• Storyboarding und Curriculum-Planung\n• Interaktive Szenarien entwickeln\n• Barrierefreiheits-Features planen (WCAG 2.1)\n\n3️⃣ **Entwicklung:**\n• Articulate 360 (Storyline für interaktive Module, Rise für responsive Kurse)\n• Multimedia-Erstellung (Video mit Premiere Pro, Infografiken mit Photoshop)\n• SCORM-Packaging für LMS-Integration\n\n4️⃣ **Implementierung:**\n• LMS-Upload (z.B. Moodle)\n• Testing und Qualitätssicherung\n\n5️⃣ **Evaluation:**\n• Formative Bewertung während der Entwicklung\n• Summative Bewertung nach dem Launch\n• Kontinuierliche Verbesserung basierend auf Lernanalysen\n\n**Ergebnis:** Zugängliche, effektive E-Learning-Erfahrungen mit messbaren Lernergebnissen."
          : "**How does Samuel create e-learning modules?**\n\nSamuel follows a structured, user-centered process:\n\n1️⃣ **Analysis (ADDIE):**\n• Audience analysis and needs assessment\n• Define learning objectives (Bloom's Taxonomy)\n• Review technical requirements\n\n2️⃣ **Design:**\n• Storyboarding and curriculum planning\n• Develop interactive scenarios\n• Plan accessibility features (WCAG 2.1)\n\n3️⃣ **Development:**\n• Articulate 360 (Storyline for interactive modules, Rise for responsive courses)\n• Multimedia creation (video with Premiere Pro, infographics with Photoshop)\n• SCORM packaging for LMS integration\n\n4️⃣ **Implementation:**\n• LMS upload (e.g., Moodle)\n• Testing and quality assurance\n\n5️⃣ **Evaluation:**\n• Formative assessment during development\n• Summative assessment after launch\n• Continuous improvement based on learning analytics\n\n**Result:** Accessible, effective e-learning experiences with measurable learning outcomes.";
      } else {
        response = isGerman
          ? "**Wie erstellt Samuel technische Dokumentation?**\n\nSamuel nutzt einen strukturierten, benutzerzentrierten Ansatz:\n\n1️⃣ **Planung:**\n• Zielgruppenanalyse (Entwickler, Endbenutzer, Admin)\n• Dokumentationsstruktur definieren\n• Informationsarchitektur planen\n\n2️⃣ **Content-Entwicklung:**\n• Benutzerhandbücher: Schritt-für-Schritt-Anleitungen\n• API-Dokumentation: REST APIs, Postman\n• Wissensdatenbanken: Strukturierte Content-Systeme (Notion)\n• Plain Language Principles für Klarheit\n\n3️⃣ **Formatierung & Tools:**\n• Markdown, HTML, CSS für Web-Dokumentation\n• GitHub für Versionskontrolle\n• Notion für Wissensdatenbanken\n• DITA XML für strukturierte Dokumentation\n\n4️⃣ **Qualitätssicherung:**\n• WCAG 2.1-Konformität\n• Benutzer-Testing\n• Review und Iteration\n\n5️⃣ **Lokalisierung (falls benötigt):**\n• Übersetzung mit KI-Unterstützung\n• Natürlichen Fluss und Stimme bewahren\n• Kulturelle Anpassung\n\n**Ergebnis:** Klare, zugängliche technische Dokumentation, die Benutzer unterstützt."
          : "**How does Samuel create technical documentation?**\n\nSamuel uses a structured, user-centered approach:\n\n1️⃣ **Planning:**\n• Audience analysis (developers, end users, admins)\n• Define documentation structure\n• Plan information architecture\n\n2️⃣ **Content Development:**\n• User guides: Step-by-step instructions\n• API documentation: REST APIs, Postman\n• Knowledge bases: Structured content systems (Notion)\n• Plain Language Principles for clarity\n\n3️⃣ **Formatting & Tools:**\n• Markdown, HTML, CSS for web documentation\n• GitHub for version control\n• Notion for knowledge bases\n• DITA XML for structured documentation\n\n4️⃣ **Quality Assurance:**\n• WCAG 2.1 compliance\n• User testing\n• Review and iteration\n\n5️⃣ **Localization (if needed):**\n• Translation with AI assistance\n• Preserve natural flow and voice\n• Cultural adaptation\n\n**Result:** Clear, accessible technical documentation that supports users.";
      }
    }
    
    // Enhanced fallback - smarter context-aware responses
    else {
      // Check for partial topic matches to provide helpful responses
      let partialResponse = '';
      confidence = 0.4;
      
      // Extract key terms for partial matching
      const hasQuestionWord = /^(what|how|why|when|where|who|which|tell|explain|describe|share|show|can you|kannst|was|wie|warum|wann|wo|wer|welche|erzähl|erklär|beschreib|zeige|kannst.*du)/i.test(message.trim());
      
      // If it's a clear question but we couldn't match, try to provide a general helpful response
      if (hasQuestionWord) {
        // Check for any context clues
        if (matchesPattern(message, [/samuel|sam|him|his|ihm|sein|ihn/i])) {
          confidence = 0.6;
          response = isGerman
            ? "Ich kann Ihnen gerne über Samuel helfen! Es scheint, als hätten Sie eine spezifische Frage. Lassen Sie mich Ihnen helfen:\n\n**Samuel ist Experte in:**\n🎓 **Digital Learning Design** (Instruktionsdesign, E-Learning-Entwicklung, Articulate 360)\n📝 **Technical Writing** (API-Dokumentation, Benutzerhandbücher, Wissensdatenbanken)\n\n**Häufige Fragen:**\n• 'Was sind seine Hauptkompetenzen?' – Digital Learning Design & Technical Writing\n• 'Welche Erfahrung hat er?' – Über 1 Jahr Digital Learning Design + 3 Jahre Lehre\n• 'Wo ist er verfügbar?' – Vollzeit ab April/Mai 2026 (nach Abschluss des verpflichtenden Teils seiner Masterarbeit)\n• 'Wie kann ich ihn kontaktieren?' – gideonsammysen@gmail.com oder +49 171 5811680\n• 'Zeige mir sein Portfolio' – Projekte mit Links verfügbar\n\n**Könnten Sie Ihre Frage spezifizieren?** Zum Beispiel:\n• 'Erzähle mir über seine Digital Learning Erfahrung'\n• 'Was sind seine Technical Writing Fähigkeiten?'\n• 'Welche Tools verwendet er?'\n• 'Zeige mir Portfolio-Projekte mit Links'\n\nIch helfe gerne! 😊"
            : "I'd be happy to help you learn about Samuel! It seems like you have a specific question. Let me help:\n\n**Samuel is an expert in:**\n🎓 **Digital Learning Design** (Instructional Design, E-Learning Development, Articulate 360)\n📝 **Technical Writing** (API Documentation, User Guides, Knowledge Bases)\n\n**Common Questions:**\n• 'What are his core competencies?' – Digital Learning Design & Technical Writing\n• 'What experience does he have?' – Over 1 year Digital Learning Design + 3 years Teaching\n• 'When is he available?' – Full-time from April/May 2026 (after completing the mandatory part of his internship)\n• 'How can I contact him?' – gideonsammysen@gmail.com or +49 171 5811680\n• 'Show me his portfolio' – Projects with links available\n\n**Could you specify your question?** For example:\n• 'Tell me about his digital learning experience'\n• 'What are his technical writing skills?'\n• 'What tools does he use?'\n• 'Show me portfolio projects with links'\n\nI'm here to help! 😊";
        } else {
          // Very vague question - provide general context
          response = isGerman
            ? "Ich bin Samuels KI-Assistent und helfe gerne bei Fragen über ihn! Samuel ist ein **Digital Learning Designer** mit Expertise in **Technical Writing**, der lernerzentrierte E-Learning-Erfahrungen und technische Dokumentation erstellt.\n\n**Schnelle Fakten:**\n• **Primärer Fokus:** Instructional Design & Digital Learning Design\n• **Sekundärer Fokus:** Technical Writing & Dokumentation\n• **Verfügbar:** Vollzeit ab April/Mai 2026 (nach Abschluss des verpflichtenden Teils seiner Masterarbeit)\n• **Standort:** Große Klosterkoppel 8, 23562 Lübeck\n• **Kontakt:** gideonsammysen@gmail.com\n\n**Sie können mich fragen:**\n• Über seine Kompetenzen und Fähigkeiten\n• Über seine Berufserfahrung und Ausbildung\n• Über sein Portfolio und Projekte\n• Über Kontaktinformationen und Verfügbarkeit\n• Über seine Tools und Technologien\n\n**Beispiel-Fragen:**\n• 'Was sind Samuels Hauptkompetenzen?'\n• 'Erzähle mir über seine Erfahrung'\n• 'Zeige mir Portfolio-Projekte mit Links'\n• 'Wie kann ich Samuel kontaktieren?'\n\n**Was möchten Sie wissen?** 😊"
            : "I'm Samuel's AI assistant and I'm happy to help with questions about him! Samuel is a **Digital Learning Designer** with expertise in **Technical Writing**, creating learner-centered e-learning experiences and technical documentation.\n\n**Quick Facts:**\n• **Primary Focus:** Instructional Design & Digital Learning Design\n• **Secondary Focus:** Technical Writing & Documentation\n• **Available:** Full-time from April/May 2026 (after completing the mandatory part of his internship)\n• **Location:** Große Klosterkoppel 8, 23562 Lübeck\n• **Contact:** gideonsammysen@gmail.com\n\n**You can ask me about:**\n• His competencies and skills\n• His work experience and education\n• His portfolio and projects\n• Contact information and availability\n• His tools and technologies\n\n**Example Questions:**\n• 'What are Samuel's core competencies?'\n• 'Tell me about his experience'\n• 'Show me portfolio projects with links'\n• 'How can I contact Samuel?'\n\n**What would you like to know?** 😊";
        }
      } else {
        // Not a clear question - provide helpful suggestions
        response = isGerman
          ? "Ich kann Ihnen gerne über Samuel helfen! Hier sind einige Themen, über die ich sprechen kann:\n\n🎓 **Digital Learning Design:**\n• 'Was sind seine Digital Learning Kompetenzen?'\n• 'Welche E-Learning-Tools verwendet er?'\n• 'Erzähle mir über seine Instruktionsdesign-Erfahrung'\n• 'Wie verwendet er ADDIE und Bloom's Taxonomie?'\n\n📝 **Technical Writing:**\n• 'Was sind seine Technical Writing Fähigkeiten?'\n• 'Zeige mir sein Dokumentations-Portfolio'\n• 'Welche Tools verwendet er für Dokumentation?'\n• 'Wie lokalisiert er Content?'\n\n💼 **Allgemeine Informationen:**\n• 'Was ist seine Berufserfahrung?'\n• 'Welche Sprachen spricht er?'\n• 'Wie kann ich Samuel kontaktieren?'\n• 'Wo ist er stationiert?'\n• 'Ist er verfügbar für Projekte?'\n\n**Sie können auch fragen:**\n• 'Erzähle mir über sein Portfolio'\n• 'Welche Zertifizierungen hat er?'\n• 'Wie ist seine Erfahrung mit Barrierefreiheit?'\n• 'Warum ist er gut in Instructional Design?'\n• 'Wie erstellt er E-Learning-Module?'\n\n**Was möchten Sie über Samuel wissen?** 😊"
          : "I'd be happy to help you learn about Samuel! Here are some topics I can discuss:\n\n🎓 **Digital Learning Design:**\n• 'What are his digital learning competencies?'\n• 'What e-learning tools does he use?'\n• 'Tell me about his instructional design experience'\n• 'How does he use ADDIE and Bloom's Taxonomy?'\n\n📝 **Technical Writing:**\n• 'What are his technical writing skills?'\n• 'Show me his documentation portfolio'\n• 'What tools does he use for documentation?'\n• 'How does he localize content?'\n\n💼 **General Information:**\n• 'What's his work experience?'\n• 'What languages does he speak?'\n• 'How can I contact Samuel?'\n• 'Where is he based?'\n• 'Is he available for projects?'\n\n**You can also ask about:**\n• 'Tell me about his portfolio'\n• 'What certifications does he have?'\n• 'What's his experience with accessibility?'\n• 'Why is he good at instructional design?'\n• 'How does he create e-learning modules?'\n\n**What would you like to know about Samuel?** 😊";
      }
    }

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString(),
      confidence: confidence
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    const isGerman = language === 'de';
    return NextResponse.json({ 
      error: isGerman 
        ? 'Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie Samuel direkt unter gideonsammysen@gmail.com.'
        : 'Sorry, I encountered an error. Please try again or contact Samuel directly at gideonsammysen@gmail.com.'
    }, { status: 500 });
  }
}
