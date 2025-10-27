'use client';

import { useState, useEffect, useRef } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName?: string;
  flag: string;
}

interface TranslationHistory {
  id: string;
  sourceLang: string;
  targetLang: string;
  sourceText: string;
  translatedText: string;
  timestamp: number;
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
  { code: 'ti', name: 'Tigrigna', nativeName: 'ትግርኛ', flag: '🇪🇹' },
  { code: 'om', name: 'Afaan Oromo', nativeName: 'Afaan Oromoo', flag: '🇪🇹' },
];

const HISTORY_STORAGE_KEY = 'quanqua-translation-history';
const MAX_HISTORY_ITEMS = 50;

export default function Home() {
  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('ti');
  const [inputText, setInputText] = useState<string>('');
  const [translatedText, setTranslatedText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [history, setHistory] = useState<TranslationHistory[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [showSrcDropdown, setShowSrcDropdown] = useState<boolean>(false);
  const [showTgtDropdown, setShowTgtDropdown] = useState<boolean>(false);
  const srcDropdownRef = useRef<HTMLDivElement>(null);
  const tgtDropdownRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        srcDropdownRef.current &&
        !srcDropdownRef.current.contains(event.target as Node) &&
        tgtDropdownRef.current &&
        !tgtDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSrcDropdown(false);
        setShowTgtDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-translate when text changes
  useEffect(() => {
    const translate = async () => {
      if (!inputText.trim()) {
        setTranslatedText('');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: inputText,
            sourceLang,
            targetLang,
          }),
        });

        const responseText = await response.text();
        
        if (!response.ok) {
          let errorText;
          try {
            const errorData = JSON.parse(responseText);
            console.error('Translation failed - API error:', errorData);
            errorText = errorData.error || JSON.stringify(errorData);
          } catch {
            console.error('Translation failed - Non-JSON response:', responseText);
            errorText = `HTTP ${response.status}: ${responseText || 'Unknown error'}`;
          }
          throw new Error(errorText);
        }

        const data = JSON.parse(responseText);

        const translated = data.translatedText;
        setTranslatedText(translated);

        // Save to history
        if (translated && typeof window !== 'undefined') {
          const newHistoryItem: TranslationHistory = {
            id: Date.now().toString(),
            sourceLang,
            targetLang,
            sourceText: inputText,
            translatedText: translated,
            timestamp: Date.now(),
          };

          setHistory(prevHistory => {
            const updatedHistory = [newHistoryItem, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
            localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
            return updatedHistory;
          });
        }
      } catch (err) {
        let errorMessage = 'Translation failed';
        
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === 'string') {
          errorMessage = err;
        } else {
          errorMessage = JSON.stringify(err);
        }
        
        console.error('Translation error:', errorMessage);
        console.error('Error details:', err);
        
        setError(errorMessage);
        setTranslatedText('');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      translate();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputText, sourceLang, targetLang]);

  const handleSwap = () => {
    const temp = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(temp);
    const tempText = inputText;
    setInputText(translatedText);
    setTranslatedText(tempText);
  };

  const handleCopy = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (translatedText && navigator.share) {
      try {
        await navigator.share({
          title: 'Translation',
          text: translatedText,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      handleCopy();
    }
  };

  const handleClear = () => {
    setInputText('');
    setTranslatedText('');
    setError('');
  };

  const handleClearHistory = () => {
    if (confirm('Clear all translation history?')) {
      setHistory([]);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
    }
  };

  const handleLoadFromHistory = (item: TranslationHistory) => {
    setSourceLang(item.sourceLang);
    setTargetLang(item.targetLang);
    setInputText(item.sourceText);
    setTranslatedText(item.translatedText);
    setShowHistory(false);
  };

  const handleDeleteHistoryItem = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const getLanguageName = (code: string): string => {
    return languages.find((l) => l.code === code)?.name || '';
  };

  const getLanguageCode = (code: string): string => {
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'am': 'am-ET',
      'ti': 'ti-ET',
      'om': 'om-ET',
    };
    return langMap[code] || 'en-US';
  };

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message?: string;
  }

  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null;
    onend: ((this: SpeechRecognition, ev: Event) => void) | null;
    start(): void;
    stop(): void;
  }

  interface WindowWithSpeechRecognition extends Window {
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
  }

  const handleVoiceInput = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognitionConstructor = (window as WindowWithSpeechRecognition).webkitSpeechRecognition || (window as WindowWithSpeechRecognition).SpeechRecognition;
    
    if (!SpeechRecognitionConstructor) {
      alert('Voice input is not supported in your browser.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = getLanguageCode(sourceLang);

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const handleVoiceOutput = () => {
    if (translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      utterance.lang = getLanguageCode(targetLang);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Skip to main content for screen readers */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      
      {/* Elegant Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-40 shadow-sm" role="banner">
        <div className="max-w-[1600px] mx-auto px-12 sm:px-16 lg:px-20 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-6 ml-8">
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
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 border border-gray-200 hover:border-[#078F42]/20 hover:text-[#078F42]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden sm:inline">History</span>
                  <span className="absolute -top-2 -right-2 bg-[#078F42] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {history.length}
                  </span>
                </button>
              )}
              
              <a 
                href="/about" 
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 hover:text-[#078F42]"
              >
                About
              </a>
              
              <a 
                href="/privacy" 
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all text-sm font-medium text-gray-600 hover:text-[#078F42]"
              >
                Privacy
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Side Ads */}
      <div className="flex justify-center max-w-[1600px] mx-auto px-4 lg:px-8 my-4">
        {/* Left Ad Space */}
        <aside className="hidden lg:block w-[300px] shrink-0 pr-4">
          <div className="sticky top-24 pt-8">
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
        <main id="main-content" className="flex-1 max-w-[1000px] px-2 sm:px-4 py-6 sm:py-8 lg:py-12" role="main">
        {/* Translation History Sidebar */}
        {showHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end sm:items-center sm:justify-center">
            <div className="bg-white w-full sm:w-96 h-full sm:h-auto sm:max-h-[80vh] shadow-2xl flex flex-col">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-lg font-semibold text-gray-900">Translation History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {history.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>No translations yet</p>
                    <p className="text-sm mt-2">Start translating to see your history here</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={handleClearHistory}
                        className="text-sm text-red-600 hover:text-red-700 px-3 py-1.5 rounded hover:bg-red-50 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-3">
                      {history.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleLoadFromHistory(item)}
                          className="p-4 border border-gray-200 rounded-lg hover:border-[#078F42] hover:shadow-md transition-all cursor-pointer bg-white"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="font-medium">{getLanguageName(item.sourceLang)}</span>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                              <span className="font-medium">{getLanguageName(item.targetLang)}</span>
                            </div>
                            <button
                              onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                              className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                          <p className="text-sm text-gray-900 line-clamp-2 mb-1">
                            {item.sourceText}
                          </p>
                          <p className="text-sm text-[#078F42] line-clamp-2" dir={item.targetLang === 'am' || item.targetLang === 'ti' ? 'rtl' : 'ltr'}>
                            {item.translatedText}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg" role="alert" aria-live="polite">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {/* Live region for translation status */}
        <div role="status" aria-live="polite" className="sr-only">
          {loading && "Translating..."}
          {translatedText && !loading && "Translation complete"}
        </div>

        {/* Translation Container - Elegant Design */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 relative">
          {/* Language Selector Row */}
          <div className="bg-gradient-to-r from-[#078F42]/95 via-[#078F42] to-[#1a6b35] px-4 sm:px-6 py-4 sm:py-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Source Language */}
              <div className="relative" ref={srcDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowSrcDropdown(!showSrcDropdown);
                    setShowTgtDropdown(false);
                  }}
                  className="w-full bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-xl px-5 py-4 flex items-center justify-between transition-all border border-white/30 shadow-sm hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-xl">{languages.find(l => l.code === sourceLang)?.flag}</span>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base leading-tight">
                        {languages.find(l => l.code === sourceLang)?.nativeName || getLanguageName(sourceLang)}
                      </span>
                      <span className="text-xs text-white/70">{getLanguageName(sourceLang)}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showSrcDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setSourceLang(lang.code);
                          setShowSrcDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 ${
                          sourceLang === lang.code 
                            ? 'bg-[#078F42]/10 text-[#078F42] font-medium' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName || lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Target Language */}
              <div className="relative" ref={tgtDropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowTgtDropdown(!showTgtDropdown);
                    setShowSrcDropdown(false);
                  }}
                  className="w-full bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-xl px-5 py-4 flex items-center justify-between transition-all border border-white/30 shadow-sm hover:shadow-md hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 text-white">
                    <span className="text-xl">{languages.find(l => l.code === targetLang)?.flag}</span>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold text-base leading-tight">
                        {languages.find(l => l.code === targetLang)?.nativeName || getLanguageName(targetLang)}
                      </span>
                      <span className="text-xs text-white/70">{getLanguageName(targetLang)}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showTgtDropdown && (
                  <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setTargetLang(lang.code);
                          setShowTgtDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center gap-2 ${
                          targetLang === lang.code 
                            ? 'bg-[#078F42]/10 text-[#078F42] font-medium' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.nativeName || lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Swap Button - At Center */}
          <button
            type="button"
            onClick={handleSwap}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 w-14 h-14 bg-gradient-to-r from-[#078F42] to-[#078F42] rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-20 border-4 border-white"
            title="Swap languages"
            aria-label="Swap languages"
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </button>

          {/* Text Areas Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
            {/* Input Panel */}
            <div className="flex flex-col bg-gradient-to-br from-white to-gray-50/50">
              {/* Toolbar */}
              <div className="border-b border-gray-100 px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#078F42] rounded-full"></div>
                  <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Source Text</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`p-2.5 rounded-xl transition-all ${
                      isListening
                        ? 'text-white bg-[#EF2119] shadow-md animate-pulse'
                        : 'text-gray-500 hover:text-[#078F42] hover:bg-[#078F42]/10'
                    }`}
                    title={isListening ? 'Stop listening' : 'Voice input'}
                    aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                    aria-pressed={isListening}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isListening ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-9-9 9 9 0 019 9z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      )}
                    </svg>
                  </button>
                  {inputText && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="p-2.5 text-gray-500 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition-colors"
                      title="Clear"
                      aria-label="Clear input text"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div className="flex-1 p-4 sm:p-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-full border-0 outline-none resize-none text-lg text-gray-900 placeholder-gray-400 bg-transparent font-ethiopic leading-relaxed"
                  placeholder="Start typing or paste your text here..."
                  autoFocus
                  style={{ minHeight: '350px', padding: '0 8px', textIndent: '4px' }}
                  aria-label="Source text input"
                  role="textbox"
                  aria-live="polite"
                />
              </div>

              {/* Char count */}
              {inputText && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-5">
                  <p className="text-xs text-gray-400 font-medium text-right">
                    {inputText.length} {inputText.length === 1 ? 'character' : 'characters'}
                  </p>
                </div>
              )}
            </div>

            {/* Output Panel */}
            <div className="flex flex-col bg-gradient-to-br from-[#078F42]/5 via-white to-white">
              {/* Toolbar */}
              <div className="border-b border-gray-100 px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between bg-white/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#078F42] rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500 font-semibold tracking-wide uppercase">Translation</span>
                </div>
                <div className="flex items-center gap-2">
                  {translatedText && (
                    <>
                      <button
                        type="button"
                        onClick={handleVoiceOutput}
                        className="p-2.5 text-gray-500 hover:text-[#078F42] rounded-xl hover:bg-[#078F42]/10 transition-colors"
                        title="Listen to translation"
                        aria-label="Play audio translation"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleShare}
                        className={`p-2.5 rounded-xl transition-all ${
                          shared ? 'text-white bg-[#078F42] shadow-md' : 'text-gray-500 hover:text-[#078F42] hover:bg-[#078F42]/10'
                        }`}
                        title={shared ? 'Shared!' : 'Share translation'}
                        aria-label={shared ? 'Shared successfully' : 'Share translation'}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className={`p-2.5 rounded-xl transition-all ${
                          copied ? 'text-white bg-[#078F42] shadow-md' : 'text-gray-500 hover:text-[#078F42] hover:bg-[#078F42]/10'
                        }`}
                        title={copied ? 'Copied!' : 'Copy translation'}
                        aria-label={copied ? 'Copied to clipboard' : 'Copy translation to clipboard'}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {copied ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          )}
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Output Area */}
              <div className="flex-1 p-4 sm:p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#078F42]/10 border-t-[#078F42]"></div>
                      <div className="absolute inset-0 animate-pulse">
                        <div className="rounded-full h-16 w-16 bg-[#078F42]/5"></div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 mt-6">Translating...</p>
                    <p className="text-xs text-gray-400 mt-1">Please wait a moment</p>
                  </div>
                ) : translatedText ? (
                  <div 
                    className="w-full text-lg text-gray-900 whitespace-pre-wrap break-words font-ethiopic leading-relaxed ethiopic-text" 
                    style={{ minHeight: '350px', padding: '0 8px', textIndent: '4px' }} 
                    role="region" 
                    aria-label="Translated text"
                    lang={targetLang}
                    dir={targetLang === 'am' || targetLang === 'ti' ? 'rtl' : 'ltr'}
                  >
                    {translatedText}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-300" style={{ minHeight: '350px' }}>
                    <svg className="w-20 h-20 mb-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    <p className="text-sm font-medium text-gray-400">Translation will appear here</p>
                    <p className="text-xs text-gray-300 mt-1">Start typing to see the translation</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Educational Footer */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-white via-gray-50 to-white/50 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#078F42] to-[#1A5391] bg-clip-text text-transparent">
                Discover the Beauty of Ethiopian Languages
              </h3>
            </div>
            <p className="text-center text-gray-600 mb-8 leading-relaxed">
              Quanqua helps you translate between English, Amharic (አማርኛ), Tigrigna (ትግርኛ), and Afaan Oromo with beautiful Ge&apos;ez script support. Preserving cultural heritage through accessible, modern technology.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#078F42]/5 to-transparent border border-[#078F42]/10 hover:border-[#078F42]/30 transition-all group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[#078F42]/10 rounded-xl group-hover:bg-[#078F42]/20 transition-colors" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-[#078F42]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.477 5.477 3.75 6.253v13C4.477 19.523 5.754 20 7.5 20s3.023-.477 3.75-1.247m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.477.477 4.75 1.253v13C19.977 19.523 18.701 20 16.5 20c-1.746 0-3.477-.477-4.75-1.247" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Cultural Heritage</h4>
                <p className="text-sm text-gray-600">Preserving Ethiopian languages for future generations</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#FCDD09]/5 to-transparent border border-[#FCDD09]/10 hover:border-[#FCDD09]/30 transition-all group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[#FCDD09]/10 rounded-xl group-hover:bg-[#FCDD09]/20 transition-colors" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-[#FCDD09]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Professional Use</h4>
                <p className="text-sm text-gray-600">Reliable translation for academic and work purposes</p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#EF2119]/5 to-transparent border border-[#EF2119]/10 hover:border-[#EF2119]/30 transition-all group">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[#EF2119]/10 rounded-xl group-hover:bg-[#EF2119]/20 transition-colors" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                  <svg className="w-6 h-6 text-[#EF2119]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.477 5.477 3.75 6.253v13C4.477 19.523 5.754 20 7.5 20s3.023-.477 3.75-1.247m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.477.477 4.75 1.253v13C19.977 19.523 18.701 20 16.5 20c-1.746 0-3.477-.477-4.75-1.247" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Easy to Learn</h4>
                <p className="text-sm text-gray-600">Designed for students and language learners</p>
              </div>
            </div>
          </div>
        </div>
        </main>

        {/* Right Ad Space */}
        <aside className="hidden lg:block w-[300px] shrink-0 pl-4">
          <div className="sticky top-24 pt-8">
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
  );
}
