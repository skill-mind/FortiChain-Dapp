function ProjectSeverityDist() {
  return (
    <div className="w-full p-6 bg-[#101011] rounded-lg">
      <h4 className="text-base font-medium text-white mb-6">
        Project Severity Distribution
      </h4>

      <div className="flex justify-between items-center h-[320px] w-full [&_*]:outline-none px-6">
        {/* TODO: Implement Chart */}
        <div className="w-[228px] h-[228px]"></div>

        <div className="flex flex-col w-[242px]">
          <div className="py-3 border-b border-b-[#1F1F1F] flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <div className="w-2 h-2 bg-[#F7353F] rounded-full"></div>
              <span>High</span>
            </div>
            <div className="text-[#6C6C6C]">25%</div>
          </div>
          <div className="py-3 border-b border-b-[#1F1F1F] flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <div className="w-2 h-2 bg-[#FBB10F] rounded-full"></div>
              <span>Medium</span>
            </div>
            <div className="text-[#6C6C6C]">25%</div>
          </div>
          <div className="py-3 border-b border-b-[#1F1F1F] flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <div className="w-2 h-2 bg-[#0073E6] rounded-full"></div>
              <span>Low</span>
            </div>
            <div className="text-[#6C6C6C]">25%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSeverityDist;
