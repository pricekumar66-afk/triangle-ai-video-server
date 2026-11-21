import express from "express";

const app = express();
app.use(express.json({ limit: "20mb" }));

const PORT = process.env.PORT || 3000;
const ACCESS_TOKEN = process.env.APP_ACCESS_TOKEN;

app.get("/", (req, res) => {
res.send("TRIANGLE AI Video Server is running");
});

app.get("/health", (req, res) => {
res.json({ status: "ok" });
});

app.use((req, res, next) => {
if (!ACCESS_TOKEN) {
return res.status(500).json({ error: "Server token not configured" });
}

if (req.headers.authorization !== `Bearer ${ACCESS_TOKEN}`) {
return res.status(401).json({ error: "Unauthorized" });
}

next();
});

app.post("/generate", (req, res) => {
res.status(501).json({
error: "AI video provider is not connected yet"
});
});

app.listen(PORT, () => {
console.log("TRIANGLE server started on port " + PORT);
});
