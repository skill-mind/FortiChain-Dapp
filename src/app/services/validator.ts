import { Contract, Provider, Account } from "starknet";
import { FORTICHAIN_ABI } from "@/app/abi/fortichain-abi";

const CONTRACT_ADDRESS =
  "0x076c1d77832ce056bd13651518b3449c1e0e54413889da31bc261ba8aca0fbb0";

// Create a provider for read-only contract calls
const provider = new Provider({ nodeUrl: process.env.NEXT_PUBLIC_RPC_URL! });

export const getTotalValidators = async (): Promise<number> => {
  const contract = new Contract(FORTICHAIN_ABI, CONTRACT_ADDRESS, provider);
  const result = await contract.get_total_validators();
  // result may be a BN or object, adjust as needed
  return Number(result);
};

export const getValidator = async (id: number): Promise<any> => {
  const contract = new Contract(FORTICHAIN_ABI, CONTRACT_ADDRESS, provider);
  const result = await contract.get_validator(id);
  return result;
};

export const approveValidator = async (account: Account, id: number) => {
  const contract = new Contract(FORTICHAIN_ABI, CONTRACT_ADDRESS, account);
  const tx = await contract.approve_validator_profile(id);
  await provider.waitForTransaction(tx.transaction_hash);
  return tx;
};

export const rejectValidator = async (account: Account, id: number) => {
  const contract = new Contract(FORTICHAIN_ABI, CONTRACT_ADDRESS, account);
  const tx = await contract.reject_validator_profile(id);
  await provider.waitForTransaction(tx.transaction_hash);
  return tx;
};
