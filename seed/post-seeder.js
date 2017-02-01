"use strict";
const Blog = require("../models/blog");
const mongoose = require("mongoose");

mongoose.connect("localhost:27017/test_blog");

// populate database
const posts = [
  new Blog({
    description: "3rd Place America's Best Espresso Winner! Our flagship espresso blend. We devote constant attention to Big Truck and think it might be the best organic espresso blend you can find. Coffee is a seasonal fresh produce and different producing countries have varied seasons and harvest periods. We strive to buy smaller lots in their prime to keep the blend as fresh as possible. The ingredients of the blend change based upon seasonality, yet the flavor profile for Big Truck remains the same.",
    title: 'Big Truck Organic Espresso'
  }),
  new Blog({
    description: "This Bird Rock exclusive Direct Trade lot comes from what is considered one of the best coffee farms in the world. El Injerto has been a fixture in the Guatemala Cup of Excellence for the last several years, bringing home many 1st place victories including this year. We have had the honor of working directly with El Injerto for six years now. ",
  }),
  new Blog({
    description: "Hints of citrus graham cracker and vanilla on the nose with flavors of semi-sweet chocolate chips, hazelnut, and marshmallow. Mild acidity compliments the graciously creamy body. ",
    title: "Redcab - Brazil"
  }),
  new Blog({
    description: "Our roasting team found sweet flavors of chocolate and honey on the nose with bright tangerine, lime acidity and a creamy chocolate body in the cup. With subtle hints of tart cherry, sweet spices and floral notes, this coffee will taste great hot or iced!",
    title: "Colombia Best Of Huila"
  }),
  new Blog({
    description: "This year’s new crop brings out a clean, smooth and balanced cup. It offers sweet and bright flavors of green apple, lemon and cocoa. Along with creamy chocolate body and subtle malic acidity, this is a coffee you can drink all day! Our new coffee from Uganda is sourced from various family-owned farms located in the Bugisu region on the slopes of Mount Elgon in the Kapchorwa district, Uganda.",
    title: "Uganda Chema Sipi Falls"
  }),
  new Blog({
    description:"Saucy body leads into base flavors of hazelnut, caramel and a touch of yellow plum followed by mild malic acidity that leads to a melted milk chocolate finish.",
    title: "Redcab - Espresso"
  }),
  new Blog({
    description:"Our newest cascara tea from Bolivia offers sweet and bright flavors of lemon and orange along with subtle hints of honey and tamarind. You can enjoy this either hot or iced! ",
    title: "Bolivian Cascara Organic (Coffee Cherry Tea)"
  }),
  new Blog({
    description:"This is one of our favorite new arrivals...so far! It starts with a sweet cocoa and floral aroma. The cup brings out complex fruit flavors, sweet herbal notes, lemon acidity and a marzipan body along with a sweet and savory finish. Overall, it's a very unique cup with tons of depth and dynamics. You can also enjoy this hot or iced!",
    title: "FTO Ethiopia Yirgacheffe Gedeb"
  }),
  new Blog({
    description:"A Hawaiian coffee bean from the Big Island that delivers. The sweetest Hawaiian coffee with notes of honey and chocolate on the nose with molasses, milk chocolate and hints of almond nuttiness on the tongue. Rich and syrupy body with long aftertaste. Like a great Kona, only sweeter.",
    title: "Hawaiian Ka'u Typica"
  }),
  new Blog({
    description:"Dark chocolate, vanilla, sweet lemon, lavender and a creamy berry melange. Presenting our beloved Ardi which hails from Southern Ethiopia in the Guji area. For the approximately 2-3,000 people living in this area, coffee farming is the main source of income.",
    title: "Ethiopia Sidama Ardi"
  }),
  new Blog({
    description:"Lush and elegant, clean, smooth, this cup showcases a sweet, creamy character that is delicately accented with notes of honey, subtle citrus, and a vibrant, floral aroma.",
    title: "Costa Rica La Magnolia"
  }),
  new Blog({
    description:"Fudgy with flavors of sweet cream and strawberry undertones. Nereo is a cool, humble guy. We have a lot of respect for him and the way he approaches coffee and life. He is hardworking and resourceful, using his own organic inputs from other areas of his farm as fertilizer, and harvests all his own coffee with his family rather than hiring pickers.",
    title: "Costa Rica Nereo Ramirez, Micro Mill"
  })
];

// Loop over posts and save them to DB.
// Once they are all iterated through and saved, disconnect from the DB.
let done = 0;
for (let i = 0; i < posts.length; i++) {
  posts[i].save((err, result) => {
    done++;
    if (done === posts.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
