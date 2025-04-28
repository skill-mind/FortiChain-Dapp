"use client";

import { motion } from "framer-motion";
import type { Project } from "../../researcher/projects/mockData";
import Image from "next/image";
import Link from "next/link";

type Props = {
  project: Project;
};

//  pick top two langs and normalize them to 100%
function getTopTwoNormalized(
  langs: Record<
    string,
    { percentage: number; bgColor: string; logo: string; icon: string }
  >
) {
  const entries = Object.values(langs)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 2);

  const total = entries.reduce((sum, l) => sum + l.percentage, 0) || 1;
  return entries.map((l) => ({
    ...l,
    normalized: (l.percentage / total) * 100,
  }));
}

export const ProjectCard: React.FC<Props> = ({ project }) => {
  const top = getTopTwoNormalized(project.language ?? {});

  // 📝Fallback for project‐level logo: if none, use first lang’s icon/bg
  const fallback = top[0] ?? { icon: "?", bgColor: "bg-gray-700" };
  const logoText = project.logo.text || fallback.icon;
  const logoBg = project.logo.bgColor || fallback.bgColor;

  const shortenText = (text: string, max: number) => {
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const last = cut.lastIndexOf(" ");
    return last > 0 ? `${cut.slice(0, last)}…` : `${cut}…`;
  };

  return (
    <Link
      href={`/dashboard/researcher/projects/${project.id}`}
      className="block col-span-12 sm:col-span-6 lg:col-span-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-[#110D0F] text-white p-6 rounded-2xl border border-gray-700 w-full max-w-md">
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-2xl overflow-hidden">
            {project.logo.logo ? (
              <Image
                src={project.logo.logo}
                alt={project.title}
                width={48}
                height={48}
                className="object-cover"
              />
            ) : (
              <div
                className={`${logoBg} text-black font-bold p-3 rounded-full`}>
                {logoText}
              </div>
            )}
          </div>
          <h2 className="text-xl font-semibold">{project.title}</h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-sm text-gray-400 mb-6 min-h-[54px] leading-5">
          {shortenText(project.description, 150)}
        </motion.p>

        {/* Amount & Deadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="flex items-center gap-[13px] text-sm mb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/researcherIcon/moneyBag.svg"
              alt="Money bag"
              width={15}
              height={15}
            />
            {project.amount}
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/researcherIcon/deadLine.svg"
              alt="Deadline"
              width={15}
              height={15}
            />
            Deadline: {project.deadline}
          </div>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-transparent border-[#464043] border text-xs py-1 px-3 rounded-full">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Progress Bar (top 2 langs) */}
        {top.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="w-full h-6 rounded-full overflow-hidden">
            <div className="flex h-full w-full -space-x-4">
              {top.map((lang) => (
                <div
                  key={lang.icon || lang.logo}
                  className={`${lang.bgColor} flex items-center justify-between text-xs px-4 rounded-full font-bold text-white transition-all duration-500 ease-in-out`}
                  style={{ flexBasis: `${lang.normalized}%` }}>
                  {lang.logo ? (
                    <Image
                      src={lang.logo}
                      alt={`${lang.icon} logo`}
                      width={12}
                      height={12}
                      className="inline-block"
                    />
                  ) : (
                    <span>{lang.icon}</span>
                  )}
                  <span>{Math.round(lang.normalized)}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
};
