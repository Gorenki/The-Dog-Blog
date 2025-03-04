import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

let posts = [
  {
    image: "/images/frenchie.png",
    text: "Say hello to Quinn. She is a potato who loves to act like a big dog.",
    createdAt: new Date('2025-02-10T10:00:00')
  },
  {
    image: "/images/great-dane.png",
    text: "Danny is our lovely Great Dane who acts like a lap dog.",
    createdAt: new Date('2025-02-10T11:00:00')
  },
  {
    image: "/images/aussie.png",
    text: "Our old lady, Bella. She loves to tear up all of the new toys.",
    createdAt: new Date('2025-02-10T12:00:00')
  }
];

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render("index", { posts: posts });
});

app.get("/post", (req, res) => {
  res.render("post");
});

app.post("/post", upload.single('image'), (req, res) => {
  const newPost = {
    image: `/images/${req.file.filename}`,
    text: req.body.text,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});