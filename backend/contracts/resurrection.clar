;; Resurrection

;; Dr. $uss of $aints is aiming to pioneer a first-of-its-kind $aint resurection from Stacks (aka "Evil 3 letters") 
;; to Bitcoin ordinals, via a two-way bridge. The proposed process is:

;; 1. The NFT owner on Stacks designates their Bitcoin Wallet (smart contract on STX)
;; 2. They then lock their NFT into the smart contract 
;; 3. The Saints web portal then permits the specified Bitcoin address to inscribe the $aint resurected Bitcoin ordinals.

;; 4. once it's inscribed then you can burn it
;; when the inscription happens, the clarity reads it? and in turn burns it
;; method that takes bitcoin transaction that is minting/insribing the ordinal
;; verifies that transaction-> in the bitcoin TSX you will want the NFT id 
;; 'cant-be-evil.stx' (smart contract lacks a burn function).

;; A question remains: does Dr. $uss need an oracle/DeepLake for step 3?
;; Answer: Deeplake oracle will be able to check that the nft was burnt

;; The potential hype for this project is significant, given the high-profile community involved. 
;; As Trevor says, the quality of a community's members dictates its market cap.

;; Returning from Bitcoin to STX follows this process:

;; To bridge from Bitcoin to STX, it may be prudent to wait until the sBTC protocol enables such conversions. 
;; We suggest developing a fresh set of Stacks contracts that would ensure a maximum limit 
;; for the entire collection or establish a mechanism to freeze it once it reaches 777.
;; In the event that the IPFS image or video becomes inaccessible in the future, the holder of the NFT 
;; on the Stacks (STX) blockchain will retain control over the ordinal on Bitcoin.

(define-constant POWER-OF-GOD tx-sender) ;; The resurrection of Jesus is seen as a demonstration of God's power over life and death.
(define-constant EVIL-SAINT 'SP000000000000000000002Q6VF78) ;; EVIL-$AINT ST000000000000000000002AMW42H

;; I need a map of the sleepers and their corresponding muad-dibs
(define-map sleepers uint {
    sleeper: principal, ;; the sleeper
    messiah: (string-ascii 52), ;; btc address that is allowed by the Oracle to inscribe the ordinal
    muad-dib: (string-ascii 62), ;; ordinal receiver address - 62?
    }) ;; He who controls the spice controls the universe.

;; 1. The NFT owner on Stacks designates their Ordinal and btc Wallet (smart contract on STX)
;; 2. They then transfer their NFT to 'cant-be-evil.stx' (smart contract lacks a burn function).
(define-public (the-sleeper-has-awakened (token-id uint) (messiah (string-ascii 52)) (muad-dib (string-ascii 62))) ;; or 62?
    (let
        (
            (the-sleeper (unwrap! (contract-call? .saints get-owner token-id) (err "err-unicorn"))) ;; the owner of the evil $aint is the sleeper
            (sleeper (unwrap! the-sleeper (err "err-sleeper")))

        )
        (asserts! (is-eq the-sleeper (some tx-sender))  (err "err-sleeper-s-sole-awakening")) ;; the sleeper can awaken

        ;; The water of life - the spice - is the most precious substance in the universe
        ;; The spice of agony - The Water of Life is known to be extremely dangerous, and most individuals who attempt to undergo the ritual die in the process. 
        (unwrap! (contract-call? .saints transfer token-id sleeper POWER-OF-GOD) (err "err-cant-cross-the-Styx")) ;; the sleeper must burn the evil $aint

        ;; The ritual triggers a profound transformation within him, enhancing his mental and prescient abilities to an extraordinary degree. It deepens her connection to the collective unconsciousness of humanity and bestows upon her unparalleled prescience and insight.
        ;; Surviving the Water of Life ritual is a critical step in a $aint's journey towards her awakening as Muad'Dib 
        (map-set sleepers token-id {
            sleeper: sleeper, 
            messiah: messiah, 
            muad-dib: muad-dib}) ;; the sleeper has awakened
        (ok true)
    )
) 

;; 3. The Saints web portal then permits the specified Bitcoin address to inscribe the $aint resurected Bitcoin ordinals.
;; Dr Suss provides 167 ASSETS (777) JPEG  
;; Inscription -> Mike

;; 4. once it's inscribed then you can burn it
;; EVIL-SAINT

;; could you inscribe it in a DLC?
;; then it's locked
;; future event is the burnt
;; DLC instantiate / terms of the contract: 
;; outcome 1: a burn event happen on the BC -> oracle releases the signature -> unlocks
;; outcome 2: the inscription is burnt if 
;; create a UI where the user instantiate the DLC, they provide the signature and FEE to mint the NFT on Bitcoin
;; it's locked and they get it once they burn it 





