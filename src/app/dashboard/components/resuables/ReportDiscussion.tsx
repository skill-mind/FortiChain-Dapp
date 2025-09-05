import ChatCard from "./ChartCard";

const ReportDiscussion = () => {
  return (
    <div className="space-y-4">
      <ChatCard
        role="Validator"
        name="Yunus"
        address="0xA7d5Bc67eA...B2cF9a1B"
        message="Hi, Thanks for the report! We reproduced the XSS issue. We’re assessing severity and prioritizing a fix. Update in ~5 days."
        stats={[
          { label: "Ranks", value: 5 },
          { label: "Validations Made", value: 1 },
        ]}
        reputation={98}
      />

      <ChatCard
        role="Researcher"
        name="Ebube"
        address="0xA7d5Bc67eA...B2cF9a1B"
        message={`Hello Yunus, I found a stored XSS vuln in [App Name]'s profile page. Injecting <script>alert('XSS')</script> in the name field executes on public profiles. High impact—could steal sessions. PoC attached.\n\nSuggestions: Sanitize inputs, add CSP. Need more details?`}
        stats={[
          { label: "Ranks", value: 12 },
          { label: "Audits Made", value: 2 },
        ]}
        reputation={91}
      />
    </div>
  );
};

export default ReportDiscussion;
