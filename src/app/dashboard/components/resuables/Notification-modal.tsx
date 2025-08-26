import { DropdownMenuContent } from "@/components/ui/dropdown-menu";
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

const dummy_notifications: Notification[] = [
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
    title: "Fund Released",
    description:
      "Your escrow funds of 1,500 STRK (~$2,000) are now available for withdrawal.",
    actionText: "Withdraw Now",
    timeAgo: "10 mins ago",
    imageSrc: "/notification-icons/money-bag.png",
  },
  {
    id: 3,
    type: "Bounty Paid Out",
    title: "Bounty Paid Out",
    description:
      "A researcher has received their bounty for their report on SecureChain.",
    actionText: "View Details",
    timeAgo: "1 hour ago",
    imageSrc: "/notification-icons/green-tick.png",
  },
  {
    id: 4,
    type: "New submission",
    title: "New submission",
    description:
      "A security researcher submitted a new bug report. Please review and take action.",
    actionText: "Review Submission",
    timeAgo: "30 mins ago",
    imageSrc: "/notification-icons/file.png",
  },
];

export default function NotificationModal() {
  const notificationItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <DropdownMenuContent className="bg-[#090909] p-6 rounded-[8px] border border-[#1F1F1F] w-[430px] relative text-[#E2E2E2] flex flex-col text-sm h-[461px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium">Notifications</h2>
        <button className="py-2 px-5 bg-[#1C1C1C] rounded-full">
          Mark all as read
        </button>
      </div>

      <div className="flex flex-col gap-y-3 overflow-y-auto flex-1">
        {dummy_notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            variants={notificationItemVariants}
            transition={{ delay: index * 0.05 }}
            className="p-3 bg-[#101011] gap-x-3 rounded-xl flex items-center"
          >
            <div className="h-2 w-2 bg-[#0073E6] rounded-full"></div>
            <div className="flex-1">
              <h5 className="mb-1 text-[#6C6C6C] text-xs font-light">
                Tuesday, July 1, 2025 - 8:00AM
              </h5>
              <h3 className="text-[#E2E2E2] text-base font-medium mb-1">
                {notification.title}
              </h3>
              <p className="text-[#6C6C6C]">{notification.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </DropdownMenuContent>
  );
}
