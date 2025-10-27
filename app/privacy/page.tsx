import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Quanqua",
  description: "Privacy Policy for Quanqua Ethiopian Language Translator. Learn how we protect your data and ensure your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-12 sm:px-16 lg:px-20 py-6">
          <nav className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-6 ml-8">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-[#078F42] via-[#FCDD09] to-[#EF2119] rounded-xl shadow-sm ml-4">
                  <span className="text-2xl">🇪🇹</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[#078F42] via-[#1A5391] to-[#078F42] bg-clip-text text-transparent">
                    Quanqua <span className="font-ethiopic ml-2">ቛንቛ</span>
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">Ethiopian Language Translator</p>
                </div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <a href="/" className="text-gray-600 hover:text-green-600 transition-colors">
                Home
              </a>
              <a href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                About
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Container with Ads */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-6">
          {/* Left Ad Space */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-center p-8 shadow-sm" style={{ minHeight: '700px' }}>
                <div className="space-y-4">
                  <div className="text-5xl">📢</div>
                  <div className="font-bold text-gray-700">Advertisement</div>
                  <div className="text-sm text-gray-500 font-mono">300×600</div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Centered */}
          <main className="flex-1 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              Welcome to Quanqua ("we," "our," or "us"). We are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you use our Ethiopian language translation service.
            </p>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              By using Quanqua, you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with this policy, please do not use our service.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              Quanqua is designed with privacy in mind. Here's what we collect:
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 px-6">2.1 Translation Data</h3>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              When you use our translation service, we temporarily process your text through Google Cloud Translation API. 
              Your translated text is sent to Google's servers for processing, but we do NOT store or log this data on our servers.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 px-6">2.2 Local Browser Storage</h3>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              Your translation history is stored locally in your browser using localStorage. This data never leaves your device 
              and is not transmitted to our servers. You can clear this data at any time through your browser settings.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 px-6">2.3 Usage Data</h3>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              We may collect anonymous usage statistics such as page views, features used, and general user behavior patterns 
              to improve our service. This data is aggregated and cannot be used to identify individual users.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-700 px-6 mb-10">
              <li>To provide and maintain our translation service</li>
              <li>To improve and optimize our service's performance</li>
              <li>To analyze usage patterns and identify areas for enhancement</li>
              <li>To ensure the security and integrity of our service</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              <strong>No Server-Side Storage:</strong> We do NOT store your translated text on our servers. Translation 
              data is processed in real-time and not retained.
            </p>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              <strong>Local Storage:</strong> Your translation history is stored exclusively in your browser's localStorage. 
              This means:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-6 px-6">
              <li>Your history is only accessible on the device where you used Quanqua</li>
              <li>Clearing your browser data will remove your translation history</li>
              <li>We cannot access or retrieve your stored translations</li>
            </ul>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              <strong>Third-Party Services:</strong> We use Google Cloud Translation API for translation services. 
              Your text is sent to Google's secure servers, and we recommend reviewing Google's Privacy Policy 
              at <a href="https://policies.google.com/privacy" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              Quanqua uses minimal to no cookies. We do not use cookies for tracking or advertising purposes. 
              Any cookies that may be used are strictly for functionality (such as remembering your language preferences) 
              and are session-based.
            </p>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              We do not use third-party tracking services, analytics tools that track individual users, or advertising 
              cookies. Your browsing experience on Quanqua is private and not used for commercial tracking.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              Quanqua relies on the following third-party services:
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 px-6">Google Cloud Translation API</h3>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              We use Google's translation service to provide accurate translations. When you translate text, 
              it is sent to Google's servers for processing. Please review Google's privacy policy at 
              <a href="https://policies.google.com/privacy" className="text-green-600 hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                policies.google.com/privacy
              </a>.
            </p>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 px-6">Web Speech API</h3>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              For voice input and output features, we use the browser's built-in Web Speech API. Audio processing 
              happens entirely in your browser and is not transmitted to external servers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              Our service is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child has 
              provided us with personal information, please contact us so we can remove that information from our records.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              As a user of Quanqua, you have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-4 text-gray-700 px-6 mb-10">
              <li><strong>Right to Access:</strong> Since we don't store your data, there's nothing to access from our servers</li>
              <li><strong>Right to Deletion:</strong> Clear your browser's localStorage to remove your translation history</li>
              <li><strong>Right to Transparency:</strong> This policy explains exactly what data we collect and how we use it</li>
              <li><strong>Right to Data Portability:</strong> Your translation history in localStorage can be exported from your browser</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed px-6 mb-10">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review 
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="mb-10 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-8 px-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-700">
                <strong>Email:</strong> <a href="mailto:contact@quanqua.com" className="text-green-600 hover:underline">contact@quanqua.com</a>
              </p>
              <p className="text-gray-700 mt-2">
                <strong>Website:</strong> <a href="/" className="text-green-600 hover:underline">quanqua.com</a>
              </p>
            </div>
          </section>

          {/* Call to Action */}
          <div className="text-center bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-10 text-white mt-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Translate?</h2>
            <p className="text-lg opacity-90 mb-6">
              Experience secure, private, and accurate Ethiopian language translation.
            </p>
            <a 
              href="/" 
              className="inline-block px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Translating Now
            </a>
          </div>
            </div>
          </main>

          {/* Right Ad Space */}
          <aside className="hidden lg:block w-[300px] shrink-0">
            <div className="sticky top-24">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl flex items-center justify-center text-center p-8 shadow-sm" style={{ minHeight: '700px' }}>
                <div className="space-y-4">
                  <div className="text-5xl">📢</div>
                  <div className="font-bold text-gray-700">Advertisement</div>
                  <div className="text-sm text-gray-500 font-mono">300×600</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quanqua</h3>
              <p className="text-sm">
                Secure, private, and free Ethiopian language translation.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="hover:text-green-400 transition-colors">Home</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-green-400 transition-colors">About</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Privacy</h3>
              <p className="text-sm">
                Your data stays private. We don't store your translations on our servers.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 Quanqua. All rights reserved. Protecting your privacy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

