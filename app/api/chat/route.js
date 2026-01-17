import { NextResponse } from 'next/server';

// Samuel's comprehensive CV data
const cvData = `
SAMUEL AFRIYIE OPOKU
Digital Learning Designer | Technical Writer
Location: Große Klosterkoppel 8, 23562 Lübeck, Germany
Phone: +49 171 5811680
Email: gideonsammysen@gmail.com
LinkedIn: https://www.linkedin.com/in/samuel-o-4b9bbb2a8

PROFESSIONAL SUMMARY:
Digital Learning Designer with Technical Writing skills. Possesses a unique blend of instructional design expertise and documentation skills. Creates clear, accessible and engaging e-learning modules, as well as technical content — from user guides to comprehensive knowledge bases. Approach combines technical communication best practices with learning science (ADDIE, plain language principles) to deliver solutions that educate and empower users.

CORE COMPETENCIES:
- Documentation & Content Development: User Guides, Knowledge Base Design, Technical Specifications, Process Documentation, Content Localization
- E-Learning Authoring & LMS: Articulate 360 (Storyline, Rise), Moodle, SCORM
- Information Architecture: Content Structuring, Documentation Planning, User-Centered Design, Cross-Referencing, Version Control
- Technical Skills: Markdown, HTML, CSS, GitHub, VS Code, SCORM Packaging, Web Technologies
- Tools & Platforms: Notion, Adobe Creative Suite (Photoshop, InDesign, Premiere Pro), Figma, Articulate 360, Moodle, Google Workspace, Microsoft 365
- Accessibility & Standards: WCAG 2.1 Compliance, Inclusive Design, Plain Language Principles

EDUCATION:
- Master's in North American Studies (Media Studies) - Philipps-Universität Marburg, Germany (Oct 2023 – Present)
  Relevant Courses: Media, Visual Art, Writing for Research, Contested Sustainability
  Master's Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"
  
- Bachelor of Education in English Language (CGPA: 3.6/4.0 ≈ German 1.4) - University of Cape Coast, Ghana (Oct 2018 – Oct 2022)
  Relevant Courses: Educational Psychology, General Curriculum Studies, Assessment & Evaluation, Educating Individuals with Diverse Learning Needs, Research Methods in Education, Educational Statistics, Language & Linguistics, Semantics, Translation, English in Multilingual Contexts

PROFESSIONAL EXPERIENCE:

1. Online Training (Intern) (Starting Feb 2026) - Dräger, Lübeck
   - Will support script and content development for e-learning modules
   - Will contribute to video production, editing, and multimedia content creation
   - Will perform video editing with Adobe Premiere
   - Will develop independent documentation and instructional projects

2. Digital Learning Designer (Intern) (June 2025 – November 2025) - Tanz der Kulturen e.V., Hamburg
   - Designed 25+ accessible multimedia learning assets (infographics, promotional materials) in line with WCAG 2.1, expanding reach to diverse learner groups
   - Curated and structured 50+ educational resources for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners
   - Localized 300+ pages of German instructional content (e.g., Rituelle Tanz Pädagogik book) into English using AI-assisted translation, preserving natural flow

3. English Language Teacher & Administrative Assistant (Jan 2023 – Oct 2023) - Ghana National Service Scheme, Kumasi
   - Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy, enhancing comprehension, writing, and speaking skills
   - Assessed student progress using formative and summative methods to inform lesson adaptation
   - Managed administrative tasks, including student records, scheduling, and correspondence

4. English Language Teaching Assistant (Intern) (June 2021 – December 2021) - Ghana Education Service, Kumasi
   - Developed a box-part-letter handwriting method, improving first-year student performance by 40%
   - Facilitated lessons integrating assessment strategies and instructional scaffolding aligned to learning outcomes

5. English Language Teacher (Working Student) (Jan 2020 – June 2020) - Kovak Hill Educational Centre, Kumasi
   - Developed and implemented lesson plans following ADDIE principles, ensuring alignment with curriculum standards and learner engagement strategies

CERTIFICATIONS & TRAINING:
- Digital Learning Design Foundations & Applications – University of Illinois Urbana-Champaign (Aug 2025)
- Technical Writing Course – Board Infinity (Apr 2025)
- Technical Writing Course – Google Developers (Apr 2025)
- Creating API Documentation – LinkedIn Learning (May 2025)
- EF SET English Certificate – C1 Advanced (67/100) (Feb 2025)

PORTFOLIO HIGHLIGHTS:
Technical Documentation:
- 2FA User Guide (Microsoft PDF format)
- Postman API Documentation Guide
- Welth Health Platform (DITA XML)

E-Learning Modules:
- Plain Language & Inclusive Communication: Interactive E-Learning Module with advanced accessibility panel
- Practical Setup and Troubleshooting of Two-Factor Authentication (2FA)
- E-Learning Accessibility Best Practices

Knowledge Base & Content Systems:
- ADDIE-based Documentation for LLMs & Sustainability
- Climate Change Mitigation Guide
- Sustainability and Climate Change Knowledge Base

Web Project:
- Personal Portfolio Website: Responsive, bilingual (EN/DE) technical showcase with accessibility features

LANGUAGES:
- English – Native/Bilingual (C1 Advanced certified)
- German – B1 (Intermediate)
- Akan – Fluent

PERSONAL ATTRIBUTES:
- Height: 184cm
- Natural talents: Creativity in drawing, naturally soothing singing voice
- Personality: Quiet, observant, curious (actively digging for new skills), empathetic, reserved but friendly
`;

// Enhanced pattern matching with fuzzy logic
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

// Extract key topics from message
function extractTopics(message) {
  const topics = [];
  const lowerMessage = message.toLowerCase();
  
  const topicPatterns = {
    'digital-learning': [/digital learning|e-learning|elearning|instructional design|learning design|lxd|curriculum|course design|learning experience|addie|bloom|articulate|storyline|rise|scorm|moodle|lern.*design|instruktionsdesign|e-learning.*modul|kurse.*design/i],
    'technical-writing': [/technical writing|documentation|tech writer|api doc|user guide|knowledge base|technical competenc|writing skill|documentation skill|technisches schreiben|dokumentation|benutzerhandbuch|api.*dokumentation|wissensdatenbank/i],
    'experience': [/experience|work history|work|job|career|employment|position|role|what.*done|what.*did|background|erfahrung|arbeit|beruf|karriere|position|was.*gemacht|was.*getan/i],
    'education': [/education|degree|university|academic|study|studied|school|master|bachelor|ausbildung|studium|universität|abschluss|studium|promotion/i],
    'skills': [/skill|abilities|expertise|proficien|capabilit|was kann|können|fähigkeit|kompetenz|seine.*kompetenz|seine.*fähigkeit|welche.*kompetenz|welche.*fähigkeit|können.*tun/i],
    'contact': [/contact|email|phone|reach|get in touch|how to reach|kontakt|erreichen|telefon|e-mail|kontaktdaten|wie.*kontaktieren|wie.*erreichen/i],
    'portfolio': [/portfolio|project|work sample|example|showcase|demo|what.*built|what.*created|projekte|beispiele|projekt.*beispiele|was.*erstellt|was.*gebaut/i],
    'tools': [/tool|software|program|platform|articulate|adobe|figma|technology|tech stack|werkzeug|programme|welche.*tools|welche.*software/i],
    'certification': [/certificat|training|course|credential|certified|zertifikat|kurs|schulung|weiterbildung|qualifikation/i],
    'languages': [/language|speak|german|english|multilingual|bilingual|fluent|sprache|sprechen|mehrsprachig|welche.*sprache|welche.*sprachen/i],
    'accessibility': [/accessib|wcag|inclusive|universal design|a11y|barrierefreiheit|zugänglich|inklusion|wie.*barrierefrei/i],
    'availability': [/available|availability|start date|when can|free|hire|looking for work|verfügbar|verfügbarkeit|wann.*kann|freie.*zeit|sucht.*arbeit/i],
    'location': [/where|location|based|live|city|country|germany|lübeck|marburg|wo|standort|wohnt|wo.*lebt/i],
    'personal': [/height|tall|personality|personal|hobbies|talent|about him|who is|character|persönlich|größe|hobbys|wer.*ist|über.*ihn/i]
  };
  
  for (const [topic, patterns] of Object.entries(topicPatterns)) {
    if (matchesPattern(lowerMessage, patterns)) {
      topics.push(topic);
    }
  }
  
  return topics;
}

export async function POST(request) {
  try {
    const { message, language = 'en' } = await request.json();
    
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
    
    let response = '';
    let confidence = 0;
    
    // Priority-based response system (check most specific first)
    
    // Digital Learning specific (high priority)
    if (topics.includes('digital-learning') || matchesPattern(message, [
      /digital learning|e-learning|elearning|instructional design|learning design|lxd|curriculum|course design|learning experience|addie|bloom.*taxonom|articulate|storyline|rise|scorm|moodle|multimedia.*learning|interactive.*module|learning.*outcome|digitales lernen|instruktionsdesign|lerndesign|e-learning.*kompetenz|digital.*kompetenz|lern.*kompetenz|addie.*framework|bloom.*taxonomie/i
    ])) {
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
        ? "**Kontaktinformationen für Samuel:**\n\n📧 **E-Mail:** gideonsammysen@gmail.com\n📱 **Telefon:** +49 171 5811680\n📍 **Standort:** Lübeck, Deutschland\n   Adresse: Große Klosterkoppel 8, 23562 Lübeck\n\n💼 **LinkedIn:** [linkedin.com/in/samuel-o-4b9bbb2a8](https://www.linkedin.com/in/samuel-o-4b9bbb2a8)\n\n**Für:**\n• Berufliche Anfragen und Möglichkeiten\n• Freelance-Projekte\n• Zusammenarbeiten\n• Beratung zu Digital Learning oder Technical Writing\n\nSamuel freut sich über Ihre Nachricht! 😊"
        : "**Contact Information for Samuel:**\n\n📧 **Email:** gideonsammysen@gmail.com\n📱 **Phone:** +49 171 5811680\n📍 **Location:** Lübeck, Germany\n   Address: Große Klosterkoppel 8, 23562 Lübeck\n\n💼 **LinkedIn:** [linkedin.com/in/samuel-o-4b9bbb2a8](https://www.linkedin.com/in/samuel-o-4b9bbb2a8)\n\n**For:**\n• Professional inquiries and opportunities\n• Freelance projects\n• Collaborations\n• Consultations on Digital Learning or Technical Writing\n\nSamuel looks forward to hearing from you! 😊";
    }
    
    // Experience/Work History
    else if (topics.includes('experience') || matchesPattern(message, [
      /experience|work history|work|job|career|employment|position|role|what.*done|what.*did|background|erfahrung|arbeit|beruf|karriere|position|was.*gemacht|was.*getan|berufsleben|laufbahn|was.*erfahren/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Berufserfahrung im Überblick:**\n\n🎯 **Bevorstehend (Februar 2026):**\n**Online Training Praktikant** bei **Dräger, Lübeck**\n• E-Learning-Skript- und Storyboard-Entwicklung\n• Produktion interaktiver Module (Articulate 360)\n• Videoproduktion, -bearbeitung und -dreharbeiten (Adobe Premiere Pro)\n• Entwicklung unabhängiger Dokumentations- und Lehrprojekte\n\n📚 **Zuletzt (Juni–November 2025):**\n**Digital Learning Designer (Praktikant)** bei **Tanz der Kulturen e.V., Hamburg**\n• **25+ barrierefreie Multimedia-Lerninhalte** gestaltet (Infografiken, Werbematerialien) nach WCAG 2.1-Standards, Erweiterung der Reichweite auf diverse Lerngruppen\n• **50+ Bildungsressourcen** kuratiert und strukturiert für transkulturelle Kunstpädagogik, Unterstützung von 200+ internationalen, kommunalen und ERASMUS-Lernenden\n• **300+ Seiten** deutscher Unterrichtsinhalte (z.B. 'Rituelle Tanz Pädagogik' Buch) ins Englische lokalisiert mit KI-gestützter Übersetzung unter Beibehaltung des natürlichen Flusses\n\n👨‍🏫 **Januar–Oktober 2023:**\n**Englischlehrer & Verwaltungsassistent** bei **Ghana National Service Scheme, Kumasi**\n• Englischunterricht entworfen und durchgeführt mit Lernzielen nach Bloom's Taxonomie\n• Verbesserung von Verständnis, Schreib- und Sprechfertigkeiten\n• Schülerfortschritt mittels formativer und summativer Methoden bewertet\n• Verwaltungsaufgaben verwaltet (Schülerakten, Zeitplanung, Korrespondenz)\n\n👨‍🏫 **Juni–Dezember 2021:**\n**Englischlehrassistent (Praktikant)** bei **Ghana Education Service, Kumasi**\n• **Box-Part-Letter-Handschriftmethode** entwickelt, die die Leistung von Erstklässlern um **40% verbesserte**\n• Unterrichtseinheiten durchgeführt mit Bewertungsstrategien und Unterrichtsstützung\n\n👨‍🏫 **Januar–Juni 2020:**\n**Englischlehrer (Arbeitender Student)** bei **Kovak Hill Educational Centre, Kumasi**\n• Unterrichtspläne nach ADDIE-Prinzipien entwickelt und durchgeführt\n• Übereinstimmung mit Lehrplannormen und Lernerbeteiligungsstrategien sichergestellt\n\n**Gesamt:** 1+ Jahr Digital Learning Design + 3+ Jahre Lehre"
        : "**Samuel's Professional Experience Overview:**\n\n🎯 **Upcoming (February 2026):**\n**Online Training Intern** at **Dräger, Lübeck**\n• E-learning script and storyboard development\n• Interactive module production (Articulate 360)\n• Video production, editing, and shoots (Adobe Premiere Pro)\n• Independent documentation and instructional project development\n\n📚 **Most Recent (June–November 2025):**\n**Digital Learning Designer (Intern)** at **Tanz der Kulturen e.V., Hamburg**\n• **Designed 25+ accessible multimedia learning assets** (infographics, promotional materials) in line with WCAG 2.1, expanding reach to diverse learner groups\n• **Curated and structured 50+ educational resources** for multicultural art pedagogy, supporting 200+ international, community, and ERASMUS learners\n• **Localized 300+ pages** of German instructional content (e.g., 'Rituelle Tanz Pädagogik' book) into English using AI-assisted translation, preserving natural flow\n\n👨‍🏫 **January–October 2023:**\n**English Language Teacher & Administrative Assistant** at **Ghana National Service Scheme, Kumasi**\n• Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy\n• Enhanced comprehension, writing, and speaking skills\n• Assessed student progress using formative and summative methods\n• Managed administrative tasks (student records, scheduling, correspondence)\n\n👨‍🏫 **June–December 2021:**\n**English Language Teaching Assistant (Intern)** at **Ghana Education Service, Kumasi**\n• **Developed box-part-letter handwriting method** that improved first-year student performance by **40%**\n• Facilitated lessons integrating assessment strategies and instructional scaffolding\n\n👨‍🏫 **January–June 2020:**\n**English Language Teacher (Working Student)** at **Kovak Hill Educational Centre, Kumasi**\n• Developed and implemented lesson plans following ADDIE principles\n• Ensured alignment with curriculum standards and learner engagement strategies\n\n**Total:** 1+ year Digital Learning Design + 3+ years Teaching";
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
    
    // Portfolio/Projects
    else if (topics.includes('portfolio') || matchesPattern(message, [
      /portfolio|project|work sample|example|showcase|demo|what.*built|what.*created|projekte|beispiele|projekt.*beispiele|was.*erstellt|was.*gebaut|portfolio.*projekte|showcase/i
    ])) {
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
    
    // Availability
    else if (topics.includes('availability') || matchesPattern(message, [
      /available|availability|start date|when can|free|hire|looking for work|verfügbar|verfügbarkeit|wann.*kann|freie.*zeit|sucht.*arbeit|offen.*für/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "**Samuels Aktueller Status & Verfügbarkeit:**\n\n📅 **Bevorstehend (Februar 2026):**\nOnline Training Praktikant bei Dräger, Lübeck\n\n🎓 **Aktuell:**\nMaster-Student an der Philipps-Universität Marburg\nStudiengang: North American Studies (Medienwissenschaften)\n\n💼 **Für Möglichkeiten:**\nKontaktieren Sie Samuel unter gideonsammysen@gmail.com, um zu besprechen:\n\n• **Freelance-Projekte** – Digital Learning Design oder Technical Writing\n• **Teilzeit-Rollen** – Flexible Zusammenarbeit während des Studiums\n• **Zukünftige Vollzeit-Positionen** – Ab 2026 verfügbar\n• **Beratungsaufträge** – Expertise in Barrierefreiheit und Instruktionsdesign\n\n**Flexibilität:** Samuel ist offen für die Diskussion von Timing und Zusammenarbeit. Er passt sich gerne Ihren Projektanforderungen an.\n\n**Schwerpunkte:** Digital Learning Design, Technical Writing, Content-Lokalisierung, Barrierefreiheit"
        : "**Samuel's Current Status & Availability:**\n\n📅 **Upcoming (February 2026):**\nOnline Training Intern at Dräger, Lübeck\n\n🎓 **Currently:**\nMaster's student at Philipps-Universität Marburg\nProgram: North American Studies (Media Studies)\n\n💼 **For Opportunities:**\nContact Samuel at gideonsammysen@gmail.com to discuss:\n\n• **Freelance Projects** – Digital Learning Design or Technical Writing\n• **Part-Time Roles** – Flexible collaboration during studies\n• **Future Full-Time Positions** – Available from 2026\n• **Consultation Projects** – Expertise in accessibility and instructional design\n\n**Flexibility:** Samuel is open to discussing timing and collaboration. He's happy to adapt to your project requirements.\n\n**Focus Areas:** Digital Learning Design, Technical Writing, Content Localization, Accessibility";
    }
    
    // Location
    else if (topics.includes('location') || matchesPattern(message, [
      /where|location|based|live|city|country|germany|lübeck|marburg|ghana|wo|standort|wohnt|wo.*lebt|wo.*basiert/i
    ])) {
      confidence = 1;
      response = isGerman
        ? "📍 **Samuels Standort:**\n\n**Aktuell basiert in:** Lübeck, Deutschland\n**Adresse:** Große Klosterkoppel 8, 23562 Lübeck\n\n🇩🇪 **In Deutschland seit:** 2023\n\n🎓 **Studiert an:** Philipps-Universität Marburg\n   (ca. 2,5 Stunden von Lübeck entfernt)\n\n💼 **Bevorstehende Position:** Dräger, Lübeck (Februar 2026)\n\n🌍 **Hintergrund:**\n• Ursprünglich aus Ghana (Kumasi)\n• Lebt und studiert seit 2023 in Deutschland\n• Erfahrung mit internationaler Zusammenarbeit und multikulturellen Umgebungen\n\n**Offen für:**\n• Remote-Arbeit\n• Vor-Ort-Möglichkeiten in Deutschland\n• Reise für Projekte und Konferenzen\n\n**Kontakt:** +49 171 5811680 (Deutsche Telefonnummer)"
        : "📍 **Samuel's Location:**\n\n**Currently based in:** Lübeck, Germany\n**Address:** Große Klosterkoppel 8, 23562 Lübeck\n\n🇩🇪 **In Germany since:** 2023\n\n🎓 **Studying at:** Philipps-Universität Marburg\n   (approximately 2.5 hours from Lübeck)\n\n💼 **Upcoming Position:** Dräger, Lübeck (February 2026)\n\n🌍 **Background:**\n• Originally from Ghana (Kumasi)\n• Living and studying in Germany since 2023\n• Experience with international collaboration and multicultural environments\n\n**Open to:**\n• Remote work\n• On-site opportunities in Germany\n• Travel for projects and conferences\n\n**Contact:** +49 171 5811680 (German phone number)";
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
    
    // Default fallback - try to be helpful
    else {
      confidence = 0.5;
      response = isGerman
        ? "Ich kann Ihnen gerne über Samuel helfen! Hier sind einige Themen, über die ich sprechen kann:\n\n🎓 **Digital Learning Design:**\n• 'Was sind seine Digital Learning Kompetenzen?'\n• 'Welche E-Learning-Tools verwendet er?'\n• 'Erzähle mir über seine Instruktionsdesign-Erfahrung'\n• 'Wie verwendet er ADDIE und Bloom's Taxonomie?'\n\n📝 **Technical Writing:**\n• 'Was sind seine Technical Writing Fähigkeiten?'\n• 'Zeige mir sein Dokumentations-Portfolio'\n• 'Welche Tools verwendet er für Dokumentation?'\n• 'Wie lokalisiert er Content?'\n\n💼 **Allgemeine Informationen:**\n• 'Was ist seine Berufserfahrung?'\n• 'Welche Sprachen spricht er?'\n• 'Wie kann ich Samuel kontaktieren?'\n• 'Wo ist er stationiert?'\n• 'Ist er verfügbar für Projekte?'\n\n**Sie können auch fragen:**\n• 'Erzähle mir über sein Portfolio'\n• 'Welche Zertifizierungen hat er?'\n• 'Wie ist seine Erfahrung mit Barrierefreiheit?'\n\n**Was möchten Sie über Samuel wissen?** 😊"
        : "I'd be happy to help you learn about Samuel! Here are some topics I can discuss:\n\n🎓 **Digital Learning Design:**\n• 'What are his digital learning competencies?'\n• 'What e-learning tools does he use?'\n• 'Tell me about his instructional design experience'\n• 'How does he use ADDIE and Bloom's Taxonomy?'\n\n📝 **Technical Writing:**\n• 'What are his technical writing skills?'\n• 'Show me his documentation portfolio'\n• 'What tools does he use for documentation?'\n• 'How does he localize content?'\n\n💼 **General Information:**\n• 'What's his work experience?'\n• 'What languages does he speak?'\n• 'How can I contact Samuel?'\n• 'Where is he based?'\n• 'Is he available for projects?'\n\n**You can also ask about:**\n• 'Tell me about his portfolio'\n• 'What certifications does he have?'\n• 'What's his experience with accessibility?'\n\n**What would you like to know about Samuel?** 😊";
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
