// Create a campaign using Gnosis Safe
async function createCampaign() {
    const oldStarName = prompt('Enter the old star name');
    const newStarName = prompt('Enter the new star name');
  
    const createCampaignData = await contract.interface.encodeFunctionData('createCampaign', [newStarName]);
  
    const transaction = await contract.gnosisSafe.execTransaction(
      contractAddress, // Contract address
      0, // Value (0 ETH in this case)
      createCampaignData, // Encoded data of the function call
      0, // Operation (0 = call)
      0, // Gas limit (auto)
      0, // Gas price (auto)
      ethers.constants.AddressZero, // Payment token (ETH in this case)
      ethers.constants.AddressZero, // Delegate call address (unused)
      [] // Call data (unused)
    );
  
    await transaction.wait();
  
    await updateStatus();
  }
  
  // Join the campaign using Gnosis Safe
  async function joinCampaign() {
    const joinCampaignData = await contract.interface.encodeFunctionData('joinCampaign');
  
    const transaction = await contract.gnosisSafe.execTransaction(
      contractAddress, // Contract address
      0, // Value (0 ETH in this case)
      joinCampaignData, // Encoded data of the function call
      0, // Operation (0 = call)
      0, // Gas limit (auto)
      0, // Gas price (auto)
      ethers.constants.AddressZero, // Payment token (ETH in this case)
      ethers.constants.AddressZero, // Delegate call address (unused)
      [] // Call data (unused)
    );
  
    await transaction.wait();
  
    await updateStatus();
  }
  
  // Vote on the campaign using Gnosis Safe
  async function vote(approve) {
    const voteData = await contract.interface.encodeFunctionData('vote', [approve]);
  
    const transaction = await contract.gnosisSafe.execTransaction(
      contractAddress, // Contract address
      0, // Value (0 ETH in this case)
      voteData, // Encoded data of the function call
      0, // Operation (0 = call)
      0, // Gas limit (auto)
      0, // Gas price (auto)
      ethers.constants.AddressZero, // Payment token (ETH in this case)
      ethers.constants.AddressZero, // Delegate call address (unused)
      [] // Call data (unused)
    );
  
    await transaction.wait();
  
    await updateStatus();
  }
  
  // Rename the star using Gnosis Safe
  async function renameStar() {
    const renameStarData = await contract.interface.encodeFunctionData('renameStar');
  
    const transaction = await contract.gnosisSafe.execTransaction(
      contractAddress, // Contract address
      0, // Value (0 ETH in this case)
      renameStarData, // Encoded data of the function call
      0, // Operation (0 = call)
      0, // Gas limit (auto)
      0, // Gas price (auto)
      ethers.constants.AddressZero, // Payment token (ETH in this case)
      ethers.constants.AddressZero, // Delegate call address (unused)
      [] // Call data (unused)
    );
  
    await transaction.wait();
  
    await updateStatus();
  }
  
  // Withdraw tokens from the contract using Gnosis Safe
  async function withdrawTokens(recipient, amount) {
    const withdrawTokensData = await contract.interface.encodeFunctionData('withdrawTokens', [recipient, amount]);
  
    const transaction = await contract.gnosisSafe.execTransaction(
      contractAddress, // Contract address
      0, // Value (0 ETH in this case)
      withdrawTokensData, // Encoded data of the function call
      0, // Operation (0 = call)
      0, // Gas limit (auto)
      0, // Gas price (auto)
      tokenAddress, // Payment token address (e.g., ERC20 token)
      ethers.constants.AddressZero, // Delegate call address (unused)
      [] // Call data (unused)
    );
  
    await transaction.wait();
  
    await updateStatus();
  }
