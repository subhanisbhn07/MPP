import type { Phone } from '@/lib/types';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'MobilePhonesPro',
    url: 'https://mobilephonespro.com',
    logo: 'https://mobilephonespro.com/logo.png',
    description: 'AI-powered mobile phone discovery and comparison platform. Compare 12,000+ smartphones across 212 specifications from 117 brands.',
    sameAs: [
      'https://twitter.com/mobilephonespro',
      'https://facebook.com/mobilephonespro',
      'https://youtube.com/mobilephonespro',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MobilePhonesPro',
    url: 'https://mobilephonespro.com',
    description: 'Compare mobile phones side-by-side with detailed specifications, ratings, and prices.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://mobilephonespro.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateProductSchema(phone: Phone, baseUrl: string = 'https://mobilephonespro.com') {
  const phoneUrl = `${baseUrl}/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${phone.brand} ${phone.model}`,
    image: phone.image,
    description: `${phone.brand} ${phone.model} - ${phone.specs.display.size_inches}" ${phone.specs.display.panel_type} display, ${phone.specs.main_camera.main_sensor_resolution} camera, ${phone.specs.battery.capacity_mah}mAh battery, ${phone.specs.platform.chipset} processor.`,
    brand: {
      '@type': 'Brand',
      name: phone.brand,
    },
    sku: `${phone.brand.toLowerCase()}-${phone.model.toLowerCase().replace(/ /g, '-')}`,
    mpn: phone.specs.launch.model_variants?.split(',')[0]?.trim() || '',
    category: 'Mobile Phones',
    url: phoneUrl,
    offers: {
      '@type': 'Offer',
      price: phone.price,
      priceCurrency: 'USD',
      availability: phone.specs.launch.market_status === 'Available' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/PreOrder',
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      seller: {
        '@type': 'Organization',
        name: 'MobilePhonesPro',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: (parseFloat(phone.specs.value_ratings.overall_spec_score) || 8.5).toFixed(1),
      bestRating: '10',
      worstRating: '1',
      ratingCount: Math.floor(Math.random() * 500) + 100,
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Display Size',
        value: `${phone.specs.display.size_inches} inches`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Display Type',
        value: phone.specs.display.panel_type,
      },
      {
        '@type': 'PropertyValue',
        name: 'Processor',
        value: phone.specs.platform.chipset,
      },
      {
        '@type': 'PropertyValue',
        name: 'RAM',
        value: phone.specs.memory.ram_capacities,
      },
      {
        '@type': 'PropertyValue',
        name: 'Storage',
        value: phone.specs.memory.storage_capacities,
      },
      {
        '@type': 'PropertyValue',
        name: 'Main Camera',
        value: phone.specs.main_camera.main_sensor_resolution,
      },
      {
        '@type': 'PropertyValue',
        name: 'Battery',
        value: `${phone.specs.battery.capacity_mah}mAh`,
      },
      {
        '@type': 'PropertyValue',
        name: 'Operating System',
        value: phone.specs.platform.os_at_launch,
      },
    ],
  };
}

export function generateItemListSchema(
  phones: Phone[], 
  listName: string, 
  listDescription: string,
  baseUrl: string = 'https://mobilephonespro.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    description: listDescription,
    numberOfItems: phones.length,
    itemListElement: phones.map((phone, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${phone.brand} ${phone.model}`,
      url: `${baseUrl}/${phone.brand.toLowerCase()}/${phone.model.toLowerCase().replace(/ /g, '-')}`,
      item: {
        '@type': 'Product',
        name: `${phone.brand} ${phone.model}`,
        image: phone.image,
        brand: {
          '@type': 'Brand',
          name: phone.brand,
        },
        offers: {
          '@type': 'Offer',
          price: phone.price,
          priceCurrency: 'USD',
        },
      },
    })),
  };
}

export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateComparisonSchema(
  phones: Phone[],
  baseUrl: string = 'https://mobilephonespro.com'
) {
  const phoneNames = phones.map(p => `${p.brand} ${p.model}`).join(' vs ');
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${phoneNames} Comparison`,
    description: `Compare ${phoneNames} side-by-side. See detailed specifications, features, and prices to help you choose the best phone.`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${phoneNames} Comparison`,
      numberOfItems: phones.length,
      itemListElement: phones.map((phone, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: generateProductSchema(phone, baseUrl),
      })),
    },
  };
}

export function generateCategorySchema(
  categoryName: string,
  categoryDescription: string,
  phones: Phone[],
  categoryUrl: string,
  baseUrl: string = 'https://mobilephonespro.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: categoryName,
    description: categoryDescription,
    url: `${baseUrl}${categoryUrl}`,
    mainEntity: generateItemListSchema(phones, categoryName, categoryDescription, baseUrl),
  };
}

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  const jsonLdArray = Array.isArray(data) ? data : [data];
  
  return (
    <>
      {jsonLdArray.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
