import { NextResponse } from 'next/server';

// Samuel's CV data
const cvData = `
SAMUEL AFRIYIE OPOKU
Digital Learning Designer | Technical Writer
Location: Große Klosterkoppel 8, 23562 Lübeck, Germany
Phone: 01715811680
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

1. Praktikum Global Academy - Online Training (Starting Feb 2026) - Dräger, Lübeck
   - Will support script and content development for e-learning modules
   - Will contribute to video production, editing, and multimedia content creation
   - Will perform video editing with Adobe Premiere
   - Will develop independent documentation and instructional projects

2. Digital Learning Designer (Intern) (June 2025 – Nov 2025) - Tanz der Kulturen e.V. Hamburg
   - Created 25+ accessible documentation assets and instructional materials following WCAG 2.1 standards
   - Structured and organized 50+ educational resources for digital platforms, supporting 200+ users
   - Localized 300+ pages of German technical and instructional content into English using AI-assisted translation
   - Developed multimedia documentation, including infographics and visual guides

3. English Language Teacher & Administrative Assistant (Jan 2023 – Oct 2023) - Ghana National Service Scheme, Kumasi
   - Designed and delivered English lessons using Bloom's Taxonomy
   - Assessed student progress using formative and summative methods
   - Managed administrative tasks

4. English Language Teaching Assistant (Intern) (June 2021 – Dec 2021) - Ghana Education Service, Kumasi
   - Developed a box-part-letter handwriting method, improving first-year student performance by 40%
   - Facilitated lessons integrating assessment strategies

5. English Language Teacher (Working Student) (Jan 2020 – June 2020) - Kovak Hill Educational Centre, Kumasi
   - Developed and implemented lesson plans aligned with curriculum standards

CERTIFICATIONS & TRAINING:
- Technical Writing Course – Google Developers (April 3, 2025)
- Technical Writing Course – Board Infinity (April 2, 2025)
- Creating API Documentation – LinkedIn Learning (May 6, 2025)
- Instructional Design Foundations & Applications – University of Illinois Urbana-Champaign (Aug 14, 2025)
- EF SET English Certificate – C1 Advanced (67/100) (Feb 10, 2025)

PORTFOLIO HIGHLIGHTS:
Technical Documentation:
- 2FA User Guide (Microsoft PDF format)
- Postman API Documentation Guide

E-Learning Modules:
- Plain Language & Inclusive Communication: Interactive E-Learning Module with advanced accessibility panel
- 2FA Practical Setup & Troubleshooting

Knowledge Base & Content Systems:
- ADDIE-based Documentation for LLMs & Sustainability
- Sustainability and Climate Change Knowledge Base

Web Project:
- Personal Portfolio Website: Responsive, bilingual (EN/DE) technical showcase with accessibility features

LANGUAGES:
- English – Native/Bilingual
- German – B1 (Intermediate)
- Akan – Fluent

PERSONAL ATTRIBUTES:
- Height: 184cm
- Natural talents: Creativity in drawing, naturally soothing singing voice
- Personality: Quiet, observant, curious (actively digging for new skills), empathetic, reserved but friendly
`;

export async function POST(request) {
  try {
    const { message, language = 'en' } = await request.json();
    
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ 
        error: language === 'de' ? 'Bitte geben Sie eine Nachricht ein' : 'Please provide a message' 
      }, { status: 400 });
    }

    // Simple keyword-based responses
    const lowerMessage = message.toLowerCase();
    const isGerman = language === 'de';
    
    let response = '';
    
    // Personal info
    if (lowerMessage.match(/contact|email|phone|reach|get in touch|how to reach|kontakt|erreichen|telefon/i)) {
      response = isGerman 
        ? "Sie können Samuel erreichen unter:\n📧 E-Mail: gideonsammysen@gmail.com\n📱 Telefon: +49 171 5811680\n📍 Standort: Lübeck, Deutschland\n💼 LinkedIn: linkedin.com/in/samuel-o-4b9bbb2a8"
        : "You can reach Samuel at:\n📧 Email: gideonsammysen@gmail.com\n📱 Phone: +49 171 5811680\n📍 Location: Lübeck, Germany\n💼 LinkedIn: linkedin.com/in/samuel-o-4b9bbb2a8";
    }
    
    // Digital Learning specific skills/competencies
    else if (lowerMessage.match(/digital learning|e-learning|elearning|instructional design|learning design|lxd|curriculum|course design|learning experience|learning.*competenc|digitales lernen|instruktionsdesign|lerndesign|e-learning.*kompetenz|digital.*kompetenz|lern.*kompetenz/i)) {
      response = isGerman
        ? "**Samuels Digital Learning Kompetenzen:**\n\n🎓 **Instruktionsdesign:**\n• ADDIE-Methodik (Analyse, Design, Entwicklung, Implementierung, Evaluation)\n• Bloom's Taxonomie für Lernziele\n• Anwendung der Erwachsenenbildungstheorie\n• Storyboarding & Lehrplanentwicklung\n• Learning Experience Design (LXD)\n• Kompetenzbasiertes Design\n\n📊 **E-Learning-Entwicklung:**\n• Articulate 360 (Storyline & Rise)\n• SCORM-Verpackung & LMS-Administration\n• Lernanalysen & Ergebnismessung\n• Formative & summative Evaluation\n\n🎨 **Multimedia-Erstellung:**\n• Fotobearbeitung (Infografiken, Poster, Flyer, Karten)\n• Videoerstellung & -bearbeitung (Adobe Premiere Pro)\n• Entwicklung interaktiver Module\n\n♿ **Barrierefreiheit & Standards:**\n• WCAG 2.1-Konformität\n• Inklusive Designprinzipien\n• Ausrichtung auf Lernergebnisse\n\n**Zertifizierung:** Instructional Design Foundations & Applications – University of Illinois"
        : "**Samuel's Digital Learning Competencies:**\n\n🎓 **Instructional Design:**\n• ADDIE methodology (Analysis, Design, Development, Implementation, Evaluation)\n• Bloom's Taxonomy for learning objectives\n• Adult Learning Theory application\n• Storyboarding & curriculum development\n• Learning Experience Design (LXD)\n• Competency-based design\n\n📊 **E-Learning Development:**\n• Articulate 360 (Storyline & Rise)\n• SCORM packaging & LMS administration\n• Learning analytics & outcome measurement\n• Formative & summative evaluation\n\n🎨 **Multimedia Creation:**\n• Photo editing (infographics, posters, flyers, cards)\n• Video creation & editing (Adobe Premiere Pro)\n• Interactive module development\n\n♿ **Accessibility & Standards:**\n• WCAG 2.1 compliance\n• Inclusive design principles\n• Learning outcome alignment\n\n**Certification:** Instructional Design Foundations & Applications – University of Illinois";
    }
    
    // Technical Writing specific skills/competencies
    else if (lowerMessage.match(/technical writing|documentation|tech writer|api doc|user guide|knowledge base|technical competenc|writing skill|documentation skill|technisches schreiben|dokumentation|benutzerhandbuch/i)) {
      response = isGerman
        ? "**Samuels Technical Writing Kompetenzen:**\n\n📝 **Dokumentationstypen:**\n• Benutzerhandbücher & Anleitungen\n• API-Dokumentation (Postman, REST APIs)\n• Wissensdatenbank-Design (Notion)\n• Technische Spezifikationen\n• Prozessdokumentation\n• 2FA-Einrichtungsanleitungen\n\n🏗️ **Informationsarchitektur:**\n• Inhaltsstrukturierung & -organisation\n• Dokumentationsplanung\n• Benutzerzentrierter Designansatz\n• Querverweise & Navigation\n• Versionskontrolle (GitHub)\n\n💻 **Technische Fähigkeiten:**\n• Markdown, HTML, CSS\n• GitHub & VS Code\n• SCORM-Verpackung\n• Webtechnologien\n\n♿ **Standards & Qualität:**\n• WCAG 2.1-Konformität\n• Prinzipien der einfachen Sprache\n• Inklusives Design\n• Inhaltslokalisierung (Deutsch-Englisch, 300+ Seiten)\n\n**Zertifizierungen:**\n• Technical Writing – Google Developers\n• Technical Writing – Board Infinity\n• Creating API Documentation – LinkedIn Learning"
        : "**Samuel's Technical Writing Competencies:**\n\n📝 **Documentation Types:**\n• User Guides & Manuals\n• API Documentation (Postman, REST APIs)\n• Knowledge Base Design (Notion)\n• Technical Specifications\n• Process Documentation\n• 2FA Setup Guides\n\n🏗️ **Information Architecture:**\n• Content structuring & organization\n• Documentation planning\n• User-centered design approach\n• Cross-referencing & navigation\n• Version control (GitHub)\n\n💻 **Technical Skills:**\n• Markdown, HTML, CSS\n• GitHub & VS Code\n• SCORM packaging\n• Web technologies\n\n♿ **Standards & Quality:**\n• WCAG 2.1 compliance\n• Plain language principles\n• Inclusive design\n• Content localization (German-English, 300+ pages)\n\n**Certifications:**\n• Technical Writing – Google Developers\n• Technical Writing – Board Infinity\n• Creating API Documentation – LinkedIn Learning";
    }
    
    // General skills (when not specified)
    else if (lowerMessage.match(/\bskill|\babilities|\bexpertise|\bproficien|\bcapabilit|was kann|können|\bfähigkeit|\bkompetenz|seine.*kompetenz|seine.*fähigkeit|welche.*kompetenz|welche.*fähigkeit/i)) {
      response = isGerman
        ? "Samuel hat Expertise in **Digital Learning Design** und **Technical Writing**:\n\n🎓 **Digital Learning:**\n• E-Learning-Entwicklung (Articulate 360, SCORM, Moodle)\n• Instruktionsdesign (ADDIE, Bloom's Taxonomie)\n• Multimedia-Erstellung (Video, Infografiken)\n• Lernanalysen & Bewertung\n\n📝 **Technical Writing:**\n• Benutzerhandbücher & API-Dokumentation\n• Wissensdatenbank-Design\n• Inhaltslokalisierung (Deutsch-Englisch)\n• Prozessdokumentation\n\n🛠️ **Werkzeuge:**\n• Adobe Creative Suite (Premiere Pro, Photoshop, InDesign)\n• Articulate 360, Figma, Notion\n• HTML, CSS, Markdown, GitHub\n\n♿ **Barrierefreiheit:** WCAG 2.1-Konformität, inklusives Design\n\n💬 **Fragen Sie:** 'Was sind seine digitalen Lernkompetenzen?' oder 'Was sind seine Technical Writing Fähigkeiten?' für detaillierte Aufschlüsselungen!"
        : "Samuel has expertise in both **Digital Learning Design** and **Technical Writing**:\n\n🎓 **Digital Learning:**\n• E-learning development (Articulate 360, SCORM, Moodle)\n• Instructional design (ADDIE, Bloom's Taxonomy)\n• Multimedia creation (video, infographics)\n• Learning analytics & assessment\n\n📝 **Technical Writing:**\n• User guides & API documentation\n• Knowledge base design\n• Content localization (German-English)\n• Process documentation\n\n🛠️ **Tools:**\n• Adobe Creative Suite (Premiere Pro, Photoshop, InDesign)\n• Articulate 360, Figma, Notion\n• HTML, CSS, Markdown, GitHub\n\n♿ **Accessibility:** WCAG 2.1 compliance, inclusive design\n\n💬 **Ask me:** 'What are his digital learning competencies?' or 'What are his technical writing skills?' for detailed breakdowns!";
    }
    // Experience
    else if (lowerMessage.match(/experience|work history|work|job|career|employment|position|role|what.*done|what.*did|background|erfahrung|arbeit|beruf|karriere|position/i)) {
      response = isGerman
        ? "**Samuels Berufserfahrung:**\n\n🎯 **Bevorstehend (Feb 2026):**\nOnline Training Praktikant bei **Dräger, Lübeck**\n• E-Learning-Skript & Storyboard-Entwicklung\n• Produktion interaktiver Module (Articulate 360)\n• Videoproduktion, -bearbeitung & Dreharbeiten (Adobe Premiere)\n• Unabhängige E-Learning-Projekte\n\n📚 **Zuletzt (Juni-Nov 2025):**\nDigital Learning Designer bei **Tanz der Kulturen e.V., Hamburg**\n• 25+ WCAG 2.1-konforme Multimedia-Assets erstellt\n• 50+ Bildungsressourcen kuratiert (200+ Lernende)\n• 300+ Seiten lokalisiert (Deutsch→Englisch, KI-unterstützt)\n• Infografiken, Poster, Flyer für multikulturelle Pädagogik\n\n👨‍🏫 **2023:** Englischlehrer bei Ghana National Service Scheme\n• Unterrichtsdesign basierend auf Bloom's Taxonomie\n• Formative & summative Bewertung\n\n👨‍🏫 **2021:** Unterrichtsassistent - Ghana Education Service\n• Entwickelte Box-Part-Letter-Handschriftmethode (40% Verbesserung)\n\n**Gesamt:** 1+ Jahr Digital Learning + 3 Jahre Lehre"
        : "**Samuel's Professional Experience:**\n\n🎯 **Upcoming (Feb 2026):**\nOnline Training Intern at **Dräger, Lübeck**\n• E-learning script & storyboard development\n• Interactive module production (Articulate 360)\n• Video production, editing & shoots (Adobe Premiere)\n• Independent e-learning projects\n\n📚 **Most Recent (June-Nov 2025):**\nDigital Learning Designer at **Tanz der Kulturen e.V., Hamburg**\n• Created 25+ WCAG 2.1-compliant multimedia assets\n• Curated 50+ educational resources (200+ learners)\n• Localized 300+ pages (German→English, AI-assisted)\n• Infographics, posters, flyers for multicultural pedagogy\n\n👨‍🏫 **2023:** English Teacher at Ghana National Service Scheme\n• Bloom's Taxonomy-based lesson design\n• Formative & summative assessment\n\n👨‍🏫 **2021:** Teaching Assistant - Ghana Education Service\n• Developed box-part-letter handwriting method (40% improvement)\n\n**Total:** 1+ year digital learning + 3 years teaching";
    }
    
    // Education
    else if (lowerMessage.match(/education|degree|university|academic|study|studied|school|master|bachelor|ausbildung|studium|universität|abschluss/i)) {
      response = isGerman
        ? "**Samuels Ausbildung:**\n\n🎓 **Master in North American Studies (Medienwissenschaften)**\nPhilipps-Universität Marburg, Deutschland (Okt 2023 – Aktuell)\n• Kurse: Medien, Visuelle Kunst, Wissenschaftliches Schreiben, Umstrittene Nachhaltigkeit\n• Thesis: 'KI als Reflexion: Mensch-Technologie-Beziehungen in digitalen Narrativen'\n\n🎓 **Bachelor of Education in Englischer Sprache**\nUniversity of Cape Coast, Ghana (Okt 2018 – Okt 2022)\n• CGPA: 3.6/4.0 (≈ Deutsche Note 1.4 - Sehr gut)\n• Kurse: Pädagogische Psychologie, Lehrplanstudien, Bewertung & Evaluation, Diverse Lernbedürfnisse, Forschungsmethoden, Bildungsstatistik, Linguistik, Semantik, Übersetzung"
        : "**Samuel's Education:**\n\n🎓 **Master's in North American Studies (Media Studies)**\nPhilipps-Universität Marburg, Germany (Oct 2023 – Present)\n• Courses: Media, Visual Art, Writing for Research, Contested Sustainability\n• Thesis: 'AI as Reflection: Human-Technology Relationships in Digital Narratives'\n\n🎓 **Bachelor of Education in English Language**\nUniversity of Cape Coast, Ghana (Oct 2018 – Oct 2022)\n• CGPA: 3.6/4.0 (≈ German 1.4 - Excellent)\n• Courses: Educational Psychology, Curriculum Studies, Assessment & Evaluation, Diverse Learning Needs, Research Methods, Educational Statistics, Linguistics, Semantics, Translation";
    }
    
    // Certifications
    else if (lowerMessage.match(/certificat|training|course|credential|certified|zertifikat|kurs|schulung/i)) {
      response = "**Samuel's Certifications (All 2025):**\n\n📜 **Instructional Design Foundations & Applications**\nUniversity of Illinois Urbana-Champaign (Aug 14, 2025)\n\n📜 **Technical Writing Course**\nGoogle Developers (April 3, 2025)\n\n📜 **Technical Writing Course**\nBoard Infinity (April 2, 2025)\n\n📜 **Creating API Documentation**\nLinkedIn Learning (May 6, 2025)\n\n📜 **EF SET English Certificate**\nC1 Advanced (67/100) (Feb 10, 2025)\n\nAll recent certifications demonstrate active skill development!";
    }
    
    // Languages
    else if (lowerMessage.match(/language|speak|german|english|multilingual|bilingual|fluent|sprache|sprechen|mehrsprachig/i)) {
      response = "**Samuel's Languages:**\n\n🗣️ **English** – Native/Bilingual (C1 Advanced certified)\n🗣️ **German** – B1 Intermediate (living & studying in Germany)\n🗣️ **Akan** – Fluent (native Ghanaian language)\n\n**Localization Experience:**\n• Translated 300+ pages (German→English)\n• Cross-cultural content adaptation\n• Preserves natural flow & voice";
    }
    
    // Portfolio
    else if (lowerMessage.match(/portfolio|project|work sample|example|showcase|demo|what.*built|what.*created|projekte|beispiele/i)) {
      response = "**Samuel's Portfolio:**\n\n📄 **Technical Documentation:**\n• 2FA User Guide (Microsoft PDF)\n• Postman API Documentation Guide\n\n🎓 **E-Learning Modules:**\n• Plain Language & Inclusive Communication (with advanced accessibility panel)\n• 2FA Practical Setup & Troubleshooting\n\n📚 **Knowledge Bases:**\n• ADDIE-based Documentation for LLMs & Sustainability\n• Sustainability and Climate Change Knowledge Base\n\n🌐 **Web Development:**\n• Responsive bilingual portfolio (EN/DE)\n• Dark/light theme toggle\n• Advanced accessibility panel (WCAG 2.1)\n\nAll projects demonstrate user-centered design & accessibility standards.";
    }
    
    // Tools
    else if (lowerMessage.match(/tool|software|program|platform|articulate|adobe|figma|technology|tech stack|werkzeug|programme/i)) {
      response = "**Samuel's Tool Proficiency:**\n\n🎓 **E-Learning:**\n• Articulate 360 (Storyline, Rise)\n• Moodle, SCORM packaging\n\n🎨 **Design & Multimedia:**\n• Adobe Premiere Pro (video editing)\n• Adobe Photoshop (infographics, posters)\n• Adobe InDesign (layout design)\n• Figma (UI/UX)\n\n� **Web & Development:**\n• HTML, CSS, Markdown\n• GitHub, VS Code\n• Vercel deployment\n\n� **Documentation:**\n• Notion (knowledge bases)\n• Google Workspace\n• Microsoft 365\n\n**Learning:** Always exploring new tools!";
    }
    
    // Availability
    else if (lowerMessage.match(/available|availability|start date|when can|free|hire|looking for work|verfügbar|verfügbarkeit|wann/i)) {
      response = "**Samuel's Current Status:**\n\n📅 **Starting Feb 2026:** Online Training Internship at Dräger, Lübeck\n🎓 **Currently:** Master's student at Philipps-Universität Marburg\n\n💼 **For opportunities:**\nContact gideonsammysen@gmail.com to discuss:\n• Freelance projects\n• Part-time roles\n• Future full-time positions\n\nFlexible and open to discussing timing!";
    }
    
    // Location
    else if (lowerMessage.match(/where|location|based|live|city|country|germany|lübeck|wo|standort|wohnt/i)) {
      response = "📍 **Samuel's Location:**\n\nBased in **Lübeck, Germany**\nAddress: Große Klosterkoppel 8, 23562 Lübeck\n\n🇩🇪 Living in Germany since 2023\n🎓 Studying at Philipps-Universität Marburg\n💼 Upcoming position at Dräger (Lübeck)\n\nOpen to remote work and on-site opportunities in Germany!";
    }
    
    // Personal
    else if (lowerMessage.match(/height|tall|personality|personal|hobbies|talent|about him|who is|character|persönlich|größe|hobbys/i)) {
      response = "**About Samuel:**\n\n👤 **Personality:**\n• Quiet, observant, empathetic\n• Curious (actively learning new skills)\n• Reserved but friendly\n\n🎨 **Natural Talents:**\n• Creative drawing\n• Naturally soothing singing voice\n\n📏 **Height:** 184cm\n\n💡 **Approach:**\nCombines technical precision with creative problem-solving. Values continuous learning and inclusive design.";
    }
    
    // Accessibility
    else if (lowerMessage.match(/accessib|wcag|inclusive|universal design|a11y|barrierefreiheit|zugänglich/i)) {
      response = "**Samuel's Accessibility Expertise:**\n\n♿ **WCAG 2.1 Compliance:**\n• All projects follow Web Content Accessibility Guidelines\n• Screen reader compatibility\n• Keyboard navigation support\n\n♿ **Inclusive Design:**\n• Content usable by diverse audiences\n• Plain language principles\n• Multiple learning modalities\n\n♿ **Practical Experience:**\n• Created 25+ accessible documentation assets\n• Advanced accessibility panel in portfolio\n• Multilingual content (English, German)\n\n**Philosophy:** Accessibility is not optional—it's essential for reaching all learners.";
    }
    
    // Greeting
    else if (lowerMessage.match(/hello|hi|hey|greetings|good morning|good afternoon|hallo|guten tag|guten morgen|moin/i)) {
      response = isGerman
        ? "Hallo! 👋 Ich bin Samuels KI-Assistent.\n\nIch kann Fragen beantworten über:\n\n🎓 **Digital Learning Design**\n• E-Learning-Entwicklung & ADDIE\n• Instruktionsdesign & Lehrplangestaltung\n• Multimedia-Erstellung\n\n📝 **Technical Writing**\n• Benutzerhandbücher & API-Dokumentation\n• Wissensdatenbanken\n• Inhaltslokalisierung\n\n💼 **Berufliche Informationen**\n• Erfahrung & Ausbildung\n• Portfolio & Zertifikate\n• Kontakt & Verfügbarkeit\n\n**Fragen Sie:** 'Was sind seine digitalen Lernkompetenzen?' oder 'Zeige mir seine Technical Writing Fähigkeiten!'"
        : "Hello! 👋 I'm Samuel's AI assistant.\n\nI can answer questions about:\n\n🎓 **Digital Learning Design**\n• E-learning development & ADDIE\n• Instructional design & curriculum\n• Multimedia creation\n\n📝 **Technical Writing**\n• User guides & API docs\n• Knowledge bases\n• Content localization\n\n💼 **Professional Info**\n• Experience & education\n• Portfolio & certifications\n• Contact & availability\n\n**Try asking:** 'What are his core digital learning competencies?' or 'Show me his technical writing skills!'";
    }
    
    // Default
    else {
      response = isGerman
        ? "Ich kann Ihnen über Samuel helfen! Fragen Sie:\n\n🎓 **Digital Learning:**\n• 'Was sind seine digitalen Lernkompetenzen?'\n• 'Welche E-Learning-Tools benutzt er?'\n• 'Erzähle mir über seine Instruktionsdesign-Erfahrung'\n\n📝 **Technical Writing:**\n• 'Was sind seine Technical Writing Fähigkeiten?'\n• 'Zeige mir sein Dokumentations-Portfolio'\n• 'Welche Tools benutzt er für Dokumentation?'\n\n💼 **Allgemein:**\n• 'Was ist seine Berufserfahrung?'\n• 'Welche Sprachen spricht er?'\n• 'Wie kann ich Samuel kontaktieren?'\n\nWas möchten Sie wissen?"
        : "I can help you learn about Samuel! Try asking:\n\n🎓 **Digital Learning:**\n• 'What are his digital learning competencies?'\n• 'What e-learning tools does he use?'\n• 'Tell me about his instructional design experience'\n\n📝 **Technical Writing:**\n• 'What are his technical writing skills?'\n• 'Show me his documentation portfolio'\n• 'What tools does he use for documentation?'\n\n💼 **General:**\n• 'What's his work experience?'\n• 'What languages does he speak?'\n• 'How can I contact Samuel?'\n\nWhat would you like to know?";
    }

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ 
      error: 'Sorry, I encountered an error. Please try again.' 
    }, { status: 500 });
  }
}
