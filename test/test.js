const Decentagram = artifacts.require("decentagram");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('decentagram', ([deployer, author, tipper]) => {
  let _decentagram

  before(async () => {
    _decentagram = await Decentagram.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await _decentagram.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await _decentagram.name()
      assert.equal(name, 'decentagram')
  
    })
  })
  describe('images', async () => {
    let result, imageCount
    const hash = 'QmP6i4VJ5VA7tdJBhhdUbLYYV9yP6392S195QbWkRCLcfd'

    before(async () => {
      result = await _decentagram.uploadImage(hash, 'Image description', { from: author })
      imageCount =  await _decentagram.imageCount()
    })

    it('creates images', async () => {
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Image description', 'description is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      await _decentagram.uploadImage('','Image description',{from:author}).should.be.rejected
      await _decentagram.uploadImage('Image hash','',{from:author}).should.be.rejected

})
it('lists images', async () => {
const image = await _decentagram.images(imageCount)
  assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct')
  assert.equal(image.hash, hash, 'Hash is correct')
  assert.equal(image.description, 'Image description', 'description is correct')
  assert.equal(image.tipAmount, '0', 'tip amount is correct')
  assert.equal(image.author, author, 'author is correct')

  
})
it('allows users to tip images', async () => {
  // Track the author balance before purchase
  let oldAuthorBalance
  oldAuthorBalance = await web3.eth.getBalance(author)
  oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

  result = await _decentagram.tipImageOwner(imageCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

  // SUCCESS
  const event = result.logs[0].args
  assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
  assert.equal(event.hash, hash, 'Hash is correct')
  assert.equal(event.description, 'Image description', 'description is correct')
  assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
  assert.equal(event.author, author, 'author is correct')

  // Check that author received funds
  let newAuthorBalance
  newAuthorBalance = await web3.eth.getBalance(author)
  newAuthorBalance = new web3.utils.BN(newAuthorBalance)

  let tipImageOwner
  tipImageOwner = web3.utils.toWei('1', 'Ether')
  tipImageOwner = new web3.utils.BN(tipImageOwner)

  const expectedBalance = oldAuthorBalance.add(tipImageOwner)

  assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

  // FAILURE: Tries to tip a image that does not exist
  await _decentagram.tipImageOwner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
})

// it('allows users to comment', async () => {


// })
})
})
