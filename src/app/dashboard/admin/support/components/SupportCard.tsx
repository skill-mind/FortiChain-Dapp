
import Image from "next/image";
import { StatCard } from "../../../components/resuables/StatsCard";

import open from "../../../../../../public/adminIcon/open.svg";
import resolevd from "../../../../../../public/adminIcon/resolved.svg";
import Inprog from "../../../../../../public/adminIcon/progress.svg";

export default function SupportCard () {

const stats = [
    {
      id: 1,
      icon: <Image src={open} alt={"icon"} height={30} width={30} />,
      value: "80",
      label: "Total Tickets",
    },
    {
      id: 2,
      icon: <Image src={open} alt={"icon"} height={30} width={30} />,
      value: "10",
      label: "Open Tickets",
    },
    {
      id: 3,
      icon: <Image src={Inprog} alt={"icon"} height={30} width={30} />,
      value: "20",
      label: "In Progress",
    },
    {
        id: 4,
        icon: <Image src={resolevd} alt={"icon"} height={30} width={30} />,
        value: "15",
        label: "Resolved Tickets",
      },
];
    
  return(
    <div className=" px-2 py-6">
        <div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <StatCard
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                className="w-[65px]"
              />
            ))}
          </div>
</div>
</div>
  );
};