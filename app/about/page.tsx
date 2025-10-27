import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Quanqua - Ethiopian Language Translator",
  description: "Learn about Quanqua, the free Ethiopian language translation tool helping preserve Amharic, Tigrigna, and Afaan Oromo cultures through modern technology.",
};

export default function AboutPage() {
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
              <a href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
                Privacy Policy
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
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              About <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Quanqua</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bridging cultures through language translation, one word at a time.
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Quanqua was created to make Ethiopian languages accessible to everyone, everywhere. We believe that language 
                is the bridge between cultures, and our mission is to preserve and promote Ethiopian linguistic heritage 
                through modern technology. Whether you're a student learning Amharic, a professional translating documents, 
                or someone connecting with Ethiopian culture, Quanqua is here to help.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Quanqua?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Lightning Fast</h3>
                <p className="text-gray-600 text-center px-4 mb-8">
                  Get instant translations powered by Google Cloud Translation API. No waiting, no delays—just accurate results.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.477 5.477 3.75 6.253v13C4.477 19.523 5.754 20 7.5 20s3.023-.477 3.75-1.247m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.477.477 4.75 1.253v13C19.977 19.523 18.701 20 16.5 20c-1.746 0-3.477-.477-4.75-1.247" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Beautiful Ge'ez Script</h3>
                <p className="text-gray-600 text-center px-4 mb-8">
                  Experience authentic Ethiopian typography with proper Ge'ez script rendering for Amharic and Tigrigna.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Audio Playback</h3>
                <p className="text-gray-600 text-center px-4 mb-8">
                  Listen to pronunciations using the Web Speech API. Perfect for learning and verification.
                </p>
              </div>

              <div className="p-6 border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Translation History</h3>
                <p className="text-gray-600 text-center px-4 mb-8">
                  Save and access your recent translations. Your data stays in your browser, private and secure.
                </p>
              </div>
            </div>
          </section>

          {/* Languages Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Supported Languages</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-6 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl">🇬🇧</span>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">English</h3>
                </div>
                <p className="text-gray-600 text-sm text-center px-4 mb-6">
                  Modern international language for global communication.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl">🇪🇹</span>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">Amharic (አማርኛ)</h3>
                </div>
                <p className="text-gray-600 text-sm text-center px-4 mb-6">
                  Official language of Ethiopia with beautiful Ge'ez script.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl">🇪🇹</span>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">Tigrigna (ትግርኛ)</h3>
                </div>
                <p className="text-gray-600 text-sm text-center px-4 mb-6">
                  Ancient Semitic language spoken in Eritrea and northern Ethiopia.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-2xl">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-3xl">🇪🇹</span>
                  <h3 className="text-lg font-semibold text-gray-900 text-center">Afaan Oromo</h3>
                </div>
                <p className="text-gray-600 text-sm text-center px-4 mb-6">
                  Widely spoken Cushitic language in Ethiopia and Kenya.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy & Security Section */}
          <section className="mb-12 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is our priority. Quanqua is designed with security and user privacy in mind:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>All translations happen in real-time—we don't store your text</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Translation history is stored locally in your browser</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>No cookies or tracking—just pure translation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Powered by secure Google Cloud Translation API</span>
              </li>
            </ul>
          </section>

          {/* Contact Section */}
          <section className="text-center bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-10 text-white">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Have questions, suggestions, or feedback? We'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/" 
                className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Translating
              </a>
              <a 
                href="/privacy" 
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </section>
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
                Free, accurate Ethiopian language translation with cultural respect and modern technology.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
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
              <h3 className="text-white font-bold text-lg mb-4">Languages</h3>
              <ul className="space-y-2 text-sm">
                <li>English 🇬🇧</li>
                <li>Amharic (አማርኛ) 🇪🇹</li>
                <li>Tigrigna (ትግርኛ) 🇪🇹</li>
                <li>Afaan Oromo 🇪🇹</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; 2024 Quanqua. All rights reserved. Made with ❤️ for Ethiopia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

