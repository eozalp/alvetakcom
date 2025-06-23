
import React, { useState, useCallback, useEffect } from 'react';
import InputPanel from './components/InputPanel';
import ResultsDisplay from './components/ResultsDisplay';
import VisualSizer from './components/VisualSizer';
import { RingSizeEntry, InputType, getTranslatedInputTypeLabel } from './types';
import { findMatchingSize } from './utils/conversion';
import { t, setLocale as i18nSetLocale, getCurrentLocale as i18nGetCurrentLocale, initI18n, Locale } from './i18n';
// import './App.css'; // Removed as styles are inlined in index.html

type ActiveTab = 'manual' | 'visual';

const App: React.FC = () => {
  const initialType = InputType.US_CA;
  const initialValue = "7";

  const [isI18nReady, setIsI18nReady] = useState<boolean>(false);
  const [language, setLanguage] = useState<Locale>('en'); // Default, will be updated

  const [currentInputType, setCurrentInputType] = useState<InputType>(initialType);
  const [currentInputValue, setCurrentInputValue] = useState<string>(initialValue);
  const [matchedSize, setMatchedSize] = useState<RingSizeEntry | null>(null); // Initialize to null initially
  const [activeTab, setActiveTab] = useState<ActiveTab>('visual'); // Visual sizer is now default

  useEffect(() => {
    // initI18n is now synchronous for setting the locale
    const loadedLocale = initI18n(); 
    setLanguage(loadedLocale);
    document.documentElement.lang = loadedLocale;
    const initialResult = findMatchingSize(initialType, initialValue);
    setMatchedSize(initialResult);
    setIsI18nReady(true); // Set ready after synchronous setup
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleLanguageChange = (lang: Locale) => {
    i18nSetLocale(lang);
    setLanguage(lang);
    document.documentElement.lang = lang;
    const result = findMatchingSize(currentInputType, currentInputValue);
    setMatchedSize(result);
  };

  const handleInputChange = useCallback((type: InputType, value: string) => {
    setCurrentInputType(type);
    setCurrentInputValue(value);
    const result = findMatchingSize(type, value);
    setMatchedSize(result);
  }, []);

  const TabButton: React.FC<{ tabId: ActiveTab; currentTab: ActiveTab; onClick: (tabId: ActiveTab) => void; children: React.ReactNode }> = ({ tabId, currentTab, onClick, children }) => (
    <button
      role="tab"
      aria-selected={currentTab === tabId}
      aria-controls={`${tabId}-panel`}
      id={`${tabId}-tab`}
      onClick={() => onClick(tabId)}
      className={`flex-1 py-3 px-2 sm:px-4 text-sm sm:text-base font-medium rounded-t-lg transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50
        ${currentTab === tabId 
          ? 'bg-white/80 text-rose-600 shadow-lg' 
          : 'bg-rose-100/70 hover:bg-rose-200/80 text-rose-500 hover:text-rose-700'
        }`}
    >
      {children}
    </button>
  );

  const translatedCurrentInputTypeLabel = React.useMemo(() => {
    if (!isI18nReady) return ""; 
    return getTranslatedInputTypeLabel(currentInputType);
  }, [currentInputType, language, isI18nReady]);


  if (!isI18nReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 py-6 sm:py-10 flex flex-col items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-rose-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-rose-700 text-xl">{t('app.loading') || 'Loading application...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-6 sm:py-10 flex flex-col items-center selection:bg-rose-300 selection:text-rose-800">
      <div className="container mx-auto px-4 w-full max-w-2xl">
        <header className="text-center mb-6 sm:mb-10">
          <div className="inline-block p-2 sm:p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg mb-3 sm:mb-4 group">
            {/* Elegant Gem Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-rose-500 group-hover:text-rose-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.646l-8 4.8V17.554l8 4.8 8-4.8V6.446l-8-4.8z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.646v6.154M12 22.354v-6.154M12 7.8l8 4.8M12 7.8l-8 4.8M4 6.446l8 4.8M20 6.446l-8 4.8" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17.554l8-4.8M20 17.554l-8-4.8" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-rose-700">
            {t('app.title')}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-rose-600/90 max-w-xl mx-auto">
            {t('app.subtitle')}
          </p>
        </header>

        <main>
          <div className="mb-6 flex" role="tablist" aria-label={t('app.tabListLabel')}>
            <TabButton tabId="visual" currentTab={activeTab} onClick={setActiveTab}> {/* Visual is first for default */}
              {t('app.visualTab')}
            </TabButton>
            <TabButton tabId="manual" currentTab={activeTab} onClick={setActiveTab}>
              {t('app.manualTab')}
            </TabButton>
          </div>

          <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-b-xl rounded-t-xl overflow-hidden">
            {activeTab === 'manual' && (
              <section 
                role="tabpanel" 
                id="manual-panel" 
                aria-labelledby="manual-tab"
                className="p-4 sm:p-6 animate-fadeIn"
              >
                <InputPanel 
                  initialInputType={initialType}
                  initialInputValue={initialValue}
                  onInputChange={handleInputChange} 
                />
                <ResultsDisplay 
                  matchedSize={matchedSize} 
                  inputValue={currentInputValue} 
                  inputTypeLabel={translatedCurrentInputTypeLabel} 
                />
              </section>
            )}

            {activeTab === 'visual' && (
              <section 
                role="tabpanel" 
                id="visual-panel" 
                aria-labelledby="visual-tab"
                className="p-4 sm:p-6 animate-fadeIn"
              >
                 <header className="text-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-rose-700">{t('app.visualSizer.title')}</h2>
                    <p className="mt-1 text-sm sm:text-base text-rose-600/90 max-w-xl mx-auto">
                        {t('app.visualSizer.instruction')}
                    </p>
                </header>
                <VisualSizer key={language} /> 
              </section>
            )}
          </div>
        </main>

        <footer className="mt-10 pt-8 pb-4 border-t border-rose-300/50 text-center text-xs sm:text-sm text-rose-700/80">
          <div className="mb-6">
            <button 
              onClick={() => handleLanguageChange('en')} 
              className={`px-4 py-2 text-xs rounded-md mr-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50 ${language === 'en' ? 'bg-rose-500 text-white shadow-md' : 'bg-rose-100 hover:bg-rose-200 text-rose-700'}`}
              aria-pressed={language === 'en'}
            >
              English
            </button>
            <button 
              onClick={() => handleLanguageChange('tr')} 
              className={`px-4 py-2 text-xs rounded-md transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-50 ${language === 'tr' ? 'bg-rose-500 text-white shadow-md' : 'bg-rose-100 hover:bg-rose-200 text-rose-700'}`}
              aria-pressed={language === 'tr'}
            >
              Türkçe
            </button>
          </div>
          <p className="font-medium text-rose-700">&copy; {new Date().getFullYear()} {t('app.footer.copyright')}</p>
          <p className="mt-2 text-rose-600/90">
            {t('app.footer.professionalAdvice')}
          </p>
        </footer>
      </div>
    </div>
  );
}; // Added missing closing brace for the App component

export default App;