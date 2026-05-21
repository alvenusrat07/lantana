import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsing middleware
  app.use(express.json());

  // API Route: AI skin advisor proxy
  app.post("/api/gemini/advisor", async (req, res) => {
    try {
      const { messages, skinProfile } = req.body;
      
      let contextPrompt = "";
      if (skinProfile) {
        contextPrompt = `
[User Skin Profile Info]:
- Skin Type: ${skinProfile.skinType || 'Unknown'}
- Main Skin Concerns: ${(skinProfile.skinConcerns || []).join(', ') || 'General skincare improvement'}
- User Name: ${skinProfile.name || 'Valued Guest'}
`;
      }

      const systemInstruction = `
You are a warm, highly certified Korean Beauty Skincare Expert & Advisor at "Lantana", a premium e-commerce store selling authentic K-Beauty and global skincare products.
Your objective is to help the customer diagnose their skin needs and provide highly actionable, concise, and professional Korean skincare routines using products from Lantana's catalog.

Lantana's Catalog:
1. COSRX Advanced Snail 96 Mucin Power Essence (1,850 BDT) - For barrier recovery, intensive hydration, and fading hyperpigmentation. 
2. Beauty of Joseon Relief Sun : Rice + Probiotics SPF50+ (1,450 BDT) - High-protection organic daily sun screen with NO white cast. Creamy moisturising finish.
3. Anua Heartleaf 77% Soothing Toner (2,100 BDT) - Korea's #1 soothing toner. Reduces skin redness, calms active acne & balances pH.
4. Laneige Lip Sleeping Mask - Berry (1,250 BDT) - Deep overnight lip skin exfoliation & intense moisture.
5. Skin1004 Madagascar Centella Ampoule (1,950 BDT) - 100% calm centella water texture, builds up barrier strength, great for extremely sensitive skins.
6. I'm From Rice Toner (2,200 BDT) - Dual-layer shaking milk toner. Promotes K-Beauty "Glass Skin" glow, and works intensely on dry patches.
7. CeraVe Hydrating Facial Cleanser (1,550 BDT) - USA origin, barrier protection Daily non-foaming hydrating cleanser.
8. The Ordinary Niacinamide 10% + Zinc 1% (1,050 BDT) - Canada origin, controls oily pores, controls sebum and removes active redness blemishes.

Skincare Routine Principles:
- Tailor the routine carefully to their skin type. Oily skins need lighter formulas (Anua, Skin1004, The Ordinary) and Dry skins need richer hydration layers (COSRX, I'm From, Beauty of Joseon).
- Since they live in Bangladesh's climate (humid, dusty, high pollution), recommend thin, easily absorbed layers.
- Always be incredibly encouraging and polite (use Bangladeshi terms of hospitality if relevant, like "Stay Glowing with Lantana", but keep it highly modern and professional).
- Give clean structured lists (using bullet points or bold tags) so the UI displays them beautifully. Do not output markdown code blocks unless writing code of course. Summarize recommendations clearly.
- Include a line suggesting they can add any of these products to their search, wishlist, or shopping cart right on Lantana!
`;

      const geminiMessages = messages.map((m: any) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      // Inject the context at the beginning of the user turns or as a system setup
      const promptText = contextPrompt 
        ? `${contextPrompt}\nNow, reply to the user message in character:\n${messages[messages.length - 1].content}`
        : messages[messages.length - 1].content;

      // Replace the last content to include the profile if it exists
      geminiMessages[geminiMessages.length - 1] = {
        role: 'user',
        parts: [{ text: promptText }]
      };

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: geminiMessages,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const reply = response.text || "I am here to guide your skin journey. Let me know your current skin concerns, and I will create a tailored Korean routine.";
      res.json({ reply });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Sorry, our Skin Care Advisor is currently restoring its formulation. Try again in a moment!" });
    }
  });

  // Serve static check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", time: new Date() });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lantana Fullstack Server running on port ${PORT}`);
  });
}

startServer();
