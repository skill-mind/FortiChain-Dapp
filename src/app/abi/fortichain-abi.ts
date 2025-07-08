import { Abi } from "starknet";

export const FORTICHAIN_ABI: Abi = [
  {
    type: "impl",
    name: "FortichainImpl",
    interface_name:
      "fortichain_contracts::interfaces::IFortichain::IFortichain",
  },
  {
    type: "struct",
    name: "core::byte_array::ByteArray",
    members: [
      {
        name: "data",
        type: "core::array::Array::<core::bytes_31::bytes31>",
      },
      {
        name: "pending_word",
        type: "core::felt252",
      },
      {
        name: "pending_word_len",
        type: "core::integer::u32",
      },
    ],
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    type: "struct",
    name: "core::integer::u256",
    members: [
      {
        name: "low",
        type: "core::integer::u128",
      },
      {
        name: "high",
        type: "core::integer::u128",
      },
    ],
  },
  {
    type: "struct",
    name: "fortichain_contracts::base::types::Project",
    members: [
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "info_uri",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "creator_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "smart_contract_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "contact",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "signature_request",
        type: "core::bool",
      },
      {
        name: "is_active",
        type: "core::bool",
      },
      {
        name: "is_completed",
        type: "core::bool",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "struct",
    name: "fortichain_contracts::base::types::Escrow",
    members: [
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "project_id",
        type: "core::integer::u256",
      },
      {
        name: "projectOwner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "amount",
        type: "core::integer::u256",
      },
      {
        name: "isLocked",
        type: "core::bool",
      },
      {
        name: "lockTime",
        type: "core::integer::u64",
      },
      {
        name: "is_active",
        type: "core::bool",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "struct",
    name: "fortichain_contracts::base::types::Report",
    members: [
      {
        name: "id",
        type: "core::integer::u256",
      },
      {
        name: "contributor_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "project_id",
        type: "core::integer::u256",
      },
      {
        name: "report_data",
        type: "core::byte_array::ByteArray",
      },
      {
        name: "created_at",
        type: "core::integer::u64",
      },
      {
        name: "updated_at",
        type: "core::integer::u64",
      },
    ],
  },
  {
    type: "interface",
    name: "fortichain_contracts::interfaces::IFortichain::IFortichain",
    items: [
      {
        type: "function",
        name: "register_project",
        inputs: [
          {
            name: "project_info",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "smart_contract_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "contact",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "signature_request",
            type: "core::bool",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "edit_project",
        inputs: [
          {
            name: "id",
            type: "core::integer::u256",
          },
          {
            name: "info_uri",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "smart_contract_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "contact",
            type: "core::byte_array::ByteArray",
          },
          {
            name: "signature_request",
            type: "core::bool",
          },
          {
            name: "is_active",
            type: "core::bool",
          },
          {
            name: "is_completed",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "close_project",
        inputs: [
          {
            name: "id",
            type: "core::integer::u256",
          },
          {
            name: "creator_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_project",
        inputs: [
          {
            name: "id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "fortichain_contracts::base::types::Project",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "total_projects",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "all_completed_projects",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<fortichain_contracts::base::types::Project>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "all_in_progress_projects",
        inputs: [],
        outputs: [
          {
            type: "core::array::Array::<fortichain_contracts::base::types::Project>",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "mark_project_completed",
        inputs: [
          {
            name: "id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "mark_project_in_progress",
        inputs: [
          {
            name: "id",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "view_escrow",
        inputs: [
          {
            name: "id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "fortichain_contracts::base::types::Escrow",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "fund_project",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "lockTime",
            type: "core::integer::u64",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "pull_escrow_funding",
        inputs: [
          {
            name: "escrow_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "add_escrow_funding",
        inputs: [
          {
            name: "escrow_id",
            type: "core::integer::u256",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "process_payment",
        inputs: [
          {
            name: "payer",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_erc20_address",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "submit_report",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "link_to_work",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "approve_a_report",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "submit_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "pay_an_approved_report",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "submitter_Address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_contributor_report",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "submitter_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "(core::felt252, core::bool)",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_list_of_approved_contributors",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::array::Array::<core::starknet::contract_address::ContractAddress>",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_contributor_paid_status",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "submitter_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "set_role",
        inputs: [
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "is_enable",
            type: "core::bool",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "is_validator",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "new_report",
        inputs: [
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "link_to_work",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [
          {
            type: "core::integer::u256",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "get_report",
        inputs: [
          {
            name: "report_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "fortichain_contracts::base::types::Report",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "delete_report",
        inputs: [
          {
            name: "report_id",
            type: "core::integer::u256",
          },
          {
            name: "project_id",
            type: "core::integer::u256",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "update_report",
        inputs: [
          {
            name: "report_id",
            type: "core::integer::u256",
          },
          {
            name: "project_id",
            type: "core::integer::u256",
          },
          {
            name: "link_to_work",
            type: "core::byte_array::ByteArray",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "withdraw_bounty",
        inputs: [
          {
            name: "amount",
            type: "core::integer::u256",
          },
          {
            name: "recipient",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "(core::bool, core::integer::u256)",
          },
        ],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "add_user_bounty_balance",
        inputs: [
          {
            name: "user",
            type: "core::starknet::contract_address::ContractAddress",
          },
          {
            name: "amount",
            type: "core::integer::u256",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "OwnableImpl",
    interface_name: "openzeppelin_access::ownable::interface::IOwnable",
  },
  {
    type: "interface",
    name: "openzeppelin_access::ownable::interface::IOwnable",
    items: [
      {
        type: "function",
        name: "owner",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "transfer_ownership",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_ownership",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "impl",
    name: "SRC5Impl",
    interface_name: "openzeppelin_introspection::interface::ISRC5",
  },
  {
    type: "interface",
    name: "openzeppelin_introspection::interface::ISRC5",
    items: [
      {
        type: "function",
        name: "supports_interface",
        inputs: [
          {
            name: "interface_id",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    type: "impl",
    name: "AccessControlImpl",
    interface_name:
      "openzeppelin_access::accesscontrol::interface::IAccessControl",
  },
  {
    type: "interface",
    name: "openzeppelin_access::accesscontrol::interface::IAccessControl",
    items: [
      {
        type: "function",
        name: "has_role",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "get_role_admin",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
        ],
        outputs: [
          {
            type: "core::felt252",
          },
        ],
        state_mutability: "view",
      },
      {
        type: "function",
        name: "grant_role",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "revoke_role",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        type: "function",
        name: "renounce_role",
        inputs: [
          {
            name: "role",
            type: "core::felt252",
          },
          {
            name: "account",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    type: "constructor",
    name: "constructor",
    inputs: [
      {
        name: "erc20",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    type: "event",
    name: "fortichain_contracts::fortichain::Fortichain::ProjectStatusChanged",
    kind: "struct",
    members: [
      {
        name: "project_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "status",
        type: "core::bool",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "fortichain_contracts::fortichain::Fortichain::EscrowCreated",
    kind: "struct",
    members: [
      {
        name: "escrow_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "unlock_time",
        type: "core::integer::u64",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "fortichain_contracts::fortichain::Fortichain::EscrowFundingPulled",
    kind: "struct",
    members: [
      {
        name: "escrow_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "fortichain_contracts::fortichain::Fortichain::EscrowFundsAdded",
    kind: "struct",
    members: [
      {
        name: "escrow_id",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "new_amount",
        type: "core::integer::u256",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "fortichain_contracts::fortichain::Fortichain::BountyWithdrawn",
    kind: "struct",
    members: [
      {
        name: "user",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "amount",
        type: "core::integer::u256",
        kind: "data",
      },
      {
        name: "recipient",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "timestamp",
        type: "core::integer::u64",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    kind: "struct",
    members: [
      {
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      {
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        kind: "nested",
      },
      {
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "account",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
      {
        name: "sender",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
    kind: "struct",
    members: [
      {
        name: "role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "previous_admin_role",
        type: "core::felt252",
        kind: "data",
      },
      {
        name: "new_admin_role",
        type: "core::felt252",
        kind: "data",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event",
    kind: "enum",
    variants: [
      {
        name: "RoleGranted",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleGranted",
        kind: "nested",
      },
      {
        name: "RoleRevoked",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleRevoked",
        kind: "nested",
      },
      {
        name: "RoleAdminChanged",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::RoleAdminChanged",
        kind: "nested",
      },
    ],
  },
  {
    type: "event",
    name: "openzeppelin_introspection::src5::SRC5Component::Event",
    kind: "enum",
    variants: [],
  },
  {
    type: "event",
    name: "fortichain_contracts::fortichain::Fortichain::Event",
    kind: "enum",
    variants: [
      {
        name: "ProjectStatusChanged",
        type: "fortichain_contracts::fortichain::Fortichain::ProjectStatusChanged",
        kind: "nested",
      },
      {
        name: "EscrowCreated",
        type: "fortichain_contracts::fortichain::Fortichain::EscrowCreated",
        kind: "nested",
      },
      {
        name: "EscrowFundingPulled",
        type: "fortichain_contracts::fortichain::Fortichain::EscrowFundingPulled",
        kind: "nested",
      },
      {
        name: "EscrowFundsAdded",
        type: "fortichain_contracts::fortichain::Fortichain::EscrowFundsAdded",
        kind: "nested",
      },
      {
        name: "BountyWithdrawn",
        type: "fortichain_contracts::fortichain::Fortichain::BountyWithdrawn",
        kind: "nested",
      },
      {
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
        kind: "flat",
      },
      {
        name: "AccessControlEvent",
        type: "openzeppelin_access::accesscontrol::accesscontrol::AccessControlComponent::Event",
        kind: "flat",
      },
      {
        name: "SRC5Event",
        type: "openzeppelin_introspection::src5::SRC5Component::Event",
        kind: "flat",
      },
    ],
  },
];
