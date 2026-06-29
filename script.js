// ============================================================
// Translation Data
// ============================================================
const translations = {
    ar: {
        topPromo: "منتجات أصلية 100% | خامات أصلية وثبات عالي",
        navHome: "الرئيسية",
        navPerfumes: "العطور",
        navOud: "العود",
        navWatches: "ساعات",
        navOffers: "العروض",
        navContact: "تواصل معنا",
        heroTitle: "فخامة تستحقها <br> في كل رشة",
        heroDesc: "اكتشف أرقى أنواع العطور العالمية الأصلية، جودة مضمونة وتغليف يليق بك.",
        shopNow: "تسوق الآن",
        discoverMore: "اكتشف العروض",
        newArrivals: "منتجاتنا",
        promoSeason: "عروض حصرية",
        promoTitle: "خصم يصل إلى 30%",
        promoDesc: "لا تفوت الفرصة، العرض ساري لفترة محدودة على مجموعات مختارة.",
        getOffer: "استمتع بالعرض",
        trustShip: "توصيل سريع",
        trustShipDesc: "نوصل لجميع محافظات مصر خلال 2-5 أيام عمل",
        trustQual: "جودة مضمونة",
        trustQualDesc: "جميع منتجاتنا أصلية 100% مع ضمان الاسترداد",
        trustSupp: "خدمة عملاء",
        trustSuppDesc: "فريقنا متاح على مدار الساعة للرد على استفساراتك",
        footerAbout: "وجهتك الأولى للعطور العالمية الأصلية في مصر. نقدم أرقى الماركات العالمية بأسعار تنافسية مع ضمان الأصالة.",
        footerLinks: "روابط سريعة",
        linkAbout: "من نحن",
        footerCopy: "&copy; 2026 F&S Fragrances. جميع الحقوق محفوظة.",
        cartTitle: "سلة التسوق",
        emptyCart: "سلتك فارغة — ابدأ التسوق الآن!",
        total: "الإجمالي:",
        checkout: "إتمام الطلب",
        addCartBtn: "أضف للسلة"
    },
    en: {
        topPromo: "100% Original Products | Premium Quality & High Stability",
        navHome: "Home",
        navPerfumes: "Perfumes",
        navOud: "Oud",
        navWatches: "Watches",
        navOffers: "Offers",
        navContact: "Contact",
        heroTitle: "Luxury You Deserve <br> in Every Spray",
        heroDesc: "Discover the world's finest original fragrances. Guaranteed quality with royal packaging.",
        shopNow: "Shop Now",
        discoverMore: "Discover Offers",
        newArrivals: "Our Products",
        promoSeason: "Exclusive Offers",
        promoTitle: "Up to 30% Off",
        promoDesc: "Don't miss the chance. Limited time offer on selected collections.",
        getOffer: "Enjoy Offer",
        trustShip: "Fast Delivery",
        trustShipDesc: "We deliver to all Egyptian governorates within 2-5 business days",
        trustQual: "Guaranteed Quality",
        trustQualDesc: "All our products are 100% original with money-back guarantee",
        trustSupp: "Customer Service",
        trustSuppDesc: "Our team is available 24/7 to answer your inquiries",
        footerAbout: "Your first destination for original international fragrances in Egypt. We offer the finest global brands at competitive prices.",
        footerLinks: "Quick Links",
        linkAbout: "About Us",
        footerCopy: "&copy; 2026 F&S Fragrances. All rights reserved.",
        cartTitle: "Shopping Cart",
        emptyCart: "Your cart is empty — Start shopping now!",
        total: "Total:",
        checkout: "Checkout",
        addCartBtn: "ADD TO CART"
    }
};

// ============================================================
// Products Data
// ============================================================
const products = [
    {
        id: 46,
        title_ar: "ألين - Alien (Thierry Mugler)",
        title_en: "Alien - Thierry Mugler",
        vendor: "F&S Fragrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/1.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر غامض وجذاب يجمع بين سحر الياسمين الأبيض ودفء العنبر والمسك، لإطلالة أنثوية فريدة.",
        desc_en: "A mysterious and attractive fragrance combining white jasmine with warm amber and musk for a unique feminine look.",
        notes_ar: { top: "ياسمين", mid: "عنبر", base: "مسك" },
        notes_en: { top: "Jasmine", mid: "Amber", base: "Musk" }
    },
    {
        id: 47,
        title_ar: "ميدنايت روز - Midnight Rose (Lancôme)",
        title_en: "Midnight Rose - Lancôme",
        vendor: "F&S Fragrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/2.jpeg",
        badge_ar: "مميز",
        badge_en: "SPECIAL",
        desc_ar: "عطر رومانسي يجسد قصة حب في باريس، يمزج بين الورد الجوري ودفء الفانيليا وخشب الصندل.",
        desc_en: "A romantic fragrance embodying a love story in Paris, blending damask rose with warm vanilla and sandalwood.",
        notes_ar: { top: "ورد", mid: "خشب الصندل", base: "فانيليا" },
        notes_en: { top: "Rose", mid: "Sandalwood", base: "Vanilla" }
    },
    {
        id: 48,
        title_ar: "سوفاج - Sauvage (Dior)",
        title_en: "Sauvage - Dior",
        vendor: "F&S Fragrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/3.jpeg",
        badge_ar: "حصري",
        badge_en: "EXCLUSIVE",
        desc_ar: "رمز الرجولة والحرية، مزيج بري ومنعش من البرغموت واللافندر مع قاعدة قوية من الباتشولي.",
        desc_en: "The symbol of masculinity and freedom, a wild and fresh mix of bergamot and lavender with a strong patchouli base.",
        notes_ar: { top: "برغموت", mid: "لافندر", base: "باتشولي" },
        notes_en: { top: "Bergamot", mid: "Lavender", base: "Patchouli" }
    },
    {
        id: 49,
        title_ar: "أومبري ليذر - Ombre Leather (Tom Ford)",
        title_en: "Ombre Leather - Tom Ford",
        vendor: "F&S Fragrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/4.jpeg",
        badge_ar: "شائع",
        badge_en: "POPULAR",
        desc_ar: "عطر الجلود الفاخرة، يمنحك شعوراً بالقوة والغموض مع نفحات التبغ والتوابل الحارة.",
        desc_en: "A luxury leather fragrance, giving you a sense of power and mystery with tobacco and hot spice notes.",
        notes_ar: { top: "توابل حارة", mid: "تبغ", base: "جلود" },
        notes_en: { top: "Hot Spices", mid: "Tobacco", base: "Leather" }
    },
    {
        id: 50,
        title_ar: "جيمي شو - Jimmy Choo (Women)",
        title_en: "Jimmy Choo - Women",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/5.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر يعبر عن الأنوثة العصرية، يمزج بين حلاوة الكمثرى ورقة زهور الأوركيد والمسك الأبيض.",
        desc_en: "A fragrance expressing modern femininity, blending pear sweetness with delicate orchid and white musk.",
        notes_ar: { top: "كمثرى", mid: "أوركيد", base: "مسك أبيض" },
        notes_en: { top: "Pear", mid: "Orchid", base: "White Musk" }
    },
    {
        id: 51,
        title_ar: "عود وود - Oud Wood (Tom Ford)",
        title_en: "Oud Wood - Tom Ford",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/6.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "من أرقى عطور العود العالمية، يتميز برائحة البخور والأخشاب النادرة لإطلالة ملكية فخمة.",
        desc_en: "One of the world's finest oud fragrances, featuring incense and rare wood notes for a royal luxury look.",
        notes_ar: { top: "عود", mid: "بخور", base: "خشب الأرز" },
        notes_en: { top: "Oud", mid: "Incense", base: "Cedarwood" }
    },
    {
        id: 52,
        title_ar: "نيرولي بورتوفينو - Neroli Portofino",
        title_en: "Neroli Portofino",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/7.jpeg",
        badge_ar: "ناعم",
        badge_en: "SOFT",
        desc_ar: "عطر الانتعاش الإيطالي، يمزج بين نقاء النيرولي وزنبق الوادي مع قاعدة صندل دافئة.",
        desc_en: "The scent of Italian freshness, blending pure neroli and lily of the valley with a warm sandalwood base.",
        notes_ar: { top: "نيرولي", mid: "زنبق", base: "صندل" },
        notes_en: { top: "Neroli", mid: "Lily", base: "Sandalwood" }
    },
    {
        id: 53,
        title_ar: "روز مسك - Rose Musk (Montale)",
        title_en: "Rose Musk - Montale",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/8.jpeg",
        badge_ar: "مثير",
        badge_en: "SEXY",
        desc_ar: "عطر فواح يجمع بين أجود أنواع الورد الأحمر والمسك، مع لمسة فلفل أسود تزيد من جاذبيته.",
        desc_en: "A fragrant scent combining the finest red roses and musk with a touch of black pepper for attraction.",
        notes_ar: { top: "فلفل أسود", mid: "ورد أحمر", base: "عنبر دافئ" },
        notes_en: { top: "Black Pepper", mid: "Red Rose", base: "Warm Amber" }
    },
    {
        id: 54,
        title_ar: "باكارات روج - Baccarat Rouge 540",
        title_en: "Baccarat Rouge 540",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/9.jpeg",
        badge_ar: "حصري",
        badge_en: "HOT",
        desc_ar: "العطر الأكثر شهرة عالمياً، مزيج فريد من الزعفران والياسمين مع المسك الملكي لإطلالة باهرة.",
        desc_en: "The world's most famous fragrance, a unique blend of saffron and jasmine with royal musk for a stunning look.",
        notes_ar: { top: "زعفران", mid: "هال", base: "مسك ملكي" },
        notes_en: { top: "Saffron", mid: "Cardamom", base: "Royal Musk" }
    },
    {
        id: 55,
        title_ar: "بلو دي شانيل - Bleu de Chanel",
        title_en: "Bleu de Chanel",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/10.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر الرجل العصري الأنيق، مزيج منعش من الحمضيات والنعناع مع عمق نجيل الهند.",
        desc_en: "The fragrance of the elegant modern man, a fresh blend of citrus and mint with vetiver depth.",
        notes_ar: { top: "جريب فروت", mid: "نعناع", base: "نجيل الهند" },
        notes_en: { top: "Grapefruit", mid: "Mint", base: "Vetiver" }
    },
    {
        id: 56,
        title_ar: "تشوكليت جريدي - Chocolate Greedy",
        title_en: "Chocolate Greedy",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/11.jpeg",
        badge_ar: "مميز",
        badge_en: "SPECIAL",
        desc_ar: "عطر لعشاق الروائح الدافئة، يفوح برائحة الكاكاو والكاكاو مع لمسة فانيليا ساحرة.",
        desc_en: "A fragrance for warm scent lovers, smelling of cacao with an enchanting vanilla touch.",
        notes_ar: { top: "فانيليا", mid: "كاكاو", base: "بنزوين" },
        notes_en: { top: "Vanilla", mid: "Cacao", base: "Benzoin" }
    },
    {
        id: 57,
        title_ar: "سانتال 33 - Santal 33",
        title_en: "Santal 33",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/12.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "عطر النخبة، يتميز برائحة خشب الصندل والأرز مع لمسة ياسمين تعطي توازناً مذهلاً.",
        desc_en: "The elite fragrance, featuring sandalwood and cedar notes with a jasmine touch for stunning balance.",
        notes_ar: { top: "أرز", mid: "ياسمين", base: "صندل" },
        notes_en: { top: "Cedar", mid: "Jasmine", base: "Sandalwood" }
    },
    {
        id: 58,
        title_ar: "أكوا دي جيو - Acqua di Gio",
        title_en: "Acqua di Gio",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/13.jpeg",
        badge_ar: "منعش",
        badge_en: "FRESH",
        desc_ar: "عطر الانتعاش البحري الكلاسيكي، مزيج من الليمون والمسك والنوتات المائية الصافية.",
        desc_en: "The classic marine freshness fragrance, a mix of lemon, musk, and clear aquatic notes.",
        notes_ar: { top: "نوتات مائية", mid: "ليمون", base: "مسك خفيف" },
        notes_en: { top: "Water Notes", mid: "Lemon", base: "Light Musk" }
    },
    {
        id: 59,
        title_ar: "إنترلود - Interlude (Amouage)",
        title_en: "Interlude - Amouage",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/14.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر الفخامة العمانية، مزيج معقد من البخور والجلود والأخشاب الداكنة لإطلالة مهيبة.",
        desc_en: "Omani luxury fragrance, a complex blend of incense, leather, and dark woods for a majestic look.",
        notes_ar: { top: "بخور", mid: "جلود", base: "أخشاب داكنة" },
        notes_en: { top: "Incense", mid: "Leather", base: "Dark Woods" }
    },
    {
        id: 60,
        title_ar: "مون باريس - Mon Paris (YSL)",
        title_en: "Mon Paris - YSL",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/15.jpeg",
        badge_ar: "حصري",
        badge_en: "HOT",
        desc_ar: "عطر الأنوثة الباريسية، مزيج ساحر من التوت الأحمر وزهور البنفسج وقاعدة الباتشولي.",
        desc_en: "Parisian femininity fragrance, a charming mix of red berries, violet flowers, and patchouli base.",
        notes_ar: { top: "توت", mid: "بنفسج", base: "باتشولي" },
        notes_en: { top: "Berries", mid: "Violet", base: "Patchouli" }
    },
    {
        id: 61,
        title_ar: "باكارات روج إكسترا - Baccarat Rouge Extrait",
        title_en: "Baccarat Rouge Extrait",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/16.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "النسخة الأكثر تركيزاً وفخامة، تمزج بين الزعفران والعود الملكي والأمبرغريس لأناقة لا تُنسى.",
        desc_en: "The most concentrated and luxurious version, blending saffron, royal oud, and ambergris for unforgettable elegance.",
        notes_ar: { top: "أمبرغريس", mid: "زعفران", base: "عود ملكي" },
        notes_en: { top: "Ambergris", mid: "Saffron", base: "Royal Oud" }
    },
    {
        id: 62,
        title_ar: "بينك بياوني - Pink Peony",
        title_en: "Pink Peony",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/17.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر الرومانسية، باقة زهرية من الفاوانيا والورد الجوري مع لمسة مسك ناعمة كالحلم.",
        desc_en: "The scent of romance, a floral bouquet of peony and damask rose with a dreamy musk touch.",
        notes_ar: { top: "فاوانيا", mid: "ورد جوري", base: "مسك" },
        notes_en: { top: "Peony", mid: "Damask Rose", base: "Musk" }
    },
    {
        id: 63,
        title_ar: "أربان فوغير - Urban Fougere",
        title_en: "Urban Fougere",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/18.jpeg",
        badge_ar: "شائع",
        badge_en: "POPULAR",
        desc_ar: "عطر الرجل العصري الأنيق، يجمع بين انتعاش البرغموت واللافندر وعمق الطحالب العطرية.",
        desc_en: "The scent of the elegant modern man, combining bergamot, lavender, and oakmoss depth.",
        notes_ar: { top: "برغموت", mid: "لافندر", base: "طحالب" },
        notes_en: { top: "Bergamot", mid: "Lavender", base: "Oakmoss" }
    },
    {
        id: 64,
        title_ar: "وارم سينامون - Warm Cinnamon",
        title_en: "Warm Cinnamon",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/19.jpeg",
        badge_ar: "مميز",
        badge_en: "SPECIAL",
        desc_ar: "دفء شرقي لا يقاوم، يمزج بين حرارة القرفة والهيل مع قاعدة غنية من خشب الصندل.",
        desc_en: "Irresistible oriental warmth, blending the heat of cinnamon and cardamom with a rich sandalwood base.",
        notes_ar: { top: "قرفة", mid: "هال", base: "صندل" },
        notes_en: { top: "Cinnamon", mid: "Cardamom", base: "Sandalwood" }
    },
    {
        id: 65,
        title_ar: "توف ليذر - Tough Leather",
        title_en: "Tough Leather",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/20.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر القوة والصلابة، مزيج مكثف من التبغ الفاخر والجلود مع لمسة خشب الأرز الحادة.",
        desc_en: "The scent of strength and solidity, an intense mix of luxury tobacco, leather, and sharp cedarwood.",
        notes_ar: { top: "تبغ", mid: "جلود", base: "أرز" },
        notes_en: { top: "Tobacco", mid: "Leather", base: "Cedar" }
    },
    {
        id: 66,
        title_ar: "سيتريس غلو - Citrus Glow",
        title_en: "Citrus Glow",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/21.jpeg",
        badge_ar: "ناعم",
        badge_en: "SOFT",
        desc_ar: "إشراقة اليوسفي المبهجة مع رقة الياسمين، عطر خفيف ومنعش مثالي للاستخدام اليومي.",
        desc_en: "Cheerful mandarin radiance with jasmine delicacy, a light and fresh scent perfect for daily use.",
        notes_ar: { top: "يوسفي", mid: "ياسمين", base: "مسك أبيض" },
        notes_en: { top: "Mandarin", mid: "Jasmine", base: "White Musk" }
    },
    {
        id: 67,
        title_ar: "أمبر غولد - Amber Gold",
        title_en: "Amber Gold",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/22.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "بريق الذهب في عطر، يجمع بين دفء العنبر وسحر الورد مع نوتات خشبية راقية.",
        desc_en: "The sparkle of gold in a scent, combining amber warmth and rose charm with elegant woody notes.",
        notes_ar: { top: "أمبر", mid: "ورد", base: "أخشاب" },
        notes_en: { top: "Amber", mid: "Rose", base: "Woods" }
    },
    {
        id: 68,
        title_ar: "سبايسي فانيلا - Spicy Vanilla",
        title_en: "Spicy Vanilla",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/23.jpeg",
        badge_ar: "حصري",
        badge_en: "EXCLUSIVE",
        desc_ar: "تناقض ساحر بين انتعاش البرغموت وحرارة التوابل مع لمسة فانيليا ناعمة تخطف الأنفاس.",
        desc_en: "A charming contrast between bergamot freshness and spice heat with a soft vanilla touch.",
        notes_ar: { top: "برغموت", mid: "توابل", base: "فانيليا" },
        notes_en: { top: "Bergamot", mid: "Spices", base: "Vanilla" }
    },
    {
        id: 69,
        title_ar: "سمر نايت - Summer Night",
        title_en: "Summer Night",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/24.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "نسيم الليالي الصيفية، مزيج منعش من الليمون واللافندر مع لمسة صندل هادئة.",
        desc_en: "The breeze of summer nights, a fresh mix of lemon and lavender with a calm sandalwood touch.",
        notes_ar: { top: "ليمون", mid: "لافندر", base: "صندل" },
        notes_en: { top: "Lemon", mid: "Lavender", base: "Sandalwood" }
    },
    {
        id: 70,
        title_ar: "ريد أبل - Red Apple",
        title_en: "Red Apple",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/25.jpeg",
        badge_ar: "شائع",
        badge_en: "POPULAR",
        desc_ar: "بهجة الفواكه، عطر يجمع بين حيوية التفاح الأحمر وجمال الورد مع دفء العنبر.",
        desc_en: "The joy of fruits, combining red apple vitality and rose beauty with amber warmth.",
        notes_ar: { top: "تفاح", mid: "ورد", base: "عنبر" },
        notes_en: { top: "Apple", mid: "Rose", base: "Amber" }
    },
    {
        id: 71,
        title_ar: "سوفت فيوليت - Soft Violet",
        title_en: "Soft Violet",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/26.jpeg",
        badge_ar: "ناعم",
        badge_en: "SOFT",
        desc_ar: "عطر الهدوء والسكينة، مزيج ناعم من زهور البنفسج والمسك يمنحك شعوراً بالراحة.",
        desc_en: "The scent of calm and tranquility, a soft mix of violet flowers and musk for a comfortable feeling.",
        notes_ar: { top: "بنفسج", mid: "مسك", base: "صندل" },
        notes_en: { top: "Violet", mid: "Musk", base: "Sandalwood" }
    },
    {
         id: 72,
        title_ar: "أورينتال سموك - Oriental Smoke",
        title_en: "Oriental Smoke",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/27.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "عبق الشرق الأصيل، عطر دخاني غامض يجمع بين البخور الفاخر والعود المعتق.",
        desc_en: "The scent of the authentic East, a mysterious smoky fragrance combining luxury incense and aged oud.",
        notes_ar: { top: "بخور", mid: "عود", base: "أخشاب" },
        notes_en: { top: "Incense", mid: "Oud", base: "Woods" }
    },
    {
        id: 73,
        title_ar: "مستيك باتشولي - Mystic Patchouli",
        title_en: "Mystic Patchouli",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/28.jpeg",
        badge_ar: "حصري",
        badge_en: "EXCLUSIVE",
        desc_ar: "جاذبية غامضة، مزيج فريد من الزعفران والباتشولي والمسك يمنحك شخصية استثنائية.",
        desc_en: "Mysterious attraction, a unique blend of saffron, patchouli, and musk giving you an exceptional personality.",
        notes_ar: { top: "زعفران", mid: "باتشولي", base: "مسك" },
        notes_en: { top: "Saffron", mid: "Patchouli", base: "Musk" }
    },
    {
        id: 74,
        title_ar: "زيستي سيدار - Zesty Cedar",
        title_en: "Zesty Cedar",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/29.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "طاقة وحيوية لا تنتهي، مزيج حمضي حاد مع برودة النعناع وقاعدة من خشب الأرز.",
        desc_en: "Endless energy and vitality, a sharp citrus mix with mint coolness and a cedarwood base.",
        notes_ar: { top: "حمضيات", mid: "نعناع", base: "أرز" },
        notes_en: { top: "Citrus", mid: "Mint", base: "Cedar" }
    },
    {
        id: 75,
        title_ar: "فلور بوكيه - Flower Bouquet",
        title_en: "Flower Bouquet",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/30.jpeg",
        badge_ar: "مميز",
        badge_en: "SPECIAL",
        desc_ar: "باقة من الأناقة، يفيض بعبير الياسمين والورد مع لمسة مسك ناعمة وراقية جداً.",
        desc_en: "A bouquet of elegance, overflowing with jasmine and rose with a soft, very sophisticated musk touch.",
        notes_ar: { top: "ياسمين", mid: "ورد", base: "مسك" },
        notes_en: { top: "Jasmine", mid: "Rose", base: "Musk" }
    },
    {
        id: 76,
        title_ar: "كالم نايت - Calm Night",
        title_en: "Calm Night",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/31.jpeg",
        badge_ar: "ناعم",
        badge_en: "SOFT",
        desc_ar: "عطر الاسترخاء، يمزج بين هدوء اللافندر ودفء الفانيليا مع قاعدة خشبية ناعمة.",
        desc_en: "The scent of relaxation, blending lavender calm and vanilla warmth with a soft woody base.",
        notes_ar: { top: "لافندر", mid: "صندل", base: "فانيليا" },
        notes_en: { top: "Lavender", mid: "Sandalwood", base: "Vanilla" }
    },
    {
        id: 77,
        title_ar: "ريتش سبايس - Rich Spice",
        title_en: "Rich Spice",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/32.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "فخامة شرقية مكثفة، يمزج بين حرارة الهيل وعمق العود وجاذبية العنبر الأصيل.",
        desc_en: "Intense oriental luxury, blending cardamom heat, oud depth, and authentic amber attraction.",
        notes_ar: { top: "هال", mid: "عود", base: "عنبر" },
        notes_en: { top: "Cardamom", mid: "Oud", base: "Amber" }
    },
    {
        id: 78,
        title_ar: "أكوا فريش - Aqua Fresh",
        title_en: "Aqua Fresh",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/33.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "طاقة المحيط، عطر مائي منعش يمنحك شعوراً بالحرية مع لمسات الليمون والمسك.",
        desc_en: "Ocean energy, a fresh aquatic scent giving you a sense of freedom with lemon and musk touches.",
        notes_ar: { top: "نوتات بحرية", mid: "ليمون", base: "مسك" },
        notes_en: { top: "Sea Notes", mid: "Lemon", base: "Musk" }
    },
    {
        id: 79,
        title_ar: "رومانتيك أمبر - Romantic Amber",
        title_en: "Romantic Amber",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/34.jpeg",
        badge_ar: "شائع",
        badge_en: "POPULAR",
        desc_ar: "مزيج دافئ ورومانسي، يجمع بين رقة الورد وفخامة العنبر مع لمسة صندل ناعمة.",
        desc_en: "A warm and romantic blend, combining rose delicacy and amber luxury with a soft sandalwood touch.",
        notes_ar: { top: "ورد", mid: "أمبر", base: "صندل" },
        notes_en: { top: "Rose", mid: "Amber", base: "Sandalwood" }
    },
    {
        id: 80,
        title_ar: "بولد ليذر - Bold Leather",
        title_en: "Bold Leather",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/35.jpeg",
        badge_ar: "حصري",
        badge_en: "EXCLUSIVE",
        desc_ar: "عطر الشخصية القوية، مزيج جريء من التوابل والجلود والباتشولي يمنحك حضوراً لا ينسى.",
        desc_en: "The scent of strong personality, a bold mix of spices, leather, and patchouli.",
        notes_ar: { top: "توابل", mid: "جلود", base: "باتشولي" },
        notes_en: { top: "Spices", mid: "Leather", base: "Patchouli" }
    },
    {
        id: 81,
        title_ar: "فيوليت غاردن - Violet Garden",
        title_en: "Violet Garden",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/36.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "حديقة من الزهور، عطر رقيق يمزج بين الياسمين والبنفسج مع قاعدة مسكية ناعمة.",
        desc_en: "A garden of flowers, a delicate scent blending jasmine and violet with a soft musky base.",
        notes_ar: { top: "ياسمين", mid: "بنفسج", base: "مسك" },
        notes_en: { top: "Jasmine", mid: "Violet", base: "Musk" }
    },
    {
        id: 82,
        title_ar: "تريبل وود - Triple Wood",
        title_en: "Triple Wood",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/37.jpeg",
        badge_ar: "فخم",
        badge_en: "LUXURY",
        desc_ar: "خلاصة الأخشاب العطرية، مزيج فاخر من خشب الأرز والصندل والعود لأناقة دائمة.",
        desc_en: "The essence of aromatic woods, a luxury blend of cedar, sandal, and oud for lasting elegance.",
        notes_ar: { top: "أرز", mid: "صندل", base: "عود" },
        notes_en: { top: "Cedar", mid: "Sandalwood", base: "Oud" }
    },
    {
        id: 83,
        title_ar: "رويال سفرون - Royal Saffron",
        title_en: "Royal Saffron",
        vendor: "F&S Fregrances",
        price: 499,
        currency_ar: "جنيه",
        currency_en: "EGP",
        image: "images/38.jpeg",
        badge_ar: "جديد",
        badge_en: "NEW",
        desc_ar: "عطر الزعفران الملكي، مزيج فاخر من الزعفران والعنبر والمسك يمنحك هيبة لا تقاوم.",
        desc_en: "Royal Saffron fragrance, a luxury blend of saffron, amber, and musk giving you irresistible prestige.",
        notes_ar: { top: "زعفران", mid: "عنبر", base: "مسك ملكي" },
        notes_en: { top: "Saffron", mid: "Amber", base: "Royal Musk" }
    }
];

// ============================================================
// State
// ============================================================
let cart = JSON.parse(localStorage.getItem('oud_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('oud_favorites')) || [];
let currentLang = localStorage.getItem('lang') || 'ar';
let currentTheme = localStorage.getItem('theme') || 'dark';

// Pricing helper
function calculateCartTotal(cartItems) {
    const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
    let total = 0;
    let remaining = totalQty;
    while (remaining > 0) {
        if (remaining >= 3) { total += 1350; remaining -= 3; }
        else if (remaining >= 2) { total += 950; remaining -= 2; }
        else { total += 499; remaining -= 1; }
    }
    return total;
}

function loadAdminProducts() {
    try {
        return JSON.parse(localStorage.getItem('fs_admin_products') || '[]');
    } catch {
        return [];
    }
}

function normalizeProductKey(product) {
    return (product.title_en || '').trim().toLowerCase();
}

let apiProducts = [];

// Force a robust fetch + safe fallback.
async function refreshProductsFromAPI() {
    try {
        apiProducts = [];

        if (typeof FSApi !== 'undefined' && typeof FSApi.getProducts === 'function') {
            const response = await FSApi.getProducts();
            // Expected: { success: true, data: [...] } or { data: [...] }
            const payload = response?.data ?? response;
            const list = Array.isArray(payload)
                ? payload
                : (payload?.products || payload?.items || payload?.data || []);

            const mapped = (Array.isArray(list) ? list : []).map(p => {
                return (typeof FSApi.mapProductToFrontend === 'function')
                    ? FSApi.mapProductToFrontend(p)
                    : p;
            });

            apiProducts = mapped;
        }

        // If API returns nothing, keep fallback.
        if (!Array.isArray(apiProducts) || apiProducts.length === 0) {
            apiProducts = [];
        }
    } catch (err) {
        console.error("Failed to load products from API:", err);
        apiProducts = [];
    }
}


function getProducts() {
    // الأفضلية: API إن كانت نجحت فعلاً
    if (apiProducts && apiProducts.length > 0) return apiProducts;

    // Fallback قوي: المنتجات الثابتة داخل script.js
    const base = products.map(p => ({
        id: p.id,
        title_ar: p.title_ar,
        title_en: p.title_en,
        vendor: p.vendor,
        price: p.price,
        currency_ar: p.currency_ar,
        currency_en: p.currency_en,
        image: p.image,
        badge_ar: p.badge_ar,
        badge_en: p.badge_en,
        desc_ar: p.desc_ar,
        desc_en: p.desc_en,
        notes_ar: p.notes_ar || { top: '-', mid: '-', base: '-' },
        notes_en: p.notes_en || { top: '-', mid: '-', base: '-' },
        stock_quantity: 50,
        in_stock: true
    }));

    // إن كان لديك تعديلات محلية للأدمن، قم بدمجها بدون الاعتماد على Firebase
    try {
        const adminProds = JSON.parse(localStorage.getItem('fs_admin_products') || '[]');
        const hiddenMap = JSON.parse(localStorage.getItem('fs_hidden_products') || '{}');

        const hiddenIds = new Set(Object.keys(hiddenMap).map(Number));

        let list = base.filter(p => !hiddenIds.has(p.id));

        if (Array.isArray(adminProds) && adminProds.length) {
            adminProds.forEach(ap => {
                if (!ap || typeof ap.id === 'undefined' || ap.id === null) return;
                if (hiddenIds.has(Number(ap.id))) return;
                const idx = list.findIndex(p => p.id === ap.id);
                const normalized = {
                    ...ap,
                    notes_ar: ap.notes_ar || { top: '-', mid: '-', base: '-' },
                    notes_en: ap.notes_en || { top: '-', mid: '-', base: '-' },
                    in_stock: ap.in_stock ?? (ap.stock_quantity > 0),
                    stock_quantity: ap.stock_quantity ?? (ap.in_stock ? 50 : 0),
                };
                if (idx > -1) list[idx] = normalized;
                else list.push(normalized);
            });
        }

        return list.sort((a, b) => b.id - a.id);
    } catch {
        return base.sort((a, b) => b.id - a.id);
    }
}


let appSettings = {};

async function loadSettings() {
    try {
        if (typeof FSApi !== 'undefined') {
            const response = await FSApi.getSettings();
            if (response && response.data) {
                appSettings = response.data;
            }
        }
    } catch (err) {
        console.error("Failed to load settings:", err);
    }
}

function applySettings() {
    document.getElementById('dynamic-offer-banner')?.remove();
    document.getElementById('dynamic-offer-popup')?.remove();

    const offerEnabled = appSettings.offer_enabled !== undefined ? appSettings.offer_enabled : 'true';
    if (offerEnabled !== 'true') {
        return;
    }

    if (sessionStorage.getItem('offer_closed') === 'true') {
        return;
    }

    let offerText = (currentLang === 'ar' ? appSettings.offer_text_ar : appSettings.offer_text_en);
    if (!offerText || offerText.includes('500')) {
        offerText = (currentLang === 'ar' 
            ? '🔥 عرض خاص لفترة محدودة! 🔥\nاحصل على قطعتين بـ 950 جنيه (توفير 48 جنيه)\nأو 3 قطع بـ 1350 جنيه فقط (توفير 147 جنيه!)' 
            : '🔥 Limited Time Offer! 🔥\nBuy 2 bottles for 950 EGP (Save 48 EGP)\nor 3 bottles for 1350 EGP (Save 147 EGP!)');
    }

    const offerType = appSettings.offer_type || 'popup';

    if (offerType === 'banner') {
        const banner = document.createElement('div');
        banner.id = 'dynamic-offer-banner';
        banner.style.cssText = 'background: #d4af37; color: #000; padding: 10px 20px; font-weight: bold; text-align: center; font-size: 0.95rem; display: flex; justify-content: space-between; align-items: center; z-index: 10000; position: relative;';
        
        banner.innerHTML = `
            <div style="flex: 1; text-align: center; white-space: pre-line;">${offerText}</div>
            <button onclick="closeOffer('banner')" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; font-weight: bold; color: #000; padding: 0 5px;">&times;</button>
        `;
        document.body.insertBefore(banner, document.body.firstChild);
    } else if (offerType === 'popup') {
        if (!document.getElementById('popup-style-tag')) {
            const style = document.createElement('style');
            style.id = 'popup-style-tag';
            style.innerHTML = `@keyframes popupAnim { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;
            document.head.appendChild(style);
        }

        const popup = document.createElement('div');
        popup.id = 'dynamic-offer-popup';
        popup.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 100000; display: flex; align-items: center; justify-content: center;';
        
        popup.innerHTML = `
            <div style="background: #1a1a1a; border: 1px solid #d4af37; border-radius: 12px; padding: 30px; max-width: 450px; width: 90%; text-align: center; box-shadow: 0 10px 25px rgba(0,0,0,0.5); position: relative; animation: popupAnim 0.3s ease-out;">
                <button onclick="closeOffer('popup')" style="position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.5rem; color: #fff; cursor: pointer;">&times;</button>
                <div style="font-size: 2.5rem; color: #d4af37; margin-bottom: 15px;"><i class="fa-solid fa-gift"></i></div>
                <h3 style="color: #fff; margin-bottom: 15px; font-size: 1.3rem;">${currentLang === 'ar' ? 'عرض خاص' : 'Special Offer'}</h3>
                <p style="color: #ccc; line-height: 1.6; font-size: 1rem; margin-bottom: 20px; white-space: pre-line;">${offerText}</p>
                <button onclick="closeOffer('popup')" class="btn btn-gold" style="width: 100%; font-weight: bold; padding: 12px; border-radius: 25px; border: none; cursor: pointer;">${currentLang === 'ar' ? 'استمرار' : 'Continue'}</button>
            </div>
        `;
        document.body.appendChild(popup);
    }
}

function closeOffer(type) {
    sessionStorage.setItem('offer_closed', 'true');
    if (type === 'banner') {
        document.getElementById('dynamic-offer-banner')?.remove();
    } else {
        document.getElementById('dynamic-offer-popup')?.remove();
    }
}
window.closeOffer = closeOffer;

function saveFavorites() {
    localStorage.setItem('oud_favorites', JSON.stringify(favorites));
}

function toggleFavorite(event, id) {
    event.preventDefault();
    event.stopPropagation();
    const index = favorites.indexOf(id);
    if (index === -1) favorites.push(id);
    else favorites.splice(index, 1);
    saveFavorites();
    renderProducts(document.getElementById('search-input')?.value || '');
    renderFavoritesList();
}

function switchProductCardImage(productId, imageIndex) {
    const product = getProducts().find(p => p.id === productId);
    if (!product) return;
    const imageUrl = product.images?.[imageIndex] || product.image;
    const mainImg = document.getElementById(`product-image-main-${productId}`);
    if (mainImg) mainImg.src = imageUrl;
    document.querySelectorAll(`.product-thumb[data-product-id="${productId}"]`).forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === imageIndex);
    });
}

function openFavoritesModal() {
    renderFavoritesList();
    document.getElementById('favorites-modal')?.classList.add('open');
    document.getElementById('main-overlay')?.classList.add('active');
}

function closeFavoritesModal() {
    document.getElementById('favorites-modal')?.classList.remove('open');
    document.getElementById('main-overlay')?.classList.remove('active');
}

function renderFavoritesList() {
    const container = document.getElementById('favorites-list');
    if (!container) return;
    const favoriteProducts = getProducts().filter(p => favorites.includes(p.id));
    if (favoriteProducts.length === 0) {
        container.innerHTML = `<div class="favorites-empty-text">${currentLang === 'ar' ? 'لم تضف بعد أي منتج للمفضلات.' : 'No favorite products yet.'}</div>`;
        return;
    }
    container.innerHTML = favoriteProducts.map(p => {
        const title = currentLang === 'ar' ? p.title_ar : p.title_en;
        const desc = currentLang === 'ar' ? p.desc_ar : p.desc_en;
        const currency = currentLang === 'ar' ? p.currency_ar : p.currency_en;
        return `
            <div class="favorite-item">
                <img src="${p.image}" alt="${title}" onclick="openProductDetail(${p.id}); closeFavoritesModal();">
                <div class="favorite-info">
                    <strong>${title}</strong>
                    <span>${p.price} ${currency}</span>
                    <p>${desc.length > 50 ? desc.slice(0, 50) + '...' : desc}</p>
                </div>
                <button class="remove-favorite-btn" onclick="toggleFavorite(event, ${p.id})">
                    <i class="fa-solid fa-heart"></i>
                </button>
            </div>
        `;
    }).join('');
}

// ============================================================
// Render & Translate
// ============================================================
function updateUI() {
    // Guard: تأكد أن عنصر المنتجات موجود قبل العرض
    const container = document.getElementById('products-container');
    // لا نوقف التطبيق لو كان غير موجود (قد تكون الصفحة product.html أو admin)

    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    const langText = document.getElementById('lang-text');
    if (langText) {
        langText.innerText = currentLang === 'ar' ? 'EN' : 'العربية';
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key] !== undefined) {
            el.innerHTML = translations[currentLang][key];
        }
    });

    applyTheme();
    renderProducts();
    renderCart();
}

function applyTheme() {
    const themeIcon = document.querySelector('#theme-toggle i');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-mode');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
    }
}

// ============================================================
// Product Card
// ============================================================
function renderProducts(searchTerm = '') {
    const container = document.getElementById('products-container');
    if (!container) return;

    const allProducts = getProducts().filter(p => p.is_active !== 0);
    const term = (searchTerm || '').trim().toLowerCase();

    const filtered = term
        ? allProducts.filter((p) => {
              const content = [
                  p.title_ar,
                  p.title_en,
                  p.vendor,
                  p.desc_ar,
                  p.desc_en,
                  p.notes_ar ? Object.values(p.notes_ar).join(' ') : '',
                  p.notes_en ? Object.values(p.notes_en).join(' ') : '',
              ].join(' ').toLowerCase();
              return content.includes(term);
          })
        : allProducts;

    if (!filtered.length) {
        container.innerHTML = `<div class="no-products">${currentLang === 'ar' ? 'لم يتم العثور على منتجات مطابقة. حاول كلمة بحث أخرى.' : 'No matching products found. Try another search.'}</div>`;
        renderSearchResults(filtered, term);
        return;
    }

    container.innerHTML = filtered
        .map((p) => {
            const title = currentLang === 'ar' ? p.title_ar : p.title_en;
            const badge = currentLang === 'ar' ? p.badge_ar : p.badge_en;
            const currency = currentLang === 'ar' ? p.currency_ar : p.currency_en;

            const isOutOfStock = (p.stock_quantity ?? 0) <= 0;
            const stockClass = isOutOfStock ? 'stock-out' : 'stock-in';
            const stockText = currentLang === 'ar'
                ? isOutOfStock
                    ? 'نفد المخزون'
                    : `متبقي: ${p.stock_quantity} قطع`
                : isOutOfStock
                    ? 'Out of stock'
                    : `Stock: ${p.stock_quantity}`;

            const buyBtnDisabledAttr = isOutOfStock ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : '';
            const buyBtnText = isOutOfStock
                ? currentLang === 'ar'
                    ? 'غير متوفر'
                    : 'Out of stock'
                : translations[currentLang].addCartBtn;

            const isFavorite = favorites.includes(p.id);
            const mainImage = p.image || '';
            const desc = currentLang === 'ar' ? p.desc_ar : p.desc_en;
            const shortDesc = (desc || '').length > 70 ? `${desc.slice(0, 70)}...` : (desc || '');

            return `
                <div class="product-card" data-id="${p.id}">
                    <div class="product-image">
                        ${badge ? `<span class="sale-badge">${badge}</span>` : ''}
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(event, ${p.id})">
                            <i class="fa-solid fa-heart"></i>
                        </button>
                        <img id="product-image-main-${p.id}" src="${mainImage}" alt="${title}" onclick="openProductDetail(${p.id})" onerror="this.src='https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'">
                    </div>
                    <div class="product-info">
                        <span class="vendor">${p.vendor}</span>
                        <a href="#" class="product-title" onclick="event.preventDefault(); openProductDetail(${p.id})">${title}</a>
                        <p class="product-desc">${shortDesc}</p>
                        <div class="price-box" style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                            <span class="product-price">${p.price} ${currency}</span>
                            <span class="product-stock ${stockClass}" style="font-size:0.85rem; font-weight:600; color: ${isOutOfStock ? '#ff4d4d' : '#2ecc71'};">${stockText}</span>
                        </div>
                        <div class="product-controls">
                            <div class="qty-input">
                                <div class="qty-btn" onclick="adjustQty(${p.id}, -1)">−</div>
                                <div class="qty-val" id="qty-${p.id}">1</div>
                                <div class="qty-btn" onclick="adjustQty(${p.id}, 1)">+</div>
                            </div>
                            <button class="add-to-cart-btn" onclick="addToCart(${p.id})" ${buyBtnDisabledAttr}>
                                ${buyBtnText}
                            </button>
                        </div>
                    </div>
                </div>
            `;
        })
        .join('');

    renderSearchResults(filtered, term);
}


// ============================================================
// التحديث التلقائي العالمي (Firebase)
// ============================================================
// يتم الآن استدعاء التكوين من firebase-config.js
if (typeof firebase !== 'undefined' && typeof firebaseConfig !== 'undefined' && firebaseConfig.apiKey !== "ضع_هنا_API_KEY") {
    // استماع لحظي: بمجرد الحفظ في الأدمن، يتحدث الموقع عند جميع الزوار فوراً وبدون ريفريش
    firebase.database().ref('admin_products').on('value', (snapshot) => {
        const data = snapshot.val() || [];
        localStorage.setItem('fs_admin_products_sync', JSON.stringify(data));
        if (typeof renderProducts === 'function') renderProducts();
    });

    // استماع للمنتجات المخفية (المحذوفة)
    firebase.database().ref('fs_hidden_products').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        localStorage.setItem('fs_hidden_sync', JSON.stringify(data));
        if (typeof renderProducts === 'function') renderProducts();
    });
}

function renderSearchResults(filtered, term) {
    const results = document.getElementById('search-results');
    if (!results) return;

    if (!term) {
        results.innerHTML = `<p class="search-help">${currentLang === 'ar' ? 'ابحث عن المنتج الذي تريده بالاسم أو الماركة.' : 'Search for the product by name or brand.'}</p>`;
        return;
    }

    if (filtered.length === 0) {
        results.innerHTML = `<div class="search-empty">${currentLang === 'ar' ? 'لا توجد منتجات بهذا الاسم. حاول كلمة أخرى.' : 'No products found with that search. Try another term.'}</div>`;
        return;
    }

    results.innerHTML = `
        <div class="search-items">
            ${filtered.map(p => {
                const title = currentLang === 'ar' ? p.title_ar : p.title_en;
                const desc = currentLang === 'ar' ? p.desc_ar : p.desc_en;
                return `<button type="button" class="search-result" onclick="openProductDetail(${p.id})"> <strong>${p.vendor}</strong> ${title}<span class="search-result-desc">${desc}</span></button>`;
            }).join('')}
        </div>
    `;
}

function openProductDetail(id) {
    window.location.href = `product.html?id=${id}`;
}

function closeDetailModal() {
    document.getElementById('product-detail-modal')?.classList.remove('open');
    const overlay = document.getElementById('main-overlay');
    if (overlay && !document.querySelector('.cart-drawer.open')) {
        overlay.classList.remove('active');
    }
}

// ============================================================
// Quantity
// ============================================================
function adjustQty(id, delta) {
    const el = document.getElementById(`qty-${id}`);
    if (!el) return;
    let val = parseInt(el.innerText) + delta;
    if (val < 1) val = 1;
    el.innerText = val;
}

// ============================================================
// Cart
// ============================================================
function addToCart(id) {
    const product = getProducts().find(p => p.id === id);
    if (!product) return;
    const qty = parseInt(document.getElementById(`qty-${id}`).innerText) || 1;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }

    saveCart();
    renderCart();
    openDrawer('cart-drawer');

    // Badge pulse animation
    const badge = document.querySelector('.cart-btn .count');
    if (badge) {
        badge.style.transform = 'scale(1.7)';
        setTimeout(() => badge.style.transform = 'scale(1)', 300);
    }
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total-price');
    const badge = document.querySelector('.cart-btn .count');

    if (cart.length === 0) {
        if (container) container.innerHTML = `
            <div class="empty-cart-msg">
                <i class="fa-solid fa-bag-shopping" style="font-size:2.5rem; color: var(--primary-color); display:block; margin-bottom:15px;"></i>
                ${translations[currentLang].emptyCart}
            </div>`;
        if (totalEl) totalEl.innerText = `0 ${currentLang === 'ar' ? 'جنيه' : 'EGP'}`;
        if (badge) badge.innerText = '0';
        return;
    }

    let total = calculateCartTotal(cart);
    if (container) {
        container.innerHTML = cart.map(item => {
            const title = currentLang === 'ar' ? item.title_ar : item.title_en;
            const currency = currentLang === 'ar' ? item.currency_ar : item.currency_en;
            return `
            <div class="cart-item">
                <img src="${item.image}" alt="${title}" onerror="this.src='https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=200'">
                <div class="cart-item-info">
                    <h4>${title}</h4>
                    <p>${item.qty} × ${item.price} ${currency}</p>
                    <span class="remove-btn" onclick="removeFromCart(${item.id})">
                        ${currentLang === 'ar' ? 'إزالة' : 'Remove'}
                    </span>
                </div>
            </div>`;
        }).join('');
    }

    if (totalEl) totalEl.innerText = `${total.toLocaleString()} ${currentLang === 'ar' ? 'جنيه' : 'EGP'}`;
    if (badge) badge.innerText = cart.reduce((acc, i) => acc + i.qty, 0);
    updateCheckoutButton();
}

function updateCheckoutButton() {
    const btn = document.getElementById('checkout-btn');
    if (!btn) return;
    btn.disabled = cart.length === 0;
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCart();
}

function saveCart() {
    localStorage.setItem('oud_cart', JSON.stringify(cart));
}

// ============================================================
// Drawers & Panels
// ============================================================
function openDrawer(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('open');
    const overlay = document.getElementById('main-overlay');
    if (overlay) overlay.classList.add('active');
}

function closeAllDrawers() {
    document.querySelectorAll('.cart-drawer, .search-modal, .mobile-nav-panel, .favorites-modal')
        .forEach(d => d.classList.remove('open'));
    const overlay = document.getElementById('main-overlay');
    if (overlay) overlay.classList.remove('active');
}

// ============================================================
// Init
// ============================================================
document.addEventListener('DOMContentLoaded', async () => {
    await Promise.all([refreshProductsFromAPI(), loadSettings()]);
    await new Promise(r => setTimeout(r, 50));
    updateUI();
    applySettings();


    if (typeof FSSocket !== 'undefined') {
        FSSocket.initStorefront(async () => {
            await refreshProductsFromAPI();
            renderProducts(document.getElementById('search-input')?.value || '');
        });
        FSSocket.on('settings:updated', (newSettings) => {
            appSettings = newSettings;
            applySettings();
        });
    }

    // Language toggle
    document.getElementById('lang-toggle')?.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('lang', currentLang);
        updateUI();
    });

    // Theme toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        applyTheme();
    });

    // Cart drawer
    document.getElementById('cart-drawer-btn')?.addEventListener('click', () => openDrawer('cart-drawer'));
    document.getElementById('bottom-cart-btn')?.addEventListener('click', e => { e.preventDefault(); openDrawer('cart-drawer'); });
    document.getElementById('bottom-wishlist-btn')?.addEventListener('click', e => { e.preventDefault(); openFavoritesModal(); });
    document.getElementById('close-cart')?.addEventListener('click', closeAllDrawers);
    document.getElementById('close-favorites')?.addEventListener('click', closeFavoritesModal);
    document.getElementById('main-overlay')?.addEventListener('click', closeAllDrawers);

    // Search modal
    document.getElementById('search-trigger')?.addEventListener('click', () => {
        openDrawer('search-modal');
        setTimeout(() => {
            const input = document.getElementById('search-input');
            if (input) {
                input.focus();
                renderProducts(input.value);
            }
        }, 150);
    });
    document.getElementById('close-search')?.addEventListener('click', closeAllDrawers);
    document.getElementById('search-input')?.addEventListener('input', e => renderProducts(e.target.value));
    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (!cart.length) return;
        window.location.href = 'checkout.html';
    });

    // Product detail modal
    document.getElementById('close-detail')?.addEventListener('click', closeDetailModal);
    document.getElementById('product-detail-modal')?.addEventListener('click', e => {
        if (e.target.id === 'product-detail-modal') closeDetailModal();
    });

    // Mobile nav
    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => openDrawer('mobile-nav-panel'));
    document.getElementById('close-mobile-nav')?.addEventListener('click', closeAllDrawers);

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerH = document.getElementById('header')?.offsetHeight || 0;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.pageYOffset - headerH - 20,
                    behavior: 'smooth'
                });
                closeAllDrawers();
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 80);
    });
});

