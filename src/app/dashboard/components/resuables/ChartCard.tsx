import React from "react";

interface ChatCardProps {
  role: "Validator" | "Researcher";
  name: string;
  address: string;
  message: string;
  stats: { label: string; value: string | number }[];
  reputation: number;
}

const ChatCard: React.FC<ChatCardProps> = ({
  role,
  name,
  address,
  message,
  stats,
  reputation,
}) => {
  return (
    <div className="w-full bg-[#0d0d0d] text-white rounded-xl p-4 space-y-3 border border-gray-800">
      {/* Role */}
      <p className="text-sm text-gray-400">{role}</p>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-xs text-gray-500">{address}</p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-gray-900 rounded-lg p-4 text-sm leading-relaxed">
        {message}
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-3 items-center text-xs text-gray-400">
        {stats.map((s, i) => (
          <span key={i}>
            {s.label} | <span className="text-white">{s.value}</span>
          </span>
        ))}
        <span>
          Reputation | <span className="text-white">{reputation}%</span>
        </span>
      </div>

      {/* Input Box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Type your message...."
          className="w-full bg-transparent border border-gray-700 rounded-lg p-2 text-sm pr-10 focus:outline-none focus:border-gray-500"
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
          ➤
        </button>
      </div>

      <p className="text-[10px] text-gray-500 text-center">
        All conversations are monitored and recorded for security purposes.
      </p>
    </div>
  );
};

export default ChatCard;
