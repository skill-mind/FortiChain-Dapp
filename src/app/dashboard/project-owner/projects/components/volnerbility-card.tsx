import { Badge } from "@/components/ui/badge";

interface VulnerabilityCardProps {
  id: string;
  date: string;
  title: string;
  severity: string;
  rating: number;
  bounty: number;
}

export default function VulnerabilityCard({ id, date, title, severity, rating, bounty }: VulnerabilityCardProps) {
  return (
    <div className="bg-[#110D0F]  border borer-[#464043] rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#6b6668]">{id}</span>
        <span className="text-[#6b6668]">{date}</span>
      </div>
      <h4 className="text-white font-medium mb-4">{title}</h4>
      <div className="flex justify-between items-center">
        <Badge className="bg-[#ae2727] text-white">{severity}</Badge>
        <div className="flex items-center space-x-4">
          <span className="text-white">{rating}</span>
          <span className="text-white">${bounty}</span>
        </div>
      </div>
    </div>
  );
}
