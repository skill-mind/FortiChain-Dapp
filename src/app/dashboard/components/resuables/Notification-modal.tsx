import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, Variants } from "framer-motion";

type Notification = {
  id: number;
  type: string;
  title: string;
  description: string;
  actionText: string;
  timeAgo: string;
  imageSrc: string;
};

const notifications: Notification[] = [
  {
    id: 1,
    type: "urgent",
    title: "Vulnerability Found!",
    description:
      "A critical vulnerability has been reported in your project SecureChain. Immediate action is required!",
    actionText: "View Report",
    timeAgo: "2 mins ago",
    imageSrc: "/notification-icons/urgent.png",
  },
  {
    id: 2,
    type: "fund release",
    title: "",
    description:
      "Your escrow funds of 1,500 STRK (~$2,000) are now available for withdrawal.",
    actionText: "Withdraw Now",
    timeAgo: "10 mins ago",
    imageSrc: "/notification-icons/money-bag.png",
  },
  {
    id: 3,
    type: "Bounty Paid Out",
    title: "",
    description:
      "A researcher has received their bounty for their report on SecureChain.",
    actionText: "View Details",
    timeAgo: "1 hour ago",
    imageSrc: "/notification-icons/green-tick.png",
  },
  {
    id: 4,
    type: "New submission",
    title: "",
    description:
      "A security researcher submitted a new bug report. Please review and take action.",
    actionText: "Review Submission",
    timeAgo: "30 mins ago",
    imageSrc: "/notification-icons/file.png",
  },
];

export default function NotificationModal({ setIsBellActive }: { setIsBellActive:()=>void }) {
  // --- Animation Variants ---

  const dropdownVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15 } },
  };

  const notificationItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  return (
    <div className="fixed inset-0 top-0 z-[9998] bg-black/80 backdrop-blur-sm">
      <motion.div
        key="notification-dropdown"
        variants={dropdownVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed left-0 right-0 mx-auto md:mx-0 md:left-auto md:right-8 w-[80vw] md:max-w-[400px] z-[9999] bg-[#211A1D] border border-[#464043] rounded-md h-fit max-h-[70vh] overflow-hidden mt-24"
      >
        <div className="p-3">
          <div className="py-[22px] flex items-center justify-between border-b border-[#464043]">
            <h2 className="text-2xl font-semibold text-white">Notifications</h2>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsBellActive()}
              className="flex items-center p-2 bg-gray-600 rounded-full"
              aria-label="Close notifications panel"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.40114 0.515524C1.88044 -0.00517459 1.03622 -0.00517498 0.515524 0.515524C-0.00517476 1.03622 -0.0051748 1.88044 0.515524 2.40114L7.11519 9.0008L0.515524 15.6005C-0.0051748 16.1212 -0.00517476 16.9654 0.515524 17.4861C1.03622 18.0068 1.88044 18.0068 2.40114 17.4861L9.00081 10.8864L15.6005 17.4861C16.1212 18.0068 16.9654 18.0068 17.4861 17.4861C18.0068 16.9654 18.0068 16.1212 17.4861 15.6005L10.8864 9.0008L17.4861 2.40114C18.0068 1.88044 18.0068 1.03622 17.4861 0.515524C16.9654 -0.00517455 16.1212 -0.00517407 15.6005 0.515524L9.00081 7.11519L2.40114 0.515524Z"
                  fill="#D3D1D2"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        <ScrollArea className="bg-[#211A1D] p-3 text-white h-[calc(70vh-100px)]">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              variants={notificationItemVariants}
              transition={{ delay: index * 0.05 }}
              className="py-6 border-b border-gray-700"
            >
              <div className="flex gap-1 items-center mb-2">
                <span className="text-2xl">
                  <img
                    className="h-[24px]"
                    src={notification.imageSrc}
                    alt={notification.type}
                  />
                </span>
                <h2 className="text-lg font-semibold capitalize">
                  [{notification.title.startsWith("[") ? "" : notification.type}
                  ] {notification.title}
                </h2>
              </div>
              <p className="mb-4 text-sm text-gray-300">
                {notification.description}
              </p>
              <div className="flex gap-4 items-center">
                <a
                  href="#"
                  className="text-sm text-[#0000FF] underline hover:text-[#0000FF]/90"
                >
                  [{notification.actionText}]
                </a>
                <div className="flex gap-2 items-center text-xs text-gray-400">
                  {notification.type === "urgent" ||
                  notification.type === "New submission"
                    ? "⏳"
                    : "📅"}
                  {notification.timeAgo}
                </div>
              </div>
            </motion.div>
          ))}
          <div className="py-2">
            <div className="flex gap-2 justify-center items-center">
              <img
                className="h-[15px] w-[15px]"
                src="/notification-icons/refresh.svg"
                alt=""
              />
              <div className="text-sm text-[#0000FF]">Load More</div>
            </div>
          </div>
        </ScrollArea>
      </motion.div>
    </div>
  );
}