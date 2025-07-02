import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import React from "react";


export default function DocAndApiPage() {
  return (
    <div className="min-h-screen bg-[#000000ab] text-white">
     <Navbar />

      <main className="px-4 md:px-20 py-12">
        <h2 className="font-bold text-2xl text-red-800">Coming Soon</h2>
        <section id="overview" className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Developer Documentation</h2>
          <p className="text-lg max-w-3xl">
            FortiChain provides a comprehensive API and smart contract toolkit for
            integrating secure vulnerability reporting, bounty automation, and project
            management directly into your dApp or platform. With intuitive endpoints,
            powerful Web3 integrations, and detailed examples, our docs are your first step
            to building securely.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-black">Quickstart Guide</h3>
              <p className="text-sm text-gray-600">Start integrating FortiChain in under 10 minutes.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-black">Smart Contract Registry API</h3>
              <p className="text-sm text-gray-600 ">Register, update and verify smart contracts on-chain.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-black">Bounty Escrow Automation</h3>
              <p className="text-sm text-gray-600">Use our smart contract templates to automate bounties.</p>
            </div>
          </div>
        </section>

        <section id="api" className="mb-16">
          <h2 className="text-4xl font-bold mb-4">API Licensing</h2>
          <p className="text-lg max-w-3xl">
            FortiChain’s APIs are open for developer use under a tiered licensing model:
            Open Source, Commercial, and Enterprise. Choose the tier that fits your project
            size and intended usage.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-blue-700 mb-2">Open Source</h3>
              <ul className="text-sm list-disc list-inside text-gray-700">
                <li>Free for personal and academic use</li>
                <li>Basic API rate limits (1,000 requests/day)</li>
                <li>Community support only</li>
              </ul>
              <p className="mt-4 font-semibold text-blue-600">Price: $0/month</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-green-700 mb-2">Commercial</h3>
              <ul className="text-sm list-disc list-inside text-gray-700">
                <li>Priority email support</li>
                <li>Higher rate limits (50,000 requests/month)</li>
                <li>Access to detailed usage analytics</li>
                <li>Audit dashboard access</li>
              </ul>
              <p className="mt-4 font-semibold text-green-600">Price: $99/month</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-purple-700 mb-2">Enterprise</h3>
              <ul className="text-sm list-disc list-inside text-gray-700">
                <li>Unlimited API access</li>
                <li>Dedicated account manager</li>
                <li>24/7 support with SLA</li>
                <li>Custom integrations & onboarding</li>
              </ul>
              <p className="mt-4 font-semibold text-purple-600">Price: Contact Us</p>
            </div>
          </div>
        </section>

        <section id="compare" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse text-sm text-left">
              <thead>
                <tr className="bg-[#000000ab] border border-gray-600 rounded-lg">
                  <th className="p-3">Feature</th>
                  <th className="p-3">Open Source</th>
                  <th className="p-3">Commercial</th>
                  <th className="p-3">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">API Requests</td>
                  <td className="p-3">1,000/day</td>
                  <td className="p-3">50,000/month</td>
                  <td className="p-3">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Support</td>
                  <td className="p-3">Community</td>
                  <td className="p-3">Priority Email</td>
                  <td className="p-3">24/7 SLA</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Usage Analytics</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Yes</td>
                  <td className="p-3">Advanced</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Audit Dashboard</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Yes</td>
                  <td className="p-3">Yes</td>
                </tr>
                <tr>
                  <td className="p-3">Custom Integrations</td>
                  <td className="p-3">—</td>
                  <td className="p-3">—</td>
                  <td className="p-3">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">How do I authenticate with the API?</h3>
              <p className="text-sm text-gray-700">You authenticate using an API key obtained from the API page .</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Can I upgrade my plan later?</h3>
              <p className="text-sm text-gray-700">Yes. You can upgrade anytime from your billing settings in the dashboard.</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">What happens if I exceed the rate limit?</h3>
              <p className="text-sm text-gray-700">Your requests will be throttled until your limit resets. Consider upgrading your plan for higher limits.</p>
            </div>
          </div>
        </section>

        <section id="terms" className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Terms & Compliance</h2>
          <p className="text-lg max-w-3xl">
            All users of the FortiChain API must comply with our ethical disclosure and
            bounty usage policies. Unauthorized use of vulnerability data or exploitation
            of systems is strictly prohibited.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Read our full <a href="/terms-and-condition" className="text-blue-600 underline">Terms and Conditions</a>,
            Privacy Policy, and API usage guidelines for more information.
          </p>
        </section>

        <section id="contact" className="mb-10">
          <h2 className="text-4xl font-bold mb-4">Contact & Support</h2>
          <p className="text-lg max-w-3xl">
            Need help or want to discuss an enterprise integration? Our support team is ready
            to assist.
          </p>
          <a
            href="mailto:support@fortichain.io"
            className="mt-4 inline-block bg-blue-600 text-white py-2 px-6 rounded-xl shadow hover:bg-blue-700"
          >
            Email Support
          </a>
        </section>
      </main>

    <Footer />
    </div>
  );
}
