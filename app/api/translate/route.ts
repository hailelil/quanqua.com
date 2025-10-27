import { NextRequest, NextResponse } from 'next/server';

// Language code mapping
const LANGUAGES: Record<string, string> = {
  en: 'en',
  am: 'am',
  ti: 'ti',
  om: 'om',
};

export async function POST(req: NextRequest) {
  try {
    const { text, sourceLang, targetLang } = await req.json();

    // Validate input
    if (!text || !sourceLang || !targetLang) {
      return NextResponse.json(
        { error: 'Missing required fields: text, sourceLang, or targetLang' },
        { status: 400 }
      );
    }

    if (sourceLang === targetLang) {
      return NextResponse.json(
        { error: 'Source and target languages cannot be the same' },
        { status: 400 }
      );
    }

    // Get API key from environment
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Translation API key not configured' },
        { status: 500 }
      );
    }

    // Map language codes
    const sourceCode = LANGUAGES[sourceLang] || sourceLang;
    const targetCode = LANGUAGES[targetLang] || targetLang;

    // Call Google Translate API
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text.trim(),
          source: sourceCode,
          target: targetCode,
          format: 'text',
        }),
      }
    );

    // Read response body once
    const responseText = await response.text();
    
    // First check if response is OK
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = JSON.parse(responseText);
        console.error('Translation API error:', errorData);
        
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        } else if (typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (errorData.error) {
          errorMessage = JSON.stringify(errorData.error);
        } else {
          errorMessage = `HTTP ${response.status}: Unknown error`;
        }
      } catch {
        errorMessage = responseText || `HTTP ${response.status}: Could not parse error`;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    // Parse successful response
    const data = JSON.parse(responseText);
    const translatedText = data.data?.translations?.[0]?.translatedText || '';

    if (!translatedText) {
      console.error('No translation returned:', data);
      return NextResponse.json(
        { error: 'No translation received from API' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      translatedText,
      sourceLang: sourceCode,
      targetLang: targetCode,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}


