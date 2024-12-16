// recycleData.js

export const recycleData = {
  Plastic: {
    recyclable: [
      {
        id: 1,
        title: "Plastic Bottle",
        image: require("../../images/plastic1.jpg"),
        content: {
          description:
            "Plastic bottles are used to hold various liquids and are made of high-density polyethylene (HDPE) or polyethylene terephthalate (PET).",
          details: [
            { type: "heading", text: "How to Recycle" },
            {
              type: "text",
              text: "Ensure the bottle is empty and rinse it out before recycling. Remove any labels or caps.",
            },
            { type: "subheading", text: "Why Recycle Plastic Bottles?" },
            {
              type: "text",
              text: "Recycling plastic bottles reduces waste in landfills and can be used to make new products like clothing, furniture, and new bottles.",
            },
            { type: "heading", text: "For Normal Users" },
            {
              type: "text",
              text: "Store the empty and cleaned plastic bottles in a designated recycling bin at home. When the garbage picker or community recycling member comes, hand over the collected items to them.",
            },
            { type: "heading", text: "For Community Members" },
            {
              type: "text",
              text: "Organize regular collection drives to gather recyclable plastics from households. Educate community members on the importance of proper sorting and cleaning of recyclables. Ensure collected plastics are taken to designated recycling facilities.",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Plastic Container",
        image: require("../../images/plastic2.jpg"),
        content: {
          description:
            "Plastic containers, such as those used for food storage, are typically made from polypropylene (PP) or polyethylene (PE).",
          details: [
            { type: "heading", text: "How to Recycle" },
            {
              type: "text",
              text: "Clean the container thoroughly to remove any food residue. Check local guidelines for specific recycling instructions.",
            },
            { type: "subheading", text: "Why Recycle Plastic Containers?" },
            {
              type: "text",
              text: "Recycling plastic containers helps reduce environmental pollution and conserves resources by turning used containers into new products.",
            },
            { type: "heading", text: "For Normal Users" },
            {
              type: "text",
              text: "After cleaning the containers, store them in a recycling bin. Wait for the scheduled collection day or take them to a nearby recycling center.",
            },
            { type: "heading", text: "For Community Members" },
            {
              type: "text",
              text: "Facilitate awareness campaigns to teach proper recycling techniques for plastic containers. Coordinate with local recycling centers to ensure collected items are processed efficiently.",
            },
          ],
        },
      },
      {
        id: 3,
        title: "Plastic Bag",
        image: require("../../images/plastic3.jpg"),
        content: {
          description:
            "Plastic bags are commonly made from low-density polyethylene (LDPE) and are used for carrying groceries and other items.",
          details: [
            { type: "heading", text: "How to Recycle" },
            {
              type: "text",
              text: "Plastic bags can be returned to recycling bins at many grocery stores. Ensure they are clean and dry before recycling.",
            },
            { type: "subheading", text: "Why Recycle Plastic Bags?" },
            {
              type: "text",
              text: "Recycling plastic bags prevents them from ending up in landfills and oceans, where they can cause harm to wildlife.",
            },
            { type: "heading", text: "For Normal Users" },
            {
              type: "text",
              text: "Collect plastic bags and bring them to the store's recycling bin on your next visit. You can also reuse them for future shopping trips.",
            },
            { type: "heading", text: "For Community Members" },
            {
              type: "text",
              text: "Encourage stores to provide dedicated recycling bins for plastic bags. Promote reusable bags within the community to reduce the reliance on single-use plastics.",
            },
          ],
        },
      },
    ],
    unrecyclable: [
      {
        id: 1,
        title: "Plastic Straw",
        image: require("../../images/plastic4.jpg"),
        content: {
          description:
            "Plastic straws are often used for a single drink and then discarded, contributing to environmental pollution.",
          details: [
            { type: "heading", text: "Why Not Recyclable?" },
            {
              type: "text",
              text: "Plastic straws are too small to be processed by most recycling facilities and often end up in the ocean, harming marine life.",
            },
            { type: "subheading", text: "Alternatives to Plastic Straws" },
            {
              type: "text",
              text: "Consider using reusable metal or silicone straws, or paper straws which are biodegradable.",
            },
            { type: "heading", text: "For Normal Users" },
            {
              type: "text",
              text: "Avoid using plastic straws. Opt for reusable or biodegradable alternatives. Dispose of plastic straws in the trash if used.",
            },
            { type: "heading", text: "For Community Members" },
            {
              type: "text",
              text: "Promote the use of alternatives to plastic straws within the community. Work with local businesses to reduce the distribution of single-use plastic straws.",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Plastic Utensils",
        image: require("../../images/plastic5.jpg"),
        content: {
          description:
            "Plastic utensils, such as forks, spoons, and knives, are commonly used for convenience but are typically not recyclable.",
          details: [
            { type: "heading", text: "Why Not Recyclable?" },
            {
              type: "text",
              text: "Plastic utensils are often contaminated with food and are made of low-quality plastic that is not easily recyclable.",
            },
            { type: "subheading", text: "Alternatives to Plastic Utensils" },
            {
              type: "text",
              text: "Use reusable utensils made of metal or bamboo, or biodegradable options made from cornstarch or other plant-based materials.",
            },
            { type: "heading", text: "For Normal Users" },
            {
              type: "text",
              text: "Use reusable utensils at home and when eating out. If disposable utensils are necessary, choose biodegradable options.",
            },
            { type: "heading", text: "For Community Members" },
            {
              type: "text",
              text: "Organize community events to distribute reusable utensils. Encourage local restaurants and event organizers to switch to sustainable alternatives.",
            },
          ],
        },
      },
    ],
  },
  // Add similar sections for Glass and Paper with recyclable and unrecyclable items
  // Example for Glass:
  Glass: {
    recyclable: [
      {
        id: 1,
        title: "Glass Bottle",
        image: require("../../images/glass1.jpg"),
        content: {
          description:
            "Glass bottles are used for beverages and can be recycled multiple times without losing quality.",
          details: [
            { type: "heading", text: "How to Recycle" },
            {
              type: "text",
              text: "Rinse the bottle and remove any caps or labels. Place it in the recycling bin designated for glass.",
            },
            { type: "subheading", text: "Why Recycle Glass Bottles?" },
            {
              type: "text",
              text: "Recycling glass bottles conserves raw materials and energy, and reduces pollution.",
            },
            { type: "heading", text: "Additional Information" },
            {
              type: "text",
              text: "For normal users: Collect clean glass bottles and dispose of them in designated recycling bins or take them to a recycling center.",
            },
            {
              type: "text",
              text: "For community members: Set up glass bottle collection points and organize educational programs on the importance of recycling glass.",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Glass Jar",
        image: require("../../images/glass2.jpg"),
        content: {
          description:
            "Glass jars are used for storing food and other items. They are made of durable glass that can be recycled.",
          details: [
            { type: "heading", text: "How to Recycle" },
            {
              type: "text",
              text: "Clean the jar thoroughly and remove any labels or lids. Place it in the glass recycling bin.",
            },
            { type: "subheading", text: "Why Recycle Glass Jars?" },
            {
              type: "text",
              text: "Recycling glass jars helps reduce waste and conserves natural resources by turning used glass into new products.",
            },
            { type: "heading", text: "Additional Information" },
            {
              type: "text",
              text: "For normal users: Ensure glass jars are free of food residue and store them in a recycling bin until collection or drop-off.",
            },
            {
              type: "text",
              text: "For community members: Promote recycling glass jars and provide convenient collection services.",
            },
          ],
        },
      },
      {
        id: 3,
        title: "Glass Food Container",
        image: require("../../images/glass3.jpg"),
        content: {
          description:
            "Glass food containers are used for storing leftovers and meal prep. They are often made from tempered glass.",
          details: [
            { type: "heading", text: "How to Recycle" },
            {
              type: "text",
              text: "Wash the container and remove any lids or non-glass components. Place it in the glass recycling bin.",
            },
            { type: "subheading", text: "Why Recycle Glass Food Containers?" },
            {
              type: "text",
              text: "Recycling glass food containers helps reduce waste and allows the glass to be reused in new products.",
            },
            { type: "heading", text: "Additional Information" },
            {
              type: "text",
              text: "For normal users: After cleaning, store glass food containers in your recycling bin. Ensure they are separated from other materials.",
            },
            {
              type: "text",
              text: "For community members: Promote the use of glass food containers as a sustainable choice. Collect and recycle glass food containers from the community.",
            },
          ],
        },
      },
    ],
    unrecyclable: [
      {
        id: 1,
        title: "Ceramic Mug",
        image: require("../../images/glass4.jpg"),
        content: {
          description:
            "Ceramic mugs are used for drinking beverages but cannot be recycled with glass due to different material properties.",
          details: [
            { type: "heading", text: "Why Not Recyclable?" },
            {
              type: "text",
              text: "Ceramics have a different melting point and composition than glass, making them unsuitable for glass recycling facilities.",
            },
            { type: "subheading", text: "Alternatives to Disposing Ceramics" },
            {
              type: "text",
              text: "Consider donating or repurposing ceramic items instead of discarding them.",
            },
            { type: "heading", text: "Additional Information" },
            {
              type: "text",
              text: "For normal users: If you no longer need a ceramic item, consider donating it to a thrift store or repurposing it for another use at home.",
            },
            {
              type: "text",
              text: "For community members: Encourage the donation of unwanted ceramic items. Set up community events for exchanging or repurposing ceramics to prevent them from being thrown away.",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Mirror Glass",
        image: require("../../images/glass5.jpg"),
        content: {
          description:
            "Mirror glass is coated with a reflective material, making it unsuitable for regular glass recycling.",
          details: [
            { type: "heading", text: "Why Not Recyclable?" },
            {
              type: "text",
              text: "The reflective coating on mirror glass interferes with the recycling process for regular glass.",
            },
            {
              type: "subheading",
              text: "Alternatives to Disposing Mirror Glass",
            },
            {
              type: "text",
              text: "Repurpose mirror glass for decorative projects or seek specialized recycling services.",
            },
            { type: "heading", text: "Additional Information" },
            {
              type: "text",
              text: "For normal users: Do not place mirror glass in the regular recycling bin. Look for specialized disposal services or reuse the material creatively at home.",
            },
            {
              type: "text",
              text: "For community members: Provide information about specialized recycling options for mirror glass. Encourage creative reuse of mirror glass within the community.",
            },
          ],
        },
      },
      // Add more items here
    ],
  },
  Paper: {
    recyclable: [
      {
        id: 1,
        title: "Newspaper",
        image: require("../../images/paper1.jpg"),
        content: {
          description:
            "Newspapers are made from recycled paper and can be recycled again to produce new paper products.",
          details: [
            { type: "heading", text: "Recycling Process" },
            {
              type: "text",
              text: "Make sure the newspaper is free of contaminants like food or liquids. Flatten and place it in the paper recycling bin.",
            },
            { type: "subheading", text: "Environmental Impact" },
            {
              type: "text",
              text: "Recycling newspapers helps save trees, reduces landfill waste, and cuts down on energy use.",
            },
            { type: "subheading", text: "Tips for Users" },
            {
              type: "text",
              text: "Store old newspapers in a dry place until recycling day. Use newspaper for wrapping or crafting before recycling.",
            },
            { type: "subheading", text: "Community Role" },
            {
              type: "text",
              text: "Communities can organize newspaper collection drives and educate residents on the benefits of recycling paper.",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Office Paper",
        image: require("../../images/paper2.jpg"),
        content: {
          description:
            "Office paper includes printer paper, envelopes, and notepads, which are all recyclable.",
          details: [
            { type: "heading", text: "Recycling Instructions" },
            {
              type: "text",
              text: "Remove any staples or clips. Ensure the paper is clean and dry before placing it in the recycling bin.",
            },
            { type: "subheading", text: "Why Recycle Office Paper?" },
            {
              type: "text",
              text: "Recycling office paper helps reduce deforestation, conserves resources, and supports the production of recycled paper products.",
            },
            { type: "subheading", text: "User Guidelines" },
            {
              type: "text",
              text: "Use both sides of office paper to reduce waste. Shred sensitive documents and recycle the shredded paper.",
            },
            { type: "subheading", text: "Community Initiatives" },
            {
              type: "text",
              text: "Set up paper recycling bins in offices and public spaces. Promote paperless options to minimize paper waste.",
            },
          ],
        },
      },
      {
        id: 3,
        title: "Cardboard",
        image: require("../../images/paper3.jpg"),
        content: {
          description:
            "Cardboard boxes and packaging can be recycled, helping to reduce waste and support the circular economy.",
          details: [
            { type: "heading", text: "Preparation for Recycling" },
            {
              type: "text",
              text: "Flatten cardboard boxes to save space. Remove any non-paper materials like tape or plastic.",
            },
            { type: "subheading", text: "Benefits of Recycling Cardboard" },
            {
              type: "text",
              text: "Recycling cardboard saves trees, reduces landfill use, and conserves energy and water used in production.",
            },
            { type: "subheading", text: "Advice for Households" },
            {
              type: "text",
              text: "Reuse cardboard boxes for storage or moving before recycling. Keep them dry to maintain their recyclability.",
            },
            { type: "subheading", text: "Community Programs" },
            {
              type: "text",
              text: "Implement curbside cardboard recycling services. Educate residents about proper cardboard recycling techniques.",
            },
          ],
        },
      },
    ],
    unrecyclable: [
      {
        id: 1,
        title: "Grease-Stained Paper",
        image: require("../../images/paper4.jpg"),
        content: {
          description:
            "Paper stained with grease, such as pizza boxes, cannot be recycled because the grease contaminates the recycling process.",
          details: [
            { type: "heading", text: "Contamination Issues" },
            {
              type: "text",
              text: "Grease and food residue interfere with the recycling process, making it difficult to produce high-quality recycled paper.",
            },
            { type: "subheading", text: "Alternative Disposal Methods" },
            {
              type: "text",
              text: "Compost grease-stained paper if possible, or dispose of it in the regular trash to avoid contaminating other recyclables.",
            },
            { type: "subheading", text: "User Recommendations" },
            {
              type: "text",
              text: "Avoid placing greasy or food-contaminated paper in the recycling bin. Look for composting options in your area.",
            },
            { type: "subheading", text: "Community Education" },
            {
              type: "text",
              text: "Inform community members about the importance of keeping recyclables clean. Provide resources for composting grease-stained paper.",
            },
          ],
        },
      },
      // {
      //   id: 2,
      //   title: "Wax-Coated Paper",
      //   image: require("../../images/paper.jpg"),
      //   content: {
      //     description:
      //       "Wax-coated paper, such as some food wraps, is not recyclable because the wax coating is difficult to separate from the paper.",
      //     details: [
      //       { type: "heading", text: "Recycling Challenges" },
      //       {
      //         type: "text",
      //         text: "The wax coating on this type of paper contaminates the recycling stream, making it unsuitable for standard recycling processes.",
      //       },
      //       { type: "subheading", text: "Disposal Alternatives" },
      //       {
      //         type: "text",
      //         text: "Use biodegradable or compostable alternatives. If composting is not an option, dispose of wax-coated paper in the trash.",
      //       },
      //       { type: "subheading", text: "Household Tips" },
      //       {
      //         type: "text",
      //         text: "Minimize the use of wax-coated paper by opting for reusable containers or biodegradable wraps.",
      //       },
      //       { type: "subheading", text: "Community Action" },
      //       {
      //         type: "text",
      //         text: "Encourage local businesses to switch to compostable food wraps. Provide information on proper disposal methods for wax-coated paper.",
      //       },
      //     ],
      //   },
      // },
    ],
  },
};
