export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FortiChain",
    description: "Decentralized platform for blockchain security, vulnerability disclosure, and bug bounty processes",
    url: "https://fortichain.io",
    logo: "https://fortichain.io/logo.png",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/fortichain",
      "https://github.com/fortichain",
      "https://discord.gg/fortichain",
      "https://linkedin.com/company/fortichain",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["English"],
      email: "contact@fortichain.io",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "Global",
    },
    industry: "Blockchain Security",
    keywords: "blockchain security, smart contract auditing, bug bounty, vulnerability disclosure",
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FortiChain",
    url: "https://fortichain.io",
    description:
      "Enhance blockchain security through automated vulnerability disclosure and bug bounty processes. Trustless, transparent, and secure.",
    publisher: {
      "@type": "Organization",
      name: "FortiChain",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://fortichain.io/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FortiChain",
    description:
      "Decentralized platform for blockchain security, vulnerability disclosure, and automated bug bounty processes",
    url: "https://fortichain.io",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "850",
    },
    featureList: [
      "Vulnerability disclosure",
      "Automated bug bounty rewards",
      "Smart contract auditing",
      "Decentralized validation",
      "Trustless security",
      "Transparent reporting",
      "Community-driven security",
    ],
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://fortichain.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Features",
        item: "https://fortichain.io#features",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How It Works",
        item: "https://fortichain.io#how-it-works",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Security Researchers",
        item: "https://fortichain.io/researchers",
      },
    ],
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is FortiChain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FortiChain is a decentralized platform that enhances blockchain security through automated vulnerability disclosure and bug bounty processes. It connects developers, security researchers, and validators in a trustless ecosystem.",
        },
      },
      {
        "@type": "Question",
        name: "How does FortiChain work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FortiChain works in 3 steps: 1) Security researchers discover and report vulnerabilities, 2) Network validators review and verify reports using consensus mechanisms, 3) Smart contracts automatically distribute rewards upon successful verification.",
        },
      },
      {
        "@type": "Question",
        name: "What are the benefits of using FortiChain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FortiChain offers trustless security validation, eliminates centralized auditing dependencies, provides automated reward distribution, ensures complete transparency, and accelerates vulnerability remediation.",
        },
      },
      {
        "@type": "Question",
        name: "Who can use FortiChain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FortiChain is designed for blockchain developers seeking security audits, security researchers looking for bug bounty opportunities, and validators who want to participate in decentralized security validation.",
        },
      },
      {
        "@type": "Question",
        name: "Is FortiChain secure and transparent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, FortiChain leverages blockchain's inherent transparency and trustlessness. All vulnerability reports, validations, and reward distributions are recorded on-chain for complete transparency and accountability.",
        },
      },
    ],
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Blockchain Security Auditing",
    description: "Decentralized smart contract security auditing and vulnerability disclosure services",
    provider: {
      "@type": "Organization",
      name: "FortiChain",
    },
    serviceType: "Security Auditing",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Security Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Smart Contract Auditing",
            description: "Comprehensive smart contract security auditing",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bug Bounty Programs",
            description: "Automated bug bounty reward distribution",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vulnerability Disclosure",
            description: "Secure and transparent vulnerability reporting",
          },
        },
      ],
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  )
}
