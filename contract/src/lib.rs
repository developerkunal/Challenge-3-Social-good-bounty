use std::collections::HashMap;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LazyOption, LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::json_types::{Base64VecU8, U128};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, near_bindgen, AccountId, Balance, CryptoHash, PanicOnDefault, Promise, PromiseOrValue,
};

use crate::internal::*;
pub use crate::metadata::*;
pub use crate::mint::*;
pub use crate::nft_core::*;
pub use crate::approval::*;
pub use crate::royalty::*;
pub use crate::events::*;
pub use crate::zoo::*;

mod internal;
mod approval; 
mod enumeration; 
mod metadata; 
mod mint; 
mod nft_core; 
mod royalty; 
mod events;
mod zoo;




/// This spec can be treated like a version of the standard.
pub const NFT_METADATA_SPEC: &str = "1.0.0";
/// This is the name of the NFT standard we're using
pub const NFT_STANDARD_NAME: &str = "nep171";
const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/png;base64,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";
            
#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, Clone)]
#[serde(crate = "near_sdk::serde")]
pub struct CardAttr {
    pub food: u128,
    pub feed: u128,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    //contract owner
    pub owner_id: AccountId,

    //keeps track of all the token IDs for a given account
    pub tokens_per_owner: LookupMap<AccountId, UnorderedSet<TokenId>>,

    //keeps track of the token struct for a given token ID
    pub tokens_by_id: LookupMap<TokenId, Token>,
    
    
    //keeps track of the token struct for a given token ID

    pub card_attr: LookupMap<TokenId, CardAttr>,

    //keeps track of the token metadata for a given token ID
    pub token_metadata_by_id: UnorderedMap<TokenId, TokenMetadata>,

    //keeps track of the metadata for the contract
    pub metadata: LazyOption<NFTContractMetadata>,
}

/// Helper structure for keys of the persistent collections.
#[derive(BorshSerialize)]
pub enum StorageKey {
    TokensPerOwner,
    TokenPerOwnerInner { account_id_hash: CryptoHash },
    TokensById,
    TokenMetadataById,
    NFTContractMetadata,
    CardAttr,
    TokensPerType,
    TokensPerTypeInner { token_type_hash: CryptoHash },
    TokenTypesLocked,
}

#[near_bindgen]
impl Contract {
    /*
        initialization function (can only be called once).
        this initializes the contract with default metadata so the
        user doesn't have to manually type metadata.
    */
    #[init]
    pub fn new_default_meta(owner_id: AccountId) -> Self {
        //calls the other function "new: with some default metadata and the owner_id passed in 
        Self::new(
            owner_id,
            NFTContractMetadata {
                spec: "nft-1.0.0".to_string(),
                name: "Near Showcode Social Bounty NFT".to_string(),
                symbol: "ZOONFT".to_string(),
                icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
                base_uri: None,
                reference: None,
                reference_hash: None,
            },
        )
    }

    /*
        initialization function (can only be called once).
        this initializes the contract with metadata that was passed in and
        the owner_id. 
    */
    #[init]
    pub fn new(owner_id: AccountId, metadata: NFTContractMetadata) -> Self {
        //create a variable of type Self with all the fields initialized. 
        let this = Self {
            //Storage keys are simply the prefixes used for the collections. This helps avoid data collision
            tokens_per_owner: LookupMap::new(StorageKey::TokensPerOwner.try_to_vec().unwrap()),
            tokens_by_id: LookupMap::new(StorageKey::TokensById.try_to_vec().unwrap()),
            token_metadata_by_id: UnorderedMap::new(
                StorageKey::TokenMetadataById.try_to_vec().unwrap(),
            ),

            card_attr: LookupMap::new(StorageKey::CardAttr.try_to_vec().unwrap()),

            //set the owner_id field equal to the passed in owner_id. 
            owner_id,
            metadata: LazyOption::new(
                StorageKey::NFTContractMetadata.try_to_vec().unwrap(),
                Some(&metadata),
            ),
        };

        //return the Contract object
        this
    }
}