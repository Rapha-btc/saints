(impl-trait 'SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait) ;; covered-calls are nfts + a map
;; title: bitcoin-call.clar
;; version 1
;; let's add the possibility for a user to 
;; print 100 call options of 3m sats each, at a strike price exercised in STX

;; constants
;;
(define-constant ERR-INSUFFICIENT-UNDERLYING-BALANCE (err "err-insufficient-underlying-balance"))
(define-constant ERR-STRIKE-PRICE-IS-ZERO (err "err-strike-price-cannot-be-zero"))
(define-constant ERR-EXPIRE-IN-FUTURE (err "err-expire-in-future"))
(define-constant ERR-QUANTITY-NOT-ROUND-LOT (err "err-quantity-not-round-lot"))
(define-constant ERR-MIN-QUANTITY-NOT-MET (err "err-min-quantity-not-met"))
(define-constant ERR-UNABLE-TO-TRANSFER (err u2004))
(define-constant ERR-UNABLE-TO-LOCK (err u2005))
(define-constant ERR-UNABLE-TO-UNLOCK (err u2006))
(define-constant ERR-NOT-TOKEN-OWNER (err u2007))
(define-constant ERROR-GETTING-BALANCE (err "err-getting-balance"))
(define-constant ERR-UNABLE-TO-LOCK-UNDERLYING-ASSET (err "err-unable-to-lock-underlying-asset")) 
(define-constant ERR-TOO-MANY-CALLS (err "err-too-many-calls")) 
(define-constant ERR-TOO-MANY-CALLS-2 (err u2008)) 
(define-constant ERR-NO-EXERCISER-CALLS (err u2009))
(define-constant ERR-TOKEN-ID-NOT-FOUND (err u1007)) 
(define-constant ERR-INVALID-PRINCIPAL (err u1008))
(define-constant ERR-TOKEN-EXPIRED (err u1009))
(define-constant ERR-INSUFFICIENT-CAPITAL-TO-EXERCISE (err u1010)) 
(define-constant ERR-UNABLE-TO-MINT (err u1011))
(define-constant ERR-NOT-EXPIRED (err u1012))
(define-constant ERR-CLAIMABLE-ONLY-BY-COUNTERPARTY (err u1013))
(define-constant ERR-IN-RECLAIM-CAPITAL (err u1014))
(define-constant ERR-NFT-OWNER (err u1015))
(define-constant ERR-NO-CONTRACT (err u1016))
(define-constant SBTC_ROUND_LOT_FACTOR u3000000)
(define-constant DISPLAY_FACTOR u100000000) ;; 100m sats = 1 btc
(define-constant DEPLOYER tx-sender)
(define-constant YIN-YANG 'SP000000000000000000002Q6VF78)
(define-constant indices
  (list
    u1 u2 u3 u4 u5 u6 u7 u8 u9 u10
    u11 u12 u13 u14 u15 u16 u17 u18 u19 u20
    u21 u22 u23 u24 u25 u26 u27 u28 u29 u30
    u31 u32 u33 u34 u35 u36 u37 u38 u39 u40
    u41 u42 u43 u44 u45 u46 u47 u48 u49 u50
    u51 u52 u53 u54 u55 u56 u57 u58 u59 u60
    u61 u62 u63 u64 u65 u66 u67 u68 u69 u70
    u71 u72 u73 u74 u75 u76 u77 u78 u79 u80
    u81 u82 u83 u84 u85 u86 u87 u88 u89 u90
    u91 u92 u93 u94 u95 u96 u97 u98 u99 u100))

;; data vars
;;
(define-data-var last-call-id uint u0)
(define-data-var next-call-id uint u0)
(define-data-var helper-uint uint u0)
(define-data-var strike-helper uint u0) 
(define-data-var expiration-helper uint u0)
(define-data-var helper-list (list 100 (response uint uint)) (list ))
(define-data-var helper-user-calls (list 100 (response uint uint)) (list )) 
(define-data-var helper-sender principal YIN-YANG)
(define-data-var helper-recipient principal YIN-YANG)

;; NFT definition
;;
(define-non-fungible-token bitcoin-call uint) ;; a bitcoin call is represented by an NFT token id bitcoin-call and data stored in call-data map

;; data maps
;;
(define-map call-data uint { ;; if you buy this NFT, you protect yourself from price of STX going down versus Bitcoin
        counterparty: principal,
        btc-locked: uint, 
        strike-price: uint, 
        strike-height: uint, 
        was-transferred-once: bool
    }
)

(define-map exerciser-calls principal {exos: (list 100 uint)}) ;; a list of calls owned by a user who is not a counterparty of these token-ids
;; this above should be called exercisable-calls...
(define-map reclaimable-calls principal {reclaimable: (list 100 uint)}) ;; a list of reclaimable for the counterparty so they can reclaim their capital in one go!

;;public and private functions
;;
(define-public (mint (call-expire-at uint) (strike-price uint) (btc-locked uint)) 
   (let
        (
            (sbtc-get-balance (unwrap! (contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sbtc get-balance tx-sender) ERROR-GETTING-BALANCE))
            (number-of-calls (/ btc-locked SBTC_ROUND_LOT_FACTOR))
            
            (counter-calls (get-reclaimable-calls tx-sender))
        )
        (asserts! (>= btc-locked SBTC_ROUND_LOT_FACTOR) ERR-MIN-QUANTITY-NOT-MET) 
        (asserts! (is-eq (mod btc-locked SBTC_ROUND_LOT_FACTOR) u0) ERR-QUANTITY-NOT-ROUND-LOT) 
        (asserts! (>= sbtc-get-balance btc-locked) ERR-INSUFFICIENT-UNDERLYING-BALANCE)
        (asserts! (> strike-price u0) ERR-STRIKE-PRICE-IS-ZERO)
        (asserts! (< block-height call-expire-at) ERR-EXPIRE-IN-FUTURE) ;; should we have a buffer here more than 1 block?
        (var-set helper-uint number-of-calls)
        (var-set strike-helper strike-price)
        (var-set expiration-helper call-expire-at)
        (var-set next-call-id (var-get last-call-id))
        (var-set helper-user-calls (filter is-null (map helper-quite-a-few indices))) ;; (map helper-quite-a-few indices) can spit out an error, and it actually doesn't exit control flow, 

        ;; now we exit control flow if any of these nft-mints failed
        (asserts! (is-ok (fold check-minting-err (var-get helper-user-calls) (ok u0))) (err "unable-to-mint"))

        (if (is-eq counter-calls (list )) ;; this spits out a list of call options token ids and updates the next-call-id
            (map-set reclaimable-calls tx-sender {reclaimable: (map pour-unwrapper (var-get helper-user-calls))})
            (map-set reclaimable-calls tx-sender {reclaimable: (unwrap! (as-max-len? (concat counter-calls (map pour-unwrapper (var-get helper-user-calls))) u100) ERR-TOO-MANY-CALLS)})
        )

        ;; outside of the loop, lock all the capital at once, as many number-of-calls
        (unwrap! (contract-call? .sbtc transfer btc-locked tx-sender (as-contract tx-sender) none) ERR-UNABLE-TO-LOCK-UNDERLYING-ASSET) 

        (var-set last-call-id (var-get next-call-id)) 
        (ok (get-reclaimable-calls tx-sender))
    )
)

(define-public (exercise (token-id uint))
    (let 
        (
            (call-info (unwrap! (get-call-data token-id) ERR-TOKEN-ID-NOT-FOUND))
            (counterparty (get counterparty call-info))
            (btc-locked (get btc-locked call-info))
            (strike-height (get strike-height call-info))
            (strike-price (get strike-price call-info))
            (owner tx-sender) ;; the owner exercises the option, and the counterparty complies
            (stx-balance (stx-get-balance tx-sender))
        )
        (asserts! (is-eq (unwrap! (nft-get-owner? bitcoin-call token-id) ERR-TOKEN-ID-NOT-FOUND) tx-sender) ERR-NOT-TOKEN-OWNER) 
        (asserts! (>= strike-height block-height) ERR-TOKEN-EXPIRED) 
        (asserts! (>=  stx-balance strike-price) ERR-INSUFFICIENT-CAPITAL-TO-EXERCISE)

        ;; owner gets sBTC, counterparty gets STX, hence it's a call option
        (try! (as-contract (contract-call? .sbtc transfer btc-locked tx-sender owner none))) 
        (try! (stx-transfer? strike-price owner counterparty))
        
        ;; burn the call
        (try! (nft-burn? bitcoin-call token-id tx-sender))
        (ok (map-delete call-data token-id)) 
    )
)

(define-public (exercise-all-of-my-exerciser-calls)
    (let 
        (
            (tx-exerciser-calls (unwrap! (map-get? exerciser-calls tx-sender) (err "err-no-exercisable-calls")))
            (exos (get exos tx-exerciser-calls))
            (exercise-em-all (asserts! (fold check-exercise exos true) (err "err-exercising-all"))) ;; double check this with auditor 
        )
        (map-delete exerciser-calls tx-sender)
        (ok tx-exerciser-calls)
    )
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
        (let 
            (
                (recipient-calls (default-to {exos: (list )} (map-get? exerciser-calls recipient)))
                (recipient-exos (get exos recipient-calls))
                (next-recipient-exos (unwrap! (as-max-len? (append recipient-exos token-id) u100) ERR-TOO-MANY-CALLS-2))
                (sender-calls (default-to {exos: (list )} (map-get? exerciser-calls sender)))
                (sender-exos (get exos sender-calls))
                (call-info (unwrap! (map-get? call-data token-id) ERR-TOKEN-ID-NOT-FOUND))
                (originator (get counterparty call-info))
                (was-transferred (get was-transferred-once call-info))
            )
            (asserts! (is-eq tx-sender sender) ERR-NOT-TOKEN-OWNER)
            
            (if (not was-transferred) ;; no sender-calls so no need to filter it out with token-id
                (begin
                    (map-set call-data token-id (merge call-info {was-transferred-once: true})) 
                    ;; if recipient is not the originator
                    (if (not (is-eq recipient originator))
                    (map-set exerciser-calls recipient {exos: next-recipient-exos})
                    true
                    )
                )
                (begin
                    ;; if recipient is not the originator
                    (if (not (is-eq recipient originator))
                    (map-set exerciser-calls recipient {exos: next-recipient-exos})
                    true
                    )
                    ;; filter out sender-exos with token-id
                    (var-set helper-uint token-id)
                    (map-set exerciser-calls sender {exos: (filter is-not-token sender-exos)})
                )
            )
           (nft-transfer? bitcoin-call token-id sender recipient)  
        )
)

(define-public (transfer-same-strikes (my-calls (list 100 uint)) (sender principal) (recipient principal)) 
    (let 
        (
            (my-expirations (map check-expirations my-calls))
            (my-strikes (map check-strikes my-calls))
        )       
        ;; var-set expiration-helper to the fist index of my-expirations
        (var-set expiration-helper (fold get-first my-expirations u0)) ;; double check unwrap-panic is okay here
        (asserts! (fold same-expirations my-expirations true) (err "cant-bulk-transfer-different-expirations"))
        (var-set strike-helper u0)
        (asserts! (fold same-strikes my-strikes true) (err "cant-bulk-transfer-different-strikes"))

        ;; var-setting sender and recipient
        (var-set helper-sender sender)
        (var-set helper-recipient recipient) 
        (ok (asserts! (fold transfer-bulk my-calls true) (err "err-bulk-transfer")))
    )
)

(define-private (get-first (current uint) (result uint))
  (if (is-eq result u0) current result))

(define-private (transfer-bulk (current uint) (result bool));; transfer-same-strikes private functions
    (if result
        (let 
            (
                
                (is-transferred (transfer current (var-get helper-sender) (var-get helper-recipient))) ;; this line above will not exit control flow 
            ) 
            (is-ok is-transferred)
        )
        false
    )
)

(define-private (same-expirations (current uint) (result bool)) 
    (begin
    (if result    
        (if (<= (- current (var-get expiration-helper)) u7) 
            (begin
            (print (var-get expiration-helper))
            (var-set expiration-helper current)
            true
            )
            false ;; else branch
        ) 
    false
    )
    )
)

(define-private (same-strikes (current uint) (result bool))
    (begin
    (if result    
    (if (is-eq (var-get strike-helper) u0);; the 1rst time
        (begin 
        (var-set strike-helper current)
        true
        )
        (if (is-eq (- current (var-get strike-helper)) u0) ;; else branch
            (begin
            (var-set strike-helper current)
            true
            )
            false
        ) 
    )
    false
    )
    )
)

(define-private (check-expirations (item uint)) 
    (get strike-height (default-to  { 
        counterparty: tx-sender,
        btc-locked: u1, 
        strike-price: u1,  
        strike-height: u0, ;; default to u0
        was-transferred-once: true  
    };; default to something if map-get doesn't find anything
    (map-get? call-data item)))
)

(define-private (check-strikes (item uint))
    (get strike-price (default-to  { 
        counterparty: tx-sender,
        btc-locked: u1, 
        strike-price: u0, ;; default to u0 
        strike-height: u0,  
        was-transferred-once: true  
    };; default to something if map-get doesn't find anything
    (map-get? call-data item)))
)

(define-private (is-not-token (item uint)) 
    (not (is-eq item (var-get helper-uint)))
)

(define-private (check-minting-err (current (response uint uint)) (result (response uint uint)))
   (if (is-err result) result 
   (begin
    (var-set next-call-id (+ (var-get next-call-id) u1)) ;; the last-call-id will be incremented by next-call-id
    current
    )  
   )
)

(define-private (check-exercise (current uint) (result bool ))
    (begin
    (if (> (get strike-height (default-to  { 
        counterparty: tx-sender,
        btc-locked: u1, 
        strike-price: u1,  
        strike-height: (+ block-height u1), ;; is superior to block-height
        was-transferred-once: true  
    };; default to something that is higher than block-height if map-get doesn't find anything
    (map-get? call-data current))) block-height) ;; if block-height is less than strike-height then exercise and spit true, else just spit true
    (if result 
    (let 
    ((result-mint-i (exercise current))) ;; this never returns an error/none/or false because exercise exits control flow if there's an error - auditor question
    (if (is-ok result-mint-i) true false) ;; hence this is always true? but if it returns false, there is no change to the logic and the exit is taken care inside the exercise function  
    )
    false)
    true) ;; do nothing if block-height is more than strike-height, and inside the "true" wrapped with a begin do we want to burn the NFT, probably not, we do that in the redeem function when the counterparty re-claims sBTC from contract
    )
)

;; A private function called helper-quite-a-few that takes a number N between 1 and 100 
;; and spits out 0 if item is above number N, and last-token-Id + item otherwise. 
(define-private (helper-quite-a-few (item uint))
        (if (<= item (var-get helper-uint)) ;; looping over number of calls = helper uint
            (begin
            (map-set call-data (+ (var-get last-call-id) item)
                { 
                    counterparty : tx-sender,
                    btc-locked : SBTC_ROUND_LOT_FACTOR, 
                    strike-price: (var-get strike-helper),
                    strike-height: (var-get expiration-helper),
                    was-transferred-once: false ;; verify if this doesn't cause any problems
                }
            )
            ;; Mint the bitcoin-call NFT with the token-id last-call-id + item
            (unwrap! (nft-mint? bitcoin-call (+ (var-get last-call-id) item) tx-sender) ERR-UNABLE-TO-MINT) ;; this is the only instance of minting the calls, so now we're simply adding the token to the reclaimable list
            (ok (+ (var-get last-call-id) item)) ;; spit this out in the list (f(item1), ...f(item100))
            )
            (ok u0)) ;; spits out u0 if item is above
)

(define-private (pour-unwrapper (item (response uint uint)))
    (if (is-ok item) (unwrap-panic item) u0)
)

(define-private (is-null (item (response uint uint))) ;; it's (ok u1),(ok u2) ... (err u1011) (ok u0)
    (not (is-eq item (ok u0)))
)

;; read only functions
;;
(define-read-only (get-last-token-id)
    (ok (var-get last-call-id))
)

(define-read-only (get-token-uri (token-id uint))
    (ok none) ;; (some https://stx.is/sbtc-pdf)
)

(define-read-only (get-owner (token-id uint))
    (ok (nft-get-owner? bitcoin-call token-id))
)

(define-read-only (get-call-data (token-id uint))
    (map-get? call-data token-id)
)

(define-read-only (get-exerciser-calls (buyer-owner principal))
    (map-get? exerciser-calls buyer-owner)
)

(define-read-only (get-reclaimable-calls (counterparty principal))
    (get reclaimable (default-to {reclaimable: (list )} (map-get? reclaimable-calls counterparty)))
)

;; More public and private function
;; Reclaiming capital from contract
(define-public (counterparty-reclaim (token-id uint))
    (let 
        (
            (call-info (unwrap! (get-call-data token-id) ERR-TOKEN-ID-NOT-FOUND))
            (counterparty (get counterparty call-info))
            (sbtc-quantity (get btc-locked call-info))
            (strike-height-token (get strike-height call-info))
            (token-owner (unwrap! (nft-get-owner? bitcoin-call token-id) ERR-NFT-OWNER))
            (t-sender tx-sender)
        )
        (asserts! (< strike-height-token block-height) ERR-NOT-EXPIRED)
        (asserts! (is-eq counterparty tx-sender) ERR-CLAIMABLE-ONLY-BY-COUNTERPARTY)
        (try! (as-contract (contract-call? .sbtc transfer sbtc-quantity tx-sender t-sender none)))
        (try! (nft-burn? bitcoin-call token-id token-owner))
        (ok (map-delete call-data token-id))
    )    
)

(define-private (reclaim (token-id uint) (result bool))
    (begin
    (if (< (get strike-height (default-to  { 
        counterparty: tx-sender,
        btc-locked: u1, 
        strike-price: u1,  
        strike-height: (- block-height u1), ;; is inferior to block-height
        was-transferred-once: true  
    };; default to something that is higher than block-height if map-get doesn't find anything
    (map-get? call-data token-id))) block-height) ;; if block-height is less than strike-height then exercise and spit true, else just spit true
        (if result
            (let 
                (
                (result-reclaim-token (counterparty-reclaim token-id)) ;; I call the counterparty-reclaim 
                )
                true
            )
                false
        )
        true) ;; avoid the case where there is no data in the call-data map, like when it is exercised
    )    
)

(define-public (reclaiming)
    (let
        (
        (tx-reclaimable (unwrap! (map-get? reclaimable-calls tx-sender) (err "no reclaimable calls"))) ;; this has to be an unwwrap to exit flow and not a default, else the empty list in fold won't go thru
        (reclaimable-list (get reclaimable tx-reclaimable))
        (reclaim-em-all (asserts! (fold reclaim reclaimable-list true) (err "failed to reclaim all")))
        )
        (map-delete reclaimable-calls tx-sender)
        (ok reclaim-em-all)
    )
)
;; Next -> MEV: Can we create a fail-safe "valve mechanism" to prevent these rare situations, without depending on an oracle or a centralized authority? 
;; The mechanism would involve identifying ITM options using an oracle and triggering a secure settlement process if they are not exercised.
;; use BTC-STX oracle built-in Clarity via PoX. Get real-time exchange rates/block & use as settlement oracle
;; or DeepLake