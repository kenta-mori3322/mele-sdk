#!/bin/bash
set -o errexit -o nounset -o pipefail
command -v shellcheck >/dev/null && shellcheck "$0"

ROOT_PROTO_DIR="../mele"
COSMOS_PROTO_DIR="$ROOT_PROTO_DIR/proto"
THIRD_PARTY_PROTO_DIR="$ROOT_PROTO_DIR/third_party/proto"
OUT_DIR="./src/transport/codec/"

# mkdir -p "$OUT_DIR"

protoc \
  --plugin="$(yarn bin protoc-gen-ts_proto)" \
  --ts_proto_out="$OUT_DIR" \
  --proto_path="$COSMOS_PROTO_DIR" \
  --proto_path="$THIRD_PARTY_PROTO_DIR" \
  --ts_proto_opt="esModuleInterop=true,forceLong=long,useOptionals=true" \
  "$COSMOS_PROTO_DIR/cosmos/base/abci/v1beta1/abci.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/query/v1beta1/pagination.proto" \
  "$COSMOS_PROTO_DIR/cosmos/base/v1beta1/coin.proto" \
  "$COSMOS_PROTO_DIR/mele/treasury/v1beta1/treasury.proto" \
  "$COSMOS_PROTO_DIR/mele/treasury/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/mele/control/v1beta1/control.proto" \
  "$COSMOS_PROTO_DIR/mele/control/v1beta1/tx.proto" \
  "$THIRD_PARTY_PROTO_DIR/confio/proofs.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/abci/types.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/keys.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/crypto/proof.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/libs/bits/types.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/types/params.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/types/types.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/types/validator.proto" \
  "$THIRD_PARTY_PROTO_DIR/tendermint/version/types.proto" \
  "$COSMOS_PROTO_DIR/cosmos/gov/v1beta1/gov.proto" \
  "$COSMOS_PROTO_DIR/cosmos/gov/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/gov/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/distribution.proto" \
  "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/distribution/v1beta1/tx.proto" \
  "$COSMOS_PROTO_DIR/cosmos/upgrade/v1beta1/upgrade.proto" \
  "$COSMOS_PROTO_DIR/cosmos/upgrade/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/cosmos/params/v1beta1/params.proto" \
  "$COSMOS_PROTO_DIR/cosmos/params/v1beta1/query.proto" \
  "$COSMOS_PROTO_DIR/mele/fee/v1beta1/fee.proto" \
  "$COSMOS_PROTO_DIR/mele/fee/v1beta1/genesis.proto"
#   "$COSMOS_PROTO_DIR/cosmos/auth/v1beta1/query.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/bank.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/query.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/bank/v1beta1/tx.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/crypto/multisig/v1beta1/multisig.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/crypto/secp256k1/keys.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/query.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/staking.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/staking/v1beta1/tx.proto" \
#   "$COSMOS_PROTO_DIR/cosmos/vesting/v1beta1/vesting.proto" \
#   "$COSMOS_PROTO_DIR/ibc/applications/transfer/v1/query.proto" \
#   "$COSMOS_PROTO_DIR/ibc/applications/transfer/v1/tx.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/channel/v1/channel.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/channel/v1/query.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/channel/v1/tx.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/client/v1/client.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/client/v1/query.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/client/v1/tx.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/commitment/v1/commitment.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/connection/v1/connection.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/connection/v1/query.proto" \
#   "$COSMOS_PROTO_DIR/ibc/core/connection/v1/tx.proto" \
#   "$COSMOS_PROTO_DIR/ibc/lightclients/tendermint/v1/tendermint.proto" \

# Remove unnecessary codec files
rm -rf \
  src/transport/codec/cosmos_proto/ \
  src/transport/codec/gogoproto/ \
  src/transport/codec/google/api/ \
  src/transport/codec/google/protobuf/descriptor.ts