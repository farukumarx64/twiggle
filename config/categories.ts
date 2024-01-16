type CategoriesType = {
  [key: string]: {
    id: string;
    icon: string;
    category: string;
    values: string[];
    color: string;
  };
}

export const categories: CategoriesType = {
  Tech: {
    id: "tech",
    icon: "ri-computer-line",
    category: "Tech",
    values: [
      "Edutech",
      "Fintech",
      "Hardware",
      "Mobile App",
      "Web",
      "SaaS",
      "Social Media",
    ],
    color: "FFAC81",
  },
  "Influencer & Digital Creator": {
    id: "influencer",
    icon: "ri-palette-line",
    category: "Influencer & Digital Creator",
    values: [
      "Crafts",
      "Designer",
      "Model",
      "Visual Arts",
      "Writer",
      "Fashion & Beauty",
      "Lifestyle",
      "Other",
    ],
    color: "EFE9AE",
  },
  Business: {
    id: "business",
    icon: "ri-file-text-line",
    category: "Business",
    values: [
      "Agency & Consulting",
      "Automobiles",
      "Crafts",
      "Financial Services",
      "Home Improvement & Maintenance",
      "HR & Recruiting",
      "Legal Services",
      "Marketing & Advertising",
      "Public Relations",
      "Real Estate",
      "Recreation",
      "Shopping & Retail",
      "Startup",
      "Venture Capital",
      "Weddings",
    ],
    color: "CDEAC0",
  },
  Education: {
    id: "education",
    icon: "ri-pencil-line",
    category: "Education",
    values: [
      "Campus Organizations",
      "Schools & Universities",
      "Teacher",
      "E-Learning",
    ],
    color: "FEC3A6",
  },
  Entertainment: {
    id: "entertainment",
    icon: "ri-movie-line",
    category: "Entertainment",
    values: [
      "Actor",
      "Comedy",
      "Dance & Theatre",
      "Film & TV",
      "Gaming & Esports",
      "Live Events",
      "Music",
      "Performance & Art",
      "Publications & Digital Media",
      "Radio & Podcasts",
      "Sports",
      "Talent Agency",
      "Talent Management",
    ],
    color: "8EF9F3",
  },
  "Food & Beverage": {
    id: "food",
    icon: "ri-cake-3-line",
    category: "Food & Beverage",
    values: [
      "Restaurants",
      "Chef",
      "Coffee & Tea",
      "Desserts",
      "Groceries",
      "Home Cooking",
    ],
    color: "FFD9CE",
  },
  "Travel & Tourism": {
    id: "travel",
    icon: "ri-plane-line",
    category: "Travel & Tourism",
    values: ["Attractions", "Hotels & Lodging", "Transportation"],
    color: "9E4770",
  },
  "Health & Wellness": {
    id: "health",
    icon: "ri-heart-pulse-line",
    category: "Health & Wellness",
    values: ["Fitness", "Life Coaching", "Healthcare", "Nutrition", "Doctor"],
    color: "C191A1",
  },
  "Non-Profit": {
    id: "non-profit",
    icon: "ri-hand-heart-line",
    category: "Non-Profit",
    values: [
      "Climate",
      "Community Organization",
      "Disaster Relief",
      "Diversity & Inclusion",
      "Museums",
      "Wildlife",
    ],
    color: "F4D06F",
  },
  "Fashion & Beauty": {
    id: "fashion",
    icon: "ri-magic-line",
    category: "Fashion & Beauty",
    values: [
      "Clothing & Accessories",
      "Fragrances",
      "Hair Care",
      "Jewelry",
      "Makeup & Skincare",
      "Nail Care",
      "Shoes",
    ],
    color: "9DD9D2",
  },
  "Government & Politics": {
    id: "government",
    icon: "ri-scales-3-fill",
    category: "Government & Politics",
    values: [
      "Activism",
      "Countries & Municipalities",
      "Emergency Services",
      "Judiciary",
      "Law Enforcement",
      "Library",
      "Military",
      "Policy",
      "Politicians & Campaigns",
      "Public Services",
    ],
    color: "D9DD92",
  },
  Other: {
    id: "other",
    icon: "ri-function-line",
    category: "Other",
    values: [
      "Contest & Giveaways",
      "Crowdfunding",
      "Electronic Press Kit",
      "Fan Club",
      "Memes",
      "Personal",
      "Pets",
      "Portfolio",
      "Public Figure",
      "Not Listed",
    ],
    color: "EAB464",
  },
};
/*<div className="flex gap-2 flex-wrap">
                      <Button
                        startContent={
                          <i className="ri-computer-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Tech"
                        size="sm"
                        radius="full"
                        id="tech"
                        className="!w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('tech')}}
                      >
                        Tech
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-palette-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Influencer & Digital Creator"
                        size="sm"
                        radius="full"
                        id="influencer"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('influencer')}}
                      >
                        Influencer & Digital Creator
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-file-text-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Business"
                        size="sm"
                        radius="full"
                        id="business"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('business')}}
                      >
                        Business
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-pencil-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Education"
                        size="sm"
                        radius="full"
                        id="education"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('education')}}
                      >
                        Education
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-movie-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Entertainment"
                        size="sm"
                        radius="full"
                        id="entertainment"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('entertainment')}}
                      >
                        Entertainment
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-cake-3-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Food & Beverage"
                        size="sm"
                        radius="full"
                        id="food"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('food')}}
                      >
                        Food & Beverage
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-plane-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Travel & Tourism"
                        size="sm"
                        radius="full"
                        id="travel"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('travel')}}
                      >
                        Travel & Tourism
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-heart-pulse-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Health & Wellness"
                        size="sm"
                        radius="full"
                        id="health"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('health')}}
                      >
                        Health & Wellness
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-hand-heart-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Non-Profit"
                        size="sm"
                        radius="full"
                        id="non-Profit"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('non-Profit')}}
                      >
                        Non-Profit
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-magic-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Fashion & Beauty"
                        size="sm"
                        radius="full"
                        id="fashion"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('fashion')}}
                      >
                        Fashion & Beauty
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-scales-3-fill !text-xl"></i>
                        }
                        variant="bordered"
                        value="Government"
                        size="sm"
                        radius="full"
                        id="government"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('government')}}
                      >
                        Government
                      </Button>
                      <Button
                        startContent={
                          <i className="ri-function-line !text-xl"></i>
                        }
                        variant="bordered"
                        value="Other"
                        size="sm"
                        radius="full"
                        id="other"
                        className="w-auto px-4 py-1 box-content"
                        onPress={()=> {handleCategoryChange('other')}}
                      >
                        Other
                      </Button>
                    </div> */
