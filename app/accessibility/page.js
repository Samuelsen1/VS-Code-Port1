import Link from 'next/link';

export const metadata = {
  title: 'Accessibility — Samuel Afriyie Opoku',
  description: 'Learn about the accessibility features on this portfolio: contrast, larger text, blue light filter, dyslexia font, and more.',
};

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8">
          ← Back to portfolio
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Accessibility</h1>
        <p className="text-gray-600 mb-8">
          This site offers several accessibility options you can turn on from the blue <strong>Accessibility</strong> button (bottom-left). Settings are saved in your browser.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Larger text</h2>
            <p className="text-gray-600">Increases base font size (110% or 120%) to improve readability.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Contrast</h2>
            <p className="text-gray-600">Boosts contrast (+25% or +50%) for clearer text and UI.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Blue light filter</h2>
            <p className="text-gray-600">Adds a warm overlay in 5 levels to reduce blue light, especially in evening use.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Dyslexia font</h2>
            <p className="text-gray-600">Applies a more readable font and spacing for users with dyslexia.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Text spacing & row height</h2>
            <p className="text-gray-600">Increases letter, word, and line spacing to reduce crowding.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Mark links & focus indicator</h2>
            <p className="text-gray-600">Makes links and keyboard focus more visible.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Stop animations & hide images</h2>
            <p className="text-gray-600">Reduces motion and hides images if they are distracting or trigger sensitivity.</p>
          </div>
        </section>

        <p className="mt-12 text-gray-500 text-sm">
          These features aim for WCAG 2.1 Level AA–style improvements. For full details, see{' '}
          <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WCAG 2.1</a>.
        </p>
      </div>
    </main>
  );
}
