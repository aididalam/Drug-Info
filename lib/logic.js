/**
 * Drug transaction
 * @param {org.example.biznet.DrugHandover} drugHandOver
 * @transaction
 */
 async function DrugTransaction(drugHandOver) {
  drugHandOver.drug.owner = drugHandOver.newOwner;
      return getAssetRegistry("org.example.biznet.Drug")
        .then(assetRegistry => {
          return assetRegistry.update(drugHandOver.drug); 
        })
        .then(() => {
          let event = getFactory().newEvent(
            "org.example.biznet",
            "HandoverNotification"
          );
          event.drug = drugHandOver.drug;
          emit(event);
        });
}