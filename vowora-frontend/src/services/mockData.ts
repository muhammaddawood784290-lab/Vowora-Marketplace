import type {
  User,
  CustomerProfile,
  VendorProfile,
  PlannerProfile,
  Category,
  Listing,
  Package,
  Service,
  AvailabilitySlot,
  Event,
  VendorRequest,
  QuoteVersion,
  Proposal,
  Shortlist,
  Booking,
  Invoice,
  Notification,
  Subscription,
  TeamMember,
  MediaAsset,
  AnalyticsSummary,
  AuditEvent,
  CRMContact,
} from '../types';

export function initializeMockData() {
  // Data is initialized lazily via the getters below
  mockDataStore.isInitialized = true;
}

const mockUserService = {
  getAllUsers(): User[] {
    return [
      {
        id: 'user-c1',
        email: 'sophia.chen@email.com',
        firstName: 'Sophia',
        lastName: 'Chen',
        role: 'customer',
        phone: '+1 415 555 0123',
        isActive: true,
        createdAt: '2025-01-15T10:00:00Z',
      },
      {
        id: 'user-c2',
        email: 'marcus.williams@email.com',
        firstName: 'Marcus',
        lastName: 'Williams',
        role: 'customer',
        phone: '+1 310 555 0456',
        isActive: true,
        createdAt: '2025-02-20T14:30:00Z',
      },
      {
        id: 'user-v1',
        email: 'elena.vasquez@email.com',
        firstName: 'Elena',
        lastName: 'Vasquez',
        role: 'vendor',
        phone: '+1 212 555 0789',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616-round?w=100',
        isActive: true,
        createdAt: '2024-08-10T09:00:00Z',
      },
      {
        id: 'user-v2',
        email: 'thomas.berg@email.com',
        firstName: 'Thomas',
        lastName: 'Berg',
        role: 'vendor',
        phone: '+1 416 555 0321',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        isActive: true,
        createdAt: '2024-09-05T11:00:00Z',
      },
      {
        id: 'user-p1',
        email: 'amara.okechukwu@email.com',
        firstName: 'Amara',
        lastName: 'Okechukwu',
        role: 'planner',
        phone: '+1 305 555 0654',
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
        isActive: true,
        createdAt: '2024-06-15T08:00:00Z',
      },
      {
        id: 'user-p2',
        email: 'james.fitzgerald@email.com',
        firstName: 'James',
        lastName: 'Fitzgerald',
        role: 'planner',
        phone: '+1 617 555 0987',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        isActive: true,
        createdAt: '2024-07-22T13:00:00Z',
      },
      {
        id: 'user-a1',
        email: 'admin@vowora.com',
        firstName: 'Sarah',
        lastName: 'Mitchell',
        role: 'admin',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z',
      },
    ];
  },

  getUserById(id: string): User | undefined {
    return this.getAllUsers().find((u) => u.id === id);
  },

  getCustomerProfile(userId: string): CustomerProfile | undefined {
    const profiles: Record<string, CustomerProfile> = {
      'user-c1': {
        userId: 'user-c1',
        company: 'Chen & Partners Law',
        address: '125 Market Street, Suite 400',
        city: 'San Francisco',
        country: 'United States',
        bio: 'Planning a destination wedding on the Monterey Peninsula for 140 guests.',
        preferences: ['rustic', 'outdoor', 'vintage'],
      },
      'user-c2': {
        userId: 'user-c2',
        company: 'Williams Design Studio',
        city: 'Los Angeles',
        country: 'United States',
        bio: 'Intimate backyard wedding celebration for family and close friends.',
      },
    };
    return profiles[userId];
  },

  getVendorProfile(userId: string): VendorProfile | undefined {
    const profiles: Record<string, VendorProfile> = {
      'user-v1': {
        userId: 'user-v1',
        companyName: 'Vasquez Events Studio',
        tagline: 'Elevated gatherings, thoughtfully designed.',
        description:
          'Full-service event design and production studio specializing in weddings, corporate celebrations, and private parties. We bring a refined eye for detail across floral design, lighting, and spatial storytelling.',
        categoryId: 'cat-venue-ceremony',
        rating: 4.9,
        reviewCount: 127,
        yearsOfExperience: 12,
        serviceArea: ['San Francisco Bay Area', 'Monterey', 'Napa Valley', 'Sonoma'],
        isVerified: true,
        responseTime: 'Under 2 hours',
        awardedCount: 89,
        completedCount: 76,
        cancellationRate: 1.2,
        brandingTier: 'moderate',
        portfolioCount: 24,
        packageCount: 8,
        teamMemberCount: 4,
      },
      'user-v2': {
        userId: 'user-v2',
        companyName: 'Berg Caterers',
        tagline: 'Exceptional food for exceptional moments.',
        description:
          'Award-winning catering company with over a decade of experience crafting menus for weddings and private events. We specialize in seasonal, locally sourced menus with flexible dining formats.',
        categoryId: 'cat-catering',
        rating: 4.8,
        reviewCount: 94,
        yearsOfExperience: 11,
        serviceArea: ['Toronto', 'Hamilton', 'Niagara Region'],
        isVerified: true,
        responseTime: 'Under 4 hours',
        awardedCount: 54,
        completedCount: 48,
        cancellationRate: 0.8,
        brandingTier: 'basic',
        portfolioCount: 7,
        packageCount: 3,
        teamMemberCount: 2,
      },
    };
    return profiles[userId];
  },

  getPlannerProfile(userId: string): PlannerProfile | undefined {
    const profiles: Record<string, PlannerProfile> = {
      'user-p1': {
        userId: 'user-p1',
        companyName: 'Amara Event Planning',
        title: 'Lead Wedding Planner',
        description:
          'Professional wedding and event planner with a calm, organized approach to bringing couples’ visions to life. I coordinate every detail so you can enjoy the celebration.',
        specialties: ['Weddings', 'Destination Events', 'Luxury Weddings', 'Cultural Weddings'],
        serviceArea: ['Miami', 'Fort Lauderdale', 'Palm Beach', 'Caribbean Destinations'],
        yearsOfExperience: 9,
        rating: 5.0,
        reviewCount: 46,
        isVerified: true,
        portfolioCount: 18,
        assignedEventCount: 12,
        completedEventCount: 34,
        brandingTier: 'advanced',
      },
      'user-p2': {
        userId: 'user-p2',
        companyName: 'Fitzgerald Events',
        title: 'Senior Event Coordinator',
        description:
          'Detail-oriented planner focused on seamless execution for intimate and mid-size celebrations. Known for clear communication and creative problem-solving.',
        specialties: ['Weddings', 'Engagement Parties', 'Bridal Showers', 'Reception Planning'],
        serviceArea: ['Boston', 'Cambridge', 'Cape Cod', 'New Hampshire'],
        yearsOfExperience: 7,
        rating: 4.7,
        reviewCount: 32,
        isVerified: true,
        portfolioCount: 9,
        assignedEventCount: 5,
        completedEventCount: 21,
        brandingTier: 'moderate',
      },
    };
    return profiles[userId];
  },

  getSubscription(userId: string): Subscription | undefined {
    const subscriptions: Record<string, Subscription> = {
      'user-v1': {
        id: 'sub-v1',
        userId: 'user-v1',
        plan: 'gold',
        status: 'active',
        currentPeriodStart: '2026-10-01T00:00:00Z',
        currentPeriodEnd: '2026-11-01T00:00:00Z',
        cancelAtPeriodEnd: false,
        createdAt: '2024-08-10T09:00:00Z',
      },
      'user-v2': {
        id: 'sub-v2',
        userId: 'user-v2',
        plan: 'silver',
        status: 'active',
        currentPeriodStart: '2026-09-15T00:00:00Z',
        currentPeriodEnd: '2026-10-15T00:00:00Z',
        cancelAtPeriodEnd: false,
        createdAt: '2024-09-05T11:00:00Z',
      },
      'user-p1': {
        id: 'sub-p1',
        userId: 'user-p1',
        plan: 'diamond',
        status: 'active',
        currentPeriodStart: '2026-08-01T00:00:00Z',
        currentPeriodEnd: '2026-09-01T00:00:00Z',
        cancelAtPeriodEnd: false,
        createdAt: '2024-06-15T08:00:00Z',
      },
      'user-p2': {
        id: 'sub-p2',
        userId: 'user-p2',
        plan: 'silver',
        status: 'active',
        currentPeriodStart: '2026-10-01T00:00:00Z',
        currentPeriodEnd: '2026-11-01T00:00:00Z',
        cancelAtPeriodEnd: false,
        createdAt: '2024-07-22T13:00:00Z',
      },
    };
    return subscriptions[userId];
  },
};

const mockMarketplaceService = {
  getCategories(): Category[] {
    return [
      {
        id: 'cat-venue-reception',
        name: 'Reception Venues',
        slug: 'reception-venues',
        description:
          'Spaces for dinner receptions, banquets, and post-ceremony celebrations ranging from ballrooms to garden pavilions.',
        icon: 'building',
        listingCount: 42,
      },
      {
        id: 'cat-venue-ceremony',
        name: 'Ceremony Venues',
        slug: 'ceremony-venues',
        description:
          'Scenic locations for vows and ceremonies, including gardens, beaches, observatories, and historic settings.',
        icon: 'heart',
        listingCount: 38,
      },
      {
        id: 'cat-catering',
        name: 'Catering',
        slug: 'catering',
        description:
          'Full-service caterers, menu designers, and dessert specialists for weddings and events of every scale.',
        icon: 'chef',
        listingCount: 29,
      },
      {
        id: 'cat-photography',
        name: 'Photography',
        slug: 'photography',
        description:
          'Wedding and event photographers capturing candid moments, portraits, and full-day coverage in every style.',
        icon: 'camera',
        listingCount: 56,
      },
      {
        id: 'cat-video',
        name: 'Videography',
        slug: 'videography',
        description:
          'Cinematic videographers and editors producing highlight films, documentary coverage, and social-ready edits.',
        icon: 'video',
        listingCount: 31,
      },
      {
        id: 'cat-floral-decoration',
        name: 'Floral & Decoration',
        slug: 'floral-decoration',
        description:
          'Florists, decor designers, and styling teams creating centerpieces, installations, and complete visual themes.',
        icon: 'flower',
        listingCount: 48,
      },
      {
        id: 'cat-music-entertainment',
        name: 'Music & Entertainment',
        slug: 'music-entertainment',
        description:
          'Bands, DJs, live musicians, and performers to set the tone for ceremonies and receptions.',
        icon: 'music',
        listingCount: 44,
      },
      {
        id: 'cat-transportation',
        name: 'Transportation',
        slug: 'transportation',
        description:
          'Buses, shuttles, vintage car rentals, and fleet coordination for guest transit and wedding parties.',
        icon: 'car',
        listingCount: 19,
      },
      {
        id: 'cat-accommodation',
        name: 'Accommodation',
        slug: 'accommodation',
        description:
          'Hotels, inns, and venue lodging blocks for out-of-town guests and wedding parties.',
        icon: 'home',
        listingCount: 27,
      },
    ];
  },

  getCategoryBySlug(slug: string): Category | undefined {
    return this.getCategories().find((c) => c.slug === slug);
  },

  getListings({
    categoryId,
    search,
    page = 1,
    pageSize = 12,
    featured,
    vendorId,
  }: {
    categoryId?: string;
    search?: string;
    page?: number;
    pageSize?: number;
    featured?: boolean;
    vendorId?: string;
  } = {}): { listings: Listing[]; total: number; page: number } {
    let listings = this.getAllListings();

    if (categoryId) {
      listings = listings.filter((l) => l.categoryId === categoryId);
    }
    if (search) {
      const q = search.toLowerCase();
      listings = listings.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }
    if (featured) {
      listings = listings.filter((l) => l.isFeatured);
    }
    if (vendorId) {
      listings = listings.filter((l) => l.vendorId === vendorId);
    }

    listings = listings.sort((a, b) => {
      if (featured) return b.isFeatured ? 1 : -1;
      return b.rating - a.rating;
    });

    const total = listings.length;
    const start = (page - 1) * pageSize;
    return {
      listings: listings.slice(start, start + pageSize),
      total,
      page,
    };
  },

  getAllListings(): Listing[] {
    return [
      {
        id: 'listing-1',
        vendorId: 'user-v1',
        categoryId: 'cat-floral-decoration',
        title: 'Estate Garden Floral Design',
        description:
          'Hand-tied garden-style centerpieces, ceremony arches, and a personalized welcome table for intimate and mid-size weddings.',
        price: 3200,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1514732369642-7e0c8a78f9b6?w=800',
        rating: 4.9,
        reviewCount: 34,
        isFeatured: true,
        isAvailable: true,
        createdAt: '2025-03-10T09:00:00Z',
      },
      {
        id: 'listing-2',
        vendorId: 'user-v1',
        categoryId: 'cat-venue-reception',
        title: 'Converted Barn Reception Hall',
        description:
          'Restored 19th-century barn with vaulted ceilings, exposed beams, and a wraparound deck for sunset cocktails.',
        price: 5800,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1516137418202-7deb7f11f440?w=800',
        rating: 4.8,
        reviewCount: 21,
        isFeatured: true,
        isAvailable: true,
        createdAt: '2025-02-18T11:00:00Z',
      },
      {
        id: 'listing-3',
        vendorId: 'user-v2',
        categoryId: 'cat-catering',
        title: 'Seasonal Tasting Menu',
        description:
          'Six-course plated tasting menu with wine pairings, seasonal ingredients, and flexible service formats for 50 to 200 guests.',
        price: 185,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        rating: 4.7,
        reviewCount: 48,
        isFeatured: false,
        isAvailable: true,
        createdAt: '2025-04-02T14:00:00Z',
      },
      {
        id: 'listing-4',
        vendorId: 'user-v2',
        categoryId: 'cat-catering',
        title: 'Station-Style Cocktail Reception',
        description:
          'Interactive food stations with passed bites, carving stations, and late-night dessert cart for lively receptions.',
        price: 95,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1504674976778-5e54cc3b3f7b?w=800',
        rating: 4.6,
        reviewCount: 27,
        isFeatured: false,
        isAvailable: true,
        createdAt: '2025-04-15T10:00:00Z',
      },
      {
        id: 'listing-5',
        vendorId: 'user-v1',
        categoryId: 'cat-floral-decoration',
        title: 'Botanical Arch & Aisle',
        description:
          'Custom floral ceremony arch with seasonal blooms and coordinated aisle markers for a cohesive ceremony look.',
        price: 1400,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1496430477427-4a6d0e3e1c0c?w=800',
        rating: 4.9,
        reviewCount: 19,
        isFeatured: false,
        isAvailable: true,
        createdAt: '2025-05-01T08:00:00Z',
      },
      {
        id: 'listing-6',
        vendorId: 'user-v1',
        categoryId: 'cat-music-entertainment',
        title: 'Acoustic String Quartet',
        description:
          'Four-piece string ensemble performing ceremony selections and cocktail hour sets in classical and modern arrangements.',
        price: 950,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1518186285589-2f7642a1d718?w=800',
        rating: 4.8,
        reviewCount: 15,
        isFeatured: false,
        isAvailable: true,
        createdAt: '2025-06-10T12:00:00Z',
      },
      {
        id: 'listing-7',
        vendorId: 'user-v2',
        categoryId: 'cat-catering',
        title: 'Wedding Cake & Dessert Table',
        description:
          'Custom tiered wedding cake with sheet desserts, mini pastries, and a dedicated dessert station for 100 to 150 guests.',
        price: 1200,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800',
        rating: 4.9,
        reviewCount: 41,
        isFeatured: true,
        isAvailable: true,
        createdAt: '2025-07-22T09:00:00Z',
      },
      {
        id: 'listing-8',
        vendorId: 'user-v1',
        categoryId: 'cat-photography',
        title: 'Full-Day Wedding Photography',
        description:
          'Unlimited digital gallery, 10-hour coverage, engagement session, and 30 professionally edited images within two weeks.',
        price: 2200,
        currency: 'USD',
        imageUrl:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
        rating: 4.7,
        reviewCount: 22,
        isFeatured: false,
        isAvailable: true,
        createdAt: '2025-08-05T16:00:00Z',
      },
    ];
  },

  getListing(id: string): Listing | undefined {
    return this.getAllListings().find((l) => l.id === id);
  },

  getVendorPackages(vendorId: string): Package[] {
    if (vendorId === 'user-v1') {
      return [
        {
          id: 'pkg-1',
          vendorId: 'user-v1',
          name: 'Essential Day-of Package',
          description:
            'Coordination, setup, and breakdown for a single event day with basic floral design.',
          price: 2400,
          currency: 'USD',
          duration: '8 hours',
          inclusions: [
            'Day-of coordination',
            'Basic floral centerpieces (up to 10 tables)',
            'Setup and breakdown',
            'Vendor timeline',
          ],
          exclusions: [
            'Ceremony design',
            'Arches or installations',
            'Addressing or styling',
          ],
          isPopular: true,
        },
        {
          id: 'pkg-2',
          vendorId: 'user-v1',
          name: 'Signature Wedding Package',
          description:
            'Complete floral and decor design for ceremony, cocktail hour, and reception with dedicated design lead.',
          price: 5200,
          currency: 'USD',
          duration: 'Full event day + 2 prep days',
          inclusions: [
            'Dedicated design lead',
            'Ceremony arch and aisle design',
            'Cocktail hour styling',
            'Reception flourishes (up to 15 tables)',
            'Setup, breakdown, and load-out',
            'Day-of coordination',
          ],
          exclusions: ['Lighting design', 'Multimedia production'],
          isFeatured: true,
        },
        {
          id: 'pkg-3',
          vendorId: 'user-v1',
          name: 'Elevated Estate Package',
          description:
            'Full spatial design for high-end weddings across multiple rooms, gardens, and outdoor areas.',
          price: 9800,
          currency: 'USD',
          duration: 'Full event + 4 prep days',
          inclusions: [
            'Full spatial design',
            'Ceremony and reception design',
            'Floral, decor, and soft goods',
            'Lighting consultation',
            'Dedicated design and coordination team',
            '10 final-round revisions',
          ],
          exclusions: ['Catering', 'Music booking'],
        },
        {
          id: 'pkg-4',
          vendorId: 'user-v1',
          name: 'Corporate Event Styling',
          description:
            'Themed decor, branding integration, and styling for corporate galas, product launches, and private parties.',
          price: 3500,
          currency: 'USD',
          duration: 'Event day + 2 prep days',
          inclusions: [
            'Theme concept and styling',
            'Brand integration consult',
            'Ceremony or stage area design',
            'Cocktail and reception styling',
            'Team of two on site',
          ],
          exclusions: ['Audiovisual production', 'Catering'],
        },
      ];
    }
    if (vendorId === 'user-v2') {
      return [
        {
          id: 'pkg-5',
          vendorId: 'user-v2',
          name: 'Plated Dinner',
          description:
            'Formal plated dinner with two menu options, table service, and coordinated timing with the event schedule.',
          price: 150,
          currency: 'USD',
          duration: '3–4 hours',
          inclusions: [
            'Two plated menu options',
            'Table service staff',
            'Coordinated service timing',
            'Dietary accommodation',
          ],
          exclusions: [
            'Bar service',
            'Cake cutting setup',
            'Late-night service',
          ],
          isPopular: true,
        },
        {
          id: 'pkg-6',
          vendorId: 'user-v2',
          name: 'Reception Buffet',
          description:
            'Elegant buffet service with two stations, staff coordination, and flexible menu customization.',
          price: 95,
          currency: 'USD',
          duration: '2–3 hours',
          inclusions: [
            'Two buffet stations',
            'Serving staff',
            'Buffet table setup',
            'Flexible menu design',
          ],
          exclusions: ['Plated options', 'Bar service'],
        },
        {
          id: 'pkg-7',
          vendorId: 'user-v2',
          name: 'Cocktail Reception',
          description:
            'Passed hors d’oeuvres, station bites, and late-night dessert option for cocktail-style receptions.',
          price: 75,
          currency: 'USD',
          duration: '2–3 hours',
          inclusions: [
            'Passed hors d’oeuvres',
            'Two food stations',
            'Late-night dessert cart',
            'Staffed service',
          ],
          exclusions: ['Dinner service', 'Bar service'],
        },
      ];
    }
    return [];
  },

  getVendorServices(vendorId: string): Service[] {
    if (vendorId === 'user-v1') {
      return [
        {
          id: 'svc-1',
          vendorId: 'user-v1',
          name: 'Floral Design',
          description: 'Custom floral arrangements for ceremonies and receptions.',
          category: 'Floral',
          basePrice: 500,
          currency: 'USD',
          duration: 'Varies',
          isAvailable: true,
        },
        {
          id: 'svc-2',
          vendorId: 'user-v1',
          name: 'Event Decor & Styling',
          description: 'Table settings, drapery, linens, and themed visual design.',
          category: 'Decoration',
          basePrice: 800,
          currency: 'USD',
          duration: 'Varies',
          isAvailable: true,
        },
        {
          id: 'svc-3',
          vendorId: 'user-v1',
          name: 'Day-of Coordination',
          description: 'On-site coordination, vendor timing, and guest flow management.',
          category: 'Planning',
          basePrice: 600,
          currency: 'USD',
          duration: '8 hours',
          isAvailable: true,
        },
        {
          id: 'svc-4',
          vendorId: 'user-v1',
          name: 'Ceremony Design',
          description: 'Arch, aisle, and altar styling for a cohesive ceremony experience.',
          category: 'Ceremony',
          basePrice: 1200,
          currency: 'USD',
          duration: 'Half day',
          isAvailable: true,
        },
      ];
    }
    if (vendorId === 'user-v2') {
      return [
        {
          id: 'svc-5',
          vendorId: 'user-v2',
          name: 'Plated Catering',
          description: 'Formal plated dinner service with custom menus.',
          category: 'Catering',
          basePrice: 150,
          currency: 'USD',
          duration: '3–4 hours',
          isAvailable: true,
        },
        {
          id: 'svc-6',
          vendorId: 'user-v2',
          name: 'Buffet Catering',
          description: 'Station-based buffet with flexible menu options.',
          category: 'Catering',
          basePrice: 95,
          currency: 'USD',
          duration: '2–3 hours',
          isAvailable: true,
        },
        {
          id: 'svc-7',
          vendorId: 'user-v2',
          name: 'Dessert Service',
          description: 'Wedding cake, sheet desserts, and dessert stations.',
          category: 'Desserts',
          basePrice: 800,
          currency: 'USD',
          duration: '2 hours',
          isAvailable: true,
        },
        {
          id: 'svc-8',
          vendorId: 'user-v2',
          name: 'Bar Service',
          description: 'Full bar setup, cocktail service, and bar staff coordination.',
          category: 'Beverage',
          basePrice: 600,
          currency: 'USD',
          duration: '3–4 hours',
          isAvailable: true,
        },
      ];
    }
    return [];
  },

  getAvailability(vendorId: string): AvailabilitySlot[] {
    const base = [
      {
        id: 'avail-1',
        vendorId,
        date: '2026-11-20',
        startTime: '10:00',
        endTime: '18:00',
        status: 'available' as const,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: 'avail-2',
        vendorId,
        date: '2026-11-27',
        startTime: '10:00',
        endTime: '18:00',
        status: 'available' as const,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: 'avail-3',
        vendorId,
        date: '2026-12-04',
        startTime: '10:00',
        endTime: '18:00',
        status: 'booked' as const,
        maxBookings: 1,
        currentBookings: 1,
      },
      {
        id: 'avail-4',
        vendorId,
        date: '2026-12-11',
        startTime: '10:00',
        endTime: '18:00',
        status: 'available' as const,
        maxBookings: 1,
        currentBookings: 0,
      },
      {
        id: 'avail-5',
        vendorId,
        date: '2026-12-18',
        startTime: '10:00',
        endTime: '18:00',
        status: 'unavailable' as const,
        maxBookings: 1,
        currentBookings: 0,
      },
    ];
    return base;
  },
};

const mockEventService = {
  getAllEvents(): Event[] {
    return [
      {
        id: 'evt-1',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        eventName: 'Chen Memorial Wedding',
        description:
          'Destination wedding on the Monterey Peninsula for 140 guests with ceremony at a coastal garden and reception at a historic lodge.',
        eventType: 'Wedding',
        eventDate: '2026-12-12',
        eventTime: '16:00',
        venue: 'Monterey Coastal Gardens',
        city: 'Monterey',
        country: 'United States',
        guestCount: 140,
        budget: 45000,
        currency: 'USD',
        status: 'shortlist_ready',
        plannerId: 'user-p1',
        plannerName: 'Amara Okechukwu',
        createdAt: '2026-09-20T10:00:00Z',
        updatedAt: '2026-10-05T14:00:00Z',
      },
      {
        id: 'evt-2',
        customerId: 'user-c2',
        customerName: 'Marcus Williams',
        eventName: 'Williams Anniversary Celebration',
        description:
          'Intimate anniversary gathering for 60 guests in a private garden with dinner, music, and a short program.',
        eventType: 'Anniversary',
        eventDate: '2026-11-18',
        eventTime: '18:00',
        venue: 'Pasadena Garden House',
        city: 'Pasadena',
        country: 'United States',
        guestCount: 60,
        budget: 12000,
        currency: 'USD',
        status: 'proposal_received',
        createdAt: '2026-10-01T09:00:00Z',
        updatedAt: '2026-10-10T11:00:00Z',
      },
      {
        id: 'evt-3',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        eventName: 'Chen Rehearsal Dinner',
        description:
          'Rehearsal dinner for 40 close family members at a nearby inn the evening before the wedding.',
        eventType: 'Rehearsal Dinner',
        eventDate: '2026-12-11',
        eventTime: '19:00',
        venue: 'Lodge Terrace Room',
        city: 'Monterey',
        country: 'United States',
        guestCount: 40,
        budget: 6000,
        currency: 'USD',
        status: 'draft',
        createdAt: '2026-10-08T15:00:00Z',
        updatedAt: '2026-10-08T15:00:00Z',
      },
    ];
  },

  getEvent(id: string): Event | undefined {
    return this.getAllEvents().find((e) => e.id === id);
  },

  getEventsByCustomer(customerId: string): Event[] {
    return this.getAllEvents().filter((e) => e.customerId === customerId);
  },
};

const mockVendorRequestService = {
  getAllRequests(): VendorRequest[] {
    return [
      {
        id: 'req-1',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        eventDate: '2026-12-12',
        vendorId: 'user-v1',
        vendorName: 'Elena Vasquez',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        status: 'accepted',
        requestType: 'Floral Design',
        message: 'We would love to explore a garden-style floral package for the ceremony and reception.',
        responseDeadline: '2026-10-25T23:59:59Z',
        createdAt: '2026-10-12T09:00:00Z',
      },
      {
        id: 'req-2',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        eventDate: '2026-12-12',
        vendorId: 'user-v2',
        vendorName: 'Thomas Berg',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        status: 'pending',
        requestType: 'Catering',
        message: 'Interested in a plated dinner for 140 guests with wine pairings.',
        responseDeadline: '2026-10-28T23:59:59Z',
        createdAt: '2026-10-14T11:00:00Z',
      },
      {
        id: 'req-3',
        eventId: 'evt-2',
        eventName: 'Williams Anniversary Celebration',
        eventDate: '2026-11-18',
        vendorId: 'user-v1',
        vendorName: 'Elena Vasquez',
        customerId: 'user-c2',
        customerName: 'Marcus Williams',
        status: 'countered',
        requestType: 'Decor & Styling',
        message: 'Looking for a warm, seasonal decor concept for an evening celebration.',
        responseDeadline: '2026-10-30T23:59:59Z',
        createdAt: '2026-10-16T14:00:00Z',
      },
    ];
  },

  getRequest(id: string): VendorRequest | undefined {
    return this.getAllRequests().find((r) => r.id === id);
  },

  getRequestsByVendor(vendorId: string): VendorRequest[] {
    return this.getAllRequests().filter((r) => r.vendorId === vendorId);
  },

  getRequestsByCustomer(customerId: string): VendorRequest[] {
    return this.getAllRequests().filter((r) => r.customerId === customerId);
  },
};

const mockQuoteService = {
  getAllQuotes(): QuoteVersion[] {
    return [
      {
        id: 'quote-1',
        requestId: 'req-1',
        vendorId: 'user-v1',
        vendorName: 'Elena Vasquez',
        version: 1,
        items: [
          {
            id: 'qi-1',
            description: 'Garden-style ceremony arch',
            quantity: 1,
            unitPrice: 1400,
            total: 1400,
          },
          {
            id: 'qi-2',
            description: 'Reception centerpieces (10 tables)',
            quantity: 10,
            unitPrice: 120,
            total: 1200,
          },
          {
            id: 'qi-3',
            description: 'Welcome table installation',
            quantity: 1,
            unitPrice: 600,
            total: 600,
          },
        ],
        subtotal: 3200,
        tax: 0,
        total: 3200,
        currency: 'USD',
        validUntil: '2026-12-01T23:59:59Z',
        status: 'submitted',
        notes: 'Final pricing confirmed with seasonal flower availability.',
        createdAt: '2026-10-15T10:00:00Z',
      },
      {
        id: 'quote-2',
        requestId: 'req-2',
        vendorId: 'user-v2',
        vendorName: 'Thomas Berg',
        version: 1,
        items: [
          {
            id: 'qi-4',
            description: 'Plated dinner for 140 guests',
            quantity: 140,
            unitPrice: 150,
            total: 21000,
          },
          {
            id: 'qi-5',
            description: 'Wine pairing per guest',
            quantity: 140,
            unitPrice: 25,
            total: 3500,
          },
        ],
        subtotal: 24500,
        tax: 0,
        total: 24500,
        currency: 'USD',
        validUntil: '2026-12-01T23:59:59Z',
        status: 'submitted',
        notes: 'Menu options and tasting schedule attached.',
        createdAt: '2026-10-17T14:00:00Z',
      },
      {
        id: 'quote-3',
        requestId: 'req-3',
        vendorId: 'user-v1',
        vendorName: 'Elena Vasquez',
        version: 1,
        items: [
          {
            id: 'qi-6',
            description: 'Seasonal decor styling',
            quantity: 1,
            unitPrice: 2800,
            total: 2800,
          },
          {
            id: 'qi-7',
            description: 'Table linens and settings',
            quantity: 1,
            unitPrice: 500,
            total: 500,
          },
        ],
        subtotal: 3300,
        tax: 0,
        total: 3300,
        currency: 'USD',
        validUntil: '2026-11-10T23:59:59Z',
        status: 'countered',
        notes: 'Counter offered: reduced scope with one decor installation instead of full styling.',
        createdAt: '2026-10-18T09:00:00Z',
      },
    ];
  },

  getQuote(id: string): QuoteVersion | undefined {
    return this.getAllQuotes().find((q) => q.id === id);
  },

  getQuotesByVendor(vendorId: string): QuoteVersion[] {
    return this.getAllQuotes().filter((q) => q.vendorId === vendorId);
  },
};

const mockProposalService = {
  getAllProposals(): Proposal[] {
    return [
      {
        id: 'prop-1',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        plannerId: 'user-p1',
        plannerName: 'Amara Okechukwu',
        vendorIds: ['user-v1', 'user-v2'],
        vendorNames: ['Elena Vasquez', 'Thomas Berg'],
        items: [
          {
            id: 'pi-1',
            vendorId: 'user-v1',
            vendorName: 'Elena Vasquez',
            category: 'Floral & Decoration',
            description: 'Garden-style ceremony arch',
            quantity: 1,
            unitPrice: 1400,
            total: 1400,
          },
          {
            id: 'pi-2',
            vendorId: 'user-v1',
            vendorName: 'Elena Vasquez',
            category: 'Floral & Decoration',
            description: 'Reception centerpieces (10 tables)',
            quantity: 10,
            unitPrice: 120,
            total: 1200,
          },
          {
            id: 'pi-3',
            vendorId: 'user-v2',
            vendorName: 'Thomas Berg',
            category: 'Catering',
            description: 'Plated dinner for 140 guests',
            quantity: 140,
            unitPrice: 150,
            total: 21000,
          },
          {
            id: 'pi-4',
            vendorId: 'user-v2',
            vendorName: 'Thomas Berg',
            category: 'Catering',
            description: 'Wine pairing per guest',
            quantity: 140,
            unitPrice: 25,
            total: 3500,
          },
        ],
        subtotal: 27100,
        tax: 0,
        total: 27100,
        currency: 'USD',
        validUntil: '2026-12-01T23:59:59Z',
        status: 'submitted',
        notes: 'Proposed packages reflect reviewed quotes and preferred vendor selections.',
        createdAt: '2026-10-20T11:00:00Z',
      },
    ];
  },

  getProposal(id: string): Proposal | undefined {
    return this.getAllProposals().find((p) => p.id === id);
  },
};

const mockShortlistService = {
  getAllShortlists(): Shortlist[] {
    return [
      {
        id: 'sl-1',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        customerId: 'user-c1',
        vendorCount: 2,
        status: 'shared',
        createdAt: '2026-10-05T14:00:00Z',
      },
    ];
  },

  getShortlist(id: string): Shortlist | undefined {
    return this.getAllShortlists().find((s) => s.id === id);
  },
};

const mockBookingService = {
  getAllBookings(): Booking[] {
    return [
      {
        id: 'book-1',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        vendorId: 'user-v1',
        vendorName: 'Elena Vasquez',
        plannerId: 'user-p1',
        plannerName: 'Amara Okechukwu',
        totalAmount: 3200,
        currency: 'USD',
        status: 'pending',
        startDate: '2026-12-11',
        endDate: '2026-12-12',
        createdAt: '2026-10-22T10:00:00Z',
      },
      {
        id: 'book-2',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        customerId: 'user-c1',
        customerName: 'Sophia Chen',
        vendorId: 'user-v2',
        vendorName: 'Thomas Berg',
        plannerId: 'user-p1',
        plannerName: 'Amara Okechukwu',
        totalAmount: 24500,
        currency: 'USD',
        status: 'pending',
        startDate: '2026-12-11',
        endDate: '2026-12-12',
        createdAt: '2026-10-22T10:00:00Z',
      },
    ];
  },

  getBooking(id: string): Booking | undefined {
    return this.getAllBookings().find((b) => b.id === id);
  },
};

const mockInvoiceService = {
  getAllInvoices(): Invoice[] {
    return [
      {
        id: 'inv-1',
        bookingId: 'book-1',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        invoiceNumber: 'INV-2026-0001',
        issuerId: 'user-v1',
        issuerName: 'Elena Vasquez',
        payerId: 'user-c1',
        payerName: 'Sophia Chen',
        payeeId: 'user-v1',
        payeeName: 'Elena Vasquez',
        amount: 3200,
        currency: 'USD',
        status: 'issued',
        paymentStatus: 'unpaid',
        dueDate: '2026-11-20T23:59:59Z',
        createdAt: '2026-10-22T10:00:00Z',
      },
      {
        id: 'inv-2',
        bookingId: 'book-2',
        eventId: 'evt-1',
        eventName: 'Chen Memorial Wedding',
        invoiceNumber: 'INV-2026-0002',
        issuerId: 'user-v2',
        issuerName: 'Thomas Berg',
        payerId: 'user-c1',
        payerName: 'Sophia Chen',
        payeeId: 'user-v2',
        payeeName: 'Thomas Berg',
        amount: 24500,
        currency: 'USD',
        status: 'issued',
        paymentStatus: 'unpaid',
        dueDate: '2026-11-20T23:59:59Z',
        createdAt: '2026-10-22T10:00:00Z',
      },
      {
        id: 'inv-3',
        eventId: 'evt-2',
        eventName: 'Williams Anniversary Celebration',
        invoiceNumber: 'INV-2026-0003',
        issuerId: 'user-v1',
        issuerName: 'Elena Vasquez',
        payerId: 'user-c2',
        payerName: 'Marcus Williams',
        payeeId: 'user-v1',
        payeeName: 'Elena Vasquez',
        amount: 2800,
        currency: 'USD',
        status: 'issued',
        paymentStatus: 'reported',
        dueDate: '2026-11-01T23:59:59Z',
        createdAt: '2026-10-19T14:00:00Z',
      },
    ];
  },

  getInvoice(id: string): Invoice | undefined {
    return this.getAllInvoices().find((i) => i.id === id);
  },

  getInvoicesByVendor(vendorId: string): Invoice[] {
    return this.getAllInvoices().filter((i) => i.issuerId === vendorId);
  },

  getInvoicesByCustomer(customerId: string): Invoice[] {
    return this.getAllInvoices().filter((i) => i.payerId === customerId);
  },
};

const mockNotificationService = {
  getAllNotifications(userId: string): Notification[] {
    const all: Notification[] = [
      {
        id: 'notif-1',
        userId: 'user-v1',
        type: 'request_received',
        title: 'New request: Chen Memorial Wedding',
        message: 'Sophia Chen sent a floral design request for the Chen Memorial Wedding on 2026-12-12.',
        isRead: false,
        referenceId: 'req-1',
        referenceType: 'vendor-request',
        createdAt: '2026-10-12T09:00:00Z',
      },
      {
        id: 'notif-2',
        userId: 'user-v1',
        type: 'quote_viewed',
        title: 'Quote viewed: Chen Memorial Wedding',
        message: 'Sophia Chen viewed your quote for the Chen Memorial Wedding.',
        isRead: false,
        referenceId: 'quote-1',
        referenceType: 'quote',
        createdAt: '2026-10-16T11:00:00Z',
      },
      {
        id: 'notif-3',
        userId: 'user-v1',
        type: 'invoice_issued',
        title: 'Invoice issued: INV-2026-0001',
        message: 'Invoice INV-2026-0001 for 3,200 USD has been issued to Sophia Chen.',
        isRead: true,
        referenceId: 'inv-1',
        referenceType: 'invoice',
        createdAt: '2026-10-22T10:00:00Z',
      },
      {
        id: 'notif-4',
        userId: 'user-p1',
        type: 'assignment_created',
        title: 'New assignment: Chen Memorial Wedding',
        message: 'You have been assigned to the Chen Memorial Wedding on 2026-12-12.',
        isRead: false,
        referenceId: 'evt-1',
        referenceType: 'event',
        createdAt: '2026-09-20T10:00:00Z',
      },
      {
        id: 'notif-5',
        userId: 'user-p1',
        type: 'proposal_submitted',
        title: 'Proposal submitted: Chen Memorial Wedding',
        message: 'A proposal for the Chen Memorial Wedding has been submitted for Sophia Chen’s review.',
        isRead: true,
        referenceId: 'prop-1',
        referenceType: 'proposal',
        createdAt: '2026-10-20T11:00:00Z',
      },
    ];

    return all.filter((n) => n.userId === userId);
  },
};

const mockTeamMemberService = {
  getAllTeamMembers(ownerId: string, ownerType: 'vendor' | 'planner'): TeamMember[] {
    if (ownerId === 'user-v1' && ownerType === 'vendor') {
      return [
        {
          id: 'tm-1',
          vendorId: 'user-v1',
          firstName: 'Lena',
          lastName: 'Martinez',
          email: 'lena.martinez@vasqueszevents.com',
          role: 'Design Lead',
          permissions: ['manage_profile', 'manage_packages', 'manage_portfolio', 'view_analytics'],
          isActive: true,
          joinedAt: '2024-09-01T00:00:00Z',
        },
        {
          id: 'tm-2',
          vendorId: 'user-v1',
          firstName: 'David',
          lastName: 'Kim',
          email: 'david.kim@vasqueszevents.com',
          role: 'Production Coordinator',
          permissions: ['manage_availability', 'view_crm', 'view_analytics'],
          isActive: true,
          joinedAt: '2025-02-10T00:00:00Z',
        },
      ];
    }
    if (ownerId === 'user-p1' && ownerType === 'planner') {
      return [
        {
          id: 'tm-3',
          plannerId: 'user-p1',
          firstName: 'Ruth',
          lastName: 'Annamalai',
          email: 'ruth@amaraevents.com',
          role: 'Associate Planner',
          permissions: ['manage_events', 'manage_vendors', 'view_crm', 'view_analytics'],
          isActive: true,
          joinedAt: '2025-01-15T00:00:00Z',
        },
      ];
    }
    return [];
  },
};

const mockCRMService = {
  getAllContacts(ownerId: string, ownerType: 'vendor' | 'planner'): CRMContact[] {
    if (ownerId === 'user-v1' && ownerType === 'vendor') {
      return [
        {
          id: 'crm-1',
          ownerId: 'user-v1',
          ownerType: 'vendor',
          firstName: 'Sophia',
          lastName: 'Chen',
          email: 'sophia.chen@email.com',
          phone: '+1 415 555 0123',
          company: 'Chen & Partners Law',
          lastContacted: '2026-10-15T10:00:00Z',
          leadSource: 'Marketplace inquiry',
          status: 'customer',
          notes: 'Interested in floral design for December wedding.',
          createdAt: '2026-10-12T09:00:00Z',
        },
        {
          id: 'crm-2',
          ownerId: 'user-v1',
          ownerType: 'vendor',
          firstName: 'Marcus',
          lastName: 'Williams',
          email: 'marcus.williams@email.com',
          phone: '+1 310 555 0456',
          company: 'Williams Design Studio',
          lastContacted: '2026-10-18T14:00:00Z',
          leadSource: 'Referral',
          status: 'opportunity',
          notes: 'Exploring decor for November celebration.',
          createdAt: '2026-10-16T14:00:00Z',
        },
        {
          id: 'crm-3',
          ownerId: 'user-v1',
          ownerType: 'vendor',
          firstName: 'Priya',
          lastName: 'Sharma',
          email: 'priya.sharma@email.com',
          leadSource: 'Organic search',
          status: 'lead',
          createdAt: '2026-10-20T09:00:00Z',
        },
      ];
    }
    if (ownerId === 'user-p1' && ownerType === 'planner') {
      return [
        {
          id: 'crm-4',
          ownerId: 'user-p1',
          ownerType: 'planner',
          firstName: 'Sophia',
          lastName: 'Chen',
          email: 'sophia.chen@email.com',
          phone: '+1 415 555 0123',
          company: 'Chen & Partners Law',
          lastContacted: '2026-10-20T11:00:00Z',
          leadSource: 'Marketplace inquiry',
          status: 'customer',
          notes: 'Assigned event: Chen Memorial Wedding.',
          createdAt: '2026-09-20T10:00:00Z',
        },
      ];
    }
    return [];
  },
};

const mockMediaService = {
  getAllAssets(ownerId: string, ownerType: 'vendor' | 'planner'): MediaAsset[] {
    if (ownerId === 'user-v1' && ownerType === 'vendor') {
      return [
        {
          id: 'media-1',
          ownerId: 'user-v1',
          ownerType: 'vendor',
          fileUrl: 'https://images.unsplash.com/photo-1514732369642-7e0c8a78f9b6?w=1200',
          fileType: 'image/jpeg',
          fileName: 'estate-garden-floral-design.jpg',
          fileSize: 245000,
          thumbnailUrl: 'https://images.unsplash.com/photo-1514732369642-7e0c8a78f9b6?w=300',
          altText: 'Garden-style floral centerpieces',
          isPrimary: true,
          createdAt: '2025-03-10T09:00:00Z',
        },
        {
          id: 'media-2',
          ownerId: 'user-v1',
          ownerType: 'vendor',
          fileUrl: 'https://images.unsplash.com/photo-1516137418202-7deb7f11f440?w=1200',
          fileType: 'image/jpeg',
          fileName: 'converted-barn-reception-hall.jpg',
          fileSize: 198000,
          thumbnailUrl: 'https://images.unsplash.com/photo-1516137418202-7deb7f11f440?w=300',
          altText: 'Converted barn reception hall',
          isPrimary: false,
          createdAt: '2025-02-18T11:00:00Z',
        },
        {
          id: 'media-3',
          ownerId: 'user-v1',
          ownerType: 'vendor',
          fileUrl: 'https://images.unsplash.com/photo-1496430477427-4a6d0e3e1c0c?w=1200',
          fileType: 'image/jpeg',
          fileName: 'botanical-arch-aisle.jpg',
          fileSize: 210000,
          thumbnailUrl: 'https://images.unsplash.com/photo-1496430477427-4a6d0e3e1c0c?w=300',
          altText: 'Botanical floral arch and aisle',
          isPrimary: false,
          createdAt: '2025-05-01T08:00:00Z',
        },
      ];
    }
    if (ownerId === 'user-p1' && ownerType === 'planner') {
      return [
        {
          id: 'media-4',
          ownerId: 'user-p1',
          ownerType: 'planner',
          fileUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200',
          fileType: 'image/jpeg',
          fileName: 'planner-portfolio-01.jpg',
          fileSize: 180000,
          thumbnailUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300',
          altText: 'Destination wedding setup',
          isPrimary: true,
          createdAt: '2025-06-01T09:00:00Z',
        },
      ];
    }
    return [];
  },
};

const mockAnalyticsService = {
  getSummary(ownerId: string, ownerType: 'vendor' | 'planner'): AnalyticsSummary {
    if (ownerId === 'user-v1' && ownerType === 'vendor') {
      return {
        totalRevenue: 68400,
        currency: 'USD',
        activeBookings: 8,
        completedEvents: 76,
        pendingRequests: 12,
        averageRating: 4.9,
        reviewCount: 127,
        conversionRate: 42,
        monthlyTrend: [
          { month: 'Jun', value: 4800 },
          { month: 'Jul', value: 5200 },
          { month: 'Aug', value: 6100 },
          { month: 'Sep', value: 7200 },
          { month: 'Oct', value: 8400 },
          { month: 'Nov', value: 9500 },
        ],
      };
    }
    if (ownerId === 'user-p1' && ownerType === 'planner') {
      return {
        totalRevenue: 124500,
        currency: 'USD',
        activeBookings: 12,
        completedEvents: 34,
        pendingRequests: 3,
        averageRating: 5.0,
        reviewCount: 46,
        conversionRate: 58,
        monthlyTrend: [
          { month: 'Jun', value: 14000 },
          { month: 'Jul', value: 16000 },
          { month: 'Aug', value: 18000 },
          { month: 'Sep', value: 21000 },
          { month: 'Oct', value: 24000 },
          { month: 'Nov', value: 27000 },
        ],
      };
    }
    return {
      totalRevenue: 0,
      currency: 'USD',
      activeBookings: 0,
      completedEvents: 0,
      pendingRequests: 0,
      averageRating: 0,
      reviewCount: 0,
      conversionRate: 0,
      monthlyTrend: [],
    };
  },
};

const mockAdminService = {
  getAllUsers(filters?: { role?: string }): User[] {
    let users = mockUserService.getAllUsers();
    if (filters?.role) {
      users = users.filter((u) => u.role === filters.role);
    }
    return users;
  },

  getAllVendors(): VendorProfile[] {
    return ['user-v1', 'user-v2']
      .map((id) => mockUserService.getVendorProfile(id)!)
      .filter(Boolean);
  },

  getAllCategories(): Category[] {
    return mockMarketplaceService.getCategories();
  },

  getAuditLogs(): AuditEvent[] {
    return [
      {
        id: 'audit-1',
        actorId: 'user-v1',
        actorName: 'Elena Vasquez',
        action: 'UPDATE_PROFILE',
        resourceType: 'vendor_profile',
        resourceId: 'user-v1',
        resourceName: 'Vasquez Events Studio',
        details: 'Updated company description and service areas.',
        ipAddress: '192.168.1.10',
        createdAt: '2026-10-18T14:00:00Z',
      },
      {
        id: 'audit-2',
        actorId: 'user-p1',
        actorName: 'Amara Okechukwu',
        action: 'ASSIGN_EVENT',
        resourceType: 'event',
        resourceId: 'evt-1',
        resourceName: 'Chen Memorial Wedding',
        details: 'Assigned to event by customer request.',
        ipAddress: '192.168.1.15',
        createdAt: '2026-09-20T10:00:00Z',
      },
      {
        id: 'audit-3',
        actorId: 'user-a1',
        actorName: 'Sarah Mitchell',
        action: 'VERIFY_VENDOR',
        resourceType: 'vendor_profile',
        resourceId: 'user-v2',
        resourceName: 'Berg Caterers',
        details: 'Vendor verification approved with documents reviewed.',
        ipAddress: '10.0.0.5',
        createdAt: '2026-10-10T09:00:00Z',
      },
      {
        id: 'audit-4',
        actorId: 'user-v2',
        actorName: 'Thomas Berg',
        action: 'CREATE_QUOTE',
        resourceType: 'quote',
        resourceId: 'quote-2',
        resourceName: 'Chen Memorial Wedding Catering Quote',
        details: 'Created quote version 1 for request req-2.',
        ipAddress: '192.168.1.20',
        createdAt: '2026-10-17T14:00:00Z',
      },
      {
        id: 'audit-5',
        actorId: 'user-a1',
        actorName: 'Sarah Mitchell',
        action: 'UPDATE_PLAN',
        resourceType: 'subscription',
        resourceId: 'sub-v2',
        resourceName: 'Berg Caterers Subscription',
        details: 'Plan upgraded from silver to gold.',
        ipAddress: '10.0.0.5',
        createdAt: '2026-10-05T11:00:00Z',
      },
    ];
  },

  getAuthnTemplates(): string[] {
    return [
      'Welcome email on first booking',
      'Quote follow-up after 7 days',
      'Invoice reminder 3 days before due',
      'Post-event review request',
      'CRM lead follow-up sequence',
      'Subscription expiry warning 30 days before',
      'Portfolio image expiry reminder',
    ];
  },
};

// Mock store exports
const mockDataStore = {
  isInitialized: false,
};

export const mockData = {
  users: mockUserService,
  marketplace: mockMarketplaceService,
  events: mockEventService,
  vendorRequests: mockVendorRequestService,
  quotes: mockQuoteService,
  proposals: mockProposalService,
  shortlists: mockShortlistService,
  bookings: mockBookingService,
  invoices: mockInvoiceService,
  notifications: mockNotificationService,
  teamMembers: mockTeamMemberService,
  crm: mockCRMService,
  media: mockMediaService,
  analytics: mockAnalyticsService,
  admin: mockAdminService,
};
