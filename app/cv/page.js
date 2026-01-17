import React from 'react';
import { Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';

export const metadata = {
  title: 'CV - Samuel Afriyie Opoku | Digital Learning Designer',
  description: 'CV of Samuel Afriyie Opoku - Digital Learning Designer and Technical Writer',
};

export default function DigitalLearningCV() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 md:p-8 shadow-lg">
        {/* Header */}
        <header className="border-b-4 border-indigo-600 pb-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">SAMUEL AFRIYIE OPOKU</h1>
          <p className="text-xl text-indigo-600 font-semibold mb-4">Digital Learning Designer | Technical Writer</p>
          
          <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-gray-700">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Große Klosterkoppel 8, 23562 Lübeck</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              <span>01715811680</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <a href="mailto:gideonsammysen@gmail.com" className="text-indigo-600 hover:underline cursor-pointer">gideonsammysen@gmail.com</a>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <a href="https://www.linkedin.com/in/samuel-opoku-4b9bbb2a8" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">LinkedIn Profile</a>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" />
              <a href="https://vs-code-port1.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Web Portfolio</a>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">PROFESSIONAL SUMMARY</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            Digital Learning Designer with Technical Writing skills. Possesses a unique blend of instructional design expertise and 
            documentation skills. I create clear, accessible and engaging e-learning modules, as well as technical content — from user 
            guides to comprehensive knowledge bases. My approach combines technical communication best practices with learning science 
            (ADDIE, plain language principles) to deliver solutions that educate and empower users.
          </p>
        </section>

        {/* Skills */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">SKILLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Instructional Design & E-Learning</h3>
              <p className="text-xs text-gray-700">ADDIE framework • Interactive modules • SCORM packages • LMS administration • Bloom's Taxonomy • Assessment design</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Documentation & Technical Writing</h3>
              <p className="text-xs text-gray-700">User guides • API docs • Knowledge bases • Technical specs • SOPs • Release notes • Content localization</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Information Architecture</h3>
              <p className="text-xs text-gray-700">Content structuring • Documentation planning • User-centered design • Navigation design • Version control</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Accessibility & Standards</h3>
              <p className="text-xs text-gray-700">WCAG 2.1 compliance • Inclusive design • Plain language • Screen reader compatibility • Accessibility auditing</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Multimedia & Visual Communication</h3>
              <p className="text-xs text-gray-700">Video editing • Infographics • Visual guides • UI/UX documentation • Technical illustrations</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Technical & Web Development</h3>
              <p className="text-xs text-gray-700">HTML/CSS/Markdown • Git/GitHub • Web accessibility • Responsive design • Code documentation</p>
            </div>
          </div>
        </section>

        {/* Tools & Platforms */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">TOOLS & PLATFORMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-2 text-xs">
            <div>
              <span className="font-semibold text-gray-800">E-Learning:</span>
              <span className="text-gray-700"> Articulate 360 (Storyline, Rise) • Moodle • SCORM Cloud</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Design & Multimedia:</span>
              <span className="text-gray-700"> Adobe Creative Suite (Photoshop, InDesign, Premiere Pro) • Figma • Canva</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Documentation:</span>
              <span className="text-gray-700"> VS Code • GitHub • Markdown • Notion • Confluence</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">API Documentation:</span>
              <span className="text-gray-700"> Postman • Swagger/OpenAPI</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Productivity:</span>
              <span className="text-gray-700"> Google Workspace • Microsoft 365 • Slack</span>
            </div>

            <div>
              <span className="font-semibold text-gray-800">Translation:</span>
              <span className="text-gray-700"> AI-assisted workflows • DeepL • Google Translate</span>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h2>
          
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">Praktikum Global Academy - Online Training (Upcoming Role)</h3>
                <p className="text-gray-600 italic">Dräger, Lübeck</p>
              </div>
              <span className="text-sm text-gray-600 font-semibold">Starting Feb 2026</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Will support script and content development for e-learning modules</li>
              <li>• Will contribute to video production, editing, and multimedia content creation</li>
              <li>• Will perform video editing with Adobe Premiere</li>
              <li>• Will develop independent documentation and instructional projects</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">Digital Learning Designer (Intern)</h3>
                <p className="text-gray-600 italic">Tanz der Kulturen e.V., Hamburg</p>
              </div>
              <span className="text-sm text-gray-600">June 2025 – Nov 2025</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Created 25+ accessible documentation assets and instructional materials following WCAG 2.1 standards, ensuring usability for diverse user groups</li>
              <li>• Structured and organized 50+ educational resources for digital platforms, supporting 200+ users across international contexts</li>
              <li>• Localized 300+ pages of German technical and instructional content into English using AI-assisted translation workflows, maintaining accuracy and natural readability</li>
              <li>• Developed multimedia documentation, including infographics and visual guides for complex processes</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">English Language Teacher & Administrative Assistant</h3>
                <p className="text-gray-600 italic">Ghana National Service Scheme, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">Jan 2023 – Oct 2023</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Designed and delivered English lessons using learning objectives aligned with Bloom's Taxonomy, enhancing comprehension, writing, and speaking skills</li>
              <li>• Assessed student progress using formative and summative methods to inform lesson adaptation</li>
              <li>• Managed administrative tasks, including student records, scheduling, and correspondence</li>
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">English Language Teaching Assistant (Intern)</h3>
                <p className="text-gray-600 italic">Ghana Education Service, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">June 2021 – Dec 2021</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Developed a box-part-letter handwriting method, improving first-year student performance by 40%</li>
              <li>• Facilitated lessons integrating assessment strategies and instructional scaffolding aligned to learning outcomes</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">English Language Teacher (Working Student)</h3>
                <p className="text-gray-600 italic">Kovak Hill Educational Centre, Kumasi</p>
              </div>
              <span className="text-sm text-gray-600">Jan 2020 – June 2020</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-1 ml-4">
              <li>• Developed and implemented lesson plans, ensuring alignment with curriculum standards and learner engagement strategies</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">EDUCATION</h2>
          
          <div className="mb-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">Master's in North American Studies (Media Studies)</h3>
                <p className="text-gray-600">Philipps-Universität Marburg, Germany</p>
              </div>
              <span className="text-sm text-gray-600">Oct 2023 – Present</span>
            </div>
            <p className="text-sm text-gray-700 italic ml-4">Relevant Courses: Media | Visual Art | Writing for Research | Contested Sustainability</p>
            <p className="text-sm text-gray-700 font-semibold ml-4">Master's Thesis: "AI as Reflection: Human-Technology Relationships in Digital Narratives"</p>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-1 gap-1">
              <div>
                <h3 className="font-bold text-gray-800">Bachelor of Education in English Language</h3>
                <p className="text-gray-600">University of Cape Coast, Ghana</p>
                <p className="text-sm text-gray-700"><span className="font-semibold">CGPA: 3.6/4.0</span> (≈ German 1.4)</p>
              </div>
              <span className="text-sm text-gray-600">Oct 2018 – Oct 2022</span>
            </div>
            <p className="text-sm text-gray-700 italic ml-4">Relevant Courses: Educational Psychology | General Curriculum Studies | Assessment & Evaluation | Educating Individuals with Diverse Learning Needs | Research Methods in Education | Educational Statistics | Language & Linguistics | Semantics | Translation | English in Multilingual Contexts</p>
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">CERTIFICATIONS & TRAINING</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-semibold">Technical Writing Course</span> – Google Developers | <a href="https://developers.google.com/profile/badges/profile/created-profile" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Verify</a> (April 2025)</li>
              <li>• <span className="font-semibold">Technical Writing Course</span> – Board Infinity | <a href="https://bit.ly/446fLNy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Verify</a> (April 2025)</li>
              <li>• <span className="font-semibold">Creating API Documentation</span> – LinkedIn Learning | <a href="https://www.linkedin.com/learning/certificates/62450d29357b3ffab0e29b7000b922977b9bddcaeaa9fde4870ca54d92732e0c" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Verify</a> (May 2025)</li>
            </ul>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-semibold">Instructional Design Foundations & Applications</span> – University of Illinois Urbana-Champaign | <a href="https://www.coursera.org/account/accomplishments/records/VA2HACXYEOYV" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Verify</a> (Aug 2025)</li>
              <li>• <span className="font-semibold">EF SET English Certificate</span> – C1 Advanced (67/100) | <a href="https://cert.efset.org/1uf78L" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Verify</a> (Feb 2025)</li>
            </ul>
          </div>
        </section>

        {/* Portfolio Highlights */}
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">PORTFOLIO HIGHLIGHTS</h2>
          
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Technical Documentation</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• 2FA User Guide (Microsoft PDF format) | <a href="https://github.com/Samuelsen1/Sample-2" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
                <li>• Postman API Documentation Guide | <a href="https://github.com/Samuelsen1/Sample-2" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">E-Learning Modules</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Plain Language & Inclusive Communication: Interactive E-Learning Module with advanced accessibility panel | <a href="https://plain-language-five.vercel.app" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
                <li>• 2FA Practical Setup & Troubleshooting | <a href="https://360.eu.articulate.com/review/content/8d8ac689-1670-458d-a7b3-0407850b55ef/review" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Knowledge Base & Content Systems</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• ADDIE-based Documentation for LLMs & Sustainability | <a href="https://www.notion.so/Instructional-Design-Portfolio-Opoku-Samuel-1d4f017e613b8029b616c5b6d1fd784d?source=copy_link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
                <li>• Sustainability and Climate Change Knowledge Base | <a href="https://www.notion.so/Combating-Climate-Change-A-Collective-Responsibility-284f017e613b80acb039d4ca5425349f?source=copy_link" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-1">Web Project</h3>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Personal Portfolio Website: Responsive, bilingual (EN/DE) technical showcase with accessibility features, AI chatbot and theme customization | <a href="https://vs-code-port1.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline cursor-pointer">Link</a></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-600 mb-3 border-b-2 border-gray-300 pb-1">LANGUAGES</h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-700">
            <span><span className="font-semibold">English</span> – Native/Bilingual</span>
            <span><span className="font-semibold">German</span> – B1 (Intermediate)</span>
            <span><span className="font-semibold">Akan</span> – Fluent</span>
          </div>
        </section>
      </div>
    </div>
  );
}
