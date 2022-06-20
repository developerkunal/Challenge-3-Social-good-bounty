use crate::*;
#[near_bindgen]

impl Contract {
    #[payable]
    pub fn feed(&mut self,token_id:TokenId) -> CardAttr {

        let card_attr = self.card_attr.get(&token_id).unwrap();
        assert!(
            card_attr.food != 0,
            "You have no enough food"
        );
        let new_card_attributes = CardAttr {
            food: card_attr.food - 1,
            feed: card_attr.feed + 1,
        };

        self.card_attr.insert(&token_id, &new_card_attributes);
        return new_card_attributes
    }

    pub fn get_attributes(&self,token_id: &String,
    ) -> Option<CardAttr> {
        let have_token = self.check_token(token_id.to_string());
        assert!(
            have_token,
            "You are not owner of this token"
        );

        return self.card_attr.get(&token_id);
    }

    #[payable]
    pub fn buy_food(
        &mut self,token_id: &String,

    ) {
        let food_deposit = env::attached_deposit();
        let have_token = self.check_token(token_id.to_string());

        assert!(
            have_token,
            "You are not owner of this token"
        );

        let food_count = food_deposit / 1000000000000000000000000;
        let card_attributes = self.card_attr.get(&token_id).unwrap();
        let new_card_attributes = CardAttr {
            food: card_attributes.food + food_count,
            feed: card_attributes.feed,
        };

        self.card_attr.insert(&token_id, &new_card_attributes);
    }
}
