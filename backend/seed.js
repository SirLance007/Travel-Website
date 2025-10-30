import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience.js';

dotenv.config();

const travelExperiences = [
  {
    title: "Kayaking Adventure",
    location: "Udupi, Karnataka",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=400&fit=crop&crop=center",
    price: 999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Paddle through serene backwaters and mangrove forests.",
    slots: [
      {
        date: "2024-11-15",
        times: [
          { time: "07:00", available: true },
          { time: "09:00", available: true },
          { time: "14:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Nandi Hills Sunrise Trek",
    location: "Bangalore, Karnataka",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop&crop=center",
    price: 899,
    description: "Curated small-group experience. Certified guide. First visit with gear included. Watch the sunrise from 1478 meters above sea level.",
    slots: [
      {
        date: "2024-11-16",
        times: [
          { time: "05:00", available: true },
          { time: "05:30", available: true }
        ]
      }
    ]
  },
  {
    title: "Coffee Plantation Tour",
    location: "Coorg, Karnataka",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=400&fit=crop&crop=center",
    price: 1299,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Learn about coffee cultivation and taste fresh brews.",
    slots: [
      {
        date: "2024-11-17",
        times: [
          { time: "08:00", available: true },
          { time: "10:00", available: true },
          { time: "14:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Backwater Boat Cruise",
    location: "Sunderbans, West Bengal",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=400&fit=crop&crop=center",
    price: 1199,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Explore the world's largest mangrove forest ecosystem.",
    slots: [
      {
        date: "2024-11-19",
        times: [
          { time: "11:00", available: true },
          { time: "16:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Bungee Jumping",
    location: "Manali, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=400&fit=crop&crop=center",
    price: 2499,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Experience the ultimate adrenaline rush with professional instructors.",
    slots: [
      {
        date: "2024-11-20",
        times: [
          { time: "10:00", available: true },
          { time: "14:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Mountain Trekking",
    location: "Dharamshala, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1464822759844-d150baec93d5?w=500&h=400&fit=crop&crop=center",
    price: 1599,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Trek through scenic mountain trails with breathtaking views.",
    slots: [
      {
        date: "2024-11-21",
        times: [
          { time: "06:00", available: true },
          { time: "07:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Desert Safari",
    location: "Jaisalmer, Rajasthan",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=500&h=400&fit=crop&crop=center",
    price: 1899,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Camel safari through golden sand dunes with cultural performances.",
    slots: [
      {
        date: "2024-11-22",
        times: [
          { time: "16:00", available: true },
          { time: "17:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Scuba Diving",
    location: "Andaman Islands",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=400&fit=crop&crop=center",
    price: 3499,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Explore vibrant coral reefs and marine life in crystal clear waters.",
    slots: [
      {
        date: "2024-11-23",
        times: [
          { time: "09:00", available: true },
          { time: "11:00", available: true },
          { time: "14:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Wildlife Safari",
    location: "Jim Corbett, Uttarakhand",
    image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=500&h=400&fit=crop&crop=center",
    price: 2199,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Spot tigers, elephants and diverse wildlife in their natural habitat.",
    slots: [
      {
        date: "2024-11-24",
        times: [
          { time: "06:00", available: true },
          { time: "15:00", available: true }
        ]
      }
    ]
  },
  {
    title: "River Rafting",
    location: "Rishikesh, Uttarakhand",
    image: "https://images.unsplash.com/photo-1502780402662-acc01917949e?w=500&h=400&fit=crop&crop=center",
    price: 1399,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Navigate thrilling rapids on the holy Ganges river.",
    slots: [
      {
        date: "2024-11-25",
        times: [
          { time: "09:00", available: true },
          { time: "12:00", available: true },
          { time: "15:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Paragliding",
    location: "Bir Billing, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=500&h=400&fit=crop&crop=center",
    price: 2799,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Soar through the skies with panoramic Himalayan views.",
    slots: [
      {
        date: "2024-11-26",
        times: [
          { time: "10:00", available: true },
          { time: "13:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Houseboat Stay",
    location: "Alleppey, Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500&h=400&fit=crop&crop=center",
    price: 4999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Overnight stay on traditional Kerala houseboat through backwaters.",
    slots: [
      {
        date: "2024-11-27",
        times: [
          { time: "14:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Rock Climbing",
    location: "Hampi, Karnataka",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=500&h=400&fit=crop&crop=center",
    price: 1799,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Scale ancient boulder formations in this UNESCO World Heritage site.",
    slots: [
      {
        date: "2024-11-28",
        times: [
          { time: "07:00", available: true },
          { time: "09:00", available: true },
          { time: "16:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Spice Plantation Tour",
    location: "Munnar, Kerala",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop&crop=center",
    price: 899,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Explore aromatic spice gardens and tea plantations in the Western Ghats.",
    slots: [
      {
        date: "2024-11-29",
        times: [
          { time: "09:00", available: true },
          { time: "11:00", available: true },
          { time: "14:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Cave Exploration",
    location: "Meghalaya",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=500&h=400&fit=crop&crop=center",
    price: 1999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Discover mysterious limestone caves and underground rivers.",
    slots: [
      {
        date: "2024-11-30",
        times: [
          { time: "08:00", available: true },
          { time: "13:00", available: true }
        ]
      }
    ]
  },
  {
    title: "Beach Camping",
    location: "Gokarna, Karnataka",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=400&fit=crop&crop=center",
    price: 1299,
    description: "Curated small-group experience. Certified guide. Safety first with gear included. Overnight beach camping with bonfire and stargazing sessions.",
    slots: [
      {
        date: "2024-12-01",
        times: [
          { time: "17:00", available: true }
        ]
      }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Connected to database');
    
    // Clear existing experiences
    await Experience.deleteMany({});
    console.log('Cleared existing experiences');
    
    // Insert travel experiences
    await Experience.insertMany(travelExperiences);
    console.log(`Successfully added ${travelExperiences.length} travel experiences to the database!`);
    
    // Display summary
    console.log('\n📍 Added experiences from locations:');
    const locations = [...new Set(travelExperiences.map(exp => exp.location))];
    locations.forEach(location => console.log(`   • ${location}`));
    
    console.log('\n🎯 Experience types added:');
    travelExperiences.forEach(exp => console.log(`   • ${exp.title} - ₹${exp.price}`));
    
    console.log('\n✅ Database seeded successfully! You can now start your servers.');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();