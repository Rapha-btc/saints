;; This tells our code to lock that nft until expiry time, and can be unlocked by the private key that correspond to the public key in the args array. 
;; You should add another path arg like this : 
;; ```
;; # Lock operation (3 API calls)

mutation createEscrow {
  createEscrow(
    data: {
      collateral: {
        assets: [
          {
            type: "btc.utxo"
            content: {
              meta: { amount: "1067" }
              node: {
                id: "eb4b461cd5f5cd103c9b0789d149437eca0c1154ce5d14098e77f09cb1465b95"
                sequence: 1
                publicKey: "1527224d68008a5b8f8c04ffc10cb7f347d0374cb2fd4357f30c4b27afe89bc8"
                value: "tb1p2kap5msfakxsnfacywnp6qwppza0cpk2423krtekhdek88sfdqtse2fkf0"
              }
            }
            action: {
              configuration: {
                paths: [
                  {
                    tag: "unlock"
                    fn: "time"
                    args: [
                      "2023-08-25 17:49:18"
                      "1527224d68008a5b8f8c04ffc10cb7f347d0374cb2fd4357f30c4b27afe89bc8"
                    ]
                  }
                   {
                    tag: "burn"
                    fn: "identity"
                    args: [
                    ]
                  }
                ]
              }
              type: "lock"
            }
            addresses: [
              {
                value: "tb1p2kap5msfakxsnfacywnp6qwppza0cpk2423krtekhdek88sfdqtse2fkf0"
                type: "change"
                publicKey: "1527224d68008a5b8f8c04ffc10cb7f347d0374cb2fd4357f30c4b27afe89bc8"
              }
            ]
          }
          {
            type: "btc.address"
            content: {
              node: {
                publicKey: "03d0bc04edde7d0e515bd64e01b01275b760a49f7b2bb5e8b3ad3d6820ea632bbd"
                value: "2N1mJRYwgHDPFUvUYaAbBh1FDjqY9cVraDM"
              }
            }
            action: { type: "fee" }
            addresses: [
              {
                value: "2N1mJRYwgHDPFUvUYaAbBh1FDjqY9cVraDM"
                type: "change"
                publicKey: "03d0bc04edde7d0e515bd64e01b01275b760a49f7b2bb5e8b3ad3d6820ea632bbd"
              }
            ]
          }
        ]
      }
    }
  ) {
    id
  }
}

mutation executeEscrow {
  executeEscrow(where: { id: "ID_FROM_PREVIOUS_OPERATION" }) {
    id
  }
}

mutation broadcastEscrow {
  broadcastEscrow(
    data: {
      id: "ID_FROM_PREVIOUS_OPERATION"
      transactions: [{ hex: "SIGNED_HEX", base64: "SIGNED_BASE_64" }]
    }
  ) {
    id
  }
}
```