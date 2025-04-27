export type Project = {
    id: number;
    logo: {
        text: string;
        bgColor: string; // new: background color for logo
    };
    title: string;
    description: string;
    amount: string;
    deadline: string;
    tags: string[];
    progress: {
        firstIcon: string;
        firstColor: string; // new: dynamic color
        firstPercentage: number;
        secondIcon: string;
        secondColor: string; // new: dynamic color
        secondPercentage: number;
    };
    repository?:{
        name: string;
        link: string;
    }[];
    language?: {
        typescript?: {
            percentage: number;
            logo: string;
        };
        javascript?: {
            percentage: number;
            logo: string;
        };
        solidity?: {
            percentage: number;
            logo: string;
        };
        cairo?: {
            percentage: number;
            logo: string;
        };
        rust?: {
            percentage: number;
            logo: string;
        };
        go?: {
            percentage: number;
            logo: string;
        };
        python?: {
            percentage: number;
            logo: string;
        };
        java?: {
            percentage: number;
            logo: string;
        };
        c?: {
            percentage: number;
            logo: string;
        };
    };
};

export const projects: Project[] = [
    {
        id: 1,
        logo: {
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
        progress: {
            firstIcon: "TS",
            firstColor: "bg-[#000055]",
            firstPercentage: 30,
            secondIcon: "🌍",
            secondColor: "bg-red-600",
            secondPercentage: 70,
        },
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
            },
        },
    },
    {
        id: 2,
        logo: {
            text: "PC",
            bgColor: "bg-blue-700",
        },
        title: "Plankton Chain",
        description:
            "A Layer 2 blockchain that enhances security while abstracting complex processes, providing a seamless and user-friendly experience for...",
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
        progress: {
            firstIcon: "TS",
            firstColor: "bg-[#000055]",
            firstPercentage: 50,
            secondIcon: "🌍",
            secondColor: "bg-blue-400",
            secondPercentage: 50,
        },
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
            },
        },
    },
    {
        id: 3,
        logo: {
            text: "FD",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
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
        progress: {
            firstIcon: "JS",
            firstColor: "bg-yellow-400",
            firstPercentage: 60,
            secondIcon: "🌍",
            secondColor: "bg-red-600",
            secondPercentage: 40,
        },
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
            },
        },
    },
    {
        id: 4,
        logo: {
            text: "DG",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
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
        progress: {
            firstIcon: "TS",
            firstColor: "bg-[#000055]",
            firstPercentage: 60,
            secondIcon: "🌍",
            secondColor: "bg-red-600",
            secondPercentage: 40,
        },
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
            },
        },
    },
    {
        id: 5,
        logo: {
            text: "FD",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
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
        progress: {
            firstIcon: "TS",
            firstColor: "bg-[#000055]",
            firstPercentage: 60,
            secondIcon: "🌍",
            secondColor: "bg-red-600",
            secondPercentage: 40,
        },
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
            },
        },
    },
    {
        id: 6,
        logo: {
            text: "FD",
            bgColor: "bg-blue-800",
        },
        title: "FortiChain",
        description:
            "A decentralized bug bounty and smart contract security platform that rewards researchers and secures smart contracts",
        amount: "$50,000",
        deadline: "24/09/2025",
        tags: ["Security", "AI"],
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
        progress: {
            firstIcon: "JS",
            firstColor: "bg-yellow-400",
            firstPercentage: 60,
            secondIcon: "🌍",
            secondColor: "bg-red-600",
            secondPercentage: 40,
        },
        language: {
            typescript: {
                percentage: 30,
                logo: "/researcherIcon/typescript.svg",
            },
            javascript: {
                percentage: 70,
                logo: "/researcherIcon/javascript.svg",
            },
            python: {
                percentage: 50,
                logo: "/researcherIcon/python.svg",
            },
            cairo: {
                percentage: 50,
                logo: "/researcherIcon/cairo.svg",
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
  