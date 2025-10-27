export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Quanqua",
    "description": "Ethiopian Language Translator - Free translation between English, Amharic, Tigrigna, and Afaan Oromo",
    "url": "https://quanqua.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://quanqua.com/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const translatorSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Quanqua Ethiopian Language Translator",
    "description": "Free online translation tool for Ethiopian languages including Amharic, Tigrigna, and Afaan Oromo",
    "applicationCategory": "Translation Software",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Amharic Translation",
      "Tigrigna Translation",
      "Afaan Oromo Translation",
      "Ge'ez Script Support",
      "Audio Playback",
      "Translation History"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(translatorSchema) }}
      />
    </>
  );
}

