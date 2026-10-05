export const schedule = [
  {
    time: "5:30 PM",
    title: "Cocktail Reception",
    description: "Ease into the night with welcome drinks and light bites",
    mobileLines: ["Ease into the night with", "welcome drinks and light bites"],
  },
  {
    time: "7:00 PM",
    title: "Dinner Banquet",
    description: "Share loving moments with us over dinner",
    mobileLines: ["Share loving moments with us over dinner"],
  },
  {
    time: "10:30 PM",
    title: "After Party",
    description: "Celebrations continue with late night snacks, drinks, and music!",
    mobileLines: ["Celebrations continue with late", "night snacks, drinks, and music!"],
  },
] as const;

export const venues = [
  {
    name: "The Henderson",
    room: "Cloud 39",
    event: "Reception & Banquet",
    mobileEvent: "Reception & Banquet",
    address: "39/F, The Henderson, 2 Murray Road, Central",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=The+Henderson+2+Murray+Road+Central+Hong+Kong",
  },
  {
    name: "Soho House",
    room: "Pool Room",
    event: "After Party",
    mobileEvent: "After Party",
    address: "30th, 33 Des Voeux Road West, Sheung Wan",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Soho+House+Hong+Kong+33+Des+Voeux+Road+West",
  },
] as const;
