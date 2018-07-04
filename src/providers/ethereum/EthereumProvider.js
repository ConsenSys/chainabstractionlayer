/*
 * BitcoinProvider class
 * with bitcoin related transforms
 */

export default class BitcoinProvider {
  setClient (client) {
    this.client = client
  }

  transforms () {
    return {
      methodToRpc (method, params) {
        return `eth_${method}`
      },
      value (val, unit) {
        // convert hex to wei/gwei/eth
        return val
      }
    }
  }
}

BitcoinProvider.Types = {
  Block: {
    number: 'number',
    hash: 'hash',
    timestamp: 'time',
    difficulty: 'difficulty',
    size: 'size',
    parentHash: 'parentHash',
    nonce: 'nonce',
    transactions: 'transactions'
  },
  Transaction: {
    confirmations: (key, result, client) => {
      return client.rpc('eth_blockNumber').then(currentBlock => {
        return Number(currentBlock) - result[key]
      })
    },
    hash: 'hash',
    value: 'value',
    blockHash: 'blockHash',
    blockNumber: 'blockNumber'
  }
}
