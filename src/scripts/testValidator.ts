import { getTotalValidators, getValidator } from "@/app/services/validator";

(async () => {
  try {
    console.log("Fetching total validators...");
    const total = await getTotalValidators();
    console.log("Total Validators:", total);

    if (total > 0) {
      console.log("Fetching first validator...");
      const validator = await getValidator(0);
      console.log("Validator #0:", validator);
    }
  } catch (error) {
    console.error("Error testing validator functions:", error);
  }
})();
