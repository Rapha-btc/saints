;; Thanks go to Andre.btc, Michael Cohen, Friedger M, Kenny Rogers, Abdelghafour Harraz, Setzeus, Rabbi Gains, Dr. $uss, Hande Ercan and the Human Rights Foundation for their contributions to this project.

;; Resurrection.clar 
;; Dr. $uss of $aints is aiming to pioneer a first-of-its-kind $aint resurection from Stacks (aka "Evil 3 letters") 
;; to Bitcoin ordinals, via a two-way bridge.
;; Dr Suss provides 167 minimized ASSETS (777) JPEG and backs up the original IPFS files on a server or IPFS pinning service.
;; The proposed process is:

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; - T1: Lock NFT in Stacks Smart contract (resurrection.clar) + insert map of [token-id and Taproot Address of receiver]
;; - T2: Inscribe ordinal with assets from Creator + lock ordinal in DLC using DeepLake graphql API
;; - T3: Take T2 transaction and feed it in a method from resurrection.clar that verifies the token-id and Taproot Address of receiver from the Bitcoin T2 transaction is the same as from the insert-map (define-map sleepers in resurrection.clar) and then burns the token-id on Stacks (transfers it to cant-be-evil.stx for $aints and uses the burn function of boom-nfts and seven-bitcoin-days for 21 bitcoins days (get-owner become none)
;; - T4: Outcome 1: release ordinal to Taproot receiver address. Outcome 2: 21 days and no T3 has occured, the Ordinal is sent to a wallet controlled by the Human Rights Foundation or another charity.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; Returning from Bitcoin to STX follows this process:

;; To bridge from Bitcoin to STX, it may be prudent to wait until the sBTC protocol enables such conversions. 
;; See Andre's post on sords https://forum.stacks.org/t/sbtc-ordinals-sords/14623
;; We suggest developing a fresh set of Stacks contracts that would ensure a maximum limit 
;; for the entire collection or establish a mechanism to freeze it once it reaches 777.
;; In the event that image or video become inaccessible in the future on IPFS, the holder of the NFT 
;; on the Stacks (STX) blockchain will retain control over the ordinal on Bitcoin.

(define-constant POWER-OF-GOD tx-sender) ;; Dharma can refer to the inherent nature of reality or the fundamental principles that order the universe. It embodies the understanding that everything is interconnected and governed by natural laws.
(define-constant EVIL-SAINT 'SP000000000000000000002Q6VF78) ;; EVIL-$AINT ST000000000000000000002AMW42H - harma is also the path of righteousness and living one's life according to the ethical principles laid out by the Buddha. This includes practices like meditation, adherence to moral precepts, wisdom cultivation, and compassion.

;; I need a map of the sleepers and their corresponding muad-dibs
(define-map sleepers uint {
    sleeper: principal, ;; the sleeper
    messiah: (string-ascii 52), ;; btc address that is allowed by the Oracle to inscribe the ordinal
    muad-dib: (string-ascii 62), ;; ordinal receiver address - 62?
    }) ;; He who controls the spice controls the universe.

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;; T1: Lock NFT in this Stacks Smart contract (resurrection.clar) 
;;;;;; + insert map of [token-id and Taproot Address of receiver]
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; The NFT owner on Stacks designates their Ordinal and btc Wallet
;; They then lock their NFT in this contract
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

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;; T2: Inscribe ordinal with assets from Creator  
;;;;;; + lock ordinal in DLC using DeepLake graphql API from the Front End
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; create a UI where the user instantiate the DLC
;; they provide the signature and FE to mint the Ordi on Bitcoin
;; it's locked and they get it once they burn it 

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;; T3: Take T2 transaction and feed it in a method from resurrection.clar 
;;;;;; that verifies the token-id and Taproot Address of receiver from the Bitcoin T2 transaction 
;;;;;; is the same as from the insert-map (define-map sleepers in resurrection.clar) 
;;;;;; and then burns the token-id on Stacks 
;;;;;; (transfers it to cant-be-evil.stx for $aints (EVIL-SAINT)
;;;;;; and uses the burn function of boom-nfts and seven-bitcoin-days for 21 bitcoins days 
;;;;;; (get-owner become none)
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;;;;;; T4: Outcome 1: release ordinal to Taproot receiver address. 
;;;;;;     Outcome 2: 21 days and no T3 has occured, 
;;;;;;     the Ordinal is sent to a wallet controlled by the Human Rights Foundation or another charity.
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Closing thoughts
;; "The sleeper must awaken." "The sleeper has awakened!"
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;; "When you get to the void, there is an enormous and unbelievable sense of relief, that's nirvana."
;; "So they are liberated and yet they can't quite say why or what it is that they found out, so they call it the void.
;; "But Nagarjuna went on to say, You mustn't cling to the void. You have to void the void. And so the void of non void is the great state of Nagarjuna's Buddhism."
;; "You see, space is your mind. It's very difficult for us to see that because we think we're in space and look out at it. Spaces... They're the dimensions of consciousness."
;; https://youtube.com/watch?v=GBj2plk-12Q&feature=shareb

;; Father, the sleeper has awaken.
;; https://www.youtube.com/embed/gEMdJyY-1K0

;; I'm giving you a night call to tell you how I feel
;; I'm going to tell you somethig you don't want to hear
;; there's something inside you it's hard to explain
;; https://www.youtube.com/watch?v=ai1g9qWSW5I

