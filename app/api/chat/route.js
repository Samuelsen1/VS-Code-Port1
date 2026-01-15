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
    const { message } = await request.json();
    
    if (!message || message.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Please provide a message' 
      }, { status: 400 });
    }

    // Simple keyword-based responses
    const lowerMessage = message.toLowerCase();
    
    let response = '';
    
    // Personal info
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
      response = "You can reach Samuel at:\n📧 Email: gideonsammysen@gmail.com\n📱 Phone: +49 171 5811680\n📍 Location: Lübeck, Germany\n💼 LinkedIn: linkedin.com/in/samuel-o-4b9bbb2a8";
    }
    // Skills
    else if (lowerMessage.includes('skill') || lowerMessage.includes('what can you do') || lowerMessage.includes('abilities')) {
      response = "Samuel's key skills include:\n\n✅ Digital Learning Design: E-learning development with Articulate 360, SCORM, Moodle\n✅ Technical Writing: User guides, API documentation, knowledge bases\n✅ Accessibility: WCAG 2.1 compliance, inclusive design\n✅ Tools: Adobe Creative Suite, Figma, Markdown, HTML, CSS, GitHub\n✅ Instructional Design: ADDIE model, Bloom's Taxonomy, plain language principles\n✅ Content Localization: German-English translation with AI assistance";
    }
    // Experience
    else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
      response = "Samuel's professional experience:\n\n🎯 **Upcoming:** Online Training Intern at Dräger (Feb 2026) - E-learning script development, video editing\n\n📚 **Recent:** Digital Learning Designer at Tanz der Kulturen e.V. (June-Nov 2025) - Created 25+ accessible documentation assets, localized 300+ pages\n\n👨‍🏫 **Teaching:** English Language Teacher at Ghana National Service Scheme (2023) - Designed lessons using Bloom's Taxonomy\n\nHe has experience in instructional design, technical documentation, and multilingual content creation.";
    }
    // Education
    else if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('study')) {
      response = "Samuel's education:\n\n🎓 **Master's in North American Studies (Media Studies)** - Philipps-Universität Marburg, Germany (Oct 2023 – Present)\nThesis: 'AI as Reflection: Human-Technology Relationships in Digital Narratives'\n\n🎓 **Bachelor of Education in English Language** (CGPA: 3.6/4.0 ≈ German 1.4) - University of Cape Coast, Ghana (Oct 2018 – Oct 2022)\n\nRelevant coursework includes Educational Psychology, Instructional Design, Media Studies, and Language & Linguistics.";
    }
    // Certifications
    else if (lowerMessage.includes('certificat') || lowerMessage.includes('training') || lowerMessage.includes('course')) {
      response = "Samuel's certifications:\n\n📜 Technical Writing Course – Google Developers (2025)\n📜 Technical Writing Course – Board Infinity (2025)\n📜 Creating API Documentation – LinkedIn Learning (2025)\n📜 Instructional Design Foundations & Applications – University of Illinois (2025)\n📜 EF SET English Certificate – C1 Advanced (67/100)\n\nAll certifications are recent and demonstrate commitment to continuous learning.";
    }
    // Languages
    else if (lowerMessage.includes('language') || lowerMessage.includes('speak') || lowerMessage.includes('german') || lowerMessage.includes('english')) {
      response = "Samuel speaks:\n\n🗣️ **English** – Native/Bilingual proficiency\n🗣️ **German** – B1 (Intermediate level)\n🗣️ **Akan** – Fluent\n\nHe can work effectively in multilingual environments and has experience localizing content between German and English.";
    }
    // Portfolio
    else if (lowerMessage.includes('portfolio') || lowerMessage.includes('project') || lowerMessage.includes('work sample') || lowerMessage.includes('example')) {
      response = "Samuel's portfolio includes:\n\n📄 **Technical Documentation:**\n- 2FA User Guide (Microsoft PDF format)\n- Postman API Documentation Guide\n\n🎓 **E-Learning Modules:**\n- Plain Language & Inclusive Communication (with accessibility panel)\n- 2FA Practical Setup & Troubleshooting\n\n📚 **Knowledge Bases:**\n- ADDIE-based Documentation for LLMs & Sustainability\n- Sustainability and Climate Change Knowledge Base\n\n🌐 **Web Project:**\n- Responsive bilingual portfolio website (EN/DE) with accessibility features\n\nAll projects demonstrate WCAG 2.1 compliance and user-centered design.";
    }
    // Tools
    else if (lowerMessage.includes('tool') || lowerMessage.includes('software') || lowerMessage.includes('articulate') || lowerMessage.includes('adobe')) {
      response = "Samuel is proficient with:\n\n🛠️ **E-Learning:** Articulate 360 (Storyline, Rise), Moodle, SCORM\n🛠️ **Design:** Adobe Creative Suite (Photoshop, InDesign, Premiere Pro), Figma\n🛠️ **Development:** HTML, CSS, Markdown, GitHub, VS Code\n🛠️ **Productivity:** Notion, Google Workspace, Microsoft 365\n🛠️ **Documentation:** Markdown, version control, technical writing tools";
    }
    // Availability
    else if (lowerMessage.includes('available') || lowerMessage.includes('start') || lowerMessage.includes('when can you')) {
      response = "Samuel is currently:\n\n📅 **Starting:** Online Training Internship at Dräger in February 2026\n🎓 **Studying:** Master's program at Philipps-Universität Marburg (until present)\n\n💼 For freelance or part-time opportunities, please contact him directly at gideonsammysen@gmail.com to discuss availability.";
    }
    // Location
    else if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('based') || lowerMessage.includes('live')) {
      response = "📍 Samuel is based in **Lübeck, Germany**\n\nFull address: Große Klosterkoppel 8, 23562 Lübeck\n\nHe's currently pursuing his Master's at Philipps-Universität Marburg and has an upcoming position at Dräger in Lübeck.";
    }
    // Personal
    else if (lowerMessage.includes('height') || lowerMessage.includes('tall') || lowerMessage.includes('personality') || lowerMessage.includes('hobbies') || lowerMessage.includes('talent')) {
      response = "About Samuel personally:\n\n🎨 **Natural Talents:** Creative drawing, naturally soothing singing voice\n👤 **Personality:** Quiet, observant, curious (actively learning new skills), empathetic, reserved but friendly\n📏 **Height:** 184cm\n\nHe's passionate about continuous learning and enjoys creative pursuits alongside his professional work.";
    }
    // Accessibility
    else if (lowerMessage.includes('accessib') || lowerMessage.includes('wcag') || lowerMessage.includes('inclusive')) {
      response = "Samuel has strong expertise in accessibility:\n\n♿ **WCAG 2.1 Compliance:** All projects follow Web Content Accessibility Guidelines\n♿ **Inclusive Design:** Creates content usable by diverse audiences\n♿ **Plain Language:** Applies clear communication principles\n♿ **Practical Experience:** Created 25+ accessible documentation assets at Tanz der Kulturen\n\nAccessibility is a core principle in all his work, from e-learning modules to technical documentation.";
    }
    // ADDIE
    else if (lowerMessage.includes('addie') || lowerMessage.includes('instructional design') || lowerMessage.includes('learning science')) {
      response = "Samuel applies instructional design methodologies:\n\n📊 **ADDIE Model:** Analysis, Design, Development, Implementation, Evaluation\n📊 **Bloom's Taxonomy:** Designs learning objectives at appropriate cognitive levels\n📊 **Plain Language Principles:** Ensures content clarity and accessibility\n📊 **User-Centered Design:** Focuses on learner needs and outcomes\n\nHe's certified in Instructional Design Foundations & Applications from University of Illinois Urbana-Champaign.";
    }
    // Greeting
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage.startsWith('hi') || lowerMessage.includes('hey')) {
      response = "Hello! 👋 I'm Samuel's AI assistant. I can answer questions about his:\n\n• Skills & Experience\n• Education & Certifications\n• Portfolio & Projects\n• Contact Information\n• Availability\n• Tools & Technologies\n\nWhat would you like to know about Samuel?";
    }
    // Default - use OpenAI or Claude API for more complex questions
    else {
      // For production, integrate with OpenAI or Claude API
      response = "I can help you learn about Samuel's:\n\n✅ Professional experience & skills\n✅ Education & certifications\n✅ Portfolio projects\n✅ Technical expertise\n✅ Contact information\n\nCould you please ask a more specific question? For example:\n- 'What are Samuel's skills?'\n- 'Tell me about his experience'\n- 'How can I contact Samuel?'\n- 'What languages does he speak?'";
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
