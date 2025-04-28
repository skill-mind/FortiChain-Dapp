type LanguageDetails = {
    percentage: number;
    logo: string;
    icon: string;
    bgColor: string;
};

export type Project = {
    id: number;
    logo: {
        logo: string;
        text: string;
        bgColor: string;
    };
    title: string;
    description: string;
    amount: string;
    deadline: string;
    tags: string[];
  
    repository?: {
        name: string;
        link: string;
    }[];
    language?: {
        typescript?: LanguageDetails;
        javascript?: LanguageDetails;
        solidity?: LanguageDetails;
        cairo?: LanguageDetails;
        rust?: LanguageDetails;
        go?: LanguageDetails;
        python?: LanguageDetails;
        java?: LanguageDetails;
        c?: LanguageDetails;
    };
};


export const projects: Project[] = [
    {
        id: 1,
        logo: {
            logo: "/researcherIcon/DG.svg",
            text: "DG",
            bgColor: "bg-yellow-600",
        },
        title: "Defi Guard",
        description:
            "A decentralized finance (DeFi) security tool designed to protect users and protocols by proactively scanning for vulnerabilities and potential exploits. It leverages advanced threat detection to identify security risks in smart contracts and DeFi platforms, providing real-time alerts and actionable insights. By helping prevent hacks and unauthorized access, it enhances trust and safety within the DeFi ecosystem, ensuring a more secure experience for all participaA decentralized finance (DeFi) protection tool that scans for vulnerabilities in DeFi protocols and helps prevent hacks.nts",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["DeFi", "Storage", "NFTs"],
        repository: [
            {
                name: "DeFi-Guard-Smartcontract",
                link: "www.github.com/defi-guard/smartcontract",
            },
            {
                name: "DeFi-Guard-Frontend",
                link: "www.github.com/defi-guard/frontend",
            },
        ],
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
                icon: "TS",
                bgColor: "bg-[#000055]",
            },
            javascript: {
                percentage: 10,
                logo: "/researcherIcon/javascript.svg",
                icon: "JS",
                bgColor: "bg-[#4F4F07]",
            },
            python: {
                percentage: 10,
                logo: "/researcherIcon/python.svg",
                icon: "PY",
                bgColor: "bg-[#0000AA]",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
                icon: "CA",
                bgColor: "bg-[#5B1712]",
            },
        },
    },
    {
        id: 2,
        logo: {
            logo: "/researcherIcon/PC.svg",
            text: "PC",
            bgColor: "bg-blue-700",
        },
        title: "Plankton Chain",
        description:
            "A Layer 2 blockchain that enhances security while abstracting complex processes, providing a seamless and user-friendly experience for developers and users alike.",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["DeFi", "Storage", "NFTs"],
        repository: [
            {
                name: "Plankton-Chain-Smartcontract",
                link: "www.github.com/plankton-chain/smartcontract",
            },
            {
                name: "Plankton-Chain-Frontend",
                link: "www.github.com/plankton-chain/frontend",
            },
        ],
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
                icon: "TS",
                bgColor: "bg-[#000055]",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
                icon: "JS",
                bgColor: "bg-[#4F4F07]",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
                icon: "PY",
                bgColor: "bg-[#0000AA]",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
                icon: "CA",
                bgColor: "bg-[#5B1712]",
            },
        },
    },
    {
        id: 3,
        logo: {
            logo: "/researcherIcon/P1.svg",
            text: "FD",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts by identifying and fixing vulnerabilities.",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
        repository: [
            {
                name: "FortiChain-Smartcontract",
                link: "www.github.com/fortichain/smartcontract",
            },
            {
                name: "FortiChain-Frontend",
                link: "www.github.com/fortichain/frontend",
            },
        ],
        language: {
            typescript: {
                percentage: 10,
                logo: "/researcherIcon/typescript.svg",
                icon: "TS",
                bgColor: "bg-[#000055]",
            },
            javascript: {
                percentage: 30,
                logo: "/researcherIcon/javascript.svg",
                icon: "JS",
                bgColor: "bg-[#4F4F07]",
            },
            python: {
                percentage: 10,
                logo: "/researcherIcon/python.svg",
                icon: "PY",
                bgColor: "bg-[#0000AA]",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
                icon: "CA",
                bgColor: "bg-[#5B1712]",
            },
        },
    },
    {
        id: 4,
        logo: {
            logo: "/researcherIcon/DG.svg",
            text: "DG",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts by identifying and fixing vulnerabilities.",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
        repository: [
            {
                name: "FortiChain-Smartcontract",
                link: "www.github.com/fortichain/smartcontract",
            },
            {
                name: "FortiChain-Frontend",
                link: "www.github.com/fortichain/frontend",
            },
        ],
        language: {
            typescript: {
                percentage: 10,
                logo: "/researcherIcon/typescript.svg",
                icon: "TS",
                bgColor: "bg-[#000055]",
            },
            javascript: {
                percentage: 35,
                logo: "/researcherIcon/javascript.svg",
                icon: "JS",
                bgColor: "bg-[#4F4F07]",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
                icon: "PY",
                bgColor: "bg-[#0000AA]",
            },
            cairo: {
                percentage: 5,
                logo: "/researcherIcon/cairo.svg",
                icon: "CA",
                bgColor: "bg-[#5B1712]",
            },
        },
    },
    {
        id: 5,
        logo: {
            logo: "/researcherIcon/P2.svg",
            text: "FD",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts by identifying and fixing vulnerabilities.",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
        repository: [
            {
                name: "FortiChain-Smartcontract",
                link: "www.github.com/fortichain/smartcontract",
            },
            {
                name: "FortiChain-Frontend",
                link: "www.github.com/fortichain/frontend",
            },
        ],
        language: {
            typescript: {
                percentage: 40,
                logo: "/researcherIcon/typescript.svg",
                icon: "TS",
                bgColor: "bg-[#000055]",
            },
            javascript: {
                percentage: 30,
                logo: "/researcherIcon/javascript.svg",
                icon: "JS",
                bgColor: "bg-[#4F4F07]",
            },
            python: {
                percentage: 10,
                logo: "/researcherIcon/python.svg",
                icon: "PY",
                bgColor: "bg-[#0000AA]",
            },
            cairo: {
                percentage: 20,
                logo: "/researcherIcon/cairo.svg",
                icon: "CA",
                bgColor: "bg-[#5B1712]",
            },
        },
    },
    {
        id: 6,
        logo: {
            logo: "/researcherIcon/P1.svg",
            text: "FD",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts by identifying and fixing vulnerabilities.",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
        repository: [
            {
                name: "FortiChain-Smartcontract",
                link: "www.github.com/fortichain/smartcontract",
            },
            {
                name: "FortiChain-Frontend",
                link: "www.github.com/fortichain/frontend",
            },
        ],
        language: {
            typescript: {
                percentage: 0,
                logo: "/researcherIcon/typescript.svg",
                icon: "TS",
                bgColor: "bg-[#000055]",
            },
            javascript: {
                percentage: 50,
                logo: "/researcherIcon/javascript.svg",
                icon: "JS",
                bgColor: "bg-[#4F4F07]",
            },
            python: {
                percentage: 20,
                logo: "/researcherIcon/python.svg",
                icon: "PY",
                bgColor: "bg-[#0000AA]",
            },
            cairo: {
                percentage: 30,
                logo: "/researcherIcon/cairo.svg",
                icon: "CA",
                bgColor: "bg-[#5B1712]",
            },
        },
    },
];


// cards.ts

export type Card = {
    id: string;
    date: string;
    title: string;
    severity: string;
    score: number;
    reward: string;
  };
  
  export const cards: Card[] = [
    {
      id: '#8793',
      date: '3 Jan, 4:35 PM',
      title: 'Filename parameter on Home Page -',
      severity: 'Critical',
      score: 9.0,
      reward: '$200'
    },
    {
      id: '#8793',
      date: '3 Jan, 4:35 PM',
      title: 'Filename parameter on Home Page -',
      severity: 'Critical',
      score: 9.0,
      reward: '$200'
    },
    {
      id: '#8793',
      date: '3 Jan, 4:35 PM',
      title: 'Filename parameter on Home Page -',
      severity: 'Critical',
      score: 9.0,
      reward: '$200'
    },
    {
      id: '#8793',
      date: '3 Jan, 4:35 PM',
      title: 'Filename parameter on Home Page -',
      severity: 'Critical',
      score: 9.0,
      reward: '$200'
    },
    {
      id: '#8793',
      date: '3 Jan, 4:35 PM',
      title: 'Filename parameter on Home Page -',
      severity: 'Critical',
      score: 9.0,
      reward: '$200'
    }
  ];
  