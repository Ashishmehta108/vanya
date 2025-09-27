import Work from "@/lib/our-work/work";
import { aboutModel } from "../lib/about/about";
import { aboutSeedData } from "../lib/about/seed";
import { Blog } from "../lib/blog/blog";
import { BlogPost } from "../lib/blog/blogpost/blogpost";
import BlogSeed from "../lib/blog/seed";
import { ContactPageModel } from "../lib/contact/contact";
import { seedContact } from "../lib/contact/seed";
import { galleryModel } from "../lib/gallery/gallery";
import { gallerySeed } from "../lib/gallery/seed";
import { HomePageContentModel } from "../lib/home/home";
import { seedData } from "../lib/home/seed";
import { connectToDatabase } from "../lib/mongodb";
import { workSeed } from "@/lib/our-work/seed";


export async function MakeSeed() {
    console.log("seeding started")
    try {
        await connectToDatabase()
        console.log("createdAbout seed")
        const about = await aboutModel.create(aboutSeedData)
        console.log("About seed data created")
        const home = await HomePageContentModel.create(seedData)
        console.log("Home seed data created")
        const contact = await seedContact()
        const work = await Work.create(workSeed)
        console.log("Contact seed data created")
        const gallery = await galleryModel.create(gallerySeed)
        console.log("Gallery seed data created")
        const blogs = await Blog.create(BlogSeed)
        console.log("Blogs seed data created")
        const blogPages = await BlogPost.create(BlogSeed.blogPosts)
        console.log("Blog Pages seed data created")



    } catch (error) {
        console.log("Error creating about seed data", error)
    }
}


// CommonJS version to avoid ESM path issues
// const { connectToDatabase } = require("../lib/mongodb");
// const { aboutModel } = require("../lib/about/about");
// const { aboutSeedData } = require("../lib/about/seed");
// const { HomePageContentModel } = require("../lib/home/home");
// const { seedData } = require("../lib/home/seed");
// const { ContactPageModel } = require("../lib/contact/contact");
// const { seedContact } = require("../lib/contact/seed");
// const { galleryModel } = require("../lib/gallery/gallery");
// const { gallerySeed } = require("../lib/gallery/seed");
// const { Blog } = require("../lib/blog/blog");
// const { BlogPost } = require("../lib/blog/blogpost/blogpost");
// const BlogSeed = require("../lib/blog/seed");

// async function seedDatabase() {
//     try {
//         await connectToDatabase();
//         console.log("✅ Connected to database");

//         if (!(await aboutModel.exists({}))) {
//             await aboutModel.create(aboutSeedData);
//             console.log("✅ About seeded");
//         }

//         if (!(await HomePageContentModel.exists({}))) {
//             await HomePageContentModel.create(seedData);
//             console.log("✅ Home seeded");
//         }

//         if (!(await ContactPageModel.exists({}))) {
//             await ContactPageModel.create(seedContact);
//             console.log("✅ Contact seeded");
//         }

//         if (!(await galleryModel.exists({}))) {
//             await galleryModel.create(gallerySeed);
//             console.log("✅ Gallery seeded");
//         }

//         if (!(await Blog.exists({}))) {
//             await Blog.create(BlogSeed);
//             console.log("✅ Blogs seeded");
//         }

//         if (!(await BlogPost.exists({}))) {
//             await BlogPost.create(BlogSeed.blogPosts);
//             console.log("✅ BlogPosts seeded");
//         }

//         console.log("🎉 Database seeding completed!");
//         process.exit(0);
//     } catch (err) {
//         console.error("❌ Error seeding database:", err);
//         process.exit(1);
//     }
// }

// seedDatabase();
