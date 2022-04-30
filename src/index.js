import 'regenerator-runtime/runtime'

import { initContract, login, logout } from './utils'
import { utils } from "near-api-js";
const BN = require("bn.js");

function showNotification() {
  document.querySelector('[data-behavior=notification]').style.display = 'block'
  setTimeout(() => {
    document.querySelector('[data-behavior=notification]').style.display = 'none'
  }, 7000)
}

let gd, ld, md


window.onload = async () => {

  gd = await window.contract.nft_token({
    token_id: window.accountId + 'g'
  });

  console.log(gd)

  ld = await window.contract.nft_token({
    token_id: window.accountId + 'l'
  });

  console.log(ld)

  md = await window.contract.nft_token({
    token_id: window.accountId + 'm'
  });

  console.log(md)

  if (gd || ld || md)
    showNotification()
}

const gform = document.
  getElementById('gform');

gform.addEventListener('submit', gformSubmit);

async function gformSubmit(event) {
  event.preventDefault();
  let amt = document.getElementById('gi').value
  amt = utils.format.parseNearAmount(amt.toString()).toString()
  try {
    // make an update call to the smart contract
    await window.contract.nft_mint({
      token_id: window.accountId + 'g',
      metadata: {
        title: "Thank you for saving Giraffes",
        description: "This NFT is a part of NEAR Spring Hackathon ;)",
        media: "https://link.ap1.storjshare.io/jutghzhpqtvijphwfx2gbqqai55q/demo-bucket%2Fgiraffe.gif?wrap=0"
      },
      receiver_id: window.accountId,
    },
      300000000000000,
      new BN(amt))
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  }

}

const lform = document.
  getElementById('lform');

lform.addEventListener('submit', lformSubmit);

async function lformSubmit(event) {
  event.preventDefault();
  let amt = document.getElementById('li').value
  amt = utils.format.parseNearAmount(amt.toString()).toString()
  try {
    // make an update call to the smart contract
    await window.contract.nft_mint({
      token_id: window.accountId + 'l',
      metadata: {
        title: "Thank you for saving Lions",
        description: "This NFT is a part of NEAR Spring Hackathon ;)",
        media: "https://link.ap1.storjshare.io/juqqsp6qdf4mskqu5zpslxveqwma/demo-bucket%2Flion.gif?wrap=0"
      },
      receiver_id: window.accountId,
    },
      300000000000000,
      new BN(amt))
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  }
}

const mform = document.
  getElementById('mform');

mform.addEventListener('submit', mformSubmit);

async function mformSubmit(event) {
  event.preventDefault();
  let amt = document.getElementById('mi').value
  amt = utils.format.parseNearAmount(amt.toString()).toString()
  try {
    // make an update call to the smart contract
    await window.contract.nft_mint({
      token_id: window.accountId + 'm',
      metadata: {
        title: "Thank you for saving Monkeys",
        description: "This NFT is a part of NEAR Spring Hackathon ;)",
        media: "https://link.ap1.storjshare.io/juijeba5sy3gzhbylazbe3kucyba/demo-bucket%2Fmonkey.gif?wrap=0"
      },
      receiver_id: window.accountId,
    },
      300000000000000,
      new BN(amt))
  } catch (e) {
    alert(
      'Something went wrong! ' +
      'Maybe you need to sign out and back in? ' +
      'Check your browser console for more info.'
    )
    throw e
  }
}

document.querySelector('#sign-in-button').onclick = login
document.querySelector('#sign-out-button').onclick = logout

// Display the signed-out-flow container
function signedOutFlow() {
  document.querySelector('#signed-out-flow').style.display = 'block'
}

// Displaying the signed in flow container and fill in account-specific data
function signedInFlow() {
  document.querySelector('#signed-in-flow').style.display = 'block'

  document.querySelectorAll('[data-behavior=account-id]').forEach(el => {
    el.innerText = window.accountId
  })
}

// `nearInitPromise` gets called on page load
window.nearInitPromise = initContract()
  .then(() => {
    if (window.walletConnection.isSignedIn()) signedInFlow()
    else signedOutFlow()
  })
  .catch(console.error)
