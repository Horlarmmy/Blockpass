import {
  event1,
  event2,
  event3,
  event4,
  event5,
  event6,
  event7,
  event8,
} from "./assets/index";

export const events = [
  {
    id: 1,
    title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
    date: "2023-04-14",
    startTime: "07:00 PM",
    endTime: "10:00 PM",
    location: "San Francisco, CA",
    imageUrl: event1,
    description:
      "We'll get you directly seated and inside for you to enjoy the show.",
    category: "Beach",
    eventType: "Tour",
    weekday: "Friday",
    hosts: [
      { name: "John Doe", organization: "EventCorp" },
      { name: "Jane Smith", organization: "MusicWorld" },
    ],
    attendees: [
      "Alice Johnson",
      "Bob Williams",
      "Charlie Brown",
      "David Wilson",
    ],
    moreInformation: [
      "Experience the beach like never before with a live concert by Wonder Girls.",
      "The event is a part of their 2010 World Tour, bringing their hit songs to the fans.",
      "Enjoy breathtaking views of the San Francisco coastline while listening to great music.",
      "Join thousands of fans for an unforgettable evening of entertainment.",
    ],
    registered: true,
  },
  {
    id: 2,
    title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    date: "2023-08-20",
    startTime: "06:00 PM",
    endTime: "09:00 PM",
    location: "Barcelona, Spain",
    imageUrl: event2,
    description: "Directly seated and inside for you to enjoy the show.",
    category: "Concert",
    eventType: "Tour",
    weekday: "Sunday",
    hosts: [
      { name: "Emily White", organization: "Concerts International" },
      { name: "Michael Green", organization: "WorldMusic Group" },
    ],
    attendees: ["Eve Adams", "Frank Harris", "Grace Evans", "Hannah Taylor"],
    moreInformation: [
      "Join JYJ on their Worldwide Concert Tour as they stop in Barcelona.",
      "This event promises a night full of energy and spectacular performances.",
      "Fans will get a chance to experience JYJ's latest hits and classic favorites.",
      "Don't miss out on the concert of the summer in one of Europe's most vibrant cities.",
    ],
    registered: false,
  },
  {
    id: 3,
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    date: "2023-09-18",
    startTime: "08:00 PM",
    endTime: "11:00 PM",
    location: "New York City, NY",
    imageUrl: event3,
    description: "Directly seated and inside for you to enjoy the show.",
    category: "Parade",
    eventType: "Tour",
    weekday: "Monday",
    hosts: [
      { name: "Oliver King", organization: "LiveNation" },
      { name: "Sophia Brown", organization: "EventMasters" },
    ],
    attendees: ["Ivy Scott", "Jack Lee", "Kathy Turner", "Larry Thomas"],
    moreInformation: [
      "Super Junior brings their SM Town Live '10 World Tour to New York City.",
      "Fans will witness the dynamic performances that have made Super Junior a global sensation.",
      "The event will feature a mix of their greatest hits and new releases.",
      "Join the parade of fans in one of the most iconic cities in the world for an unforgettable night.",
    ],
    registered: true,
  },
  {
    id: 4,
    title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
    date: "2023-04-14",
    startTime: "07:00 PM",
    endTime: "10:00 PM",
    location: "San Francisco, CA",
    imageUrl: event4,
    description:
      "We'll get you directly seated and inside for you to enjoy the show.",
    category: "Concert",
    eventType: "Tour",
    weekday: "Friday",
    hosts: [
      { name: "Natalie Moore", organization: "StarEvents" },
      { name: "Owen Hall", organization: "Golden Concerts" },
    ],
    attendees: [
      "Megan White",
      "Nathan Harris",
      "Olivia Martinez",
      "Paul Walker",
    ],
    moreInformation: [
      "Don't miss the Wonder Girls as they light up the stage in San Francisco.",
      "The concert is a part of their much-anticipated 2010 World Tour.",
      "Enjoy a night of electrifying performances and crowd-favorite songs.",
      "Perfect for a Friday night out with friends or family.",
    ],
    registered: false,
  },
  {
    id: 5,
    title: "JYJ 2011 JYJ Worldwide Concert Barcelona",
    date: "2024-08-20",
    startTime: "06:00 PM",
    endTime: "09:00 PM",
    location: "Barcelona, Spain",
    imageUrl: event5,
    description: "Directly seated and inside for you to enjoy the show.",
    category: "Party",
    eventType: "Tour",
    weekday: "Sunday",
    hosts: [
      { name: "Quincy Evans", organization: "Global Entertainment" },
      { name: "Rachel Foster", organization: "Big Events Co." },
    ],
    attendees: ["Sam Phillips", "Tina Roberts", "Uma Patel", "Victor Ramirez"],
    moreInformation: [
      "End your weekend on a high note with JYJ's Worldwide Concert in Barcelona.",
      "The event will be a mix of high-energy performances and intimate moments.",
      "Join fans from all over the world for a celebration of JYJ's music.",
      "It's more than just a concert; it's an experience.",
    ],
    registered: true,
  },
  {
    id: 6,
    title: "2011 Super Junior SM Town Live '10 World Tour New York City",
    date: "2024-09-18",
    startTime: "08:00 PM",
    endTime: "11:00 PM",
    location: "New York City, NY",
    imageUrl: event6,
    description: "Directly seated and inside for you to enjoy the show.",
    category: "Disco",
    eventType: "Tour",
    weekday: "Monday",
    hosts: [
      { name: "Wendy Johnson", organization: "EventBuzz" },
      { name: "Xavier Ross", organization: "Top Music Events" },
    ],
    attendees: ["Yara Green", "Zachary Miller", "Abby King", "Ben Turner"],
    moreInformation: [
      "Dance the night away with Super Junior at their SM Town Live Tour in NYC.",
      "The disco-themed event will bring the 80s vibe to life with a modern twist.",
      "Fans can expect a night full of fun, music, and unforgettable memories.",
      "Get your tickets now for a night that will take you back in time.",
    ],
    registered: false,
  },
  {
    id: 7,
    title: "Polkadot Singapore 2024",
    date: "2024-11-11",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    location: "Singapore",
    imageUrl: event7,
    description: "Join us for a day of learning, networking, and fun.",
    category: "Conference",
    eventType: "Tech",
    weekday: "Monday",
    hosts: [
      { name: "Polkadot Foundation", organization: "Polkadot" },
      { name: "Web3 Foundation", organization: "Web" },
    ],
    attendees: [
      "Alice Johnson",
      "Bob Williams",
      "Charlie Brown",
      "David Wilson",
    ],
    moreInformation: [
      "Polkadot Singapore 2024 is a conference for developers, enthusiasts, and businesses.",
      "Learn about the latest developments in the Polkadot ecosystem and Web3 technologies.",
      "Network with industry experts, developers, and other attendees.",
      "Join workshops, panel discussions, and hands-on sessions to deepen your knowledge.",
    ],
    registered: true,
  },
  {
    id: 8,
    title: "Ethereum DevCon 2024",
    date: "2024-12-12",
    startTime: "10:00 AM",
    endTime: "06:00 PM",
    location: "San Francisco, CA",
    imageUrl: event8,
    description:
      "The premier conference for Ethereum developers and enthusiasts.",
    category: "Conference",
    eventType: "Tech",
    weekday: "Thursday",
    hosts: [
      { name: "Ethereum Foundation", organization: "Ethereum" },
      { name: "Ethereum Community", organization: "Community" },
    ],
    attendees: ["Eve Adams", "Frank Harris", "Grace Evans", "Hannah Taylor"],
    moreInformation: [
      "Ethereum DevCon 2024 is the must-attend event for Ethereum developers and enthusiasts.",
      "Explore the latest developments in Ethereum, DeFi, NFTs, and more.",
      "Participate in workshops, hackathons, and panel discussions with industry experts.",
      "Connect with fellow developers, investors, and blockchain enthusiasts from around the world.",
    ],
    registered: false,
  },
];