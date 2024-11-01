import { BlockPassNearContract } from "./config";
const CONTRACT = BlockPassNearContract;

export const fetchEventsFromContract = async (wallet, CONTRACT) => {
  try {
    if (!wallet) {
      console.log("Wallet is not connected or provider is not available");
      return [];
    }
    let fetchedEvents = [];

    const blockEvents = await wallet.viewMethod({ contractId: CONTRACT, method: 'get_all_block_passes' });
    // wallet.viewMethod({ contractId: CONTRACT, method: 'get_all_block_passes' }).then(
    //     blockEvents => {
    //     }
    // );
    console.log(blockEvents)
    for (let i = 0; i < blockEvents.length; i++) {
      const event = blockEvents[i]
      const transformedEvent = {
        id: event.block_pass_id, 
        title: event.metadata.title, 
        date: '9th Nov', 
        startTime: event.start_time, 
        endTime: event.sales_end_time, 
        location: 'Bangkok, Thailand', 
        imageUrl: event.metadata.media, 
        description: event.metadata.description, 
        category: event.category,  
        moreInformation: event.metadata.description, 
        ticketPrice: event.pass_price, 
        maxTickets: event.max_pass_count, 
        ticketsSold: event.passes_sold, 
        registered: true,
        host: event.organizer, 
      };

      fetchedEvents.push(transformedEvent);
    }

    console.log(fetchedEvents);
    return fetchedEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (
  wallet,
  eventDetails,
  max_pass_count,
  start_time,
  sales_end_time,
  pass_price,
  category
) => {
  try {
    if (!wallet) {
      console.log("Wallet is not connected or provider is not available");
      return;
    }

    await wallet.callMethod({ contractId: CONTRACT, method: 'create_block_pass', args: { max_pass_count: max_pass_count, start_time: start_time, sales_end_time: sales_end_time, pass_price: pass_price, metadata: eventDetails, category:  category} });

    console.log("Event created successfully!");
  } catch (error) {
    console.error("Error creating event:", error);
  }
};

export const getEventDetails = async (wallet, eventId) => {
  try {
    if (!wallet || wallet.type !== "evm") {
      console.log("Wallet is not connected or provider is not available");
      return null;
    }

    const ethersProvider = new ethers.providers.Web3Provider(
      wallet.provider,
      "any"
    );
    const contract = contractInstance.connect(ethersProvider.getSigner());

    const eventDetails = await contract.getEventDetails(eventId);
    return eventDetails;
  } catch (error) {
    console.error("Error getting event details:", error);
    return null;
  }
};

export const registerForEvent = async (wallet, eventId, ticketPrice) => {
  try {
    if (!wallet || wallet.type !== "evm") {
      console.log("Wallet is not connected or provider is not available");
      return;
    }

    const ethersProvider = new ethers.providers.Web3Provider(
      wallet.provider,
      "any"
    );
    const contract = contractInstance.connect(ethersProvider.getSigner());

    const tx = await contract.purchaseTicket(eventId, "someuri", {value: ethers.utils.parseEther(ticketPrice)});
    await tx.wait();

    console.log("Registered for event successfully!");
  } catch (error) {
    console.error("Error registering for event:", error);
  }
};

export const fetchUserTickets = async (wallet) => {
  try {
    let ethersProvider;

    if (wallet?.type === "evm") {
      ethersProvider = new ethers.providers.Web3Provider(wallet.provider, "any");
    } else {
      throw new Error("Unsupported wallet type");
    }

    const signer = ethersProvider.getSigner();
    const account = wallet?.accounts.find((account) => account.address);
    console.log(signer)
    const contract = contractInstance.connect(signer);
    console.log(account.address)

    // Fetch tickets associated with the user's wallet address
    const userTickets = await contract.getRegisteredEvents(account.address);
    const detailsPromises = userTickets.map((ticket) =>
      contract.events(ticket)
    );
    const details = await Promise.all(detailsPromises);

    return details;
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    throw error;
  }
};
