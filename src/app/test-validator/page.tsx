"use client";
import { useEffect } from "react";
import { getTotalValidators, getValidator } from "@/app/services/validator";

export default function TestValidatorPage() {
  useEffect(() => {
    const runTests = async () => {
      try {
        const total = await getTotalValidators();
        console.log("Total Validators:", total);

        if (total > 0) {
          const validator = await getValidator(0);
          console.log("Validator #0:", validator);
        }
      } catch (err) {
        console.error("Error testing validator functions:", err);
      }
    };
    runTests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Testing Validator Functions</h1>
      <p>Open your browser console to see the test output.</p>
    </div>
  );
}
