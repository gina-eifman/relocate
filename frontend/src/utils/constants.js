export const EMAIL_REGEX = "^\\S+@\\S+\\.\\S+$";
export const EXISTING_EMAIL_ERR = "the user with this email already exists";
export const REGISTER_ERR = "an error occurred during user registration";
export const LOGIN_ERR = "an error occurred during user authorization";
export const SERVER_ERR = "there is a problem with the connection or the server is unavailable. wait a bit and try again.";
export const KEY_WORDS_ERR = "search value can't be empty";

export const categories = [
    { name: 'All countries', id: 'all-countries', link: '/search' },
    { name: 'Easy to get citizenship', id: 'easy-citizenship', link: '/search?category=easy-citizenship' },
    { name: 'Warm climate', id: 'warm-climate', link: '/search?category=warm-climate' },
    { name: 'Cheap countries', id: 'cheap', link: '/search?category=cheap' },
    { name: 'High standard of living', id: 'high-standard', link: '/search?category=high-standard' },
    { name: 'Developed infrastructure', id: 'developed-infrastructure', link: '/search?category=developed-infrastructure' },
    { name: 'Safe countries', id: 'safe', link: '/search?category=safe' },
    { name: 'Digital countries', id: 'digital', link: '/search?category=digital' },
    { name: 'Eco-friendly countries', id: 'eco-friendly', link: '/search?category=eco-friendly' },
    { name: 'Mountains & fjords', id: 'mountains', link: '/search?category=mountains' },
    { name: 'Coastal living', id: 'coastal-living', link: '/search?category=coastal-living' }
];
export const ALL_COUNTRIES = [
    {
        id: "norway",
        name: "Norway",
        sections: [
            {
                title: "About the country",
                items: [
                    { header: "General Information", text: "Norway is a country in Northern Europe, located on the western part of the Scandinavian Peninsula. It is a constitutional monarchy with a parliamentary democratic system. The capital of the country is Oslo. The main language is Norwegian, but English is also widely spoken. The population is approximately 5.5 million people (SSB, 2024). The currency is the Norwegian Krone (1$ = 9.64 NOK, 1€ = 11.19 NOK)." },
                    { header: "Climate & Nature", text: "The coast experiences a temperate climate with mild, wet winters thanks to the Gulf Stream. Inland, winters are cold and snowy, while summers can be warm. Northern Norway has Arctic conditions with the Midnight Sun in summer and the Polar Night in winter. Nature is dominated by fjords (a UNESCO World Heritage site), mountains, glaciers, and vast forests." },
                    { header: "Culture & Mentality", text: "Social norms are rooted in 'Janteloven' – an unwritten social code emphasizing collective modesty and not trying to stand out as better than anyone else. Norway has a high level of social trust. This is why services often operate on an honor system. Norwegians also have a deep respect for nature — 'friluftsliv' (open-air living), which is more of a lifestyle than a hobby." }
                ]
            },
            {
                title: "Finances & Housing",
                items: [
                    { header: "Taxes & Income", text: "Norway has a progressive tax system. The more you earn, the higher percentage you pay. You will receive a 'tax card' (skattekort) from the Norwegian Tax Administration (Skatteetaten), which tells your employer how much tax to deduct from your salary. Common deductions include interest on debt, commuting costs, and union fees, which can lower your bill." },
                    { header: "Cost of Living", text: "Yeah, it's high — particularly for goods and services like eating out or alcohol. But salaries are correspondingly high to compensate. A weekly grocery shop for one person can cost between NOK 800 and 1,500, depending on shopping habits, but there're also different discount chains like Kiwi or Coop Extra. A monthly public transport pass in Oslo is around NOK 850-900." },
                    { header: "Housing", text: "The rental market is competitive, especially in major cities. Check out Finn.no for listings. A deposit (usually 3-6 months' rent) is required by law and must be held in a separate, interest-bearing deposit account. Foreign residents can buy property, but you'll need a D-number (temporary ID) or a national identity number and a Norwegian bank account." }
                ]
            },
            {
                title: "Documents",
                items: [
                    { header: "Residence, Settlement & Citizenship", text: "The main authority for immigration is the Norwegian Directorate of Immigration (UDI). A residence permit is required for stays longer than 90 days — common grounds are work, family immigration, studies, or protection regulated by the Immigration Act. Permanent residency can be applied for after 3 years, provided you achieved financial independence and passed a Norwegian language test. Citizenship requires a total of 7 years of residence, a clean criminal record, and passing both the Norwegian language test and the social studies test (Citizenship Act)." },
                    { header: "Work & Business", text: "NAV (The Norwegian Labour and Welfare Administration) provides job listings and services. You can register a sole proprietorship (ENK) or a limited company (AS) through the Brønnøysund Register Centre. For an AS, you'll need a minimum share capital of NOK 30,000." },
                    { header: "Education", text: "Public universities are tuition-free for students from Norway and the EU/EEA. For other students, tuition fees vary by institution. You can apply to have your foreign higher education qualifications recognized by the Norwegian Directorate for Higher Education and Skills (HK-dir)." }
                ]
            },
            {
                title: "Life & Family",
                items: [
                    { header: "Healthcare", text: "Norway has a universal, tax-funded public healthcare system. All legal residents are covered by the National Insurance Scheme (Folketrygden). You register with a general practitioner (GP) — 'fastlege' — in your local municipality. A consultation has a set fee, and there's an annual cap on out-of-pocket expenses (the 'exemption card'). Some people get private insurance for faster access to specialists, but the public system covers the vast majority of needs." },
                    { header: "Family & Marriage", text: "You can marry in Norway through a civil or religious ceremony. The Marriage Act (Ekteskapsloven) regulates the legal framework. Parents are entitled to parental leave — 49 weeks with 100% pay or 59 weeks with 80% pay. A monthly child benefit (kontantstøtte) is paid for children between ages 1 and 2 who don't attend state-subsidized daycare. Kindergartens (barnehager) are heavily subsidized, and all children have the right to a place." },
                    { header: "Laws & Safety", text: "Norway is very safe, with low crime rates and trustworthy police (Politiet). There are: strict laws on drinking and driving, a strong emphasis on animal welfare (Animal Welfare Act), and serious environmental protection rules." }
                ]
            },
            {
                title: "Digital Environment",
                items: [
                    { header: "Digitalization Level", text: "The BankID is your digital key to everything — an electronic ID used by all major Norwegian banks. You need it to access public services (tax, NAV, healthcare), sign contracts, and log into most private services. It's the most important tool for daily life. Also, government agencies communicate via 'Digital Postkasse' (digital mailbox) — think of it as a secure replacement for physical letters." },
                    { header: "Communication & Internet", text: "Internet penetration is near 100%, and speeds are among the highest in the world. The main mobile providers are Telenor, Telia, and Ice — prepaid and subscription plans are widely available." },
                    { header: "Useful Apps", text: "Vipps: The ubiquitous mobile payment app for instant money transfers, paying in stores, and even online shopping. Finn.no: The go-to marketplace for buying and selling everything — from used furniture to cars, and for finding jobs and rental properties. Ruter / Entur: For public transport tickets and route planning (Ruter covers the Oslo area, Entur is national). Skyss / AtB / Troms Billet: Local transport apps for Bergen, Trondheim, Tromsø." }
                ]
            }
        ],
        backgroundImage: "/images/bg_norway.jpg",
        icon: "/images/icon_norway.png", 
        shortDescription: "High living standards, deep social trust, and a culture built on the love of outdoor life. It's a heaven for those seeking balance.",
        flag: "🇳🇴",
        categories: ["high-standard", "digital", "eco-friendly", "safe", "mountains", "coastal-living"],
        keywords: ["скандинавия", "фьорды", "викинги", "полярное сияние", "oslo", "bergen", "oil", "fjords", "viking", "northern lights"],
        continent: "europe",
        region: "scandinavia",
        climate: "cold",
        costOfLiving: "high",
        safety: 5,
        digitalization: 5
    },
    {
        id: "sweden",
        name: "Sweden",
        sections: [
            {
                title: "About the country",
                items: [
                    { header: "General Information", text: "Sweden is a Nordic country, located on the Scandinavian Peninsula. It is a constitutional monarchy with a parliamentary democracy. The capital is Stockholm. The official language is Swedish, but English is widely spoken. The population is approximately 10.5 million people. The currency is the Swedish Krona (1$ = 10.5 SEK, 1€ = 11.3 SEK)." },
                    { header: "Climate & Nature", text: "The south of Sweden has an oceanic climate with mild winters and cool summers. The north experiences subarctic conditions with long winters and short, warm summers. Nature is dominated by vast forests, lakes, and an archipelago coastline. The 'Allemansrätten' is a constitutional right allowing everyone to roam in nature, pick berries and mushrooms, as long as they show respect for the environment." },
                    { header: "Culture & Mentality", text: "Swedish culture is built on 'Law of Jante' (Jantelagen) that discourages individual boasting. Lagom is a core concept: 'not too little, not too much, just the right amount'. Swedes value punctuality, personal space, and work-life balance. The society is highly secular but with strong Christian heritage influences." }
                ]
            },
            {
                title: "Finances & Housing",
                items: [
                    { header: "Taxes & Income", text: "Income tax is split between municipal tax (around 32%) and, for higher incomes, national tax (around 20%). The total marginal tax rate can reach up to 52–55% for high earners. For foreign residents with limited tax liability, a special tax (SINK) applies: 22.5% from 2026 dropping further to 20% from 2027." },
                    { header: "Cost of Living", text: "The cost of living is high, especially in Stockholm, Gothenburg, and Malmö. Food prices are above EU average, and eating out is expensive. However, salaries are correspondingly high. Discount grocery chains like Willys, Lidl, and Coop are the most affordable. A monthly food budget for one person is around 3,000–4,000 SEK." },
                    { header: "Housing", text: "Rental apartments often have waiting lists of several years. A one-bedroom apartment in Stockholm costs between 12,000–18,000 SEK per month; in suburbs or smaller cities, it can be 7,000–11,000 SEK. According to Statistics Sweden (SCB), the median annual housing cost for all households was about 96,000 SEK. Tenant-owned dwellings are common — you buy the right to live in the apartment and pay a monthly fee to the association." }
                ]
            },
            {
                title: "Documents",
                items: [
                    { header: "Residence, Settlement & Citizenship", text: "For stays over 90 days, non-EU citizens need a residence permit (uppehållstillstånd). Common grounds are work, study, family ties, or self-employment. Applications are handled by the Swedish Migration Agency. Permanent Residence can be applied for after 5 years of continuous residence, with requirements including stable income and no serious criminal record. Citizenship requires 8 years of residence, knowledge of Swedish, taking the society test, clean criminal record and self-sufficiency." },
                    { header: "Work & Business", text: "The Swedish Public Employment Service (Arbetsförmedlingen) provides job listings. A 'kollektivavtal' (collective agreement) covers most workplaces, setting minimum wages and conditions. You can register a sole proprietorship or a limited company (Aktiebolag — AB) through the Swedish Companies Registration Office (Bolagsverket). For an AB, the minimum share capital is 25,000 SEK." },
                    { header: "Education", text: "Tuition is free for EU/EEA citizens. For others, tuition fees apply (typically 80,000–200,000 SEK per year). Foreign qualifications can be assessed by the Swedish Council for Higher Education (UHR) for equivalence." }
                ]
            },
            {
                title: "Life & Family",
                items: [
                    { header: "Healthcare", text: "All legal residents with a personal identity number (personnummer) have access to heavily subsidized healthcare. Patient fees are capped: there is a high-cost protection (högkostnadsskydd) limiting out-of-pocket expenses for doctor visits and medication to around 1,300 SEK per year. Dental care for children and young adults is free." },
                    { header: "Family & Marriage", text: "Sweden is famous for its family-friendly policies. Parental leave (föräldraledighet) is 480 days per child, with 90 days reserved for each parent. Benefits are paid at around 80% of income for the first 390 days. Child allowance (barnbidrag) is paid monthly until the child turns 16. Preschool (förskola) is subsidized with fees capped based on household income. Marriage is regulated by the Marriage Code; civil and religious ceremonies are recognized." },
                    { header: "Laws & Safety", text: "Sweden is one of the safest countries in the world with low crime rates. The police are accessible and trustworthy. Important laws include alcohol regulation — the only retail store allowed to sell alcohol with more than 3.5% ABV. The principle of public access to official records means most government documents are accessible to anyone." }
                ]
            },
            {
                title: "Digital Environment",
                items: [
                    { header: "Digitalization Level", text: "The BankID is the cornerstone of digital life — an electronic identification system used by banks, government agencies, healthcare, and countless private services. You need it for everything from logging into your bank to accessing your medical records. The Swedish e-identification Board oversees the system." },
                    { header: "Communication & Internet", text: "Internet penetration is near 100%, with widespread fiber and 5G coverage. Mobile operators include Telia, Tele2, Telenor, and Tre (3). Public Wi-Fi is widely available." },
                    { header: "Useful Apps", text: "BankID / Freja eID: For digital identification and signing documents. Swish: The dominant mobile payment app for instant money transfers between individuals, paying in stores, and even online shopping. Used by over 8 million Swedes. 1177 Vårdguiden: The national healthcare guide app — book doctor appointments, access medical records, get medical advice. SL / Västtrafik: Local public transport apps for Stockholm, Gothenburg, and Skåne region. Kivra / Min myndighetspost: Digital mailboxes for receiving official mail from government agencies and bills from companies (secure alternative to physical letters). Blocket / Tradera: The leading marketplaces for buying and selling second-hand goods." }
                ]
            }
        ],
        backgroundImage: "/images/bg_sweden.jpg",
        icon: "/images/icon_sweden.png", 
        shortDescription: "Built on equality and focus on work‑life balance make it a top destination for tech professionals and families alike.",
        flag: "🇸🇪",
        categories: ["high-standard", "digital", "eco-friendly", "safe", "coastal-living"],
        keywords: ["скандинавия", "стокгольм", "абба", "икеа", "шведский стол", "volvo", "stockholm", "ikea", "abba", "göteborg", "malmö"],
        continent: "europe",
        region: "scandinavia",
        climate: "cold",
        costOfLiving: "high",
        safety: 5,
        digitalization: 5
    },
    {
        id: "czech-republic",
        name: "Czech",
        sections: [
            {
                title: "About the country",
                items: [
                    { header: "General Information", text: "The Czech Republic is located in Central Europe, bordered by Germany, Austria, Slovakia, and Poland. It is a parliamentary republic. The capital and largest city is Prague and the official language is Czech. The population is approximately 10.7 million people. The currency is the Czech Koruna (1$ = 23 CZK, 1€ = 25 CZK). The country is divided into three historical lands: Bohemia, Moravia, and Czech Silesia." },
                    { header: "Climate & Nature", text: "The climate is temperate, transitional between oceanic and continental. Winters are relatively mild with occasional snow; summers are warm. The country is mostly hilly, surrounded by low mountains along the borders and covered by forests. Nature is protected in national parks like Krkonoše and Šumava." },
                    { header: "Culture & Mentality", text: "Czechs are often described as reserved in initial communication, but they value personal space. They are pragmatic and are known for their love of leisure time — especially 'chataření' (spending weekends at cottages). The culture has a strong beer tradition: Czechs are the world's biggest beer consumers per capita. Culturally, there's a difference between Bohemia (more focused on Prague and beer) and Moravia (more folk traditions, wine region)." }
                ]
            },
            {
                title: "Finances & Housing",
                items: [
                    { header: "Taxes & Income", text: "The Czech tax system is straightforward. Income tax is a flat 15% for employees (up to a certain threshold, after which it increases to 23%). Social and health insurance are mandatory: employees pay 6.5% and 4.5%. The minimum monthly wage in 2025 is around 20,800 CZK. Average monthly salaries in Prague are around 50,000–60,000 CZK gross, while in other regions they are lower." },
                    { header: "Cost of Living", text: "Compared to Western Europe, the cost of living is affordable, but prices have been rising. A monthly budget for a single person in Prague (excluding rent) is around 8,000–12,000 CZK for food, transport, and leisure. Discount grocery chains like Lidl and Penny are widespread." },
                    { header: "Housing", text: "The rental market is competitive, especially in Prague and Brno. A one-bedroom apartment in Prague city center costs between 18,000–25,000 CZK per month; in suburbs or other cities, it can be 12,000–18,000 CZK. A deposit (usually 1-2 months' rent) is standard. Rental contracts are strictly regulated by the Civil Code. Finding an apartment without a Czech credit history can be challenging, but possible with an employer's guarantee." }
                ]
            },
            {
                title: "Documents",
                items: [
                    { header: "Residence, Settlement & Citizenship", text: "For stays over 90 days, non-EU citizens need a long-term visa or residence permit. Common grounds are employment, business, study, or family reunification. The application is submitted to the Czech embassy. Permanent Residence can be applied for after 5 years of continuous temporary residence. Requirements include passing a Czech language exam at level A2 and proving stable income. Citizenship available after at least 5 years of permanent residence (or 10 years of total residence). Requires a B1 level Czech exam, a clean criminal record, and proof of integration." },
                    { header: "Work & Business", text: "The best opportunities for working are in IT, engineering, and skilled trades. Websites like Jobs.cz and Expats.cz can help you. A trade license (živnostenský list) is required for freelancers and sole traders. For highly qualified workers, there's Blue Card offering a faster path to residence." },
                    { header: "Education", text: "Tuition-free for students studying in Czech, even for foreigners. English-language programs charge tuition fees (typically 5,000–15,000 EUR per year). Foreign diplomas must undergo 'nostrification' (recognition by a Czech university)." }
                ]
            },
            {
                title: "Life & Family",
                items: [
                    { header: "Healthcare", text: "All employed residents are covered by a public health insurance company (zdravotní pojišťovna). The system is funded by mandatory contributions (4.5% of gross salary). For the self-employed, minimum monthly contributions are set by law (around 3,143 CZK in 2025). Private insurance is mandatory for non-working residents. The quality of care is high, especially in cardiology, oncology, and ophthalmology." },
                    { header: "Family & Marriage", text: "Marriage is governed by the Civil Code. Foreigners can marry in the Czech Republic at the registry office (matrika). Family reunification is a legal right for spouses and minor children of residents. Parental leave is generous, lasting up to four years with state support (parental allowance). Kindergartens (školka) are state-subsidized, but places can be limited in big cities." },
                    { header: "Laws & Safety", text: "The Czech Republic is one of the safest countries in Europe with low crime rates. The police are generally helpful. Important laws for residents include strict regulations on residency reporting (changes must be reported to the Foreign Police within 3 working days). The rule of law is strong, and property rights are protected." }
                ]
            },
            {
                title: "Digital Environment",
                items: [
                    { header: "Digitalization Level", text: "The key tool is the 'Portál občana' (Citizen's Portal) — a government portal allowing citizens to handle hundreds of official tasks online, from checking criminal records to changing car ownership. Over 1.5 million people use it. Another important tool is the 'eDoklady' app, which allows you to prove your identity with your phone (accepted at many government offices). A major cybersecurity initiative is the migration of all official government websites to the trusted gov.cz domain." },
                    { header: "Communication & Internet", text: "Internet penetration is high, with widespread fiber and 5G coverage in cities. Mobile operators include O2, T-Mobile, and Vodafone." },
                    { header: "Useful Apps", text: "Portál občana / eDoklady: Essential for digital interaction with the state. PID Lítačka / Seznam Mapy: For public transport tickets and navigation in Prague and the Central Bohemian region. IDOS / České dráhy: The national timetable app for trains and buses. Revolut / Air Bank: Popular for banking, especially among expats. Mapy.cz: A highly detailed and accurate local alternative to Google Maps." }
                ]
            }
        ],
        backgroundImage: "/images/bg_czech.jpg",
        icon: "/images/icon_czech.png", 
        shortDescription: "Prague architecture meets the pragmatic beer-loving culture. Accessible to Western Europe, with strong traditions.",
        flag: "🇨🇿",
        categories: ["cheap", "beautiful-nature", "safe", "mountains"],
        keywords: ["чехия", "прага", "пиво", "карловы вары", "богемия", "prague", "beer", "bohemia", "karlovy vary", "cesky krumlov"],
        continent: "europe",
        region: "central-europe",
        climate: "temperate",
        costOfLiving: "medium",
        safety: 4,
        digitalization: 3
    },
    {
        id: "germany",
        name: "Germany",
        sections: [
            {
                title: "About the country",
                items: [
                    { header: "General Information", text: "Germany is a federal parliamentary republic in Central Europe, bordered by nine countries. The capital is Berlin. The official language is German, though English is widely used in business and tech sectors. The population is approximately 84 million. The currency is the Euro (1€ = $1.08). Germany is known for its strong economy, rich cultural heritage, and commitment to environmental sustainability." },
                    { header: "Climate & Nature", text: "The climate is temperate seasonal, with cold winters and mild to warm summers. The north has cooler summers and milder winters, while the south has a more continental climate with hotter summers and snowier winters. Nature ranges from the North Sea coast to the Black Forest and the Bavarian Alps. About one-third of the country is forested." },
                    { header: "Culture & Mentality", text: "German culture values punctuality, directness, and efficiency. Ordnung (order) is a core concept — things are done according to rules. Privacy is respected, and relationships are built on trust and reliability. The country has a rich art heritage. Environmental awareness is deeply ingrained, with widespread recycling and support for green energy." }
                ]
            },
            {
                title: "Finances & Housing",
                items: [
                    { header: "Taxes & Income", text: "Germany has a progressive income tax system, with rates starting around 14% and reaching up to 45% for high earners. Solidarity surcharge (5.5% of tax) applies to high earners. Church tax (8-9% of tax) is deducted if you're registered as a member. Social security contributions (pension, health, unemployment, care insurance) are significant — roughly 20% of gross salary, shared equally between employee and employer. Average gross annual salary is around €50,000–55,000." },
                    { header: "Cost of Living", text: "Living costs are moderate by Western European standards. Monthly expenses for a single person (excluding rent) are around €800–1,200. Food is affordable, with discount supermarkets like Aldi and Lidl everywhere. Eating out and dining are more expensive." },
                    { header: "Housing", text: "The rental market is competitive, especially in Berlin, Munich, Hamburg, and Frankfurt. A one-bedroom apartment in a city center ranges from €900–1,800 depending on the city. Rental contracts are tenant-friendly, with strong legal protections. Buying property requires significant savings, as mortgages typically cover only 80–90% of the purchase price." }
                ]
            },
            {
                title: "Documents",
                items: [
                    { header: "Residence, Settlement & Citizenship", text: "Germany has reformed its immigration system. The EU Blue Card has lower salary thresholds. The Opportunity Card (Chancenkarte) is a points-based system allowing job seekers to enter for up to one year without a job offer. Skilled workers can get a residence permit for four years. Citizenship is possible after five years (three with special integration) and requires passing a language test (B1), a citizenship test, proof of income and clear criminal record." },
                    { header: "Work & Business", text: "Germany urgently needs skilled workers in IT, engineering, healthcare, and trades. Foreign qualifications can be recognized more easily thanks to 'Recognition Act', with partial recognition often sufficient for work permits. To start a business, you need a trade license (Gewerbeanmeldung). Freelancers (Freiberufler) have simpler registration but must prove their profession is on the 'liberal professions' list." },
                    { header: "Education", text: "Public universities charge no tuition fees for bachelor's programs, even for non-EU students (only a semester fee of €150-400). Master's programs may have fees. Germany has world-class universities like LMU Munich, Heidelberg, and the technical universities (TU9)." }
                ]
            },
            {
                title: "Life & Family",
                items: [
                    { header: "Healthcare", text: "All residents have health insurance. Most employees with an income below a certain threshold are eligible for public health insurance (gesetzliche Krankenversicherung), which provides comprehensive coverage. Private insurance is an option for freelancers, self-employed individuals, and high-earning employees." },
                    { header: "Family & Marriage", text: "Marriage and partnership laws are governed by the Civil Code. Family life is supported by generous state policies. 'Kindergeld' (child benefit) is paid monthly for every child until reaching their adulthood or finishing their education. Parents are entitled to 'Elternzeit' (parental leave) and 'Elterngeld' (parental allowance) provides financial support during this time." },
                    { header: "Laws & Safety", text: "Germany is a very safe country with low crime rates. The police (Polizei) are generally helpful and trustworthy. A key legal requirement is 'Anmeldung' — every resident must register their address at the local 'Bürgeramt' (citizen's office) within two weeks of moving in. This gives you a tax ID and is needed to open a bank account, get health insurance, and access most public services." }
                ]
            },
            {
                title: "Digital Environment",
                items: [
                    { header: "Digitalization Level", text: "Germany is a highly digitized society, though the pace of digital transformation in public services can vary by region. The digital identification landscape is built on secure systems, and online services are expanding rapidly." },
                    { header: "Communication & Internet", text: "Internet and mobile coverage with widespread 5G in cities and fiber optic connections becoming the standard. Common mobile providers include Telekom, Vodafone, and O2." },
                    { header: "Useful Apps", text: "Elster: The official government portal for filing your taxes online — essential for freelancers and employees alike. xpats App: A guide for foreigners, offers info on universities, job listings, visa processes and connecting with the expat community. DB Navigator (Deutsche Bahn): The app for all national and local train travel, including buying tickets and checking schedules. Deutschlandticket Apps: Apps from local transport associations (like BVG in Berlin or MVV in Munich) or from providers like DB, where you can manage your digital Deutschlandticket. NINA / Katwarn: Official warning apps that send push notifications for severe weather, fire, or other local emergencies." }
                ]
            }
        ],
        backgroundImage: "/images/bg_germany.jpg",
        icon: "/images/icon_germany.png", 
        shortDescription: "Economic powerhouse with high efficiency and engineering excellence. Strong social system and vibrant IT sector.",
        flag: "🇩🇪",
        categories: ["high-standard", "developed-infrastructure", "digital", "safe", "mountains"],
        keywords: ["германия", "берлин", "мюнхен", "автобан", "бундеслига", "bmw", "mercedes", "berlin", "munich", "frankfurt", "hamburg", "autobahn", "bundesliga"],
        continent: "europe",
        region: "central-europe",
        climate: "temperate",
        costOfLiving: "medium",
        safety: 4,
        digitalization: 4
    },
    {
        id: "spain",
        name: "Spain",
        sections: [
            {
                title: "About the country",
                items: [
                    { header: "General Information", text: "Spain is a parliamentary monarchy in Southwestern Europe. It shares borders with Portugal, France and Andorra. The capital is Madrid. The official state language is Spanish (Castellano), with co-official languages like Catalan, Galician and Basque. The population is over 48 million people. The currency is the Euro (1$ ≈ 0.92 EUR)." },
                    { header: "Climate & Nature", text: "Spain's climate is one of the most diverse in Europe, ranging from the lush, rainy green of the Atlantic north (Green Spain) to the arid heat of the interior and the mild, sunny winters of the Mediterranean coast. This diversity shapes its nature, from the snow-capped peaks to the vast plains and the volcanic landscapes." },
                    { header: "Culture & Mentality", text: "Spanish people emphasise on social connection and late-night life. The concept of 'sobremesa' — the time spent lingering at the table chatting after a meal — captures this perfectly. Family and friendship ties are incredibly strong. While passionate and expressive, Spaniards also value directness and personal connection in their interactions. The pace of life is famously more relaxed, with the siesta being a traditional afternoon rest." }
                ]
            },
            {
                title: "Finances & Housing",
                items: [
                    { header: "Taxes & Income", text: "Residents are taxed on their worldwide income, while non-residents pay tax only on Spanish-sourced income. Income tax is progressive, 19-47%, varying by region. For digital nomads is a special tax regime of 24% on earnings up to €600,000 for the first years of residency. Spain's minimum wage is set to increase in 2026 to an estimated €1,446.66 gross per month. Average annual salary is €28,000–30,000." },
                    { header: "Cost of Living", text: "The cost of living is lower than in many other Western European countries, though it has been rising in major cities. Monthly expenses for a single person are €600–900. Groceries are reasonably priced, especially at local markets (mercados) and discount chains like Mercadona, Lidl, and Aldi. Eating out remains an affordable pleasure compared to Northern Europe." },
                    { header: "Housing", text: "Renting is the most common option for newcomers. A one-bedroom apartment in a city center can range from €1,100–1,500 in Madrid or Barcelona, to significantly less (€500–800) in smaller cities like Valencia or Málaga. Rental contracts are governed by the Ley de Arrendamientos Urbanos (LAU), typically requiring a deposit of one or two months' rent." }
                ]
            },
            {
                title: "Documents",
                items: [
                    { header: "Residence, Settlement & Citizenship", text: "Spain offers multiple pathways: EU Blue Card, Highly Qualified Professional permit, Digital Nomad Visa (for remote workers), the Non-Lucrative Visa (for retirees) and entrepreneur permits. A special regularization for migrants in Spain since before December 31, 2025, allows one-year work permits (applications April-June 2026). Permanent residence is available after five years of legal residence. Citizenship after ten years (two years for Ibero-American countries). It requires language and culture tests (CCSE and DELE A2)." },
                    { header: "Work & Business", text: "Spain urgently needs IT, engineering, healthcare, and audiovisual professionals. To freelance, you need 'alta en Hacienda' (tax registration) and 'alta en la Seguridad Social' (social security). The 'autónomo' (self-employed) regime has a flat monthly fee for the first year." },
                    { header: "Education", text: "Public education is free and compulsory from 6-16. International schools are also widely available. Spain has top business schools (IESE, IE, ESADE) and public universities like Complutense (Madrid) and Universitat de Barcelona, where tuition fee is around €1,000-2,000 per year. Foreign qualifications can be assessed for equivalence." }
                ]
            },
            {
                title: "Life & Family",
                items: [
                    { header: "Healthcare", text: "Spain has a universal public healthcare system (SNS). All residents who contribute to social security, including salaried employees and pensioners, have access to free healthcare. The system is decentralized, managed by regions. Quality is high, ranked among the best in the world. Digital nomad visa holders are required to have private health. Private insurance is common and relatively affordable (€50-150/month)." },
                    { header: "Family & Marriage", text: "Marriage and registered partnerships are legally recognized, and the rights of families are strongly protected. Family is the cornerstone of Spanish society. The country offers 'bajas' (leaves) for new parents (16 weeks for both parents, paid at 100% of salary). Child benefit is available for low-income families. Same-sex marriage has been legal since 2005. 'Empadronamiento' (municipal registration) is required for all residents and opens access to local services." },
                    { header: "Laws & Safety", text: "Spain is generally very safe. Important: strict ID laws — you must carry ID (NIE/TIE or passport) at all times. Alcohol drinking in public (botellón) is banned in most cities. Smoking is banned in enclosed public spaces." }
                ]
            },
            {
                title: "Digital Environment",
                items: [
                    { header: "Digitalization Level", text: "Spain has a real progress in digitalization, especially in public administration, though processes can still sometimes require in-person visits. The prior appointment system is standard for most official procedures." },
                    { header: "Communication & Internet", text: "Mobile and internet infrastructure with widespread 4G and expanding 5G coverage. Major mobile operators include Movistar, Vodafone, and Orange." },
                    { header: "Useful Apps", text: "Mi Carpeta Ciudadana: A central government app for accessing your personal data, checking the status of applications, and communicating with public administrations. Move to Spain — Relocation & Living Guide: A personal companion, offering interactive checklists for documents, a cost-of-living calculator, and guidance on getting your NIE/TIE, empadronamiento, and healthcare. Renfe Ticket / Cercanías: The official apps for national and local train travel, essential for getting around. Cabify / Free Now: Popular ride-hailing apps, alongside Uber. Bizum: Mobile payment, the standard for instant transfers between individuals." }
                ]
            }
        ],
        backgroundImage: "/images/bg_spain.jpg",
        icon: "/images/icon_spain.png", 
        shortDescription: "Sun, passion, and relaxed Mediterranean lifestyle. Perfect for digital nomads and those seeking warm climate.",
        flag: "🇪🇸",
        categories: ["warm-climate", "cheap", "coastal-living", "beautiful-nature"],
        keywords: ["испания", "барселона", "мадрид", "сиеста", "паэлья", "коррида", "barcelona", "madrid", "seville", "valencia", "paella", "siesta", "mediterranean", "tapas", "flamenco"],
        continent: "europe",
        region: "southern-europe",
        climate: "warm",
        costOfLiving: "medium",
        safety: 4,
        digitalization: 3
    }
];